param (
    [string]$BasePath = "c:\Dev\agente-core"
)

$ErrorActionPreference = "Continue"

$dirs = Get-ChildItem -Path $BasePath -Directory | Where-Object { $_.Name -match "^(0[0-9]|1[0-7])-" }
$requiredFiles = @("README.md", "ARCHITECTURE.md", "RESPONSIBILITIES.md", "DEPENDENCIES.md", "WORKFLOWS.md", "BEST-PRACTICES.md")

$allValid = $true

foreach ($d in $dirs) {
    $missingFiles = @()
    foreach ($f in $requiredFiles) {
        $path = Join-Path $d.FullName $f
        if (-not (Test-Path $path)) {
            $missingFiles += $f
        }
    }
    
    if ($missingFiles.Count -gt 0) {
        Write-Warning "Module $($d.Name) is missing: $($missingFiles -join ', ')"
        $allValid = $false
    }
}

if ($allValid) {
    Write-Output "SUCCESS: All 18 modules pass the structural validation."
    exit 0
} else {
    Write-Error "FAILURE: Structural validation failed."
    exit 1
}
