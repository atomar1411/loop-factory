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
5. For complex work, create a Delivery DAG before implementation. Each node
   must include objective, owned files or area, dependencies, assigned profile,
   branch/worktree lane, verification, evidence target, and stop conditions.
   Ready nodes with non-overlapping ownership may run through separate
   implementers in parallel; dependent nodes wait for evidence.
6. Select and run the required agent profiles. If the runtime cannot spawn
   profiles, report the limitation and execute the phases sequentially.
7. Create or enter fresh branch/worktree lanes for the active DAG node or task.
8. Create or update PRD/design/source-truth/strategy research docs when needed.
   Use the repo's canonical truth/design path or issue/PR state; do not default
   to helper-tool scratch folders.
9. Review those docs before implementation unless the developer explicitly
   skips that review.
10. Implement only the owned node scope.
11. Run narrow verification for each node.
12. Commit when appropriate.
13. Join DAG nodes through an integration pass before final review.
14. Open or update a draft PR when autonomy allows.
15. Run or request code review.
16. Address review findings.
17. Run verifier or tester pass.
18. Update PR evidence.
19. Mark ready or stop with a decision request.

## Stop Conditions

Stop for risk gates, unclear source truth, overlapping ownership, failing gates
outside scope, missing Delivery DAG for complex work, merge authority,
deployment authority, or destructive actions.

## PR Evidence

Every PR update must include:

- linked issue,
- autonomy level,
- Delivery DAG summary when complex,
- changed files,
- commands run,
- review result,
- verification result,
- skipped gates,
- residual risk,
- decisions needed.
