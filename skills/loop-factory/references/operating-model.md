# Operating Model Reference

## Loop

```text
requirement
  -> intake
  -> issue/task packet
  -> branch/worktree
  -> implementation
  -> review
  -> verification
  -> PR evidence
  -> merge or escalation
```

Use this full loop for Factory Loop work. Small low-risk edits may use Fast
Path: inspect -> edit -> verify -> summarize.

## Active Runtime Profiles

- Orchestrator: split and route work.
- Implementer: edit scoped code/docs files.
- Reviewer: find correctness and spec gaps.
- Verifier: run command gates.
- Tester: run outside-in app, Docker, DB, browser, or production-like checks.
- Gatekeeper: enforce autonomy and evidence gates.

## Lazy Specialist Modes

Load `specialist-profiles.md` only when needed for issue triage, Product PRD,
architecture review, docs stewardship, security review, or release management.

Each routed item creates an agent run from one profile and one task packet.
Small tasks may run multiple phases in one conversation, but the phases must be
reported separately and must not be described as independent review.

For Factory Loop work, inline execution without issue/task state is a process
failure. If the runtime cannot spawn named agent profiles, the main agent must
report that limitation and execute the profile phases sequentially.

For Factory Loop work, issue/task state must exist before branch/worktree,
commit, design doc, or code. Chat plans, Superpowers specs, local markdown
notes, branches, commits, and memory are not task state.

## Communication

Agents communicate through:

- issue comments,
- PR comments,
- commits,
- task packets,
- verification reports,
- decision requests.

Do not rely on chat-only state for durable work.
