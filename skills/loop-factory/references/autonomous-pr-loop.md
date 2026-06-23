# Autonomous PR Loop Reference

Run a task from developer request or issue to reviewed and verified PR until it
merges, is ready for maintainer action, or hits a stop condition.

The developer gives the software work. The agent owns translating it into loop
state.

## Loop Steps

1. Read `AGENTS.md`, `CLAUDE.md` when present, `docs/agents/*`, and the issue.
2. Validate the task packet.
3. Create or enter a fresh branch/worktree.
4. Implement only the owned scope.
5. Run narrow verification.
6. Commit when appropriate.
7. Open or update a draft PR when autonomy allows.
8. Run or request review.
9. Address review findings.
10. Run verifier or tester pass.
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
