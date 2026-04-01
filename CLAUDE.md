# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Small TypeScript library for resolving templated HATEOAS links (RFC 6570 subset). Published as `hateoas-link-resolver` on npm with dual ESM/CJS output.

## Commands

- **Test:** `bun test`
- **Test single file:** `bun test test/resolve.test.ts`
- **Build:** `bun run build` (cleans dist, then builds ESM + CJS + type declarations)
- **Format:** `bun run format` (Biome — format + lint auto-fix)
- **Lint check:** `bun run format:check` (CI-safe, no writes)

## Architecture

Three source files in `src/`, all re-exported from `src/index.ts`:

- **resolve.ts** — `resolve(link, params)` function. Replaces `{param}` path placeholders, extracts optional query params from `{?...}` and `{&...}` suffixes, throws on missing/null path params.
- **link-repository.ts** — `LinkRepository` class. Typed map over `{href, templated}` link objects with `has()`, `get()`, and `resolve()` methods. Generic over the link DTO shape for type-safe key access.
- **params.ts** — `Params` interface (`Record<string, string | number | boolean | undefined | null>`).

## Build Pipeline

`build.ts` uses the Bun bundler API to produce three output targets:
- `dist/esm/index.js` — ESM bundle
- `dist/cjs/index.cjs` — CJS bundle
- `dist/types/` — type declarations via tsc (`emitDeclarationOnly`)

## Testing

Tests use Bun's built-in test runner with `describe`/`test`/`expect` from `bun:test`. Test files are in `test/`.

## Publish

Automated via GitHub Actions: push a tag `v*` to trigger `.github/workflows/release.yml` which runs tests, builds, and publishes to npm via `bun publish`. Requires `NPM_TOKEN` secret.
