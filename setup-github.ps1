# MyHost GitHub Setup Script
# Run this AFTER installing Git

Write-Host "=== MyHost GitHub Setup ===" -ForegroundColor Green
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

# Also check if git is in PATH
if (-not $gitPath) {
    try {
        $gitVersion = git --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            $gitPath = "git"
        }
    } catch {
        # Git not found
    }
}

if (-not $gitPath) {
    Write-Host "ERROR: Git not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://git-scm.com/download/win" -ForegroundColor Cyan
    Write-Host "2. Install with default settings" -ForegroundColor Cyan
    Write-Host "3. Restart this terminal" -ForegroundColor Cyan
    Write-Host "4. Run this script again" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Opening Git download page..." -ForegroundColor Yellow
    Start-Process "https://git-scm.com/download/win"
    exit 1
}

Write-Host "✓ Git found!" -ForegroundColor Green
Write-Host ""

# Get GitHub username
Write-Host "Enter your GitHub username:" -ForegroundColor Cyan
$githubUsername = Read-Host

if ([string]::IsNullOrWhiteSpace($githubUsername)) {
    Write-Host "ERROR: Username cannot be empty!" -ForegroundColor Red
    exit 1
}

# Change to project directory
Set-Location $PSScriptRoot

# Initialize git if not already done
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Cyan
    if ($gitPath -eq "git") {
        git init
    } else {
        & $gitPath init
    }
    Write-Host "✓ Git initialized" -ForegroundColor Green
}

# Check if remote already exists
$remoteExists = $false
if ($gitPath -eq "git") {
    $remotes = git remote -v 2>&1
} else {
    $remotes = & $gitPath remote -v 2>&1
}

if ($remotes -match "origin") {
    Write-Host "Remote 'origin' already exists. Updating..." -ForegroundColor Yellow
    if ($gitPath -eq "git") {
        git remote set-url origin "https://github.com/$githubUsername/myhostke.git"
    } else {
        & $gitPath remote set-url origin "https://github.com/$githubUsername/myhostke.git"
    }
    $remoteExists = $true
}

# Add all files
Write-Host ""
Write-Host "Staging all files..." -ForegroundColor Cyan
if ($gitPath -eq "git") {
    git add .
} else {
    & $gitPath add .
}
Write-Host "✓ Files staged" -ForegroundColor Green

# Check if there are changes to commit
if ($gitPath -eq "git") {
    $status = git status --porcelain
} else {
    $status = & $gitPath status --porcelain
}

if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit!" -ForegroundColor Yellow
} else {
    # Commit changes
    Write-Host ""
    Write-Host "Creating commit..." -ForegroundColor Cyan
    if ($gitPath -eq "git") {
        git commit -m "Initial commit - MyHost app"
    } else {
        & $gitPath commit -m "Initial commit - MyHost app"
    }
    Write-Host "✓ Changes committed" -ForegroundColor Green
}

# Add remote if it doesn't exist
if (-not $remoteExists) {
    Write-Host ""
    Write-Host "Adding GitHub remote..." -ForegroundColor Cyan
    if ($gitPath -eq "git") {
        git remote add origin "https://github.com/$githubUsername/myhostke.git"
    } else {
        & $gitPath remote add origin "https://github.com/$githubUsername/myhostke.git"
    }
    Write-Host "✓ Remote added" -ForegroundColor Green
}

# Set main branch
Write-Host ""
Write-Host "Setting main branch..." -ForegroundColor Cyan
if ($gitPath -eq "git") {
    git branch -M main
} else {
    & $gitPath branch -M main
}

# Push to GitHub
Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "NOTE: You'll need to:" -ForegroundColor Yellow
Write-Host "  1. Create the repository 'myhostke' on GitHub first" -ForegroundColor Yellow
Write-Host "  2. Use your GitHub username and Personal Access Token when prompted" -ForegroundColor Yellow
Write-Host ""
Write-Host "Repository URL: https://github.com/$githubUsername/myhostke" -ForegroundColor Cyan
Write-Host ""

$continue = Read-Host "Have you created the repository on GitHub? (y/n)"
if ($continue -ne "y" -and $continue -ne "Y") {
    Write-Host ""
    Write-Host "Please create the repository first:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://github.com/new" -ForegroundColor Cyan
    Write-Host "2. Repository name: myhostke" -ForegroundColor Cyan
    Write-Host "3. Click 'Create repository'" -ForegroundColor Cyan
    Write-Host "4. Run this script again" -ForegroundColor Cyan
    exit 0
}

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "(You'll be prompted for username and password/token)" -ForegroundColor Yellow
Write-Host ""

if ($gitPath -eq "git") {
    git push -u origin main
} else {
    & $gitPath push -u origin main
}

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Repository: https://github.com/$githubUsername/myhostke" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next step: Deploy to Vercel" -ForegroundColor Yellow
    Write-Host "1. Go to: https://vercel.com" -ForegroundColor Cyan
    Write-Host "2. Import from GitHub" -ForegroundColor Cyan
    Write-Host "3. Select 'myhostke' repository" -ForegroundColor Cyan
    Write-Host "4. Deploy!" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Push failed. Common issues:" -ForegroundColor Red
    Write-Host "1. Repository doesn't exist on GitHub - create it first" -ForegroundColor Yellow
    Write-Host "2. Authentication failed - use Personal Access Token as password" -ForegroundColor Yellow
    Write-Host "3. Wrong username - check your GitHub username" -ForegroundColor Yellow
}

