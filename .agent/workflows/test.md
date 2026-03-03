---
description: Test generation and test running command. Creates and executes tests for code.
---

# `/test` — Test Strategy, Generation & Execution Mode

`$ARGUMENTS`

---

## Objective

Provide deterministic test generation, execution, diagnostics, and coverage analysis aligned with the project's testing architecture.

This command supports:

* Test execution (full or scoped)
* Targeted test generation
* Coverage inspection
* Watch mode
* Failure diagnostics
* Test repair workflow

---

## Command Matrix

| Command                  | Action                            |
| ------------------------ | --------------------------------- |
| `/test`                  | Run full test suite               |
| `/test [file/feature]`   | Generate tests for target         |
| `/test coverage`         | Generate coverage report          |
| `/test watch`            | Run in watch mode                 |
| `/test fix failed tests` | Diagnose and repair failing tests |

---

## Operational Modes

---

## 1️⃣ Test Execution Mode

### `/test`

Responsibilities:

* Detect test framework (Jest, Vitest, Mocha, etc.)
* Execute full test suite
* Capture structured results
* Detect failures
* Report summary + actionable diagnostics

### Output Format

```
🧪 Running test suite...

✅ auth.test.ts (5 passed)
✅ user.test.ts (8 passed)
❌ order.test.ts (2 passed, 1 failed)

Failed:
  ✗ should calculate total with discount
    Expected: 90
    Received: 100
    Location: order.service.test.ts:42

Summary:
Total: 15
Passed: 14
Failed: 1
Duration: 3.4s
```

If all pass:

```
🎉 All tests passed.
Coverage threshold maintained.
```

---

## 2️⃣ Targeted Test Generation Mode

### `/test [file or feature]`

Example:

```
/test src/services/auth.service.ts
/test user registration flow
```

---

## Generation Workflow

### Phase 1 — Static Analysis

* Identify exported functions/classes
* Detect public API surface
* Map input/output contracts
* Detect side effects
* Identify external dependencies
* Identify asynchronous flows
* Detect exception paths

---

### Phase 2 — Test Strategy Design

Generate structured test matrix:

| Category            | Required                     |
| ------------------- | ---------------------------- |
| Happy path          | Mandatory                    |
| Validation errors   | Mandatory                    |
| Edge cases          | Mandatory                    |
| Exception handling  | Mandatory                    |
| Integration tests   | If external systems involved |
| Boundary conditions | If applicable                |

---

### Phase 3 — Test Implementation

Rules:

* Use project’s configured framework
* Mirror existing directory conventions
* Follow established naming patterns
* Mock all external dependencies
* Do not alter production code unless explicitly requested

---

## Output Format — Test Generation

```markdown
## 🧪 Tests Generated: AuthService

### Test Plan

| Test Case | Type | Coverage Target |
|------------|------|----------------|
| Should return token for valid credentials | Unit | Happy path |
| Should reject invalid email | Unit | Validation |
| Should throw on DB error | Unit | Error handling |
| Should enforce password length | Unit | Boundary |

### Test File Created

tests/auth.service.test.ts
```

```typescript
// test code here
```

```
Run with: npm test
```

---

## 3️⃣ Coverage Mode

### `/test coverage`

Responsibilities:

* Execute coverage tool
* Parse output
* Highlight uncovered lines
* Compare against thresholds (if configured)

Output:

```
📊 Coverage Report

Statements: 87%
Branches: 79%
Functions: 91%
Lines: 86%

⚠️ Below threshold:
- Branch coverage under 80%

Uncovered:
- auth.service.ts: lines 54–61
- order.service.ts: lines 103–109
```

If thresholds exist:

```
Minimum Required: 85%
Status: ✅ Pass
```

---

## 4️⃣ Watch Mode

### `/test watch`

* Runs in incremental mode
* Re-executes on file change
* Displays delta results

Output:

```
👀 Watch mode enabled.
Waiting for changes...
```

---

## 5️⃣ Failure Diagnosis & Repair Mode

### `/test fix failed tests`

Workflow:

1. Identify failing test
2. Determine failure type:

   * Assertion mismatch
   * Mock misconfiguration
   * Async timing issue
   * Regression in business logic
3. Propose minimal corrective action
4. Avoid masking real bugs

Never:

* Modify business logic silently to “make tests pass”
* Remove failing assertions without justification

---

## Test Quality Standards

### Core Principles

* Test behavior, not implementation details
* One logical expectation per test (when feasible)
* Deterministic outcomes (no flakiness)
* No shared mutable state across tests
* Isolated environment
* No real external API calls
* Explicit mock configuration

---

## Unit Test Structure Pattern

```typescript
describe('AuthService', () => {
  describe('login', () => {
    it('returns token for valid credentials', async () => {
      // Arrange
      const credentials = { email: 'test@test.com', password: 'pass123' };

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result.token).toBeDefined();
    });

    it('throws for invalid password', async () => {
      // Arrange
      const credentials = { email: 'test@test.com', password: 'wrong' };

      // Act & Assert
      await expect(authService.login(credentials))
        .rejects
        .toThrow('Invalid credentials');
    });
  });
});
```

---

## Anti-Patterns (Explicitly Forbidden)

* Testing private methods directly
* Snapshot overuse without justification
* Over-mocking internal modules
* Coupling tests to implementation structure
* Silent test skips
* Swallowing async errors

---

## Operational Guarantees

* Zero side effects in generation mode (except test files)
* No production code modification unless explicitly requested
* Deterministic output formatting
* Clear separation between generation and execution