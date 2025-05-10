@echo off
echo ERMS Server Starter
echo ==================

echo Testing database connections...
cd server
node test-db-connection.js

echo Starting server...
npm run dev
