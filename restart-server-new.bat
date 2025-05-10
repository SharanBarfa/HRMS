@echo off
echo Stopping existing server processes...
taskkill /f /im node.exe

echo Starting server with new configuration...
cd server
npm run dev
