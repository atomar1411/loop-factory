# Human Workflow

This is the normal Loop Factory path for a human developer or architect.

## 1. Install Loop Factory

Clone the framework:

```bash
git clone https://github.com/atomar1411/loop-factory.git
cd loop-factory
npm run check
```

Install the plugin in the agent surface you use.

Codex:

```bash
codex plugin marketplace add /path/to/loop-factory
codex plugin add loop-factory@loop-factory-local
```

Claude Code, local session:

```bash
claude --plugin-dir /path/to/loop-factory
```

## 2. Bootstrap Your Project

```bash
loop-factory setup --target /path/to/project
```

For local checkout before npm publication:

```bash
node /path/to/loop-factory/packages/cli/bin/loop-factory.js setup --target /path/to/project
```

This installs the repo-local operating files:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md`
- GitHub issue and PR templates

## 3. Verify GitHub Connectivity

Inside the target repo or with `--target`:

```bash
loop-factory doctor --target /path/to/project
```

This checks:

- required Loop Factory files,
- Git repo status,
- `origin` remote,
- whether `origin` is a GitHub repo,
- `gh` CLI installation,
- `gh auth status`,
- `gh repo view` access.

To also check agent plugin availability:

```bash
loop-factory doctor --target /path/to/project --agent codex
loop-factory doctor --target /path/to/project --agent claude
loop-factory doctor --target /path/to/project --agent both
```

## 4. Give A Requirement As A Prompt

Open Codex or Claude Code in the target repo and use rough language. Do not
invoke a slash command or remember a skill name.

```text
Make wallet payment watcher retry-safe and prevent duplicate confirmed entries after worker restart.
Create PRDs for the new onboarding experience before code changes.
Review PR #123, address the comments, and verify the branch.
Clean up stale docs and create tasks for architecture gaps you find.
```

The agent decides whether this is requirement intake, PRD/product work,
architecture/design work, implementation, review, verification, or cleanup.
When durable state is useful, it creates or updates GitHub issues, task packets,
branches, draft PRs, and evidence.

## 5. Run The Agent Loop

The human does not run the loop manually. The agent should:

- read `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`, and source truth,
- split broad requests into agent-sized work,
- create one branch/worktree per task when implementation starts,
- run product, architecture, coding, review, tester, verifier, and gatekeeper
  roles as needed,
- post issue/PR evidence,
- stop only at declared stop conditions.

The human can steer in normal language:

```text
This is approved, continue to implementation.
Pause here; I want to review the PRD first.
Create separate issues for those gaps.
Do not change code yet, only document findings.
```

## 6. Automation Commands

For CI, scripting, or agent-internal automation, the CLI still exposes
`intake` and `run`. These are not the normal human UX.

```bash
loop-factory intake "Make wallet payment watcher retry-safe" --target /path/to/project --create-issue
loop-factory run --target /path/to/project --issue 123 --agent codex
```

## 7. Human Role

The human does not manually coordinate every step. The human reviews only:

- stop-condition decisions,
- product or architecture truth,
- merge/deploy authority,
- high-risk behavior,
- final PR when project policy requires it.
