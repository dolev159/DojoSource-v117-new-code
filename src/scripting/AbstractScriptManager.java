package scripting;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.lang.ref.SoftReference;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.script.CompiledScript;
import javax.script.Compilable;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;

import client.MapleClient;
import tools.FileoutputUtil;

public abstract class AbstractScriptManager {

    private static final ScriptEngineManager sem = new ScriptEngineManager();
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
                    engine = sem.getEngineByName("javascript");
                    if (!(engine instanceof Compilable)) {
                        // Fallback if engine doesn't support compilation
                        try (InputStreamReader fr = new InputStreamReader(new FileInputStream(scriptFile), StandardCharsets.UTF_8)) {
                            engine.eval(fr);
                        }
                    } else {
                        try (InputStreamReader fr = new InputStreamReader(new FileInputStream(scriptFile), StandardCharsets.UTF_8)) {
                            compiled = ((Compilable) engine).compile(fr);
                            scriptCache.put(path, new SoftReference<>(compiled));
                        }
                    }
                }

                if (compiled != null) {
                    engine = compiled.getEngine();
                    // We must use a fresh set of bindings for each execution if we want isolation,
                    // but here we often want to reuse the client state.
                    // For now, let's keep it simple.
                    compiled.eval(engine.getBindings(javax.script.ScriptContext.ENGINE_SCOPE));
                }

                if (c != null) {
                    c.setScriptEngine(path, engine);
                }
            }
            return (Invocable) engine;
        } catch (Exception e) {
            System.err.println("Error executing script. Path: " + path + "\nException " + e);
            FileoutputUtil.log(FileoutputUtil.ScriptEx_Log, "Error executing script. Path: " + path + "\nException " + e);
            return null;
        }
    }

    public static void clearCache() {
        scriptCache.clear();
    }
}