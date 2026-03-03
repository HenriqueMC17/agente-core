---
description: Debugging command. Activates DEBUG mode for systematic problem investigation.
---

# `/debug` — Systematic Fault Investigation Protocol

`$ARGUMENTS`

---

## Objective

Activate **DEBUG mode** for structured, hypothesis-driven investigation of defects, runtime errors, logical inconsistencies, performance degradation, or unexpected system behavior.

This command enforces disciplined root-cause analysis — not speculative patching.

Applicable to:

* Runtime exceptions
* API failures
* Data inconsistencies
* State management issues
* Integration breakdowns
* Performance regressions
* Infrastructure misconfiguration

---

## Investigation Framework

### Phase 1 — Context Acquisition

Collect all relevant diagnostic inputs before forming conclusions:

* Exact error message (verbatim)
* Stack trace
* Environment (dev/staging/prod)
* Reproduction steps
* Expected vs actual behavior
* Recent code/config changes
* Dependency updates
* Logs (application, server, database)
* Related commits (if applicable)

If context is incomplete, request clarification before proceeding.

---

### Phase 2 — Hypothesis Formulation

Generate multiple plausible causes:

* Categorize by layer:

  * Infrastructure
  * Configuration
  * Data
  * Business logic
  * State management
  * External integrations
* Rank by likelihood and blast radius
* Identify fastest falsifiable hypothesis

Avoid single-cause bias.

---

### Phase 3 — Controlled Investigation

For each hypothesis:

* Define verification step
* Execute diagnostic check
* Record result
* Eliminate or validate

Use:

* Log inspection
* Request tracing
* Data inspection
* Environment diffing
* Binary search debugging (if needed)

No changes are applied before identifying root cause unless explicitly exploratory.

---

### Phase 4 — Root Cause Analysis

Provide:

* Clear technical explanation
* Why the system behaved that way
* Why safeguards failed (if applicable)
* Scope of impact
* Whether similar faults may exist elsewhere

Differentiate:

* Symptom vs cause
* Trigger vs structural weakness

---

### Phase 5 — Remediation & Hardening

Deliver:

1. Precise fix
2. Explanation of why it works
3. Validation steps
4. Preventative measures

Preventative actions may include:

* Additional validation
* Improved typing/contracts
* Tests (unit/integration/e2e)
* Logging enhancements
* Observability improvements
* Configuration guards

---

## Output Format

````markdown
## 🔎 Debug: [Issue Title]

### 1. Symptom
[Observed behavior]

### 2. Environment
- Runtime:
- Framework:
- Database:
- Deployment context:

### 3. Information Collected
- Error:
- Stack trace:
- Reproduction steps:
- Recent changes:

---

### 4. Hypotheses (Ranked)

1. ❓ [Most probable cause]
2. ❓ [Secondary hypothesis]
3. ❓ [Edge case possibility]

---

### 5. Investigation Log

**Hypothesis 1 — [Description]**  
Diagnostic step:  
Result:  
Conclusion: ✅ Confirmed | ❌ Rejected

**Hypothesis 2 — [Description]**  
Diagnostic step:  
Result:  
Conclusion:

---

### 6. Root Cause

🎯 **Technical Explanation:**  
[Clear causal explanation]

**Impact Scope:**  
[Where else this might manifest]

---

### 7. Fix

```[language]
// Before
[problematic code]

// After
[corrected implementation]
```

**Why This Works:**  
[Mechanism-level explanation]

---

### 8. Prevention & Hardening

- [Add validation rule]
- [Add automated test]
- [Improve logging]
- [Introduce monitoring alert]
````

---

## Usage Examples

```
/debug authentication middleware returns 401
/debug API intermittently returns 500
/debug state not updating in React component
/debug database migration failing
/debug memory leak in Node service
```

---

## Governing Principles

* Diagnose before modifying.
* Eliminate hypotheses methodically.
* Treat logs as first-class signals.
* Separate symptom from structural weakness.
* Always explain causality.
* Every fix should reduce future entropy.