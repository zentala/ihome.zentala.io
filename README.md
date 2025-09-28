# Intelligent Home Portal Project Documentation

## Overview

This blog details my journey of transforming a 50m² apartment into a smart home using Bone.IO, a Polish smart home system. It covers the features implemented, preparations for integrating smart home technologies, and insights gained throughout the process. The aim is to guide others on their smart home adventures, discussing various topics from interior design projects, electrical choices, to selecting controllers, designing modern interiors, IoT design, components used, and considerations for apartment design, including recommended materials and their summaries.

## Technologies Used

Since the project transitioned from Jekyll to Hugo, here's an updated list of technologies:

| Category | Technology |
|---|---|
| Repo Conf | ![EditorConfig](https://img.shields.io/badge/-EditorConfig-FEFEFE?logo=editorconfig&logoColor=black) ![gitignore.io](https://img.shields.io/badge/-gitignore.io-204ECF?logo=gitignoredotio&logoColor=white) |
| Front-end     | ![Hugo](https://img.shields.io/badge/-Hugo-FF4088?logo=hugo&logoColor=white) ![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?logo=bootstrap&logoColor=white) ![SCSS](https://img.shields.io/badge/-SCSS-CC6699?logo=sass&logoColor=white) &nbsp;  |
| DevOps        | ![GitHub Pages](https://img.shields.io/badge/-GitHubPages-222222?logo=githubpages&logoColor=white) ![SonarCloud](https://img.shields.io/badge/-SonarCloud-F3702A?logo=sonarcloud&logoColor=white) |
| Marketing     | ![Google Analytics](https://img.shields.io/badge/-GoogleAnalytics-4285F4?logo=googleanalytics&logoColor=white) ![Google AdSense](https://img.shields.io/badge/-GoogleAdSense-E37400?logo=googleadsense&logoColor=white) |
| IDE | ![Visual Studio Code](https://img.shields.io/badge/-VisualStudioCode-007ACC?logo=visualstudiocode&logoColor=white)                     |

Build with [Hugo](https://gohugo.io/), [Hays](https://gethyas.com/) and [Doks](https://getdoks.org/) theme.

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
