# Installation

Loop Factory can be used three ways.

## Local Checkout

```bash
git clone https://github.com/loop-factory/loop-factory.git
cd loop-factory
node packages/cli/bin/loop-factory.js init --target /path/to/project
```

## npm

```bash
npx loop-factory init --target /path/to/project
```

## Codex Plugin

Install or load the repository as a Codex plugin. The plugin manifest is:

```text
.codex-plugin/plugin.json
```

The plugin exposes skills from:

```text
skills/
```

## Claude Code Plugin

During development:

```bash
claude --plugin-dir /path/to/loop-factory
```

After marketplace publication, install through the configured Claude Code
marketplace and invoke namespaced skills:

```text
/loop-factory:requirement-intake
/loop-factory:autonomous-pr-loop
```

