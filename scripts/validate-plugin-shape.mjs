import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const requiredFiles = [
  ".codex-plugin/plugin.json",
  ".claude-plugin/plugin.json",
  "skills/loop-factory/SKILL.md",
  "skills/requirement-intake/SKILL.md",
  "skills/autonomous-pr-loop/SKILL.md",
  "skills/reviewer-loop/SKILL.md",
  "skills/verifier-loop/SKILL.md",
  "templates/AGENTS.md",
  "templates/CLAUDE.md",
];

const errors = [];
for (const file of requiredFiles) {
  if (!existsSync(path.join(root, file))) {
    errors.push(`Missing ${file}`);
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

if (errors.length) {
  console.error("Loop Factory shape validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Loop Factory shape validation passed.");

