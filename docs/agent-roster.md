# Agent Roster

Loop Factory uses a role roster. A role can be implemented by Codex, Claude
Code, another agent runtime, or a human teammate.

## Core Coordination

| Role | Purpose |
| --- | --- |
| Orchestrator | Owns the loop, splits work, assigns roles, prevents overlap, escalates stop conditions. |
| Issue Triager | Converts rough requirements, bugs, and review comments into agent-ready issues. |
| Gatekeeper | Enforces autonomy level, evidence, risk, merge, and deploy gates. |
| Release Manager | Coordinates merge order, release readiness, deploy approval, rollback notes, and cleanup. |

## Product And Design

| Role | Purpose |
| --- | --- |
| Product PRD Agent | Writes PRDs, acceptance criteria, product non-goals, and issue slices. |
| Architecture Reviewer | Reviews service boundaries, contracts, source truth, diagrams, and design consistency. |
| Docs Steward | Maintains source-truth docs and removes stale or duplicated documentation. |

## Engineering

| Role | Purpose |
| --- | --- |
| Coder | Implements scoped source changes in one branch/worktree. |
| Implementer | General implementation role, useful when a task mixes code and docs. |
| Reviewer | Reviews diffs against task packets, source truth, and evidence. |
| Security Reviewer | Reviews auth, secrets, dependency advisories, permissions, and destructive operations. |

## Verification

| Role | Purpose |
| --- | --- |
| Verifier | Runs command gates and reports exact evidence. |
| Test Engineer | Designs and runs unit, integration, browser, Docker, DB, and log-based tests. |
| Tester | Outside-in product verification role for app, Docker, DB, browser, WSS, and smoke checks. |

## Routing Defaults

- New requirement: Issue Triager -> Product PRD Agent when product behavior is unclear.
- Architecture/design task: Architecture Reviewer + Docs Steward.
- Normal code task: Coder -> Reviewer -> Verifier.
- Product flow task: Coder -> Reviewer -> Test Engineer -> Gatekeeper.
- Security or dependency task: Coder -> Security Reviewer -> Verifier -> Gatekeeper.
- Release/deploy task: Gatekeeper -> Release Manager -> Tester.

## Codex Usage

When the runtime supports subagents, spawn the relevant role with the task
packet, owned files, forbidden scope, verification gates, and stop conditions.

## Claude Code Usage

Claude Code plugin agents live in `agents/` and should be available internally
when the plugin is loaded.
