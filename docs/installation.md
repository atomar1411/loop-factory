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

Then open the project you want to enable and run the matching public command:

```text
Codex: /loop-factory
Claude Code plugin: /loop-factory:loop-factory
```

After npm publication:

```bash
npx loop-factory install
```

When the target project has a GitHub remote and you want to verify setup and
issue/PR access:

```text
Codex: /loop-factory doctor
Claude Code plugin: /loop-factory:loop-factory doctor
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

In that session, open the target repo and run `/loop-factory:loop-factory` to
enable it. Use `/loop-factory:loop-factory doctor` to verify setup. Claude Code
plugin skills are namespaced by plugin, so this is the standard plugin command
shape. The plugin skills and agent profiles are then used internally when the
request looks like a requirement, bug, review, product/PRD task,
architecture/design task, cleanup, or implementation request.

Claude Code agent profiles should also be available to the runtime:

```text
loop-orchestrator
loop-issue-triager
loop-product-prd
loop-architecture-reviewer
loop-docs-steward
loop-implementer
loop-reviewer
loop-security-reviewer
loop-verifier
loop-tester
loop-gatekeeper
loop-release-manager
```

Marketplace install commands will be documented after a public marketplace
release exists.

## Verify The Installed Target Repo

Inside a target repository, use:

```text
Codex: /loop-factory doctor
Claude Code plugin: /loop-factory:loop-factory doctor
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

The agent should infer the workflow, create durable issue/PR state when useful,
run the required Loop Factory profiles, and stop only at risk gates.

For automation, CI, or debugging the framework itself, the CLI can still create
issues or run a prepared issue:

```bash
loop-factory intake "Add retry-safe payment watcher handling" --target /path/to/project --create-issue
loop-factory run --target /path/to/project --issue 123 --agent codex
```
