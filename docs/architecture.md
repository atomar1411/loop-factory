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
5. Each implementation task or DAG node owns one branch and one worktree.
6. Complex Factory Loop work creates a Delivery DAG before implementation.
7. Agents can continue without human input until a declared stop condition.
8. Every claim of completion needs evidence.
9. Reusable agent behavior belongs in skills, agent profiles, templates, and scripts.

## Components

```text
Developer software request
  -> activation classifier
  -> Answer, Fast Path, Factory Loop, or Risk Gate
  -> Fast Path: inspect -> edit -> verify -> summarize
  -> Factory Loop: draft issue -> discovery recorded there
  -> Delivery DAG when complex
  -> ready DAG nodes run in isolated branch/worktree lanes
  -> PRD/design/doc review when needed -> implementation
  -> join/integration -> code review -> verification -> evidence -> merge/deploy gate
```

## Agent Model

Loop Factory does not treat roles and agents as separate operational entities.
It uses agent profiles and agent runs:

- **Agent profile:** a reusable specialist definition such as Implementer,
  Tester, Reviewer, or Gatekeeper.
- **Agent run:** one execution of a profile against one task packet in one repo
  context.

Default rule: one agent run uses one profile for one task slice. Small low-risk
tasks may use Fast Path in one conversation and must not claim independent
review. Factory Loop work reports phases separately.

## Delivery DAG

Complex Factory Loop work must be decomposed before implementation. The
orchestrator writes a Delivery DAG into the issue/task packet with one row per
node:

- node id and objective,
- owned files or area,
- dependencies,
- assigned profile,
- branch/worktree lane,
- verification command or evidence,
- stop conditions.

Nodes with no unmet dependencies and no overlapping owned files may run through
separate implementer agents in parallel. A blocked node waits. A join or
integration node combines the graph before final review, verifier/tester gates,
gatekeeper checks, and PR evidence.

A single implementer packet for many independent tasks is a process failure
unless the DAG explicitly marks the work as sequential and explains why.

## Runtime Surfaces

Loop Factory is intentionally surface-neutral:

- Codex uses `.agents/plugins/marketplace.json`, `.codex-plugin/plugin.json`,
  the public `skills/loop-factory/SKILL.md`, and repo `AGENTS.md`.
- Claude Code uses `.claude-plugin/marketplace.json`,
  `.claude-plugin/plugin.json`, the public `skills/loop-factory/SKILL.md`,
  agent profiles in `agents/`, and repo `CLAUDE.md`.
- GitHub carries issues, PRs, labels, checks, and comments.
- `gh` automates issue creation, PR creation, PR/comment inspection, labels, and
  evidence updates when available. Missing `gh` degrades automation but does not
  block the loop.
- CI carries repeatable verification.
- Docker runs local service stacks, databases, integration tests, browser/manual
  feature-flow checks, and container log inspection when available. Missing
  Docker marks those verification paths unavailable but does not block setup.
- The target repo carries source truth under `docs/truth/`.

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

The public Loop Factory commands are `/loop-factory-init` for first-run setup,
`/loop-factory` for normal operation, and `/loop-factory doctor` for strict
verification. Codex and Claude Code expose the same command names so developers
do not need separate commands per runtime. Internally, the setup command copies
target-repo templates and creates or updates:

- `AGENTS.md`,
- `CLAUDE.md`,
- `docs/agents/*`,
- `docs/truth/README.md`,
- `.github/ISSUE_TEMPLATE/requirement.yml`,
- `.github/PULL_REQUEST_TEMPLATE.md`.

The command must not overwrite project-specific files without backup or explicit
`--force`.

## Readiness Model

`/loop-factory-init` runs setup and then a soft readiness check. Soft readiness
means missing optional tools are reported with impact and next steps, not treated
as setup blockers.

- Git and repo-local files are baseline requirements.
- GitHub/`gh` is recommended for issue-backed tasks, draft PRs, comments,
  labels, review threads, and durable evidence.
- Docker is recommended for integration tests, multi-service smoke tests,
  database-backed checks, browser/manual feature flows, and container logs.

`/loop-factory doctor` is stricter: use it when you want proof that a repo is
fully wired for normal issue-to-PR automation.
