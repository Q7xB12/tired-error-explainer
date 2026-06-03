import { rules } from "./rules.js";

export function explainError(input, options = {}) {
  const normalizedInput = String(input).trim();
  const preferredLanguage = normalizeLanguage(options.language);

  const candidates = rules
    .filter((rule) => !preferredLanguage || normalizeLanguage(rule.language) === preferredLanguage)
    .map((rule) => {
      const match = rule.pattern.exec(normalizedInput);
      if (!match) return null;
      return buildExplanation(rule, match, normalizedInput);
    })
    .filter(Boolean)
    .sort((a, b) => b.confidence - a.confidence);

  if (candidates[0]) return candidates[0];

  return fallbackExplanation(normalizedInput, preferredLanguage);
}

export function listRules() {
  return rules.map((rule) => ({
    id: rule.id,
    language: rule.language,
    title: rule.title,
    example: rule.example
  }));
}

function buildExplanation(rule, match, input) {
  const context = Object.fromEntries(
    Object.entries(match.groups || {}).map(([key, value]) => [key, cleanCapture(value)])
  );
  if (!context.port && context.altPort) context.port = context.altPort;

  return {
    matched: true,
    id: rule.id,
    title: fill(rule.title, context),
    language: rule.language,
    confidence: rule.confidence,
    summary: fill(rule.summary, context),
    why: rule.why.map((line) => fill(line, context)),
    tryThis: rule.tryThis.map((line) => fill(line, context)),
    checks: rule.checks.map((line) => fill(line, context)),
    commands: rule.commands.map((line) => fill(line, context)),
    original: input
  };
}

function fallbackExplanation(input, language) {
  return {
    matched: false,
    id: "unknown",
    title: "No exact match yet",
    language: language || "unknown",
    confidence: 0.22,
    summary: "I do not have a specific rule for this one yet, but the useful move is to shrink the error down to its first cause and verify the environment it ran in.",
    why: [
      "Long error output often includes follow-up failures after the real issue.",
      "The first named exception, missing file, missing command, or failed import is usually the best starting point."
    ],
    tryThis: [
      "Copy the first error line and the last error line into your search or issue notes.",
      "Re-run the command from the project root.",
      "Check whether the right runtime, virtual environment, container, or package manager is active."
    ],
    checks: [
      "Did this command work yesterday, or is this a fresh setup?",
      "Did a dependency, lockfile, environment variable, or working directory change?"
    ],
    commands: [],
    original: input
  };
}

function fill(template, context) {
  return template.replace(/\{([a-zA-Z0-9_]+)\}/g, (_, key) => context[key] || "the referenced value");
}

function cleanCapture(value) {
  return String(value || "")
    .replace(/^['"`]|['"`]$/g, "")
    .trim();
}

function normalizeLanguage(value = "") {
  return String(value).trim().toLowerCase();
}
