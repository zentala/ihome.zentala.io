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

## Runbook Protocol

**Create daily runbook:** `.claude/runbook/YYYY/MM/DD.md`

- **ONE runbook per day** (not per task)
- Document all work done during the session
- Update the same file throughout the day
- Include: problems, solutions, commands, files changed, commits
- Add learnings and "Next Session TODO"
- Only create separate task-specific docs if explicitly requested

**Format:** See `.claude/runbook/2025/10/18.md` for template
