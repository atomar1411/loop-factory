# Loop Factory

This repo uses a Git-first autonomous loop.

Loop Factory is work-first. Agents route software work by size and risk.

## Source Of Truth

- Product and architecture truth: source-truth docs (`truth/` or `docs/truth/`)
- Agent operating rules: `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`
- Task state: GitHub issues and PRs
- Proof: CI, local command output summarized in PRs, committed tests
- Memory: hint only

## Loop

```text
requirement
  -> intake
  -> task packet
  -> branch/worktree
  -> implementation
  -> review
  -> verification
  -> PR
  -> merge or escalation
```

## Activation

Start automatically for software work. Do not require commands or skill names.
Do not activate for simple questions or explicit discussion-only asks.

## Routes

| Route | Use For | Required Shape |
| --- | --- | --- |
| Answer | Questions, explanations, brainstorming, one-line shell asks. | Answer normally. |
| Fast Path | Small, low-risk edits, usually 1-2 files, clear intent, no risk domain. | Inspect, edit, verify, summarize. |
| Factory Loop | Complex, broad, ambiguous, multi-area, PR/review requested, or durable tracking useful. | Issue/task packet, branch/worktree, profiles, review, verification, evidence. |
| Risk Gate | Product, money, legal, safety, production, secrets, service boundaries, destructive actions. | Stop for decision, then Factory Loop after approval. |

Do not force GitHub issues, worktrees, or agent fan-out for Fast Path work. Do
not use Fast Path for complex or risky work.

## Autonomy Levels

- `A0 Advisory`: inspect and propose only.
- `A1 Local Patch`: edit and commit locally.
- `A2 Draft PR`: push branch and open draft PR.
- `A3 Ready PR`: mark PR ready after gates.
- `A4 Auto-Merge`: merge low-risk PRs by policy.
- `A5 Deploy Loop`: deploy by explicit policy.

Default: `A2 Draft PR`.

## Required Evidence

Fast Path reports need changed files, verification, and risk. Factory Loop
reports need issue/task packet, branch/worktree, profiles or fallback, changed
files, review, verification, skipped gates, risk, and decisions.
