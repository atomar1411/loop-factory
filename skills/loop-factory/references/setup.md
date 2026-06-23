# Setup Reference

Use this when installing Loop Factory into a target repository.

## Install Modes

- `minimal`: `AGENTS.md`, `CLAUDE.md`, and `docs/agents/*`.
- `standard`: minimal plus source-truth scaffold, issue templates, and the PR
  template. If the target repo already has root `truth/`, do not create a
  competing `docs/truth/`.

Default to `standard`.

## Existing Repo Rules

- Do not overwrite project-specific files without backing them up or asking.
- Preserve existing agent instructions and add Loop Factory sections.
- Prefer additive templates over deleting existing process docs.
- If source-truth docs are absent, create a truth README and an architecture
  baseline task instead of inventing architecture.

## New Repo Rules

- Create the full standard template set.
- Leave product and architecture truth skeletal.
- Add first issue: "Establish source truth and architecture baseline."
