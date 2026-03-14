package tools;

public class AuditQuests {
    public static void main(String[] args) {
        // Initialization normally happens in Start.java, but we only need quest data.
        // MapleQuest.initQuests() is usually called by Start.java.
        // We might need to initialize the data provider if we are not using DB.
        
        // For this task, I'll just assume I can call it if I add it to the server startup or a command.
        // But since I want to see the data NOW, I'll try to run it via a command if possible.
        
        // Actually, I'll just use my knowledge of the system.
        // If I can't run it easily, I'll trust the WZ logic.
        
        QuestDataDumper.dump(21010);
        QuestDataDumper.dump(21011);
        QuestDataDumper.dump(20101);
    }
}
