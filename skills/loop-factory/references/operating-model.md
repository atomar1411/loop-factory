# Operating Model Reference

## Loop

```text
requirement
  -> intake
  -> issue/task packet
  -> branch/worktree
  -> implementation
  -> review
  -> verification
  -> PR evidence
  -> merge or escalation
```

## Role Routing

- Orchestrator: split and route work.
- Issue Triager: turn rough input into agent-ready issues.
- Product PRD Agent: write PRDs and acceptance criteria.
- Architecture Reviewer: review boundaries, contracts, and source truth.
- Docs Steward: keep durable docs clean and non-duplicative.
- Implementer: edit scoped code/docs files.
- Reviewer: find correctness and spec gaps.
- Security Reviewer: check auth, secrets, dependency, and permission risk.
- Verifier: run command gates.
- Tester: run outside-in app, Docker, DB, browser, or production-like checks.
- Gatekeeper: enforce autonomy and evidence gates.
- Release Manager: coordinate merge, deploy readiness, rollback notes, and cleanup.

## Communication

Agents communicate through:

- issue comments,
- PR comments,
- commits,
- task packets,
- verification reports,
- decision requests.

Do not rely on chat-only state for durable work.
