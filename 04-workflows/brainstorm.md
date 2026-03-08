---
description: Structured brainstorming for projects and features. Explores multiple options before implementation.
---

# `/brainstorm` — Structured Strategic Exploration Mode

`$ARGUMENTS`

---

## Objective

Activate **BRAINSTORM mode** for structured, analytical exploration of a problem space **before** committing to architectural or implementation decisions.

This mode is intended for:

* Architectural decisions
* System design tradeoffs
* Technology selection
* Process strategy
* Refactoring strategy
* Product/feature direction

---

## Operational Framework

When `/brainstorm` is triggered, follow this structured reasoning model:

### 1. Clarify the Problem Space

Explicitly define:

* **Primary objective** — What outcome are we optimizing for?
* **User / stakeholder** — Who is impacted?
* **Constraints** — Technical, temporal, financial, regulatory, legacy dependencies.
* **Success criteria** — What does “good” look like?

If information is missing, state assumptions clearly.

---

### 2. Generate Viable Strategic Options

Provide **at least three materially distinct approaches**:

* Architectural variations (monolith vs modular vs distributed)
* Process alternatives (automated vs manual vs hybrid)
* Build vs buy
* Conventional vs unconventional strategies

Each option must include:

* Clear description
* Tradeoffs (not surface-level)
* Scalability implications
* Operational complexity
* Risk profile

Avoid cosmetic variations of the same idea.

---

### 3. Comparative Analysis

Provide:

* Decision tradeoff summary
* Risk vs reward perspective
* Long-term maintainability impact
* Organizational impact (team skill requirements, onboarding cost)

---

### 4. Recommendation

Deliver a reasoned recommendation based on:

* Constraints
* Risk tolerance
* Expected scale
* Strategic direction

The recommendation must be defensible and context-aware — not generic.

---

## Output Format

```markdown
## 🧠 Brainstorm: [Topic]

### Context
[Concise but complete problem framing]

### Assumptions
- [Assumption 1]
- [Assumption 2]

---

### Option A: [Strategic Name]
[Description — explain the approach clearly]

**Strengths**
- [Benefit]
- [Benefit]

**Weaknesses**
- [Tradeoff]
- [Risk]

**Scalability:** Low | Medium | High  
**Complexity:** Low | Medium | High  
**Risk Level:** Low | Medium | High  
**Estimated Effort:** Low | Medium | High  

---

### Option B: [Strategic Name]
[Description]

**Strengths**
- [...]

**Weaknesses**
- [...]

**Scalability:**  
**Complexity:**  
**Risk Level:**  
**Estimated Effort:**  

---

### Option C: [Strategic Name]
[Description]

**Strengths**
- [...]

**Weaknesses**
- [...]

**Scalability:**  
**Complexity:**  
**Risk Level:**  
**Estimated Effort:**  

---

## Decision Matrix (Optional)

| Option | Scalability | Complexity | Risk | Effort | Long-term Maintainability |
|--------|------------|------------|------|--------|---------------------------|
| A      |            |            |      |        |                           |
| B      |            |            |      |        |                           |
| C      |            |            |      |        |                           |

---

## 🎯 Recommendation

**Recommended Option: [X]**

**Rationale:**  
[Clear, structured reasoning tied to constraints and objectives.]

---

### Next Step

- Deep dive into Option [X]
- Validate assumptions
- Produce technical design draft
```

---

## Usage Examples

```
/brainstorm authentication architecture for SaaS
/brainstorm microservices vs modular monolith
/brainstorm state management strategy
/brainstorm event-driven architecture adoption
/brainstorm database strategy for multi-tenant app
```

---

## Design Principles

* No implementation code
* Explicit tradeoffs (no bias-driven framing)
* Architectural-level reasoning
* Risk-aware analysis
* Decision-enabling output (not generic ideation)