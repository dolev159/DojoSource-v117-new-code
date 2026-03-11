@echo off
title GraalVM Dependency Fixer - Nexus Omni
color 0b

echo ============================================================
echo   GraalVM JavaScript Dependency Fixer
echo   Target Folder: dist\
echo ============================================================
echo.

if not exist "dist" (
    echo [ERROR] 'dist' folder not found. Please run this from the server root.
    pause
    exit /b
)

:: GraalVM JS 24.0.1 Dependencies
set BASE_URL=https://repo1.maven.org/maven2

echo [1/5] Downloading graal-sdk-24.0.1.jar...
powershell -Command "Invoke-WebRequest -Uri '%BASE_URL%/org/graalvm/sdk/graal-sdk/24.0.1/graal-sdk-24.0.1.jar' -OutFile 'dist\graal-sdk-24.0.1.jar'"

echo [2/5] Downloading js-24.0.1.jar...
powershell -Command "Invoke-WebRequest -Uri '%BASE_URL%/org/graalvm/js/js-language/24.0.1/js-language-24.0.1.jar' -OutFile 'dist\js-24.0.1.jar'"

echo [3/5] Downloading js-scriptengine-24.0.1.jar...
powershell -Command "Invoke-WebRequest -Uri '%BASE_URL%/org/graalvm/js/js-scriptengine/24.0.1/js-scriptengine-24.0.1.jar' -OutFile 'dist\js-scriptengine-24.0.1.jar'"

echo [4/5] Downloading truffle-api-24.0.1.jar...
powershell -Command "Invoke-WebRequest -Uri '%BASE_URL%/org/graalvm/truffle/truffle-api/24.0.1/truffle-api-24.0.1.jar' -OutFile 'dist\truffle-api-24.0.1.jar'"

echo [5/5] Downloading icu4j-74.2.jar (Required for JS)...
powershell -Command "Invoke-WebRequest -Uri '%BASE_URL%/com/ibm/icu/icu4j/74.2/icu4j-74.2.jar' -OutFile 'dist\icu4j-74.2.jar'"

echo.
echo ============================================================
echo   GraalVM dependencies downloaded successfully.
echo   Cleaning up old Nashorn/ASM jars...
echo ============================================================
if exist "dist\nashorn-core-15.4.jar" del "dist\nashorn-core-15.4.jar"
if exist "dist\asm-9.7.jar" del "dist\asm-9.7.jar"
if exist "dist\asm-util-9.7.jar" del "dist\asm-util-9.7.jar"

echo.
echo Done! Please ensure you recompile the server after the code changes.
pause
