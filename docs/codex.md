# Codex Integration

Loop Factory provides a Codex plugin with shared skills and templates.

## Plugin Layout

```text
.codex-plugin/plugin.json
skills/
templates/
scripts/
```

Codex discovers the skills from the plugin manifest. Each target repository
still gets its own `AGENTS.md` and `docs/agents/*` files so the project rules
are visible in Git review.

## Recommended Use

1. Install or load the Loop Factory plugin.
2. Run the `loop-factory` skill to inspect the repo and select an install mode.
3. Run `loop-factory init` in the target repo.
4. Use the `requirement-intake` skill for new human requirements.
5. Use the `autonomous-pr-loop` skill to run an issue to PR.

## Codex Rule

Do not rely on hidden memory for project truth. The installed repo files and
GitHub artifacts are the contract.

