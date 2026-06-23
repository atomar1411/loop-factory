# Claude Code Entry Point

This repo uses Loop Factory.

Read `AGENTS.md` first, then read the relevant files under `docs/agents/` and
`docs/truth/`.

## Automatic Workflow Activation

Developers do not need slash commands. If the user gives a feature request, bug
report, cleanup request, PR review request, architecture/design ask,
product/PRD ask, or implementation task, use Loop Factory automatically.

Use plugin skills and agent profiles internally when available; do not ask the
human to remember skill names.

## Claude Code Agent Profiles

When Loop Factory plugin agent profiles are available, use:

- `loop-orchestrator` for task decomposition and routing.
- `loop-implementer` for scoped changes.
- `loop-reviewer` for review.
- `loop-verifier` for command evidence.
- `loop-tester` for outside-in product verification.

## Stop Conditions

Stop and ask before product, money, legal, safety, deployment, service-boundary,
or irreversible changes.
