# Agent Entry Point

This file is the shared onboarding contract for AI agents working in this repo.

## Read Order

Every agent starts here, then reads only the docs needed for the assigned task:

1. `docs/truth/README.md`
2. `docs/agents/context-loading.md`
3. `docs/agents/loop-factory.md`
4. The assigned issue, PR, task packet, or developer request
5. Any local `AGENTS.md` in the target subdirectory

## Loop Factory Mode

This repo uses Loop Factory for agentic work.

Developers do not need to invoke Loop Factory explicitly. If a request looks
like a new requirement, bug, cleanup request, review request,
architecture/design task, product/PRD task, or implementation request, the agent
must start the Loop Factory workflow automatically.

Project truth lives in:

- source code,
- service or package README files,
- `docs/truth/*`,
- `AGENTS.md`, `CLAUDE.md`, and `docs/agents/*` for agent operating rules,
- GitHub issues and PRs for task state,
- explicit maintainer decisions in the current task.

Private memory, scratch notes, and local command output are not project truth.

## Mandatory Loop Contract

For tracked software work, do not work inline without durable state.

Before edits or completion claims:

1. Create or identify a GitHub issue when the repo has GitHub access.
2. If GitHub is unavailable or explicitly disabled, create a local task packet
   and report why.
3. Select the Loop Factory agent profile sequence.
4. Use runtime agent/subagent support when available. If unavailable, run the
   same phases sequentially and state that no independent agents were spawned.
5. Create or enter one branch/worktree per implementation task.
6. Report issue/task packet, branch/worktree, selected profiles, review,
   verification, skipped gates, residual risk, and next decision.

## Default Loop

```text
requirement
  -> issue and task packet
  -> fresh branch/worktree
  -> implementation
  -> review
  -> verification
  -> PR evidence
  -> merge or escalation
```

## Automatic Workflow Activation

Activate the workflow for software requests such as:

- "Fix checkout retry behavior."
- "Create PRDs for onboarding."
- "Review this PR and address comments."
- "Clean up dead docs and branches."
- "Start agents on this issue."

Do not activate the full workflow for simple questions, explanations, or
requests that explicitly say not to create tasks or change code.

## Agent Rules

- Use one task per branch/worktree.
- Avoid overlapping owned files across parallel agents.
- Create or identify issue/task state before non-trivial edits.
- Read the task packet and required truth docs before editing.
- Write or update tests when behavior changes.
- Run verification before claiming completion.
- Post evidence to the issue or PR.
- Stop and ask when a stop condition is reached.

## Stop Conditions

Stop before changing:

- product semantics,
- money movement,
- legal/compliance behavior,
- safety or data-loss behavior,
- production deployment or secrets,
- service boundaries,
- irreversible operations.

Use this format:

```text
Decision needed:
Why it matters:
Options:
Recommendation:
Risk if wrong:
Files or systems affected:
```

## Git Safety

Do not merge, deploy, delete branches, delete worktrees, alter production
configuration, or run destructive commands unless the task packet or maintainer
explicitly allows it.
