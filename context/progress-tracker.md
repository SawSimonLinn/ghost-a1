# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Auth (feature-specs/03-auth.md) — Clerk wired into the app; complete.

## Current Goal

- Add the next planned feature unit (see feature-specs/04-project-dialogs.md onward).

## Completed

- 01-design-system.md: shadcn/ui installed and configured (base-nova preset, `components.json`), `lucide-react` installed, `lib/utils.ts` exports `cn()`. Added `components/ui/{button,card,dialog,input,tabs,textarea,scroll-area}.tsx` via the shadcn CLI (unmodified). Wired the dark-only theme from `context/ui-context.md` into `app/globals.css` (`--bg-base`, `--bg-surface`, `--bg-elevated`, `--bg-subtle`, borders, text, accent, and state tokens), mapped to shadcn's standard variables (`--background`, `--card`, `--primary`, etc.) plus app-level Tailwind utilities (`bg-base`, `bg-surface`, `text-copy-primary`, `text-copy-muted`, `border-surface-border`, `text-brand`, `bg-accent-dim`, `bg-ai`, `text-error`, `bg-success`, `bg-warning`, etc.). `app/layout.tsx` now always applies the `dark` class to `<html>`.
- 02-editor-chrome.md: added `components/editor/editor-navbar.tsx` — fixed-height (`h-14`) top navbar, `bg-surface` with `border-b border-surface-border`, three equal-width left/center/right sections, left section holds the sidebar toggle button switching between `PanelLeftOpen`/`PanelLeftClose` based on the `isSidebarOpen` prop; right section holds the Clerk `UserButton` (added in 03-auth.md). Added `components/editor/project-sidebar.tsx` — `fixed`-positioned floating panel (`rounded-2xl`, `bg-elevated/95`, backdrop blur) so it overlays the canvas without affecting layout flow, slides in/out via a `translate-x` transition driven by the `isOpen` prop, header with "Projects" title and close (`X`) button, shadcn `Tabs` with "My Projects" / "Shared" both rendering an empty placeholder state, and a full-width `New Project` button with a `Plus` icon pinned to the bottom. Confirmed the existing `components/ui/dialog.tsx` (from 01-design-system.md) already satisfies the dialog pattern requirement (token-based styling, title/description/footer slots) — left unmodified since it's a protected foundation component and no actual dialogs were to be built yet.
- 03-auth.md: installed `@clerk/ui`. `proxy.ts` at the project root uses `clerkMiddleware` + `createRouteMatcher` (protected-first: only `NEXT_PUBLIC_CLERK_SIGN_IN_URL`/`NEXT_PUBLIC_CLERK_SIGN_UP_URL` are public, everything else calls `auth.protect()`); added those two env vars to `.env.local` (Clerk's own standard names — they didn't exist yet, needed for the proxy and Clerk's own redirect flow). `app/layout.tsx` wraps `<html>` in `ClerkProvider` using `@clerk/ui/themes` `dark` as the base theme, with `variables` overriding Clerk's palette/typography to the app's own CSS custom properties (`--bg-elevated`, `--text-primary`, `--accent-primary`, `--border-default`, etc., plus `fontFamily`/`fontFamilyMono` pointed at `--font-geist-sans`/`--font-geist-mono`) — no hardcoded colors. Added `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` rendering Clerk's `<SignIn />`/`<SignUp />` inside a new `components/auth/auth-split-layout.tsx`: two-panel on `lg:`, left panel (`bg-elevated`, differentiated from the `bg-base` right side) with compact logo + tagline + text-only feature list, right panel centered form; form-only (left panel hidden) below `lg:`. No gradients, hero sections, feature cards, or scroll-heavy layout. `app/page.tsx` is now a server component: `await auth()` then `redirect("/editor")` if authenticated, else `redirect("/sign-in")`. Relocated the temporary chrome-preview content that used to live at `/page.tsx` to `app/editor/page.tsx` unchanged, so the `/` → `/editor` redirect lands somewhere real instead of a 404 until `08-editor-workspace-shell.md` replaces it with the actual workspace. Fixed a pre-existing bug in `app/globals.css` found while wiring Clerk's fonts: `--font-sans` / `--font-heading` in the `@theme inline` block were self-referential (`var(--font-sans)` pointing at itself) instead of pointing at `--font-geist-sans`, so `font-sans` resolved to nothing and text across the whole app (not just Clerk) was falling back to the browser's default serif; now `--font-sans`/`--font-heading` → `--font-geist-sans` and added `--font-mono` → `--font-geist-mono`.

## In Progress

- None yet.

## Next Up

- 04-project-dialogs.md.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Theme tokens live directly on `:root` (duplicated onto `.dark`) rather than only under `.dark`, since the app is dark-only and `<html>` always carries the `dark` class — avoids any light-mode flash and keeps shadcn's `dark:` variant classes in generated components active.
- shadcn was initialized with the `base-nova` preset (Base UI + Lucide + Geist) rather than Radix; component API surface is unaffected for this task's scope.

## Session Notes

- Verified in the browser (dev server + screenshot): dark background, cyan `--accent-primary` button, dark card/inputs, no light styling. `tsc --noEmit`, `next build`, and `eslint` all pass.
- `editor-navbar.tsx` / `project-sidebar.tsx` verified with `tsc --noEmit`, `eslint`, and `next build` (all pass). Not yet wired into a route/page — no page currently mounts the editor chrome, so no browser check was done for this unit; that wiring belongs to a later feature unit per the spec-driven scoping rules.
- 03-auth.md verified with `tsc --noEmit`, `eslint`, `next build`, and in-browser checks: `/` redirects unauthenticated visitors to `/sign-in`; direct navigation to `/editor` while signed out redirects to `/sign-in?redirect_url=...` (proxy protection confirmed); sign-in/sign-up pages checked at desktop (1440px, two-panel) and mobile (390px, form-only) widths.
