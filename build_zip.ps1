param([string]$zipName = 'interview-practice-samples.zip')
$folders = 'java-core','sql-plsql','spring-boot-samples','react-samples','todo-react'
$paths = $folders | ForEach-Object { Join-Path -Path (Get-Location) -ChildPath $_ }
Compress-Archive -Path $paths -DestinationPath $zipName -Force
Write-Host "Created $zipName in $(Get-Location)"
