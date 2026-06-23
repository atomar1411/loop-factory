# Claude Code Integration

Loop Factory provides a Claude Code plugin with skills and agent profiles.

## Plugin Layout

```text
.claude-plugin/plugin.json
skills/
agents/
```

Project installation writes `CLAUDE.md` and `.claude`-compatible repo assets
where appropriate, because repo-local instructions are visible in Git review
and survive plugin updates.

## Supported Claude Code Concepts

Loop Factory aligns with Claude Code skills, agent profiles, worktrees, and
GitHub pull requests. Skills carry workflows; agent profiles carry specialist
instructions.

## Recommended Use

```bash
claude --plugin-dir ./loop-factory
```

Then work in the target repo as usual. Claude Code should use Loop
Factory when a request looks like a requirement, bug, cleanup, PR review,
product/PRD task, architecture/design task, or implementation request.

```text
Fix checkout retry behavior.
Create PRDs for the new onboarding experience.
Review PR #42 and address comments.
Document architecture gaps before implementation.
```

Claude Code plugin agent profiles should be available internally when the
plugin is loaded:

- `loop-orchestrator`
- `loop-issue-triager`
- `loop-product-prd`
- `loop-architecture-reviewer`
- `loop-docs-steward`
- `loop-implementer`
- `loop-reviewer`
- `loop-security-reviewer`
- `loop-verifier`
- `loop-tester`
- `loop-gatekeeper`
- `loop-release-manager`

For shared use, publish through a Claude Code plugin marketplace.
