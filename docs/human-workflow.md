# Human Workflow

This is the normal Loop Factory path for a human developer or architect.

## 1. Install Loop Factory

Clone the framework:

```bash
git clone https://github.com/loop-factory/loop-factory.git
cd loop-factory
npm run check
```

Install the plugin in the agent surface you use.

Codex:

```bash
codex plugin marketplace add /path/to/loop-factory
codex plugin add loop-factory@loop-factory-local
```

Claude Code, local session:

```bash
claude --plugin-dir /path/to/loop-factory
```

## 2. Bootstrap Your Project

```bash
loop-factory setup --target /path/to/project
```

For local checkout before npm publication:

```bash
node /path/to/loop-factory/packages/cli/bin/loop-factory.js setup --target /path/to/project
```

This installs the repo-local operating files:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md`
- GitHub issue and PR templates

## 3. Verify GitHub Connectivity

Inside the target repo or with `--target`:

```bash
loop-factory doctor --target /path/to/project
```

This checks:

- required Loop Factory files,
- Git repo status,
- `origin` remote,
- whether `origin` is a GitHub repo,
- `gh` CLI installation,
- `gh auth status`,
- `gh repo view` access.

To also check agent plugin availability:

```bash
loop-factory doctor --target /path/to/project --agent codex
loop-factory doctor --target /path/to/project --agent claude
loop-factory doctor --target /path/to/project --agent both
```

## 4. Give A Requirement As A Prompt

Use rough language:

```bash
loop-factory intake "Make wallet payment watcher retry-safe and prevent duplicate confirmed entries after worker restart" --target /path/to/project
```

This prints an agent-ready issue body.

To create a real GitHub issue:

```bash
loop-factory intake "Make wallet payment watcher retry-safe and prevent duplicate confirmed entries after worker restart" \
  --target /path/to/project \
  --create-issue
```

## 5. Run The Agent Loop

After issue creation:

```bash
loop-factory run --target /path/to/project --issue 123 --agent codex
```

This prints the exact agent command. To execute it directly:

```bash
loop-factory run --target /path/to/project --issue 123 --agent codex --execute
```

For Claude Code:

```bash
loop-factory run --target /path/to/project --issue 123 --agent claude
```

## 6. Human Role

The human does not manually coordinate every step. The human reviews only:

- stop-condition decisions,
- product or architecture truth,
- merge/deploy authority,
- high-risk behavior,
- final PR when project policy requires it.

