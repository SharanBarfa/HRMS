@echo off
echo ===================================================
echo ERMS Project Starter - Original Configuration
echo ===================================================

echo.
echo Step 1: Killing any existing Node.js processes...
taskkill /F /IM node.exe 2>nul
echo Done.

echo.
echo Step 2: Starting the server...
start cmd /k "cd server && npm run dev"

echo.
echo Step 3: Waiting for server to initialize (5 seconds)...
timeout /t 5 /nobreak > nul

echo.
echo Step 4: Starting the client...
start cmd /k "cd client && npm run dev"

echo.
echo ===================================================
echo Project started with original configuration!
echo.
echo Server: http://localhost:5000
echo Client: http://localhost:5173
echo.
echo If you encounter any issues:
echo 1. Check the console logs in both terminal windows
echo 2. Check browser console for any errors (F12)
echo ===================================================
