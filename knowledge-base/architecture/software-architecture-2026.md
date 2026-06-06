# 🏗️ KNOWLEDGE BASE: Padrões de Arquitetura de Software 2026

> **Domínio:** Architecture  
> **Versão:** 1.0 | 2026

---

## 1. A Decisão Arquitetural como Ativo de Negócio

> "A Arquitetura de Software é o compromisso operacional que molda a velocidade de entrega, a segurança e a viabilidade econômica de um produto a longo prazo."

A escolha de arquitetura impacta:
- **Velocidade de deploy** (Frequency of Deployment — DORA)
- **Custo operacional** (FinOps e Cloud Spend)
- **Capacidade de onboarding** (Time-to-First-Commit de novos devs)
- **Resiliência a falhas** (MTTR e Change Failure Rate)

---

## 2. Monólito vs. Microserviços: Matriz de Decisão

| Dimensão | Monólito | Microserviços |
|---|---|---|
| **Complexidade inicial** | Baixa | Alta |
| **Velocidade de MVP** | ✅ Excelente | ❌ Lenta |
| **Deploy independente** | ❌ Não | ✅ Sim |
| **Escalabilidade granular** | ❌ Não | ✅ Sim |
| **Overhead operacional** | Baixo | Alto |
| **Times pequenos (<10 devs)** | ✅ Ideal | ❌ Excessivo |
| **Times grandes (>50 devs)** | ❌ Gargalo | ✅ Ideal |
| **Domínio bem definido** | ✅ Adequado | ✅ Ideal |
| **Domínio exploratório** | ✅ Ideal | ❌ Prematuro |

### Regra de Ouro 2026
```
MVP / Startup / Times pequenos:
  → MONÓLITO modular (The Modular Monolith)
  → Estrutura Clean Architecture interna
  → Fronteiras de domínio bem definidas desde o início

Scale-up / Times grandes / Alta demanda:
  → Migração cirúrgica para microserviços
  → Strangler Fig Pattern (migração incremental)
  → Nunca "big bang rewrite"
```

---

## 3. Arquiteturas Web de Alta Performance 2026

### SSR vs. SSG vs. CSR vs. Edge

| Padrão | Quando Usar | Framework |
|---|---|---|
| **SSR** (Server-Side Rendering) | Conteúdo dinâmico personalizado, SEO crítico | Next.js App Router |
| **SSG** (Static Site Generation) | Conteúdo majoritariamente estático | Next.js, Astro |
| **CSR** (Client-Side Rendering) | Dashboards autenticados, alto interatividade | Vite + React |
| **Edge Rendering** | Personalização por geolocalização, baixa latência | Next.js + Vercel Edge |
| **Resumibilidade** | Performance extrema em mobile, sem hidratação | Qwik |

### App Router vs. Pages Router (Next.js)
```
App Router (PADRÃO 2026):
  ✅ React Server Components nativos
  ✅ Streaming e Suspense
  ✅ Layouts aninhados
  ⚠️  Cuidado: Vibe Coding com AI tende a misturar Server/Client
      → Valide manualmente qual componente usa "use client"

Pages Router (Legacy):
  → Apenas para projetos existentes
  → Migração recomendada quando há capacidade
```

---

## 4. Clean Architecture: 7 Camadas

```
CAMADA 1: GOVERNANCE (Constituição)
  → Regras que definem o sistema
  → NUNCA muda sem ADR formal

CAMADA 2: DOMAIN (Entidades e Casos de Uso)
  → Lógica de negócio pura
  → Zero dependências externas
  → Testável em isolamento

CAMADA 3: APPLICATION (Orquestração)
  → Coordena entidades e serviços
  → Interfaces/contratos, não implementações

CAMADA 4: INFRASTRUCTURE (Adapters)
  → Banco de dados, APIs externas, filas
  → Implementa contratos da camada Application
  → Substituível sem impacto no Domain

CAMADA 5: PRESENTATION (UI/API)
  → Controllers, Views, Resolvers
  → Thin layer: apenas mapeia para Application

CAMADA 6: SHARED (Utilitários Transversais)
  → Logging, erros, tipos compartilhados
  → NÃO contém lógica de negócio

CAMADA 7: CROSS-CUTTING (Observabilidade, Segurança)
  → Telemetria, autenticação, rate limiting
  → Aplicado via middlewares e interceptors
```

**Regra de Dependência:** Camadas externas dependem de internas. NUNCA o inverso.

---

## 5. Padrões Event-Driven: CRUD vs. Event Sourcing

| Padrão | Quando Usar |
|---|---|
| **CRUD** | 80% dos casos — simples, direto, YAGNI |
| **CQRS** | Leitura e escrita têm perfis de escala diferentes |
| **Event Sourcing** | Auditoria completa obrigatória, compliance, finanças |
| **Saga** | Transações distribuídas entre microserviços |

**Anti-pattern 2026:** Usar Event Sourcing sem necessidade real de auditoria = complexidade acidental desnecessária.

---

## 6. FLARE: Raciocínio Fiel em Decisões Arquiteturais

O Framework **FLARE** (Faithful Logic-Aided Reasoning and Exploration) aplicado à arquitetura:

```
FASE 1: PLANEJAMENTO (Linguagem Natural)
  "Precisamos de uma solução para X que suporte Y requisitos"

FASE 2: FORMALIZAÇÃO LÓGICA (Pseudo-código estruturado)
  IF carga_esperada > 10k_req/s AND times > 50 THEN
    microservices
  ELSE IF MVP AND team_size < 10 THEN
    modular_monolith
  ...

FASE 3: EXPLORAÇÃO (ToT — Tree of Thoughts)
  Ramo A: Monólito modular → impacto em 2 anos?
  Ramo B: Microserviços → custo operacional?
  Ramo C: Híbrido → complexidade de migração?

FASE 4: VALIDAÇÃO (COVE independente)
  → Verificar cada premissa contra dados reais do contexto

FASE 5: ADR (Architecture Decision Record)
  → Documentar a decisão com contexto, opções e justificativa
```

---

## 7. Template de ADR (Architecture Decision Record)

```markdown
# ADR-[NÚMERO]: [Título da Decisão]

**Data:** YYYY-MM-DD  
**Status:** Proposto | Aceito | Deprecado | Supersedido por ADR-N  
**Decisores:** [nomes]

## Contexto
[Por que esta decisão precisou ser tomada?]

## Decisão
[O que foi decidido?]

## Opções Consideradas
| Opção | Vantagens | Desvantagens |
|---|---|---|
| Opção A | ... | ... |
| Opção B | ... | ... |

## Justificativa
[Por que esta opção foi escolhida sobre as outras?]

## Consequências
**Positivas:** [o que melhora]
**Negativas:** [o que piora ou torna mais complexo]
**Riscos:** [o que pode dar errado]

## Revisão em
[Data ou milestone para reavaliar esta decisão]
```

---

> **Fontes:**  
> - *Guia Mestre: Fundamentos de Arquitetura de Software — Monólitos vs. Microserviços*  
> - *Guia de Decisão Tecnológica 2026: Frameworks Mobile e Web*  
> - *Diretriz de Governance Corporativa: Implementação de IA e Segurança Pós-Quântica*
