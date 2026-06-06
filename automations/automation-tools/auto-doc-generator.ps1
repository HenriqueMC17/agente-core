param (
    [string]$BasePath = "c:\Dev\agente-core"
)

$ErrorActionPreference = "Continue"

$architecturePath = Join-Path $BasePath "architecture"
if (-not (Test-Path $architecturePath)) {
    New-Item -ItemType Directory -Path $architecturePath -Force | Out-Null
}

$ConstitutionalDirs = @(
    "governance", "rules", "standards", "technical-decisions", # Camada 1
    "architecture", "execution-flows", "roadmaps",             # Camada 2
    "ai-systems", "prompts", "context-maps",                   # Camada 3
    "mcp-integrations", "integrations", "automations", "internal-tools", # Camada 4
    "knowledge-base", "patterns", "references", "playbooks",   # Camada 5
    "modules", "templates", "examples", "workflows",           # Camada 6
    "audits", "diagnostics", "onboarding", "operational-guides", "documentation", "assets" # Camada 7
)

# Mapeamento do Tier para cada categoria
$DirTiers = @{
    "governance" = "Tier 1 (Governança & Compliance)"; "rules" = "Tier 1 (Governança & Compliance)"; "standards" = "Tier 1 (Governança & Compliance)"; "technical-decisions" = "Tier 1 (Governança & Compliance)"
    "architecture" = "Tier 2 (Estratégia & Arquitetura)"; "execution-flows" = "Tier 2 (Estratégia & Arquitetura)"; "roadmaps" = "Tier 2 (Estratégia & Arquitetura)"
    "ai-systems" = "Tier 3 (Inteligência & Raciocínio)"; "prompts" = "Tier 3 (Inteligência & Raciocínio)"; "context-maps" = "Tier 3 (Inteligência & Raciocínio)"
    "mcp-integrations" = "Tier 4 (Operações & Integrações)"; "integrations" = "Tier 4 (Operações & Integrações)"; "automations" = "Tier 4 (Operações & Integrações)"; "internal-tools" = "Tier 4 (Operações & Integrações)"
    "knowledge-base" = "Tier 5 (Conhecimento & Padrões)"; "patterns" = "Tier 5 (Conhecimento & Padrões)"; "references" = "Tier 5 (Conhecimento & Padrões)"; "playbooks" = "Tier 5 (Conhecimento & Padrões)"
    "modules" = "Tier 6 (Execução & Entrega)"; "templates" = "Tier 6 (Execução & Entrega)"; "examples" = "Tier 6 (Execução & Entrega)"; "workflows" = "Tier 6 (Execução & Entrega)"
    "audits" = "Tier 7 (Qualidade & Ciclo de Vida)"; "diagnostics" = "Tier 7 (Qualidade & Ciclo de Vida)"; "onboarding" = "Tier 7 (Qualidade & Ciclo de Vida)"; "operational-guides" = "Tier 7 (Qualidade & Ciclo de Vida)"; "documentation" = "Tier 7 (Qualidade & Ciclo de Vida)"; "assets" = "Tier 7 (Qualidade & Ciclo de Vida)"
}

# Descrição resumida padrão para cada categoria
$DirDescriptions = @{
    "governance" = "Modelos de conformidade, leis constitucionais do framework e diretrizes de supervisão humana.";
    "rules" = "Instruções executáveis de IA, regras semânticas por tecnologia e triggers operacionais.";
    "standards" = "Convenções de codificação, padrões de formatação, guias de nomenclatura e estilos.";
    "technical-decisions" = "Registro histórico e formal de decisões arquiteturais (ADRs).";
    "architecture" = "Desenho arquitetural, topologias e diagramas SSOT.";
    "execution-flows" = "Sequenciamento tático de processos e passos operacionais de tarefas.";
    "roadmaps" = "Marcos evolutivos de tecnologia e cronogramas estratégicos.";
    "ai-systems" = "Modelos cognitivos, LLMs e orquestração cognitiva.";
    "prompts" = "Biblioteca corporativa de prompts do sistema e templates.";
    "context-maps" = "Partições de memória, indexação semântica e limites de contexto.";
    "mcp-integrations" = "Servidores MCP (mcp_config.json) e briefings de conectores.";
    "integrations" = "Clientes de APIs externas e integrações com serviços em nuvem.";
    "automations" = "Scripts de execução automática, cronjobs e rotinas.";
    "internal-tools" = "CLIs internas, scripts de auxílio ao DEV e helpers locais.";
    "knowledge-base" = "Bases conceituais profundas de domínio e artigos enriquecidos.";
    "patterns" = "Padrões de design de código corporativos e de arquitetura.";
    "references" = "Glossários técnicos, referências externas e dicionários.";
    "playbooks" = "Manuais de incidentes, mitigação de bugs e runbooks.";
    "modules" = "Catálogo com mais de 1.300 competências de desenvolvimento ativo.";
    "templates" = "Modelos prontos de scaffold e skeletons de código.";
    "examples" = "Casos de uso práticos, laboratórios de código e demonstrações.";
    "workflows" = "Orquestrações corporativas de CI/CD e pipelines complexos.";
    "audits" = "Relatórios de segurança, compliance e auditorias estruturais.";
    "diagnostics" = "Telemetria, logs históricos de erro e métricas do motor.";
    "onboarding" = "Manuais de setup inicial de ambiente para novos devs (e IAs).";
    "operational-guides" = "Guias e manuais de operações diárias do ecossistema.";
    "documentation" = "Documentações gerais, release notes e FAQs do ecossistema.";
    "assets" = "Recursos de design, mídias, logotipos e componentes visuais."
}

function New-GlobalIndex {
    $content = "# 🗂️ [GLOBAL INDEX] — Índice Consolidado de Ativos e Módulos Enterprise`n`n"
    $content += "Este índice atua como o **Single Source of Truth (SSOT)** do repositório ``agente-core``. Ele fornece um mapeamento completo e de alta legibilidade para humanos e modelos de IA localizarem recursos, políticas, motores cognitivos e competências estruturadas.`n`n"
    $content += "---`n`n"
    $content += "## 📊 Métricas do Ecossistema Restruturado`n`n"
    $content += "- **Total de Pastas Semânticas de Nível Superior**: 28`n"
    $content += "- **Camadas Arquiteturais (Tiers)**: 7`n"
    $content += "- **Base de Habilidades Modulares (Skills)**: 1.306 habilidades sob [/modules](file:///c:/Dev/agente-core/modules)`n"
    $content += "- **Governança Unificada**: Ativada via [/governance](file:///c:/Dev/agente-core/governance) e [/rules](file:///c:/Dev/agente-core/rules)`n`n"
    $content += "---`n`n"
    $content += "## 📜 Sistema de Governança e Diretórios Especiais`n`n"
    $content += "*   [**``AGENTS.md`` (Constituição Suprema)**](file:///c:/Dev/agente-core/AGENTS.md) — A constituição do projeto contendo as leis de sandbox, limites de terminal e padrões de interface.`n"
    $content += "*   [**``.agents/`` (Diretório Oculto de Controle)**](file:///c:/Dev/agente-core/.agents) — Diretório privado de controle dos motores.`n`n"
    $content += "---`n`n"
    $content += "## 🔍 Tabela Geral de Indexação Semântica`n`n"
    $content += "| Categoria Semântica | Localização Física (Link) | Camada Lógica | Propósito Principal |`n"
    $content += "| :--- | :--- | :--- | :--- |`n"

    foreach ($d in $ConstitutionalDirs) {
        $tier = $DirTiers[$d]
        $desc = $DirDescriptions[$d]
        $content += "| **$d** | [$d](file:///c:/Dev/agente-core/$d) | $tier | $desc |`n"
    }

    Set-Content -Path (Join-Path $architecturePath "global-index.md") -Value $content -Encoding UTF8
}

function New-SemanticTree {
    $content = "# 🌳 [SEMANTIC TREE] — Mapa de Conexões e Topologia Semântica`n`n"
    $content += "Este documento estabelece a topologia semântica do repositório ``agente-core``. A organização semântica consolida 28 categorias corporativas estruturadas em 7 camadas lógicas de alta coesão e baixo acoplamento.`n`n"
    $content += "---`n`n"
    $content += "## 🏛️ Estrutura de Diretórios Autorizados`n`n"
    $content += "```txt`n"
    $content += "Raiz [agente-core]`n"
    $content += " ├── .agents/                    <-- Controle de IA (Seguro e Privado)`n"
    
    # Agrupar e desenhar por Tier
    $lastTier = ""
    foreach ($d in $ConstitutionalDirs) {
        $currentTier = $DirTiers[$d]
        if ($currentTier -ne $lastTier) {
            $content += " |`n"
            $content += " ├── [$currentTier]`n"
            $lastTier = $currentTier
        }
        $content += " │   ├── $d/`n"
    }
    
    $content += "````n"
    Set-Content -Path (Join-Path $architecturePath "semantic-tree.md") -Value $content -Encoding UTF8
}

New-GlobalIndex
New-SemanticTree

Write-Output "Documentation and indexes generated successfully under /architecture/."
