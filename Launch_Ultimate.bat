@echo off
title Nexus Omni - DojoSource v117 ULTIMATE CONSOLE
set CLASSPATH=.;dist\*
set MAIN_CLASS=server.Start

:: MEMORY CONFIGURATION
:: Targeted for 8GB+ Systems. Uses 4GB for the JVM heap.
set MIN_RAM=2048M
set MAX_RAM=4096M

:restart
cls
color 0b
echo =======================================================
echo          NEXUS OMNI - DOJO SOURCE v117
echo      ZERO-ROLLBACK ^| EXPLOIT-FREE ^| ZERO-LAG
echo =======================================================
echo [%DATE% %TIME%] Initializing GMS v117 Engine...
echo Running with GraalVM Polyglot JS (v24.0.1)
echo.

:: JVM ADVANCED TUNING
:: -XX:+UseG1GC: Essential for keeping GC pauses under 50ms
:: -Dpolyglot.js.nashorn-compat=true: Required for v117 scripts
:: -Dfile.encoding=UTF-8: Global Unicode Support
java ^
  -server ^
  -Xms%MIN_RAM% ^
  -Xmx%MAX_RAM% ^
  -XX:+UseG1GC ^
  -XX:MaxGCPauseMillis=50 ^
  -XX:+UnlockExperimentalVMOptions ^
  -XX:G1NewSizePercent=20 ^
  -XX:G1MaxNewSizePercent=45 ^
  -XX:G1MixedGCLiveThresholdPercent=65 ^
  -XX:InitiatingHeapOccupancyPercent=35 ^
  -Dfile.encoding=UTF-8 ^
  -Dnet.sf.odinms.wzpath=wz ^
  -Dpolyglot.engine.WarnInterpreterOnly=false ^
  -Dpolyglot.js.nashorn-compat=true ^
  --add-opens java.base/java.lang=ALL-UNNAMED ^
  --add-opens java.base/java.util=ALL-UNNAMED ^
  --add-opens java.base/java.io=ALL-UNNAMED ^
  --add-opens java.base/java.nio=ALL-UNNAMED ^
  --add-opens java.base/sun.nio.ch=ALL-UNNAMED ^
  --add-opens java.base/java.lang.invoke=ALL-UNNAMED ^
  -cp %CLASSPATH% %MAIN_CLASS%

echo.
echo -------------------------------------------------------
echo [%DATE% %TIME%] SERVER CRASHED OR STOPPED!
echo [%DATE% %TIME%] RESTARTING IN 5 SECONDS... (CTRL+C to STOP)
echo -------------------------------------------------------
timeout /t 5
goto restart

