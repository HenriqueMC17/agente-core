# 📜 CONSTITUIÇÃO SUPREMA DO PROJETO: DIRETRIZES PARA AGENTES DE IA (`AGENTS.md`)

Este documento estabelece a **Constituição Suprema e Inegociável** para qualquer Agente de Inteligência Artificial (incluindo Antigravity, Claude Code, Moltbot e outros agentes integrados via MCP) que opere dentro do ecossistema `c:\Dev\agente-core`. 

Toda modificação de código, execução de terminal, orquestração de prompts e tomada de decisão arquitetural deve aderir de forma estrita às leis aqui consolidadas.

> [!IMPORTANT]
> **Adendos Constitucionais de Vanguarda (Padrões 2026):**
> O framework `agente-core` é estritamente regido pelas seguintes especificações atômicas detalhadas que complementam esta constituição:
> *   **Regras de Backend**: [backend-rules.md](file:///c:/Dev/agente-core/rules/backend-rules.md) — Hexagonal Architecture, ORM vs ODM, Spark, Zig, JVM/.NET/Go/Node.js Thread e GC tuning.
> *   **Regras de Banco de Dados**: [database-rules.md](file:///c:/Dev/agente-core/rules/database-rules.md) — Heurísticas CBO, Join Reordering, JOB benchmark, assimetria IMDB vs TPC-H e PACELC.
> *   **Regras de Frontend**: [frontend-rules.md](file:///c:/Dev/agente-core/rules/frontend-rules.md) — React Server Components (RSC), Astro, Tailwind CSS v4, MRAH e segurança em JS.
> *   **Raciocínio Sistema 2 & COVE**: [agent-reasoning-cove.md](file:///c:/Dev/agente-core/rules/agent-reasoning-cove.md) — Heurística ToT, lookahead, ciclo COVE de 4 etapas e lógica FLARE.
> *   **Engenharia de Contexto**: [context-engineering.md](file:///c:/Dev/agente-core/rules/context-engineering.md) — Mínimo Contexto Viável (MVC), ordenação de contexto e tags XML estruturadas.
> *   **Design Engineering Premium**: [design-engineering-premium.md](file:///c:/Dev/agente-core/standards/design-engineering-premium.md) — Grades de 8px, Dark Mode Tri-Layer (L0/L1/L2), APCA, CSS linear() e Liquid Glass.
> *   **Diretrizes de Desempenho**: [performance-guidelines.md](file:///c:/Dev/agente-core/standards/performance-guidelines.md) — Desagregação de serving (Prefill/Decode), localidade de cache e pipelines de renderização.
> *   **Governança de PRs de IA**: [ai-pull-request-governance.md](file:///c:/Dev/agente-core/governance/ai-pull-request-governance.md) — Commits atômicos semânticos, evidências de testes manuais e proibição de merge autônomo.
> *   **Estratégia C-Suite & Modelos**: [c-suite-ai-strategy.md](file:///c:/Dev/agente-core/governance/c-suite-ai-strategy.md) — Gestão executiva sob o CAIO, alinhamento DORA/SPACE com P&L e mitigação de Model Drift.

---

## 🏛️ 1. Hierarquia Normativa e Constitucional

O sistema de governança agêntica opera sob uma estrutura piramidal de conformidade técnica rígida. Em caso de ambiguidade ou conflito de diretrizes, a prioridade de resolução segue esta ordem decrescente absoluta:

```text
       [NÍVEL 0] FLARE Framework (Faithful Logic-Aided Reasoning)
        ▲  [NÍVEL 1] GEMINI.md (Suprema Diretiva de Engine)
       ▲▲  [NÍVEL 2] AGENTS.md (Esta Constituição do Projeto)
      ▲▲▲  [NÍVEL 3] .agents/rules/ (Diretivas Específicas por Modelo)
     ▲▲▲▲  [NÍVEL 4] governance/ & rules/ (Regras Gerais do Framework)
```

0. **`FLARE` (Faithful Logic-Aided Reasoning and Exploration):** Framework neuro-simbólico que atua como barreira lógica suprema de validação formal, exigindo verificação lógica do raciocínio e das regras do projeto antes do Vibe Check final.
1. **`GEMINI.md` (.agents/rules/GEMINI.md):** Suprema instrução operacional de baixo nível para motores Google, ditando segurança física, integridade da máquina host e mitigação de erros de terminal.
2. **`AGENTS.md` (Esta Constituição):** A Carta Magna do repositório, ditando a filosofia do "Craft", Clean Architecture e interface de prestígio.
3. **`.agents/rules/` (Rules de Modelo):** Diretivas específicas (como `CLAUDE.md` ou `GEMINI.md`) focadas nas capacidades e limitações de cada modelo.
4. **`/rules` e `/governance`:** As regras gerais do framework contendo os adendos constitucionais listados acima.

---

## 🛡️ 2. Sandbox, Segurança e Limites Operacionais do Agente

Agentes autônomos operam sob uma Sandbox lógica e física no host. Qualquer tentativa de violar estes limites resultará em falha imediata do build e rejeição do Pull Request:

- **Positive Security (Segurança Positiva):** Todas as ações permitidas em runtime devem passar por validação explícita. É terminantemente proibido tentar spawnar processos ocultos, realizar requisições de rede não homologadas pelo host ou acessar arquivos fora do workspace corporativo `c:\Dev\`.
- **Proibição Absoluta do Comando `cd`:** NUNCA tente executar comandos `cd` no terminal do sistema. Todas as execuções de comandos de terminal (PowerShell, etc.) devem ser feitas especificando o caminho absoluto do executável ou configurando o diretório de trabalho corrente (`Cwd`) diretamente na propriedade apropriada da ferramenta.
- **Proibição de Merge Autônomo por Agente:** Os agentes possuem permissões para manipular branches e criar Pull Requests, mas são proibidos de realizar merges na branch de produção (`main`/`master`) sem revisão humana formal e aprovação ativa linha por linha por um desenvolvedor humano.
- **Tratamento Defensivo contra Codificação de Terminal (Windows - Cp1252):** O terminal Windows PowerShell opera em encoding local (`cp1252`). Scripts executados por agentes que imprimem emojis ou caracteres complexos UTF-8 sem tratamento defensivo (como `encoding='utf-8'` explícito em leituras/escritas e captura genérica de exceptions de encoding) sofrerão crash. É lei blindar os scripts contra falhas de console.
- **Mitigação da Whiplash de Aceleração:** Cada alteração lógica deve passar obrigatoriamente por testes unitários locais com no mínimo **80% de cobertura** e documentação de logs de verificação manual na descrição do PR, mitigando a introdução silenciosa de bugs em runtime.

---

## 📐 3. Integridade da Clean Architecture (7 Camadas / 28 Categorias)

A estrutura física do repositório `agente-core` é **imutável em sua raiz semântica**. 
Nenhum agente tem autoridade para criar novas pastas ou arquivos de primeiro nível fora das **28 categorias estruturadas em 7 camadas**:

```text
Raiz [agente-core]
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

## 🚀 4. Protocolo de Progressive Disclosure (Divulgação Progressiva)

Para evitar sobrecarga de contexto do modelo (reduzindo a latência do Time to First Token e economizando tokens de processamento), o framework adota a **Divulgação Progressiva de Habilidades** em [/modules](file:///c:/Dev/agente-core/modules):

1. **Acesso Oculto por Padrão:** As mais de 1.300 habilidades físicas residem em subpastas de `/modules`. O agente não deve ler todas simultaneamente.
2. **Uso de Índices Semânticos:** Para encontrar uma habilidade, o agente deve SEMPRE ler primeiramente o arquivo [skills_index.json](file:///c:/Dev/agente-core/modules/skills_index.json) ou o catálogo [CATALOG.md](file:///c:/Dev/agente-core/modules/CATALOG.md).
3. **Declaração Atômica de Skill (`SKILL.md`):** Cada módulo ativo em `/modules` deve expor um arquivo de governança local chamado `SKILL.md` declarando exatamente suas APIs públicas, assinaturas, permissões e restrições.

---

## 💎 5. Padrões de Interface e "Design Engineering"

Toda interface projetada ou codificada por agentes neste workspace deve atingir o nível máximo de prestígio e artesanato técnico (*Craft*), conforme estabelecido no manual de [Design Engineering Premium](file:///c:/Dev/agente-core/standards/design-engineering-premium.md):

- **Rigor Visual e Layout:** Espaçamento baseado no grid técnico de **8px**. Uso de **Bento Grids** para visualizações complexas. Propriedade `font-variant-numeric: tabular-nums` obrigatória para tabelas comparativas numéricas.
- **Tipografia:** Uso preferencial da fonte **Geist** (Geist Sans e Geist Mono).
- **Materialidade (Dark Mode Tri-Layer):** Proibido o uso de preto puro (`#000000`). Uso de L0 (`#0D0D0D`), L1 (`#1A1A1A`) e L2 (`#2D2D2D`) delimitados por Crisp Borders (bordas finas de 1px com transparência leve).
- **GPU Acceleration e Transições de Mola:** Efeitos de desfoque (Liquid Glass) devem forçar a renderização via hardware GPU. Animações e movimentações físicas devem simular molas utilizando funções CSS `linear()`.
- **Cursor de Streaming SSE:** Elementos com streaming de texto em tempo real devem renderizar um cursor vertical de 2px piscando em **500ms** no término da sentença.

---

## 🔄 6. O Ciclo de Execução BMAD (Multi-Agent Workflow)

O desenvolvimento técnico de qualquer componente segue 5 fases de orquestração multiagente:

1.  **Descoberta (`/pm`):** Mapeamento e storyboarding de jornadas do usuário real.
2.  **Arquitetura (`/architect`):** Modelagem de schemas de dados e definição do DNA Visual.
3.  **Implementação (`/dev`):** Escrita e refatoração de código sob a regra do *Turbo Mode* e *Vibe Check* (validação multimodal contra o protótipo visual).
4.  **Garantia de Qualidade (`/qa`):** Escrita de testes automáticos locais (Vitest/Playwright/TestSprite) com cobertura obrigatória de no mínimo **80%**.
5.  **Deploy e Auto-Correção (`/devops`):** Publicação via logs de integração na Vercel ou Google Cloud, ativando o *Self-Healing* (auto-correção de logs de build) em caso de falhas de deploy.

---

## 🧠 7. Estrutura de Memória e Escalonamento de Contexto (LOCOMO 2026)

- **Workflow RAG-to-RdR:** Em vez de realizar RAG (Retrieval-Augmented Generation) acoplando dados desestruturados em massa no prompt, utilize o padrão **RdR (Retrieval-driven Reasoning)**. O agente localiza o metadado no índice semântico, carrega cirurgicamente a assinatura da skill desejada e acopla somente as definições de tipo estritas na janela de contexto de trabalho.
- **Orquestração de Memória:** Classifique as memórias ativas de acordo com o padrão **LOCOMO 2026**:
  - `In-Process Memory` (runtime de execução direta).
  - `Flat External Memory` (vetorial local).
  - `Tiered Memory` (paginação hierárquica dividida em Core, Recall e Archive).
  - `Graph-Based Memory` (grafos de relacionamentos semânticos).
  - `Ephemeral Memory` (buffers voláteis temporários).

---

*agente-core — Onde a inteligência artificial se submete às leis do artesanato digital e da excelência de engenharia.*
