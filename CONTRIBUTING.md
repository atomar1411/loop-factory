# Contributing

Loop Factory is early-stage. Contributions should improve the loop without
making target projects depend on hidden state.

## Design Rules

- Keep the framework repo generic.
- Keep project-specific truth in the target project.
- Prefer templates, skills, and small deterministic scripts over large services.
- Add automation only when the underlying state is visible in GitHub or Git.
- Do not add source-control side effects without a dry-run path.

## Local Checks

```bash
npm run check
repo=$PWD
tmpdir=$(mktemp -d /tmp/loop-factory-test.XXXXXX)
(cd "$tmpdir" && node "$repo/packages/cli/bin/loop-factory.js" setup --mode minimal)
rm -rf "$tmpdir"
```

## Pull Requests

Every PR should include:

- what loop behavior changed,
- which target-repo files are affected,
- how it was verified,
- any compatibility notes for Codex or Claude Code.
