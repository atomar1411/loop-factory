# Task Packet

Copy this into a GitHub issue or PR body before non-trivial work.

## Objective

State the concrete outcome.

## Autonomy Level

A2 Draft PR

## Agent Profile

Loop Implementer

Allowed values: `Loop Orchestrator`, `Loop Implementer`, `Loop Reviewer`,
`Loop Verifier`, `Loop Tester`, `Loop Gatekeeper`. Specialist mode may be:
`issue triage`, `product PRD`, `architecture review`, `docs stewardship`,
`security review`, or `release management`.

## Context Inputs

- Developer request, issue, or PR:
- Relevant source files:
- Relevant logs, screenshots, or failing commands:
- Prior maintainer decisions:

## Owned Files Or Area

- `path/to/file`

## Truth Docs To Read

- Source-truth docs (`docs/truth/`)
- `docs/agents/context-loading.md`
- `docs/agents/loop-factory.md`

## Forbidden Changes

- Do not change product, money, legal, safety, deployment, service-boundary, or
  irreversible behavior unless explicitly allowed.

## Expected Behavior

Describe observable behavior after completion.

## Verification Commands

```bash
git status --short --branch
```

## Review Requirements

- Reviewer must compare diff to this packet and project truth.
- Findings must include severity, file/line when possible, and impact.

## Stop Conditions

- Product, money, legal, safety, deployment, service-boundary, or irreversible
  decisions are required.
- Required context is missing.
- Verification exposes a larger problem than the task scope.

## Final Report Requirements

- Changed files
- Commands run
- Pass/fail result
- Review result
- Residual risk
- Decisions needed
