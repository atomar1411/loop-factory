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
8. Reusable agent behavior belongs in skills, role docs, templates, and scripts.

## Components

```text
Human natural-language request
  -> activation classifier
  -> Requirement Intake Skill when durable task state is useful
  -> GitHub issue or local task packet
  -> Orchestrator Skill
  -> Product, architecture, or triage role when needed
  -> Worktree manager
  -> Implementer agent
  -> Reviewer, architecture reviewer, or security reviewer
  -> Verifier or tester
  -> Gatekeeper
  -> PR evidence
  -> Merge/deploy gate
```

## Runtime Surfaces

Loop Factory is intentionally surface-neutral:

- Codex uses `.codex-plugin/plugin.json`, `skills/`, and repo `AGENTS.md`.
- Claude Code uses `.claude-plugin/plugin.json`, `skills/`, `agents/`, and repo
  `CLAUDE.md`.
- GitHub carries issues, PRs, labels, checks, and comments.
- CI carries repeatable verification.
- The target repo carries source truth under files such as `docs/truth/*`.

## State Model

The loop stores state in artifacts that other agents and humans can inspect:

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
- Decision log when a human or maintainer changes semantics.

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

## Installation Model

`loop-factory init` copies target-repo templates and creates or updates:

- `AGENTS.md`,
- `CLAUDE.md`,
- `docs/agents/*`,
- `docs/truth/README.md`,
- `.github/ISSUE_TEMPLATE/requirement.yml`,
- `.github/PULL_REQUEST_TEMPLATE.md`.

The command must not overwrite project-specific files without backup or explicit
`--force`.
