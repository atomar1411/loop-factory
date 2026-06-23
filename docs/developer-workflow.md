# Developer Workflow

This is the normal Loop Factory path for a developer or architect.

## 1. Install Loop Factory

Install Loop Factory once on your machine:

```bash
npx --yes github:atomar1411/loop-factory install
```

After npm publication:

```bash
npx loop-factory install
```

## 2. Enable Your Project

Open the project in your agent surface and run:

```text
Codex: /loop-factory
Claude Code plugin: /loop-factory:loop-factory
```

This installs the repo-local operating files:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md`
- GitHub issue and PR templates

For CI, scripting, or framework debugging, the CLI backstop is:

```bash
npx loop-factory setup
```

## 3. Verify GitHub Connectivity

After the target repo has a GitHub `origin` remote, verify connectivity:

```text
Codex: /loop-factory doctor
Claude Code plugin: /loop-factory:loop-factory doctor
```

This checks:

- required Loop Factory files,
- Git repo status,
- `origin` remote,
- whether `origin` is a GitHub repo,
- `gh` CLI installation,
- `gh auth status`,
- `gh repo view` access,
- Codex or Claude Code plugin visibility when those CLIs are installed.

## 4. Give The Software Work

Open Codex or Claude Code in the target repo and describe the work.

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

The developer does not run the loop manually. The agent should:

- read `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`, and source truth,
- split broad requests into agent-sized work,
- create one branch/worktree per task when implementation starts,
- run the smallest useful set of agent profiles,
- post issue/PR evidence,
- stop only at declared stop conditions.

The developer can steer the loop:

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

## 7. Developer Role

The developer does not manually coordinate every step. The developer reviews only:

- stop-condition decisions,
- product or architecture truth,
- merge/deploy authority,
- high-risk behavior,
- final PR when project policy requires it.
