# Codex Integration

Loop Factory provides a Codex plugin with shared skills and templates.

## Plugin Layout

```text
.agents/plugins/marketplace.json
.codex-plugin/plugin.json
skills/
templates/
scripts/
```

Codex discovers the public `/loop-factory` skill from the plugin manifest. Each
target repository still gets its own `AGENTS.md` and `docs/agents/*` files so
the project rules are visible in Git review.

## Recommended Use

1. Install or load the Loop Factory plugin.
2. Start a Codex thread in the target repo.
3. Run `/loop-factory` once to enable the repo.
4. Use `/loop-factory doctor` when you want setup and GitHub connectivity proof.
5. Describe the software work. When the request looks like a requirement, bug,
   cleanup, review, product/PRD, architecture/design, or implementation task,
   Codex should load the Loop Factory skills automatically.
6. Let Codex create issues, branches, draft PRs, review passes, verification
   evidence, and stop-condition questions as needed.

Examples:

```text
Fix checkout retry behavior.
Create PRDs for the new onboarding experience.
Review PR #42 and address comments.
Document architecture gaps before implementation.
```

## Codex Rule

Do not rely on hidden memory for project truth. The installed repo files and
GitHub artifacts are the contract.
