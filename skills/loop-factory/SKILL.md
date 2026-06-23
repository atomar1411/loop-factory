---
name: loop-factory
description: Public Loop Factory interface. Use when the user invokes /loop-factory in Codex or Claude Code, asks to enable Loop Factory in a repo, asks for a Loop Factory doctor check, or gives complex software work that should move through the Loop Factory operating model.
argument-hint: "[doctor|help|request]"
---

# Loop Factory

Turn complex software work into a Git-backed loop. This is the only public
Loop Factory command; internal profile names are not user commands.

## Public Interface

- `/loop-factory` enables Loop Factory in the current repo.
- `/loop-factory doctor` verifies repo setup, GitHub connectivity, and plugin
  visibility.
- Extra text after the command is treated as tracked software work.

Features, bugs, reviews, PRDs, architecture, cleanup, and verification must
activate this skill when intent is clear.

## First Moves

1. Inspect `git status --short --branch`, `git remote -v`, `AGENTS.md`,
   `CLAUDE.md`, `.github/`, `docs/`, and README files.
2. Classify: setup, retrofit, intake, issue-to-PR, review, or verification.
3. Load only the needed reference:
   - setup: `references/setup.md`
   - operating model: `references/operating-model.md`
   - requirement intake: `references/requirement-intake.md`
   - PR delivery loop: `references/autonomous-pr-loop.md`
   - review: `references/reviewer-loop.md`
   - verification: `references/verifier-loop.md`
   - risk gates: `references/risk-gates.md`

## Mandatory Loop Contract

Tracked work means feature, bug, cleanup, PRD, architecture/design,
implementation, PR review, or verification.

Before edits or progress claims:

1. Create or identify task state: GitHub issue if available, local task packet
   only when GitHub is unavailable or explicitly disabled.
2. Select profile sequence. Use `loop-orchestrator` for broad work and
   `loop-issue-triager` when no issue exists.
3. Spawn named profiles when the runtime supports it. If not, state the
   fallback and run phases sequentially.
4. Use one branch/worktree per implementation task.
5. Post evidence to the issue, PR, or task packet.

Completion report requires: task state, branch/worktree, profiles or fallback,
review, verification, skipped gates, residual risk, and next decision.

## Rules

- Store project truth in the target repo, not private memory.
- Use GitHub issues and PRs as task state whenever GitHub is available.
- Use one branch/worktree per task.
- Continue until a stop condition.
- Stop for product, money, legal, safety, deployment, service-boundary, or
  irreversible decisions.
- Evidence before completion claims.
- Do not ask the developer to invoke Loop Factory again when intent is clear.
- Use CLI commands as internal automation only.
- Keep internal workflow names out of the public command surface.

## Internal Automation

CLI backstop:

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
