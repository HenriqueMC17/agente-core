# 🧠 Agent Reasoning, Complexity Routing & COVE Framework

## 📌 Visão Geral

Este documento define os protocolos de raciocínio cognitivo, decisão deliberativa e verificação lógica dos agentes autônomos no ecossistema `agente-core`, estabelecendo as regras de transição da engenharia procedural para o paradigma de **Software 3.0 (Intent-Centric Engineering & Bounded Autonomy)**.

Para fundamentação teórica sobre raciocínio Sistema 1 vs Sistema 2 e conformidade, consulte o [Manifesto for Organizational Transition to Software 3.0](file:///c:/Dev/Docs/Essential%20Developer%20Resource%20Directory/Manifesto%20for%20Organizational%20Transition%20to%20Software%203.0_%20Intent-Centric%20Engineering%20and%20Governed%20Autonomy.md) e a [Constituição Suprema (AGENTS.md)](file:///c:/Dev/.agente-core/AGENTS.md).

---

## 🔀 1. Roteamento por Complexidade (Bifasic Routing: System 1 vs. System 2)

Para otimizar o custo de processamento de tokens e minimizar a latência do *Time to First Token*, os agentes devem alternar entre os modelos de raciocínio de acordo com o nível de complexidade informacional da tarefa:

| Nível de Raciocínio | Arquitetura / Engine | Casos de Uso Indicados | Overhead / Custo |
| :--- | :--- | :--- | :--- |
| **System 1 (Heurístico)** | Modelo autorregressivo rápido (single pass) | Formatadores, linters, boilerplate, sintaxe simples, refatorações atômicas | Baixo (1 pass de inferência) |
| **System 2 (Deliberativo)** | Tree of Thoughts (ToT), COVE, verificação neuro-simbólica FLARE | Arquitetura distribuída, resolução de bugs complexos, instabilidade informacional | Alto (múltiplas rodadas de busca/revisão) |

- **Gatilho de Transição para System 2:**
  - Acionado obrigatoriamente sob **instabilidade informacional**, ambiguidade de schema de banco de dados, refatorações de mais de 3 componentes dependentes ou falhas recorrentes de build.

---

## 🚀 2. Exploração Especulativa (SPEX - Speculative Exploration)

- Em execuções de longo curso baseadas em *System 2*, o agente **não deve permanecer ocioso** aguardando confirmações intermediárias para caminhos determinísticos previsíveis.
- O agente deve utilizar **Exploração Especulativa (SPEX)** para antecipar e simular em paralelo os próximos ramos de execução lógica (ex: preparando suítes de testes unitários enquanto valida a assinatura de uma porta hexagonal), superando a *Reward Dependency Barrier*.

---

## 🛡️ 3. Software 3.0 & Autonomia Limitada (Bounded Autonomy)

- **Do Código Procedural à Intenção Declarativa:**
  - Na era Software 3.0, o artefato primário de engenharia não é a sintaxe bruta, mas a especificação legível por máquina da intenção declarativa.
- **Bounded Autonomy (Autonomia Limitada):**
  - Rejeitamos a autonomia desrestrita como risco operacional corporativo. Todos os agentes probabilísticos devem operar sob **Bounded Autonomy**, delimitados por scaffolds determinísticos de validação e regras de sandbox atômicas.

---

## 🔄 4. O Ciclo COVE de 4 Etapas (Chain-of-Verification)

Toda modificação de código produzida por agentes sob raciocínio deliberativo deve ser submetida ao protocolo COVE:

1. **Draft Generation (Geração de Rascunho):** Produção do rascunho inicial de código/refatoração.
2. **Verification Planning (Planejamento de Validação):** Formulação de perguntas de auditoria crítica (ex: "Existe algum vazamento de memória?", "Os tipos correspondem às interfaces?").
3. **Execution Verification (Execução de Verificação):** Execução independente dos testes e verificadores de sintaxe/link.
4. **Final Refinement (Refinamento Final):** Emissão do código verificado e blindado contra regressões.
