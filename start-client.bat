@echo off
echo Starting ERMS Client...

cd client
npm run dev -- --port 5174

echo Client started on http://localhost:5174
