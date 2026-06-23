# Requirement Intake Reference

Turn developer intent into agent-ready work. Do not require a separate command,
slash command, or template.

## Input

Accept rough text. Prefer this brief only when the user can provide it without
friction:

```text
Goal:
Problem:
Must do:
Must not touch:
Done means:
Risk:
Priority:
```

## Process

1. Read existing repo truth and issue tracker rules.
2. Ask only for blocking missing information.
3. Classify autonomy level:
   - default `A2 Draft PR`,
   - lower if the repo is unknown,
   - higher only when policy exists.
4. Split broad requirements into agent-sized issues.
5. Write each issue with objective, scope, forbidden changes, verification, and
   stop conditions.
6. Add risk labels when supported.

## Output

Produce:

- issue title,
- task packet body,
- recommended labels,
- suggested agent profile,
- verification gates,
- stop conditions.

When GitHub CLI is available and the repo has a GitHub remote, create or update
issues for tracked software work after confirming the task scope is safe. Use a
local task packet only when GitHub is unavailable, explicitly disabled, or the
request is advisory-only. Report links and next loop state.
