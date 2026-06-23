import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const templateRoot = path.join(repoRoot, "templates");

export async function main(args) {
  const { command, positional, options } = parseArgs(args);
  if (options.help || command === "help" || command === "--help" || command === "-h") {
    help();
    return;
  }
  if (command === "install") {
    install(options);
    return;
  }
  if (command === "init") {
    init(options);
    return;
  }
  if (command === "setup") {
    setup(options);
    return;
  }
  if (command === "doctor") {
    doctor(options);
    return;
  }
  if (command === "intake") {
    intake(positional.join(" ").trim(), options);
    return;
  }
  if (command === "run") {
    runLoop(options);
    return;
  }
  help();
}

function parseArgs(args) {
  const [command = "help", ...rest] = args;
  const positional = [];
  const options = {
    agent: "auto",
    createIssue: false,
    execute: false,
    force: false,
    labels: "",
    mode: "standard",
    help: false,
    soft: false,
    target: process.cwd(),
  };
  for (let index = 0; index < rest.length; index += 1) {
    const arg = rest[index];
    if (arg === "--agent") {
      options.agent = rest[index + 1] ?? options.agent;
      index += 1;
    } else if (arg === "--create-issue") {
      options.createIssue = true;
    } else if (arg === "--execute") {
      options.execute = true;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else if (arg === "--issue") {
      options.issue = rest[index + 1];
      index += 1;
    } else if (arg === "--labels") {
      options.labels = rest[index + 1] ?? "";
      index += 1;
    } else if (arg === "--mode") {
      options.mode = rest[index + 1] ?? options.mode;
      index += 1;
    } else if (arg === "--soft") {
      options.soft = true;
    } else if (arg === "--target") {
      options.target = path.resolve(rest[index + 1] ?? "");
      index += 1;
    } else {
      positional.push(arg);
    }
  }
  return { command, positional, options };
}

function install(options) {
  const installDir = loopFactoryHome();
  const agent = "both";

  console.log("== Loop Factory machine install ==");
  ensureStableCheckout(installDir, options.force);
  console.log(`Loop Factory checkout: ${installDir}`);

  if (agent === "codex" || agent === "both") {
    installCodexPlugin(installDir);
  }
  if (agent === "claude" || agent === "both") {
    installClaudePlugin(installDir);
  }

  console.log("");
  console.log("Next:");
  console.log("1. Open Codex or Claude Code in the project you want to enable.");
  console.log("2. Run:");
  console.log("   /loop-factory-init");
  console.log("3. Verify when needed:");
  console.log("   /loop-factory doctor");
}

function setup(options) {
  console.log("== Loop Factory setup ==");
  init(options);
  console.log("");
  console.log("Next:");
  if (options.mode === "minimal") {
    console.log("1. Review generated AGENTS.md, CLAUDE.md, and docs/agents.");
  } else {
    console.log("1. Review generated AGENTS.md, CLAUDE.md, docs/agents, docs/truth, and GitHub templates.");
  }
  console.log("2. If this machine is not installed yet:");
  console.log(`   ${cliName()} install`);
  console.log("3. In Codex or Claude Code, continue with real software work:");
  console.log('   "Fix checkout retry behavior and run it through Loop Factory."');
  console.log('   "Create PRDs for onboarding before implementation."');
  console.log('   "Review PR #42, address comments, and verify the branch."');
  console.log("4. Verify from the agent UI when needed:");
  console.log("   /loop-factory doctor");
}

function init(options) {
  assertMode(options.mode);
  const target = path.resolve(options.target);
  if (!existsSync(target)) {
    throw new Error(`Target does not exist: ${target}`);
  }
  const copied = [];
  for (const file of listFiles(templateRoot)) {
    if (options.mode === "minimal" && !isMinimalTemplate(file)) {
      continue;
    }
    const relative = path.relative(templateRoot, file);
    const destination = path.join(target, relative);
    copyTemplate(file, destination, options.force);
    copied.push(relative);
  }
  console.log(`Loop Factory initialized in ${target}`);
  console.log(`Mode: ${options.mode}`);
  for (const file of copied) {
    console.log(`- ${file}`);
  }
}

function ensureStableCheckout(installDir, force) {
  const source = "https://github.com/atomar1411/loop-factory.git";
  const currentRepo = path.resolve(repoRoot);
  if (path.resolve(installDir) === currentRepo) {
    console.log("Using current checkout.");
    return;
  }

  if (!existsSync(installDir)) {
    mkdirSync(path.dirname(installDir), { recursive: true });
    runRequired("git", ["clone", source, installDir], `Clone ${source}`);
    return;
  }

  if (!git(installDir, ["rev-parse", "--is-inside-work-tree"]).ok) {
    if (!force) {
      throw new Error(`Install dir exists but is not a Git checkout: ${installDir}. Use --force to replace it.`);
    }
    rmSync(installDir, { recursive: true, force: true });
    runRequired("git", ["clone", source, installDir], `Clone ${source}`);
    return;
  }

  const remote = git(installDir, ["remote", "get-url", "origin"]);
  if (!remote.ok) {
    throw new Error(`Install dir is a Git checkout without an origin remote: ${installDir}`);
  }

  runRequired("git", ["fetch", "origin", "main"], "Update Loop Factory checkout", installDir);
  runRequired("git", ["checkout", "main"], "Checkout main", installDir);
  runRequired("git", ["pull", "--ff-only", "origin", "main"], "Pull latest Loop Factory", installDir);
}

function installCodexPlugin(installDir) {
  console.log("");
  console.log("Codex:");
  if (!commandExists("codex")) {
    console.log("skip codex CLI not found");
    return;
  }
  printCommandResult("marketplace", runCommand("codex", ["plugin", "marketplace", "add", installDir]), {
    okPattern: /already|exists/i,
  });
  printCommandResult("plugin", runCommand("codex", ["plugin", "add", "loop-factory@loop-factory-local"]), {
    okPattern: /already|installed|exists/i,
  });
}

function installClaudePlugin(installDir) {
  console.log("");
  console.log("Claude Code:");
  if (!commandExists("claude")) {
    console.log("skip claude CLI not found");
    return;
  }
  printCommandResult("validate", runCommand("claude", ["plugin", "validate", installDir]));
  const marketplace = runCommand("claude", ["plugin", "marketplace", "add", installDir]);
  printCommandResult("marketplace", marketplace, { okPattern: /already|exists/i });
  printCommandResult(
    "marketplace update",
    runCommand("claude", ["plugin", "marketplace", "update", "loop-factory-local"]),
    { okPattern: /updated|success|validating/i },
  );
  const plugin = runCommand("claude", ["plugin", "install", "loop-factory@loop-factory-local"]);
  printCommandResult("plugin", plugin, { okPattern: /already|installed|exists/i });
  printCommandResult(
    "plugin update",
    runCommand("claude", ["plugin", "update", "loop-factory@loop-factory-local"]),
    { okPattern: /updated|latest|restart|up to date/i },
  );
  if (!plugin.ok) {
    console.log(`session ${shellCommand(["claude", "--plugin-dir", installDir])}`);
  }
}

function doctor(options) {
  const target = path.resolve(options.target);
  const checks = [];
  const required = [
    "AGENTS.md",
    "CLAUDE.md",
    "docs/agents/loop-factory.md",
    "docs/agents/context-loading.md",
    "docs/agents/task-packet-template.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/ISSUE_TEMPLATE/requirement.yml",
  ];

  addCheck(checks, "target directory", existsSync(target), target);
  if (!existsSync(target)) {
    printChecks(checks);
    process.exitCode = 1;
    return;
  }

  for (const file of required) {
    addCheck(checks, file, existsSync(path.join(target, file)));
  }
  addCheck(
    checks,
    "docs/truth source truth",
    existsDirectory(path.join(target, "docs/truth")),
    existsDirectory(path.join(target, "docs/truth")) ? "" : "expected docs/truth/",
  );
  addCheck(
    checks,
    "no root truth folder",
    !existsDirectory(path.join(target, "truth")),
    existsDirectory(path.join(target, "truth")) ? "migrate root truth/ into docs/truth/" : "",
  );

  const gitInside = git(target, ["rev-parse", "--is-inside-work-tree"]).ok;
  addCheck(checks, "git repository", gitInside);
  const origin = git(target, ["remote", "get-url", "origin"]);
  addCheck(checks, "git origin remote", origin.ok, origin.stdout.trim());
  const githubRepo = origin.ok ? parseGitHubRepo(origin.stdout.trim()) : undefined;
  addCheck(checks, "github origin", Boolean(githubRepo), githubRepo ?? "origin is not a GitHub remote");

  const ghAvailable = commandExists("gh");
  addCheck(checks, "gh CLI installed", ghAvailable);
  if (ghAvailable) {
    const auth = runCommand("gh", ["auth", "status"], { cwd: target });
    addCheck(checks, "gh auth", auth.ok, firstUsefulLine(auth.stderr || auth.stdout));
    if (githubRepo) {
      const view = runCommand("gh", ["repo", "view", githubRepo, "--json", "nameWithOwner,url"], {
        cwd: target,
      });
      addCheck(checks, "gh repo access", view.ok, view.ok ? view.stdout.trim() : firstUsefulLine(view.stderr));
    }
  }

  const dockerAvailable = commandExists("docker");
  addCheck(
    checks,
    "docker CLI installed",
    dockerAvailable,
    dockerAvailable ? "" : "recommended for integration tests and manual feature-flow testing",
    { required: false },
  );
  if (dockerAvailable) {
    const dockerInfo = runCommand("docker", ["info"], { cwd: target });
    addCheck(
      checks,
      "docker daemon running",
      dockerInfo.ok,
      dockerInfo.ok ? "" : "start Docker Desktop or your Docker daemon for containerized tests",
      { required: false },
    );
    const compose = runCommand("docker", ["compose", "version"], { cwd: target });
    addCheck(
      checks,
      "docker compose available",
      compose.ok,
      compose.ok ? firstUsefulLine(compose.stdout) : "recommended for multi-service integration tests",
      { required: false },
    );
  }

  const codexAvailable = commandExists("codex");
  const claudeAvailable = commandExists("claude");
  const checkCodex = options.agent === "codex" || options.agent === "both" || (options.agent === "auto" && codexAvailable);
  const checkClaude = options.agent === "claude" || options.agent === "both" || (options.agent === "auto" && claudeAvailable);

  if (checkCodex) {
    addCheck(checks, "codex CLI installed", codexAvailable);
    if (codexAvailable) {
      const marketplace = runCommand("codex", ["plugin", "marketplace", "list"]);
      addCheck(checks, "codex marketplace list", marketplace.ok, firstUsefulLine(marketplace.stdout || marketplace.stderr));
      const plugins = runCommand("codex", ["plugin", "list"]);
      addCheck(
        checks,
        "codex loop-factory plugin visible",
        plugins.ok && plugins.stdout.includes("loop-factory"),
        plugins.ok && plugins.stdout.includes("loop-factory")
          ? ""
          : plugins.ok
            ? "run `codex plugin add loop-factory@loop-factory-local` if missing"
            : firstUsefulLine(plugins.stderr),
      );
    }
  }

  if (checkClaude) {
    addCheck(checks, "claude CLI installed", claudeAvailable);
    if (claudeAvailable) {
      const validate = runCommand("claude", ["plugin", "validate", repoRoot]);
      addCheck(checks, "claude plugin validate", validate.ok, firstUsefulLine(validate.stdout || validate.stderr));
    }
  }

  printChecks(checks, { soft: options.soft });
  if (!options.soft && checks.some((check) => !check.ok && check.required !== false)) {
    process.exitCode = 1;
  }
}

function intake(text, options) {
  if (!text) {
    throw new Error('Usage: loop-factory intake "requirement" [--target <repo>] [--create-issue]');
  }
  const target = path.resolve(options.target);
  const title = summarizeTitle(text);
  const body = buildTaskPacket(text);
  if (!options.createIssue) {
    console.log(`# ${title}`);
    console.log("");
    console.log(body);
    return;
  }

  const ghAvailable = commandExists("gh");
  if (!ghAvailable) {
    throw new Error("Cannot create issue: gh CLI is not installed.");
  }
  const origin = git(target, ["remote", "get-url", "origin"]);
  if (!origin.ok || !parseGitHubRepo(origin.stdout.trim())) {
    throw new Error("Cannot create issue: target repo must have a GitHub origin remote.");
  }

  const tempDir = mkdtempSync(path.join(os.tmpdir(), "loop-factory-intake-"));
  const bodyPath = path.join(tempDir, "issue.md");
  writeFileSync(bodyPath, body);
  try {
    const args = ["issue", "create", "--title", title, "--body-file", bodyPath];
    for (const label of splitCSV(options.labels)) {
      args.push("--label", label);
    }
    const result = runCommand("gh", args, { cwd: target });
    if (!result.ok) {
      throw new Error(result.stderr || result.stdout || "gh issue create failed");
    }
    console.log(result.stdout.trim());
  } finally {
    rmSync(tempDir, { recursive: true, force: true });
  }
}

function runLoop(options) {
  const target = path.resolve(options.target);
  if (!options.issue) {
    throw new Error("Usage: loop-factory run --issue <number-or-url> [--target <repo>] [--agent codex|claude] [--execute]");
  }
  const agent = options.agent === "claude" ? "claude" : "codex";
  const requestText = [
    `Use Loop Factory to run issue ${options.issue} through the autonomous PR loop.`,
    "Read AGENTS.md/CLAUDE.md, docs/agents, the issue, and source truth.",
    "Create or use one branch/worktree, implement within scope, run reviewer and verifier/tester loops,",
    "post durable PR/issue evidence, and stop only on declared risk gates.",
  ].join(" ");
  const command = agent === "claude"
    ? ["claude", "--plugin-dir", repoRoot, requestText]
    : ["codex", "-C", target, requestText];

  if (!options.execute) {
    console.log("Run this command:");
    console.log(shellCommand(command));
    return;
  }

  const result = spawnSync(command[0], command.slice(1), {
    cwd: target,
    stdio: "inherit",
  });
  process.exitCode = result.status ?? 1;
}

function buildTaskPacket(text) {
  return `## Objective

${text}

## Autonomy Level

A2 Draft PR

## Agent Profile

Loop Orchestrator

## Context Inputs

- Human requirement: see Objective
- Source files: to be discovered by orchestrator
- Prior maintainer decisions: none supplied

## Owned Files Or Area

- To be discovered by orchestrator

## Truth Docs To Read

- AGENTS.md
- CLAUDE.md when present
- docs/agents/loop-factory.md
- docs/agents/context-loading.md
- docs/truth/ when present

## Forbidden Changes

- Do not change product, money, legal, safety, deployment, service-boundary, or irreversible behavior unless explicitly allowed.

## Expected Behavior

The orchestrator turns this requirement into agent-sized work, runs the appropriate Loop Factory profiles, and produces PR evidence.

## Verification Commands

\`\`\`bash
git status --short --branch
\`\`\`

## Review Requirements

- Reviewer must compare diff to this packet and project truth.
- Verifier or tester must report exact evidence.
- Gatekeeper must enforce autonomy and risk gates before ready/merge/deploy actions.

## Stop Conditions

- Required context is missing.
- Risk-domain decision is required.
- Verification exposes work outside this issue.
- Merge, deploy, destructive, or irreversible authority is required.

## Final Report Requirements

- Changed files
- Commands run
- Pass/fail result
- Review result
- Verification result
- Residual risk
- Decisions needed
`;
}

function help() {
  console.log(`Loop Factory

Usage:
  loop-factory install
  loop-factory setup
  loop-factory doctor

Machine install:
  loop-factory install
  npx --yes github:atomar1411/loop-factory install
  node ~/.loop-factory/packages/cli/bin/loop-factory.js install

Normal developer UX:
  Open Codex or Claude Code in the target repo, then run:
  /loop-factory-init
  /loop-factory
  /loop-factory doctor

After setup:
  Describe the software work normally.
  Example: "Fix checkout retry behavior and open a draft PR."

CLI backstop commands:
  node ~/.loop-factory/packages/cli/bin/loop-factory.js setup
  node ~/.loop-factory/packages/cli/bin/loop-factory.js doctor
  node ~/.loop-factory/packages/cli/bin/loop-factory.js doctor --soft
  loop-factory setup [--target <repo>] [--mode minimal|standard] [--force]
  loop-factory init [--target <repo>] [--mode minimal|standard] [--force]
  loop-factory doctor [--target <repo>] [--agent codex|claude|both] [--soft]
`);
}

function assertMode(mode) {
  if (!["minimal", "standard"].includes(mode)) {
    throw new Error(`Unknown mode: ${mode}`);
  }
}

function listFiles(root) {
  const output = [];
  for (const entry of readdirSync(root)) {
    const fullPath = path.join(root, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      output.push(...listFiles(fullPath));
    } else {
      output.push(fullPath);
    }
  }
  return output;
}

function copyTemplate(source, destination, force) {
  const body = readFileSync(source, "utf8");
  if (existsSync(destination) && !force) {
    if (readFileSync(destination, "utf8") === body) {
      console.log(`ok existing ${path.relative(process.cwd(), destination)}`);
      return;
    }
    const backup = `${destination}.loop-factory-existing`;
    if (!existsSync(backup)) {
      writeFileSync(backup, readFileSync(destination));
    }
    console.log(`kept existing ${path.relative(process.cwd(), destination)}; backup ${path.basename(backup)}`);
    return;
  }
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, body);
}

function existsDirectory(value) {
  return existsSync(value) && statSync(value).isDirectory();
}

function isMinimalTemplate(file) {
  const relative = path.relative(templateRoot, file);
  return [
    "AGENTS.md",
    "CLAUDE.md",
    "docs/agents/loop-factory.md",
    "docs/agents/context-loading.md",
    "docs/agents/task-packet-template.md",
  ].includes(relative);
}

function summarizeTitle(text) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  const clipped = cleaned.length > 72 ? `${cleaned.slice(0, 69)}...` : cleaned;
  return `[Requirement] ${clipped}`;
}

function git(cwd, args) {
  return runCommand("git", args, { cwd });
}

function commandExists(command) {
  return runCommand(command, ["--version"]).ok || runCommand(command, ["--help"]).ok;
}

function runCommand(command, args, options = {}) {
  try {
    const stdout = execFileSync(command, args, {
      cwd: options.cwd,
      encoding: "utf8",
      input: options.input,
      stdio: options.input ? ["pipe", "pipe", "pipe"] : ["ignore", "pipe", "pipe"],
    });
    return { ok: true, stdout, stderr: "" };
  } catch (error) {
    return {
      ok: false,
      stdout: String(error.stdout ?? ""),
      stderr: String(error.stderr ?? error.message ?? ""),
    };
  }
}

function runRequired(command, args, label, cwd = process.cwd()) {
  const result = runCommand(command, args, { cwd });
  if (!result.ok) {
    throw new Error(`${label} failed: ${firstUsefulLine(result.stderr || result.stdout)}`);
  }
}

function printCommandResult(label, result, options = {}) {
  const tolerated = options.okPattern?.test(result.stderr || result.stdout || "");
  const ok = result.ok || tolerated;
  const status = ok ? "ok" : "fail";
  const detail = firstUsefulLine(result.stdout || result.stderr);
  console.log(`${status} ${label}${detail ? ` - ${detail}` : ""}`);
}

function addCheck(checks, name, ok, detail = "", options = {}) {
  checks.push({ name, ok, detail, required: options.required !== false });
}

function printChecks(checks, options = {}) {
  for (const check of checks) {
    const status = check.ok ? "ok" : check.required === false || options.soft ? "warn" : "fail";
    const detail = check.detail ? ` - ${check.detail}` : "";
    console.log(`${status} ${check.name}${detail}`);
  }
}

function parseGitHubRepo(remote) {
  const httpsMatch = remote.match(/^https:\/\/github\.com\/([^/]+\/[^/.]+)(?:\.git)?$/);
  if (httpsMatch) {
    return httpsMatch[1];
  }
  const sshMatch = remote.match(/^git@([^:]+):([^/]+\/[^/.]+)(?:\.git)?$/);
  if (!sshMatch) {
    return undefined;
  }
  const [, host, repo] = sshMatch;
  return host === "github.com" || host.startsWith("github-") ? repo : undefined;
}

function firstUsefulLine(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(Boolean) ?? "";
}

function splitCSV(value) {
  return value
    .split(",")
    .map((label) => label.trim())
    .filter(Boolean);
}

function quote(value) {
  return JSON.stringify(value);
}

function loopFactoryHome() {
  return path.join(os.homedir(), ".loop-factory");
}

function shellCommand(parts) {
  return parts.map((part) => (part.includes(" ") ? quote(part) : part)).join(" ");
}

function cliName() {
  if (isNpxCachePath(repoRoot)) {
    return "npx --yes github:atomar1411/loop-factory";
  }
  if (commandExists("loop-factory")) {
    return "loop-factory";
  }
  return shellCommand(["node", path.join(repoRoot, "packages/cli/bin/loop-factory.js")]);
}

function isNpxCachePath(value) {
  return value.includes(`${path.sep}.npm${path.sep}_npx${path.sep}`);
}
