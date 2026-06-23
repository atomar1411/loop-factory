---
description: Enable or verify Loop Factory in the current repository.
argument-hint: "[doctor]"
---

# Loop Factory

Use this command from the repository the developer wants to run through Loop
Factory.

The user invoked:

```text
/loop-factory $ARGUMENTS
```

## Preflight

1. Inspect the current repository:

```bash
git status --short --branch
git remote -v
```

2. Check whether Loop Factory files already exist:

```bash
test -f AGENTS.md && test -f CLAUDE.md && test -f docs/agents/loop-factory.md
```

3. Check whether the CLI is available:

```bash
command -v loop-factory
```

If `loop-factory` is not on PATH, use the GitHub package form as the fallback
inside the command steps below.

## Plan

- If `$ARGUMENTS` is empty, enable Loop Factory in this repo.
- If `$ARGUMENTS` starts with `doctor`, verify this repo.
- If `$ARGUMENTS` contains any other text, treat it as the developer's software
  request and run the Loop Factory operating model after confirming the repo is
  enabled.

Do not push, merge, deploy, delete branches, remove files, or change production
configuration unless the developer explicitly asks for that operation.

## Commands

### Enable This Repo

Run one of these from the target repository:

```bash
loop-factory setup
```

Fallback when the package is not installed globally:

```bash
npx --yes github:atomar1411/loop-factory setup
```

Then review the generated files:

```bash
git status --short
```

### Verify This Repo

Run one of these from the target repository:

```bash
loop-factory doctor
```

Fallback when the package is not installed globally:

```bash
npx --yes github:atomar1411/loop-factory doctor
```

### Continue Work

When `$ARGUMENTS` is a software request, load:

- `AGENTS.md`
- `CLAUDE.md` when present
- `docs/agents/loop-factory.md`
- `docs/agents/context-loading.md`
- relevant project truth docs

Then scope the work, create durable issue or PR state when useful, use the
smallest required set of agent profiles, and report verification evidence before
claiming completion.

## Verification

After setup or doctor:

```bash
git status --short --branch
```

Report whether required files exist, whether GitHub connectivity is available,
and whether Codex or Claude Code plugin visibility was detected by the doctor
output.

## Summary

Return a concise result:

```text
Action: setup | doctor | request loop
Status: success | partial | failed
Evidence: exact commands run and key output
Next: developer decision or next safe command
```

## Next Steps

- If setup succeeded, the developer can start asking for real software work.
- If doctor failed, fix the missing prerequisite and rerun `/loop-factory doctor`.
- If the request touches product, money, legal, safety, deployment, service
  boundaries, irreversible operations, merge, or deploy authority, stop and ask.
