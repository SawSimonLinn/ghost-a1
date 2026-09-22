# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Design system & UI primitives (feature-specs/01-design-system.md)

## Current Goal

- Install and configure shadcn/ui, add core UI primitives, and wire the dark theme tokens into globals.css.

## Completed

- 01-design-system.md: shadcn/ui installed and configured (base-nova preset, `components.json`), `lucide-react` installed, `lib/utils.ts` exports `cn()`. Added `components/ui/{button,card,dialog,input,tabs,textarea,scroll-area}.tsx` via the shadcn CLI (unmodified). Wired the dark-only theme from `context/ui-context.md` into `app/globals.css` (`--bg-base`, `--bg-surface`, `--bg-elevated`, `--bg-subtle`, borders, text, accent, and state tokens), mapped to shadcn's standard variables (`--background`, `--card`, `--primary`, etc.) plus app-level Tailwind utilities (`bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, `bg-ai`, `text-error`, `bg-success`, `bg-warning`, etc.). `app/layout.tsx` now always applies the `dark` class to `<html>`.

## In Progress

- None yet.

## Next Up

- Add the next planned feature unit here.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Theme tokens live directly on `:root` (duplicated onto `.dark`) rather than only under `.dark`, since the app is dark-only and `<html>` always carries the `dark` class — avoids any light-mode flash and keeps shadcn's `dark:` variant classes in generated components active.
- shadcn was initialized with the `base-nova` preset (Base UI + Lucide + Geist) rather than Radix; component API surface is unaffected for this task's scope.

## Session Notes

- Verified in the browser (dev server + screenshot): dark background, cyan `--accent-primary` button, dark card/inputs, no light styling. `tsc --noEmit`, `next build`, and `eslint` all pass.
