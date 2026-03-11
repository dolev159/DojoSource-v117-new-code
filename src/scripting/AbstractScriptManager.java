package scripting;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.lang.ref.SoftReference;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.script.Bindings;
import javax.script.CompiledScript;
import javax.script.Compilable;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptContext;

import client.MapleClient;
import tools.FileoutputUtil;

public abstract class AbstractScriptManager {

    private static final ScriptEngineManager sem = new ScriptEngineManager(AbstractScriptManager.class.getClassLoader());
    private static final Map<String, SoftReference<CompiledScript>> scriptCache = new ConcurrentHashMap<>();

    protected Invocable getInvocable(String path, MapleClient c) {
        return getInvocable(path, c, false);
    }

    protected Invocable getInvocable(String path, MapleClient c, boolean npc) {
        path = "scripts/" + path;
        ScriptEngine engine = (c != null) ? c.getScriptEngine(path) : null;

        try {
            if (engine == null) {
                File scriptFile = new File(path);
                if (!scriptFile.exists()) {
                    return null;
                }

                CompiledScript compiled = null;
                SoftReference<CompiledScript> ref = scriptCache.get(path);
                if (ref != null) {
                    compiled = ref.get();
                }

                if (compiled == null) {
                    // Cosmic Protocol: Using GraalVM JavaScript with Host Access
                    System.err.println("Initializing ScriptEngineManager. Available factories:");
                    for (javax.script.ScriptEngineFactory factory : sem.getEngineFactories()) {
                        System.err.println(" - " + factory.getEngineName() + " (" + factory.getNames() + ")");
                        if (factory.getNames().contains("graal.js") || factory.getNames().contains("Graal.js") || factory.getNames().contains("js")) {
                            try {
                                engine = factory.getScriptEngine();
                                if (engine != null) break;
                            } catch (Throwable t) {
                                System.err.println("INNER EXCEPTION from factory.getScriptEngine():");
                                t.printStackTrace();
                            }
                        }
                    }
                    
                    if (engine == null) {
                        engine = sem.getEngineByName("javascript"); // Fallback check
                    }

                    if (engine == null) {
                        System.err.println("Fatal: GraalVM JavaScript engine NOT FOUND.");
                        System.err.println("Ensure 'js', 'js-scriptengine', 'graal-sdk', and 'truffle-api' jars are in the 'dist' folder.");
                        return null;
                    }

                    // Enable Host Access for v117 NPCs/Scripts
                    Bindings bindings = engine.getBindings(javax.script.ScriptContext.ENGINE_SCOPE);
                    bindings.put("polyglot.js.allowHostAccess", true);
                    bindings.put("polyglot.js.allowHostClassLookup", true);
                    bindings.put("polyglot.js.allowAllAccess", true);
                    bindings.put("polyglot.js.nashorn-compat", true);
                    try {
                        bindings.put("AIOmniGuide", Class.forName("server.AIOmniGuide"));
                        bindings.put("MapleStat", Class.forName("client.MapleStat"));
                        bindings.put("MapleCharacter", Class.forName("client.MapleCharacter"));
                        bindings.put("MapleItemInformationProvider", Class.forName("server.MapleItemInformationProvider"));
                    } catch (ClassNotFoundException e) {
                        System.err.println("A class was not found for scripting bindings: " + e.getMessage());
                    }

                    // Nashorn compatibility shim for v117 scripts
                    String compatibilityShim = 
                        "var importPackage = function(p) { }; \n" +
                        "var importClass = function(c) { }; \n" +
                        "try { \n" +
                        "    var MapleStat = Java.type('client.MapleStat'); \n" +
                        "    var MapleCharacter = Java.type('client.MapleCharacter'); \n" +
                        "    var MapleItemInformationProvider = Java.type('server.MapleItemInformationProvider'); \n" +
                        "    var AIOmniGuide = Java.type('server.AIOmniGuide'); \n" +
                        "} catch (e) { \n" +
                        "    // Fallback if Java.type is unavailable in non-Graal engine\n" +
                        "} \n";

                    if (!(engine instanceof Compilable)) {
                        try (InputStreamReader fr = new InputStreamReader(new FileInputStream(scriptFile),
                                StandardCharsets.UTF_8)) {
                            engine.eval(compatibilityShim);
                            engine.eval(fr);
                        }
                    } else {
                        try (InputStreamReader fr = new InputStreamReader(new FileInputStream(scriptFile),
                                StandardCharsets.UTF_8)) {
                            // Note: We eval the shim but compile the main script
                            engine.eval(compatibilityShim);
                            compiled = ((Compilable) engine).compile(fr);
                            scriptCache.put(path, new SoftReference<>(compiled));
                        }
                    }
                }

                if (compiled != null) {
                    engine = compiled.getEngine();
                    compiled.eval(engine.getBindings(javax.script.ScriptContext.ENGINE_SCOPE));
                } else if (engine == null) {
                    return null;
                }

                if (c != null) {
                    c.setScriptEngine(path, engine);
                }
            }
            return (Invocable) engine;
        } catch (Throwable e) {
            System.err.println("Error executing script. Path: " + path + "\nException " + e);
            if (e instanceof NoClassDefFoundError) {
                if (e.getMessage().contains("org/graalvm/polyglot/PolyglotException")) {
                    System.err.println(
                            "CRITICAL: Missing 'graal-sdk.jar' in the 'dist' folder. Please add it and restart.");
                } else if (e.getMessage().contains("org/graalvm/polyglot/proxy/Proxy")) {
                    System.err.println(
                            "CRITICAL: Missing 'polyglot.jar' (Polyglot API) in the 'dist' folder. Required for NPC proxying.");
                }
            }
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log,
                    "Error executing script. Path: " + path + "\nException " + e);
            return null;
        }
    }

    public static void clearCache() {
        scriptCache.clear();
    }
}