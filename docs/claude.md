# Claude Code Integration

Loop Factory provides a Claude Code plugin with skills and agents.

## Plugin Layout

```text
.claude-plugin/plugin.json
skills/
agents/
hooks/
```

Project installation writes `CLAUDE.md` and `.claude`-compatible repo assets
where appropriate, because repo-local instructions are visible to the team and
survive plugin updates.

## Supported Claude Code Concepts

Loop Factory aligns with Claude Code skills, plugin agents, hooks, worktrees,
and GitHub Actions. Skills carry workflows; agents carry role-specific system
prompts; hooks can enforce local policy where deterministic enforcement is
better than model judgment.

## Recommended Use

```bash
claude --plugin-dir ./loop-factory
```

Then work in the target repo using normal language. Claude Code should use Loop
Factory when a prompt looks like a requirement, bug, cleanup, PR review,
product/PRD task, architecture/design task, or implementation request.

```text
Fix checkout retry behavior.
Create PRDs for the new onboarding experience.
Review PR #42 and address comments.
Document architecture gaps before implementation.
```

Claude Code plugin agents should be available internally when the plugin is
loaded:

- `loop-orchestrator`
- `loop-issue-triager`
- `loop-product-prd`
- `loop-architecture-reviewer`
- `loop-docs-steward`
- `loop-coder`
- `loop-implementer`
- `loop-reviewer`
- `loop-security-reviewer`
- `loop-verifier`
- `loop-test-engineer`
- `loop-tester`
- `loop-gatekeeper`
- `loop-release-manager`

For shared use, publish through a Claude Code plugin marketplace.
