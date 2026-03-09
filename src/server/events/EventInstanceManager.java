package server.events;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.Collection;
import java.util.Collections;

/**
 * EventInstanceManager - Central manager for all Event Instances.
 * Handles the registration, tracking, and lifecycle updates of events.
 */
public class EventInstanceManager {

    private static final EventInstanceManager instance = new EventInstanceManager();
    
    // Tracks active instances by their unique ID
    private final Map<String, AbstractEventInstance> activeInstances = new ConcurrentHashMap<>();
    
    // Registry for event types/templates (e.g. "LPQ" -> Factory/Config)
    // For now, it manages instances, but can be expanded to manage event registrations.
    private final Map<String, Object> eventRegistry = new ConcurrentHashMap<>();

    private EventInstanceManager() {
    }

    public static EventInstanceManager getInstance() {
        return instance;
    }

    /**
     * Factory method to create a new Event Instance.
     */
    public AbstractEventInstance createEventInstance(String eventName, int channelId) {
        AbstractEventInstance eim = EventRegistry.createInstance(eventName, channelId);
        if (eim != null) {
            registerInstance(eim);
            eim.startInstance();
        }
        return eim;
    }

    /**
     * Registers a new active event instance.
     */
    public void registerInstance(AbstractEventInstance eim) {
        activeInstances.put(eim.getId(), eim);
    }

    /**
     * Removes an event instance from tracking.
     */
    public void unregisterInstance(String id) {
        activeInstances.remove(id);
    }

    /**
     * Retrieves an active instance by its unique ID.
     */
    public AbstractEventInstance getInstance(String id) {
        return activeInstances.get(id);
    }

    /**
     * Gets all currently active instances.
     */
    public Collection<AbstractEventInstance> getAllInstances() {
        return Collections.unmodifiableCollection(activeInstances.values());
    }

    /**
     * Main update loop called by ServerTickManager.
     * Manages expiration and auto-disposal.
     */
    public void update(long now) {
        for (AbstractEventInstance eim : activeInstances.values()) {
            long tickStart = System.nanoTime();
            try {
                if (eim.isExpired(now)) {
                    eim.dispose();
                }
            } finally {
                long tickEnd = System.nanoTime();
                eim.setLastTickDuration((tickEnd - tickStart) / 1000000); // Record in ms
            }
        }
    }

    /**
     * Registry for event content (LPQ, Bosses, etc).
     */
    public void registerEvent(String eventName, Object eventConfig) {
        eventRegistry.put(eventName, eventConfig);
        System.out.println("[EIM] Registered Event content: " + eventName);
    }

    public Object getEventConfig(String eventName) {
        return eventRegistry.get(eventName);
    }

    /**
     * Disposes all active instances (used during server shutdown).
     */
    public void disposeAll() {
        System.out.println("[EIM] Disposing all " + activeInstances.size() + " active instances...");
        for (AbstractEventInstance eim : activeInstances.values()) {
            try {
                eim.dispose();
            } catch (Exception e) {
                System.err.println("[EIM] Error disposing instance " + eim.getId() + ": " + e.getMessage());
            }
        }
        activeInstances.clear();
    }
}
