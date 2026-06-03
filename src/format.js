const color = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  blue: "\x1b[34m",
  gray: "\x1b[90m"
};

export function formatExplanation(result, options = {}) {
  if (options.json) return JSON.stringify(result, null, 2);

  const c = options.plain ? plainColors() : color;
  const confidence = Math.round(result.confidence * 100);
  const statusColor = result.matched ? c.green : c.yellow;
  const lines = [];

  lines.push(`${statusColor}${c.bold}${result.title}${c.reset} ${c.gray}(${confidence}% match, ${result.language})${c.reset}`);
  lines.push("");
  lines.push(`${c.bold}What it means${c.reset}`);
  lines.push(wrap(result.summary));
  lines.push("");
  lines.push(`${c.bold}Why it happens${c.reset}`);
  result.why.forEach((line) => lines.push(`  ${c.blue}-${c.reset} ${wrap(line, 4)}`));
  lines.push("");
  lines.push(`${c.bold}Try this${c.reset}`);
  result.tryThis.forEach((line) => lines.push(`  ${c.green}-${c.reset} ${wrap(line, 4)}`));

  if (result.commands.length) {
    lines.push("");
    lines.push(`${c.bold}Useful commands${c.reset}`);
    result.commands.forEach((line) => lines.push(`  ${c.gray}$${c.reset} ${line}`));
  }

  if (result.checks.length) {
    lines.push("");
    lines.push(`${c.bold}Quick checks${c.reset}`);
    result.checks.forEach((line) => lines.push(`  ${c.yellow}-${c.reset} ${wrap(line, 4)}`));
  }

  return lines.join("\n");
}

export function formatRuleList(rules, options = {}) {
  if (options.json) return JSON.stringify(rules, null, 2);

  const c = options.plain ? plainColors() : color;
  const lines = [`${c.bold}Known error rules${c.reset}`, ""];

  rules.forEach((rule) => {
    lines.push(`${c.green}${rule.id}${c.reset} ${c.gray}${rule.language}${c.reset}`);
    lines.push(`  ${rule.title}`);
    lines.push(`  ${c.gray}${rule.example}${c.reset}`);
  });

  return lines.join("\n");
}

export function printHelp() {
  console.log(`Explain This Error Like I'm Tired

Usage:
  tired-error "ModuleNotFoundError: No module named 'xyz'"
  npm test 2>&1 | tired-error
  tired-error --language python "IndentationError: unexpected indent"

Options:
  --list              Show known rules
  --json              Print machine-readable output
  --plain             Disable color
  -l, --language      Prefer rules for one language
  -h, --help          Show help
`);
}

function plainColors() {
  return Object.fromEntries(Object.keys(color).map((key) => [key, ""]));
}

function wrap(text, indent = 0) {
  const width = Math.max(48, Math.min(92, process.stdout.columns || 92));
  const prefix = " ".repeat(indent);
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";

  words.forEach((word) => {
    if (`${line} ${word}`.trim().length > width - indent) {
      lines.push(line);
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  });

  if (line) lines.push(line);
  return lines.map((value, index) => (index === 0 ? value : `${prefix}${value}`)).join("\n");
}
