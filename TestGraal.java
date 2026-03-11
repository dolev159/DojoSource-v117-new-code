import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngineFactory;
import java.util.List;

public class TestGraal {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        ScriptEngineManager manager = new ScriptEngineManager();
        List<ScriptEngineFactory> factories = manager.getEngineFactories();
        
        System.out.println("Found " + factories.size() + " ScriptEngineFactories.");
        for (ScriptEngineFactory factory : factories) {
            System.out.println(" - " + factory.getEngineName() + " (" + factory.getNames() + ")");
        }

        ScriptEngine engine = manager.getEngineByName("graal.js");
        if (engine != null) {
            System.out.println("[SUCCESS] graal.js engine acquired!");
        } else {
            System.out.println("[FAIL] Could not load graal.js");
        }
    }
}
