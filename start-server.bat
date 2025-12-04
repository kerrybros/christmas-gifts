@echo off
echo 🎄 Starting Christmas Gifts Raffle Server... 🎄
echo.

REM Change to the directory where this batch file is located
cd /d "%~dp0"

echo Serving files from: %CD%
echo.
echo Server running at: http://localhost:8080
echo Press Ctrl+C to stop the server
echo.
echo Open your browser and navigate to: http://localhost:8080
echo.

REM Start Python HTTP server
python -m http.server 8080

