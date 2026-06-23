# Loop Factory Architecture

Loop Factory is a Git-first operating system for software agents. It does not
replace Codex, Claude Code, GitHub, CI, or the target repository. It installs a
repeatable loop that coordinates those systems through source-controlled
artifacts.

## Principles

1. Git is the coordination spine.
2. Issues and PRs are durable loop state.
3. Project truth lives in source, committed docs, and explicit task decisions.
4. Private model memory and scratch output are hints, not authority.
5. Each task owns one branch and one worktree.
6. Agents can continue without human input until a declared stop condition.
7. Every claim of completion needs evidence.
8. Reusable agent behavior belongs in skills, agent profiles, templates, and scripts.

## Components

```text
Developer software request
  -> activation classifier
  -> Requirement Intake Skill when durable task state is useful
  -> GitHub issue or local task packet
  -> Orchestrator Skill
  -> Product, architecture, or triage profile when needed
  -> Worktree manager
  -> Implementer agent run
  -> Reviewer, architecture reviewer, or security reviewer run
  -> Verifier or tester run
  -> Gatekeeper run
  -> PR evidence
  -> Merge/deploy gate
```

## Agent Model

Loop Factory does not treat roles and agents as separate operational entities.
It uses agent profiles and agent runs:

- **Agent profile:** a reusable specialist definition such as Implementer,
  Tester, Reviewer, or Gatekeeper.
- **Agent run:** one execution of a profile against one task packet in one repo
  context.

Default rule: one agent run uses one profile for one task slice. If a small task
is handled in one conversation, the phases must still be reported separately and
must not be described as independent review.

## Runtime Surfaces

Loop Factory is intentionally surface-neutral:

- Codex uses `.agents/plugins/marketplace.json`, `.codex-plugin/plugin.json`,
  `commands/`, `skills/`, and repo `AGENTS.md`.
- Claude Code uses `.claude-plugin/marketplace.json`,
  `.claude-plugin/plugin.json`, `commands/`, `skills/`, agent profiles in
  `agents/`, and repo `CLAUDE.md`.
- GitHub carries issues, PRs, labels, checks, and comments.
- CI carries repeatable verification.
- The target repo carries source truth under files such as `docs/truth/*`.

## State Model

The loop stores state in artifacts that other agents, developers, and
maintainers can inspect:

- Requirement brief.
- Issue.
- Task packet.
- Branch and worktree.
- Commits.
- Product or architecture review notes.
- Review report.
- Verification report.
- Gatekeeper report.
- PR checklist.
- Decision log when a developer or maintainer changes semantics.

No hidden dashboard is required for correctness. Dashboards may exist later as
read-only mirrors of GitHub and committed files.

## Trust Model

Agents are trusted to proceed inside the autonomy level assigned to a task.
They are not trusted to silently change risk domains.

Risk domains include:

- product semantics,
- money movement,
- legal/compliance,
- security posture,
- safety or data-loss behavior,
- production deployment and secrets,
- service boundaries,
- irreversible operations.

When a task touches a risk domain, the loop pauses at the decision boundary and
posts a decision request with options, recommendation, and risk if wrong.

## Project Setup Model

The `/loop-factory` slash command enables a target repo. Internally, the setup
command copies target-repo templates and creates or updates:

- `AGENTS.md`,
- `CLAUDE.md`,
- `docs/agents/*`,
- `docs/truth/README.md`,
- `.github/ISSUE_TEMPLATE/requirement.yml`,
- `.github/PULL_REQUEST_TEMPLATE.md`.

The command must not overwrite project-specific files without backup or explicit
`--force`.
