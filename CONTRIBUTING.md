# Contributing to Intelligent Home Portal

Thank you for your interest in contributing to this project! This guide will help you set up your development environment and understand the development workflow.

## AI-Assisted Development

This project includes configuration for AI development tools to enhance your workflow.

### Claude Code
**Primary use:** Development, deployment, build troubleshooting, git operations

- **Configuration:** `.claude/CLAUDE.md`
- **What's configured:**
  - Package manager preference (pnpm)
  - Hugo + Hyas + Doks stack
  - Development commands
  - CI/CD with GitHub Actions
- **Best for:**
  - Running dev server and builds
  - Fixing CI/CD pipeline issues
  - Git commits and deployment
  - Hugo configuration and debugging

### Cursor IDE
**Primary use:** Content creation, blog writing, documentation

- **Configuration:** `.cursor/rules/*.mdc`
  - `always.mdc` - Tech stack, refactoring guidelines, SEO focus
  - `content.mdc` - Blog structure and content strategy
  - `editor.mdc` - Editor-specific rules
  - `new.entry.mdc` - New blog post templates
- **Best for:**
  - Writing blog posts in Polish
  - Creating tutorials and theory docs
  - Content translation
  - SEO optimization and interlinking

### VS Code (Traditional)
**For:** Manual editing, quick fixes

- Tasks: `.vscode/tasks.json`
- Cross-platform install scripts: `.vscode/scripts/`

### Recommended Workflow

| Task | Tool | Why |
|------|------|-----|
| Write new blog post | Cursor | AI composer + content rules |
| Fix build errors | Claude Code | CLI workflow, debugging |
| Deploy to production | Claude Code | Git + CI/CD handling |
| Quick markdown edit | VS Code | Lightweight |
| Create tutorial | Cursor | Content structure knowledge |
| Refactor Hugo templates | Claude Code | Tech stack context |

## Requirements

- Node.js >= 18.14.1
- pnpm >= 8.10.0 (recommended) or latest npm
- Hugo 0.121.1 Extended — installed automatically during postinstall
  - Alternatively: the install scripts will attempt to install Hugo system-wide if it's missing

## Quick Start

### Option A: VS Code Tasks (recommended)
- Open Command Palette (Ctrl+Shift+P) → "Tasks: Run Task" → choose:
  - "Start Development Server" (automatically runs "Install Dependencies (if needed)" first)
  - or "Start Development Server with Drafts"

### Option B: Terminal (CLI)
- Linux/macOS:
```
./.vscode/scripts/install.sh
pnpm run dev
```

- Windows (PowerShell):
```
.\.vscode\scripts\install.ps1
pnpm run dev
```

## Local Development

1. **Install Hugo**: Hugo installs automatically during `postinstall` or via our `install.*` scripts. For manual installation, see [Hugo Releases](https://github.com/gohugoio/hugo/releases).

2. **Clone the Repository**: Clone the `ihome.zentala.io` project repository from GitHub to your local machine using the following command:

   ```
   git clone https://github.com/zentala/ihome.zentala.io.git
   ```

3. **Navigate to the Project Directory**:

   ```
   cd ihome.zentala.io
   ```

4. **Install dependencies**:

```
pnpm install
```

5. **Start the dev server**:

   Run the following command to start the Hugo server:

```
pnpm run dev
```

6. **Access Your Site**: By default, the Hugo server runs at `http://localhost:1313/`. Open this URL in your browser to view your site.


## Available Commands

```
# Development
pnpm run dev              # Start dev server
pnpm run dev:drafts       # Dev server with drafts (content)

# Building
pnpm run build            # Production build
pnpm run preview          # Preview built site

# Content
pnpm run create           # Create new content

# Quality
pnpm run lint             # Lint all (JS, SCSS, MD)

# Utilities
pnpm run clean            # Clean build & caches
pnpm run info             # Package info & Hugo version
```
Note: you can use `npm` instead of `pnpm`, but this repository is configured for `pnpm`.

## VS Code Tasks

Tasks available (Ctrl+Shift+P → "Tasks: Run Task"):
- Start Development Server (runs Install Dependencies first if needed)
- Install Dependencies (cross‑platform; `.vscode/scripts/install.*`)
- Build Production
- Lint All
- Create New Content
- Preview Production Build

## Troubleshooting

- "Module not found" or dependency issues:
  - Run: `pnpm run clean:install` then `pnpm install`
- Port already in use (1313):
  - Change Hugo port or stop the process occupying it
- Hugo not found:
  - Run: "Install Dependencies" (task) or the appropriate script: `./.vscode/scripts/install.sh` (Linux/macOS) or `.\\.vscode\\scripts\\install.ps1` (Windows)

## Useful Links

- Hugo Documentation: https://gohugo.io/documentation/
- Markdown Guide: https://www.markdownguide.org/
- SCSS Documentation: https://sass-lang.com/documentation/

## Deployment

Deployment to GitHub Pages with [Deploy GitHub Action](.github/workflows/deploy.yml)
