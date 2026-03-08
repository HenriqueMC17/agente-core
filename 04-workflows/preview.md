---
description: Preview server start, stop, and status check. Local development server management.
---

# `/preview` — Preview Environment Orchestration

`$ARGUMENTS`

---

## Objective

Control and monitor the local preview environment used for application validation.

This command manages:

* Server lifecycle (start/stop/restart)
* Runtime health checks
* Port allocation conflicts
* Environment visibility (URL, framework, status)

The preview layer must be deterministic, observable, and failure-aware.

---

## Supported Commands

| Command            | Description                 |
| ------------------ | --------------------------- |
| `/preview`         | Show current preview status |
| `/preview start`   | Start preview server        |
| `/preview stop`    | Stop preview server         |
| `/preview restart` | Restart preview server      |
| `/preview check`   | Run health diagnostics      |

---

## Execution Behavior

### 1. `/preview`

Returns structured runtime state:

```
=== Preview Status ===

🌐 URL: http://localhost:3000
📁 Project Path: C:/projects/my-app
🏷️ Framework: Next.js
🔌 Port: 3000
🟢 Process: Running
💚 Health: OK
⏱️ Uptime: 4m 32s
```

If not running:

```
⚠️ Preview is not running.
```

---

### 2. `/preview start`

Responsibilities:

* Detect project type (Next.js, Vite, Express, etc.)
* Detect configured default port
* Validate port availability
* Spawn preview process
* Verify readiness (health probe)

#### Successful Start

```
🚀 Starting preview...
   Framework: Next.js
   Port: 3000

🔍 Performing health check...

✅ Preview ready!
   URL: http://localhost:3000
```

---

### 3. Port Conflict Handling

If default port is already in use:

```
⚠️ Port 3000 is currently in use.

Resolution options:
1. Start on port 3001 (recommended)
2. Terminate process using 3000
3. Manually specify a different port

Select option (default: 1):
```

Behavior rules:

* Never silently kill processes.
* Always confirm destructive actions.
* Automatically increment port if option 1 is selected.
* Persist selected port for session continuity.

---

### 4. `/preview stop`

Gracefully terminate:

* Kill preview process
* Free port
* Clear session metadata

Response:

```
🛑 Stopping preview server...
✅ Preview stopped successfully.
```

If already stopped:

```
ℹ️ Preview is not currently running.
```

---

### 5. `/preview restart`

Execution order:

1. Stop (graceful)
2. Validate port
3. Start
4. Health check

Response:

```
🔄 Restarting preview...

🛑 Stopped.
🚀 Started.
💚 Health: OK

🌐 URL: http://localhost:3000
```

---

### 6. `/preview check`

Performs diagnostics without altering state:

* Process running check
* Port binding check
* HTTP health probe
* Framework detection consistency

Example:

```
=== Preview Diagnostics ===

Process: Running
Port: 3000 (open)
HTTP Response: 200 OK
Framework Match: Confirmed

💚 System healthy.
```

If unhealthy:

```
⚠️ Health check failed.
- HTTP response timeout
- Process exists but not responding

Suggested action: `/preview restart`
```

---

## Underlying Technical Execution

All lifecycle operations are delegated to:

```bash
python .agent/scripts/auto_preview.py start [port]
python .agent/scripts/auto_preview.py stop
python .agent/scripts/auto_preview.py status
```

### Operational Guarantees

* Single active preview instance per project
* Session-aware port memory
* No orphaned processes
* Health verification before reporting “ready”

---

## Failure Handling Policy

| Scenario             | Action                           |
| -------------------- | -------------------------------- |
| Port in use          | Offer resolution options         |
| Process zombie       | Force cleanup after confirmation |
| Health check fails   | Recommend restart                |
| Framework undetected | Abort with diagnostic message    |
| Script missing       | Report configuration error       |

---

## Design Principles

* No silent failures
* No destructive defaults
* Full state transparency
* Explicit runtime feedback
* Deterministic responses