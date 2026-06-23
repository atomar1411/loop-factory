# Autonomous PR Loop Reference

Run a task from developer request or issue to reviewed and verified PR until it
merges, is ready for maintainer action, or hits a stop condition.

The developer gives the software work. The agent owns translating it into loop
state.

## Loop Steps

1. Read `AGENTS.md`, `CLAUDE.md` when present, `docs/agents/*`, and the issue.
2. If no issue exists, create or identify one before implementation. If GitHub
   is unavailable, create a local task packet and report the fallback.
3. Validate the task packet.
4. Select and run the required agent profiles. If the runtime cannot spawn
   profiles, report the limitation and execute the phases sequentially.
5. Create or enter a fresh branch/worktree.
6. Implement only the owned scope.
7. Run narrow verification.
8. Commit when appropriate.
9. Open or update a draft PR when autonomy allows.
10. Run or request review.
11. Address review findings.
12. Run verifier or tester pass.
13. Update PR evidence.
14. Mark ready or stop with a decision request.

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
