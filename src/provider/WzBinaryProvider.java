package provider;

import java.io.File;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import java.util.HashMap;
import java.util.Map;
import server.quest.BinaryQuestInfo;

public class WzBinaryProvider {
    private final Map<Integer, BinaryQuestInfo> questData = new HashMap<>();
    private static final String QUEST_FILE = "quests.dat";
    private final File resDir;

    public WzBinaryProvider(File root) {
        this.resDir = root;
        loadQuests();
    }

    private void loadQuests() {
        File file = new File(resDir, QUEST_FILE);
        if (!file.exists()) {
            System.out.println("Binary quest file not found: " + file.getPath());
            return;
        }

        try (ObjectInputStream ois = new ObjectInputStream(new FileInputStream(file))) {
            Map<Integer, BinaryQuestInfo> data = (Map<Integer, BinaryQuestInfo>) ois.readObject();
            questData.putAll(data);
            System.out.println("Loaded " + questData.size() + " quests from binary provider.");
        } catch (Exception e) {
            System.err.println("Failed to load binary quest data: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public BinaryQuestInfo getQuestData(int questId) {
        return questData.get(questId);
    }
}
