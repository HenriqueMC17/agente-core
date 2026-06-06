# 🚀 Agent Commands — Workflow Execution Engine (v2)

**Centralizador Global de Comandos Operacionais, CLI e Workflows Interativos do Agente**

> [!CRITICAL]
> Este documento define os **comandos executáveis universais** do sistema.
> Todo comando deve operar sob:
>
> ```
> Contexto → Classificação → Planejamento → Execução → Validação → Output
> ```
>
> Nenhum comando pode:
>
> * ignorar contexto
> * executar sem validação
> * quebrar arquitetura existente
> * modificar o sistema sem análise de impacto

---

# 🧠 0. PRINCÍPIO CENTRAL

> Comandos não são atalhos.
> São pipelines controlados de engenharia.

---

# ⚙️ 1. EXECUTION LAYER (PADRÃO GLOBAL)

Todo comando executa:

```bash
1. Load Context
2. Analyze Request
3. Task Classification
4. Socratic Gate (if needed)
5. Plan
6. Execute
7. Validate
8. Deliver Output
```

---

### 🚫 Proibido

* executar direto tarefas complexas
* alterar código sem análise
* ignorar erros de build/lint/test

---

# 🏗️ 2. `/create` — SYSTEM CREATION

## 🎯 Objetivo

Criar aplicações, serviços ou estruturas completas do zero.

---

## ⚙️ Pipeline

### 1. Context Discovery

* analisar objetivo do sistema
* identificar:

  * plataforma
  * usuários
  * escala
  * autenticação
  * banco
  * deploy target

---

### 2. Architecture Planning

Gerar:

* stack técnica
* estrutura de pastas
* arquitetura
* estratégia de dados

---

### 3. Scaffolding

Orquestrar:

* frontend
* backend
* banco
* infra

---

### 4. Validation

Executar:

* install
* lint
* build
* type-check

---

### 5. Preview

Subir ambiente local/previews.

---

## 📦 Output

* sistema funcional
* arquitetura escalável
* ambiente executável

---

# 🔧 3. `/enhance` — FEATURE EVOLUTION

## 🎯 Objetivo

Adicionar, expandir ou melhorar funcionalidades existentes.

---

## ⚙️ Pipeline

### 1. Read Current State

* analisar código atual
* detectar dependências

---

### 2. Impact Analysis

Classificar:

* simples
* complexo
* crítico

---

### 3. Incremental Execution

Implementar:

* mínima alteração necessária
* sem quebrar contratos

---

### 4. Validation

Executar:

* lint
* testes
* hot reload

---

## 🚫 Proibido

* refatorações ocultas
* alterações destrutivas

---

# 🧠 4. `/brainstorm` — ARCHITECTURE THINKING MODE

## 🎯 Objetivo

Explorar soluções sem escrever código.

---

## ⚙️ Obrigatório

Gerar no mínimo:

| Opção | Complexidade | Escalabilidade | Custo |
| ----- | ------------ | -------------- | ----- |

---

## 📌 Cada abordagem deve conter:

* arquitetura
* trade-offs
* riscos
* esforço
* stack recomendada

---

## 🧠 Regra

> primeiro pensar
> depois construir

---

# 📋 5. `/plan` — PLANNING ENGINE

## 🎯 Objetivo

Planejar sem executar.

---

## ⚙️ Pipeline

### 1. Context Analysis

### 2. Scope Definition

### 3. Architecture Mapping

### 4. Task Breakdown

### 5. Risk Analysis

---

## 📄 Output

```bash
docs/PLAN-{feature}.md
```

---

## 📦 O plano deve conter:

* objetivo
* arquitetura
* fluxos
* banco
* APIs
* checklist
* riscos
* validações

---

## 🚫 Proibido

* escrever código
* assumir requisitos ocultos

---

# 🧪 6. `/test` — VALIDATION ENGINE

## 🎯 Objetivo

Criar, executar e validar testes automatizados.

---

## ⚙️ Pipeline

### 1. Analyze Critical Paths

### 2. Generate Tests

### 3. Execute Tests

### 4. Validate Coverage

---

## ✔ Estratégia

### Unit Tests

* funções puras
* regras de negócio

### Integration Tests

* APIs
* banco
* serviços

### E2E

* jornadas críticas

---

## 📌 Padrão obrigatório

```bash
Arrange → Act → Assert
```

---

## 🚫 Proibido

* flaky tests
* testes sem isolamento

---

# 🐛 7. `/debug` — ROOT CAUSE ENGINE

## 🎯 Objetivo

Resolver bugs com análise sistêmica.

---

## ⚙️ Pipeline

### 1. Reproduce

### 2. Collect Evidence

### 3. Create Hypotheses

### 4. Validate Hypotheses

### 5. Apply Fix

### 6. Prevent Regression

---

## 🧠 Regra crítica

> nunca corrigir sem identificar a causa raiz

---

## ✔ Obrigatório

* adicionar prevenção
* validar efeitos colaterais

---

# 🚀 8. `/deploy` — RELEASE PIPELINE

## 🎯 Objetivo

Executar deploy seguro.

---

## ⚙️ Pre-flight Checklist

Executar obrigatoriamente:

```bash
lint
build
type-check
tests
```

---

## 🚫 Regra Absoluta

Se qualquer etapa falhar:

```bash
DEPLOY BLOCKED
```

---

## ⚙️ Deployment Targets

* Vercel
* Fly.io
* AWS
* Docker
* Edge Runtime

---

## 📦 Output

* ambiente
* versão
* status
* URL
* healthcheck

---

# 👁️ 9. `/preview` — LOCAL RUNTIME CONTROL

## 🎯 Objetivo

Gerenciar ambiente local.

---

## ⚙️ Comandos

```bash
preview start
preview stop
preview restart
preview check
```

---

## ✔ Deve exibir

* porta
* status
* logs básicos
* healthcheck

---

# 📊 10. `/status` — SYSTEM STATUS

## 🎯 Objetivo

Mostrar estado atual do workspace.

---

## 📦 Deve retornar

* features concluídas
* tarefas pendentes
* status do build
* cobertura
* agentes ativos
* serviços online

---

# 🔍 11. `/audit` — SYSTEM AUDIT

## 🎯 Objetivo

Auditar qualidade geral do projeto.

---

## ⚙️ Verificações

### Arquitetura

* acoplamento
* boundaries
* complexidade

### Segurança

* secrets
* validação
* permissões

### Performance

* bundle
* queries
* rendering

---

## 📦 Output

* score técnico
* problemas encontrados
* recomendações

---

# 🔁 12. `/refactor` — STRUCTURAL IMPROVEMENT

## 🎯 Objetivo

Melhorar código sem alterar comportamento.

---

## ✔ Aplicar

* Clean Code
* modularização
* simplificação

---

## 🚫 Proibido

* alterar regras de negócio
* misturar refactor com feature nova

---

# 🤖 13. MULTI-AGENT EXECUTION

## ⚙️ Estrutura padrão

```bash
Planner → organiza
Builder → implementa
Reviewer → valida
Auditor → verifica
```

---

## 🚫 Proibido

* agentes sobrepostos
* execução sem ownership

---

# 🔐 14. SECURITY ENFORCEMENT

Todo workflow deve:

* validar input
* sanitizar output
* proteger secrets
* revisar permissões

---

# ⚡ 15. PERFORMANCE ENFORCEMENT

Todo workflow deve:

* evitar bloqueios
* usar paralelismo
* minimizar retrabalho

---

# 🛑 16. FAIL-SAFE SYSTEM

O workflow deve interromper imediatamente se:

* contexto insuficiente
* risco crítico
* falha estrutural
* vulnerabilidade detectada

---

# 📦 17. OUTPUT STANDARD

Toda execução deve retornar:

```bash
✔ O que foi feito
✔ Impacto
✔ Validações executadas
✔ Próximos passos
```

---

# 🔥 18. REGRA FINAL

> Se não passa pelo workflow → não deve existir
> Se não pode ser validado → não pode ser entregue
> Se não é escalável → já nasceu legado