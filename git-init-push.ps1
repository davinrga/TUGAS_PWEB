# git-init-push.ps1
# Usage: run this script in the project root (PowerShell)
# Requirements: Git must be installed and you must have network access to GitHub.
# The script will set a local git user.name/email (local config), create initial commit, add remote, and push.

Param(
  [string]$Remote = "https://github.com/davinrga/tugaspweb.git",
  [string]$Branch = "main",
  [string]$UserName = "",
  [string]$UserEmail = ""
)

Write-Host "Running git init & push script..."

# Ensure we're in the script folder (assumes script placed in project root)
$projectRoot = Get-Location
Write-Host "Project root: $projectRoot"

# Check git availability
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git is not installed or not in PATH. Please install Git and try again. https://git-scm.com/downloads"
  exit 1
}

# Initialize repo (if not already)
if (-not (Test-Path .git)) {
  git init
  Write-Host "Initialized empty Git repository."
} else {
  Write-Host ".git already exists — using existing repository."
}

git config user.name "$UserName"
git config user.email "$UserEmail"
# Resolve user name/email: prefer params, then global git config, then prompt
if ([string]::IsNullOrWhiteSpace($UserName)) {
  $globalName = (& git config --global user.name) 2>$null
  if ($globalName) { $UserName = $globalName.Trim() }
  else { $UserName = Read-Host "Masukkan nama Git (untuk commit). Tekan Enter untuk menggunakan 'anonymous'" }
  if ([string]::IsNullOrWhiteSpace($UserName)) { $UserName = "anonymous" }
}

if ([string]::IsNullOrWhiteSpace($UserEmail)) {
  $globalEmail = (& git config --global user.email) 2>$null
  if ($globalEmail) { $UserEmail = $globalEmail.Trim() }
  else { $UserEmail = Read-Host "Masukkan email Git (untuk commit). Tekan Enter untuk menggunakan 'anonymous@example.com'" }
  if ([string]::IsNullOrWhiteSpace($UserEmail)) { $UserEmail = "anonymous@example.com" }
}

# Apply as local config for the repo
git config user.name "$UserName"
git config user.email "$UserEmail"

# Add README and commit
git add README.md
try {
  git commit -m "first commit"
} catch {
  Write-Host "Commit failed — attempting to create an empty commit as fallback."
  git commit --allow-empty -m "first commit"
}

# Set branch
git branch -M $Branch

# Remove existing origin if exists
if (git remote get-url origin 2>$null) {
  git remote remove origin
}

# Add remote and push
git remote add origin $Remote
Write-Host "Pushing to $Remote (branch $Branch). You may be prompted to authenticate."
git push -u origin $Branch

Write-Host "Done. If push succeeded, your repo is on GitHub."