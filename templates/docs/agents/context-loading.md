# Context Loading

Agents must start from explicit repo context.

## Required Startup

1. Read `AGENTS.md`.
2. Read `docs/agents/loop-factory.md`.
3. Read the issue, PR, task packet, or human prompt.
4. Read only the truth docs and source files needed for the task.
5. Run:

```bash
git status --short --branch
```

If the human prompt is the only input, infer whether it is a requirement,
review, bug, cleanup, design, product, or implementation task. Create durable
issue/task state when useful and safe.

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

Private memory and previous chat context may orient an agent, but cannot justify
code changes. If memory conflicts with Git, Git wins unless a maintainer says
otherwise.
