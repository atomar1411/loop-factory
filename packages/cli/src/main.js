import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const templateRoot = path.join(repoRoot, "templates");

export async function main(args) {
  const [command = "help", ...rest] = args;
  if (command === "init") {
    init(parseOptions(rest));
    return;
  }
  if (command === "doctor") {
    doctor(parseOptions(rest));
    return;
  }
  if (command === "intake") {
    intake(rest.join(" ").trim());
    return;
  }
  help();
}

function parseOptions(args) {
  const options = { target: process.cwd(), force: false, mode: "standard" };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--target") {
      options.target = path.resolve(args[index + 1] ?? "");
      index += 1;
    } else if (arg === "--force") {
      options.force = true;
    } else if (arg === "--mode") {
      options.mode = args[index + 1] ?? options.mode;
      index += 1;
    }
  }
  return options;
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

function doctor(options) {
  const target = path.resolve(options.target);
  const required = [
    "AGENTS.md",
    "CLAUDE.md",
    "docs/agents/loop-factory.md",
    "docs/agents/context-loading.md",
    "docs/agents/task-packet-template.md",
    "docs/truth/README.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
    ".github/ISSUE_TEMPLATE/requirement.yml",
  ];
  let failed = false;
  for (const file of required) {
    const present = existsSync(path.join(target, file));
    console.log(`${present ? "ok" : "missing"} ${file}`);
    failed ||= !present;
  }
  if (failed) {
    process.exitCode = 1;
  }
}

function intake(text) {
  if (!text) {
    throw new Error("Usage: loop-factory intake \"<requirement>\"");
  }
  const title = summarizeTitle(text);
  console.log(`# ${title}`);
  console.log("");
  console.log("## Objective");
  console.log(text);
  console.log("");
  console.log("## Autonomy Level");
  console.log("A2 Draft PR");
  console.log("");
  console.log("## Agent Role");
  console.log("Loop Orchestrator");
  console.log("");
  console.log("## Context Inputs");
  console.log("- Human requirement: see Objective");
  console.log("- Source files: to be discovered by orchestrator");
  console.log("- Prior maintainer decisions: none supplied");
  console.log("");
  console.log("## Forbidden Changes");
  console.log("- Do not change product, money, legal, safety, deployment, service-boundary, or irreversible behavior unless explicitly allowed.");
  console.log("");
  console.log("## Verification Commands");
  console.log("```bash");
  console.log("git status --short --branch");
  console.log("```");
  console.log("");
  console.log("## Stop Conditions");
  console.log("- Required context is missing.");
  console.log("- Risk-domain decision is required.");
  console.log("- Verification exposes work outside this issue.");
}

function help() {
  console.log(`Loop Factory

Usage:
  loop-factory init [--target <repo>] [--mode minimal|standard|strict] [--force]
  loop-factory doctor [--target <repo>]
  loop-factory intake "<requirement>"
`);
}

function assertMode(mode) {
  if (!["minimal", "standard", "strict"].includes(mode)) {
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
  if (existsSync(destination) && !force) {
    const backup = `${destination}.loop-factory-existing`;
    if (!existsSync(backup)) {
      writeFileSync(backup, readFileSync(destination));
    }
    console.log(`kept existing ${path.relative(process.cwd(), destination)}; backup ${path.basename(backup)}`);
    return;
  }
  mkdirSync(path.dirname(destination), { recursive: true });
  writeFileSync(destination, readFileSync(source));
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

