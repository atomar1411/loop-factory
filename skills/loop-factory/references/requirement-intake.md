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

1. Read existing repo truth and issue tracker rules just enough to classify.
2. If the request is Factory Loop, create or identify a draft issue from the
   rough request before broad source exploration, requirement Q&A, brainstorming,
   branch/worktree, design doc, commit, or code.
3. Ask only for blocking missing information, and record answers in the
   issue/task packet.
4. Classify autonomy level:
   - default `A2 Draft PR`,
   - lower if the repo is unknown,
   - higher only when policy exists.
5. Split broad requirements into a Delivery DAG of agent-sized nodes.
6. Write each issue with objective, scope, forbidden changes, verification, and
   stop conditions.
7. Add risk labels when supported.

## Output

Produce:

- issue title,
- task packet body,
- Delivery DAG when complex,
- recommended labels,
- suggested agent profile,
- verification gates,
- stop conditions.

When GitHub CLI is available and the repo has a GitHub remote, create or update
issues for Factory Loop work early. Start with a draft issue if the details are
rough, then edit or comment as requirements settle. Use a local task packet only
when GitHub is unavailable, explicitly disabled, or the request is advisory-only
or Fast Path. Report links and next loop state.
