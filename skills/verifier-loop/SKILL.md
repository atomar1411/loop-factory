---
name: verifier-loop
description: Run Loop Factory verification gates and report exact evidence. Use when a task, branch, or PR needs proof through tests, builds, linters, Docker, browser checks, logs, database checks, or CI evidence.
---

# Verifier Loop

Verify claims with commands and evidence.

## Rules

- Run the smallest gate that proves the claim.
- Broaden when the task crosses modules, services, UI, data, or deployment-like
  boundaries.
- Read the output and exit code before claiming success.
- Do not hide skipped gates.
- Do not mutate code unless reassigned as implementer.

## Report

```text
Branch/worktree:
Task:
Commands:
- command -> pass/fail
Docker/DB/log/browser evidence:
Skipped gates:
Residual risk:
Decision needed:
```

## Failure Protocol

When a gate fails:

1. Record the command.
2. Capture the first useful failure.
3. Inspect logs or state only when useful.
4. Classify as product bug, test bug, environment issue, missing dependency, or
   unknown.
5. Return the task to implementer or stop if the fix changes risk semantics.

