package scripting;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.lang.ref.SoftReference;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import javax.script.Bindings;
import javax.script.CompiledScript;
import javax.script.Compilable;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import client.MapleClient;
import tools.FileoutputUtil;

public abstract class AbstractScriptManager {

    private static final ScriptEngineManager sem = new ScriptEngineManager(AbstractScriptManager.class.getClassLoader());
    private static final Map<String, SoftReference<CompiledScript>> scriptCache = new ConcurrentHashMap<>();

    protected Invocable getInvocable(String path, MapleClient c) {
        return getInvocable(path, c, false);
    }

    protected Invocable getInvocable(String path, MapleClient c, boolean npc) {
        String fullPath = "scripts/" + path;
        if (npc && c != null) {
            String npcFile = path.replace("npc/", "");
            File worldFile = new File("scripts" + File.separator + "npc" + File.separator + "world" + c.getWorld() + File.separator + npcFile);
            if (worldFile.exists()) {
                fullPath = worldFile.getPath();
            }
        }

        ScriptEngine engine = (c != null) ? c.getScriptEngine(fullPath) : null;

        try {
            if (engine == null) {
                File scriptFile = new File(fullPath);
                if (!scriptFile.exists()) {
                    return null;
                }

                SoftReference<CompiledScript> ref = scriptCache.get(fullPath);
                CompiledScript compiled = (ref != null) ? ref.get() : null;

                if (compiled == null) {
                    engine = initEngine();
                    if (engine == null) {
                        return null;
                    }

                    String compatibilityShim = getCompatibilityShim();
                    if (!(engine instanceof Compilable)) {
                        try (InputStreamReader fr = new InputStreamReader(new FileInputStream(scriptFile), StandardCharsets.UTF_8)) {
                            engine.eval(compatibilityShim);
                            engine.eval(fr);
                        }
                    } else {
                        try (InputStreamReader fr = new InputStreamReader(new FileInputStream(scriptFile), StandardCharsets.UTF_8)) {
                            engine.eval(compatibilityShim);
                            compiled = ((Compilable) engine).compile(fr);
                            scriptCache.put(fullPath, new SoftReference<>(compiled));
                        }
                    }
                }

                if (compiled != null) {
                    engine = compiled.getEngine();
                    compiled.eval(engine.getBindings(javax.script.ScriptContext.ENGINE_SCOPE));
                }

                if (c != null) {
                    c.setScriptEngine(fullPath, engine);
                }
            }
            return (Invocable) engine;
        } catch (Exception e) {
            System.err.println("Error Loading Script: " + fullPath + " : " + e.getMessage());
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error Loading Script: " + fullPath + " : " + e.toString());
            return null;
        }
    }

    private ScriptEngine initEngine() {
        ScriptEngine engine = null;
        for (javax.script.ScriptEngineFactory factory : sem.getEngineFactories()) {
            List<String> names = factory.getNames();
            if (names.contains("graal.js") || names.contains("js")) {
                try {
                    engine = factory.getScriptEngine();
                    if (engine != null) {
                        break;
                    }
                } catch (Exception e) {
                    // Ignore, try next factory
                }
            }
        }
        if (engine == null) {
            engine = sem.getEngineByName("javascript");
        }
        if (engine != null) {
            setupBindings(engine);
        }
        return engine;
    }

    private void setupBindings(ScriptEngine engine) {
        Bindings bindings = engine.getBindings(javax.script.ScriptContext.ENGINE_SCOPE);
        bindings.put("polyglot.js.allowHostAccess", true);
        bindings.put("polyglot.js.allowHostClassLookup", true);
        bindings.put("polyglot.js.allowAllAccess", true);
        bindings.put("polyglot.js.nashorn-compat", true);

        String[] classes = {
            "server.AIOmniGuide", "client.MapleStat", "client.MapleCharacter",
            "server.MapleItemInformationProvider", "server.MapleInventoryManipulator",
            "tools.packet.MaplePacketCreator", "tools.packet.EtcPacket",
            "tools.packet.CField", "tools.packet.CWvsContext"
        };
        for (String cls : classes) {
            try {
                String name = cls.substring(cls.lastIndexOf(".") + 1);
                bindings.put(name, Class.forName(cls));
            } catch (Exception e) {
                // Class might not exist
            }
        }
        try {
            bindings.put("EffectPacket", Class.forName("tools.packet.CField$EffectPacket"));
        } catch (Exception e) {
            try {
                bindings.put("EffectPacket", Class.forName("tools.packet.EffectPacket"));
            } catch (Exception e2) {
                // Ignore
            }
        }
    }

    private String getCompatibilityShim() {
        return "try { \n" +
               "    if (typeof MapleStat === 'undefined') var MapleStat = Java.type('client.MapleStat'); \n" +
               "    if (typeof MapleCharacter === 'undefined') var MapleCharacter = Java.type('client.MapleCharacter'); \n" +
               "    if (typeof MapleItemInformationProvider === 'undefined') var MapleItemInformationProvider = Java.type('server.MapleItemInformationProvider'); \n" +
               "    if (typeof MapleInventoryManipulator === 'undefined') var MapleInventoryManipulator = Java.type('server.MapleInventoryManipulator'); \n" +
               "    if (typeof MaplePacketCreator === 'undefined') var MaplePacketCreator = Java.type('tools.packet.MaplePacketCreator'); \n" +
               "    if (typeof EtcPacket === 'undefined') var EtcPacket = Java.type('tools.packet.EtcPacket'); \n" +
               "    if (typeof CField === 'undefined') var CField = Java.type('tools.packet.CField'); \n" +
               "    if (typeof CWvsContext === 'undefined') var CWvsContext = Java.type('tools.packet.CWvsContext'); \n" +
               "    try { \n" +
               "        if (typeof EffectPacket === 'undefined') var EffectPacket = Java.type('tools.packet.CField$EffectPacket'); \n" +
               "    } catch (e) { \n" +
               "        if (typeof EffectPacket === 'undefined') var EffectPacket = Java.type('tools.packet.EffectPacket'); \n" +
               "    } \n" +
               "} catch (e) { \n" +
               "    // Fallback if Java.type is unavailable in non-Graal engine\n" +
               "} \n";
    }

    protected final boolean hasMethod(Invocable iv, String name) {
        if (iv == null) {
            return false;
        }
        if (iv instanceof ScriptEngine) {
            ScriptEngine engine = (ScriptEngine) iv;
            Object val = engine.get(name);
            if (val != null) {
                return true;
            }
            Bindings bindings = engine.getBindings(javax.script.ScriptContext.ENGINE_SCOPE);
            if (bindings.containsKey(name)) {
                return true;
            }
        }
        try {
            return iv.getClass().getMethod("get", String.class).invoke(iv, name) != null;
        } catch (Exception e) {
            // ignore
        }
        return false;
    }

    public static void clearCache() {
        scriptCache.clear();
    }
}