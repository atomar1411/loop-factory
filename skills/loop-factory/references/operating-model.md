# Operating Model Reference

## Loop

```text
requirement
  -> lightweight triage
  -> issue/task packet
  -> requirement discovery recorded in issue
  -> Delivery DAG when complex
  -> branch/worktree lane per active node
  -> PRD/design/doc review when needed
  -> implementation
  -> DAG join/integration
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

For complex Factory Loop work, create a Delivery DAG before implementation. The
DAG records node objective, owned files or area, dependencies, assigned profile,
branch/worktree lane, verification, evidence target, and stop conditions. Ready
nodes with non-overlapping ownership may run in parallel through separate
implementers. Dependent nodes wait. A join/integration node must run before
final review and verification.

For Factory Loop work, inline execution without issue/task state is a process
failure. If the runtime cannot spawn named agent profiles, the main agent must
report that limitation and execute the profile phases sequentially.

For Factory Loop work, issue/task state must exist before branch/worktree,
commit, design doc, or code. Create a draft issue before broad source
exploration, requirement Q&A, or brainstorming. Chat plans, Superpowers specs,
local markdown notes, branches, commits, and memory are not task state.

Loop Factory has precedence over helper skills. Helper skills may assist local
thinking, but the issue/task packet remains the durable state. PRDs, specs, and
plans belong in the repo's canonical truth/design path or issue/PR state;
tool-owned scratch/spec folders are not canonical project truth unless the repo
explicitly says they are.

## Communication

Agents communicate through:

- issue comments,
- PR comments,
- commits,
- task packets,
- verification reports,
- decision requests.

Do not rely on chat-only state for durable work.
