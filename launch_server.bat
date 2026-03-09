@echo off
title DojoSource Server - Captain's First Run
color 0b

echo [%DATE% %TIME%] Starting DojoSource Server...
echo -------------------------------------------------------

:: Here we point to the WZ folder and your newly compiled JAR
java -Dnet.sf.odinms.wzpath=wz -Xmx2G -Xms1G -jar dist\DojoSource-v117-new-code.jar

echo -------------------------------------------------------
echo [%DATE% %TIME%] Server stopped!
pause