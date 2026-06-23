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
npx --yes github:atomar1411/loop-factory init --target /tmp/my-project
npx --yes github:atomar1411/loop-factory doctor --target /tmp/my-project
```

`doctor` expects a Git repo with a GitHub `origin` remote when you want issue and
PR tracking. For a brand-new local project, run `init` first, then add the
remote before using `doctor`.
