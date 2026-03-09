package server.life;

import server.events.EventInstance;
import java.util.Random;

/**
 * BossAI - Finite State Machine implementation for Boss Monsters.
 */
public class BossAI implements MonsterAI {

    public enum State {
        IDLE,
        PHASE_1, // 100% - 60% HP
        PHASE_2, // 60% - 30% HP
        ENRAGED  // < 30% HP
    }

    private State currentState = State.IDLE;
    private long lastAttackTime = 0;
    private final Random random = new Random();

    @Override
    public void tick(MapleMonster monster, EventInstance eim) {
        if (monster == null || !monster.isAlive()) {
            return;
        }

        updateState(monster);
        handleBehavior(monster, eim);
    }

    private void updateState(MapleMonster monster) {
        long currentHp = monster.getHp();
        long maxHp = monster.getMobMaxHp();
        double hpPercent = (double) currentHp / maxHp;

        if (hpPercent >= 1.0 && (eimPlayersEmpty(monster))) {
            currentState = State.IDLE;
        } else if (hpPercent > 0.60) {
            currentState = State.PHASE_1;
        } else if (hpPercent > 0.30) {
            currentState = State.PHASE_2;
        } else {
            currentState = State.ENRAGED;
        }
    }

    private boolean eimPlayersEmpty(MapleMonster monster) {
        // Simple check if anyone is in the map if no EIM is present
        return monster.getMap().getCharactersSize() == 0;
    }

    private void handleBehavior(MapleMonster monster, EventInstance eim) {
        long now = System.currentTimeMillis();
        
        // Attack Cooldown Check (e.g. 3 seconds)
        long cooldown = getAttackCooldown();
        if (now - lastAttackTime < cooldown) {
            return;
        }

        switch (currentState) {
            case IDLE:
                // Do nothing or roam
                break;
            case PHASE_1:
                executePhase1(monster, eim);
                lastAttackTime = now;
                break;
            case PHASE_2:
                executePhase2(monster, eim);
                lastAttackTime = now;
                break;
            case ENRAGED:
                executeEnraged(monster, eim);
                lastAttackTime = now;
                break;
        }
    }

    private long getAttackCooldown() {
        switch (currentState) {
            case ENRAGED: return 1500; // Faster attacks
            case PHASE_2: return 2500;
            default: return 3500;
        }
    }

    private void executePhase1(MapleMonster monster, EventInstance eim) {
        // Basic movement and simple attack
        monster.setStance(random.nextInt(2)); // Random stance change
        // monster.getMap().broadcastMessage(...)
    }

    private void executePhase2(MapleMonster monster, EventInstance eim) {
        // Add special attacks like Stun (simulated)
        if (random.nextInt(10) < 3) {
            // Apply Stun logic here
        }
        executePhase1(monster, eim);
    }

    private void executeEnraged(MapleMonster monster, EventInstance eim) {
        // Faster movement and 1/1 attacks (simulated)
        if (random.nextInt(10) < 5) {
            // Apply 1/1 logic here
        }
        executePhase2(monster, eim);
    }
}
