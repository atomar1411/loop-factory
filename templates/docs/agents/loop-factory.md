# Loop Factory

This repo uses a Git-first autonomous loop.

Loop Factory is work-first. Agents infer tracked software work from the request.

## Source Of Truth

- Product and architecture truth: `docs/truth/*`
- Agent operating rules: `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`
- Task state: GitHub issues and PRs
- Proof: CI, local command output summarized in PRs, committed tests
- Memory: hint only

## Loop

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

## Activation

Start automatically for tracked software work. Do not require commands or skill
names. Do not activate for simple questions or explicit discussion-only asks.

## Mandatory Preflight

Before implementation:

1. Create or identify a GitHub issue when GitHub access is available.
2. Use a local task packet only when GitHub is unavailable or explicitly
   disabled.
3. Select the profile sequence for the loop.
4. Spawn the relevant agent profiles when the runtime supports it.
5. If agent profiles cannot be spawned, state that limitation and run the same
   phases sequentially.
6. Create or enter the branch/worktree for the task.

State any skipped preflight step and reason.

## Autonomy Levels

- `A0 Advisory`: inspect and propose only.
- `A1 Local Patch`: edit and commit locally.
- `A2 Draft PR`: push branch and open draft PR.
- `A3 Ready PR`: mark PR ready after gates.
- `A4 Auto-Merge`: merge low-risk PRs by policy.
- `A5 Deploy Loop`: deploy by explicit policy.

Default: `A2 Draft PR`.

## Required Evidence

Every task report needs: issue/task packet, branch/worktree, profiles or
fallback, changed files, review, verification, skipped gates, risk, decisions.
