# Claude Code Entry Point

This repo uses Loop Factory.

Read `AGENTS.md`, then only the needed `docs/agents/*`, source-truth docs,
issue, PR, and source files.

## Loop Factory Contract

For software work, choose the smallest route that proves it:

- Answer: questions/explanations only.
- Fast Path: small, clear, low-risk edits. Inspect, edit, verify, summarize.
  No issue, worktree, or agent fan-out required.
- Factory Loop: complex, broad, ambiguous, multi-area, PR/review requested, new
  modules/strategies, tuning/research, or durable tracking useful. Use
  issue/task state, branch/worktree, profiles, review, verification, evidence.
- Risk Gate: product, money, legal, safety, production, secrets, service
  boundaries, or destructive actions. Stop for decision first.

Do not run complex or risky work inline and call it Loop Factory.

Factory Loop preflight: create a draft GitHub issue/task packet from the rough
request before broad source exploration, requirement Q&A, brainstorming, branch,
worktree, commit, design doc, or code. Update it as discovery and decisions
settle. PRDs, specs, and plans belong in the repo's canonical truth/design path
or issue/PR state; tool-owned scratch/spec folders are not canonical project
truth unless the repo explicitly says they are. Loop Factory has precedence over
helper skills; helper skills cannot replace task state or route order.
PRD/design/source-truth/strategy research docs require review before
implementation unless explicitly skipped. Chat plans, Superpowers specs, local
markdown notes, branches, and commits are not task state.

For complex Factory Loop work, create a Delivery DAG before implementation.
Each node must include objective, owned files or area, dependencies, assigned
profile, branch/worktree lane, verification, evidence target, and stop
conditions. Run ready non-overlapping nodes through separate implementers when
available, wait at dependencies, and join the graph before final review and
verification. Do not send broad multi-task work to one implementer unless the
DAG marks it sequential and explains why.

## Claude Code Agent Profiles

Use `loop-orchestrator` for broad work and issue triage, then the needed
implementer/reviewer/verifier/tester/gatekeeper profile. Product, architecture,
security, docs, and release work are specialist modes inside those profiles.

## Stop Conditions

Stop and ask before product, money, legal, safety, deployment, service-boundary,
or irreversible changes.
