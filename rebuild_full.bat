@echo off
set cp=dist\*;dist\lib\*;dist\asm-util-9.7.jar
if exist "out" rd /S /Q "out"
if not exist "out\classes" mkdir "out\classes"

echo [NEXUS] Purging Exploded Classes from dist...
:: This prevents NoSuchMethodErrors by ensuring the JAR is the only source of classes
if exist "dist\provider" rd /S /Q "dist\provider"
if exist "dist\server" rd /S /Q "dist\server"
if exist "dist\tools" rd /S /Q "dist\tools"
if exist "dist\client" rd /S /Q "dist\client"
if exist "dist\constants" rd /S /Q "dist\constants"
if exist "dist\handling" rd /S /Q "dist\handling"
if exist "dist\database" rd /S /Q "dist\database"
if exist "dist\scripting" rd /S /Q "dist\scripting"

if not exist "dist\lib" mkdir "dist\lib"
echo Syncing libraries...
copy /Y lib\*.jar dist\lib\ > nul
echo Finding all Java files...
dir /s /B src\*.java > java_files_list.txt
echo Compiling all Java files...
javac -encoding UTF-8 -d out\classes -cp "%cp%" @java_files_list.txt
if %errorlevel% neq 0 (
    echo Compilation FAILED!
    exit /b %errorlevel%
)
echo Compilation SUCCESS!
echo Creating/Updating jar...
jar cvfe dist\DojoSource-v117-new-code.jar server.Start -C out\classes .
if %errorlevel% neq 0 (
    echo Jar update FAILED!
    exit /b %errorlevel%
)
if exist "dist\KerningMS.jar" del "dist\KerningMS.jar"
if exist "lib\KerningMS.jar" del "lib\KerningMS.jar"
echo Jar update SUCCESS!
echo [NEXUS] Synchronizing Game Logic (Scripts/XML)...
if not exist "dist\scripts" mkdir "dist\scripts"
xcopy /S /Y /Q scripts\* dist\scripts\ > nul
if exist "dist\config" rd /S /Q "dist\config"
mkdir "dist\config"
copy /Y *.properties dist\ > nul
copy /Y db.properties dist\config\ > nul

echo ---------------------------------------
echo Build COMPLETED: dist\DojoSource-v117-new-code.jar
echo ---------------------------------------
