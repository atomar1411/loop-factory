# Autonomy Levels

Autonomy levels define what agents may do without waiting for the developer or
maintainer.

## A0 - Advisory

Agents may inspect, summarize, propose tasks, and create draft docs. They do not
edit source or open PRs.

Use for unknown systems, early architecture discovery, or sensitive domains.

## A1 - Local Patch

Agents may create a branch/worktree, edit files, run tests, and commit locally.
They do not push branches or open PRs.

Use when the project is calibrating trust.

## A2 - Draft PR

Agents may create issues, branches, commits, push branches, open draft PRs, run
review loops, and update PR evidence.

Use as the default for healthy repos.

## A3 - Ready PR

Agents may mark PRs ready after review and verification pass. They do not merge.

Use when maintainers want to review only final PRs.

## A4 - Auto-Merge

Agents may merge low-risk PRs when all required checks, review loops, and policy
guards pass.

Never use A4 for risk domains unless the project has an explicit signed policy.

## A5 - Deploy Loop

Agents may deploy after merge and run production smoke checks.

This requires project-specific deploy policy, credential boundaries, rollback
instructions, and explicit maintainer approval.

## Default

Loop Factory recommends A2 for normal engineering work and A0/A1 for newly
onboarded repos until the first loop succeeds.
