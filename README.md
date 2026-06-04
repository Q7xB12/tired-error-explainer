# Explain This Error Like I'm Tired

A practical, rule-based CLI that turns ugly developer errors into calm explanations and next steps.

The product angle is intentionally not "AI magic." The MVP starts with a curated rules database for common errors, then returns explanations that are specific enough to act on.

## Example

```bash
tired-error "ModuleNotFoundError: No module named 'requests'"
```

Output:

```text
Python cannot find requests (98% match, python)

What it means
Your code is trying to import requests, but Python cannot find that package or module in the environment running the script.

Why it happens
  - requests is not installed in the active environment.
  - You may be using a different Python interpreter, virtual environment, or terminal than the one where the package was installed.
  - If requests is a local file, Python may be running from the wrong folder.

Try this
  - Install the missing package in the same environment that runs the code.
  - Confirm your virtual environment is active before running the app.
  - If it is your own file, check the filename and run the command from the project root.

Useful commands
  $ python -m pip install requests
  $ python -m pip show requests
  $ python -c "import sys; print(sys.executable)"
```

## Install Locally

This project has no runtime dependencies.

```bash
npm install
npm link
```

Then run:

```bash
tired-error "TypeError: Cannot read properties of undefined (reading 'map')"
```

You can also run it without linking:

```bash
node ./bin/tired-error.js "npm ERR! ERESOLVE unable to resolve dependency tree"
```

## Pipe Errors In

```bash
npm test 2>&1 | tired-error
```

```bash
python app.py 2>&1 | tired-error --language python
```

## Commands

```bash
tired-error --help
tired-error --list
tired-error --json "TS2304: Cannot find name 'process'"
tired-error --plain "Error: Cannot find module 'express'"
```

## Current Rule Coverage

- Python: missing modules, import name errors, syntax errors, indentation errors
- JavaScript/Node: missing modules, missing files, port conflicts, undefined/null property reads
- npm: dependency tree conflicts
- TypeScript: missing names, assignment mismatches
- Git: non-fast-forward push failures
- Docker: port allocation conflicts
- System: permission denied/access denied errors

## Project Structure

```text
tired-error-explainer/
  bin/tired-error.js       CLI entrypoint
  src/explain.js           matching and explanation engine
  src/format.js            terminal output formatting
  src/rules.js             rule database
  test/run-tests.js        lightweight assertion tests
  examples/                sample error inputs
```

## Product Direction

Good next steps:

- Add more framework-specific rules for React, Next.js, Vite, Django, FastAPI, Rails, and Docker Compose.
- Add `--copy-fix` to copy the most likely command to the clipboard.
- Add a VS Code extension wrapper that explains the selected terminal output.
- Add team rules from a local `.tired-errors.json` file.
- Track which suggestions solved the issue to improve rule ranking.

## Test

```bash
npm test
```
