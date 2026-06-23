# Context Loading

## Required Startup

1. Read `AGENTS.md`.
2. Read `docs/agents/loop-factory.md`.
3. Read the issue, PR, task packet, or developer request.
4. Read only the truth docs and source files needed for the task.
5. Run:

```bash
git status --short --branch
```

If the developer request is the only input, classify it as Answer, Fast Path,
Factory Loop, or Risk Gate. Create issue/task state before Factory Loop edits
unless GitHub is unavailable or disabled.

## Context Inputs

Task packets should identify:

- objective,
- owned files or area,
- forbidden changes,
- truth docs to read,
- verification gates,
- autonomy level,
- stop conditions.

## Memory Rule

Memory can orient but cannot justify code changes. If memory conflicts with
Git, Git wins unless a maintainer says otherwise.
