# Developer Workflow

This is the normal Loop Factory path for a developer or architect.

## 1. Install Loop Factory

Install Loop Factory once on your machine:

```bash
npx --yes github:atomar1411/loop-factory install
```

## 2. Enable Your Project

Open the project in your agent surface and run:

```text
/loop-factory
```

This installs the repo-local operating files:

- `AGENTS.md`
- `CLAUDE.md`
- `docs/agents/*`
- `docs/truth/README.md` unless the project already uses root `truth/`
- GitHub issue and PR templates

For CI, scripting, or framework debugging, the CLI backstop is:

```bash
node ~/.loop-factory/packages/cli/bin/loop-factory.js setup
```

## 3. Verify GitHub Connectivity

After the target repo has a GitHub `origin` remote, verify connectivity:

```text
/loop-factory doctor
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

The agent first chooses a route:

- **Answer** for questions and discussion.
- **Fast Path** for small, clear, low-risk edits.
- **Factory Loop** for complex, broad, ambiguous, multi-area, PR/review, or
  durable-tracking work, including new modules, strategies, tuning, and research.
- **Risk Gate** for product, money, legal, safety, production, secrets, service
  boundaries, destructive, or irreversible actions.

Fast Path work does not need GitHub issues, worktrees, or agent fan-out. Factory
Loop work creates or identifies task state before branch, worktree, design doc,
commit, or code, then uses profiles, review, verification, and evidence. Chat
plans, local markdown notes, Superpowers specs, branches, and commits are not
task state.

## 5. Run The Agent Loop

The developer does not run the loop manually. The agent should:

- read `AGENTS.md`, `CLAUDE.md`, `docs/agents/*`, and source truth,
- split broad requests into agent-sized work when using Factory Loop,
- create or identify GitHub issue/task state before branch or code,
- create one branch/worktree per Factory Loop implementation task,
- review PRD/design/source-truth/strategy research docs before implementation
  unless the developer explicitly skips that review,
- run the smallest useful set of agent profiles,
- post issue/PR evidence when using Factory Loop,
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
node ~/.loop-factory/packages/cli/bin/loop-factory.js intake "Make wallet payment watcher retry-safe" --target /path/to/project --create-issue
node ~/.loop-factory/packages/cli/bin/loop-factory.js run --target /path/to/project --issue 123 --agent codex
```

## 7. Developer Role

The developer does not manually coordinate every step. The developer reviews only:

- stop-condition decisions,
- product or architecture truth,
- merge/deploy authority,
- high-risk behavior,
- final PR when project policy requires it.
