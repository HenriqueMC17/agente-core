---
description: Create project plan using project-planner agent. No code writing - only plan file generation.
---

# `/plan` — Structured Project Planning Mode

`$ARGUMENTS`

---

## 🔴 Non-Negotiable Constraints

1. **Strictly No Code Generation**
   This command produces a planning artifact only.
   No source files, no config files, no scaffolding.

2. **Mandatory Agent: `project-planner`**
   Do **not** use Antigravity Agent’s native planning logic.
   Always delegate to `project-planner`.

3. **Socratic Gate Required**
   Clarifying questions must be asked *before* drafting the plan when requirements are ambiguous, incomplete, or underspecified.

4. **Dynamic Plan Naming (Deterministic)**
   Plan file name must be derived from the user request using controlled slug rules.

---

## Objective

Translate a high-level request into a structured execution blueprint with:

* Scope definition
* Functional breakdown
* Architectural considerations
* Agent delegation
* Risk mapping
* Verification checkpoints

Output must be implementation-ready but code-free.

---

## Execution Protocol

Invoke `project-planner` with the following structured context:

```
CONTEXT:
- User Request: $ARGUMENTS
- Mode: PLANNING ONLY
- Code Generation: FORBIDDEN
- Output Path: docs/PLAN-{task-slug}.md
```

---

## File Naming Strategy (Deterministic Slug Policy)

### Step 1 — Extract Keywords

* Identify 2–3 semantically dominant keywords
* Ignore stop words (e.g., with, for, the, add, build, create)

### Step 2 — Normalize

* Lowercase
* ASCII only
* Hyphen-separated
* No special characters

### Step 3 — Constrain

* Maximum 30 characters
* Must remain meaningful and human-readable

### Examples

| Request                         | Generated File         |
| ------------------------------- | ---------------------- |
| e-commerce site with cart       | PLAN-ecommerce-cart.md |
| mobile app for fitness tracking | PLAN-fitness-app.md    |
| add dark mode feature           | PLAN-dark-mode.md      |
| fix authentication bug          | PLAN-auth-fix.md       |
| SaaS dashboard with analytics   | PLAN-saas-dashboard.md |

Final path format:

```
docs/PLAN-{slug}.md
```

---

## Mandatory Planning Phases

The `project-planner` agent must execute:

### Phase -1 — Context Validation

* Validate clarity of requirements
* Identify missing constraints
* Detect hidden assumptions
* Confirm business objective

If insufficient context → trigger Socratic Gate.

---

### Phase 0 — Socratic Gate

Before planning:

* Ask clarifying questions
* Identify:

  * Target users
  * Platform (web, mobile, API, SaaS, etc.)
  * Tech constraints
  * Timeline expectations
  * Non-functional requirements

Planning must not proceed without minimum viable clarity.

---

### Phase 1 — Scope Definition

Inside the plan file:

* Problem statement
* Success criteria
* In-scope items
* Explicit out-of-scope items

---

### Phase 2 — Functional Decomposition

Break the request into:

* Epics
* Features
* Tasks
* Subtasks (if needed)

Each task must be:

* Atomic
* Measurable
* Delegable

---

### Phase 3 — Architecture Considerations

Document:

* Recommended architectural pattern
* Data layer implications
* API boundaries
* External integrations
* Scalability considerations
* Security implications

Still: **no code.**

---

### Phase 4 — Agent Assignment Matrix

Define:

| Task | Responsible Agent | Dependencies | Risk Level |
| ---- | ----------------- | ------------ | ---------- |

Explicit delegation is mandatory.

---

### Phase 5 — Risk & Complexity Mapping

Include:

* Technical risks
* Product risks
* Integration risks
* Migration risks (if applicable)
* Estimated complexity classification:

  * Low
  * Medium
  * High
  * Architectural

---

### Phase X — Verification Checklist

Include a final validation checklist:

* [ ] Requirements validated
* [ ] Dependencies mapped
* [ ] No hidden architectural conflicts
* [ ] Scope bounded
* [ ] Tasks atomic
* [ ] Execution-ready

---

## Expected Deliverables

| Deliverable             | Location                   |
| ----------------------- | -------------------------- |
| Structured Project Plan | `docs/PLAN-{task-slug}.md` |
| Task Breakdown          | Inside plan file           |
| Agent Assignment Matrix | Inside plan file           |
| Risk Mapping            | Inside plan file           |
| Verification Checklist  | Final section              |

---

## Post-Planning Response Format

After file creation, respond exactly with:

```
[OK] Plan created: docs/PLAN-{slug}.md

Next steps:
- Review the plan
- Run `/create` to start implementation
- Or manually refine the plan
```

No additional commentary.

---

## Operational Principles

* No speculative scope expansion
* No implicit architectural assumptions
* No hidden implementation
* Clarity over verbosity
* Deterministic output naming
* Planning depth proportional to request complexity