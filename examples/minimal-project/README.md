# Minimal Project Example

This folder shows the smallest target repo shape after Loop Factory setup.

```text
AGENTS.md
CLAUDE.md
docs/
  agents/
    loop-factory.md
    context-loading.md
    task-packet-template.md
  truth/
    README.md
.github/
  ISSUE_TEMPLATE/
    requirement.yml
  PULL_REQUEST_TEMPLATE.md
```

Run from the Loop Factory repo:

```bash
node packages/cli/bin/loop-factory.js init --target /tmp/my-project
node packages/cli/bin/loop-factory.js doctor --target /tmp/my-project
```

