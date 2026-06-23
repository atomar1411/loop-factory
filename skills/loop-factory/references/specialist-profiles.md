# Specialist Profiles

These are lazy profile modes, not default runtime agents. Use them through the
orchestrator, reviewer, verifier, tester, or gatekeeper when the task needs the
specialty.

| Mode | Use When | Owner |
| --- | --- | --- |
| Issue triage | Rough request needs issue/task slicing, labels, gates, or dependencies. | Orchestrator |
| Product PRD | Product behavior, user experience, acceptance criteria, or non-goals are unclear. | Orchestrator |
| Architecture review | Boundaries, contracts, source truth, diagrams, or service ownership need review. | Reviewer |
| Docs stewardship | Source-truth docs are stale, duplicated, or competing with task/PR state. | Reviewer |
| Security review | Auth, secrets, dependencies, CI, permissions, supply chain, or destructive operations are touched. | Reviewer or Gatekeeper |
| Release management | Merge order, deployment authority, rollback notes, smoke checks, or cleanup are in scope. | Gatekeeper |

Each mode must still produce the normal Loop Factory evidence: task state,
branch/worktree when relevant, findings, verification, skipped gates, risk, and
decisions.
