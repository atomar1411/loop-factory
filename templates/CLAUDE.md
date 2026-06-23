# Claude Code Entry Point

This repo uses Loop Factory.

Read `AGENTS.md`, then only the needed `docs/agents/*`, `docs/truth/*`, issue,
PR, and source files.

## Loop Factory Contract

For feature, bug, cleanup, PR review, PRD, architecture/design, implementation,
or verification work:

1. Create or identify GitHub issue/task state before edits.
2. If GitHub is unavailable or disabled, create a local task packet and say why.
3. Use Loop Factory profiles when available; otherwise run phases sequentially
   and state that no independent agents were spawned.
4. Use one branch/worktree per implementation task.
5. Report task state, branch/worktree, profiles or fallback, review,
   verification, skipped gates, risk, and next decision.

Do not run tracked work inline and call it Loop Factory.

## Claude Code Agent Profiles

Use `loop-orchestrator` for broad work and issue triage, then the needed
implementer/reviewer/verifier/tester/gatekeeper profile. Product, architecture,
security, docs, and release work are specialist modes inside those profiles.

## Stop Conditions

Stop and ask before product, money, legal, safety, deployment, service-boundary,
or irreversible changes.
