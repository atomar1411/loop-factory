# Agent Profiles

Loop Factory ships reusable agent profiles. A profile is a specialist worker
definition: what the agent should own, what it should avoid, and what evidence
it must return.

When work starts, the orchestrator creates an agent run from one profile and
one task packet.

```text
agent profile + task packet + repo context = agent run
```

Default rule: one agent run uses one profile for one task slice. Small tasks may
run several phases in one conversation, but the report must label each phase and
must not claim independent review.

For tracked software work, the orchestrator must create or identify task state
before implementation. If the runtime cannot spawn named agent profiles, the
main agent must state that fallback and run the same profile phases
sequentially.

## Coordination Profiles

| Profile | Purpose |
| --- | --- |
| Orchestrator | Owns the loop, splits work, starts task packets, prevents overlap, and escalates stop conditions. |
| Issue Triager | Converts rough requirements, bugs, and review comments into agent-ready issues. |
| Gatekeeper | Enforces autonomy level, evidence, risk, merge, and deploy gates. |
| Release Manager | Coordinates merge order, release readiness, deploy approval, rollback notes, and cleanup. |

## Product And Design Profiles

| Profile | Purpose |
| --- | --- |
| Product PRD Agent | Writes PRDs, acceptance criteria, product non-goals, and issue slices. |
| Architecture Reviewer | Reviews service boundaries, contracts, source truth, diagrams, and design consistency. |
| Docs Steward | Maintains source-truth docs and removes stale or duplicated documentation. |

## Engineering Profiles

| Profile | Purpose |
| --- | --- |
| Implementer | Makes scoped source or doc changes for one task packet. |
| Reviewer | Reviews diffs against task packets, source truth, and evidence. |
| Security Reviewer | Reviews auth, secrets, dependency advisories, permissions, and destructive operations. |

## Verification Profiles

| Profile | Purpose |
| --- | --- |
| Verifier | Runs command gates and reports exact evidence. |
| Tester | Performs outside-in product verification for app, Docker, DB, browser, WSS, and smoke checks. |

## Routing Defaults

- New requirement: Issue Triager, then Product PRD Agent when product behavior is unclear.
- Architecture/design task: Architecture Reviewer plus Docs Steward.
- Normal code task: Implementer, Reviewer, Verifier.
- Product flow task: Implementer, Reviewer, Tester, Gatekeeper.
- Security or dependency task: Implementer, Security Reviewer, Verifier, Gatekeeper.
- Release/deploy task: Gatekeeper, Release Manager, Tester.

## Runtime Use

Codex and Claude Code may run these profiles directly when the runtime supports
specialist agents. Otherwise the main agent can run phases sequentially inside
one conversation, while keeping the responsibilities and evidence separate.

Do not let one agent run implement risky work and approve it as independently
reviewed.
