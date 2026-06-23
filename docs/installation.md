# Installation And Setup

Loop Factory has two installation layers:

1. Install the plugin into an agent surface: Codex or Claude Code.
2. Use the public Loop Factory command from a target repository to install the
   repo-local docs, templates, and checks.

## Fast Path

Install Loop Factory once on your machine:

```bash
npx --yes github:atomar1411/loop-factory install
```

Then open the project you want to enable in Codex or Claude Code and run:

```text
/loop-factory
```

After npm publication:

```bash
npx loop-factory install
```

When the target project has a GitHub remote and you want to verify setup and
issue/PR access:

```text
/loop-factory doctor
```

## Machine Install

`install` keeps a stable checkout at `~/.loop-factory`, registers the local
plugin marketplace for Codex when available, and validates Claude Code plugin
metadata when Claude is installed.

```bash
npx --yes github:atomar1411/loop-factory install
```

## Project Setup

The public Loop Factory command installs repo-local operating files:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md`
- GitHub issue and PR templates

## Codex Details

Loop Factory includes a Codex plugin manifest:

```bash
cat .codex-plugin/plugin.json
```

The machine install command runs the local Codex marketplace steps for you when
the `codex` CLI is available:

```bash
codex plugin marketplace add ~/.loop-factory
codex plugin add loop-factory@loop-factory-local
```

Then start a new Codex thread so the plugin skills are loaded.

Useful checks:

```bash
codex plugin marketplace list
codex plugin list
```

From a project thread, use `/loop-factory` to enable the repo and
`/loop-factory doctor` to verify it.

Expected Codex public surface:

- `/loop-factory`
- `/loop-factory doctor`

Requirement intake, PR delivery, review, and verification are internal workflow
references. They should not appear as separate slash commands.

## Claude Code Details

Loop Factory includes a Claude Code plugin manifest:

```bash
claude plugin validate ~/.loop-factory
```

Until a public marketplace install is available, Claude Code can load the
machine checkout for a session:

```bash
claude --plugin-dir ~/.loop-factory
```

In that session, open the target repo and run `/loop-factory` to enable it. Use
`/loop-factory doctor` to verify setup. Loop Factory keeps its plugin name and
public skill name aligned so the public shortcut remains `/loop-factory` instead
of exposing internal component names. The plugin skills and agent profiles are
then used internally when the request looks like a requirement, bug, review,
product/PRD task,
architecture/design task, cleanup, or implementation request.

Claude Code active agent profiles should also be available to the runtime:

```text
loop-orchestrator
loop-implementer
loop-reviewer
loop-verifier
loop-tester
loop-gatekeeper
```

Issue triage, Product PRD, architecture review, docs stewardship, security
review, and release management are lazy specialist modes inside those active
profiles.

Marketplace install commands will be documented after a public marketplace
release exists.

## Verify The Installed Target Repo

Inside a target repository, use:

```text
/loop-factory doctor
```

For CI, scripting, or framework debugging, the CLI backstop is:

```bash
loop-factory doctor
git status --short --branch
```

For local checkout use:

```bash
node /path/to/loop-factory/packages/cli/bin/loop-factory.js doctor
```

This verifies required Loop Factory files, Git repo status, GitHub `origin`,
`gh` CLI auth, `gh repo view` access, and installed Codex or Claude Code
tooling when those CLIs are available.

## First Use

After the plugin is installed and the target repo is enabled, open Codex or
Claude Code in the target repo and describe the software work:

```text
Add retry-safe payment watcher handling.
Create PRDs for onboarding before implementation.
Review PR #123, address comments, and verify the branch.
Clean up stale docs and create tasks for architecture gaps.
```

The agent must infer the route. Small low-risk edits use Fast Path: inspect,
edit, verify, summarize. Complex, broad, risky, PR/review, or durable-tracking
work uses Factory Loop: task state, branch/worktree, profiles, review,
verification, and evidence.

For automation, CI, or debugging the framework itself, the CLI can still create
issues or run a prepared issue:

```bash
loop-factory intake "Add retry-safe payment watcher handling" --target /path/to/project --create-issue
loop-factory run --target /path/to/project --issue 123 --agent codex
```
