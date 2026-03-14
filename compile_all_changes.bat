@echo off
set CLASSPATH=lib/*;src

echo Cleaning dist...
powershell -Command "if (Test-Path 'dist\scripting') { Remove-Item 'dist\scripting\*' -Recurse -Force }"
powershell -Command "if (Test-Path 'dist\server') { Remove-Item 'dist\server\*' -Recurse -Force }"
powershell -Command "if (Test-Path 'dist\handling') { Remove-Item 'dist\handling\*' -Recurse -Force }"

echo Compiling GameConstants...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\constants\GameConstants.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling AbstractPlayerInteraction...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\scripting\AbstractPlayerInteraction.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling NPCConversationManager...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\scripting\NPCConversationManager.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling NPCScriptManager...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\scripting\NPCScriptManager.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling MapleQuest...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\server\quest\MapleQuest.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling MapleInventoryManipulator...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\server\MapleInventoryManipulator.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling NPCHandler...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\handling\channel\handler\NPCHandler.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling PlayersHandler...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\handling\channel\handler\PlayersHandler.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling InventoryHandler...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\handling\channel\handler\InventoryHandler.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling MapleTrade...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\server\MapleTrade.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo Compiling MapleMap...
javac -encoding UTF-8 -cp %CLASSPATH% -d dist src\server\maps\MapleMap.java
if %errorlevel% neq 0 exit /b %errorlevel%

echo All files compiled successfully!
