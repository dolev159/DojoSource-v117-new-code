package tools;

import server.quest.MapleQuest;
import server.quest.MapleQuestAction;
import server.quest.MapleQuestRequirement;
import tools.Pair;
import java.util.List;

public class QuestDataDumper {
    public static void dump(int questId) {
        MapleQuest q = MapleQuest.getInstance(questId);
        if (q == null) {
            System.out.println("Quest " + questId + " not found.");
            return;
        }
        System.out.println("====== Quest " + questId + " Audit ======");
        System.out.println("Name: " + q.getName());
        
        System.out.println("--- Start Requirements ---");
        for (MapleQuestRequirement req : q.getStartReqs()) {
            System.out.println("Type: " + req.getType());
            if (req.getDataStore() != null) {
                for (Pair<Integer, Integer> pair : req.getDataStore()) {
                    System.out.println("  - ID: " + pair.left + ", Value: " + pair.right);
                }
            }
        }
        
        System.out.println("--- Complete Requirements ---");
        for (MapleQuestRequirement req : q.getCompleteReqs()) {
            System.out.println("Type: " + req.getType());
            if (req.getDataStore() != null) {
                for (Pair<Integer, Integer> pair : req.getDataStore()) {
                    System.out.println("  - ID: " + pair.left + ", Value: " + pair.right);
                }
            }
        }
        
        System.out.println("--- Start Actions ---");
        for (MapleQuestAction act : q.getStartActs()) {
            System.out.println("Type: " + act.getType());
            if (act.getItems() != null) {
                for (MapleQuestAction.QuestItem item : act.getItems()) {
                    System.out.println("  - Item ID: " + item.itemid + ", Count: " + item.count + ", Prop: " + item.prop);
                }
            }
            if (act.getIntStore() != 0) {
                System.out.println("  - IntStore: " + act.getIntStore());
            }
        }
        
        System.out.println("--- Complete Actions ---");
        for (MapleQuestAction act : q.getCompleteActs()) {
            System.out.println("Type: " + act.getType());
            if (act.getItems() != null) {
                for (MapleQuestAction.QuestItem item : act.getItems()) {
                    System.out.println("  - Item ID: " + item.itemid + ", Count: " + item.count + ", Prop: " + item.prop);
                }
            }
            if (act.getIntStore() != 0) {
                System.out.println("  - IntStore: " + act.getIntStore());
            }
            if (act.getSkills() != null) {
                 for (tools.Triple<Integer, Integer, Integer> skill : act.getSkills()) {
                    System.out.println("  - Skill ID: " + skill.left + ", Level: " + skill.mid + ", MasterLevel: " + skill.right);
                }
            }
        }
        System.out.println("==========================================");
    }
}
