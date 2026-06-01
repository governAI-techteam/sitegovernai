$watchPath = "C:\governAI\bc-final-website"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $watchPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$ignore = @('\.git', 'node_modules', '\.next', 'package-lock\.json')
$debounce = @{}
$global:lastPush = [DateTime]::MinValue

$action = {
  $path = $Event.SourceEventArgs.FullPath
  foreach ($pattern in $ignore) {
    if ($path -match $pattern) { return }
  }
  $now = [DateTime]::UtcNow
  $key = $path
  $debounce[$key] = $now
  Start-Sleep -Milliseconds 3000
  if ($debounce[$key] -ne $now) { return }
  $debounce.Remove($key)

  Set-Location $Event.MessageData
  $status = git status --porcelain
  if (-not $status) { return }

  $timeStr = $now.ToString("yyyy-MM-dd HH:mm:ss")
  $changedFiles = ($status -split "`n" | ForEach-Object { if ($_ -match "^\S+\s+(.+)$") { $matches[1] } }) -join ", "
  git add -A
  git commit -m "Auto-update: changes in $changedFiles"
  git push
}

Register-ObjectEvent $watcher "Changed" -Action $action -MessageData $watchPath
Register-ObjectEvent $watcher "Created" -Action $action -MessageData $watchPath
Register-ObjectEvent $watcher "Deleted" -Action $action -MessageData $watchPath
Register-ObjectEvent $watcher "Renamed" -Action $action -MessageData $watchPath

Write-Host "Auto-push watcher running. Press Ctrl+C to stop."
while ($true) { Start-Sleep -Seconds 10 }
