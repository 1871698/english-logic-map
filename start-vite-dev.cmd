@echo off
cd /d "%~dp0"
"D:\nodejs\node.exe" "D:\nodejs\node_modules\npm\bin\npm-cli.js" run dev >> "%~dp0\.vite-dev.log" 2>> "%~dp0\.vite-dev.err.log"
