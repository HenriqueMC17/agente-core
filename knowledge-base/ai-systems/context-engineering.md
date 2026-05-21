# 🧠 KNOWLEDGE BASE: Engenharia de Contexto — Guia Operacional 2026

> **Domínio:** AI Systems / Context Engineering  
> **Categoria:** Referência Operacional  
> **Versão:** 1.0 | 2026

---

## 1. Definição Estratégica

**Engenharia de Contexto** é a disciplina de projetar e gerenciar o ecossistema completo de informações que alimenta os modelos de IA. Em 2026, substituiu a "Engenharia de Prompt" como competência primária de arquitetos de IA.

> "A maturidade de um sistema de IA não reside mais na sofisticação do prompt engineering, mas na Engenharia de Contexto — o design de um pipeline de montagem contextual dinâmico."

**Distinção crítica:**

| Prompt Engineering (Legacy) | Context Engineering (2026) |
|---|---|
| Foco na "string mágica" | Foco no ecossistema completo |
| Resultado isolado | Resultado sistêmico |
| Reprodutibilidade baixa | Reprodutibilidade alta |
| Escalabilidade limitada | Escalabilidade arquitetural |
| Avaliação subjetiva (vibes) | Avaliação métrica (dados) |

---

## 2. A Pilha de Contexto Completa (8 Camadas)

A performance de um agente depende de TODOS os elementos que ele "enxerga". A ausência de qualquer camada degrada a qualidade:

```
PILHA DE CONTEXTO COMPLETA:
┌─────────────────────────────────────────────────────────────┐
│  1. Prompts de Sistema (AGENTS.md, GEMINI.md)               │
│  2. Contexto do Codebase (arquivos relevantes)              │
│  3. Histórico Git (commits recentes, contexto temporal)      │
│  4. Dependências/Bibliotecas (package.json, requirements)   │
│  5. Definições de Ferramentas (MCP servers, APIs)           │
│  6. Padrões da Equipe (AGENTS.md, regras de estilo)         │
│  7. Histórico da Conversa (sessão atual)                    │
│  8. Documentação Recuperada (RAG / RdR)                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Regras de Ouro da Engenharia de Contexto

### 3.1 Lei do Mínimo Contexto Viável (MCV)

> "A densidade ideal vence o volume. Mais contexto NÃO significa melhor performance."

- **Limite seguro:** < 32.000 tokens (zona de atenção plena)
- **Zona ideal para foco:** < 8.000 tokens
- **Critério de inclusão:** O arquivo está sendo referenciado ATIVAMENTE nesta tarefa?

### 3.2 Lei da Ordenação de Ouro

Para evitar o fenômeno **Lost-in-the-Middle** (degradação de atenção no meio do contexto):

| Posição | Tipo de Conteúdo | Razão |
|---|---|---|
| **Início (Topo)** | Regras críticas, restrições de segurança | Efeito de Primazia — garante que o modelo nunca ignore |
| **Meio** | Exemplos, documentação de referência | Suporte sem interferir na tarefa imediata |
| **Fim (Base)** | Código atual, tarefa imediata | Efeito de Recência — foco máximo na execução |

### 3.3 Lei das 5 Estratégias de Compressão

Quando o contexto ameaça o limite, aplique nesta ordem:

1. **SELEÇÃO:** Remova arquivos não ativamente referenciados
2. **COMPRESSÃO:** Sumarize históricos longos de conversa  
3. **ORDENAÇÃO:** Aplique a Regra de Ouro (topo/meio/base)
4. **ISOLAMENTO:** Divida em subagentes com contextos independentes
5. **FORMATO:** XML/YAML > JSON (mais eficiente em tokens para modelos)

---

## 4. Estrutura XML para Máxima Eficiência

Em 2026, o **XML estruturado** é o padrão-ouro para organização de prompts. Fornece hierarquia clara que modelos modernos processam com maior eficiência sintática:

```xml
<system>
  <!-- Regras críticas, persona, restrições de segurança -->
  <role>Senior Software Architect</role>
  <constraints>
    - Nunca gere código sem testes
    - Sempre respeite a Clean Architecture do AGENTS.md
    - Confirme antes de modificar arquivos críticos
  </constraints>
</system>

<context>
  <!-- Informações de suporte, documentação, histórico -->
  <codebase>
    [interfaces dos arquivos relevantes]
  </codebase>
  <reference>
    [documentação técnica necessária]
  </reference>
</context>

<examples>
  <!-- Few-shot: exemplos do formato esperado de saída -->
  <example>
    [exemplo de entrada/saída]
  </example>
</examples>

<task>
  <!-- Tarefa imediata — sempre no fim (viés de recência) -->
  [Instrução específica e atômica]
</task>
```

---

## 5. Parâmetro de Esforço (Effort Calibration)

O parâmetro `effort` equilibra custo vs. inteligência. Calibração incorreta é a causa mais comum de overspend em tokens:

| Nível | Cenário de Uso | Tokens Estimados |
|---|---|---|
| `xhigh` / `max` | Codificação complexa, tarefas multiagente de longo prazo | 64k+ |
| `high` | Padrão 2026 para trabalho sensível à inteligência | 16k - 64k |
| `medium` | Bimodalidade (mix de fácil e difícil) | 4k - 16k |
| `low` | Classificações simples, tarefas de baixa latência | < 4k |

> **Regra de Ouro:** Sempre defina `max_tokens` explicitamente. Nunca use sem limite em produção.

---

## 6. Context Rot — Diagnóstico e Cura

**Context Rot** é a degradação progressiva da qualidade do raciocínio causada por contexto excessivo ou mal estruturado.

**Sintomas:**
- Respostas cada vez mais genéricas ou desconectadas do codebase
- Agente cita arquivos que não foram injetados
- Alucinações crescentes em proporção ao tamanho do contexto
- Latência aumentando sem aumento de complexidade da tarefa

**Diagnóstico rápido:**
```
Pergunta diagnóstica: "Liste os 3 arquivos mais relevantes 
que você está usando como referência agora."

→ Se citar arquivos não injetados: Context Rot confirmado
→ Se citar corretamente: Contexto saudável
```

**Cura:** Context Flush + remontagem da Pilha de Contexto  
(consulte `/playbooks/agent-drift-mitigation.md` → Seção 3.3)

---

## 7. RAG → RdR: Evolução do Grounding

### RAG (Retrieval-Augmented Generation) — Padrão 2024
Fornece documentos recuperados como contexto adicional. Problema: o modelo ainda pode ignorar ou distorcer as fontes.

### RdR (Retrieval-driven Reasoning) — Padrão 2026
Adiciona uma camada de **raciocínio deliberativo** sobre as fontes recuperadas:

```
RAG Tradicional:
  Recuperação → Geração (direta)

RdR (2026):
  Recuperação → Deliberação de Descritores → Raciocínio Explícito → Geração

Benefícios:
  ✓ Transparência: modelo explica por que escolheu cada fonte
  ✓ Redução de alucinação: passos deliberativos antes do output
  ✓ Auditabilidade: trilha de raciocínio completa
```

---

## 8. Checklist de Arquitetura de Contexto

Use antes de cada sessão agêntica importante:

```
CONTEXTO:
□ Esforço calibrado para a complexidade da tarefa?
□ Sinalização XML nas instruções, exemplos e dados?
□ Limite de 32k tokens respeitado?
□ Ordenação de Ouro aplicada (regras críticas no topo)?
□ Sources externas validadas contra prompt injection?

QUALIDADE:
□ Revisão humana garantida antes de entrega final?
□ COVE executado de forma fatorada (sem viés de confirmação)?
□ FLARE formal check agendado para artefatos críticos?

GOVERNANÇA:
□ Git checkpoint antes da sessão?
□ progress.txt atualizado com estado atual?
□ Critérios de aceitação definidos antes de executar?
```

---

> **Fontes:**  
> - *Guia Mestre de Engenharia de Contexto: Arquitetando Interações de Precisão na Era da IA*  
> - *Diretriz Operacional: Protocolos de LLMOps e Mitigação de Alucinações em Larga Escala*  
> - *Manual de Governança de Inteligência Artificial: Estrutura Diretiva para Líderes C-Suite*
