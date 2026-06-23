# Autonomous Loop Model

Loop Factory uses nested loops. Each loop has input, actions, evidence, and stop
conditions.

## Requirement Loop

```text
rough requirement
  -> clarify only blocking gaps
  -> classify risk
  -> create issue
  -> create task packet
```

Output: an issue ready for an agent.

## Delivery Loop

```text
issue
  -> read source truth
  -> create branch/worktree
  -> implement
  -> run narrow verification
  -> commit
```

Output: a reviewable branch.

## Review Loop

```text
branch
  -> reviewer compares diff to issue, task packet, truth docs, and evidence
  -> findings are posted
  -> implementer addresses findings
  -> reviewer rechecks
```

Output: approved diff or blocked task.

## Verification Loop

```text
approved diff
  -> verifier/tester selects gates
  -> commands run
  -> logs, DB, browser, or Docker checks are captured when required
  -> gatekeeper checks autonomy and evidence
  -> evidence is posted to PR
```

Output: proof or a failing gate with root-cause notes.

## PR Loop

```text
verified branch
  -> draft PR
  -> checklist
  -> CI
  -> agent review and fixes
  -> gatekeeper pass
  -> maintainer merge or auto-merge policy
```

Output: merged work or explicit blocker.

## Learning Loop

```text
merged work
  -> clean worktree
  -> close issue
  -> update truth docs when contracts changed
  -> improve templates/scripts if the loop itself failed
```

Output: better future loops.

## Stop Conditions

The loop stops and asks for a human or maintainer decision when:

- the task conflicts with project truth,
- risk domains need semantic decisions,
- tests reveal a broader issue than the task scope,
- two agents need overlapping ownership,
- merge or deploy authority is required,
- credentials, secrets, money, or irreversible operations are involved.

The stop request must include:

```text
Decision needed:
Why it matters:
Options:
Recommendation:
Risk if wrong:
Files or systems affected:
```
