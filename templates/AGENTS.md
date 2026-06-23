# Agent Entry Point

Shared onboarding contract for AI agents.

1. `docs/truth/README.md`
2. `docs/agents/context-loading.md`
3. `docs/agents/loop-factory.md`
4. The assigned issue, PR, task packet, or developer request
5. Any local `AGENTS.md` in the target subdirectory

## Loop Factory Mode

For requirement, bug, cleanup, review, architecture/design, product/PRD,
implementation, or verification work, start Loop Factory automatically.

Project truth lives in:

- source code,
- service or package README files,
- `docs/truth/*`,
- `AGENTS.md`, `CLAUDE.md`, and `docs/agents/*` for agent operating rules,
- GitHub issues and PRs for task state,
- explicit maintainer decisions in the current task.

Private memory, scratch notes, and raw local output are not project truth.

## Mandatory Loop Contract

Before edits or completion claims:

1. Create or identify a GitHub issue when the repo has GitHub access.
2. If GitHub is unavailable or explicitly disabled, create a local task packet
   and report why.
3. Select the Loop Factory agent profile sequence.
4. Use runtime agent/subagent support when available. If unavailable, run the
   same phases sequentially and state that no independent agents were spawned.
5. Create or enter one branch/worktree per implementation task.
6. Report task state, branch/worktree, profiles or fallback, review,
   verification, skipped gates, risk, and next decision.

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

Decision request format:

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
