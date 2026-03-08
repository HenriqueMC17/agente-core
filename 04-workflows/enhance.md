---
description: Add or update features in existing application. Used for iterative development.
---

# `/enhance` — Controlled Application Evolution Protocol

`$ARGUMENTS`

---

## Objective

Execute structured updates, feature additions, refactors, or architectural modifications to an existing application while preserving system integrity, consistency, and maintainability.

This command governs:

* New feature implementation
* UI/UX improvements
* Performance optimization
* Refactoring
* Integration of third-party services
* Infrastructure adjustments

Enhancements must be incremental, traceable, and impact-aware.

---

## Execution Framework

### Phase 1 — Current State Assessment

Before modifying anything:

* Load project state:

  ```
  python .agent/scripts/session_manager.py info
  ```
* Identify:

  * Tech stack
  * Architecture pattern
  * Existing modules
  * Dependency graph
  * Database structure
  * Environment configuration
* Detect technical debt or structural constraints.

Deliverable:

* Clear snapshot of system baseline
* Identification of architectural boundaries

---

### Phase 2 — Impact Analysis & Change Planning

Define precisely:

* What will be added, modified, or removed
* Which modules/layers are affected
* Backward compatibility implications
* Database migration requirements
* API contract changes
* UI/UX changes
* Performance impact

If the change is non-trivial, quantify scope:

Example:

```
Feature: Admin Panel

Impact:
- 15 new files
- 8 modified files
- 2 new routes
- 1 database migration
- Estimated time: ~10 minutes

Proceed?
```

Approval is mandatory for:

* Structural changes
* Stack alterations
* Schema modifications
* Dependency shifts

---

### Phase 3 — Controlled Implementation

Execution must:

* Respect existing architecture
* Follow Clean Architecture principles
* Maintain naming consistency
* Avoid cross-layer leakage
* Preserve separation of concerns

Orchestrate relevant specialists:

* Database changes → schema + migration safety
* Backend updates → validation + API contract integrity
* Frontend changes → component isolation + state consistency
* Infra changes → environment stability

All changes must be cohesive and minimal.

---

### Phase 4 — Validation & Testing

After implementation:

* Run lint checks
* Run tests (unit/integration)
* Validate critical flows
* Confirm no regression
* Validate migrations (if applicable)

If the change affects production behavior:

* Simulate failure scenarios
* Confirm backward compatibility

---

### Phase 5 — Preview & Runtime Verification

* Hot reload if possible
* Restart services if required
* Validate feature manually
* Confirm no runtime errors
* Confirm UI integrity

Deliver:

* Summary of changes
* Confirmation of stability
* Any known limitations

---

## Output Structure (For Major Changes)

```markdown
## 🔧 Enhancement: [Feature Name]

### Current State Summary
[Brief architectural snapshot]

### Proposed Change
[Description]

### Impact Analysis
- New files:
- Modified files:
- Deleted files:
- Database changes:
- API changes:
- Estimated effort:

### Risks
- [Risk 1]
- [Risk 2]

Proceed? (y/n)
```

---

## Usage Examples

```
/enhance add role-based authentication
/enhance integrate Stripe payments
/enhance refactor API to service layer
/enhance implement caching layer
/enhance add admin dashboard
/enhance convert to modular architecture
```

---

## Safety & Governance Rules

* Never introduce silent breaking changes.
* Warn about stack conflicts (e.g., replacing PostgreSQL with Firebase).
* Require approval for architectural shifts.
* Keep changes atomic when possible.
* Commit each logical unit with descriptive messages.
* Avoid speculative refactors unless requested.

---

## Operational Principles

* Preserve system stability.
* Minimize blast radius.
* Favor incremental evolution over sweeping rewrites.
* Always explain architectural implications.
* Every enhancement must improve clarity, scalability, or usability.