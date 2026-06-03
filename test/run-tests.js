import assert from "node:assert/strict";
import { explainError } from "../src/explain.js";

const tests = [
  {
    name: "explains Python missing modules with package-specific commands",
    run() {
      const result = explainError("ModuleNotFoundError: No module named 'requests'");

      assert.equal(result.matched, true);
      assert.equal(result.id, "python.module-not-found");
      assert.match(result.summary, /requests/);
      assert.ok(result.commands.includes("python -m pip install requests"));
    }
  },
  {
    name: "explains Node port conflicts",
    run() {
      const result = explainError("Error: listen EADDRINUSE: address already in use :::3000");

      assert.equal(result.matched, true);
      assert.equal(result.id, "node.eaddrinuse");
      assert.match(result.title, /3000/);
    }
  },
  {
    name: "can prefer a language",
    run() {
      const result = explainError("SyntaxError: invalid syntax", { language: "python" });

      assert.equal(result.matched, true);
      assert.equal(result.language, "python");
    }
  },
  {
    name: "returns a useful fallback when no rule matches",
    run() {
      const result = explainError("A very strange error nobody cataloged yet");

      assert.equal(result.matched, false);
      assert.equal(result.id, "unknown");
      assert.ok(result.tryThis.length > 0);
    }
  }
];

let failed = 0;

for (const test of tests) {
  try {
    test.run();
    console.log(`ok - ${test.name}`);
  } catch (error) {
    failed += 1;
    console.error(`not ok - ${test.name}`);
    console.error(error.stack);
  }
}

if (failed > 0) {
  process.exitCode = 1;
} else {
  console.log(`\n${tests.length} tests passed`);
}
