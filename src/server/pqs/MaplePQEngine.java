package server.pqs;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import scripting.NPCConversationManager;
import handling.world.MapleParty;
import java.util.EnumMap;

/**
 * Nexus Omni - GMS v117 Universal PQ Engine
 * Centralized Java-based orchestration for all Party Quests.
 * Replaces the legacy scripts/event system for maximum performance.
 */
public class MaplePQEngine {

    private static final MaplePQEngine instance = new MaplePQEngine();
    private final Map<MaplePQType, MaplePQHandler> handlers = new EnumMap<>(MaplePQType.class);
    private final Map<Integer, MaplePQInstance> activeInstances = new ConcurrentHashMap<>();

    private MaplePQEngine() {
        // Initialize handlers
        handlers.put(MaplePQType.KERNING_PQ, new KerningPQHandler());
        handlers.put(MaplePQType.ROMEO_PQ, new RomeoAndJulietPQHandler());
        handlers.put(MaplePQType.JULIET_PQ, new RomeoAndJulietPQHandler());
        handlers.put(MaplePQType.ROMEO_AND_JULIET, new RomeoAndJulietPQHandler());
        handlers.put(MaplePQType.REMNANT_OF_GODDESS, new OrbisPQHandler());
        handlers.put(MaplePQType.LORD_PIRATE, new PiratePQHandler());
        handlers.put(MaplePQType.HOBLIN_KING, new HoblinPQHandler());
        handlers.put(MaplePQType.DRAGON_RIDER, new DragonRiderPQHandler());
        handlers.put(MaplePQType.KENTA_IN_DANGER, new KentaPQHandler());
        handlers.put(MaplePQType.ESCAPE, new EscapePQHandler());
        handlers.put(MaplePQType.AMORIA_PQ, new AmoriaPQHandler());
        handlers.put(MaplePQType.DIMENSIONAL_CRACK, new LudiPQHandler());
        handlers.put(MaplePQType.BOSS_BALROG_EASY, new BossBalrogEasyHandler());
        handlers.put(MaplePQType.BOSS_BALROG_NORMAL, new BossBalrogNormalHandler());
        handlers.put(MaplePQType.MONSTER_CARNIVAL_1, new MonsterCarnivalHandler());
        handlers.put(MaplePQType.MONSTER_CARNIVAL_2, new MonsterCarnivalHandler());
        handlers.put(MaplePQType.GUILD_PQ, new GuildPQHandler());
        handlers.put(MaplePQType.MU_LUNG_DOJO, new MuLungDojoHandler());
    }

    public static MaplePQEngine getInstance() {
        return instance;
    }

    public MaplePQInstance getInstance(int id) {
        return activeInstances.get(id);
    }

    public enum MaplePQType {
        KERNING_PQ("First Time Together", 910340700),
        DIMENSIONAL_CRACK("Dimensional Crack", 221023300),
        ROMEO_PQ("Romeo", 261000011),
        JULIET_PQ("Juliet", 261000021),
        REMNANT_OF_GODDESS("Remnant of the Goddess", 200080101),
        LORD_PIRATE("Lord Pirate", 251010404),
        ROMEO_AND_JULIET("Romeo and Juliet", 261000021),
        HOBLIN_KING("Hoblin King", 925020000), 
        DRAGON_RIDER("Dragon Rider", 240080000),
        KENTA_IN_DANGER("Kenta in Danger", 923040000),
        ESCAPE("Escape", 921160000),
        AMORIA_PQ("Amoria PQ", 670010200),
        BOSS_BALROG_EASY("Boss Balrog Easy", 105100100),
        BOSS_BALROG_NORMAL("Boss Balrog Normal", 105100100),
        MONSTER_CARNIVAL_1("Monster Carnival 1", 980000000),
        MONSTER_CARNIVAL_2("Monster Carnival 2", 980030000),
        GUILD_PQ("Guild PQ", 102040200),
        MU_LUNG_DOJO("Mu Lung Dojo", 925020001);

        private final String pqName;
        private final int entryMap;

        MaplePQType(String pqName, int entryMap) {
            this.pqName = pqName;
            this.entryMap = entryMap;
        }

        public String getPqName() {
            return pqName;
        }

        public int getEntryMap() {
            return entryMap;
        }

        public static MaplePQType getByName(String name) {
            for (MaplePQType type : values()) {
                if (type.getPqName().equalsIgnoreCase(name)) {
                    return type;
                }
            }
            return null;
        }
    }

    public boolean startInstance(MapleParty party, String pqName, NPCConversationManager cm) {
        MaplePQType type = MaplePQType.getByName(pqName);
        if (type == null) {
            return false;
        }

        MaplePQHandler handler = handlers.get(type);
        if (handler != null) {
            if (handler.validate(party, cm)) {
                MaplePQInstance instance = handler.createInstance(party);
                if (instance != null) {
                    activeInstances.put(instance.getId(), instance);
                    return true;
                }
            }
        }
        return false;
    }

    public void removeInstance(int id) {
        activeInstances.remove(id);
    }
}
