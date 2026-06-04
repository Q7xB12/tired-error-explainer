# Tired Error Explainer - Improvement Roadmap

## 🎯 Executive Summary

**Current State**: Solid MVP with rule-based error matching and calm, practical explanations.

**Strengths**:
- ✅ Zero dependencies (fast install)
- ✅ Clean architecture (explain → format → output)
- ✅ Good tone and UX design
- ✅ Practical command suggestions
- ✅ Works offline

**Key Opportunities**:
1. **Expand rule coverage** - 14 rules → 50+ rules
2. **Add testing infrastructure** - Minimal tests → comprehensive suite
3. **Improve matching accuracy** - Regex only → multi-stage matching
4. **Enable extensibility** - Hardcoded rules → user/team rules
5. **Build ecosystem** - CLI only → VS Code extension, CI integration

## 📊 Impact Analysis

### Current Coverage Gaps

**Missing Common Errors** (High Impact):
- React: "Hooks can only be called inside the body of a function component"
- Next.js: "Hydration failed", "Text content mismatch"
- Vite: "Failed to resolve import", "The requested module doesn't provide export"
- Django: "OperationalError: no such table"
- PostgreSQL: "FATAL: database does not exist"
- Redis: "ECONNREFUSED"
- Webpack: "Module not found: Error: Can't resolve"

**Missing Frameworks** (Medium Impact):
- FastAPI, Flask, Rails, Laravel
- Prisma, Drizzle, TypeORM
- Jest, Vitest, Pytest fixtures
- Kubernetes, Docker Compose errors

### Performance Metrics

| Metric | Current | Target | Priority |
|--------|---------|--------|----------|
| Rule Coverage | 14 rules | 50+ rules | 🔴 High |
| Test Coverage | 4 tests | 50+ tests | 🟡 Medium |
| Match Accuracy | ~85% | 95%+ | 🟡 Medium |
| Response Time | <10ms | <20ms | 🟢 Low |
| Install Size | ~50KB | <500KB | 🟢 Low |

## 🚀 Implementation Phases

### Phase 1: Testing & Quality (Week 1)
**Priority: HIGH** - Foundation for all improvements

#### 1.1 Enhanced Test Suite
```javascript
// test/rule-tests.js - Test every rule
import { testRule } from './test-helpers.js';

testRule('python.module-not-found', [
  {
    input: "ModuleNotFoundError: No module named 'requests'",
    expectMatch: true,
    expectCaptures: { module: 'requests' }
  },
  {
    input: "ModuleNotFoundError: No module named 'my_custom_pkg'",
    expectMatch: true,
    expectCaptures: { module: 'my_custom_pkg' }
  }
]);
```

**Tasks:**
- [ ] Add test for every existing rule
- [ ] Test edge cases (quotes, special chars, multiline)
- [ ] Test capture group extraction
- [ ] Test command interpolation

#### 1.2 Linting & Formatting
```bash
npm install --save-dev eslint prettier
```

**ESLint Config:**
- No unused variables
- Consistent quotes
- No console (except in bin/)

### Phase 2: Rule Expansion (Weeks 2-3)
**Priority: HIGH** - User value

#### 2.1 React & Next.js Rules
```javascript
{
  id: "react.invalid-hook-call",
  language: "javascript",
  confidence: 0.96,
  pattern: /Invalid hook call\. Hooks can only be called inside.*function component/is,
  title: "React Hook called outside a component",
  summary: "Hooks (useState, useEffect, etc.) can only be called at the top level of function components or custom hooks.",
  why: [
    "The hook may be called inside a regular function, class, or conditional.",
    "The file may not be recognized as a component (must start with capital letter).",
    "react and react-dom versions may be mismatched."
  ],
  tryThis: [
    "Move the hook call to the top level of the component function.",
    "Rename the function to start with a capital letter if it's a component.",
    "Extract conditional hook logic into a separate component."
  ],
  checks: [
    "Is the hook inside an if statement, loop, or nested function?",
    "Does the function name start with a lowercase letter?"
  ],
  commands: [
    "npm list react react-dom"
  ],
  example: "Error: Invalid hook call. Hooks can only be called inside the body of a function component."
}
```

#### 2.2 Database & ORM Rules
- PostgreSQL connection errors
- SQLite "database is locked"
- Prisma migration errors
- MongoDB connection string issues

#### 2.3 Build Tool Rules
- Vite import resolution
- Webpack module errors
- ESBuild syntax errors
- Rollup external dependencies

### Phase 3: Matching Improvements (Week 4)
**Priority: MEDIUM** - Accuracy

#### 3.1 Multi-Stage Matching
```javascript
// src/matchers/smart-match.js
export function smartMatch(input, rule) {
  // Stage 1: Quick regex filter
  if (!rule.pattern.test(input)) return null;
  
  // Stage 2: Extract key phrases
  const keyPhrases = extractKeyPhrases(input);
  if (!hasRequiredPhrases(rule, keyPhrases)) return null;
  
  // Stage 3: Full regex with captures
  return rule.pattern.exec(input);
}
```

#### 3.2 Confidence Scoring
```javascript
// Adjust confidence based on context
function adjustConfidence(baseConfidence, context) {
  let score = baseConfidence;
  
  // Boost if error message is clean
  if (context.isCleanError) score += 0.05;
  
  // Penalize if surrounded by noise
  if (context.hasNoise) score -= 0.10;
  
  return Math.max(0, Math.min(1, score));
}
```

### Phase 4: Extensibility (Week 5)
**Priority: MEDIUM** - Team adoption

#### 4.1 Custom Rules File
```json
// .tired-errors.json
{
  "rules": [
    {
      "id": "custom.api-key-missing",
      "language": "javascript",
      "confidence": 0.95,
      "pattern": "Missing API_KEY",
      "title": "API key not configured",
      "summary": "Our app needs API_KEY set in .env",
      "why": [
        "The .env file may be missing",
        "You may need to copy .env.example"
      ],
      "tryThis": [
        "Copy .env.example to .env",
        "Ask in #engineering for the dev API key"
      ],
      "commands": ["cp .env.example .env"]
    }
  ]
}
```

#### 4.2 Rule Loading
```javascript
// src/load-rules.js
export function loadAllRules() {
  const builtIn = rules;
  const custom = loadCustomRules('./.tired-errors.json');
  const team = loadCustomRules('~/.config/tired-error/rules.json');
  
  return [...builtIn, ...custom, ...team];
}
```

### Phase 5: CLI Enhancements (Week 6)
**Priority: LOW** - Nice to have

#### 5.1 Interactive Mode
```bash
tired-error --interactive
# Prompts for: paste error, select language, show detailed explanation
```

#### 5.2 Copy to Clipboard
```bash
tired-error "error text" --copy-fix
# Copies the first suggested command to clipboard
```

#### 5.3 Watch Mode
```bash
npm test 2>&1 | tired-error --watch
# Re-explains on each new error
```

### Phase 6: VS Code Extension (Weeks 7-8)
**Priority: MEDIUM** - Developer reach

#### 6.1 Extension Structure
```
vscode-tired-error/
  package.json
  src/
    extension.ts        # Entry point
    explainer.ts        # Wraps ../src/explain.js
    webview.ts          # Formatted output display
```

#### 6.2 Commands
- "Explain Selected Error"
- "Explain Terminal Output"
- "Copy Fix Command"

#### 6.3 Features
- Syntax highlighting for commands
- Click to copy commands
- Inline code actions on error detection

## 📋 Detailed Improvements

### A. Code Quality

#### A.1 Type Safety
```javascript
// src/types.js
/**
 * @typedef {Object} Rule
 * @property {string} id
 * @property {string} language
 * @property {number} confidence
 * @property {RegExp} pattern
 * @property {string} title
 * @property {string} summary
 * @property {string[]} why
 * @property {string[]} tryThis
 * @property {string[]} checks
 * @property {string[]} commands
 * @property {string} example
 */
```

#### A.2 Error Handling
```javascript
// bin/tired-error.js
try {
  const result = explainError(input, options);
  console.log(formatExplanation(result, options));
} catch (error) {
  if (options.debug) {
    console.error('Debug trace:', error.stack);
  }
  console.error('Failed to process error. Pass --debug for details.');
  process.exitCode = 1;
}
```

#### A.3 Input Sanitization
```javascript
// src/explain.js
function sanitizeInput(input) {
  // Remove ANSI color codes
  let clean = input.replace(/\x1b\[[0-9;]*m/g, '');
  
  // Normalize whitespace
  clean = clean.replace(/\s+/g, ' ').trim();
  
  // Limit length to prevent DoS
  if (clean.length > 10000) {
    clean = clean.substring(0, 10000);
  }
  
  return clean;
}
```

### B. Performance

#### B.1 Rule Caching
```javascript
// src/rule-cache.js
const compiledPatterns = new Map();

export function getCachedPattern(rule) {
  if (!compiledPatterns.has(rule.id)) {
    compiledPatterns.set(rule.id, rule.pattern);
  }
  return compiledPatterns.get(rule.id);
}
```

#### B.2 Early Exit
```javascript
// src/explain.js
function findMatch(input, rules, options) {
  // Try high-confidence exact matches first
  for (const rule of rules) {
    if (rule.confidence > 0.95) {
      const match = tryMatch(rule, input);
      if (match) return buildExplanation(rule, match, input);
    }
  }
  
  // Then try all others
  // ...
}
```

### C. UX Improvements

#### C.1 Progress Indicator
```bash
$ python app.py 2>&1 | tired-error
Analyzing... found 3 potential matches
```

#### C.2 Color Themes
```javascript
// src/themes.js
export const themes = {
  default: { /* ANSI codes */ },
  light: { /* lighter colors */ },
  solarized: { /* solarized palette */ }
};

// Usage
tired-error --theme solarized "error"
```

#### C.3 Verbosity Levels
```bash
# Brief (title + first action only)
tired-error --brief "error"

# Normal (current output)
tired-error "error"

# Detailed (includes additional context)
tired-error --verbose "error"
```

### D. Documentation

#### D.1 Contributing Guide
```markdown
# CONTRIBUTING.md

## Adding a New Rule

1. Add rule to `src/rules.js`
2. Add test case to `test/rule-tests.js`
3. Add example file to `examples/`
4. Run `npm test`
5. Update rule count in README
```

#### D.2 Rule Writing Guide
```markdown
# docs/writing-rules.md

## Pattern Guidelines

- Use named capture groups: `(?<name>...)`
- Make patterns case-insensitive when appropriate
- Test with variations (quotes, whitespace)
- Avoid overly broad patterns

## Tone Guidelines

- Be direct, not condescending
- Focus on "what to do" not "what you did wrong"
- Provide specific commands when possible
```

#### D.3 API Documentation
```markdown
# docs/api.md

## explainError(input, options)

Returns an explanation object.

### Parameters
- `input` (string): Error message
- `options` (object):
  - `language` (string): Preferred language filter
  - `threshold` (number): Minimum confidence (0-1)

### Returns
- `matched` (boolean)
- `id` (string)
- `title` (string)
- `confidence` (number)
- `summary` (string)
- `why` (string[])
- `tryThis` (string[])
- `checks` (string[])
- `commands` (string[])
```

## 🔧 Quick Wins (< 1 day each)

- [ ] Add `--version` flag
- [ ] Add `--debug` flag for stack traces
- [ ] Add `--threshold` to filter low-confidence matches
- [ ] Support reading from file: `tired-error --file error.log`
- [ ] Add exit codes documentation
- [ ] Create `examples/` with 10+ real error files
- [ ] Add GitHub Actions for CI
- [ ] Publish to npm
- [ ] Add badges to README (version, tests, license)
- [ ] Create CHANGELOG.md

## 📈 Success Metrics

### Usage Metrics (if telemetry added)
- Rule hit rate
- Average confidence score
- Most common unmatched errors
- Time to first match

### Quality Metrics
- Test coverage: 80%+
- Rule coverage: 50+ rules
- Average user rating (GitHub stars)
- Issue resolution time

### Adoption Metrics
- npm downloads
- VS Code extension installs
- GitHub stars/forks
- Community contributions

## 🎯 Long-Term Vision

### 1. ML-Enhanced Matching
- Use embeddings for semantic similarity
- Learn from user feedback
- Personalized confidence adjustments

### 2. Multi-Tool Integration
- GitHub Actions integration
- CircleCI/Jenkins plugins
- Slack bot
- Discord bot

### 3. Community Rules
- Central repository of community rules
- Upvote/downvote system
- Auto-update mechanism

### 4. Analytics Dashboard
- Track which errors are most common in your team
- Identify recurring issues
- Suggest preventive measures

## 🚦 Risk Mitigation

### Technical Risks
- **Regex complexity**: Add pattern validation
- **Memory usage**: Implement streaming for large inputs
- **Breaking changes**: Follow semver strictly

### Product Risks
- **Scope creep**: Keep core simple, extensible
- **Maintenance burden**: Accept contributions early
- **User confusion**: Maintain clear docs

## 💡 Innovation Ideas

### Smart Suggestions
```bash
$ tired-error "error" --fix
Found: Python cannot find requests
Shall I run: python -m pip install requests? (y/n)
```

### Error Patterns
```bash
$ tired-error --analyze ./error-logs/
Top 5 errors in your logs:
1. ModuleNotFoundError (23 times)
2. Port conflicts (18 times)
3. TypeScript errors (12 times)
```

### Team Memory
```bash
$ tired-error "error" --remember-fix "added to .env"
# Next time this error appears, suggests what worked last time
```

