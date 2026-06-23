# Claude Code Entry Point

This repo uses Loop Factory.

Read `AGENTS.md` first, then read the relevant files under `docs/agents/` and
`docs/truth/`.

## Loop Factory Skills

When available, use:

- `/loop-factory:requirement-intake` to convert rough requirements into issues.
- `/loop-factory:autonomous-pr-loop` to run an approved issue through branch,
  implementation, review, verification, and PR evidence.
- `/loop-factory:reviewer-loop` to review a diff against the issue and project
  truth.
- `/loop-factory:verifier-loop` to run and report verification gates.

## Claude Code Agents

When Loop Factory plugin agents are available, use:

- `loop-orchestrator` for task decomposition and routing.
- `loop-implementer` for scoped changes.
- `loop-reviewer` for review.
- `loop-verifier` for command evidence.
- `loop-tester` for outside-in product verification.

## Stop Conditions

Stop and ask before product, money, legal, safety, deployment, service-boundary,
or irreversible changes.

