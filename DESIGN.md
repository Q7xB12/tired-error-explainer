# Product Design Notes

## Positioning

Explain This Error Like I'm Tired is a calm debugging assistant for developers who already know they need to fix the error, but do not have the energy to decode hostile tooling output.

The MVP is rule-based on purpose:

- Fast and deterministic
- Easy to review
- Safe to run offline
- Good enough for the most repeated developer pain
- Ready for team-specific rules later

## Output Anatomy

Each explanation has the same shape:

1. Plain-language title
2. Confidence and source language
3. What it means
4. Why it happens
5. Try this
6. Useful commands
7. Quick checks

This keeps the tool practical. It does not lecture, over-explain, or pretend to know the whole codebase.

## Rule Shape

Rules live in `src/rules.js`.

Each rule includes:

- `id`: stable identifier for tests, telemetry, and docs
- `language`: broad source category
- `confidence`: ranking score from 0 to 1
- `pattern`: regex with named captures
- `title`: short diagnosis
- `summary`: one calm explanation
- `why`: likely causes
- `tryThis`: direct next steps
- `checks`: quick things to verify
- `commands`: commands that may help
- `example`: sample matching error

Named capture groups can be used in text with `{name}` placeholders.

## Tone

The product voice should be:

- Direct
- Kind
- Specific
- Unpatronizing
- Tired-person friendly

Avoid:

- "Simply"
- "Obviously"
- Long theory dumps
- Fake certainty
- Commands that could delete or overwrite work

## VS Code Extension Path

A VS Code extension can wrap the existing engine without changing the rules:

1. Add a command: `Explain Selected Error`
2. Read selected text from editor or terminal copy buffer
3. Call `explainError(selectedText)`
4. Render the formatted result in a webview or output panel
5. Add a quick action to copy useful commands

The CLI should remain the core product surface until the rule database is strong.
