/*
This file is part of the OdinMS Maple Story Server
Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
Matthias Butz <matze@odinms.de>
Jan Christian Meyer <vimes@odinms.de>

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3
as published by the Free Software Foundation. You may not use, modify
or distribute this program under any other version of the
GNU Affero General Public License.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package tools;

import java.io.*;
import java.util.Calendar;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.util.TimeZone;

public class FileoutputUtil {

    // ==========================================
    // Log file names - organized by category
    // ==========================================
    
    // Account & Login logs
    public static final String Acc_Stuck = "Log_AccountStuck.rtf",
            Login_Error = "Log_Login_Error.rtf",
            IP_Log = "Log_AccountIP.rtf";
    
    // GM & Admin logs
    public static final String GMCommand_Log = "Log_GMCommand.rtf";
    
    // Boss logs
    public static final String Zakum_Log = "Log_Zakum.rtf",
            Horntail_Log = "Log_Horntail.rtf",
            Pinkbean_Log = "Log_Pinkbean.rtf";
    
    // Error & Exception logs
    public static final String ScriptEx_Log = "Log_Script_Except.txt",
            PacketEx_Log = "Log_Packet_Except.txt",
            CommandEx_Log = "Log_Command_Except.txt";
    
    // Security logs
    public static final String Hacker_Log = "Log_Hacker.rtf",
            Movement_Log = "Log_Movement.txt";
    
    // NEW: Additional categorized logs
    public static final String Crash_Log = "Log_Crash.txt",
            Database_Log = "Log_Database_Error.txt",
            Item_Log = "Log_Item_Operations.txt",
            Trade_Log = "Log_Trade.txt",
            Chat_Log = "Log_Chat.txt",
            NPC_Log = "Log_NPC_Error.txt",
            Quest_Log = "Log_Quest_Error.txt",
            CashShop_Log = "Log_CashShop.txt",
            Disconnect_Log = "Log_Disconnect.txt",
            Startup_Log = "Log_Startup.txt";

    // End
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdfGMT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdf_ = new SimpleDateFormat("yyyy-MM-dd");
    private static final String FILE_PATH = "logs/" + sdf_.format(Calendar.getInstance().getTime()) + "/";
    private static final String ERROR = "errors/";
    
    static {
        sdfGMT.setTimeZone(TimeZone.getTimeZone("GMT"));
        // Create log directories on startup
        createLogDirectories();
    }

    /**
     * Redirect System.out and System.err to files while keeping console output.
     * This ensures that even if the console is closed/disappears, logs are saved.
     */
    public static void redirectSystemStreams() {
        try {
            String dir = "logs/system/";
            new File(dir).mkdirs();
            PrintStream out = new PrintStream(new FileOutputStream(dir + "stdout.txt", true));
            PrintStream err = new PrintStream(new FileOutputStream(dir + "stderr.txt", true));
            
            System.setOut(new tools.TeedPrintStream(System.out, out));
            System.setErr(new tools.TeedPrintStream(System.err, err));
            
            logStartup("System streams redirected to " + dir);
        } catch (Exception e) {
            System.err.println("Failed to redirect system streams: " + e.getMessage());
        }
    }

    /**
     * Create all necessary log directories on startup.
     */
    private static void createLogDirectories() {
        String[] dirs = {
            "logs",
            FILE_PATH,
            FILE_PATH + ERROR,
            FILE_PATH + "packets",
            FILE_PATH + "crashes",
            FILE_PATH + "security",
            FILE_PATH + "gameplay"
        };
        for (String dir : dirs) {
            File f = new File(dir);
            if (!f.exists()) {
                f.mkdirs();
            }
        }
    }

    /**
     * Main logging method - writes to file AND prints to console.
     * This ensures errors are visible in both the BAT window and saved to disk.
     */
    public static void log(final String file, final String msg) {
        String fullPath = FILE_PATH + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(fullPath);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(fullPath, true);
            String logEntry = "\n------------------------ " + CurrentReadable_Time() + " ------------------------\n" + msg;
            out.write(logEntry.getBytes());
            // ALSO print to console so it shows in the BAT window
            System.out.println("[LOG] [" + CurrentReadable_Time() + "] " + file + ": " + msg);
        } catch (IOException ess) {
            System.err.println("[LOG ERROR] Failed to write to log file: " + fullPath + " - " + ess.getMessage());
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    /**
     * Log to file only (no console output) - for high-volume logs.
     */
    public static void logToFile(final String file, final String msg) {
        String fullPath = FILE_PATH + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(fullPath);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(fullPath, true);
            out.write(msg.getBytes());
        } catch (IOException ess) {
            System.err.println("[LOG ERROR] Failed to write to log file: " + fullPath);
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    /**
     * Log an exception/error with full stack trace - writes to file AND console.
     */
    public static void outputFileError(final String file, final Throwable t) {
        String fullPath = FILE_PATH + ERROR + file;
        FileOutputStream out = null;
        try {
            File outputFile = new File(fullPath);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(fullPath, true);
            String logEntry = "\n======================== ERROR ========================\n"
                    + "Time: " + CurrentReadable_Time() + "\n"
                    + getString(t);
            out.write(logEntry.getBytes());
            // Print to console (stderr) so it shows in RED in some terminals
            System.err.println("[ERROR] [" + CurrentReadable_Time() + "] " + file + ":");
            t.printStackTrace(System.err);
        } catch (IOException ess) {
            System.err.println("[LOG ERROR] Failed to write error log: " + fullPath);
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    /**
     * Print error with additional context info.
     */
    public static void printError(final String name, final Throwable t, final String info) {
        FileOutputStream out = null;
        String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            String logEntry = "Time: " + CurrentReadable_Time() + "\r\n"
                    + "Info: " + info + "\r\n"
                    + getString(t)
                    + "\n---------------------------------\r\n";
            out.write(logEntry.getBytes());
            // ALSO print to console
            System.err.println("[ERROR] [" + CurrentReadable_Time() + "] " + name + " - " + info);
            t.printStackTrace(System.err);
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    /**
     * Print error string (no exception).
     */
    public static void printError(final String name, final String s) {
        FileOutputStream out = null;
        String file = FILE_PATH + ERROR + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            String logEntry = "[" + CurrentReadable_Time() + "] " + s + "\r\n";
            out.write(logEntry.getBytes());
            // ALSO print to console
            System.err.println("[ERROR] [" + CurrentReadable_Time() + "] " + name + " - " + s);
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void print(final String name, final String s) {
        print(name, s, true);
    }

    public static void print(final String name, final String s, boolean line) {
        FileOutputStream out = null;
        String file = FILE_PATH + name;
        try {
            File outputFile = new File(file);
            if (outputFile.getParentFile() != null) {
                outputFile.getParentFile().mkdirs();
            }
            out = new FileOutputStream(file, true);
            String logEntry = "[" + CurrentReadable_Time() + "] " + s;
            out.write(logEntry.getBytes());
            if (line) {
                out.write("\r\n---------------------------------\r\n".getBytes());
            }
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    // ==========================================
    // NEW: Specialized logging methods
    // ==========================================

    /**
     * Log a crash event - highest priority, always visible on console.
     */
    public static void logCrash(final String context, final Throwable t) {
        String msg = "CRASH in " + context;
        System.err.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        System.err.println("!! CRASH DETECTED: " + msg);
        System.err.println("!! Time: " + CurrentReadable_Time());
        System.err.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        t.printStackTrace(System.err);
        
        outputFileError(Crash_Log, t);
        // Also write context info
        printError(Crash_Log, "Context: " + context + " | " + getString(t));
    }

    /**
     * Log a database error.
     */
    public static void logDatabaseError(final String query, final Throwable t) {
        String msg = "DB Error - Query: " + query;
        printError(Database_Log, t, msg);
    }

    /**
     * Log a disconnection event.
     */
    public static void logDisconnect(final String playerName, final String reason) {
        log(Disconnect_Log, "Player: " + playerName + " | Reason: " + reason);
    }

    /**
     * Log startup progress - always visible on console.
     */
    public static void logStartup(final String msg) {
        String logEntry = "[STARTUP] [" + CurrentReadable_Time() + "] " + msg;
        System.out.println(logEntry);
        logToFile(Startup_Log, logEntry + "\r\n");
    }

    // ==========================================
    // Utility methods
    // ==========================================

    public static String CurrentReadable_Date() {
        return sdf_.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_Time() {
        return sdf.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_TimeGMT() {
        return sdfGMT.format(new Date());
    }

    public static String getString(final Throwable e) {
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
            }
        }
        return retValue;
    }
}