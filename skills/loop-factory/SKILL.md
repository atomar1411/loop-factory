---
name: loop-factory
description: Public Loop Factory interface. Use when the user invokes /loop-factory in Codex or Claude Code, asks to enable Loop Factory in a repo, asks for a Loop Factory doctor check, or gives complex software work that should move through the Loop Factory operating model.
argument-hint: "[doctor|help|request]"
---

# Loop Factory

Turn complex software work into a Git-backed loop. Use `/loop-factory-init` for
first-run setup; internal profile names are not user commands.

## Public Interface

- `/loop-factory` enables Loop Factory in the current repo.
- `/loop-factory-init` initializes repo files and reports soft GitHub/Docker
  readiness.
- `/loop-factory doctor` verifies repo setup, GitHub connectivity, and plugin
  visibility.
- Extra text after the command is routed by task size and risk.

Features, bugs, reviews, PRDs, architecture, cleanup, and verification must
activate this skill when intent is clear.

## First Moves

1. Do lightweight triage only: inspect `git status --short --branch`,
   `git remote -v`, `AGENTS.md`, `CLAUDE.md`, `.github/`, `docs/`, and README
   files.
2. Classify: setup, retrofit, intake, issue-to-PR, review, or verification.
3. Load only the needed reference:
   - setup: `references/setup.md`
   - operating model: `references/operating-model.md`
   - requirement intake: `references/requirement-intake.md`
   - PR delivery loop: `references/autonomous-pr-loop.md`
   - review: `references/reviewer-loop.md`
   - verification: `references/verifier-loop.md`
   - risk gates: `references/risk-gates.md`
   - specialist modes: `references/specialist-profiles.md`

## Routing Contract

Choose the smallest loop that proves the work.

| Route | Use For | Required Shape |
| --- | --- | --- |
| Answer | Questions, explanations, brainstorming, one-line shell asks. | Answer normally. No issue, branch, or agents. |
| Fast Path | Small, low-risk edits: narrow scope, usually 1-2 files, clear intent, no product/money/security/deploy/architecture impact. | Inspect, edit, run relevant verification, summarize. No GitHub issue or agent fan-out required. |
| Factory Loop | Non-trivial work: broad/ambiguous scope, multiple areas, tests/design/docs needed, PR/review requested, new modules/strategies, tuning/research, or task likely benefits from durable tracking. | Issue or task packet, branch/worktree, profile sequence, review, verification, evidence. |
| Risk Gate | Product, money, legal, safety, production, secrets, service boundaries, destructive or irreversible actions. | Stop for decision, then use Factory Loop after approval. |

Do not force GitHub issues, worktrees, or agent fan-out for Fast Path work.
Do not use Fast Path for complex or risky work.

Factory Loop completion requires: task state, branch/worktree, profiles or
fallback, review, verification, skipped gates, residual risk, and next decision.

## Factory Loop Preflight

After choosing Factory Loop, the next durable action must be task state:

1. Create a draft GitHub issue from the rough request before broad source
   exploration, requirement Q&A, brainstorming, branch/worktree, design doc,
   commit, or code. If GitHub is unavailable or explicitly disabled, create a
   local task packet and say why.
2. Update that issue/task packet as discovery and decisions settle.
3. Only then create/enter a branch or worktree.
4. Write PRDs, specs, and plans to the target repo's canonical truth/design
   path or to issue/PR state. Tool-owned scratch/spec folders are not canonical
   project truth unless the repo explicitly says they are.
5. Loop Factory has precedence over helper skills. Helper skills can assist
   thinking, but cannot replace issue/task state, alter route order, or choose
   canonical doc paths.
6. If the work creates a PRD, design spec, source-truth doc, or strategy
   research plan, run reviewer/doc review before implementation unless the
   developer explicitly approves skipping that review.

Branch names, commits, chat plans, Superpowers specs, local markdown notes, and
memory are not substitutes for issue/task state.

## Rules

- Store project truth in the target repo, not private memory.
- Use GitHub issues and PRs as task state for Factory Loop work.
- Use one branch/worktree per Factory Loop implementation task.
- Continue until a stop condition.
- Stop for product, money, legal, safety, deployment, service-boundary, or
  irreversible decisions.
- Evidence before completion claims.
- Do not ask the developer to invoke Loop Factory again when intent is clear.
- Use CLI commands as internal automation only.
- Keep internal workflow names out of the public command surface.

## Internal Automation

CLI backstop:

```bash
node ~/.loop-factory/packages/cli/bin/loop-factory.js setup
node ~/.loop-factory/packages/cli/bin/loop-factory.js doctor --soft
```

Without a machine install, use the GitHub package directly:

```bash
npx --yes github:atomar1411/loop-factory doctor --soft
```
