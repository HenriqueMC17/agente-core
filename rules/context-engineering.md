# 🧠 Context Engineering, RAG/RdR via MCP & Combate ao Context Rot

## 📌 Visão Geral

Este documento estabelece a política mandatória de **Engenharia de Contexto Ativo** para agentes de IA operando no ecossistema `agente-core`, prevenindo a degradação de contexto (*Context Rot*) e garantindo a máxima eficiência no consumo da janela de tokens.

Para arquiteturas detalhadas sobre topologias de memória e indexação, consulte o guia [Memory Topologies LOCOMO](file:///c:/Dev/.agente-core/architecture/memory-topologies-locomo.md) e a [Constituição Suprema (AGENTS.md)](file:///c:/Dev/.agente-core/AGENTS.md).

---

## 🚫 1. Combate ao Context Rot e Antipadrões de Prompt

- **Proibição de Concatenação Passiva de Documentos:**
  - É terminantemente **proibido carregar repositórios ou documentos inteiros estáticos de documentação** (como os 136 arquivos do `Docs`) na janela de contexto de trabalho do agente. Essa prática gera *Context Rot* (degradação da capacidade de atenção do LLM), eleva o tempo de *Time to First Token* e causa alucinações.
- **Mínimo Contexto Viável (MVC):**
  - O agente deve manter estritamente apenas os fragmentos de código, assinaturas de interfaces e regras atômicas necessários para a tarefa corrente.

---

## ⚡ 2. Governança Ativa via MCP e Retrieval-Driven Reasoning (RdR)

- **Acesso Dinâmico via Servidores MCP (Model Context Protocol):**
  - Para consultar a base de conhecimento técnico em [c:\Dev\Docs](file:///c:/Dev/Docs/README.md), o agente deve utilizar **servidores MCP locais** ou utilitários de indexação semântica (Vector/JSON DB), recuperando apenas os trechos estritamente relevantes sob demanda.
- **O Fluxo RdR (Retrieval-Driven Reasoning):**
  1. O agente recebe uma requisição de engenharia (ex: otimização de cache backend).
  2. O agente realiza uma consulta semântica cirúrgica no índice semântico do ecossistema.
  3. O agente acopla **somente** o documento específico (ex: *Spatial Locality*) na janela de contexto.
  4. O agente executa a tarefa com precisão e descarta o buffer volátil de contexto.

---

## 💾 3. Topologia de Memória LOCOMO 2026 (5 Camadas)

Toda informação mantida durante o ciclo de desenvolvimento de software deve ser alocada na camada de memória apropriada:

1. **In-Process Memory:** Runtime de execução direta e variáveis em memória do agente local.
2. **Flat External Memory:** Armazenamento vetorial e índices locais em disco (`skills_index.json`).
3. **Tiered Memory:** Paginação hierárquica dividida entre Core (constituinte), Recall (tarefas recentes) e Archive (histórico).
4. **Graph-Based Memory:** Grafos semânticos de dependências entre componentes e habilidades.
5. **Ephemeral Memory:** Buffers voláteis temporários descartados ao término da execução do comando.
