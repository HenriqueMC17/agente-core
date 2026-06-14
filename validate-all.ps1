# Script de Validação Geral de Coerência e Governança do agente-core
# Padrão 2026 - Executa todas as checagens locais de integridade

$ErrorActionPreference = "Stop"

# Configura encoding de saída para UTF-8 no Windows PowerShell
if ($PSVersionTable.PSVersion.Major -lt 6) {
    $OutputEncoding = [System.Text.Encoding]::UTF8
}

Write-Output "==================================================="
Write-Output "   Iniciando Validação Geral do Ecossistema       "
Write-Output "==================================================="

# 1. Executa o Validador Estrutural
Write-Output "`n[INFO] Passo 1/2: Validando árvore de camadas constitucionais..."
try {
    & "$PSScriptRoot\internal-tools\validators\structural-validator.ps1" -BasePath $PSScriptRoot
    Write-Output "✅ VALIDAÇÃO ESTRUTURAL COMPLETA: Todos os diretórios estão conformes."
} catch {
    Write-Error "❌ ERRO: Validação estrutural falhou."
    exit 1
}

# 2. Executa o Validador de Skills
Write-Output "`n[INFO] Passo 2/2: Validando estrutura de SKILL.md em /modules..."
$PythonScript = "$PSScriptRoot\internal-tools\skill_categorization\tools\scripts\validate_skills.py"

if (Get-Command python -ErrorAction SilentlyContinue) {
    & python $PythonScript
    if ($LASTEXITCODE -ne 0) {
        Write-Error "❌ ERRO: Validação de skills encontrou inconsistências."
        exit 1
    }
    Write-Output "✅ VALIDAÇÃO DE SKILLS COMPLETA: Todos os manifestos válidos."
} else {
    Write-Warning "⚠️ AVISO: Python não encontrado no PATH. Pulando validação de skills."
}

Write-Output "`n🎉 ECOSSISTEMA INTEGRO E EM CONFORMIDADE!"
exit 0
