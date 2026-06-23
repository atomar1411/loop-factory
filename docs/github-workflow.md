# GitHub Workflow

Loop Factory uses GitHub as the default durable task tracker.

## Issue States

Use labels to model loop state:

- `lf:intake`
- `lf:ready`
- `lf:in-progress`
- `lf:review`
- `lf:verification`
- `lf:blocked-human`
- `lf:blocked-agent`
- `lf:ready-to-merge`
- `lf:done`

Risk labels:

- `risk:product`
- `risk:money`
- `risk:security`
- `risk:legal`
- `risk:deploy`
- `risk:architecture`

## PR Requirements

Every Loop Factory PR should include:

- linked issue,
- autonomy level,
- changed files,
- forbidden scope honored,
- review evidence,
- verification evidence,
- skipped gates with reason,
- residual risk,
- human decisions needed.

## Branch Naming

Use:

```text
lf/<issue-number>-<short-slug>
```

If the host agent has its own required prefix, use:

```text
codex/<issue-number>-<short-slug>
claude/<issue-number>-<short-slug>
```

