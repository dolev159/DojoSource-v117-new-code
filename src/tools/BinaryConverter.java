package tools;

import provider.MapleData;
import provider.MapleDataType;
import java.awt.Point;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class BinaryConverter {

    public static void main(String[] args) {
        String wzPath = System.getProperty("wzpath", "wz");
        String outPath = System.getProperty("outpath", "dist/resources");

        File outDir = new File(outPath);
        if (!outDir.exists()) {
            outDir.mkdirs();
        }

        String[] subDirs = {"Character", "Item", "Mob", "Map", "Skill", "String", "Etc", "Quest"};

        for (String subDir : subDirs) {
            File source = new File(wzPath, subDir);
            if (!source.exists()) {
                source = new File(wzPath, subDir + ".wz");
            }
            if (!source.exists()) {
                System.out.println("Skipping " + subDir + " (not found in " + wzPath + ")");
                continue;
            }
            File target = new File(outDir, subDir + ".bin");
            System.out.println("Converting " + (source.getName()) + " to " + target.getName() + "...");
            try {
                convert(source, target);
                System.out.println("Finished " + subDir);
            } catch (Throwable t) {
                System.err.println("Error converting " + subDir + ": " + t.getMessage());
                t.printStackTrace();
            }
        }
    }

    private static void convert(File sourceDir, File targetFile) throws IOException {
        List<FileEntry> entries = new ArrayList<>();
        listXMLs(sourceDir, sourceDir, entries);

        try (RandomAccessFile raf = new RandomAccessFile(targetFile, "rw")) {
            raf.setLength(0);
            raf.writeBytes("WZBN");
            raf.writeLong(0); // Placeholder for Metadata Table Offset

            int successfulCount = 0;
            for (FileEntry entry : entries) {
                try {
                    System.out.println("    [Process] " + entry.path);
                    entry.offset = raf.getFilePointer();
                    MapleData data = loadXML(entry.file);
                    writeMapleData(data, raf);
                    entry.length = (int) (raf.getFilePointer() - entry.offset);
                    entry.success = true;
                    successfulCount++;
                } catch (Throwable t) {
                    System.err.println("  [Error] Skipping " + entry.path + " due to: " + t.getMessage());
                    t.printStackTrace();
                    entry.success = false;
                }
            }

            long metaOffset = raf.getFilePointer();
            raf.writeInt(successfulCount);
            for (FileEntry entry : entries) {
                if (entry.success) {
                    raf.writeUTF(entry.path);
                    raf.writeLong(entry.offset);
                    raf.writeInt(entry.length);
                }
            }

            // Update Metadata Table Offset
            raf.seek(4);
            raf.writeLong(metaOffset);
        }
    }

    private static void listXMLs(File root, File current, List<FileEntry> entries) {
        File[] files = current.listFiles();
        if (files == null) return;
        for (File f : files) {
            if (f.isDirectory()) {
                listXMLs(root, f, entries);
            } else if (f.getName().endsWith(".xml")) {
                String fullPath = f.getAbsolutePath();
                String rootPath = root.getAbsolutePath();
                String relativePath = fullPath.substring(rootPath.length() + 1, fullPath.length() - 4).replace("\\", "/");
                entries.add(new FileEntry(relativePath, f));
            }
        }
    }

    private static MapleData loadXML(File file) {
        try {
            // Memory efficient sanitization for large XMLs
            FileInputStream fis = new FileInputStream(file);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            byte[] buf = new byte[8192];
            int len;
            while ((len = fis.read(buf)) != -1) {
                bos.write(buf, 0, len);
            }
            fis.close();
            
            String xml = bos.toString("UTF-8");
            // Advanced Sanitize: 
            // 1. Replace & with &amp; if not followed by an entity
            xml = xml.replaceAll("&(?!(amp|lt|gt|quot|apos|#\\d+);)", "&amp;");
            // 2. Fix common "broken" attribute strings in messy WZ exports
            xml = xml.replaceAll("(?i)<string([^>]*?)name=\"\"([^\"]*?)\"", "<string$1name=\"$2\"");
            xml = xml.replaceAll("(?i)<string([^>]*?)=\"([^\"]*?)&([^\"]*?)\"", "<string$1=\"$2&amp;$3\"");
            
            try (InputStream is = new ByteArrayInputStream(xml.getBytes("UTF-8"))) {
                return new MapleData(is, file.getParentFile());
            }
        } catch (Throwable t) {
            throw new RuntimeException("Failed to load " + file.getName() + ": " + t.getMessage(), t);
        }
    }

    private static void writeMapleData(MapleData data, RandomAccessFile out) throws IOException {
        out.writeUTF(data.getName());
        MapleDataType type = data.getType();
        if (type == null || type == MapleDataType.UNKNOWN_TYPE) {
            System.err.println("  [Warning] Skipping node: " + data.getName() + " with unknown tag: <" + data.getTagName() + ">");
            return;
        }
        out.writeByte(type.ordinal());
        
        switch (type) {
            case INT:
                out.writeInt((Integer) data.getData());
                break;
            case LONG:
                out.writeLong((Long) data.getData());
                break;
            case SHORT:
                out.writeShort((Short) data.getData());
                break;
            case FLOAT:
                out.writeFloat((Float) data.getData());
                break;
            case DOUBLE:
                out.writeDouble((Double) data.getData());
                break;
            case STRING, UOL:
                out.writeUTF((String) data.getData());
                break;
            case VECTOR:
                Point p = (Point) data.getData();
                out.writeInt(p.x);
                out.writeInt(p.y);
                break;
            case CANVAS:
                // Skip binary content for now to save space, but keeping dimensions
                provider.MapleCanvas canvas = (provider.MapleCanvas) data.getData();
                out.writeInt(canvas.getWidth());
                out.writeInt(canvas.getHeight());
                break;
            case PROPERTY, CONVEX:
                List<MapleData> children = data.getChildren();
                out.writeInt(children.size());
                for (MapleData child : children) {
                    writeMapleData(child, out);
                }
                break;
            case IMG_0x00:
                break;
            default:
                break;
        }
    }

    private static class FileEntry {
        String path;
        File file;
        long offset;
        int length;
        boolean success;

        FileEntry(String path, File file) {
            this.path = path;
            this.file = file;
        }
    }
}
