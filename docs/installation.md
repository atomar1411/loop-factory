# Installation And Setup

Loop Factory has two installation layers:

1. Install the plugin into an agent surface: Codex or Claude Code.
2. Bootstrap a target repository with Loop Factory docs, templates, and checks.

## Local Checkout

```bash
git clone https://github.com/loop-factory/loop-factory.git
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

`init` installs:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md`
- GitHub issue and PR templates
- optional GitHub workflow checks

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

In that session, invoke namespaced skills:

```text
/loop-factory:requirement-intake
/loop-factory:autonomous-pr-loop
/loop-factory:reviewer-loop
/loop-factory:verifier-loop
```

Claude Code plugin agents should also be available through `/agents`:

```text
loop-orchestrator
loop-issue-triager
loop-product-prd
loop-architecture-reviewer
loop-coder
loop-test-engineer
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

## First Use

Turn a rough requirement into an agent-ready issue body:

```bash
loop-factory intake "Add retry-safe payment watcher handling"
```

Then let the agent run the autonomous loop:

```text
Use Loop Factory to run this issue through the autonomous PR loop.
```

