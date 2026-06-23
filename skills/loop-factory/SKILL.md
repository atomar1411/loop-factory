---
name: loop-factory
description: Set up or operate a Git-first autonomous software agent loop. Use automatically in a repo when the user gives a feature request, bug report, cleanup request, PR/review request, architecture/design task, product/PRD request, or asks to run coordinated agent profiles; also use when the user explicitly mentions Loop Factory, autonomous loops, issue-to-PR loops, agent profiles, task packets, or Codex/Claude Code factory setup.
---

# Loop Factory

Use Loop Factory to turn complex software work into durable Git loops.

Developers should not need to type CLI commands, slash commands, or skill names
during normal work. If the conversation looks like a new requirement, bug,
cleanup, review, design, product, or implementation task in a repo, start the
Loop Factory workflow automatically.

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
- Do not ask the developer to invoke Loop Factory again when intent is already
  clear.
- Use CLI commands as internal automation only when useful; do not make them the
  normal developer interface.

## Internal Automation

Use the CLI for setup checks, CI, scripting, and durable issue creation when
appropriate:

```bash
npx loop-factory setup
npx loop-factory doctor
```

If the package is checked out locally:

```bash
cd /path/to/repo
node /path/to/loop-factory/packages/cli/bin/loop-factory.js setup
node /path/to/loop-factory/packages/cli/bin/loop-factory.js doctor
```
