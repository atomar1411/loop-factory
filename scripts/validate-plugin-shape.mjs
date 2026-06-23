import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  ".agents/plugins/marketplace.json",
  ".codex-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".claude-plugin/plugin.json",
  "agents/loop-architecture-reviewer.md",
  "agents/loop-docs-steward.md",
  "agents/loop-gatekeeper.md",
  "agents/loop-implementer.md",
  "agents/loop-issue-triager.md",
  "agents/loop-orchestrator.md",
  "agents/loop-product-prd.md",
  "agents/loop-release-manager.md",
  "agents/loop-reviewer.md",
  "agents/loop-security-reviewer.md",
  "agents/loop-tester.md",
  "agents/loop-verifier.md",
  "docs/agent-profiles.md",
  "docs/automatic-workflow-activation.md",
  "docs/developer-workflow.md",
  "skills/loop-factory/SKILL.md",
  "skills/loop-factory/references/requirement-intake.md",
  "skills/loop-factory/references/autonomous-pr-loop.md",
  "skills/loop-factory/references/reviewer-loop.md",
  "skills/loop-factory/references/verifier-loop.md",
  "templates/AGENTS.md",
  "templates/CLAUDE.md",
];

const errors = [];
for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) {
    errors.push(`Missing ${file}`);
  }
}

const stalePatterns = [
  { pattern: /\bAgent Role\b/, message: "Use Agent Profile instead of Agent Role" },
  { pattern: /\bagent roles\b/i, message: "Use agent profiles instead of agent roles" },
  { pattern: /\bLoop Factory roles\b/i, message: "Use Loop Factory profiles instead of Loop Factory roles" },
  { pattern: /\bcoordinated roles\b/i, message: "Use coordinated agent profiles instead of coordinated roles" },
  { pattern: /\brole playbooks\b/i, message: "Use agent profiles instead of role playbooks" },
  { pattern: /\bplugin agents\b/i, message: "Use agent profiles instead of plugin agents" },
  { pattern: /\bagent-roster\b/i, message: "Use agent-profiles instead of agent-roster" },
  { pattern: /\bnatural language\b/i, message: "Do not market natural language as a feature" },
  { pattern: /\binit --target\b/, message: "Public docs should use setup from the target repo" },
  { pattern: /\bdoctor --target\b/, message: "Public docs should use doctor from the target repo" },
  { pattern: /\bsetup --target \./, message: "Public docs should use setup from the target repo" },
  { pattern: /\bdoctor --agent\b/, message: "Doctor auto-detects installed agent CLIs" },
  { pattern: /--install-dir\b/, message: "Install uses the machine default ~/.loop-factory" },
  { pattern: /\binstall --agent\b/, message: "Install auto-detects agent CLIs" },
  { pattern: /^name:\s*(requirement-intake|autonomous-pr-loop|reviewer-loop|verifier-loop)\b/m, message: "Internal loop workflows must not be public skills" },
];

const textRoots = [
  ".agents",
  ".codex-plugin",
  ".claude-plugin",
  "agents",
  "assets",
  "docs",
  "examples",
  "skills",
  "templates",
];
const textFiles = [
  "CONTRIBUTING.md",
  "README.md",
  "SECURITY.md",
  "package.json",
  "packages/cli/package.json",
];

for (const rootName of textRoots) {
  textFiles.push(...listTextFiles(path.join(root, rootName)).map((file) => path.relative(root, file)));
}

for (const file of textFiles) {
  const fullPath = path.join(root, file);
  if (!existsSync(fullPath)) {
    continue;
  }
  const body = readFileSync(fullPath, "utf8");
  for (const { pattern, message } of stalePatterns) {
    if (pattern.test(body)) {
      errors.push(`${file}: ${message}`);
    }
  }
}

for (const skillDir of readdirSync(path.join(root, "skills"))) {
  const skillPath = path.join(root, "skills", skillDir, "SKILL.md");
  if (!existsSync(skillPath)) {
    errors.push(`Missing SKILL.md for ${skillDir}`);
    continue;
  }
  const body = readFileSync(skillPath, "utf8");
  if (!body.startsWith("---\n")) {
    errors.push(`${skillDir} missing YAML frontmatter`);
  }
  if (!/description:/m.test(body)) {
    errors.push(`${skillDir} missing description`);
  }
}

for (const manifest of [".codex-plugin/plugin.json", ".claude-plugin/plugin.json"]) {
  const parsed = JSON.parse(readFileSync(path.join(root, manifest), "utf8"));
  if (parsed.name !== "loop-factory") {
    errors.push(`${manifest} must use name loop-factory`);
  }
  if (!parsed.description) {
    errors.push(`${manifest} missing description`);
  }
}

const codexMarketplace = JSON.parse(readFileSync(path.join(root, ".agents/plugins/marketplace.json"), "utf8"));
if (codexMarketplace.name !== "loop-factory-local") {
  errors.push(".agents/plugins/marketplace.json must use name loop-factory-local");
}
const codexLoopFactoryEntry = codexMarketplace.plugins?.find((plugin) => plugin.name === "loop-factory");
if (!codexLoopFactoryEntry) {
  errors.push(".agents/plugins/marketplace.json must expose loop-factory");
} else if (codexLoopFactoryEntry.source?.path !== ".") {
  errors.push('.agents/plugins/marketplace.json loop-factory source path must be "."');
}

const claudeMarketplace = JSON.parse(readFileSync(path.join(root, ".claude-plugin/marketplace.json"), "utf8"));
if (claudeMarketplace.name !== "loop-factory-local") {
  errors.push(".claude-plugin/marketplace.json must use name loop-factory-local");
}
const claudeLoopFactoryEntry = claudeMarketplace.plugins?.find((plugin) => plugin.name === "loop-factory");
if (!claudeLoopFactoryEntry) {
  errors.push(".claude-plugin/marketplace.json must expose loop-factory");
} else if (claudeLoopFactoryEntry.source !== "./") {
  errors.push('.claude-plugin/marketplace.json loop-factory source must be "./"');
}

if (errors.length) {
  console.error("Loop Factory shape validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Loop Factory shape validation passed.");

function listTextFiles(directory) {
  if (!existsSync(directory)) {
    return [];
  }
  const output = [];
  for (const entry of readdirSync(directory)) {
    const fullPath = path.join(directory, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      output.push(...listTextFiles(fullPath));
    } else if (/\.(json|md|svg|yml|yaml)$/.test(entry)) {
      output.push(fullPath);
    }
  }
  return output;
}
