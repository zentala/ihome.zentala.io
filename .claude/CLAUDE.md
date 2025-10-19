# Project-Specific Instructions for Claude Code

## Package Manager

**This project uses pnpm exclusively.**

- Always use `pnpm` commands instead of `npm`
- Lock file: `pnpm-lock.yaml` (NOT `package-lock.json`)
- Install: `pnpm install`
- Run scripts: `pnpm run <script>`

## Technology Stack

- **Static Site Generator**: Hugo 0.121.1 Extended
- **Theme**: Hyas + Doks
- **Package Manager**: pnpm 8.12.0+
- **Node.js**: 18.14.1+
- **CI/CD**: GitHub Actions (GitHub Pages deployment)

## Development Commands

```bash
pnpm install          # Install dependencies
pnpm run dev          # Start dev server
pnpm run dev:drafts   # Dev server with drafts
pnpm run build        # Production build
pnpm run lint         # Lint all (JS, SCSS, MD)
```

## Important Notes

1. Hugo is installed automatically via `postinstall` script using `hugo-installer`
2. Icons are generated automatically before each build
3. The project is configured for Windows (PowerShell) and Linux/macOS (bash)
4. Always commit `pnpm-lock.yaml` after dependency changes

## Content Structure & VS Code Tasks

**Blog categories:** `flat`, `instalacja`, `interior-design`, `wyposarzenie`
**Docs categories:** `actuators`, `cables`, `concepts`, `connectors`, `drivers`, `electrical-elements`, `electrical-installation`, `electrical-practice`, `electricity-theory`, `interfaces`, `interior-design`, `leds`, `micro-controllers`, `networks`, `sensors`, `software`, `systems`

**Important:** When adding/removing content categories (blog or docs subdirectories):
1. Update `.vscode/tasks.json` → inputs section → options array
2. Keep category lists in sync with actual folder structure
3. Test tasks work correctly after changes

**VS Code Tasks:**
- `Ctrl+Shift+P` → "Create New Blog Post" (dropdown category selection)
- `Ctrl+Shift+P` → "Create New Tutorial" (page bundle with index.md)
- `Ctrl+Shift+P` → "Create New Documentation" (dropdown category selection)

## Specs & Tasks Protocol

**IMPORTANT: ALL specs and tasks MUST have numbers.**

**Naming convention:**
- **Specs:** `.claude/specs/NNN-feature-name.md` (technical specification)
- **Future:** `.claude/specs/NNN-feature-name.FUTURE.md` (enhancements backlog)
- **Tasks:** `.claude/tasks/NNN-FEATURE_NAME.md` (implementation roadmap)
- **ADRs:** `.claude/adrs/NNN-decision-name.md` (architecture decisions)

**Numbering:**
- NNN = sequential number (001, 002, 003, etc.)
- Numbers are GLOBAL across specs, tasks, and ADRs
- Number does NOT indicate priority or execution order
- Number is for reference and tracking only
- Always use 3 digits with leading zeros (001, not 1)

**Name formats:**
- Specs: kebab-case (e.g., `001-glossary-tooltips.md`)
- Tasks: SCREAMING_SNAKE_CASE (e.g., `001-GLOSSARY_TOOLTIPS.md`)
- ADRs: kebab-case (e.g., `001-multilingual-url-structure.md`)

**Examples:**
- `.claude/specs/001-glossary-tooltips.md`
- `.claude/specs/001-glossary-tooltips.FUTURE.md`
- `.claude/tasks/001-GLOSSARY_TOOLTIPS.md`
- `.claude/adrs/001-multilingual-url-structure.md`
- `.claude/tasks/002-CONTENT_AUDIT.md`
- `.claude/specs/003-dictionary-redesign.md`

**Current numbering (as of 2025-10-19):**
```
001 - Glossary Tooltips (spec + task)
002 - Content Audit (task)
003 - Dictionary Redesign (spec)
004 - Quick Production Patch (task)
005 - I18n URL Migration (task)
006 - Fix 404 Errors (task)
007 - Auto Detect Indexed Pages (task, backlog)
```

**Spec structure:**
- Problem statement
- Technical architecture
- Implementation details
- Testing strategy
- Dependencies & constraints

**Task structure:**
- Phases breakdown
- Concrete action items
- Acceptance criteria
- Estimated complexity

## Runbook Protocol

**Create daily runbook:** `.claude/runbooks/YYYY-MM-DD.md`

- **ONE runbook per day** (not per task)
- Document all work done during the session
- Update the same file throughout the day
- Include: problems, solutions, commands, files changed, commits
- Add learnings and "Next Session TODO"
- Only create separate task-specific docs if explicitly requested
- Use flat structure (no subfolders): `2025-10-18.md`, `2025-10-19.md`, etc.

**Format:** See `.claude/runbooks/2025-10-18.md` for template

## Project Status Protocol

**ALWAYS refer to `STATUS.md` for current project state.**

- **Current Status:** See `STATUS.md` (single source of truth)
- **Critical Issues:** Listed in STATUS.md with severity levels
- **Task Execution Order:** STATUS.md shows priority queue
- **Known Issues:** All catalogued in STATUS.md
- **Next Steps:** STATUS.md lists immediate actions

**When to update STATUS.md:**
- After discovering new critical issues
- After completing major tasks
- After making architectural decisions (ADRs)
- When project state changes significantly
- At end of each session (summary)

**What belongs in CLAUDE.md vs STATUS.md:**
- **CLAUDE.md:** Instructions for AI agent (how to work)
- **STATUS.md:** Current project state (what needs work)

---

## Testing Architecture

### Smoke Tests (Implemented ✅)

**Spec:** `.claude/specs/002-smoke-tests.md`
**Architecture:** `.claude/specs/000-testing-architecture.md`

**Status:** 9 tests implemented (6 FAIL, 3 PASS)
- ✅ Implemented Playwright framework
- ✅ Created 3 test files, 9 tests total
- ✅ Tests correctly detect production issues
- ⏸️ Tests will pass after i18n migration

**See:** `STATUS.md` for current test results
