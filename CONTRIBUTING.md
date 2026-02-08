# Contributing to Starforge Engine

Thank you for taking the time to contribute!

## Development Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Run the sandbox:
   ```bash
   pnpm dev
   ```
3. Run tests:
   ```bash
   pnpm test
   pnpm test:e2e
   ```

## Code Style

- TypeScript strict mode is required.
- Use ESLint and Prettier (`pnpm lint`, `pnpm format`).
- Prefer readable, well-commented code over cleverness.

## Pull Requests

- Keep PRs focused.
- Add tests for new behavior when possible.
- Update docs if the public API changes.

## Reporting Issues

- Provide a minimal repro.
- Include browser and OS details.
- Attach logs or screenshots if applicable.
