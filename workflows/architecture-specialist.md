# 🧠 Architecture Specialist & Domain Engineering (v2)

**Sistema Estratégico de Arquitetura Avançada, Domain-Driven Design e Ecossistemas Multi-Agentes**

> [!CRITICAL]
> Este playbook governa decisões arquiteturais de alta complexidade.
>
> Ele deve ser utilizado quando o sistema:
>
> * ultrapassa CRUDs simples
> * exige domínio rico
> * possui múltiplos serviços
> * demanda alta escalabilidade
> * opera com IA/LLMs
> * necessita coordenação entre agentes
>
> O objetivo não é apenas “organizar código”.
>
> O objetivo é:
>
> * modelar complexidade real
> * reduzir caos sistêmico
> * garantir evolução sustentável
> * criar fronteiras claras
> * transformar software em ecossistema resiliente

---

# 🧠 0. PRINCÍPIO FUNDAMENTAL

> Arquitetura existe para controlar complexidade.
> Sistemas sem boundaries inevitavelmente colapsam.

---

# ⚙️ 1. ARCHITECTURE EXECUTION MODEL

Toda análise arquitetural deve seguir:

```bash id="y2mq5z"
Context Discovery
→ Domain Mapping
→ Boundary Definition
→ Tactical Modeling
→ Integration Strategy
→ Scalability Planning
→ Observability
→ Evolution Strategy
```

---

# 🚫 Regras Absolutas

* não aplicar DDD em CRUD trivial
* não criar microserviços sem necessidade
* não adicionar abstrações sem ganho estrutural
* não misturar domínios independentes

---

# 🏛️ 2. DOMAIN-DRIVEN DESIGN (DDD)

## 🎯 Objetivo

Modelar sistemas orientados ao negócio real e não ao banco de dados.

---

# 🧠 2.1 Quando usar DDD

## ✔ Recomendado quando existir:

* regras de negócio complexas
* múltiplos fluxos críticos
* equipes separadas
* linguagem de domínio forte
* alta evolução funcional

---

## 🚫 Evitar quando:

* sistema simples
* CRUD administrativo básico
* baixa complexidade operacional

---

# 🌍 2.2 Strategic Design — Domain Mapping

## 🎯 Objetivo

Definir limites organizacionais do sistema.

---

# 🧩 2.2.1 Core Domain

Identificar:

* diferencial competitivo
* regra mais crítica
* núcleo estratégico

---

## ✔ Exemplos

| Sistema    | Core Domain         |
| ---------- | ------------------- |
| Fintech    | transações          |
| E-commerce | catálogo + checkout |
| ERP        | fluxo operacional   |

---

# 🧱 2.2.2 Subdomains

Classificar:

| Tipo       | Objetivo             |
| ---------- | -------------------- |
| Core       | valor estratégico    |
| Supporting | suporte operacional  |
| Generic    | infraestrutura comum |

---

# 🗺️ 2.2.3 Bounded Contexts

## ✔ Objetivo

Separar modelos que:

* mudam por razões diferentes
* possuem linguagem própria
* possuem regras distintas

---

## ✔ Exemplo

```bash id="3w4gdr"
Sales
Catalog
Billing
PostSales
Identity
```

---

## 🚫 Proibido

* compartilhar entidades globais gigantes
* criar “super models”
* misturar linguagem de negócio

---

# 🔄 2.2.4 Context Mapping

## ✔ Definir

* upstream/downstream
* ACLs
* eventos
* contratos

---

## ✔ Estratégias

* Open Host Service
* Anti-Corruption Layer
* Published Language

---

# 🧩 2.3 Tactical Design — Internal Modeling

## 🎯 Objetivo

Modelar regras internas com proteção semântica.

---

# 🏗️ 2.3.1 Entities

## ✔ Devem possuir

* identidade
* ciclo de vida
* consistência

---

# 💎 2.3.2 Value Objects

## ✔ Obrigatório para:

* dinheiro
* documentos
* porcentagens
* coordenadas
* ranges

---

## 🚫 Proibido

```ts
type Price = number
```

para domínios críticos.

---

# 📦 2.3.3 Aggregates

## ✔ Objetivo

Garantir consistência transacional.

---

## ✔ Regras

* aggregate root controla invariantes
* acesso externo somente pela root
* evitar aggregates gigantes

---

# 🧠 2.3.4 Domain Services

## ✔ Utilizar quando

A regra:

* não pertence a uma entidade específica
* coordena múltiplos aggregates

---

# 📡 2.3.5 Domain Events

## ✔ Usar para

* desacoplamento
* rastreabilidade
* integração assíncrona

---

## ✔ Exemplos

```bash id="ckty4m"
OrderCreated
PaymentApproved
InvoiceGenerated
```

---

# ⚡ 2.4 CQRS & EVENT-DRIVEN SYSTEMS

## 🎯 Objetivo

Separar leitura de escrita quando necessário.

---

# ✔ Aplicar quando existir:

* alto volume de leitura
* projeções complexas
* escalabilidade independente

---

# 🔄 2.4.1 CQRS

Separar:

| Layer   | Objetivo |
| ------- | -------- |
| Command | mutação  |
| Query   | leitura  |

---

# 📡 2.4.2 Event-Driven Architecture

## ✔ Benefícios

* desacoplamento
* resiliência
* paralelismo
* replay histórico

---

## 🚫 Evitar

* eventos sem ownership
* event storms desnecessários

---

# 🧱 2.4.3 Sagas & Distributed Workflows

## ✔ Aplicar quando

Existirem:

* múltiplos serviços
* transações distribuídas
* compensações

---

# ✔ Estratégias

* orchestration
* choreography
* compensating transactions

---

# 🧠 3. MULTI-AGENT SYSTEM ENGINEERING

## 🎯 Objetivo

Construir ecossistemas coordenados de agentes inteligentes.

---

# 🤖 3.1 Agent Architecture Principles

Todo agente deve possuir:

* objetivo claro
* limites explícitos
* ownership definido
* contexto controlado
* observabilidade

---

# 🚫 Proibido

* agentes generalistas gigantes
* múltiplos agentes alterando mesmo estado sem coordenação
* memória compartilhada insegura

---

# 🎯 3.2 Agent Roles

## ✔ Estrutura recomendada

```bash id="ljf3ln"
Planner
Architect
Builder
Reviewer
Auditor
Security
Optimizer
```

---

# 🧠 3.3 Deterministic Boundaries

## ✔ Separar claramente

| Mode           | Responsabilidade |
| -------------- | ---------------- |
| Edit Mode      | altera           |
| Inspector Mode | valida           |
| Observer Mode  | monitora         |

---

# 🚫 Regra Absoluta

Quem audita não executa.

---

# 🔧 3.4 Tool Calling Governance

## ✔ Ferramentas devem possuir

* escopo limitado
* validação rígida
* outputs previsíveis

---

# 🚫 Proibido

* tool execution irrestrita
* acesso desnecessário
* efeitos colaterais ocultos

---

# 🧠 3.5 Context Engineering

## 🎯 Objetivo

Controlar contexto para reduzir:

* hallucinations
* drift
* inconsistência

---

# ✔ Estratégias

* contexto incremental
* summaries persistentes
* context windows segmentadas

---

# 📚 3.6 Retrieval & RAG Architecture

## ✔ Aplicar quando existir:

* documentos extensos
* conhecimento dinâmico
* dados externos massivos

---

# 🧱 Arquitetura recomendada

```bash id="y06tws"
Source
→ Chunking
→ Embedding
→ Vector Store
→ Retrieval
→ Reranking
→ Context Injection
```

---

# ✔ Estratégias

* chunk overlap inteligente
* metadata filtering
* hybrid search
* reranking

---

# 🚫 Evitar

* contexto bruto gigante
* embeddings sem versionamento
* RAG sem observabilidade

---

# 🧠 3.7 Memory Management

## 🎯 Objetivo

Persistir estado sem contaminar sessões.

---

# ✔ Tipos

| Tipo              | Objetivo     |
| ----------------- | ------------ |
| Working Memory    | curto prazo  |
| Episodic Memory   | histórico    |
| Semantic Memory   | conhecimento |
| Persistent Memory | longo prazo  |

---

# 🚫 Regras críticas

* isolamento entre usuários
* expiração controlada
* compliance de dados

---

# 📊 3.8 Agent Evaluation & Observability

## ✔ Todo agente deve possuir

* tracing
* logs
* métricas
* score de qualidade

---

# ✔ Ferramentas sugeridas

* Langfuse
* LangSmith
* Weights & Biases
* OpenTelemetry

---

# 🔁 3.9 Continuous Improvement Loop

## ✔ Pipeline

```bash id="lcqf7r"
Observe
→ Evaluate
→ Identify Failures
→ Optimize
→ Re-test
```

---

# 🎯 Objetivo

* reduzir hallucinations
* aumentar precisão
* melhorar throughput
* reduzir custo computacional

---

# ☁️ 4. SCALABILITY & DISTRIBUTED SYSTEMS

## ✔ Validar

* throughput
* concorrência
* latência
* consistência
* tolerância a falhas

---

# 🧱 Estratégias

* horizontal scaling
* queues
* eventual consistency
* cache distribuído

---

# 🚫 Proibido

* estado global compartilhado
* acoplamento síncrono excessivo

---

# 🔐 5. SECURITY & GOVERNANCE

## ✔ Obrigatório

* RBAC
* isolamento contextual
* auditoria de ações
* proteção contra prompt injection

---

# 🚫 Proibido

* execução arbitrária
* memory leakage
* tool escalation

---

# 📊 6. OBSERVABILITY & OPERATIONS

## ✔ Todo sistema deve possuir

* logs estruturados
* tracing distribuído
* métricas operacionais
* health checks

---

# ✔ KPIs importantes

| KPI                | Objetivo     |
| ------------------ | ------------ |
| Latência           | velocidade   |
| Failure Rate       | estabilidade |
| Hallucination Rate | precisão     |
| Cost per Task      | eficiência   |

---

# 🛑 7. FAIL-SAFE SYSTEM

Interromper imediatamente se:

* boundary violation
* memory leak
* perda de consistência
* escalabilidade crítica
* risco de segurança

---

# 📦 8. OUTPUT STANDARD

Toda análise arquitetural deve retornar:

```bash id="lnn0u6"
✔ Contexto
✔ Arquitetura proposta
✔ Trade-offs
✔ Riscos
✔ Escalabilidade
✔ Segurança
✔ Observabilidade
✔ Próximos passos
```

---

# 🔥 9. REGRA FINAL

> CRUD resolve telas
> Arquitetura resolve complexidade
> Boundaries preservam sistemas
> Observabilidade preserva operações
> Sistemas inteligentes exigem fronteiras inteligentes
