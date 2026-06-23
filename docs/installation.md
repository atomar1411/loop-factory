# Installation And Setup

Loop Factory has two installation layers:

1. Install the plugin into an agent surface: Codex or Claude Code.
2. Bootstrap a target repository with Loop Factory docs, templates, and checks.

## Local Checkout

```bash
git clone https://github.com/atomar1411/loop-factory.git
cd loop-factory
npm run check
```

## Bootstrap A Target Repository

From this repository:

```bash
node packages/cli/bin/loop-factory.js init --target /path/to/project
node packages/cli/bin/loop-factory.js doctor --target /path/to/project
```

After npm publication:

```bash
npx loop-factory init --target /path/to/project
npx loop-factory doctor --target /path/to/project
```

For the full human setup flow:

```bash
loop-factory setup --target /path/to/project
```

`init` installs:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md`
- GitHub issue and PR templates

## Install In Codex

Loop Factory includes a Codex plugin manifest:

```bash
cat .codex-plugin/plugin.json
```

For local development, add this checkout as a Codex marketplace and install the
plugin from it:

```bash
codex plugin marketplace add /path/to/loop-factory
codex plugin add loop-factory@loop-factory-local
```

Then start a new Codex thread so the plugin skills are loaded.

Useful checks:

```bash
codex plugin marketplace list
codex plugin list
loop-factory doctor --target /path/to/project --agent codex
```

Expected plugin skills:

- `loop-factory`
- `requirement-intake`
- `autonomous-pr-loop`
- `reviewer-loop`
- `verifier-loop`

## Install In Claude Code

Loop Factory includes a Claude Code plugin manifest:

```bash
claude plugin validate /path/to/loop-factory
```

For local development or review, load it for one session:

```bash
claude --plugin-dir /path/to/loop-factory
```

In that session, speak normally in the target repo. The plugin skills and
agents are used internally when the prompt looks like a requirement, bug,
review, product/PRD task, architecture/design task, cleanup, or implementation
request.

Claude Code plugin agents should also be available to the runtime:

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

After marketplace publication, install through the configured Claude Code
marketplace:

```bash
claude plugin marketplace add <marketplace-source>
claude plugin install loop-factory@<marketplace-name>
```

## Verify The Installed Target Repo

Inside a target repository:

```bash
loop-factory doctor
git status --short --branch
```

For local checkout use:

```bash
node /path/to/loop-factory/packages/cli/bin/loop-factory.js doctor --target .
```

This verifies required Loop Factory files, Git repo status, GitHub `origin`,
`gh` CLI auth, and `gh repo view` access. Use `--agent codex`, `--agent claude`,
or `--agent both` to include plugin/tooling checks.

## First Use

After the plugin is installed and the target repo is bootstrapped, open Codex or
Claude Code in the target repo and speak normally:

```text
Add retry-safe payment watcher handling.
Create PRDs for onboarding before implementation.
Review PR #123, address comments, and verify the branch.
Clean up stale docs and create tasks for architecture gaps.
```

The agent should infer the workflow, create durable issue/PR state when useful,
run the required Loop Factory roles, and stop only at risk gates.

For automation, CI, or debugging the framework itself, the CLI can still create
issues or run a prepared issue:

```bash
loop-factory intake "Add retry-safe payment watcher handling" --target /path/to/project --create-issue
loop-factory run --target /path/to/project --issue 123 --agent codex
```
