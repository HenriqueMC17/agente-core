---
description: Plan and implement UI
---

## description: AI-powered design intelligence engine with 50+ UI styles, 95+ color palettes, 57 typography pairings, 99 UX heuristics, and automated design system generation across 9+ stacks.

# ui-ux-pro-max — Design Intelligence & System Generator

Comprehensive UI/UX orchestration framework for web and mobile applications.

Includes:

* 50+ UI styles
* 97 color palettes
* 57 font pairings
* 99 UX best practices
* 25 chart archetypes
* 9+ supported technology stacks
* Priority-weighted recommendation engine
* Anti-pattern detection

Searchable knowledge base with reasoning-driven selection.

---

# System Requirements

## Verify Python Installation

```bash
python3 --version || python --version
```

If not installed:

### macOS

```bash
brew install python3
```

### Ubuntu / Debian

```bash
sudo apt update && sudo apt install python3
```

### Windows

```powershell
winget install Python.Python.3.12
```

---

# Core Workflow (Mandatory Sequence)

When the user requests:

* Design
* Build UI
* Create layout
* Improve UX
* Review interface
* Fix visual issues
* Implement design

Follow this deterministic workflow.

---

# Step 1 — Requirement Intelligence Extraction

Extract structured signals from the request:

### Product Type

Examples:

* SaaS
* E-commerce
* Landing page
* Dashboard
* Portfolio
* Healthcare app
* Fintech platform

### Style Keywords

Examples:

* Minimal
* Elegant
* Professional
* Brutalist
* Dark mode
* Glassmorphism
* Playful

### Industry

Examples:

* Healthcare
* Fintech
* Beauty
* Education
* Gaming
* Real estate

### Technology Stack

If unspecified → default to:

```
html-tailwind
```

---

# Step 2 — Design System Generation (REQUIRED)

Always begin with `--design-system`.

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<product> <industry> <keywords>" --design-system [-p "Project Name"]
```

## What This Does

* Parallel search across 5 domains:

  * product
  * style
  * color
  * landing
  * typography
* Applies reasoning engine (`ui-reasoning.csv`)
* Generates:

  * Layout pattern
  * UI style
  * Color system
  * Typography pairing
  * Effects system
  * Anti-pattern warnings

### Example

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "beauty spa wellness elegant" --design-system -p "Serenity Spa"
```

Output: Complete structured design system.

---

# Step 2b — Persist Design System (Hierarchical Memory)

Add:

```
--persist
```

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

Creates:

```
design-system/MASTER.md
design-system/pages/
```

## Page-Specific Override

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

Creates:

```
design-system/pages/dashboard.md
```

### Hierarchical Resolution Logic

1. Check `design-system/pages/{page}.md`
2. If exists → override MASTER
3. If not → use MASTER exclusively

This ensures global consistency with controlled deviation.

---

# Step 3 — Domain-Specific Deep Search (Optional)

Use targeted domain queries when refinement is needed.

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain>
```

### Domain Reference

| Domain     | Purpose                |
| ---------- | ---------------------- |
| product    | Product archetypes     |
| style      | UI style patterns      |
| typography | Font systems           |
| color      | Palette systems        |
| landing    | Page architecture      |
| chart      | Data visualization     |
| ux         | Interaction heuristics |
| react      | React performance      |
| web        | Web accessibility      |
| prompt     | AI prompt styles       |

### Example

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "glassmorphism dark fintech" --domain style
```

---

# Step 4 — Stack-Specific Implementation Guidance

Default stack:

```
html-tailwind
```

Override if user specifies.

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "responsive layout forms" --stack html-tailwind
```

## Supported Stacks

| Stack           | Focus                                    |
| --------------- | ---------------------------------------- |
| html-tailwind   | Utility-first, responsive, accessibility |
| react           | Hooks, state, rendering patterns         |
| nextjs          | SSR, routing, performance                |
| vue             | Composition API                          |
| svelte          | Stores, reactivity                       |
| swiftui         | iOS declarative UI                       |
| react-native    | Mobile components                        |
| flutter         | Widgets & theming                        |
| shadcn          | Component systems                        |
| jetpack-compose | Android declarative UI                   |

---

# Output Formats

Default: ASCII (terminal optimized)

Markdown:

```bash
-f markdown
```

Example:

```bash
python3 .agent/.shared/ui-ux-pro-max/scripts/search.py "fintech crypto dashboard" --design-system -f markdown
```

---

# Professional UI Quality Rules

## Icons

Do:

* Use SVG icon systems (Lucide, Heroicons, Simple Icons)
* Keep consistent viewBox (24x24)
* Verify brand logos from authoritative sources

Do Not:

* Use emojis as UI icons
* Mix inconsistent icon sizes
* Guess brand logo shapes

---

## Interaction Design

Do:

* Add `cursor-pointer` for clickable elements
* Use smooth transitions (150–300ms)
* Provide hover + focus states

Avoid:

* Layout shifts on hover
* Overuse of scale transforms
* Invisible interaction states

---

## Light Mode Contrast

Minimum standards:

* Body text: ≥ 4.5:1 contrast
* Avoid ultra-light grays
* Ensure borders visible in both modes
* Avoid excessive transparency in light UI

---

## Layout Discipline

* Consistent container width (`max-w-6xl` or `max-w-7xl`)
* Floating navbars require spacing from viewport edges
* Prevent content overlap with fixed elements
* No horizontal scroll on mobile

---

# Pre-Delivery Validation Checklist

## Visual

* [ ] No emoji icons
* [ ] Consistent icon library
* [ ] Verified brand assets
* [ ] No hover layout shift
* [ ] Theme tokens used directly

## Interaction

* [ ] All interactive elements have pointer cursor
* [ ] Hover feedback visible
* [ ] Focus states accessible
* [ ] Smooth transitions

## Accessibility

* [ ] Alt text present
* [ ] Labels for form fields
* [ ] Color not sole indicator
* [ ] Supports `prefers-reduced-motion`

## Responsive

Tested at:

* 375px
* 768px
* 1024px
* 1440px

---

# Optimization Guidelines

1. Use specific queries ("healthcare SaaS dashboard minimal")
2. Iterate with refined keywords
3. Combine domains for precision
4. Always run UX domain check before delivery
5. Persist design system for multi-page projects
6. Validate stack best practices before coding