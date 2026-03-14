package tools.packet;

/**
 * Nexus Omni: EtcPacket Bridge
 * Many GMS v117 scripts attempt to call methods from EtcPacket (especially for music/effects).
 */
public class EtcPacket {

    private EtcPacket() {
    }

    public static byte[] environmentChange(String env, int mode) {
        return CField.environmentChange(env, mode);
    }
    
    public static byte[] environmentMove(String env, int mode) {
        return CField.environmentMove(env, mode);
    }

    public static byte[] aranTutInstructionalBalloon(String data) {
        return CField.EffectPacket.AranTutInstructionalBalloon(data);
    }

    public static byte[] showWZEffect(String data) {
        return CField.EffectPacket.ShowWZEffect(data);
    }

    public static byte[] showDirectionStatus(boolean enable) {
        return CField.UIPacket.getDirectionStatus(enable);
    }

    public static byte[] sendNotice(int type, String message) {
        return CWvsContext.serverNotice(type, message);
    }
}
