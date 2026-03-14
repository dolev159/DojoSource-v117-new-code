@echo off
set cp=dist\*;dist\lib\*;dist\asm-util-9.7.jar
if not exist "out\classes" mkdir "out\classes"
echo Compiling modified Java files...
javac -encoding UTF-8 -d out\classes -cp "%cp%;src" src\client\MapleClient.java src\handling\login\handler\CharLoginHandler.java src\handling\channel\handler\InterServerHandler.java src\tools\packet\CField.java src\tools\packet\LoginPacket.java src\handling\netty\NettyServerHandler.java src\handling\login\handler\AutoRegister.java
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
