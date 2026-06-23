# Requirement Intake

Humans should not need to write full task packets. They provide intent. Loop
Factory turns intent into agent-ready tasks.

## Human Brief

```text
Goal:
Problem:
Must do:
Must not touch:
Done means:
Risk:
Priority:
```

Only `Goal` is mandatory for a first pass. The intake loop fills gaps by reading
the repo and asking only when a safe assumption is impossible.

## Intake Output

The intake loop creates or updates:

- issue title,
- problem statement,
- acceptance criteria,
- owned area,
- forbidden changes,
- autonomy level,
- verification gates,
- escalation triggers,
- suggested agent role,
- blocked-by relationships.

## Splitting Rules

Split a requirement when it contains:

- multiple deployable services,
- multiple product flows,
- both architecture and implementation,
- unrelated owned files,
- separate verification modes,
- different risk domains.

Prefer several agent-sized issues over one epic issue. Keep the parent issue as
a coordination index when needed.

## Good Brief Example

```text
Goal: Make wallet payment watcher retry-safe.
Problem: Duplicate transfers can create ambiguous entry state after worker restarts.
Must do: Add durable cursor and duplicate-transfer tests.
Must not touch: Payout/refund semantics.
Done means: Restart scenario proves one confirmed entry per transfer.
Risk: Payment semantics. Ask before changing confirmation-depth policy.
Priority: P1.
```

