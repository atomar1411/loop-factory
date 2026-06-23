# Reviewer Loop Reference

Review a branch or PR against the task packet, source truth, risk gates, and
verification evidence.

## Inputs

- issue or task packet,
- diff against base,
- source truth docs,
- verification evidence,
- stop conditions.

## Focus

Findings first:

- correctness bugs,
- missing requirements,
- weak or missing tests,
- source-truth drift,
- risk gate violations,
- unsafe file ownership,
- stale docs or dead code introduced by the diff.

## Output

If findings exist:

```text
Findings:
- [P0/P1/P2] file:line - issue, impact, suggested fix

Open questions:

Verification reviewed:

Residual risk:
```

If there are no findings, say that clearly and list unrun gates or residual
risk.
