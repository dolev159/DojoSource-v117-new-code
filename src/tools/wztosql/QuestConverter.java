package tools.wztosql;

import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.quest.BinaryQuestInfo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.util.Map;
import java.util.TreeMap;

public class QuestConverter {
    public static void main(String[] args) {
        try {
            System.out.println("Starting Quest Conversion from XML Files...");
            
            // Note: For XML providers, point directly to the folder containing .img.xml files
            String wzPath = System.getProperty("net.sf.odinms.wzpath", "wz/Quest.wz");
            System.out.println("WZ Path: " + wzPath);
            
            MapleDataProvider quest = MapleDataProviderFactory.getDataProvider(new File(wzPath));
            
            if (quest == null) {
                System.out.println("Failed to load Quest.wz provider!");
                return;
            }

            MapleData infoImg = quest.getData("QuestInfo.img");
            MapleData checkImg = quest.getData("Check.img");
            MapleData actImg = quest.getData("Act.img");

            if (infoImg == null || checkImg == null || actImg == null) {
                System.out.println("Failed to load root images (QuestInfo.img: " + (infoImg != null) + 
                                   ", Check.img: " + (checkImg != null) + 
                                   ", Act.img: " + (actImg != null) + ")");
                return;
            }

            Map<Integer, BinaryQuestInfo> quests = new TreeMap<>();

            for (MapleData qNode : infoImg.getChildren()) {
                try {
                    int questId = Integer.parseInt(qNode.getName());
                    BinaryQuestInfo bq = new BinaryQuestInfo();
                    bq.setId(questId);
                    bq.setName(MapleDataTool.getString("name", qNode, ""));
                    bq.setAutoStart(MapleDataTool.getInt("autoStart", qNode, 0) > 0);
                    bq.setAutoComplete(MapleDataTool.getInt("autoComplete", qNode, 0) > 1); // 2 in info usually means auto-complete
                    
                    // Requirements and Actions from other files
                    MapleData checkStart = checkImg.getChildByPath(questId + "/0");
                    if (checkStart != null) {
                        for (MapleData req : checkStart.getChildren()) {
                            if (req.getName().equals("startscript")) {
                                bq.setStartScript(MapleDataTool.getString(req, ""));
                            }
                        }
                    }

                    MapleData checkEnd = checkImg.getChildByPath(questId + "/1");
                    if (checkEnd != null) {
                        for (MapleData req : checkEnd.getChildren()) {
                            if (req.getName().equals("endscript")) {
                                bq.setEndScript(MapleDataTool.getString(req, ""));
                            }
                            if (req.getName().equals("transferField")) {
                                bq.setTransferField(MapleDataTool.getInt(req, 0));
                            }
                        }
                    }
                    
                    quests.put(questId, bq);
                } catch (NumberFormatException e) {
                    // Skip non-integer nodes
                }
            }

            String resPath = System.getProperty("net.sf.odinms.res_path", "resources");
            File outDir = new File(resPath);
            if (!outDir.exists()) outDir.mkdirs();

            try (ObjectOutputStream oos = new ObjectOutputStream(new FileOutputStream(new File(outDir, "quests.dat")))) {
                oos.writeObject(quests);
            }

            System.out.println("Successfully converted " + quests.size() + " quests to " + outDir.getPath() + "/quests.dat");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
