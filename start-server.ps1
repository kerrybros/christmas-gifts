# Christmas Gifts Raffle Server Startup Script
Write-Host "🎄 Starting Christmas Gifts Raffle Server... 🎄" -ForegroundColor Green
Write-Host ""

# Get the directory where this script is located
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Change to that directory
Set-Location $scriptDir

# Display current directory
Write-Host "Serving files from: $scriptDir" -ForegroundColor Yellow
Write-Host ""

# Start the server
Write-Host "Server running at: http://localhost:8080" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Cyan
Write-Host ""
Write-Host "Open your browser and navigate to: http://localhost:8080" -ForegroundColor Green
Write-Host ""

# Start Python HTTP server
python -m http.server 8080

