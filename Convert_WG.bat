@echo off
@title WG Binary Converter
set CLASSPATH=.;dist\DojoSource-v117-new-code.jar;dist\lib\*;dist\resources;dist\
java -Dwzpath=wz -Doutpath=dist\resources -cp "%CLASSPATH%" tools.BinaryConverter
pause
