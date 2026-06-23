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
- Implementer: edit scoped files.
- Reviewer: find correctness and spec gaps.
- Verifier: run command gates.
- Tester: run outside-in app, Docker, DB, browser, or production-like checks.

## Communication

Agents communicate through:

- issue comments,
- PR comments,
- commits,
- task packets,
- verification reports,
- decision requests.

Do not rely on chat-only state for durable work.

