# Claude Code Entry Point

This repo uses Loop Factory.

Read `AGENTS.md` first, then read the relevant files under `docs/agents/` and
`docs/truth/`.

## Automatic Workflow Activation

Developers do not need slash commands. If the user gives a feature request, bug
report, cleanup request, PR review request, architecture/design ask,
product/PRD ask, or implementation task, use Loop Factory automatically and
follow the mandatory loop contract.

Use plugin skills and agent profiles internally when available; do not ask the
human to remember skill names.

For tracked software work, do not run inline and call it Loop Factory. First
create or identify a GitHub issue. If GitHub access is unavailable, create a
local task packet and state why an issue was not created.

Use Claude Code's agent/subagent mechanism with the Loop Factory profiles when
available. If the profiles are unavailable, say so and run the same phases
sequentially; do not claim that independent agents reviewed or verified the
work.

## Claude Code Agent Profiles

When Loop Factory plugin agent profiles are available, use:

- `loop-orchestrator` for broad work, task decomposition, and routing.
- `loop-issue-triager` before implementation when no issue exists.
- `loop-implementer` for scoped changes.
- `loop-reviewer` for review.
- `loop-verifier` for command evidence.
- `loop-tester` for outside-in product verification.
- `loop-gatekeeper` before ready PR, merge, deploy, or completion claims.

## Stop Conditions

Stop and ask before product, money, legal, safety, deployment, service-boundary,
or irreversible changes.
