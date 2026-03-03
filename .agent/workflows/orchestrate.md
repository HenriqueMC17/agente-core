---
description: Coordinate multiple agents for complex tasks. Use for multi-perspective analysis, comprehensive reviews, or tasks requiring different domain expertise.
---

# Multi-Agent Orchestration Framework

You are operating in **ORCHESTRATION MODE**.

Your responsibility is to coordinate multiple specialized agents to solve complex, multi-domain problems with controlled sequencing, context propagation, and formal verification.

---

## 🎯 Orchestration Target

`$ARGUMENTS`

---

# 🔴 Hard Constraint: Minimum Agent Policy

> **Orchestration requires a minimum of 3 distinct agents.**
> Fewer than 3 agents constitutes delegation, not orchestration.

### Mandatory Validation Before Completion

* Count invoked agents
* If `invoked_agents < 3` → STOP
* Invoke additional domain-relevant agents
* Single-agent execution = orchestration failure

No exceptions.

---

# Domain-to-Agent Selection Matrix

| Problem Domain        | Mandatory Agent Set (Minimum)                                             |
| --------------------- | ------------------------------------------------------------------------- |
| Web Application       | frontend-specialist, backend-specialist, test-engineer                    |
| API / Services        | backend-specialist, security-auditor, test-engineer                       |
| UI / Design           | frontend-specialist, seo-specialist, performance-optimizer                |
| Database / Data Layer | database-architect, backend-specialist, security-auditor                  |
| Full Stack System     | project-planner, frontend-specialist, backend-specialist, devops-engineer |
| Debugging             | debugger, explorer-agent, test-engineer                                   |
| Security Review       | security-auditor, penetration-tester, devops-engineer                     |

If a task spans multiple domains, aggregate all relevant agents.

---

# Pre-Flight: Mode Governance

| Current Mode | Task Complexity           | Required Action                                         |
| ------------ | ------------------------- | ------------------------------------------------------- |
| `plan`       | Any                       | Proceed with planning-first discipline                  |
| `edit`       | Minor change              | Execute directly                                        |
| `edit`       | Multi-module / Structural | Request switch to `plan`                                |
| `ask`        | Any                       | Request switch to `plan` or `edit` before orchestration |

Mode discipline is mandatory.

---

# 🔴 Two-Phase Execution Model (Strict)

---

## PHASE 1 — Structured Planning (Sequential Only)

Planning must be isolated.

### Allowed Agents in Phase 1:

* `project-planner`
* `explorer-agent` (if discovery required)

### Sequence:

| Step | Agent                     | Purpose               |
| ---- | ------------------------- | --------------------- |
| 1    | project-planner           | Create `docs/PLAN.md` |
| 2    | explorer-agent (optional) | Codebase discovery    |

> ❗ No other agents allowed during Phase 1.

---

## ⏸ Mandatory Checkpoint: Explicit User Approval

After `PLAN.md` is generated:

```
✅ Plan created: docs/PLAN.md

Do you approve? (Y/N)
- Y → Proceed to implementation
- N → Revise plan
```

> 🔴 Implementation cannot begin without explicit approval.

---

## PHASE 2 — Coordinated Implementation (Parallel Allowed)

After approval, invoke agents grouped by domain:

### Foundation Layer

* `database-architect`
* `security-auditor`

### Core Implementation

* `backend-specialist`
* `frontend-specialist`

### Validation & Delivery

* `test-engineer`
* `devops-engineer`

Parallel invocation is allowed only in Phase 2.

---

# 🔴 Context Propagation Protocol (Mandatory)

Every subagent invocation MUST include:

1. Full original user request
2. All clarified decisions
3. Outputs from prior agents
4. Current PLAN.md contents (if present)

Failure to propagate full context invalidates orchestration integrity.

### Correct Invocation Example

```
Use backend-specialist:

CONTEXT:
- User Request: [...]
- Approved Plan: [...]
- Database Decisions: [...]
- Security Constraints: [...]

TASK:
Implement API endpoints exactly as defined in PLAN.md.
```

No implicit assumptions allowed.

---

# Execution Governance

## Step 1 — Domain Analysis

Identify all impacted domains:

```
□ Security
□ Backend
□ Frontend
□ Database
□ Testing
□ DevOps
□ Performance
□ SEO
□ Mobile
□ Planning
```

Every checked domain must have an assigned agent.

---

## Step 2 — Phase Determination

| Condition                 | Action        |
| ------------------------- | ------------- |
| PLAN.md absent            | Enter Phase 1 |
| PLAN.md exists + approved | Enter Phase 2 |

---

## Step 3 — Implementation Discipline

During execution:

* Respect architectural boundaries
* Prevent cross-layer leakage
* Avoid redundant logic
* Preserve separation of concerns
* Maintain traceability

---

# 🔴 Mandatory Verification Gate

The final agent must execute validation scripts:

```bash
python .agent/skills/vulnerability-scanner/scripts/security_scan.py .
python .agent/skills/lint-and-validate/scripts/lint_runner.py .
```

If either fails:

* Halt orchestration
* Assign remediation agent
* Re-run verification

No orchestration concludes without validation.

---

# Final Synthesis Protocol

All agent outputs must be unified into a single orchestration report.

---

# Required Output Structure

```markdown
## 🎼 Orchestration Report

### Task
[Original task summary]

### Mode
[plan | edit | ask]

### Agents Invoked (≥ 3 REQUIRED)
| # | Agent | Domain | Status |
|---|--------|--------|--------|
| 1 | project-planner | Planning | ✅ |
| 2 | backend-specialist | API | ✅ |
| 3 | test-engineer | Verification | ✅ |

### Validation Scripts
- security_scan.py → Pass/Fail
- lint_runner.py → Pass/Fail

### Domain Coverage
- Security: Covered
- Backend: Covered
- Frontend: Covered
- Testing: Covered

### Key Findings
1. Agent X:
2. Agent Y:
3. Agent Z:

### Deliverables
- [ ] PLAN.md
- [ ] Implementation completed
- [ ] Tests passing
- [ ] Security validated

### Final Assessment
[Unified synthesis of outcomes, risks, and system status]
```

---

# 🔴 Exit Gate (Non-Negotiable)

Before marking orchestration complete:

* ✅ `invoked_agents >= 3`
* ✅ Verification scripts executed
* ✅ Report generated
* ✅ Domain coverage confirmed
* ✅ User approval respected (if Phase 2)

If any condition fails → orchestration remains incomplete.