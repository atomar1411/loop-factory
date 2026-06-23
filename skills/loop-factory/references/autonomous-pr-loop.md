# Autonomous PR Loop Reference

Run a task from developer request or issue to reviewed and verified PR until it
merges, is ready for maintainer action, or hits a stop condition.

The developer gives the software work. The agent owns translating it into loop
state.

## Loop Steps

1. Read `AGENTS.md`, `CLAUDE.md` when present, and `docs/agents/*`; do only
   the source reading needed to classify the work.
2. If no issue exists, create or identify one from the rough request before
   broad source exploration, requirement Q&A, brainstorming, branch/worktree,
   design doc, commit, or implementation. If GitHub is unavailable, create a
   local task packet and report the fallback.
3. Use the issue/task packet as the durable place for requirement questions,
   answers, decisions, open risks, and links to docs.
4. Validate the task packet.
5. Select and run the required agent profiles. If the runtime cannot spawn
   profiles, report the limitation and execute the phases sequentially.
6. Create or enter a fresh branch/worktree.
7. Create or update PRD/design/source-truth/strategy research docs when needed.
   Use the repo's canonical truth/design path or issue/PR state; do not default
   to helper-tool scratch folders.
8. Review those docs before implementation unless the developer explicitly
   skips that review.
9. Implement only the owned scope.
10. Run narrow verification.
11. Commit when appropriate.
12. Open or update a draft PR when autonomy allows.
13. Run or request code review.
14. Address review findings.
15. Run verifier or tester pass.
16. Update PR evidence.
17. Mark ready or stop with a decision request.

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
