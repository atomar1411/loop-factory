# Agent Roles

Loop Factory roles are responsibilities, not model brands. Codex, Claude Code,
or another capable agent can perform a role when it has the right tools.

## Orchestrator

Owns the loop. Converts requirements into tasks, creates worktrees, assigns
roles, prevents overlap, checks reports, and escalates stop conditions.

## Implementer

Owns one task branch. Reads the task packet and source truth, edits only owned
files, writes tests for behavior changes, and reports verification.

## Reviewer

Reviews diffs against the task, source truth, risk gates, and verification
evidence. Does not opportunistically rewrite the implementation.

## Verifier

Runs command gates and reports exact pass/fail evidence.

## Tester

Runs outside-in checks: local app startup, Docker, browser flows, DB inspection,
logs, WSS, queues, jobs, or production-like smoke.

## Maintainer

Owns merge policy, release policy, and project-specific source truth.

## Human Architect

Owns product direction, high-risk semantics, and irreversible decisions.

