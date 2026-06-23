# Loop Factory

Loop Factory is an open agent operating model for turning software requirements
into durable Git loops:

```text
requirement
  -> intake
  -> issue and task packet
  -> worktree and branch
  -> implementation
  -> review
  -> verification
  -> PR evidence
  -> merge or escalation
  -> learning captured in source truth
```

The project is designed to install into new or existing repositories and give
Codex, Claude Code, and human teammates one shared way to work.

## Goals

- Make humans architects and exception approvers, not task traffic managers.
- Use GitHub issues and PRs as durable task state.
- Use source files and committed docs as project truth.
- Run one task per branch and worktree.
- Let agents create tasks, push branches, open draft PRs, review diffs, fix
  comments, and rerun verification.
- Stop only on explicit risk gates: product semantics, money, safety, legal,
  production config, service boundaries, or irreversible operations.

## Install Shape

Loop Factory ships three layers:

- Plugin skills for Codex and Claude Code.
- Repo templates for `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`, issue forms,
  PR templates, and truth docs.
- A small CLI for bootstrapping and checking a target repository.

```bash
npx loop-factory init
npx loop-factory doctor
npx loop-factory intake "Add retry-safe payment watcher handling"
```

The CLI is intentionally thin. The primary runtime is still your agent surface:
Codex, Claude Code, GitHub, tests, and the target repo.

## Repository Layout

```text
.codex-plugin/          Codex plugin manifest
.claude-plugin/         Claude Code plugin manifest
agents/                 Claude Code plugin agents
docs/                   Framework architecture and operating docs
hooks/                  Optional plugin hooks
packages/cli/           Bootstrap and validation CLI
skills/                 Codex and Claude-compatible skills
templates/              Files copied into target repos
examples/               Minimal target repo examples
```

## Status

This repository is in foundation stage. The current version defines the
architecture, installable plugin structure, core skills, and bootstrap CLI.

