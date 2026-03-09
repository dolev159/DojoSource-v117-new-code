package server.events;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.lang.reflect.Constructor;

/**
 * EventRegistry - Central registry for Event Types.
 * Maps event names to their implementation classes.
 */
public class EventRegistry {

    private static final Map<String, Class<? extends AbstractEventInstance>> eventClasses = new ConcurrentHashMap<>();
    private static final Map<String, EventMetadata> eventMetadata = new ConcurrentHashMap<>();

    public static class EventMetadata {
        public int minParties;
        public int maxParties;

        public EventMetadata(int minParties, int maxParties) {
            this.minParties = minParties;
            this.maxParties = maxParties;
        }
    }

    /**
     * Registers a new event type with optional party constraints.
     */
    public static void registerEvent(String name, Class<? extends AbstractEventInstance> clazz) {
        registerEvent(name, clazz, 1, 1); // Default to single party
    }

    public static void registerEvent(String name, Class<? extends AbstractEventInstance> clazz, int minParties, int maxParties) {
        eventClasses.put(name, clazz);
        eventMetadata.put(name, new EventMetadata(minParties, maxParties));
        System.out.println("[EventRegistry] Registered event: " + name + " [MinParties: " + minParties + ", MaxParties: " + maxParties + "]");
    }

    public static EventMetadata getMetadata(String name) {
        return eventMetadata.get(name);
    }

    /**
     * Factory method to create a new instance of an event.
     */
    public static AbstractEventInstance createInstance(String eventName, int channelId) {
        Class<? extends AbstractEventInstance> clazz = eventClasses.get(eventName);
        if (clazz == null) {
            System.err.println("[EventRegistry] Failed to create instance: Event '" + eventName + "' is not registered.");
            return null;
        }

        try {
            // Assumes a constructor (String eventName, int channelId)
            // We can adjust this to match the AbstractEventInstance standard.
            Constructor<? extends AbstractEventInstance> constructor = clazz.getConstructor(String.class, int.class);
            AbstractEventInstance instance = constructor.newInstance(eventName, channelId);
            return instance;
        } catch (Exception e) {
            System.err.println("[EventRegistry] Error creating instance for " + eventName + ": " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }

    public static void init() {
        // Register core events
        registerEvent("Zakum", ZakumEvent.class);
        registerEvent("LPQ", LpqEvent.class);
        
        System.out.println("[EventRegistry] Initialized with " + eventClasses.size() + " event types.");
    }
}
