@echo off
echo Starting ERMS Application...

echo Starting Server...
start cmd /k "cd server && npm run dev"

echo Starting Client...
start cmd /k "cd client && npm run dev"

echo ERMS Application started successfully!
echo Server: http://localhost:5000
echo Client: http://localhost:5173
