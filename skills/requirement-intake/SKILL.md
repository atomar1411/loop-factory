---
name: requirement-intake
description: Convert rough human product or engineering requirements into Loop Factory issues and task packets. Use when a user gives a feature request, bug report, cleanup request, architecture ask, or vague goal that should become agent-ready work.
---

# Requirement Intake

Turn human intent into agent-ready work.

## Input

Accept rough text. Prefer this brief when the user can provide it:

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
- suggested agent role,
- verification gates,
- stop conditions.

When GitHub CLI is available and the user asked to create tasks, create the
issues and report links.

