@echo off
echo Installing Bitwig AI Assistant...
echo.

echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Please install Node.js 18+ from https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js found. Installing dependencies...
npm install

if %errorlevel% neq 0 (
    echo Failed to install dependencies.
    pause
    exit /b 1
)

echo.
echo Dependencies installed successfully!
echo.
echo To start the Bitwig AI Assistant:
echo 1. Make sure Bitwig Studio is running
echo 2. Run: npm run dev
echo 3. Open http://localhost:3000 in your browser
echo.
echo The assistant will automatically detect Bitwig Studio and allow you to control it directly.
echo.
pause 