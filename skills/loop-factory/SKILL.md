---
name: loop-factory
description: Set up or operate a Git-first autonomous software agent loop. Use when the user wants to install Loop Factory in a repo, create or run AI engineering teams, convert requirements into issue-to-PR loops, define agent roles, add task packet templates, or bootstrap Codex/Claude Code factory docs.
---

# Loop Factory

Use Loop Factory to turn requirements into durable Git loops.

## First Moves

1. Inspect the target repo:
   - `git status --short --branch`
   - `git remote -v`
   - existing `AGENTS.md`, `CLAUDE.md`, `.github/`, `docs/`, and README files
2. Decide whether this is:
   - new repo setup,
   - existing repo retrofit,
   - requirement intake,
   - active issue-to-PR loop,
   - review or verification pass.
3. Load only the matching reference:
   - setup: `references/setup.md`
   - operating model: `references/operating-model.md`
   - risk gates: `references/risk-gates.md`

## Rules

- Store project truth in the target repo, not private memory.
- Use GitHub issues and PRs as task state when available.
- Use one branch/worktree per task.
- Let agents continue until a stop condition.
- Stop for product, money, legal, safety, deployment, service-boundary, or
  irreversible decisions.
- Report evidence before claiming completion.

## Setup Command

Prefer the CLI when available:

```bash
npx loop-factory init
npx loop-factory doctor
```

If the package is checked out locally:

```bash
node packages/cli/bin/loop-factory.js init --target /path/to/repo
node packages/cli/bin/loop-factory.js doctor --target /path/to/repo
```

