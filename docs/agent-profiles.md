# Agent Profiles

Loop Factory keeps the default runtime lean. Active agents are always available;
specialist modes are loaded only when the task needs them.

## Active Runtime Agents

| Agent | Purpose |
| --- | --- |
| Orchestrator | Owns the loop, issue/task state, routing, branch/worktree ownership, and stop conditions. |
| Implementer | Makes scoped source or doc changes for one task packet. |
| Reviewer | Reviews diffs against the task, source truth, risk gates, and evidence. |
| Verifier | Runs command gates and reports exact evidence. |
| Tester | Runs outside-in app, Docker, browser, DB, queue, WSS, or smoke checks. |
| Gatekeeper | Enforces autonomy, evidence, risk, merge, and deploy gates. |

## Lazy Specialist Modes

These modes run inside the active agents instead of loading as always-on agents:

- Issue triage
- Product PRD
- Architecture review
- Docs stewardship
- Security review
- Release management

Use `skills/loop-factory/references/specialist-profiles.md` when a task needs a
specialist mode.

## Routing Defaults

- New requirement: Orchestrator with issue-triage mode.
- Product behavior unclear: Orchestrator with Product PRD mode.
- Architecture/design task: Reviewer with architecture-review mode.
- Source-truth cleanup: Reviewer with docs-stewardship mode.
- Normal code task: Implementer, Reviewer, Verifier.
- Product flow task: Implementer, Reviewer, Tester, Gatekeeper.
- Security/dependency task: Implementer, Reviewer in security mode, Verifier,
  Gatekeeper.
- Release/deploy task: Gatekeeper in release mode, Tester.

If the runtime cannot spawn named agents, the main agent must state that
fallback and run the same phases sequentially. Do not claim independent review
unless an independent profile actually reviewed the work.
