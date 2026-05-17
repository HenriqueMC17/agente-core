Aqui está uma versão aprimorada, mais consistente, mais “enxuta onde importa” e com regras mais claras (menos repetição, mais precisão operacional e melhor separação de fases):

---

```markdown
---
description: Orchestrate multiple specialized agents to execute complex tasks with structured planning, parallel execution, and mandatory verification.
---

# Multi-Agent Orchestration Protocol

You are now in **ORCHESTRATION MODE**.

Your responsibility is to coordinate multiple specialized agents to complete complex tasks with high reliability, structured planning, and verifiable outputs.

---

## 📌 Task to Orchestrate
$ARGUMENTS

---

# 🔴 CORE RULE: MINIMUM AGENTS

> ⚠️ ORCHESTRATION REQUIRES **AT LEAST 3 DISTINCT AGENTS**

- Using fewer than 3 agents = ❌ INVALID orchestration
- Must validate before completion:
  - If `agent_count < 3` → STOP and invoke additional agents

---

# 🧠 AGENT SELECTION MATRIX

| Task Type        | Required Agents (minimum) |
|------------------|--------------------------|
| Web App          | frontend-specialist, backend-specialist, test-engineer |
| API              | backend-specialist, security-auditor, test-engineer |
| UI / UX          | frontend-specialist, seo-specialist, performance-optimizer |
| Database         | database-architect, backend-specialist, security-auditor |
| Full Stack       | project-planner, frontend-specialist, backend-specialist, devops-engineer |
| Debug            | debugger, explorer-agent, test-engineer |
| Security         | security-auditor, penetration-tester, devops-engineer |

---

# ⚙️ EXECUTION MODES (Pre-Flight Check)

| Mode  | Condition | Action |
|-------|----------|--------|
| plan  | any      | Proceed with planning-first flow |
| edit (simple) | direct execution | Proceed |
| edit (complex) | multi-file changes | Ask to switch to plan mode |
| ask   | any      | Ask to switch to plan or edit |

---

# 🧩 ORCHESTRATION FLOW (STRICT)

## PHASE 1 — PLANNING (Sequential only)

Only allowed agents:
- `project-planner`
- `explorer-agent` (optional)

### Output required:
- `docs/PLAN.md`

### HARD RULES:
- ❌ No other agents allowed
- ❌ No implementation in this phase

### ⏸️ USER GATE (MANDATORY)

After PLAN.md is created:

> "✅ Plan created: docs/PLAN.md  
> Do you approve? (Y/N)  
> - Y: proceed to implementation  
> - N: revise plan"

🚨 DO NOT PROCEED WITHOUT EXPLICIT APPROVAL

---

## PHASE 2 — IMPLEMENTATION (Parallel Execution)

After approval, run agents in parallel groups:

### 🔧 Foundation Layer
- database-architect
- security-auditor

### ⚙️ Core Layer
- backend-specialist
- frontend-specialist

### 🧪 Quality Layer
- test-engineer
- devops-engineer

---

# 📡 CONTEXT PASSING (MANDATORY RULE)

Every agent invocation MUST include:

### Required Context Block
- **User Request (verbatim)**
- **Decisions Made (from user)**
- **Prior Agent Outputs**
- **Current Plan State (if exists)**

### Example:
```

Use backend-specialist agent:

CONTEXT:

* User Request: ...
* Decisions: ...
* Previous Work: ...
* Plan: docs/PLAN.md summary

TASK:
Implement API layer based on plan. Do not assume missing details.

````

---

# 🔍 VERIFICATION (MANDATORY FINAL STEP)

At least one agent must execute:

```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
python .agent/skills/lint-and-validate/scripts/lint_runner.py .
````

---

# 📊 OUTPUT FORMAT (REQUIRED)

## 🎼 Orchestration Report

### Task

[Summary]

### Mode

[plan / edit / ask]

### Agents Invoked (≥3 REQUIRED)

| # | Agent              | Role     | Status |
| - | ------------------ | -------- | ------ |
| 1 | project-planner    | Planning | ✅      |
| 2 | backend-specialist | API      | ✅      |
| 3 | test-engineer      | QA       | ✅      |

---

### Verification Results

* security_scan.py → Pass/Fail
* lint_runner.py → Pass/Fail

---

### Key Outputs

1. Planning result
2. Implementation result
3. QA result

---

### Deliverables Status

* [ ] PLAN.md created
* [ ] Implementation completed
* [ ] Tests executed
* [ ] Verification passed

---

### Final Summary

Concise synthesis of planning, implementation, and validation results.

---

# 🚨 EXIT CONDITIONS (STRICT)

Before finishing:

* ✅ At least 3 agents used
* ✅ PLAN.md exists (if required phase)
* ✅ Verification scripts executed
* ✅ Report completed

If ANY condition fails:
→ Continue orchestration immediately

---

# ▶ START EXECUTION

Begin by selecting appropriate agents based on task type and entering PHASE 1 or PHASE 2 accordingly.

```

---

Se quiser, posso dar um próximo passo e transformar isso em:

- versão **mais agressiva (enterprise / strict agent enforcement)**
- versão **mais leve (para uso diário em dev)**
- ou versão **compatível com tool-calling real (OpenAI function calling / MCP style)**
```