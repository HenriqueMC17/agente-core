---
description: Create new application command. Triggers App Builder skill and starts interactive dialogue with user.
---

# `/create` — Application Creation Orchestration Command

`$ARGUMENTS`

---

## Objective

Initiate a **structured application development lifecycle**, from requirement clarification to deployable preview, using coordinated agent orchestration.

This command is intended for:

- New product prototypes  
- MVPs  
- Internal tools  
- SaaS applications  
- Experimental architecture builds  

---

## Execution Framework

### Phase 1 — Requirement Clarification

**Goal:** Eliminate ambiguity before planning.

Actions:

- Identify:
  - Application type (web, mobile, API, SaaS, internal tool, etc.)
  - Core functionality (MVP scope)
  - Target users
  - Authentication requirements
  - Data persistence needs
  - Non-functional requirements (performance, scale, security)

- If information is incomplete:
  - Invoke `conversation-manager` skill  
  - Ask structured clarification questions  
  - State assumptions explicitly if proceeding with defaults  

Deliverable:
- Clear problem statement
- Defined MVP boundary
- Constraint summary

---

### Phase 2 — Project Planning & Architecture Definition

**Goal:** Convert intent into a structured execution plan.

Orchestration:

- Activate `project-planner` agent to:
  - Define tech stack (frontend, backend, database, infra)
  - Select architectural pattern (monolith, modular, layered, etc.)
  - Establish folder structure
  - Define domain boundaries
  - Break work into atomic tasks
  - Create `PLAN.md` (or equivalent planning artifact)

Key Decisions:

- Stack justification
- Scalability assumptions
- Data model strategy
- Authentication/authorization approach
- Deployment strategy (local, containerized, cloud-ready)

No implementation begins without plan approval.

---

### Phase 3 — Application Construction (Post-Approval)

**Goal:** Execute according to approved architecture.**

Orchestration via `app-builder` skill:

Coordinate domain specialists:

- `database-architect`
  - Schema design
  - Relationships
  - Indexing strategy
  - Migration plan

- `backend-specialist`
  - API contracts
  - Business logic layer
  - Validation
  - Error handling
  - Security middleware

- `frontend-specialist`
  - Component architecture
  - State management strategy
  - UI/UX baseline
  - API integration

All code must respect:

- Clean Architecture principles
- Separation of Concerns
- SOLID
- Consistent naming conventions
- Maintainable folder structure

---

### Phase 4 — Local Execution & Preview

**Goal:** Validate application viability.**

- Start environment using `auto_preview.py`
- Confirm:
  - Server runs without errors
  - Routes respond correctly
  - UI loads
  - Database connects

Deliverable:

- Functional preview URL
- Short validation summary
- Known limitations (if any)

---

## Operational Rules

- No uncontrolled scope expansion.
- MVP-first mindset.
- Avoid over-engineering unless explicitly requested.
- Prefer deterministic setup over speculative tooling.
- Clearly communicate tradeoffs if defaults are chosen.

---

## Usage Examples

```
/create blog platform with admin panel
/create SaaS CRM with authentication and role system
/create e-commerce app with Stripe integration
/create internal task manager for small team
/create REST API for inventory management
```

---

## Pre-Execution Clarification Checklist

If the request lacks specificity, ask:

1. What type of application is this?
2. Who is the primary user?
3. What are the must-have features for version 1?
4. Does it require authentication?
5. Should it be production-ready or prototype-level?
6. Any preferred tech stack?

If the user does not specify:

- Use pragmatic defaults
- Document assumptions
- Allow refinement later