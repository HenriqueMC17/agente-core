# 📜 CONSTITUIÇÃO SUPREMA DO PROJETO: DIRETRIZES PARA AGENTES DE IA (`AGENTS.md`)

Este documento estabelece a **Constituição Suprema e Inegociável** para qualquer Agente de Inteligência Artificial (incluindo Antigravity, Claude Code, Moltbot e outros agentes integrados via MCP) que opere dentro do ecossistema `c:\Dev\agente-core`. 

Toda modificação de código, execução de terminal, orquestração de prompts e tomada de decisão arquitetural deve aderir de forma estrita às leis aqui consolidadas.

> [!IMPORTANT]
> **Adendos Constitucionais de Vanguarda (Padrões 2026):**
> O framework `agente-core` é estritamente regido pelas seguintes especificações atômicas detalhadas que complementam esta constituição:
> *   **Governança de PRs de IA**: [ai-pull-request-governance.md](file:///c:/Dev/agente-core/governance/ai-pull-request-governance.md) — Controle atômico, mitigação de whiplash e verificação fatorada de PRs.
> *   **Estratégia C-Suite & Modelos**: [c-suite-ai-strategy.md](file:///c:/Dev/agente-core/governance/c-suite-ai-strategy.md) — Gestão executiva, mitigação de drift e ciclo de vida de IA.
> *   **Engenharia de Contexto**: [context-engineering.md](file:///c:/Dev/agente-core/rules/context-engineering.md) — Diretrizes de Mínimo Contexto Viável (MVC), posicionamento e tags XML.
> *   **Raciocínio Sistema 2 & COVE**: [agent-reasoning-cove.md](file:///c:/Dev/agente-core/rules/agent-reasoning-cove.md) — Heurística ToT, lookahead e validação COVE.
> *   **Design Engineering Premium**: [design-engineering-premium.md](file:///c:/Dev/agente-core/standards/design-engineering-premium.md) — Grids de 8px, Dark Mode 2.0 (L0/L1/L2) e APCA.
> *   **Topologias de Memória LOCOMO**: [memory-topologies-locomo.md](file:///c:/Dev/agente-core/architecture/memory-topologies-locomo.md) — ROI de contexto e 5 topologias de memória externa.

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

0. **`FLARE` (Faithful Logic-Aided Reasoning and Exploration):** Framework neuro-simbólico que atua como barreira lógica suprema de validação formal, exigindo verificação lógica do raciocínio e das implementações do agente antes do Vibe Check final.
1. **`GEMINI.md` (.agents/rules/GEMINI.md):** Suprema instrução operacional de baixo nível para motores Google, ditando segurança física, integridade da máquina host e mitigação de erros de terminal.
2. **`AGENTS.md` (Esta Constituição):** A Carta Magna do repositório, ditando a filosofia do "Craft", Clean Architecture e interface de prestígio.
3. **`.agents/rules/` (Rules de Modelo):** Diretivas específicas (como `CLAUDE.md`) focadas nas capacidades e limitações específicas de raciocínio de cada modelo.
4. **`/rules` e `/governance`:** As regras gerais do framework para as 28 categorias e desenvolvimento de software corporativo, com destaque para as diretrizes de [Engenharia de Contexto](file:///c:/Dev/agente-core/rules/context-engineering.md), [Raciocínio & COVE](file:///c:/Dev/agente-core/rules/agent-reasoning-cove.md), [Governança de PR](file:///c:/Dev/agente-core/governance/ai-pull-request-governance.md) e [Estratégia Corporativa](file:///c:/Dev/agente-core/governance/c-suite-ai-strategy.md).

---

## 🛡️ 2. Sandbox, Segurança e Limites Operacionais

Agentes autônomos operam sob uma Sandbox lógica e física no host. Qualquer tentativa de violar estes limites resultará em falha imediata do Vibe Check e rejeição de PR:

*   **Positive Security (Segurança Positiva):** Todas as ações permitidas em runtime devem passar por validação explícita de sandbox e verificação formal do ciclo BMAD, proibindo qualquer spawn de processo ou escrita fora das áreas pré-aprovadas.
*   **Mitigação da Whiplash de Aceleração:** A altíssima produtividade e velocidade dos agentes agênticos trazem um risco estatisticamente superior de introdução de regressões lógicas e bugs sutis. Para mitigar esse efeito, cada incremento de código deve vir obrigatoriamente acompanhado de sua respectiva suíte de testes de cobertura (mínimo de 80%) e modularidade rígida, seguindo o protocolo estrito de [Governança de Pull Requests de IA](file:///c:/Dev/agente-core/governance/ai-pull-request-governance.md).
*   **Proibição Absoluta do Comando `cd`:** NUNCA execute comandos `cd` no terminal PowerShell. Todas as execuções de comandos devem passar o caminho absoluto ou o diretório de trabalho corrente (`Cwd`) nas propriedades da ferramenta do sistema.
*   **Allow-list de Comandos de Terminal:** Apenas comandos não destrutivos de Git (`status`, `add`, `commit`, `diff`), Python (`python verify_*.py`), e utilitários locais de teste (`npm run test`, `vitest`) são pré-aprovados. Comandos destrutivos globais (como `rm -rf` irrestrito) exigem **Supervisão Ativa** e aprovação expressa do usuário humano.
*   **Tratamento Defensivo contra Codificação de Terminal (Windows - Cp1252):** O terminal Windows PowerShell opera em encoding local (`cp1252`). Scripts executados por agentes que imprimem emojis ou caracteres complexos UTF-8 sem tratamento defensivo (como `encoding='utf-8'` explícito em leituras/escritas e captura genérica de exceptions de encoding) sofrerão crash. É lei blindar os scripts contra falhas de console.
*   **Mitigação de Amnésia Contextual:** Devido a limites de contexto, agentes devem manter registros estruturados de progresso em arquivos `task.md` e `walkthrough.md` específicos do ambiente operacional do agente, garantindo continuidade sem interrupções cognitivas.

---

## 📐 3. Integridade da Clean Architecture (7 Camadas / 28 Categorias)

A estrutura física do repositório `agente-core` é **imutável em sua raiz semântica**. 
Nenhum agente tem autoridade para criar novas pastas ou arquivos de primeiro nível fora das **28 categorias estruturadas em 7 camadas**.

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

1. **Acesso Oculto por Padrão:** As mais de 1.300 habilidades físicas residem em subpastas de [/modules](file:///c:/Dev/agente-core/modules). O agente não deve ler todas simultaneamente.
2. **Uso de Índices Semânticos:** Para encontrar uma habilidade, o agente deve SEMPRE ler primeiramente o arquivo [skills_index.json](file:///c:/Dev/agente-core/modules/skills_index.json) ou o catálogo [CATALOG.md](file:///c:/Dev/agente-core/modules/CATALOG.md).
3. **Declaração Atômica de Skill (`SKILL.md`):** Cada módulo ativo em `/modules` deve expor um arquivo de governança local chamado `SKILL.md` declarando exatamente:
   * Suas APIs públicas e assinaturas.
   * Suas dependências físicas no repositório.
   * Suas permissões e restrições de sandbox.
   * Sua cobertura de teste esperada.

---

## 💎 5. Padrões de Interface e "Design Engineering" (Edição 2026)

Toda interface projetada ou codificada por agentes neste workspace deve atingir o nível máximo de prestígio e artesanato técnico (*Craft*). A estética deve ser **Technical Blueprint**, demonstrando rigor matemático e respeito absoluto ao usuário, conforme estabelecido no manual de [Design Engineering Premium](file:///c:/Dev/agente-core/standards/design-engineering-premium.md):

### Rigor Visual e Layout
*   **Bento Grid Standard:** Organizar dashboards e apresentações corporativas densas em layouts modulares compartimentados.
*   **Grade Técnica de 8px:** Todo espaçamento, padding, margin e gap deve se alinhar estritamente à escala matemática de 8px (8px, 16px, 24px, 32px, etc.).
*   **Tabular Numbers:** Tabelas financeiras e de dados comparativos numéricos devem obrigatoriamente utilizar a propriedade CSS `font-variant-numeric: tabular-nums` para garantir alinhamento vertical impecável e legibilidade instantânea.
*   **Glued Terms (Termos Colados):** Impedir quebras de linha que degradam o visual técnico usando espaços não-separáveis (`&nbsp;`) entre valores e unidades ("10&nbsp;MB") ou atalhos ("⌘+K").

### Materialidade e Translucidez (Glassmorphism 2.0)
*   **Liquid Glass / Glassmorphism 2.0:** Elementos devem comportar-se fisicamente. Use `backdrop-filter: blur(20px)` combinado a cores de fundo de baixíssima opacidade (ex: `rgba(255, 255, 255, 0.03)`) e sombras compostas (sombra de luz direta + sombra de oclusão de luz ambiente).
*   **Layers de Dark Mode Premium:** A paleta base escura proíbe preto puro (`#000000`) para evitar fadiga ocular. O ecossistema adota a escala de materialidade de 3 camadas:
    *   `L0 (Background Base):` `#0D0D0D`
    *   `L1 (Cards/Painéis):` `#1A1A1A`
    *   `L2 (Popups/Elevados):` `#2D2D2D`
*   **Crisp Borders:** Em temas escuros, utilize bordas finas semi-transparentes de 1px com alta luminosidade (ex: `1px solid rgba(255, 255, 255, 0.08)`) para delimitar de forma cristalina as camadas do layout.
*   **Aceleração de GPU:** Elementos com blur de backdrop complexo ou transições 3D devem aplicar `transform: translateZ(0)` ou `will-change: transform` para forçar a renderização via hardware GPU, mantendo o scroll em 60fps+ livre de stuttering térmico.

### Fluxos Dinâmicos e Acessibilidade de Respeito
*   **Cursor de Streaming SSE:** Componentes que realizam streaming de texto ou respostas dinâmicas em tempo real (via Server-Sent Events - SSE) devem renderizar um caret cursor piscando na frequência física de 500ms no final do bloco ativo para combater a ansiedade de espera do usuário.
*   **Contraste APCA (Perceptual Contrast):** Projetar cores de texto e fundo baseando-se estritamente no APCA (Advanced Perceptual Contrast Algorithm), que calcula o contraste percebido com base na luminância real das cores e na espessura do peso da fonte, superando as limitações do WCAG 2 tradicional.
*   **Ergonomia de Alvos (Hit Targets):** Alvos de clique móveis devem ter área de toque mínima de **44px**. Em desktop, links ou botões pequenos com área visual inferior a 24px devem ser expandidos por meio de padding transparente de no mínimo **24px**.
*   **Proibição Absoluta de Scrolljacking:** Respeite o movimento físico e a taxa de rolagem natural configurada no hardware de mouse do usuário. NUNCA utilize scripts que sequestram o scroll do browser.

---

## 🔄 6. O Ciclo de Execução BMAD (Multi-Agent Workflow)

O desenvolvimento técnico de qualquer componente segue 5 fases rígidas de orquestração multiagente, garantindo a autodefesa do repositório:

1.  **Descoberta (`/pm`):** Mapeamento e storyboarding de jornadas do usuário real, reduzindo a fricção cognitiva.
2.  **Arquitetura (`/architect`):** Modelagem de schemas de dados e definição do DNA Visual no Stitch (`DESIGN.md`).
3.  **Implementação (`/dev`):** Escrita e refatoração de código sob a regra do *Turbo Mode* e *Vibe Check*. O código gerado deve ser comparado via visão multimodal com o protótipo gráfico para evitar quebras estéticas.
4.  **Garantia de Qualidade (`/qa`):** Escrita de testes automáticos locais (Vitest/Playwright/TestSprite) com cobertura obrigatória de no mínimo **80%**.
5.  **Deploy e Auto-Correção (`/devops`):** Publicação via logs de integração na Vercel ou Google Cloud. Erros comuns de deploy (como Erros 404 por arquivos faltantes) acionam o *Self-Healing*, onde o agente intercepta o log de build, corrige o patch e refaz o deploy de forma autônoma.

---

## 🧠 7. Estrutura de Memória e Escalonamento de Contexto (LOCOMO 2026)

Para maximizar a eficiência do raciocínio e evitar a lentidão ou dispersão de atenção dos modelos generativos durante longas interações, o ecossistema estabelece regras rígidas de gestão de contexto detalhadas nos guias de [Engenharia de Contexto](file:///c:/Dev/agente-core/rules/context-engineering.md) e [Topologias de Memória LOCOMO](file:///c:/Dev/agente-core/architecture/memory-topologies-locomo.md):

*   **Mitigação de Lost-in-the-Middle:** A eficiência do raciocínio de modelos com janelas gigantes degrada de forma acentuada a partir de 32k tokens se dados não estruturados forem injetados em massa. Mantenha a memória ativa sempre otimizada sob o padrão **MVC (Minimum Viable Context)**.
*   **Workflow RAG-to-RdR:** Em vez de realizar RAG (Retrieval-Augmented Generation) injetando centenas de linhas de código bruto no prompt, use o padrão **RdR (Retrieval-driven Reasoning)**. O agente localiza o metadado no índice semântico, carrega cirurgicamente a assinatura da skill desejada e acopla somente as definições de tipo estritas na janela de contexto de trabalho.
*   **Orquestração das 5 Topologias de Memória:** Agentes de orquestração devem classificar a memória do sistema de acordo com o benchmark **LOCOMO 2026**:
    1.  `In-Process Memory:` Variáveis temporárias de runtime de execução direta de tarefas rápidas.
    2.  `Flat External Memory:` Busca semântica linear em base vetorial local para indexação rápida.
    3.  `Tiered Memory (MemGPT/Letta):` Paginação hierárquica dividida em camadas (Core, Recall, Archive) para reter dados de sessões profundas sem estourar o prompt ativo.
    4.  `Graph-Based Memory:` Mapeamento de relacionamentos semânticos entre entidades de negócio complexas.
    5.  `Ephemeral Memory:` Buffers voláteis autolimitados de curta duração limpos a cada ciclo de deploy.

---

*agente-core — Onde a inteligência artificial se submete às leis do artesanato digital e da excelência de engenharia.*
