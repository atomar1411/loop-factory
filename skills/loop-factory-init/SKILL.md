---
name: loop-factory-init
description: Use when the user invokes /loop-factory-init, asks to initialize Loop Factory in a repo, or wants first-run GitHub and Docker readiness checks without blocking setup.
argument-hint: "[help]"
---

# Loop Factory Init

First-run project setup and readiness check. This is a public convenience
command for enabling a repo before real work starts.

## Behavior

1. Run the repo setup scaffold.
2. Run a soft readiness check.
3. Report what is ready, what is missing, and how missing tools affect the loop.
4. Continue even when GitHub or Docker is unavailable.

## Commands

Prefer the machine install:

```bash
node ~/.loop-factory/packages/cli/bin/loop-factory.js setup
node ~/.loop-factory/packages/cli/bin/loop-factory.js doctor --soft
```

Without a machine install:

```bash
npx --yes github:atomar1411/loop-factory setup
npx --yes github:atomar1411/loop-factory doctor --soft
```

## Readiness Meaning

- GitHub/`gh` access is recommended for creating issues, PRs, and durable task
  state. When present, it can create/update issues, open draft PRs, inspect PR
  state, apply labels, and post evidence. If it is missing, continue with local
  task packets and tell the developer to run `gh auth login` when they want
  issue/PR automation.
- Docker is recommended for integration tests, service-level verification, and
  manual feature-flow testing. When present, it can run service stacks,
  databases, integration tests, browser/manual feature-flow checks, and
  container log inspection. If it is missing, continue and mark Docker-based
  verification as unavailable.
- Missing optional readiness should not block setup.

After init, normal software work uses `/loop-factory` or plain developer
requests. Use `/loop-factory doctor` only when strict verification is needed.
