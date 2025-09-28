Param()

# This script checks and installs dependencies and ensures Hugo is installed.

Write-Host "🏠 Smart Apartment Blog - Install prerequisites" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Ensure Node dependencies (prefer pnpm, fallback to npm)
$usePnpm = $true
if (-not (Get-Command pnpm -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️  pnpm not found, falling back to npm. Consider installing pnpm: https://pnpm.io/installation" -ForegroundColor Yellow
    $usePnpm = $false
}

if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing JavaScript dependencies..." -ForegroundColor Yellow
    if ($usePnpm) { pnpm install } else { npm install }
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
    Write-Host "✅ JS dependencies installed" -ForegroundColor Green
} else {
    Write-Host "📦 node_modules present, skipping JS install" -ForegroundColor Green
}

# Ensure Hugo is installed
function Ensure-HugoInstalled {
    if (Get-Command hugo -ErrorAction SilentlyContinue) { return $true }

    Write-Host "🔎 Hugo not found. Attempting installation..." -ForegroundColor Yellow

    if (Get-Command winget -ErrorAction SilentlyContinue) {
        winget install -e --id Hugo.Hugo --accept-package-agreements --accept-source-agreements --silent | Out-Null
        if ($LASTEXITCODE -eq 0 -and (Get-Command hugo -ErrorAction SilentlyContinue)) { return $true }
    }

    if (Get-Command choco -ErrorAction SilentlyContinue) {
        choco install hugo -y | Out-Null
        if ($LASTEXITCODE -eq 0 -and (Get-Command hugo -ErrorAction SilentlyContinue)) { return $true }
    }

    if (Get-Command scoop -ErrorAction SilentlyContinue) {
        scoop install hugo | Out-Null
        if ($LASTEXITCODE -eq 0 -and (Get-Command hugo -ErrorAction SilentlyContinue)) { return $true }
    }

    return $false
}

$hugoOk = Ensure-HugoInstalled
if (-not $hugoOk) {
    Write-Host "❌ Could not install Hugo automatically. Please install manually:" -ForegroundColor Red
    Write-Host "   - Hugo Releases: https://github.com/gohugoio/hugo/releases"
    Write-Host "   - Docs: https://gohugo.io/getting-started/installing/"
    exit 1
}

Write-Host "✅ Hugo available: $(hugo version)" -ForegroundColor Green
Write-Host "🎉 Install step completed." -ForegroundColor Green
