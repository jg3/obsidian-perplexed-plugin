![Obsidian Perplexed: AI Research, Grounded Citations, and Workflows](https://i.imgur.com/MVOK3rk.png)

# Obsidian Perplexed

[![Release](https://img.shields.io/github/v/release/jg3/obsidian-perplexed-plugin?style=flat-square&color=blue)](https://github.com/jg3/obsidian-perplexed-plugin/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Obsidian Plugin](https://img.shields.io/badge/Obsidian-Plugin-purple?style=flat-square&logo=obsidian)](https://obsidian.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![AI Providers](https://img.shields.io/badge/AI_Providers-Perplexity_|_Claude_|_Gemini_|_Vane_|_LM_Studio-orange?style=flat-square)](https://www.perplexity.ai/)

**Obsidian Perplexed** is an advanced AI research and workflow engine for Obsidian. It delivers real-time, source-grounded answers with verifiable citations directly into your notes—powered by [Perplexity](https://www.perplexity.ai/), [Google Gemini](https://ai.google.dev/) (with live Google Search grounding), [Anthropic Claude](https://www.anthropic.com/), self-hosted [Perplexica / Vane](https://github.com/ItzCrazyKns/Vane), and offline local LLMs via [LM Studio](https://lmstudio.ai/).

Beyond simple prompt responses, Obsidian Perplexed brings structured editorial intelligence to your knowledge base: **11 stored review workflows** for fact-checking, rewriting, and design audits; **custom process capturing**; **batch directory-based note templating**; and automated **local Git commit tracking**.

---

> [!NOTE]
> ### ℹ️ Fork Notice & Evolution
> **Obsidian Perplexed** is an actively developed fork of [The Lossless Group's `perplexed-plugin`](https://github.com/lossless-group/perplexed-plugin).
>
> **What sets this fork apart:**
> 1. **The Dotfile Vault Storage Convention (`.obsidian-perplexed/`)**: Auxiliary assets (workflows, templates, partials, and preambles) are stored in hidden dot-directories by default. They will not clutter your Obsidian file explorer, search results, or graph view.
> 2. **11 General Review & Editing Workflows**: Replaced niche venture/equities research templates with eleven practical review instructions (`Run stored workflow`) for everyday drafting, fact-checking, security critiques, and executive rewrites.
> 3. **Capture a Process**: Create new stored workflows interactively from plain-language descriptions without touching filesystem files manually.
> 4. **Local Git Tracking Integration**: Native hooks with [Obsidian Git](https://github.com/Vinzent03/obsidian-git) to remind or commit vault modifications locally after AI generation (with remote pushes strictly opt-in).
> 5. **Robust FileSystem Adapter Runtime**: Reads and writes through Obsidian's low-level data adapter, ensuring full compatibility with hidden folders, symlinked vaults, and multi-vault setups.

---

## 📋 Table of Contents

- [🚀 How to Install](#-how-to-install)
  - [Method 1: Manual Installation (Recommended)](#method-1-manual-installation-recommended)
  - [Method 2: Using the BRAT Community Plugin](#method-2-using-the-brat-community-plugin)
  - [Method 3: Local Development Symlink](#method-3-local-development-symlink)
- [📖 How to Use](#-how-to-use)
  - [1. Running Stored Review Workflows](#1-running-stored-review-workflows)
  - [2. Capturing a New Process as a Workflow](#2-capturing-a-new-process-as-a-workflow)
  - [3. Interactive Research Queries with Grounded Citations](#3-interactive-research-queries-with-grounded-citations)
  - [4. Text Enhancement & Inline Visuals](#4-text-enhancement--inline-visuals)
  - [5. Automated Directory Templates](#5-automated-directory-templates)
  - [6. Local Vault Git Tracking](#6-local-vault-git-tracking)
- [📁 The Dotfile Vault Convention](#-the-dotfile-vault-convention)
- [⚙️ Initial Setup & Provider Configuration](#️-initial-setup--provider-configuration)
  - [Perplexity Setup](#1-perplexity-setup-recommended)
  - [Google Gemini Setup](#2-google-gemini-setup-free-tier-available)
  - [Anthropic Claude Setup](#3-anthropic-claude-setup)
  - [Perplexica / Vane Setup (Self-Hosted)](#4-perplexica--vane-setup-self-hosted)
  - [LM Studio Setup (Offline Local LLMs)](#5-lm-studio-setup-offline-local-llms)
- [🔒 Network, Accounts & Security Disclosures](#-network-accounts--security-disclosures)
- [🛠️ Developer Guide](#️-developer-guide)
- [⚖️ License & Acknowledgements](#️-license--acknowledgements)

---

## 🚀 How to Install

Because Obsidian Perplexed is maintained outside the official public Obsidian Community Plugins directory, you install it manually, via the BRAT community plugin, or via a development symlink.

### Method 1: Manual Installation (Recommended)

1. Navigate to the [Releases](https://github.com/jg3/obsidian-perplexed-plugin/releases) page of this repository.
2. Download the latest release assets: `main.js`, `manifest.json`, and `styles.css`.
3. In your file manager, navigate to your Obsidian vault folder and open the hidden `.obsidian/plugins/` directory:
   - macOS / Linux: `/<path-to-vault>/.obsidian/plugins/`
   - Windows: `C:\<path-to-vault>\.obsidian\plugins\`
4. Create a new folder named `obsidian-perplexed`.
5. Place `main.js`, `manifest.json`, and `styles.css` into that `obsidian-perplexed` folder:
   ```text
   <Your-Vault>/
   └── .obsidian/
       └── plugins/
           └── obsidian-perplexed/
               ├── main.js
               ├── manifest.json
               └── styles.css
   ```
6. In Obsidian, open **Settings** (`Cmd/Ctrl + ,`) → **Community plugins**.
7. Ensure **Restricted mode** is turned **off**, click **Reload plugins**, and toggle **Perplexed** on.

### Method 2: Using the BRAT Community Plugin

If you use [Obsidian42 - BRAT](https://github.com/TfTHacker/obsidian42-brat) to manage beta/unlisted plugins:

1. Install and enable the **BRAT** plugin from Obsidian's official Community Plugins directory.
2. Open the Command Palette (`Cmd/Ctrl + P`) and run:  
   `BRAT: Add a beta plugin for testing`
3. Enter the repository URL:
   ```text
   https://github.com/jg3/obsidian-perplexed-plugin
   ```
4. Click **Add Plugin**. BRAT downloads the latest release, installs it to `.obsidian/plugins/obsidian-perplexed`, and enables it automatically. Future updates will be tracked through BRAT.

### Method 3: Local Development Symlink

If you build from source or contribute changes:

```bash
# 1. Clone the repository
git clone https://github.com/jg3/obsidian-perplexed-plugin.git
cd obsidian-perplexed-plugin

# 2. Install dependencies and compile
pnpm install
pnpm run build

# 3. Create a symlink in your vault's plugins folder
# On macOS / Linux:
ln -s "$(pwd)" "/path/to/your/vault/.obsidian/plugins/obsidian-perplexed"

# On Windows (PowerShell running as Administrator):
New-Item -ItemType SymbolicLink -Path "C:\path\to\vault\.obsidian\plugins\obsidian-perplexed" -Target "C:\path\to\obsidian-perplexed-plugin"
```

Then reload Obsidian and enable **Perplexed** in Community Plugins.

---

## 📖 How to Use

![Perplexed Modal Interface](https://i.imgur.com/jaZ4UfS.png)

### 1. Running Stored Review Workflows

Stored workflows allow you to review, fact-check, critique, or rewrite existing note content using Perplexity without copying and pasting into a browser.

1. Open any note in Obsidian.
2. Highlight a passage of text. *(If no text is selected, the workflow runs against the entire active note.)*
3. Open the Command Palette (`Cmd/Ctrl + P`) and run **`Perplexed: Run stored workflow`**.
4. Select one of the 11 shipped workflows:

| Workflow | Behavior | Citation Mode |
|---|---|---|
| **Fact-check** | Verifies statements against authoritative sources and adds citations. | Citations enabled (recency: month) |
| **Time-sensitive fact-check** | Validates recent or rapidly changing claims against primary documentation. | Citations enabled (recency: month) |
| **Unclear claims** | Highlights missing evidence, ambiguities, and unsubstantiated assertions. | Review analysis |
| **Contradictions** | Flags internal inconsistencies, vague terminology, and conflicting statements. | Review analysis |
| **Security claims** | Audits imprecise security claims, unstated trust assumptions, and missing controls. | Actionable review |
| **Design review questions** | Generates probing architectural review questions for a technical design doc. | Technical review |
| **Network-security design review** | Probes network architectures for undefined boundaries, protocol gaps, and trust assumptions. | Technical review |
| **Tighter executive version** | Distills content into a tight summary while strictly preserving factual meaning. | Prose synthesis |
| **Executive rewrite** | Rewrites prose for an executive audience: concise, direct, and technically accurate. | Prose synthesis |
| **Customer-facing explanation** | Adapts technical mechanics into clear customer communication without overselling. | Prose synthesis |
| **Capture a process** | Interactive prompt to synthesize and save a new workflow file (see below). | Workflow creation |

The generated analysis or rewrite streams in and appends cleanly below the selected text or at the end of the note.

---

### 2. Capturing a New Process as a Workflow

You can turn any editorial policy, code review standard, or audit heuristic into a permanent stored workflow:

1. Open the Command Palette and run **`Perplexed: Capture a process`** (or select **Capture a process** in the workflow picker).
2. Enter a description of your checking, editing, or evaluation rules in natural language.
   *Example: "Review this API specification for missing idempotency keys, unhandled error responses, and lack of rate-limiting parameters."*
3. Obsidian Perplexed prompts Perplexity to synthesize an optimized Markdown workflow containing frontmatter (`title`, `description`, `model`, `return-citations`) and system instructions.
4. The workflow is automatically saved into `.obsidian-perplexed/workflows/<slug>.md`. It will never overwrite an existing file (collisions receive a numeric suffix).
5. The new workflow immediately appears in your **Run stored workflow** picker.

---

### 3. Interactive Research Queries with Grounded Citations

Run interactive research queries directly from the editor palette:

* **`Perplexed: Ask Perplexity`**: Grounded web research using Perplexity's `sonar-pro`, `sonar-small`, or exhaustive `sonar-deep-research`. Supports domain and time-recency filters (`day`, `week`, `month`, `year`).
* **`Perplexed: Ask Gemini`**: Google Search grounding via `gemini-flash-latest` or `gemini-pro-latest`. Provides sentence-level citation mapping and resolves redirect URLs to durable destination links.
* **`Perplexed: Ask Claude`**: Reasoning and synthesis via Anthropic Claude (`claude-3-7-sonnet-latest`) with server-side web search.
* **`Perplexed: Ask Perplexica / Vane`**: Queries your self-hosted local instance with selectable focus modes (`webSearch`, `academicSearch`, `writingAssistant`, `youtubeSearch`).
* **`Perplexed: Ask LM Studio`**: Runs prompts against any local model running on your machine via LM Studio's OpenAI-compatible server (`http://localhost:1234`).

#### Citations Format
Responses include verifiable citations formatted cleanly for Obsidian:
```markdown
### Citations

[1]: [Governance, Risk, and Compliance: Principles and Practice](https://example.com/grc-guide)
> "GRC frameworks align IT operations with organizational governance and compliance mandates."

[2]: [NIST SP 800-53 Rev. 5 Security Controls](https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final)
```

---

### 4. Text Enhancement & Inline Visuals

Highlight text in your editor and run:
* **`Perplexed: Enhance selected text with Perplexity`**: Refines clarity, elaborates on core ideas, or fixes structure, with options to replace the selection or insert below.
* **`Perplexed: Enhance selected text with images via Perplexity`**: Finds relevant web images illustrating concepts in your text and inserts markdown image embeds.

---

### 5. Automated Directory Templates

For vaults maintaining hundreds of structured entries (e.g., technical definitions, concept encyclopedias, tooling reviews):

1. **Templates** live in `.obsidian-perplexed/templates/` and specify an `applies-to-paths` glob in frontmatter along with a fenced `cft` YAML config block.
2. Open an active note and run **`Perplexed: Apply directory template to current file`** (matches automatically by path).
3. Or run **`Perplexed: Apply directory template to folder`** to batch-process a collection of files with a confirmation summary.
4. **Shared Partials & Preambles**:
   - Write reusable guidance in `.obsidian-perplexed/partials/` and splice it into any template via `{{include: partial-name}}` (cycle and depth protected).
   - Global preambles in `.obsidian-perplexed/preambles/` (such as `inline-citation.md` or `mermaid-discipline.md`) auto-attach to requests.

Four general research profiles are seeded by default:
- `concept-profile.md` (targets `concepts/**`)
- `vocabulary-profile.md` (targets `Vocabulary/**`)
- `source-profile.md` (targets `Sources/**`)
- `toolkit-profile.md` (targets `Tooling/**`)

---

### 6. Local Vault Git Tracking

Keep an effortless audit trail of AI generations:
* Whenever a stored workflow, process capture, or directory template writes to your vault, the plugin can automatically invoke [Obsidian Git](https://github.com/Vinzent03/obsidian-git).
* Configure **Settings → Vault Git**:
  - `Remind`: Displays an unobtrusive notice reminding you to commit.
  - `Commit locally`: Automatically executes `obsidian-git:commit` to record changes in your local git history.
  - `Off`: Disables tracking notices.
* **Remote push is disabled by default** (`vaultGitPush: false`) ensuring nothing leaves your machine unless you explicitly turn on remote syncing.

---

## 📁 The Dotfile Vault Convention

To keep your Obsidian workspace pristine, Obsidian Perplexed stores its templates, workflows, partials, and preambles in a hidden directory at the root of your vault:

```text
<Your-Vault-Root>/
├── .obsidian-perplexed/          <-- Hidden dot-folder (keeps file explorer clean)
│   ├── workflows/                <-- 11 shipped review workflows + captured processes
│   │   ├── unclear-claims.md
│   │   ├── fact-check.md
│   │   ├── executive-rewrite.md
│   │   └── ...
│   ├── templates/                <-- Directory templates (concept, vocabulary, etc.)
│   ├── partials/                 <-- Reusable snippets (mermaid-discipline, etc.)
│   └── preambles/                <-- Auto-attached system/user prompts
│
├── concepts/                     <-- Your real vault notes
├── projects/
└── daily/
```

### Why the Dotfile Convention Matters
* **No File Tree Clutter**: Obsidian's File Explorer, Quick Switcher, Graph View, and note search automatically ignore folders starting with a period (`.`). Your navigation pane stays focused solely on your personal knowledge notes.
* **Safe Seeding**: On first run, default workflows and templates are automatically created. The seeder is idempotent: it never overwrites existing templates or workflows that you have customized.
* **Re-seeding Missing Files**: The **Re-seed templates** button in settings will restore any missing default files without touching your customized edits.
* **Customizable Roots**: If you prefer these files to be visible in your Obsidian file explorer, simply change the paths in **Settings → Directory templates / Stored workflows** (e.g., to `obsidian-perplexed/workflows` or `templates/workflows`).

---

## ⚙️ Initial Setup & Provider Configuration

### 1. Perplexity Setup (Recommended)
1. Sign up at [Perplexity AI](https://www.perplexity.ai/) and generate an API key under API Settings.
2. In Obsidian: **Settings → Perplexed → Perplexity**.
3. Paste your API key. Default endpoint: `https://api.perplexity.ai/chat/completions`.
4. Recommended model: `sonar-pro` (or `sonar-deep-research` for comprehensive reports).

### 2. Google Gemini Setup (Free Tier Available)
1. Get a free API key at [Google AI Studio](https://aistudio.google.com/apikey) (no credit card required).
2. In Obsidian: **Settings → Perplexed → Gemini (Google)**.
3. Paste your API key. Recommended default model: `gemini-flash-latest`.
4. Leave **Enable Google search grounding** and **Resolve citation urls** enabled for source-verified responses.

### 3. Anthropic Claude Setup
1. Generate an API key at the [Anthropic Console](https://console.anthropic.com/).
2. In Obsidian: **Settings → Perplexed → Anthropic (Claude)**.
3. Paste your API key. Default model: `claude-3-7-sonnet-latest`.

### 4. Perplexica / Vane Setup (Self-Hosted)
[Vane (formerly Perplexica)](https://github.com/ItzCrazyKns/Vane) is an open-source, local AI search engine.
1. Run Vane locally via Docker (default port `3030`).
2. In Obsidian: **Settings → Perplexed → Perplexica / Vane**.
3. Verify endpoint URL: `http://localhost:3030/api/search`.

### 5. LM Studio Setup (Offline Local LLMs)
Run open-source models (Llama, Mistral, Qwen, DeepSeek) completely offline with zero data leaving your machine.
1. Download and run [LM Studio](https://lmstudio.ai/).
2. Load your model of choice and start the local server (default port `1234`).
3. In Obsidian: **Settings → Perplexed → LM Studio**.
4. Set endpoint to `http://localhost:1234/v1/chat/completions`.

---

## 🔒 Network, Accounts & Security Disclosures

Obsidian Perplexed connects to external services **strictly when you explicitly invoke an AI command**. Nothing is transmitted in the background.

| Provider | Endpoint | Auth | Notes |
|---|---|---|---|
| **Perplexity** | `https://api.perplexity.ai/chat/completions` | API key (paid) | Streams responses with web citations. |
| **Google Gemini** | `https://generativelanguage.googleapis.com/` | API key (free tier available) | Search-grounded queries; resolves grounding redirect URLs via Obsidian `requestUrl`. |
| **Anthropic Claude** | `https://api.anthropic.com/v1/messages` | API key (paid) | Server-side web search grounding. |
| **Perplexica / Vane** | `http://localhost:3030/api/search` | None | Completely self-hosted; runs on local machine. |
| **LM Studio** | `http://localhost:1234/v1/chat/completions` | None | Completely local and offline. |

* **Zero Telemetry**: This plugin does not collect analytics, logs, or user telemetry.
* **Local Storage**: API keys and configurations are stored in your vault's private `.obsidian/plugins/obsidian-perplexed/data.json` file on disk. Never commit `data.json` to public version control.

---

## 🛠️ Developer Guide

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [pnpm](https://pnpm.io/) (v9 or v10 recommended)

### Build Commands
```bash
# Install dependencies
pnpm install

# Typecheck and production bundle
pnpm run build

# Development build with live watcher
pnpm run dev

# Code linting with obsidianmd rules
pnpm run lint
```

### Architecture Overview
```text
obsidian-perplexed-plugin/
├── main.ts                       # Entrypoint, command registration, and settings UI
├── manifest.json                 # Plugin ID (obsidian-perplexed) and metadata
├── esbuild.config.mjs            # esbuild bundler configuration
│
├── src/
│   ├── modals/                   # Obsidian Suggest and Prompt Modals
│   │   ├── WorkflowPickerModal.ts
│   │   ├── CaptureProcessModal.ts
│   │   ├── DirectoryTemplateRunModal.ts
│   │   └── Provider modals (Perplexity, Gemini, Claude, etc.)
│   │
│   ├── services/                 # Core engine services
│   │   ├── workflowService.ts            # Stored review workflows & process capture
│   │   ├── directoryTemplateService.ts   # Glob matching, partials, and template fill
│   │   ├── templateSeederService.ts      # Low-level adapter seeding for dotfiles
│   │   ├── vaultGitTracking.ts           # Obsidian Git command integration
│   │   └── Provider services (perplexity, gemini, claude, lmStudio, vane)
│   │
│   └── docs/                     # Bundled markdown assets seeded to user vaults
│       ├── workflows/            # 11 review workflows & workflow README
│       ├── templates/            # 4 general profile templates & template README
│       ├── partials/             # Shipped partial snippets (e.g. mermaid-discipline)
│       └── preambles/            # Shipped request preambles
```

---

## ⚖️ License & Acknowledgements

* Distributed under the [MIT License](LICENSE).
* **Upstream Attribution**: Forked from [`lossless-group/perplexed-plugin`](https://github.com/lossless-group/perplexed-plugin), originally authored by [The Lossless Group](https://lossless.group).
* **Current Fork Maintainer**: [jg3](https://github.com/jg3).
* For questions, bugs, and feature requests, please open an issue on [GitHub Issues](https://github.com/jg3/obsidian-perplexed-plugin/issues).
