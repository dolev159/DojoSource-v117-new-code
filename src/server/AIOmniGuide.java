package server;

import client.MapleClient;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import tools.packet.CField.NPCPacket;

/**
 * Nexus Omni Autonomous NPC Guide
 * 100% Asynchronous LLM bridging utility.
 */
public class AIOmniGuide {

    private static final String LLM_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String API_KEY = "YOUR_API_KEY_HERE";
    
    // HTTP/2 Client optimized for connection pooling and async dispatch
    private static final HttpClient client = HttpClient.newBuilder()
            .version(HttpClient.Version.HTTP_2)
            .build();

    /**
     * Dispatches an asynchronous request to the LLM and formats an NPC Chat packet upon response.
     * The executing thread (server/channel Netty worker) is NEVER blocked.
     *
     * @param c The MapleClient session to receive the response.
     * @param npcId The NPC ID to display in the chat dialog.
     * @param playerInput The raw text input from the player via cm.getText().
     */
    public static void askOmniAsync(final MapleClient c, final int npcId, final String playerInput) {
        // Construct JSON Payload. Note: In production, use Gson/Jackson to escape properties cleanly.
        String jsonPayload = "{\n" +
                "  \"model\": \"gpt-4-turbo\",\n" +
                "  \"messages\": [\n" +
                "    {\"role\": \"system\", \"content\": \"You are Nexus Omni, an omniscient in-game guide for MapleStory. Keep responses concise, helpful, and deeply intertwined with MapleStory lore.\"},\n" +
                "    {\"role\": \"user\", \"content\": \"" + playerInput.replace("\"", "\\\"") + "\"}\n" +
                "  ]\n" +
                "}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(LLM_API_URL))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + API_KEY)
                .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                .build();

        // Dispatch 100% Async HTTP request
        client.sendAsync(request, HttpResponse.BodyHandlers.ofString())
                .thenApply(HttpResponse::body)
                .thenAccept(responseBody -> {
                    // Extract response cleanly off the background thread
                    String reply = extractContent(responseBody);
                    
                    if (reply == null || reply.isEmpty()) {
                        reply = "I am currently out of sync with the Nexus. Try again later.";
                    }

                    // Dispatch UI Packet back to the client interface if they haven't logged off
                    if (c != null && c.getSession() != null) {
                        c.getSession().write(NPCPacket.getNPCTalk(npcId, (byte) 0, reply, "00 00", (byte) 0));
                    }
                })
                .exceptionally(ex -> {
                    System.err.println("[AIOmniGuide] LLM Neural Link Severed: " + ex.getMessage());
                    if (c != null && c.getSession() != null) {
                        c.getSession().write(NPCPacket.getNPCTalk(npcId, (byte) 0, "A temporal anomaly disrupted my thoughts. Speak with me again.", "00 00", (byte) 0));
                    }
                    return null;
                });
    }

    /**
     * Pure Java string extraction to isolate LLM 'content' response. 
     */
    private static String extractContent(String json) {
        try {
            int target = json.indexOf("\"content\":");
            if (target == -1) return null;
            int start = json.indexOf("\"", target + 10) + 1;
            int end = json.indexOf("\"", start);
            
            // Format escaped newlines for Maple dialogs
            return json.substring(start, end).replace("\\n", "\r\n").replace("\\\"", "\"");
        } catch (Exception e) {
            return null;
        }
    }
}
