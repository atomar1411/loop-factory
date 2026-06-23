# Natural Language Activation

Loop Factory is conversation-first. Humans should not need to remember CLI
commands, slash commands, or skill names during normal work.

## Activation Rule

When an agent in a Loop Factory-enabled repo sees a message that looks like new
software work, it should start the Loop Factory workflow automatically.

Examples:

- "Fix checkout retry behavior."
- "Create PRDs for the onboarding flow."
- "Review this PR and address comments."
- "Clean up dead branches and stale docs."
- "Start agents on the payment watcher task."
- "This bug is happening in production."
- "Build the dashboard settings page."
- "Create tasks for these architecture gaps."

The human may mention Loop Factory, but does not have to.

## What The Agent Does

```text
human natural-language request
  -> detect requirement, bug, review, cleanup, design, or implementation intent
  -> load AGENTS.md / CLAUDE.md and docs/agents
  -> verify Git/GitHub connectivity when needed
  -> create or update issue/task packet when durable state is needed
  -> run the appropriate loop roles
  -> post evidence to issue/PR
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

For these, answer normally. Offer Loop Factory only if turning the topic into
tracked work would clearly help.

## Stop Conditions

Ask the human only when:

- product, money, legal, safety, deployment, service-boundary, or irreversible
  behavior needs a decision,
- Git/GitHub access is missing,
- the work is too broad to split safely,
- the task conflicts with project truth,
- merge or deploy authority is required.

## CLI Role

The CLI is for setup, CI, scripting, and agent-internal automation. It is not
the primary human interface.

