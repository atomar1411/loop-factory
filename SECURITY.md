# Security Policy

Loop Factory coordinates software agents that can edit code and run commands.
Treat every installation as a security boundary.

## Reporting

Do not publish exploitable details in public issues. Open a private advisory in
the hosting repository or contact maintainers through the published repository
security channel.

## Security Principles

- Do not auto-merge or deploy without explicit target-project policy.
- Do not store secrets in Loop Factory docs, templates, issues, or skills.
- Keep dangerous operations behind stop conditions.
- Prefer dry-run commands for setup and cleanup.
- Make generated files reviewable in Git.

## Sensitive Actions

These require explicit project policy:

- deleting files, branches, or worktrees,
- mutating production systems,
- changing secrets or deployment configuration,
- modifying money, legal, security, or data-retention behavior,
- running commands outside the target repo.

