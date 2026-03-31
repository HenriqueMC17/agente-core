---
description: Guias táticos de engenharia especializada (Domain-Driven Design e Ecossistemas Agent-Based).
---

# 🧠 Architecture Specialist & Domains

Consultor de Alto Nível de Engenharia para decisões pesadas de Design de Software, Micro-serviços ou Múltiplos Agentes LLM.

---

## 1. Design a DDD Core Domain (Engenharia Tática)
Use apenas onde a complexidade de negócios justifique ignorar o simples CRUD e adotar Padrões de Domínio Rico.

- **Modelagem Estratégica:** Definição de _Bounded Contexts_ (Pós Vendas x Catálogo de Roupas). Subdomínios e Context Mappers.
- **Modelagem Tática:** Encontre Agregados, Crie _Value Objects_ impenetráveis para Tipos Monetários ou Documentos em vez de strings primitivas.
- **Abraçando CQRS / Events:** Adicione _Sagas_ e projeções caso exista necessidade de escalabilidade independente entre Leitura e Escrita.

## 2. Orquestração e Construção de Sistemas de Agentes IA (Multi-Agent Systems)
O padrão ouro se foi incumbido de gerar uma nova camada sub-agente com inteligência conectada.

- **Target / Limits:** Defina KPIs. O Agente deve falhar o mínimo e ser restrito no output usando ferramentas (`Tool Calling`).
- **Retrieval & Context Window:** Arquitetura Vectorial com RAG isolado caso seja uma pipeline densa de dados externos.
- **Memory Management:** Como ele preserva estado sem vazar pra outro usuário?
- **LangGraph / MCP / Autogen:** Modele fronteiras determinísticas entre "Quem atua (Edit Mode)" e "Quem audita (Inspector Mode)".
- **Evaluations / Kaizen Loop:** Agente produz log? Quem e como melhoraremos seu pipeline depois? Implemente `Langfuse`/`LangSmith`/`W&B` se necessário.
