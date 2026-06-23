# Agent Entry Point

Shared onboarding contract for AI agents.

1. Source-truth docs (`truth/` or `docs/truth/`)
2. `docs/agents/context-loading.md`
3. `docs/agents/loop-factory.md`
4. The assigned issue, PR, task packet, or developer request
5. Any local `AGENTS.md` in the target subdirectory

## Loop Factory Mode

For software work, choose the smallest Loop Factory route that proves the work.

Project truth lives in:

- source code,
- service or package README files,
- source-truth docs (`truth/` or `docs/truth/`),
- `AGENTS.md`, `CLAUDE.md`, and `docs/agents/*` for agent operating rules,
- GitHub issues and PRs for task state,
- explicit maintainer decisions in the current task.

Private memory, scratch notes, and raw local output are not project truth.

## Routing Contract

| Route | Use For | Required Shape |
| --- | --- | --- |
| Answer | Questions, explanations, brainstorming, one-line shell asks. | Answer normally. |
| Fast Path | Small, low-risk edits, usually 1-2 files, clear intent, no risk domain. | Inspect, edit, verify, summarize. No issue/agents required. |
| Factory Loop | Complex, broad, ambiguous, multi-area, PR/review requested, new modules/strategies, tuning/research, or durable tracking useful. | Issue/task packet, branch/worktree, profiles, review, verification, evidence. |
| Risk Gate | Product, money, legal, safety, production, secrets, service boundaries, destructive actions. | Stop for decision, then Factory Loop after approval. |

Do not force GitHub issues, worktrees, or agent fan-out for Fast Path work. Do
not use Fast Path for complex or risky work.

Factory Loop preflight:

1. Create or identify GitHub issue/task packet before branch, worktree, commit,
   design doc, or code.
2. If GitHub is unavailable, create a local task packet and say why.
3. PRD/design/source-truth/strategy research docs require review before
   implementation unless the developer explicitly skips that review.

Branch names, commits, chat plans, Superpowers specs, local markdown notes, and
memory are not task state.

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

Use Answer route for simple questions, explanations, or requests that
explicitly say not to create tasks or change code.

## Agent Rules

- Use one task per branch/worktree.
- Avoid overlapping owned files across parallel agents.
- Create or identify issue/task state before Factory Loop branch, worktree,
  commit, design doc, or code.
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
