# Automatic Workflow Activation

Loop Factory is work-first. A developer should not need to remember CLI
commands, slash commands, or skill names before agents can coordinate on a real
software problem.

## Activation Rule

When an agent in a Loop Factory-enabled repo sees software work, it must choose
the smallest Loop Factory route that proves the work.

Examples:

- "Fix checkout retry behavior."
- "Create PRDs for the onboarding flow."
- "Review this PR and address comments."
- "Clean up dead branches and stale docs."
- "Start agents on the payment watcher task."
- "This bug is happening in production."
- "Build the dashboard settings page."
- "Create tasks for these architecture gaps."
- "Create and test a new trading strategy."

The developer may mention Loop Factory, but does not have to.

## What Counts As A Failure

The agent did not use Loop Factory correctly if it:

- forces GitHub issues, worktrees, or agent fan-out for a small Fast Path task,
- runs complex or risky implementation inline without task state,
- skips GitHub issue creation for Factory Loop work while GitHub is available,
- creates branch/commit/design doc/code before Factory Loop issue/task state,
- treats chat plans, Superpowers specs, local markdown notes, branch names, or
  commits as issue/task state,
- starts implementation from PRD/design/source-truth/strategy research docs
  without reviewer/doc review unless the developer explicitly skipped review,
- does not route work through profile phases or explain why profiles were
  unavailable when the Factory Loop is required,
- claims review or verification without evidence,
- reports Factory Loop completion without issue/task, branch/worktree, review,
  verification, skipped gates, and residual risk.

## What The Agent Does

```text
developer software request
  -> classify Answer, Fast Path, Factory Loop, or Risk Gate
  -> load AGENTS.md / CLAUDE.md and docs/agents
  -> Fast Path: inspect, edit, verify, summarize
  -> Factory Loop: task state first, then branch/worktree, profiles, review, verification
  -> ask only at stop conditions
```

## When Not To Activate

Do not start a full Loop Factory workflow for:

- simple factual questions,
- quick explanations,
- casual chat,
- local one-line shell requests,
- requests that explicitly say not to create tasks or code changes,
- exploratory brainstorming before the user asks to turn it into work.

For these, answer normally. Offer Factory Loop only if durable task state would
clearly help.

## Stop Conditions

Ask the developer only when:

- product, money, legal, safety, deployment, service-boundary, or irreversible
  behavior needs a decision,
- Git/GitHub access is missing,
- the work is too broad to split safely,
- the task conflicts with project truth,
- merge or deploy authority is required.

## CLI Role

The CLI is for setup, CI, scripting, and agent-internal automation. It is not
the primary developer interface.
