# Script to push changes to GitHub
# Run this in PowerShell or VS Code terminal

Write-Host "=== Pushing Airbnb UI Changes to GitHub ===" -ForegroundColor Green
Write-Host ""

# Check if Git is available
$gitPath = $null
$possiblePaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $gitPath = $path
        break
    }
}

if (-not $gitPath) {
    Write-Host "ERROR: Git not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please use one of these methods:" -ForegroundColor Yellow
    Write-Host "1. VS Code/Cursor: Open Source Control (Ctrl+Shift+G), stage changes, commit, and push"
    Write-Host "2. GitHub Desktop: Open the app, commit and push"
    Write-Host "3. Install Git: https://git-scm.com/download/win"
    exit 1
}

Write-Host "Found Git at: $gitPath" -ForegroundColor Green
Write-Host ""

# Change to project directory
Set-Location $PSScriptRoot

# Stage all changes
Write-Host "Staging changes..." -ForegroundColor Cyan
& $gitPath add .

# Check if there are changes to commit
$status = & $gitPath status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit!" -ForegroundColor Yellow
    exit 0
}

# Commit changes
Write-Host "Committing changes..." -ForegroundColor Cyan
& $gitPath commit -m "Add Airbnb-inspired UI design with modern header, hero section, and property details"

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
& $gitPath push

Write-Host ""
Write-Host "SUCCESS! Changes pushed to GitHub." -ForegroundColor Green
Write-Host "Vercel will auto-deploy in 1-2 minutes." -ForegroundColor Green
Write-Host ""
Write-Host "Check your site: https://my-host-qs93oqbxn-njogukvictors-projects.vercel.app/" -ForegroundColor Cyan

