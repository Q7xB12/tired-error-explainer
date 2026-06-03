#!/usr/bin/env node

import { explainError, listRules } from "../src/explain.js";
import { formatExplanation, formatRuleList, printHelp } from "../src/format.js";

const args = process.argv.slice(2);

async function main() {
  const options = parseArgs(args);

  if (options.help) {
    printHelp();
    return;
  }

  if (options.list) {
    console.log(formatRuleList(listRules(), options));
    return;
  }

  const input = options.input || await readStdin();

  if (!input.trim()) {
    printHelp();
    process.exitCode = 1;
    return;
  }

  const result = explainError(input, options);
  console.log(formatExplanation(result, options));

  if (!result.matched) {
    process.exitCode = 2;
  }
}

function parseArgs(values) {
  const options = {
    input: "",
    json: false,
    plain: false,
    list: false,
    help: false,
    language: ""
  };

  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];

    if (value === "--help" || value === "-h") {
      options.help = true;
    } else if (value === "--json") {
      options.json = true;
      options.plain = true;
    } else if (value === "--plain") {
      options.plain = true;
    } else if (value === "--list") {
      options.list = true;
    } else if (value === "--language" || value === "-l") {
      options.language = values[index + 1] || "";
      index += 1;
    } else {
      options.input += `${options.input ? " " : ""}${value}`;
    }
  }

  return options;
}

function readStdin() {
  if (process.stdin.isTTY) return Promise.resolve("");

  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
