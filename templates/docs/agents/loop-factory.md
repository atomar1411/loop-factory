# Loop Factory

This repo uses a Git-first autonomous loop.

## Source Of Truth

- Product and architecture truth: `docs/truth/*`
- Agent operating rules: `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`
- Task state: GitHub issues and PRs
- Proof: CI, local command output summarized in PRs, committed tests
- Memory: hint only

## Workflow

```text
requirement
  -> intake
  -> task packet
  -> branch/worktree
  -> implementation
  -> review
  -> verification
  -> PR
  -> merge or escalation
```

## Autonomy Levels

- `A0 Advisory`: inspect and propose only.
- `A1 Local Patch`: edit and commit locally.
- `A2 Draft PR`: push branch and open draft PR.
- `A3 Ready PR`: mark PR ready after gates.
- `A4 Auto-Merge`: merge low-risk PRs by policy.
- `A5 Deploy Loop`: deploy by explicit policy.

Default: `A2 Draft PR`.

## Required Evidence

Every task report must include:

- issue or task packet,
- branch/worktree,
- changed files,
- review result,
- verification result,
- skipped gates,
- residual risk,
- human or maintainer decisions needed.

