package server;

import client.SkillFactory;
import tools.FileoutputUtil;

public class CacheManager {

    public static void reloadAll() {
        long start = System.currentTimeMillis();
        System.out.println("Reloading all caches...");
        
        try {
            MapleItemInformationProvider.getInstance().reload();
            SkillFactory.reload();
            
            long end = System.currentTimeMillis();
            String msg = "All caches reloaded successfully in " + (end - start) + "ms.";
            System.out.println(msg);
            FileoutputUtil.logStartup(msg);
            System.out.println(getMemoryUsageReport());
        } catch (Exception e) {
            System.err.println("Error during cache reload!");
            e.printStackTrace();
            FileoutputUtil.logCrash("Cache Reload Failure", e);
        }
    }

    public static String getMemoryUsageReport() {
        StringBuilder sb = new StringBuilder();
        sb.append("\n==========================================\n");
        sb.append("   CACHE MEMORY USAGE REPORT\n");
        sb.append("==========================================\n");
        
        sb.append(MapleItemInformationProvider.getInstance().getCacheReport());
        sb.append(SkillFactory.getCacheReport());
        
        Runtime runtime = Runtime.getRuntime();
        long usedMemory = (runtime.totalMemory() - runtime.freeMemory()) / (1024 * 1024);
        long maxMemory = runtime.maxMemory() / (1024 * 1024);
        
        sb.append(String.format("JVM Used Memory: %d MB / %d MB\n", usedMemory, maxMemory));
        sb.append("==========================================\n");
        
        return sb.toString();
    }
}
