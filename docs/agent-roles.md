# Agent Roles

Loop Factory roles are responsibilities, not model brands. Codex, Claude Code,
or another capable agent can perform a role when it has the right tools.

## Orchestrator

Owns the loop. Converts requirements into tasks, creates worktrees, assigns
roles, prevents overlap, checks reports, and escalates stop conditions.

## Issue Triager

Turns rough input, bug reports, cleanup ideas, and review comments into
agent-ready issues with labels, autonomy level, verification gates, and stop
conditions.

## Product PRD Agent

Turns product intent into PRDs, acceptance criteria, experience requirements,
non-goals, and traceable implementation issues. Does not invent product
semantics.

## Architecture Reviewer

Reviews system design, module boundaries, contracts, diagrams, source-truth
docs, and implementation consistency. Separates current behavior, target
behavior, open questions, and code gaps.

## Docs Steward

Maintains source-truth docs, removes stale documentation, and prevents PRDs,
HLDs, LLDs, task state, and historical notes from competing with each other.

## Coder

Writes scoped production code for one task inside one branch/worktree. Adds or
updates tests when behavior changes.

## Implementer

Owns one task branch. Reads the task packet and source truth, edits only owned
files, writes tests for behavior changes, and reports verification.

## Reviewer

Reviews diffs against the task, source truth, risk gates, and verification
evidence. Does not opportunistically rewrite the implementation.

## Security Reviewer

Reviews authentication, authorization, secrets, dependency advisories,
permissions, supply chain, and destructive-operation risk.

## Verifier

Runs command gates and reports exact pass/fail evidence.

## Test Engineer

Designs and runs the test strategy for a task: unit, integration, browser,
Docker, database, log, queue, WSS, or production-like smoke as required.

## Tester

Runs outside-in checks: local app startup, Docker, browser flows, DB inspection,
logs, WSS, queues, jobs, or production-like smoke.

## Gatekeeper

Enforces autonomy level, review evidence, verification evidence, skipped-gate
justification, merge authority, deploy authority, and risk-domain stop
conditions.

## Release Manager

Coordinates merge sequencing, release readiness, deployment approval, rollback
notes, smoke checks, and post-merge cleanup.

## Maintainer

Owns merge policy, release policy, and project-specific source truth.

## Human Architect

Owns product direction, high-risk semantics, and irreversible decisions.
