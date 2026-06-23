---
name: loop-factory
description: Public Loop Factory interface. Use when the user invokes /loop-factory in Codex or Claude Code, asks to enable Loop Factory in a repo, asks for a Loop Factory doctor check, or gives complex software work that should move through the Loop Factory operating model.
argument-hint: "[doctor|help|request]"
---

# Loop Factory

Use Loop Factory to turn complex software work into durable Git loops.

This is the only public Loop Factory slash command. Do not ask the developer to
invoke internal profiles such as requirement intake, PR loop, reviewer loop, or
verifier loop. Those are private workflow references loaded from this skill.

## Public Interface

- `/loop-factory` enables Loop Factory in the current repo.
- `/loop-factory doctor` verifies repo setup, GitHub connectivity, and plugin
  visibility.
- Any additional text after the command is treated as software work and runs
  the Loop Factory operating model after confirming the repo is enabled.

Normal feature, bug, review, PRD, architecture, cleanup, and verification work
must also activate this skill from the conversation when the intent is clear.

## First Moves

1. Inspect the target repo:
   - `git status --short --branch`
   - `git remote -v`
   - existing `AGENTS.md`, `CLAUDE.md`, `.github/`, `docs/`, and README files
2. Decide whether this is:
   - new repo setup,
   - existing repo retrofit,
   - requirement intake,
   - active issue-to-PR loop,
   - review or verification pass.
3. Load only the matching reference:
   - setup: `references/setup.md`
   - operating model: `references/operating-model.md`
   - requirement intake: `references/requirement-intake.md`
   - PR delivery loop: `references/autonomous-pr-loop.md`
   - review: `references/reviewer-loop.md`
   - verification: `references/verifier-loop.md`
   - risk gates: `references/risk-gates.md`

## Mandatory Loop Contract

For tracked software work, Loop Factory is not optional guidance. Tracked work
means a feature, bug, cleanup, PRD, architecture/design task, implementation,
PR review, or verification task.

Before editing files or claiming progress on tracked work:

1. Create or identify durable task state:
   - Prefer a GitHub issue when the repo has GitHub access.
   - Use a local task packet only when GitHub is unavailable or the developer
     explicitly asks not to create issues.
2. Select the agent profile or profile sequence:
   - always start with `loop-orchestrator` for broad or ambiguous work,
   - use `loop-issue-triager` before implementation when no issue exists,
   - use `loop-implementer`, `loop-reviewer`, `loop-verifier`, `loop-tester`,
     and `loop-gatekeeper` as the task requires.
3. Use the runtime's agent/subagent mechanism when available. If named agent
   profiles are not available, state that limitation and run the same phases
   sequentially in the main conversation.
4. Create or enter one branch/worktree per implementation task before edits.
5. Post or summarize evidence back to the issue, PR, or task packet.

Do not call work "Loop Factory complete" unless the report includes task state,
branch/worktree, selected profiles or fallback reason, review result,
verification result, skipped gates, residual risk, and next decision.

## Rules

- Store project truth in the target repo, not private memory.
- Use GitHub issues and PRs as task state whenever GitHub is available.
- Use one branch/worktree per task.
- Let agents continue until a stop condition.
- Stop for product, money, legal, safety, deployment, service-boundary, or
  irreversible decisions.
- Report evidence before claiming completion.
- Do not ask the developer to invoke Loop Factory again when intent is already
  clear.
- Use CLI commands as internal automation only when useful; do not make them the
  normal developer interface.
- Keep internal workflow names out of the public command surface.

## Internal Automation

Use the CLI for CI, scripting, framework debugging, and durable issue creation
when appropriate:

```bash
npx loop-factory setup
npx loop-factory doctor
```

If the package is checked out locally:

```bash
cd /path/to/repo
node /path/to/loop-factory/packages/cli/bin/loop-factory.js setup
node /path/to/loop-factory/packages/cli/bin/loop-factory.js doctor
```
