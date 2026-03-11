@echo off
set cp=dist\*;dist\asm-util-9.7.jar
if not exist "out\classes" mkdir "out\classes"
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
jar cvf dist\DojoSource-v117-new-code.jar -C out\classes .
if %errorlevel% neq 0 (
    echo Jar update FAILED!
    exit /b %errorlevel%
)
echo Jar update SUCCESS!
