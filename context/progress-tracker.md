# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Editor chrome (feature-specs/02-editor-chrome.md) — base chrome shell complete.

## Current Goal

- Add the next planned editor-chrome feature unit (see feature-specs for what follows the navbar/sidebar shell).

## Completed

- 01-design-system.md: shadcn/ui installed and configured (base-nova preset, `components.json`), `lucide-react` installed, `lib/utils.ts` exports `cn()`. Added `components/ui/{button,card,dialog,input,tabs,textarea,scroll-area}.tsx` via the shadcn CLI (unmodified). Wired the dark-only theme from `context/ui-context.md` into `app/globals.css` (`--bg-base`, `--bg-surface`, `--bg-elevated`, `--bg-subtle`, borders, text, accent, and state tokens), mapped to shadcn's standard variables (`--background`, `--card`, `--primary`, etc.) plus app-level Tailwind utilities (`bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, `bg-ai`, `text-error`, `bg-success`, `bg-warning`, etc.). `app/layout.tsx` now always applies the `dark` class to `<html>`.
- 02-editor-chrome.md: added `components/editor/editor-navbar.tsx` — fixed-height (`h-14`) top navbar, `bg-surface` with `border-b border-surface-border`, three equal-width left/center/right sections, left section holds the sidebar toggle button switching between `PanelLeftOpen`/`PanelLeftClose` based on the `isSidebarOpen` prop; right section left empty per spec. Added `components/editor/project-sidebar.tsx` — `fixed`-positioned floating panel (`rounded-2xl`, `bg-elevated/95`, backdrop blur) so it overlays the canvas without affecting layout flow, slides in/out via a `translate-x` transition driven by the `isOpen` prop, header with "Projects" title and close (`X`) button, shadcn `Tabs` with "My Projects" / "Shared" both rendering an empty placeholder state, and a full-width `New Project` button with a `Plus` icon pinned to the bottom. Confirmed the existing `components/ui/dialog.tsx` (from 01-design-system.md) already satisfies the dialog pattern requirement (token-based styling, title/description/footer slots) — left unmodified since it's a protected foundation component and no actual dialogs were to be built yet. `app/page.tsx` (client component, `useState` for sidebar toggle) now composes `EditorNavbar` + `ProjectSidebar` directly — no separate wrapper component; this is the temporary home page used to see the two chrome pieces working together until the real `/editor/[roomId]` route from `08-editor-workspace-shell.md` exists.

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
- `editor-navbar.tsx` / `project-sidebar.tsx` verified with `tsc --noEmit`, `eslint`, and `next build` (all pass). Not yet wired into a route/page — no page currently mounts the editor chrome, so no browser check was done for this unit; that wiring belongs to a later feature unit per the spec-driven scoping rules.
