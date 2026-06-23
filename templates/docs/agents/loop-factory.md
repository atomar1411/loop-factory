# Loop Factory

This repo uses a Git-first autonomous loop.

Loop Factory is work-first. Agents infer when a developer request is a new
requirement, bug, cleanup, review, design, product, or implementation task.

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

## Activation

Start the workflow automatically when the request implies tracked software work.
Do not require CLI commands, slash commands, or explicit skill names.

Do not activate for simple questions, explanations, or requests that explicitly
ask for discussion only.

## Mandatory Preflight

For tracked software work, the agent must not proceed as a normal inline coding
session.

Before implementation:

1. Create or identify a GitHub issue when GitHub access is available.
2. Use a local task packet only when GitHub is unavailable or explicitly
   disabled.
3. Select the profile sequence for the loop.
4. Spawn the relevant agent profiles when the runtime supports it.
5. If agent profiles cannot be spawned, state that limitation and run the same
   phases sequentially.
6. Create or enter the branch/worktree for the task.

Skipping any preflight step requires a stated reason in the final report.

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
- selected profiles or fallback reason,
- changed files,
- review result,
- verification result,
- skipped gates,
- residual risk,
- developer or maintainer decisions needed.
