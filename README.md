# Loop Factory

Loop Factory is a Git-first operating model for software teams using Codex,
Claude Code, or other coding agents.

A human describes the work in normal language. The agents turn that work into
issues, task packets, branches, pull requests, reviews, verification, and
evidence. The human stays in control of product decisions, risk decisions,
merge, and deployment.

The goal is simple: make AI-assisted software work observable, repeatable, and
reviewable.

## Why This Exists

AI coding breaks down when important work lives only in chat.

Context gets stale. Agents make assumptions. Review happens too late. Two
threads touch the same files. Tests are skipped or summarized vaguely. Humans
become traffic managers, copying context between tools and asking every agent
what happened.

Loop Factory moves the work into durable project artifacts:

- source code,
- source-truth docs,
- GitHub issues,
- branches and worktrees,
- pull requests,
- checks, review comments, and verification evidence.

Private model memory and scratch notes may help an agent think, but they are not
project truth.

## The Core Idea

Loop Factory is built around two ideas: a loop and a factory.

### What Is A Loop?

A loop is a repeatable path from intent to evidence.

```text
human request
  -> requirement intake
  -> issue or task packet
  -> branch and worktree
  -> implementation
  -> review
  -> verification
  -> pull request evidence
  -> human decision, merge, or escalation
```

The loop is not just a checklist. It is a control system. At every stage, the
agent knows what it owns, what it must read, what it must prove, and when it
must stop.

### What Is A Factory?

A factory is a set of roles and handoffs that make the loop reliable.

Instead of one long-running chat trying to do everything, Loop Factory gives the
work to clear roles:

| Role | Responsibility |
| --- | --- |
| Orchestrator | Splits work, creates task packets, routes agents, prevents overlap. |
| Issue Triager | Turns rough requests, bugs, and review comments into workable issues. |
| Product PRD Agent | Writes product requirements, acceptance criteria, and non-goals. |
| Architecture Reviewer | Checks service boundaries, contracts, diagrams, and source truth. |
| Coder / Implementer | Makes scoped changes in one branch or worktree. |
| Reviewer | Reviews the diff against the task, docs, and evidence. |
| Test Engineer / Verifier | Runs tests, checks logs, inspects systems, and records proof. |
| Gatekeeper | Enforces risk gates, autonomy level, evidence, and merge/deploy rules. |
| Release Manager | Coordinates release readiness, rollout notes, and cleanup. |

The same runtime can play several roles, but the responsibilities stay separate.
That separation is what keeps the work auditable.

## Principles

Loop Factory follows a few hard rules.

1. **Git is the coordination spine.** Issues, branches, commits, PRs, and checks
   carry the state of the work.
2. **Source truth beats chat.** Product, architecture, deployment, and agent
   rules belong in committed files.
3. **One task owns one lane.** A meaningful task gets one branch and, when
   needed, one worktree.
4. **Agents should not overlap blindly.** Parallel work needs explicit owned
   files, scope, and risk boundaries.
5. **Evidence comes before completion.** Tests, logs, screenshots, DB checks,
   Docker checks, or production smoke results must be reported honestly.
6. **Humans decide meaning and risk.** Agents can move fast inside the loop, but
   they stop for product semantics, money, legal, safety, security, deployment,
   service boundaries, and irreversible operations.
7. **Natural language is the interface.** Humans should not need to remember a
   special command to start normal work.

## The Human Role

Humans become friction when they have to manually coordinate every handoff:

- rewrite requirements for each agent,
- remind agents which docs matter,
- ask whether tests ran,
- copy review comments between tools,
- track branches and open PRs by memory,
- decide whether vague claims are trustworthy.

Loop Factory removes that coordination burden. The human gives direction,
reviews product and architecture, approves risky decisions, reviews PRs when
policy requires it, and controls merge or deployment.

The human is not removed from the system. The human is moved to the decisions
where judgment matters.

## How Work Starts

After Loop Factory is installed in a repo, the human speaks normally inside
Codex or Claude Code:

```text
Fix checkout retry behavior.
Create PRDs for the onboarding experience before code changes.
Review PR #42, address comments, and verify the branch.
Clean up stale docs and create tasks for the architecture gaps you find.
```

The agent should infer whether the prompt is a requirement, bug, review,
cleanup, product task, architecture task, implementation task, or verification
task. If durable state is useful, it creates or updates the issue, task packet,
branch, PR, or evidence trail.

Commands exist for setup, CI, and automation. They are not the daily human
interface.

## How Humans Track Work

Loop Factory uses GitHub as the normal tracking surface.

- **Issues** describe the task, acceptance criteria, owned scope, forbidden
  changes, verification, and stop conditions.
- **Branches and worktrees** isolate implementation work.
- **Pull requests** show the diff, linked issue, review result, commands run,
  verification result, skipped gates, and residual risk.
- **Review comments** capture design, code, product, security, and test
  findings.
- **Checks** carry repeatable validation.
- **Final reports** summarize changed files, evidence, and decisions needed.

No hidden dashboard is required for correctness. A dashboard can be useful later,
but it should mirror GitHub and committed files, not replace them.

## When Agents Stop

Agents should continue through routine implementation, review, and verification.
They should stop and ask when a decision affects:

- product semantics,
- money movement,
- legal or compliance behavior,
- safety or data loss,
- security posture,
- production deployment or secrets,
- service boundaries,
- irreversible operations,
- merge or deploy authority.

A stop request should explain the decision, why it matters, the options, the
recommended path, the risk if wrong, and the files or systems affected.

## What Gets Installed In A Repo

Loop Factory bootstraps a target repo with operating files that agents and
humans can inspect in Git:

```text
AGENTS.md
CLAUDE.md
docs/agents/*
docs/truth/README.md
.github/ISSUE_TEMPLATE/requirement.yml
.github/PULL_REQUEST_TEMPLATE.md
.github/workflows/loop-factory-check.yml
```

These files tell agents how to load context, how to form task packets, how to
respect risk gates, and how to report evidence.

## Install

Clone and validate Loop Factory:

```bash
git clone https://github.com/loop-factory/loop-factory.git
cd loop-factory
npm run check
```

Install the plugin in Codex:

```bash
codex plugin marketplace add "$(pwd)"
codex plugin add loop-factory@loop-factory-local
```

Load the plugin in Claude Code:

```bash
claude --plugin-dir "$(pwd)"
```

Bootstrap a target project:

```bash
node packages/cli/bin/loop-factory.js setup --target /path/to/project
```

Verify the target project:

```bash
node packages/cli/bin/loop-factory.js doctor --target /path/to/project --agent both
```

After npm publication, the same setup will be available through:

```bash
npx loop-factory setup --target /path/to/project
npx loop-factory doctor --target /path/to/project --agent both
```

See [Installation And Setup](docs/installation.md) for the full install path.

## Use

Open Codex or Claude Code in the target repo and speak normally:

```text
Build the account settings page and open a draft PR.
Turn this checkout bug into tasks and start the fix.
Review the current PR against the product docs and test evidence.
Create architecture docs first; do not change code until I approve them.
```

The agent should load the repo instructions, inspect source truth, create durable
task state when useful, choose the right roles, work in a clean lane, verify the
result, and report what remains.

## Project Layout

```text
.codex-plugin/          Codex plugin manifest
.claude-plugin/         Claude Code plugin manifest
agents/                 Claude Code plugin agent role prompts
docs/                   Framework architecture and operating docs
hooks/                  Optional plugin hooks
packages/cli/           Bootstrap, doctor, and automation CLI
scripts/                Validation helpers
skills/                 Codex and Claude-compatible skills
templates/              Files copied into target repos
examples/               Minimal target repo examples
```

## Documentation

- [Natural Language Activation](docs/natural-language-activation.md)
- [Human Workflow](docs/human-workflow.md)
- [Installation And Setup](docs/installation.md)
- [Autonomous Loop Model](docs/loop-model.md)
- [Agent Roster](docs/agent-roster.md)
- [Architecture](docs/architecture.md)

## Status

Loop Factory is in foundation stage. The current version defines the operating
model, plugin structure, core skills, agent roles, repo templates, and bootstrap
CLI.

It is meant to be practical before it is fancy: source truth first, GitHub as
the tracking surface, evidence before completion, and humans in control of
important decisions.
