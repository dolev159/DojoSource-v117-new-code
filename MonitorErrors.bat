@echo off
@title DojoSource v117 - Live Error Monitor
color 0C

echo ============================================================
echo   DojoSource v117 - LIVE ERROR MONITOR
echo   Watching for errors in real-time...
echo   Press Ctrl+C to stop monitoring.
echo ============================================================
echo.

:: Find the latest log directory
for /f "delims=" %%i in ('dir /b /ad /od logs 2^>nul') do set LATEST_DIR=%%i

if "%LATEST_DIR%"=="" (
    echo No log directories found. Start the server first!
    pause
    exit
)

echo Monitoring: logs\%LATEST_DIR%\errors\
echo.
echo -------- ERRORS WILL APPEAR BELOW --------
echo.

:loop
:: Check for new error files and display them
for /r "logs\%LATEST_DIR%\errors" %%f in (*.txt *.rtf) do (
    echo.
    echo ======= %%~nxf =======
    type "%%f"
    echo.
)

:: Wait 5 seconds and check again
timeout /t 5 /nobreak > nul
goto loop
