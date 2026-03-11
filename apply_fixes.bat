@echo off
set cp=dist\*;src
if not exist "out\classes" mkdir "out\classes"
echo Compiling modified Java files...
javac -encoding UTF-8 -d out\classes -cp "%cp%" src\server\SpeedRunner.java src\scripting\AbstractScriptManager.java src\scripting\EventScriptManager.java src\handling\login\handler\CharLoginHandler.java src\handling\channel\ChannelServer.java
if %errorlevel% neq 0 (
    echo Compilation FAILED!
    exit /b %errorlevel%
)
echo Compilation SUCCESS!
echo Updating jar...
jar uf dist\DojoSource-v117-new-code.jar -C out\classes .
if %errorlevel% neq 0 (
    echo Jar update FAILED!
    exit /b %errorlevel%
)
echo Jar update SUCCESS!
