# 🗂️ [GLOBAL INDEX] — Índice Consolidado de Ativos e Módulos Enterprise

Este índice atua como o **Single Source of Truth (SSOT)** do repositório `agente-core`. Ele fornece um mapeamento completo e de alta legibilidade para humanos e modelos de IA localizarem recursos, políticas, motores cognitivos e competências estruturadas.

---

## 📊 Métricas do Ecossistema Restruturado

- **Total de Pastas Semânticas de Nível Superior**: 28
- **Camadas Arquiteturais (Tiers)**: 7
- **Base de Habilidades Modulares (Skills)**: 1.306 habilidades migradas com histórico Git preservado sob [/modules](file:///c:/Dev/agente-core/modules)
- **Governança Unificada**: Ativada via [/governance](file:///c:/Dev/agente-core/governance) e [/rules](file:///c:/Dev/agente-core/rules)

---

## 📜 Sistema de Governança e Diretórios Especiais

Além dos 28 diretórios semânticos padrão, o ecossistema é regulado por ativos de governança de alta prioridade localizados na raiz do repositório:

*   [**`AGENTS.md` (Constituição Suprema)**](file:///c:/Dev/agente-core/AGENTS.md) — A constituição do projeto contendo as leis de sandbox, limites de terminal, tratamento cp1252 e padrões de interface (APCA, Bento Grids, 8px, Translucidez).
*   [**`.agents/` (Diretório Oculto de Controle)**](file:///c:/Dev/agente-core/.agents) — Diretório privado de controle dos motores:
    *   [rules/GEMINI.md](file:///c:/Dev/agente-core/.agents/rules/GEMINI.md) — Regras de contexto, codificação e chamadas MCP para o Google Gemini.
    *   [rules/CLAUDE.md](file:///c:/Dev/agente-core/.agents/rules/CLAUDE.md) — Convenções de design engineering, tipagem typescript e suites de QA para Claude/modelos lógicos.
    *   [skills/SKILL.md](file:///c:/Dev/agente-core/.agents/skills/SKILL.md) — Template padrão-ouro para manifestos de módulos de competência.

---

## 🔍 Tabela Geral de Indexação Semântica

Abaixo está o índice completo dos 28 diretórios do framework, ordenados alfabeticamente para busca rápida:

| Categoria Semântica | Localização Física (Link) | Camada Lógica | Propósito Principal |
| :--- | :--- | :--- | :--- |
| **ai-systems** | [ai-systems](file:///c:/Dev/agente-core/ai-systems) | Tier 3 (Inteligência) | Modelos cognitivos, LLMs e orquestração cognitiva. |
| **architecture** | [architecture](file:///c:/Dev/agente-core/architecture) | Tier 2 (Estratégia) | Desenho arquitetural, topologias e diagramas SSOT. |
| **assets** | [assets](file:///c:/Dev/agente-core/assets) | Tier 7 (Qualidade) | Recursos de design, mídias, logotipos e componentes visuais. |
| **audits** | [audits](file:///c:/Dev/agente-core/audits) | Tier 7 (Qualidade) | Relatórios de segurança, compliance e auditorias estruturais. |
| **automations** | [automations](file:///c:/Dev/agente-core/automations) | Tier 4 (Operações) | Scripts de execução automática, cronjobs e rotinas. |
| **context-maps** | [context-maps](file:///c:/Dev/agente-core/context-maps) | Tier 3 (Inteligência) | Partições de memória, indexação semântica e limites de contexto. |
| **diagnostics** | [diagnostics](file:///c:/Dev/agente-core/diagnostics) | Tier 7 (Qualidade) | Telemetria, logs históricos de erro e métricas do motor. |
| **documentation** | [documentation](file:///c:/Dev/agente-core/documentation) | Tier 7 (Qualidade) | Documentos de uso geral, manuais extensivos e FAQs. |
| **examples** | [examples](file:///c:/Dev/agente-core/examples) | Tier 6 (Execução) | Casos de uso práticos, laboratórios de código e demonstrações. |
| **execution-flows** | [execution-flows](file:///c:/Dev/agente-core/execution-flows) | Tier 2 (Estratégia) | Sequenciamento tático de processos e passos operacionais de tarefas. |
| **governance** | [governance](file:///c:/Dev/agente-core/governance) | Tier 1 (Governança) | Limites de compliance de IA e diretrizes da constituição agêntica. |
| **integrations** | [integrations](file:///c:/Dev/agente-core/integrations) | Tier 4 (Operações) | Clientes de APIs externas e integrações com serviços em nuvem. |
| **internal-tools** | [internal-tools](file:///c:/Dev/agente-core/internal-tools) | Tier 4 (Operações) | CLIs internas, scripts de auxílio ao DEV e helpers locais. |
| **knowledge-base** | [knowledge-base](file:///c:/Dev/agente-core/knowledge-base) | Tier 5 (Conhecimento) | Bases conceituais profundas de domínio e artigos enriquecidos. |
| **mcp-integrations** | [mcp-integrations](file:///c:/Dev/agente-core/mcp-integrations) | Tier 4 (Operações) | Servidores MCP (`mcp_config.json`) e briefings ([Stitch](file:///c:/Dev/agente-core/mcp-integrations/connectors/stitch-mcp.md), [TestSprite](file:///c:/Dev/agente-core/mcp-integrations/connectors/test-sprite.md)). |
| **modules** | [modules](file:///c:/Dev/agente-core/modules) | Tier 6 (Execução) | Catálogo com mais de 1.300 competências de desenvolvimento ativo. |
| **onboarding** | [onboarding](file:///c:/Dev/agente-core/onboarding) | Tier 7 (Qualidade) | Manuais de setup inicial de ambiente para novos devs (e IAs). |
| **operational-guides** | [operational-guides](file:///c:/Dev/agente-core/operational-guides) | Tier 7 (Qualidade) | Guias e manuais de operações diárias do ecossistema. |
| **patterns** | [patterns](file:///c:/Dev/agente-core/patterns) | Tier 5 (Conhecimento) | Padrões de design de código corporativos e de arquitetura. |
| **playbooks** | [playbooks](file:///c:/Dev/agente-core/playbooks) | Tier 5 (Conhecimento) | Manuais de incidentes, mitigação de bugs e runbooks. |
| **prompts** | [prompts](file:///c:/Dev/agente-core/prompts) | Tier 3 (Inteligência) | Biblioteca corporativa de prompts do sistema e templates. |
| **references** | [references](file:///c:/Dev/agente-core/references) | Tier 5 (Conhecimento) | Glossários técnicos, referências externas e dicionários. |
| **roadmaps** | [roadmaps](file:///c:/Dev/agente-core/roadmaps) | Tier 2 (Estratégia) | Marcos evolutivos de tecnologia e cronogramas estratégicos. |
| **rules** | [rules](file:///c:/Dev/agente-core/rules) | Tier 1 (Governança) | Instruções estritas de conformidade sintática para prompts. |
| **standards** | [standards](file:///c:/Dev/agente-core/standards) | Tier 1 (Governança) | Padrões de codificação corporativos e regras de nomenclatura. |
| **technical-decisions** | [technical-decisions](file:///c:/Dev/agente-core/technical-decisions) | Tier 1 (Governança) | Histórico de ADRs (Architecture Decision Records) aprovadas. |
| **templates** | [templates](file:///c:/Dev/agente-core/templates) | Tier 6 (Execução) | Modelos prontos de scaffold e skeletons de código. |
| **workflows** | [workflows](file:///c:/Dev/agente-core/workflows) | Tier 6 (Execução) | Orquestrações corporativas de CI/CD e pipelines complexos. |

---

## 📌 Guia de Integração Rápida para o Desenvolvedor

### Como adicionar um novo recurso?
1.  **Habilidades Operacionais**: Se estiver injetando uma nova competência funcional reutilizável de código, crie a subpasta sob o escopo correspondente dentro de [/modules](file:///c:/Dev/agente-core/modules) e registre sua entrada no [/modules/skills_index.json](file:///c:/Dev/agente-core/modules/skills_index.json).
2.  **Políticas Operacionais**: Se estiver alterando regras ou guardrails sintáticos de ferramentas, use o [/rules](file:///c:/Dev/agente-core/rules) para IA ou o [/standards](file:///c:/Dev/agente-core/standards) para estilo de código.
3.  **Decisões Gerais**: Se propuser uma mudança estrutural nas dependências das camadas, redija uma ADR sob [/technical-decisions](file:///c:/Dev/agente-core/technical-decisions).

### Como a IA deve ler este índice?
1.  Use este arquivo para validar se uma pasta semântica já existe antes de sugerir ou criar novas pastas raiz.
2.  Evite colocar documentos soltos no diretório raiz do repositório. Todo ativo documental deve ser mapeado em um dos 28 diretórios especializados listados acima.
