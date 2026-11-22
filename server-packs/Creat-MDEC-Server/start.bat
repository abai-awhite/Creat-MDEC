@echo off
chcp 65001 >nul
cd /d "%~dp0"
set "JAVA=java"
if exist "D:\env\java\zulu21\bin\java.exe" set "JAVA=D:\env\java\zulu21\bin\java.exe"
echo 启动 Creat：MDEC 服务端 ...
"%JAVA%" @user_jvm_args.txt @libraries/net/neoforged/neoforge/21.1.248/win_args.txt nogui
pause
