@echo off
@title Ultimate v117 Server (Full Binary Mode)
set CLASSPATH=.;dist\DojoSource-v117-new-code.jar;dist\lib\*;dist\resources

:: Nexus Omni - Full Binary Startup (Authentic Nexon Data)
:: Nexus Omni - Turbo Performance Matrix (2026 Standard)
java -Xmx4G -Xms4G -XX:+UseG1GC -XX:MaxGCPauseMillis=20 -XX:InitiatingHeapOccupancyPercent=35 -XX:+ExplicitGCInvokesConcurrent -XX:+ParallelRefProcEnabled -XX:+AlwaysPreTouch -XX:+TieredCompilation -XX:SurvivorRatio=8 -XX:MaxTenuringThreshold=15 -XX:+UnlockDiagnosticVMOptions -Dnet.sf.odinms.binary=true -Djava.util.Arrays.useLegacyMergeSort=true -Dnet.sf.odinms.res_path=dist/resources -Dfile.encoding=UTF-8 server.Start
pause
