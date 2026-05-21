# 🧠 Arquiteturas de Memória para Agentes de IA

> **Domínio:** AI Systems  
> **Versão:** 1.0 | 2026 | Benchmark Mem0 LOCOMO 2026

---

## 1. O Caso de ROI

| Arquitetura | Tokens/Interação | Latência p95 | Custo Relativo |
|---|---|---|---|
| **In-Process (naïve)** | ~26.031 tokens | 17.12s | 100% |
| **Seletiva Externa** | ~1.764 tokens | < 3s | ~7% |
| **Tiered (MemGPT)** | ~4.200 tokens | ~5s | ~16% |

**Conclusão:** Memória seletiva reduz consumo em **até 90%**. In-process é "sunk cost" com ROI nulo.

---

## 2. Os 4 Tipos de Memória

| Tipo | O Que Armazena | Exemplo |
|---|---|---|
| **Episódica** | Eventos e histórico de sessões | "Usuário preferiu padrão Repository na semana passada" |
| **Semântica** | Fatos e conhecimento geral | "TypeScript para frontend, Python para ML" |
| **Procedimental** | Como executar tarefas | "Deploy: build → docker → kubectl apply" |
| **De Trabalho** | Contexto imediato da sessão | Arquivo atual em foco, linha editada |

---

## 3. Os 5 Padrões Arquiteturais

### Padrão 1: In-Process / Working-Only
```
Substrato: Janela de contexto do LLM
Limite: 128k-1M tokens | Persistência: ZERO
Use para: Prototipagem e tarefas 100% atômicas
NÃO use em: Projetos com múltiplas sessões
```

### Padrão 2: Flat External Vector Store
```
Substrato: Pinecone, pgvector, Weaviate
Fluxo: Pergunta → Embedding → Top-K Chunks → LLM
Limitação: False Positives por similaridade semântica
```

### Padrão 3: Tiered Memory (MemGPT / Letta)
```
Camada 1: Working Memory (~4k tokens, acesso imediato)
Camada 2: External Memory (acesso via função, ilimitado)
Camada 3: Archived Memory (cold storage, pesquisável)
Transição automática por importância + recência
```

### Padrão 4: Graph Memory (Knowledge Graphs)
```
Substrato: Neo4j, GraphRAG
Uso: Relações complexas entre entidades
Consulta: Traversal de grafo por nós relacionados
Ideal para: Análise de impacto em codebases grandes
```

### Padrão 5: Hybrid Selective Memory ⭐ PADRÃO 2026
```
Roteador de Memória
    ↓
[Working] [Vetorial] [Grafo] [Episódico]
    ↓
Fusão + Rankeamento por Relevância
    ↓
Injeção Seletiva no Contexto (< 8k tokens)

Por que é o padrão enterprise:
✓ Eficiência máxima de tokens
✓ Relevância semântica garantida
✓ Auditabilidade completa (EU AI Act)
```

---

## 4. Decision Matrix

```
Sessão > 1 hora / múltiplas sessões?
  NÃO → In-Process suficiente
  SIM → continua ↓

Base de conhecimento > 100k tokens?
  NÃO → Tiered Memory adequado
  SIM → continua ↓

Relações complexas entre entidades?
  NÃO → Flat Vector + Tiered
  SIM → continua ↓

Compliance e auditabilidade obrigatórios?
  NÃO → Híbrido Vector + Graph
  SIM → Hybrid Selective Memory (Enterprise)
```

---

## 5. Integração no agente-core

```
context-maps/    → Índices de memória semântica
knowledge-base/  → Base vetorial de referências
diagnostics/     → Logs de memória e falhas de persistência

Sleep Cycle → consolida Working Memory → knowledge-base/
AGENTS.md   → instruções ficam no TOPO do contexto
MCP Servers → acesso a memórias externas via protocolo
```

---

> **Fontes:** Relatórios *Arquiteturas de Memória para Agentes de IA* (Estratégico e Técnico) + Benchmark Mem0 LOCOMO 2026
