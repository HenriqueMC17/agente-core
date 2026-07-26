# 📜 CONSTITUIÇÃO SUPREMA DO PROJETO: DIRETRIZES PARA AGENTES DE IA (`AGENTS.md`)

Este documento estabelece a **Constituição Suprema e Inegociável** para qualquer Agente de Inteligência Artificial (incluindo Antigravity, Claude Code, Moltbot e outros agentes integrados via MCP) que opere dentro do ecossistema [`c:\Dev\.agente-core`](file:///c:/Dev/.agente-core).

Toda modificação de código, execução de terminal, orquestração de prompts e tomada de decisão arquitetural deve aderir de forma estrita às leis aqui consolidadas.

> [!IMPORTANT]
> **Adendos Constitucionais de Vanguarda (Padrões 2026):**
> O framework `agente-core` é estritamente regido pelas seguintes especificações atômicas detalhadas que complementam esta constituição:
>
> * **Fonte de Conhecimento Primária**: [c:\Dev\Docs](file:///c:/Dev/Docs/README.md) — 136 documentos de arquitetura, governança e engenharia de vanguarda 2026.
> * **Regras de Backend**: [backend-rules.md](file:///c:/Dev/.agente-core/rules/backend-rules.md) — Hexagonal Architecture, Mechanical Sympathy (Layout SoA com alinhamento de 64 bytes em cache line para prevenção de False Sharing), Prefill/Decode disaggregation, FlashAttention-3 e Zero Secrets by Design.
> * **Regras de Banco de Dados**: [database-rules.md](file:///c:/Dev/.agente-core/rules/database-rules.md) — Heurísticas CBO, Join Reordering, JOB benchmark, assimetria IMDB vs TPC-H e PACELC.
> * **Regras de Frontend**: [frontend-rules.md](file:///c:/Dev/.agente-core/rules/frontend-rules.md) — React Server Components (RSC sem `"use client"` por padrão), Astro, Tailwind CSS v4, FSD alignment, isolamento de threads Compositor vs Main e contratos de formulários HTML (action/method GET vs POST).
> * **Raciocínio Sistema 2 & COVE**: [agent-reasoning-cove.md](file:///c:/Dev/.agente-core/rules/agent-reasoning-cove.md) — Complexity Routing (Roteamento Bifásico System 1 autorregressivo vs System 2 deliberativo), SPEX (Speculative Exploration), Software 3.0 Bounded Autonomy, ciclo COVE e lógica FLARE.
> * **Engenharia de Contexto**: [context-engineering.md](file:///c:/Dev/.agente-core/rules/context-engineering.md) — Combate ao Context Rot, Governança Ativa via RAG/RdR por MCP e 5 camadas de memória LOCOMO 2026.
> * **Design Engineering Premium**: [design-engineering-premium.md](file:///c:/Dev/.agente-core/standards/design-engineering-premium.md) — Grades de 8px, Dark Mode Tri-Layer (L0/L1/L2), APCA, CSS linear() e Liquid Glass.
> * **Diretrizes de Desempenho**: [performance-guidelines.md](file:///c:/Dev/.agente-core/standards/performance-guidelines.md) — Desagregação de serving (Prefill/Decode), localidade de cache e pipelines de renderização.
> * **Governança de PRs de IA**: [ai-pull-request-governance.md](file:///c:/Dev/.agente-core/governance/ai-pull-request-governance.md) — Commits atômicos semânticos, evidências de testes manuais e proibição de merge autônomo.
> * **Estratégia C-Suite & Modelos**: [c-suite-ai-strategy.md](file:///c:/Dev/.agente-core/governance/c-suite-ai-strategy.md) — AI-BOM (AI Bill of Materials), EU AI Act com Business Rules Engines (BRE), alinhamento DORA/SPACE com P&L e mitigação de Model Drift.

---

## 🏛️ 1. Hierarquia Normativa e Constitucional

O sistema de governança agêntica opera sob uma estrutura piramidal de conformidade técnica rígida. Em caso de ambiguidade ou conflito de diretrizes, a prioridade de resolução segue esta ordem decrescente absoluta:

```text
       [NÍVEL 0] FLARE Framework (Faithful Logic-Aided Reasoning)
        ▲  [NÍVEL 1] GEMINI.md (.agents/rules/GEMINI.md)
       ▲▲  [NÍVEL 2] AGENTS.md (Esta Constituição do Projeto)
      ▲▲▲  [NÍVEL 3] .agents/rules/ (Diretivas Específicas por Modelo)
     ▲▲▲▲  [NÍVEL 4] governance/ & rules/ (Regras Gerais do Framework)
```

0. **`FLARE` (Faithful Logic-Aided Reasoning and Exploration):** Framework neuro-simbólico que atua como barreira lógica suprema de validação formal.
1. **`GEMINI.md` (.agents/rules/GEMINI.md):** Suprema instrução operacional de baixo nível para motores Google.
2. **`AGENTS.md` (Esta Constituição):** A Carta Magna do repositório, ditando a filosofia do "Craft", Clean Architecture e governança ativa.
3. **`.agents/rules/` (Rules de Modelo):** Diretivas específicas (como `CLAUDE.md` ou `GEMINI.md`) focadas nas capacidades de cada modelo.
4. **`/rules` e `/governance`:** As regras gerais do framework contendo os adendos constitucionais listados acima.

---

## 🛡️ 2. Sandbox, Segurança e Limites Operacionais do Agente

- **Positive Security & Zero Secrets by Design:** Todas as ações permitidas em runtime devem passar por validação explícita. É terminantemente proibido hardcodear API keys, segredos ou credenciais em código gerado, assim como spawnar processos ocultos ou acessar arquivos fora do workspace `c:\Dev\`.
- **Proibição Absoluta do Comando `cd`:** NUNCA tente executar comandos `cd` no terminal do sistema. Especificar caminhos absolutos ou usar a propriedade `Cwd` da ferramenta.
- **Proibição de Merge Autônomo por Agente:** Os agentes possuem permissões para manipular branches e criar Pull Requests, mas são proibidos de realizar merges na branch de produção sem aprovação humana formal.
- **Tratamento Defensivo contra Codificação de Terminal (Windows - Cp1252):** Blindar scripts contra exceções de encoding definindo `PYTHONIOENCODING=utf-8` ou manuseando exceptions com fallback gracioso.
- **Validação Determinística Estrita:** Toda alteração de código ou documentação deve obrigatoriamente passar no validador [validate-all.ps1](file:///c:/Dev/.agente-core/validate-all.ps1) com a flag `-Strict` sem nenhum link quebrado.

---

## 📐 3. Integridade da Clean Architecture (7 Camadas / 28 Categorias)

A estrutura física do repositório `agente-core` é **imutável em sua raiz semântica**.
Nenhum agente tem autoridade para criar novas pastas ou arquivos de primeiro nível fora das **28 categorias estruturadas em 7 camadas**:

```text
Raiz [.agente-core]
 ├── .agents/                    <-- [NÃO MAPPED] Controle de IA (Seguro e Privado)
 ├── .git/                       <-- [NÃO MAPPED] Controle de Versão Git
 ├── assets/                     <-- [CAMADA 7] Identidade Visual e Ativos Estáticos
 ├── governance/                 <-- [CAMADA 1] Constituição e Auditoria
 ├── rules/                      <-- [CAMADA 1] Guias de Sintaxe e Regras de Escrita
 ├── standards/                  <-- [CAMADA 1] Convenções de Nomenclatura e Estilos
 ├── technical-decisions/        <-- [CAMADA 1] Registro Histórico de ADRs
 ├── architecture/               <-- [CAMADA 2] Topologia Semântica e Diagramas
 ├── execution-flows/            <-- [CAMADA 2] Roteiros Táticos de Processos
 ├── roadmaps/                   <-- [CAMADA 2] Marcos Evolutivos do Motor
 ├── ai-systems/                 <-- [CAMADA 3] Pesos, LLMs e Personas de IA
 ├── prompts/                    <-- [CAMADA 3] System Instructions e Prompts Mestre
 ├── context-maps/               <-- [CAMADA 3] Indexação de Contexto e Memória
 ├── mcp-integrations/           <-- [CAMADA 4] Definições e Servidores de Protocolo
 ├── integrations/               <-- [CAMADA 4] Conectores de APIs e Webhooks
 ├── automations/                <-- [CAMADA 4] Scripts e Robôs Utilitários Locais
 ├── internal-tools/             <-- [CAMADA 4] CLIs e Ferramentas de Suporte Interno
 ├── knowledge-base/             <-- [CAMADA 5] Enciclopédias e Bases de Especialização
 ├── patterns/                   <-- [CAMADA 5] Design Patterns e Blueprints Clean Code
 ├── references/                 <-- [CAMADA 5] Dicionários e Documentações Padrão
 ├── playbooks/                  <-- [CAMADA 5] Manuais de Incidentes e Mitigações
 ├── modules/                    <-- [CAMADA 6] 1.300+ Módulos de Competência Real
 ├── templates/                  <-- [CAMADA 6] Boilerplates e Scaffolds Iniciais
 ├── examples/                   <-- [CAMADA 6] Aplicações Demo e Laboratórios Práticos
 ├── workflows/                  <-- [CAMADA 6] Pipelines de Integração CI/CD
 ├── audits/                     <-- [CAMADA 7] Verificações de Segurança e Pentests
 ├── diagnostics/                <-- [CAMADA 7] Telemetria, Logs e Observabilidade
 ├── onboarding/                 <-- [CAMADA 7] Guias de Setup e Preparação Host
 └── operational-guides/         <-- [CAMADA 7] Manuais de Rotina Diária de Equipes
```

---

## 🚀 4. Protocolo de Governança Ativa e Progressive Disclosure

Para evitar sobrecarga de contexto do modelo (*Context Rot*), o framework adota a **Governança Ativa via RAG/RdR por MCP** e a **Divulgação Progressiva de Habilidades** em [/modules](file:///c:/Dev/.agente-core/modules):

1. **Acesso Dinâmico via MCP:** O agente realiza consultas pontuais na base de conhecimento `Docs` através de MCP ou busca de índice semântico.
2. **Índices Semânticos:** Para encontrar uma habilidade, o agente lê primeiramente o arquivo [skills_index.json](file:///c:/Dev/.agente-core/modules/skills_index.json) ou o catálogo [CATALOG.md](file:///c:/Dev/.agente-core/modules/CATALOG.md).
3. **Declaração Atômica de Skill (`SKILL.md`):** Cada módulo ativo expõe um manifesto `SKILL.md` declarando assinaturas e permissões.

---

## 💎 5. Padrões de Interface e "Design Engineering"

Toda interface projetada ou codificada por agentes neste workspace deve seguir o manual de [Design Engineering Premium](file:///c:/Dev/.agente-core/standards/design-engineering-premium.md):

- **Rigor Visual:** Espaçamento baseado no grid técnico de **8px**. Uso de **Bento Grids**. Propriedade `font-variant-numeric: tabular-nums` obrigatória em tabelas.
- **Tipografia:** Fonte Geist (Sans/Mono).
- **Dark Mode Tri-Layer:** L0 (`#0D0D0D`), L1 (`#1A1A1A`) e L2 (`#2D2D2D`) delimitados por Crisp Borders de 1px.
- **GPU Acceleration e Transições de Mola:** Efeitos Liquid Glass forçados na GPU e transições via CSS `linear()`.

---

## 🔄 6. O Ciclo de Execução BMAD (Multi-Agent Workflow)

O desenvolvimento segue 5 fases de orquestração multiagente:

1. **Descoberta (`/pm`):** Storyboarding e mapeamento de jornadas.
2. **Arquitetura (`/architect`):** Modelagem de schemas e DNA visual.
3. **Implementação (`/dev`):** Vibe Check multimodal e escrita sob Turbo Mode.
4. **Garantia de Qualidade (`/qa`):** Testes automatizados (Vitest/Playwright/TestSprite) com 80%+ de cobertura.
5. **Deploy e Auto-Correção (`/devops`):** Esteiras GitOps com Self-Healing ativo.

---

*agente-core — Governança Ativa, Raciocínio Cognitivo e Excelência de Engenharia de Vanguarda 2026.*
