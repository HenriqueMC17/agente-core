---
description: Design a DDD Core Domain
---

# Workflow: Design a DDD Core Domain

Model a complex domain coherently, then implement tactical and evented patterns only where justified.

**Related bundles:** `Architecture & Design`, `DDD & Evented Architecture`

### Prerequisites

- Access to at least one domain expert or product owner proxy.
- Current system context and integration landscape available.
- Agreement on business goals and key domain outcomes.

### Steps

1. **Assess DDD fit and scope**
   - **Goal:** Decide whether full DDD, partial DDD, or simple modular architecture is appropriate.
   - **Skills:** `@domain-driven-design`, `@architecture-decision-records`

2. **Create strategic model**
   - **Goal:** Define subdomains, bounded contexts, and ubiquitous language.
   - **Skills:** `@ddd-strategic-design`

3. **Map context relationships**
   - **Goal:** Define upstream/downstream contracts and anti-corruption boundaries.
   - **Skills:** `@ddd-context-mapping`

4. **Implement tactical model**
   - **Goal:** Encode invariants with aggregates, value objects, and domain events.
   - **Skills:** `@ddd-tactical-patterns`, `@test-driven-development`

5. **Adopt evented patterns selectively**
   - **Goal:** Apply CQRS, event store, projections, and sagas only where complexity and scale require them.
   - **Skills:** `@cqrs-implementation`, `@event-store-design`, `@projection-patterns`, `@saga-orchestration`
