---
description: Deployment command for production releases. Pre-flight checks and deployment execution.
---

# `/deploy` — Production Release Orchestration Protocol

`$ARGUMENTS`

---

## Objective

Execute a **controlled, auditable, and verifiable deployment process** with mandatory pre-flight validation, deterministic build execution, post-deploy health verification, and rollback safety.

Designed for:

* Production releases
* Staging/preview deployments
* Hotfix deployments
* Rollback operations

This command enforces operational discipline — not ad-hoc shipping.

---

## Sub-Commands

```
/deploy                 → Interactive release workflow
/deploy check           → Execute validation gates only
/deploy preview         → Deploy to staging/preview environment
/deploy production      → Deploy to production
/deploy rollback        → Revert to previous stable version
/deploy status          → Show current deployed version
```

Optional flags:

```
--skip-tests
--force
--dry-run
--version=x.y.z
```

---

## Release Governance Model

Deployment follows a gated pipeline:

1. Validation (quality + security + integrity)
2. Build (deterministic artifact generation)
3. Deploy (platform execution)
4. Verification (health & integrity)
5. Observability confirmation
6. Release confirmation or rollback

No deployment proceeds if validation gates fail (unless explicitly forced).

---

## Pre-Deployment Validation Gates

```markdown
## 🚀 Pre-Deployment Validation

### Code Integrity
- [ ] TypeScript clean (`tsc --noEmit`)
- [ ] Lint clean (`eslint .`)
- [ ] Unit tests passing
- [ ] Integration tests passing
- [ ] No TODO/FIXME in critical paths

### Security
- [ ] No hardcoded secrets
- [ ] Environment variables validated
- [ ] Dependencies audited
- [ ] No known high-severity vulnerabilities

### Performance
- [ ] Bundle size within threshold
- [ ] No debug logs in production build
- [ ] Static assets optimized
- [ ] Lazy loading validated (if applicable)

### Infrastructure
- [ ] Environment variables present in target
- [ ] Database migrations prepared
- [ ] Backward compatibility confirmed
- [ ] Feature flags configured

### Documentation
- [ ] CHANGELOG updated
- [ ] Version bumped
- [ ] API contract changes documented

Proceed with deployment? (y/n)
```

---

## Deployment Lifecycle

```
┌────────────────────┐
│ /deploy            │
└──────────┬─────────┘
           │
           ▼
┌────────────────────┐
│ Validation Gates   │
└──────────┬─────────┘
           │
       Fail? ──► Abort
           │
          Pass
           │
           ▼
┌────────────────────┐
│ Deterministic Build│
└──────────┬─────────┘
           │
           ▼
┌────────────────────┐
│ Deploy Artifact    │
└──────────┬─────────┘
           │
           ▼
┌────────────────────┐
│ Health Verification│
└──────────┬─────────┘
           │
           ▼
┌────────────────────┐
│ Observability Check│
└──────────┬─────────┘
           │
           ▼
┌────────────────────┐
│ ✅ Release Confirmed│
└────────────────────┘
```

---

## Post-Deployment Verification

After deployment:

* Validate HTTP status codes
* Confirm database connectivity
* Confirm migration integrity
* Verify background jobs
* Check logs for runtime errors
* Confirm metrics within normal range
* Validate critical user flows

If any check fails → initiate rollback.

---

## Output Format

### Successful Deployment

```markdown
## 🚀 Deployment Successful

### Release Summary
- **Version:** vX.Y.Z
- **Environment:** production
- **Commit SHA:** [hash]
- **Duration:** XX seconds
- **Platform:** [Platform Name]

### Deployment Artifacts
- Build ID:
- Container/Image Tag:
- Migration Applied:

### URLs
- Production:
- Monitoring Dashboard:
- Logs:

### Changes
- [Feature]
- [Bugfix]
- [Infra update]

### Health Verification
✅ API responding  
✅ Database connected  
✅ Background workers active  
✅ No critical errors in logs  

Release status: STABLE
```

---

### Failed Deployment

````markdown
## ❌ Deployment Failed

### Failure Stage
[Validation | Build | Deploy | Health Check]

### Error
[Primary error summary]

### Technical Details
```
[Error output]
```

### Immediate Actions
1. Fix identified issue
2. Re-run validation locally
3. Retry deployment

### Rollback Status
Previous stable version: vX.Y.Z  
Current environment status: SAFE (rollback available)
````

---

## Rollback Protocol

Triggered via:

```
/deploy rollback
```

Actions:

* Restore previous stable artifact
* Reapply previous environment config
* Revert database migration if necessary (safe only)
* Validate system health
* Confirm system stability

Rollback must be idempotent and auditable.

---

## Supported Deployment Targets

| Platform   | Command                | Notes                |
| ---------- | ---------------------- | -------------------- |
| Vercel     | `vercel --prod`        | Auto-detects Next.js |
| Railway    | `railway up`           | CLI required         |
| Fly.io     | `fly deploy`           | flyctl required      |
| Docker     | `docker compose up -d` | Self-hosted          |
| Kubernetes | `kubectl apply`        | Cluster-based infra  |

---

## Usage Examples

```
/deploy
/deploy check
/deploy preview
/deploy production
/deploy production --version=1.4.0
/deploy rollback
/deploy status
```

---

## Operational Principles

* No blind deploys.
* Every release must be traceable.
* Every failure must be diagnosable.
* Every rollback must be safe.
* Zero silent degradation.
* Prefer small, frequent releases over large risky drops.