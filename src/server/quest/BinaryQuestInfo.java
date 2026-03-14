package server.quest;

import java.io.Serializable;

public class BinaryQuestInfo implements Serializable {
    private static final long serialVersionUID = 1L;
    
    private int id;
    private String name = "";
    private boolean autoStart = false;
    private boolean autoComplete = false;
    private String startScript = "";
    private String endScript = "";
    private int transferField = 0;
    private int checkEndValue = 0;

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isAutoStart() { return autoStart; }
    public void setAutoStart(boolean autoStart) { this.autoStart = autoStart; }

    public boolean isAutoComplete() { return autoComplete; }
    public void setAutoComplete(boolean autoComplete) { this.autoComplete = autoComplete; }

    public String getStartScript() { return startScript; }
    public void setStartScript(String startScript) { this.startScript = startScript; }

    public String getEndScript() { return endScript; }
    public void setEndScript(String endScript) { this.endScript = endScript; }

    public int getTransferField() { return transferField; }
    public void setTransferField(int transferField) { this.transferField = transferField; }

    public int getCheckEndValue() { return checkEndValue; }
    public void setCheckEndValue(int checkEndValue) { this.checkEndValue = checkEndValue; }
}
