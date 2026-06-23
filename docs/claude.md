# Claude Code Integration

Loop Factory provides a Claude Code plugin with skills and agents.

## Plugin Layout

```text
.claude-plugin/plugin.json
skills/
agents/
hooks/
```

Claude Code plugin skills are namespaced as `/loop-factory:<skill-name>`.
Project installation still writes `CLAUDE.md` and `.claude`-compatible repo
assets where appropriate, because repo-local instructions are visible to the
team and survive plugin updates.

## Supported Claude Code Concepts

Loop Factory aligns with Claude Code skills, plugin agents, hooks, worktrees,
and GitHub Actions. Skills carry workflows; agents carry role-specific system
prompts; hooks can enforce local policy where deterministic enforcement is
better than model judgment.

## Recommended Use

```bash
claude --plugin-dir ./loop-factory
```

Then invoke:

```text
/loop-factory:requirement-intake
/loop-factory:autonomous-pr-loop
/loop-factory:reviewer-loop
/loop-factory:verifier-loop
```

Claude Code plugin agents should appear in `/agents` when the plugin is loaded:

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
