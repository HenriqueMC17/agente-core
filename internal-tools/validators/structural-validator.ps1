param (
    [string]$BasePath = "c:\Dev\agente-core"
)

$ErrorActionPreference = "Continue"

# Lista constitucional das 28 categorias corporativas permitidas na raiz do repositório
$ConstitutionalDirs = @(
    "governance", "rules", "standards", "technical-decisions", # Camada 1
    "architecture", "execution-flows", "roadmaps",             # Camada 2
    "ai-systems", "prompts", "context-maps",                   # Camada 3
    "mcp-integrations", "integrations", "automations", "internal-tools", # Camada 4
    "knowledge-base", "patterns", "references", "playbooks",   # Camada 5
    "modules", "templates", "examples", "workflows",           # Camada 6
    "audits", "diagnostics", "onboarding", "operational-guides", "documentation", "assets" # Camada 7
)

# Diretórios ocultos ou de controle do sistema que são explicitamente permitidos na raiz
$AllowedSystemDirs = @(
    ".git", ".agents", ".github", ".vscode", ".idea", "node_modules"
)

$allValid = $true

# 1. Verificar se todos os diretórios constitucionais existem e contêm README.md
foreach ($d in $ConstitutionalDirs) {
    $dirPath = Join-Path $BasePath $d
    if (-not (Test-Path $dirPath -PathType Container)) {
        Write-Warning "VAL-ERR: O diretório constitucional '$d' está faltando na raiz."
        $allValid = $false
        continue
    }

    $readmePath = Join-Path $dirPath "README.md"
    if (-not (Test-Path $readmePath -PathType Leaf)) {
        Write-Warning "VAL-ERR: README.md não encontrado em '$d/'."
        $allValid = $false
    }
}

# 2. Verificar se existem diretórios extras não autorizados na raiz do repositório
$actualDirs = Get-ChildItem -Path $BasePath -Directory | Select-Object -ExpandProperty Name
foreach ($dirName in $actualDirs) {
    if ($ConstitutionalDirs -notcontains $dirName -and $AllowedSystemDirs -notcontains $dirName) {
        Write-Warning "VAL-ERR: Diretório não autorizado encontrado na raiz: '$dirName/' (Violação de Governança Suprema)."
        $allValid = $false
    }
}

# 3. Verificar se todos os arquivos README.md e o AGENTS.md estão em UTF-8 válido (evitando falhas cp1252)
$FilesToCheck = @()
foreach ($d in $ConstitutionalDirs) {
    $readme = Join-Path (Join-Path $BasePath $d) "README.md"
    if (Test-Path $readme -PathType Leaf) {
        $FilesToCheck += $readme
    }
}
$FilesToCheck += Join-Path $BasePath "AGENTS.md"
$FilesToCheck += Join-Path $BasePath "README.md"

try {
    $utf8Verifier = New-Object System.Text.UTF8Encoding($false, $true)
    foreach ($f in $FilesToCheck) {
        if (Test-Path $f -PathType Leaf) {
            try {
                $bytes = [System.IO.File]::ReadAllBytes($f)
                $null = $utf8Verifier.GetString($bytes)
            } catch {
                Write-Warning "VAL-ERR: O arquivo '$f' contém caracteres inválidos para UTF-8 (Provável salvamento em ANSI/cp1252)."
                $allValid = $false
            }
        }
    }
} catch {
    Write-Warning "⚠️ Erro ao inicializar o verificador UTF-8 do .NET."
}

if ($allValid) {
    Write-Output "SUCCESS: Todos os 28 diretórios e encodings do framework passam na validação estrutural."
    exit 0
} else {
    Write-Error "FAILURE: A validação estrutural falhou devido a inconsistências de governança."
    exit 1
}
