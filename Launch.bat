@echo off
@title DojoSource v117 - Server Console
color 0A

:: Create logs directory if it doesn't exist
if not exist "logs" mkdir "logs"
if not exist "logs\errors" mkdir "logs\errors"
if not exist "logs\crashes" mkdir "logs\crashes"
if not exist "logs\packets" mkdir "logs\packets"

:: Generate timestamp for log file name
for /f "tokens=1-3 delims=/ " %%a in ('date /t') do set mydate=%%c-%%a-%%b
for /f "tokens=1-2 delims=: " %%a in ('time /t') do set mytime=%%a-%%b
set LOGFILE=logs\server_%mydate%_%mytime%.log

echo ============================================================
echo   DojoSource v117 - MapleStory Server
echo   Started: %date% %time%
echo   Log File: %LOGFILE%
echo ============================================================
echo.

:: Set classpath and JVM options
set CLASSPATH=.;dist\*

:: Run server with:
::   -Xmx2g              = max 2GB RAM
::   -Xms512m            = start with 512MB RAM
::   -XX:+UseG1GC        = modern garbage collector (less lag spikes)
::   -verbose:gc         = log GC events (helps find memory issues)
::   -XX:+HeapDumpOnOutOfMemoryError = auto dump when OOM crash
::   -XX:HeapDumpPath    = save heap dump to logs/crashes
::   -Djava.util.logging.config.file = use our custom logging config
java -Xmx2g -Xms512m ^
     -XX:+UseG1GC ^
     -XX:+HeapDumpOnOutOfMemoryError ^
     -XX:HeapDumpPath=logs/crashes ^
     -Djava.util.logging.config.file=logging.properties ^
     -Dnet.sf.odinms.wzpath=wz ^
     server.Start 2>&1 | powershell -Command "& { $input | ForEach-Object { $timestamp = Get-Date -Format 'yyyy-MM-dd HH:mm:ss'; $line = \"[$timestamp] $_\"; Write-Host $line; Add-Content -Path '%LOGFILE%' -Value $line } }"

echo.
echo ============================================================
echo   SERVER HAS STOPPED!
echo   Check %LOGFILE% for details.
echo   Check logs\errors\ for error logs.
echo   Check logs\crashes\ for crash dumps.
echo ============================================================
echo.
pause