package tools.packet;

/**
 * Nexus Omni: Global Packet Bridge
 * This class acts as a central hub for GMS v117 scripts to access packet methods.
 * Many legacy and tutorial scripts expect these methods to exist in this package.
 */
public class MaplePacketCreator {

    private MaplePacketCreator() {
    }

    public static byte[] serverNotice(int type, String message) {
        return CWvsContext.serverNotice(type, message);
    }

    public static byte[] serverNotice(int type, int channel, String message) {
        return CWvsContext.serverNotice(type, channel, message);
    }

    public static byte[] environmentChange(String env, int mode) {
        return CField.environmentChange(env, mode);
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

    public static byte[] getTopMsg(String msg) {
        return CWvsContext.getTopMsg(msg);
    }

    public static byte[] showEffect(String effect) {
        return CField.showEffect(effect);
    }

    public static byte[] playSound(String sound) {
        return CField.playSound(sound);
    }
}
