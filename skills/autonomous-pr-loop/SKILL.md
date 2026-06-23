---
name: autonomous-pr-loop
description: Run a Loop Factory task from developer request or issue to reviewed and verified PR. Use automatically when a requirement is ready for autonomous agent work with branches, worktrees, implementation, review, verification, and PR evidence, even if the user did not invoke a command.
---

# Autonomous PR Loop

Run the issue-to-PR loop until it merges, is ready for maintainer action, or
hits a stop condition. The user gives the software work; the agent owns
translating it into loop state.

## Loop Steps

1. Read `AGENTS.md`, `CLAUDE.md` when present, `docs/agents/*`, and the issue.
2. Validate the task packet.
3. Create or enter a fresh branch/worktree.
4. Implement only the owned scope.
5. Run narrow verification.
6. Commit.
7. Open or update a draft PR when autonomy allows.
8. Request or run reviewer loop.
9. Address review findings.
10. Run verifier or tester loop.
11. Update PR evidence.
12. Mark ready or stop with a decision request.

## Stop Conditions

Stop for risk gates, unclear source truth, overlapping ownership, failing gates
outside scope, merge authority, deployment authority, or destructive actions.

## PR Evidence

Every PR update must include:

- linked issue,
- autonomy level,
- changed files,
- commands run,
- review result,
- verification result,
- skipped gates,
- residual risk,
- decisions needed.
