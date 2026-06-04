# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- React-specific error rules (6 rules)
  - Invalid hook calls
  - Hydration mismatches
  - Text content mismatches
  - Infinite render loops
  - Unmounted component updates
  - Missing keys in lists
- Next.js-specific error rules (6 rules)
  - Module resolution issues
  - Client/Server Component conflicts
  - Async Client Components
  - Dynamic server usage
  - Image hostname configuration
  - Metadata export errors
- Vite-specific error rules (5 rules)
  - Failed import resolution
  - Missing exports
  - Port conflicts
  - Module context errors
  - Sourcemap warnings
- ESLint configuration for code quality
- Prettier configuration for consistent formatting
- Comprehensive CONTRIBUTING.md guide
- GitHub Actions CI/CD workflow
- npm scripts for linting, formatting, and validation

### Changed
- Enhanced package.json with development scripts
- Improved documentation structure

## [0.1.0] - 2024-XX-XX

### Added
- Initial release with 14 base rules
- CLI with pipe support
- Plain and JSON output modes
- Language filtering
- Rule listing
- Fallback explanations for unknown errors
- Coverage for:
  - Python (module errors, imports, indentation, syntax)
  - JavaScript/Node (modules, files, ports, undefined properties)
  - npm (dependency resolution)
  - TypeScript (missing names, type mismatches)
  - Git (push conflicts)
  - Docker (port allocation)
  - System (permission errors)

[Unreleased]: https://github.com/yourusername/tired-error-explainer/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/yourusername/tired-error-explainer/releases/tag/v0.1.0
