---
name: requirement-intake
description: Convert rough product or engineering requirements into Loop Factory issues and task packets. Use automatically when a developer request appears to be a new feature, bug, cleanup, architecture/design ask, product/PRD ask, review request, or vague goal that should become agent-ready work, even if the user does not name this skill or Loop Factory.
---

# Requirement Intake

Turn developer intent into agent-ready work. Do not require a command, slash
command, or template.

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
- suggested agent profile,
- verification gates,
- stop conditions.

When GitHub CLI is available and durable task state is useful, create issues
after confirming the task scope is safe or after the user has asked to create
tasks. Report links and next loop state.
