---
description: Display agent and project status. Progress tracking and status board.
---

# `/status` — Project & Agent Operational Snapshot

`$ARGUMENTS`

---

## Objective

Provide a consolidated, real-time overview of:

* Project metadata
* Technical stack
* Feature progress
* Agent execution state
* File system impact
* Preview runtime health

This command is read-only and must not alter system state.

---

## Scope of Inspection

### 1. Project Metadata

Displays:

* Project name
* Absolute path
* Project type / template classification
* Lifecycle state (active, paused, planning, error)

---

### 2. Technical Stack Summary

Enumerates detected stack components:

* Frontend framework
* Backend framework
* Database
* Authentication provider
* Payment provider
* Infrastructure layer (if applicable)

Stack detection must reflect actual configuration — not assumptions.

---

### 3. Feature Registry

Grouped into:

* ✅ Implemented
* 🔄 In Progress
* ⏳ Pending
* ❌ Blocked (if applicable)

Feature state must be derived from session tracking or plan artifacts.

---

### 4. Agent Execution Board

Displays per-agent status:

| Agent | Status | Current Task | Progress |
| ----- | ------ | ------------ | -------- |

Status values:

* ✅ Completed
* 🔄 Running
* ⏳ Waiting
* ❌ Blocked
* 💤 Idle

If no agents are active, explicitly state that.

---

### 5. File System Impact

Summarizes session-level modifications:

* Files created
* Files modified
* Files deleted (if any)
* Last change timestamp

Must reflect current session, not full git history (unless integrated).

---

### 6. Preview Runtime Status

Includes:

* Running state
* Bound port
* URL
* Health check result
* Uptime (if running)

If preview is not running:

```
⚠️ Preview server not active.
```

---

## Example Output

```
=== Project Status ===

📁 Project: my-ecommerce
📂 Path: C:/projects/my-ecommerce
🏷️ Template: nextjs-ecommerce
📊 Lifecycle: Active

🔧 Tech Stack:
   Frontend: Next.js
   Backend: API Routes
   Database: PostgreSQL
   Auth: Clerk
   Payments: Stripe

=== Features ===

✅ Implemented (5)
   • product-listing
   • cart
   • checkout
   • user-auth
   • order-history

🔄 In Progress (1)
   • dashboard-ui (60%)

⏳ Pending (2)
   • admin-panel
   • email-notifications

📄 Session File Impact
   Created: 73
   Modified: 12
   Deleted: 0
   Last Change: 2 minutes ago

=== Agent Board ===

✅ database-architect → Completed
✅ backend-specialist → Completed
🔄 frontend-specialist → Dashboard components (60%)
⏳ test-engineer → Waiting on frontend

=== Preview ===

🟢 Running
🌐 URL: http://localhost:3000
🔌 Port: 3000
💚 Health: OK
⏱️ Uptime: 6m 14s
```

---

## Failure & Edge Handling

| Condition                | Behavior                   |
| ------------------------ | -------------------------- |
| No active project        | Return explicit error      |
| Session not initialized  | Suggest `/init`            |
| Preview script missing   | Report configuration issue |
| Agent state inconsistent | Flag as warning            |

Example:

```
⚠️ Warning: Agent state mismatch detected.
Recommendation: Re-run `/status` after synchronization.
```

---

## Underlying Data Sources

Status aggregation must use:

```
python .agent/scripts/session_manager.py status
python .agent/scripts/auto_preview.py status
```

No direct filesystem inference unless required as fallback.

---

## Operational Principles

* Read-only command
* No side effects
* Deterministic output
* No hidden assumptions
* Fully transparent system state
* Clear distinction between session-level and project-level data