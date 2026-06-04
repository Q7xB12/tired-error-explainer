# Contributing to Tired Error Explainer

Thank you for helping make error messages more humane! This guide will help you add rules, fix bugs, and improve the tool.

## Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd tired-error-explainer
npm install
npm link

# Test your changes
npm test
```

## Adding a New Rule

The most valuable contribution is adding rules for common errors. Here's how:

### 1. Find a Real Error

Start with an error you or your team hits often. Copy the full error message.

**Example:**
```
Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

### 2. Create the Rule

Add to `src/rules.js`:

```javascript
{
  id: "react.hydration-mismatch",  // Unique, descriptive ID
  language: "javascript",           // Broad category
  confidence: 0.95,                 // How certain this pattern is (0-1)
  pattern: /Hydration failed.*initial UI does not match/i,
  title: "React hydration mismatch",
  summary: "The HTML React generated on the server differs from what the browser rendered, breaking hydration.",
  why: [
    "Server and client may be rendering different content (e.g., Date.now(), random IDs).",
    "A component may be using browser-only APIs during SSR.",
    "Conditional rendering may differ between server and client."
  ],
  tryThis: [
    "Check for Date.now(), Math.random(), or browser APIs in the initial render.",
    "Use useEffect for client-only code.",
    "Ensure server and client props are identical."
  ],
  checks: [
    "Does the component use window, document, or localStorage before useEffect?",
    "Is the component rendering different content based on time or randomness?"
  ],
  commands: [],
  example: "Error: Hydration failed because the initial UI does not match what was rendered on the server."
}
```

### 3. Test the Rule

Add to `test/rule-tests.js` (create if needed):

```javascript
{
  name: "explains React hydration mismatches",
  run() {
    const result = explainError(
      "Hydration failed because the initial UI does not match what was rendered on the server."
    );

    assert.equal(result.matched, true);
    assert.equal(result.id, "react.hydration-mismatch");
    assert.match(result.summary, /hydration/i);
  }
}
```

Run tests:
```bash
npm test
```

### 4. Add an Example File

Create `examples/react-hydration.txt`:
```
Uncaught Error: Hydration failed because the initial UI does not match what was rendered on the server.
    at throwOnHydrationMismatch (react-dom.development.js:4043:9)
```

Test manually:
```bash
tired-error --file examples/react-hydration.txt
```

### 5. Submit PR

```bash
git checkout -b add-rule-react-hydration
git add src/rules.js test/rule-tests.js examples/react-hydration.txt
git commit -m "Add rule for React hydration mismatch"
git push origin add-rule-react-hydration
```

Open a PR with:
- Rule description
- Why it's useful
- Example of error it catches

## Rule Writing Guidelines

### Pattern Tips

**Use named capture groups** for values that appear in explanations:
```javascript
pattern: /Cannot find module ['"](?<module>[^'"]+)['"]/i
title: "Node cannot find {module}"
```

**Make patterns flexible:**
- Case-insensitive when appropriate: `/pattern/i`
- Allow variations: `(?:Error: )?Module not found`
- Handle quotes: `['"]?value['"]?`

**Test edge cases:**
- Single quotes, double quotes, no quotes
- Extra whitespace
- ANSI color codes (automatically stripped)

### Confidence Scoring

- **0.95-1.0**: Extremely specific, unlikely to false positive
- **0.85-0.94**: Very specific, minor ambiguity
- **0.70-0.84**: Moderately specific, could match similar errors
- **0.50-0.69**: Broad match, use only for common patterns

**Examples:**
```javascript
// High confidence: exact error string
confidence: 0.98
pattern: /ModuleNotFoundError: No module named/

// Medium confidence: could be multiple causes
confidence: 0.85
pattern: /SyntaxError/

// Low confidence: very broad
confidence: 0.70
pattern: /Error/
```

### Tone Guidelines

Follow the project's "tired-person friendly" voice:

**✅ Do:**
- Be direct: "Python cannot find requests"
- Be specific: "Install in the same environment that runs the code"
- Be actionable: "Run `python -m pip install requests`"
- Be kind: "This happens when..."

**❌ Don't:**
- Condescend: "Simply install it"
- Over-explain: Long theory before action
- Assume context: "This is obviously because..."
- Use jargon unnecessarily

**Example comparison:**

❌ Bad:
```javascript
summary: "Obviously you didn't install the module. Simply run pip install."
```

✅ Good:
```javascript
summary: "Python cannot find the module. It may not be installed in the active environment."
```

### Structure Template

```javascript
{
  id: "category.specific-error",
  language: "python|javascript|typescript|system|docker|git",
  confidence: 0.90,
  pattern: /Error pattern with (?<capture>group)/i,
  title: "Brief diagnosis",
  summary: "One-sentence calm explanation of what this means.",
  why: [
    "Most common cause.",
    "Second most common cause.",
    "Edge case cause."
  ],
  tryThis: [
    "First action to try.",
    "Second action to try.",
    "Last resort action."
  ],
  checks: [
    "Quick thing to verify?",
    "Another thing to check?"
  ],
  commands: [
    "helpful-command --flag",
    "diagnostic-command"
  ],
  example: "Real error message that matches"
}
```

## Testing

### Run All Tests
```bash
npm test
```

### Test a Specific Error
```bash
node bin/tired-error.js "your error message here"
```

### Test with Example Files
```bash
tired-error --file examples/python-missing-module.txt
```

### Watch Mode
```bash
npm run test:watch
```

## Code Style

We use ESLint and Prettier for consistent code style.

### Before committing:
```bash
npm run lint:fix    # Fix linting issues
npm run format      # Format code
npm run validate    # Run all checks
```

### Style rules:
- Use double quotes
- Use semicolons
- Prefer `const` over `let`
- Use template literals for string interpolation
- Name functions and variables descriptively

## Project Structure

```
tired-error-explainer/
├── bin/
│   └── tired-error.js       # CLI entrypoint
├── src/
│   ├── explain.js           # Core matching engine
│   ├── format.js            # Terminal output formatting
│   ├── rules.js             # Rule database
│   └── (future: load-rules.js, matchers/, etc.)
├── test/
│   ├── run-tests.js         # Main test runner
│   └── rule-tests.js        # Per-rule tests
├── examples/
│   └── *.txt                # Real error examples
└── docs/
    └── (future: guides, API docs)
```

## Common Tasks

### Add a new language category
1. Add language to `src/rules.js`
2. Update README with new category
3. Add at least 3 rules for that language

### Improve pattern matching
1. Create `src/matchers/` directory
2. Implement new matching strategy
3. Update `src/explain.js` to use it
4. Add tests

### Add CLI flag
1. Update `parseArgs()` in `bin/tired-error.js`
2. Handle flag in `main()`
3. Update `printHelp()`
4. Document in README

## Commit Message Format

Use conventional commits:

```
feat: add rule for Next.js hydration errors
fix: improve Python import error pattern matching
docs: add contributing guide
test: add tests for Git rules
refactor: extract rule loading logic
```

## Pull Request Checklist

- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Code is formatted (`npm run format`)
- [ ] New rules have tests
- [ ] New rules have example files
- [ ] README updated if needed
- [ ] CHANGELOG updated (for significant changes)

## Questions?

- Open a GitHub issue
- Check existing issues/PRs for similar work
- Read DESIGN.md for product philosophy

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
