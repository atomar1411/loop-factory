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

Create the same shape in a target repo:

```text
mkdir -p /tmp/my-project
cd /tmp/my-project
open Codex or Claude Code here
/loop-factory
/loop-factory doctor
```

`doctor` expects a Git repo with a GitHub `origin` remote when you want issue and
PR tracking. For a brand-new local project, run `init` first, then add the
remote before using `doctor`.
