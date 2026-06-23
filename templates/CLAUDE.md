# Claude Code Entry Point

This repo uses Loop Factory.

Read `AGENTS.md`, then only the needed `docs/agents/*`, `docs/truth/*`, issue,
PR, and source files.

## Loop Factory Contract

For software work, choose the smallest route that proves it:

- Answer: questions/explanations only.
- Fast Path: small, clear, low-risk edits. Inspect, edit, verify, summarize.
  No issue, worktree, or agent fan-out required.
- Factory Loop: complex, broad, ambiguous, multi-area, PR/review requested, or
  durable tracking useful. Use issue/task state, branch/worktree, profiles,
  review, verification, and evidence.
- Risk Gate: product, money, legal, safety, production, secrets, service
  boundaries, or destructive actions. Stop for decision first.

Do not run complex or risky work inline and call it Loop Factory.

## Claude Code Agent Profiles

Use `loop-orchestrator` for broad work and issue triage, then the needed
implementer/reviewer/verifier/tester/gatekeeper profile. Product, architecture,
security, docs, and release work are specialist modes inside those profiles.

## Stop Conditions

Stop and ask before product, money, legal, safety, deployment, service-boundary,
or irreversible changes.
