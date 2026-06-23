# Claude Code Integration

Loop Factory provides a Claude Code plugin with skills and agent profiles.

## Plugin Layout

```text
.claude-plugin/marketplace.json
.claude-plugin/plugin.json
skills/
agents/
```

Project enablement writes `CLAUDE.md` and repo-local assets where appropriate,
because repo-local instructions are visible in Git review and survive plugin
updates.

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

From the target repo, run:

```text
/loop-factory-init
/loop-factory
/loop-factory doctor
```

Claude Code skills create `/name` shortcuts. Loop Factory exposes
`/loop-factory-init` for first-run setup and `/loop-factory` for normal work.
Internal workflows such as requirement intake, review, and verification should
not appear as separate commands.

```text
Fix checkout retry behavior.
Create PRDs for the new onboarding experience.
Review PR #42 and address comments.
Document architecture gaps before implementation.
```

Claude Code active agent profiles should be available internally when the
plugin is loaded:

- `loop-orchestrator`
- `loop-implementer`
- `loop-reviewer`
- `loop-verifier`
- `loop-tester`
- `loop-gatekeeper`

Issue triage, Product PRD, architecture, docs, security, and release management
run as lazy specialist modes inside the active profiles.

## Readiness

GitHub/`gh` lets Claude Code create issues, draft PRs, labels, comments, and
evidence updates. Docker lets Claude Code run containerized service stacks,
integration tests, manual flow checks, and log inspection. Missing GitHub or
Docker should be reported as degraded capability, not treated as a setup
blocker.

For shared use, publish through a Claude Code plugin marketplace.
