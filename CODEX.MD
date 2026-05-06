# CODEX Project Memory

Every future Codex session that changes this repository must update this file before finishing.

Each future update must add a new dated section with:
- Date
- Goal of the session
- Summary of changes
- Files changed
- Commands run
- Build/test result
- Remaining issues
- Next recommended steps

## Project Name And Purpose

Project: Adel Mohsen Portfolio

Repository: `adel145/Adel_Portfolio-`

Purpose: A public professional portfolio for Adel Mohsen, a B.Sc. Computer Science student at Sapir Academic College, expected graduation 07/2026. The site should help Adel get interviews for junior / entry-level roles in full-stack development, automation, data/ML engineering, and AI-powered application development.

## Current Tech Stack

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Three.js
- React Three Fiber
- Drei
- React Router with `HashRouter`
- EmailJS using Vite environment variables
- GitHub Actions
- GitHub Pages

## Deployment Target

Live URL: https://adel145.github.io/Adel_Portfolio-/

Deployment target: GitHub Pages.

The site must remain a static frontend. GitHub Pages does not run Express, MongoDB, Bun, Node servers, or private backend APIs.

## GitHub Pages Rules For This Repo

- Keep Vite `base` set to `/Adel_Portfolio-/`.
- Keep routing GitHub Pages-safe. The app currently uses `HashRouter`; do not switch to `BrowserRouter` unless a proper GitHub Pages fallback is also implemented.
- Do not commit `dist`; it is ignored and deployed as a GitHub Actions artifact.
- The deploy workflow must build the Vite app and deploy the `dist` folder.
- The live app must not depend on `server/server.js`, MongoDB, localhost APIs, or private runtime services.
- Public Vite environment variables must use the `VITE_` prefix and must not contain secrets.

## Current Architecture

- `src/main.jsx` mounts the React app.
- `src/App.jsx` defines `HashRouter` routes and lazy-loads major page sections.
- Main portfolio sections live under `src/components`.
- Shared portfolio data lives in `src/constants/index.js`.
- Visual assets live in `src/assets` and public 3D models live in `public`.
- MyWorld demos live under `src/components/MyWorld`.
- The archived local demo server lives under `server` and is not used by the deployed site.
- GitHub Pages deployment is defined in `.github/workflows/deploy.yml`.

## Modernization Pass Summary

The portfolio was modernized from an older, heavier React/Vite/Three.js project into a cleaner GitHub Pages-ready static portfolio.

Key changes:
- Updated portfolio content for Adel Mohsen's current professional direction.
- Reworked hero, about, experience, education, skills, projects, contact, and MyWorld content.
- Added project cards for Miktsoan / Professional, Crystallia, Tips Predictor, Portfolio Website, and Pet Shop E-Commerce.
- Removed fake testimonials and placeholder company content.
- Converted backend-dependent MyWorld pages to client-only localStorage/static demos.
- Moved EmailJS configuration to Vite environment variables.
- Removed the real MongoDB URI and archived the server as local demo code only.
- Added GitHub Actions deployment for GitHub Pages.
- Removed committed `dist` and many old duplicate assets/backups.
- Added a lightweight mobile fallback for the heavy hero 3D model.
- Updated SEO metadata and favicon.
- Rewrote `README.md`.

## Important Decisions

- Preserve the dark tech / 3D visual identity instead of rebuilding from scratch.
- Use `HashRouter` for GitHub Pages route safety.
- Prefer GitHub Actions Pages deployment over committing `dist`.
- Keep `server` only as archived local demo code; the production site must not depend on it.
- Keep EmailJS optional. If env vars are missing, contact fallback links still work.
- Keep Three.js, Framer Motion, and React Tilt because they are actively used and part of the site's visual identity.
- Remove unused backend/frontend dependencies only where imports were confirmed absent from active source.

## Removed Or Archived

Removed from the source branch:
- Committed `dist` build output.
- Old duplicate asset folders such as original image folders and backup image sets.
- Old backup components under `org_beforeManus`, `org_before_manus`, and similar folders.
- Nested old MovieApp implementation that depended on Redux, Axios, Headless UI, Tabler Icons, and remote APIs.
- Secret-containing notes file.
- Placeholder components such as old Feedbacks/Fun.
- Unused screenshots and generated structure files.

Archived:
- `server/server.js` remains only as local demo code and reads `MONGO_URI` from environment variables.

## Known Risks

- Node/npm were unavailable in the Codex shell during the modernization pass, so `npm install`, `npm run build`, `npm run lint`, and `npm run preview` still need to be run locally by Adel before pushing.
- `package-lock.json` root dependency metadata was updated to match `package.json`, but it should still be regenerated locally with `npm install` because npm was unavailable during this session.
- Some public 3D model assets remain large by nature. The hero 3D scene is skipped on mobile, but desktop load size should still be monitored.
- EmailJS will only send messages if valid `VITE_EMAILJS_*` variables are configured in the deployment environment.
- Any previously exposed credentials must be rotated outside the repository.

## Manual Steps Still Required

- Run local install/build/lint/preview commands before pushing.
- Rotate any previously exposed MongoDB and EmailJS credentials.
- In GitHub repository Settings -> Pages, set Source to GitHub Actions.
- If keeping EmailJS in production, configure repository/environment variables or another safe deployment-time env mechanism.
- Confirm external links for GitHub, LinkedIn, CV, and project demos are final.

## Verification Checklist

Before pushing:
- `npm install`
- `npm run lint`
- `npm run build`
- `npm run preview`
- Open the previewed site locally and verify the main route.
- Verify HashRouter routes:
  - `#/myworld`
  - `#/todo`
  - `#/movie-app`
  - `#/event-calendar`
  - `#/notes-app`
- Confirm no hard-coded `localhost` API calls.
- Confirm no real MongoDB URI.
- Confirm no real EmailJS keys.
- Confirm no committed `dist` directory.
- Confirm GitHub Pages base path is `/Adel_Portfolio-/`.
- Confirm mobile hero fallback and navigation are usable.
- Confirm contact fallback links work.

## Future Improvement TODOs

- Add a real CV PDF under `public` and point the Download CV button to it.
- Add real project screenshots for Miktsoan and Crystallia.
- Consider compressing or replacing large public 3D model textures if build output remains too heavy.
- Add Playwright or a lightweight smoke test for the main routes.
- Improve project links once each project's repository/demo URL is final.
- Consider replacing external movie poster URLs with local optimized images.
- Add structured data metadata for SEO.

## Session Log

### 2026-05-06

Date: 2026-05-06

Goal of the session: Modernize, clean, optimize, secure, and prepare the old React/Vite 3D portfolio for static GitHub Pages deployment.

Summary of changes:
- Modernized content for Adel Mohsen's full-stack, automation, data/ML, and AI-powered apps direction.
- Added GitHub Actions Pages workflow.
- Kept Vite base path as `/Adel_Portfolio-/`.
- Converted backend-dependent demos to localStorage/static data.
- Removed real MongoDB URI and old secret-containing files.
- Replaced hard-coded EmailJS values with environment variables.
- Removed committed `dist` and many duplicate/unused assets and old backup code.
- Updated README, SEO metadata, routing, and contact fallbacks.

Files changed:
- `.gitignore`
- `.github/workflows/deploy.yml`
- `.env.example`
- `server/.env.example`
- `README.md`
- `index.html`
- `package.json`
- `package-lock.json`
- `vite.config.js`
- `tailwind.config.js`
- `eslint.config.js`
- `server/server.js`
- `src/App.jsx`
- `src/main.jsx`
- `src/constants/index.js`
- `src/assets/index.js`
- `src/components/*`
- `src/components/MyWorld/*`
- Many old build artifacts, backup files, duplicate assets, and generated files were removed.

Commands run:
- Repository inspection with `Get-ChildItem`, `git status --short`, `rg --files`, and `Get-Content`.
- Static searches with `rg` for secrets, localhost calls, fake testimonials, deleted asset references, and unused dependency imports.
- `git rm` for committed `dist`, old backups, duplicate assets, generated files, and secret-containing files.
- Attempted `npm install`, but `npm` was unavailable in the shell.

Build/test result:
- Not run in Codex environment because `node` and `npm` were unavailable.
- Static grep checks found no active hard-coded localhost API calls, real MongoDB URI, old EmailJS keys, fake testimonials, or known typo strings.

Remaining issues:
- Adel must run npm install/lint/build/preview locally.
- Rotate any credentials that were previously exposed.
- Configure GitHub Pages Source as GitHub Actions.

Next recommended steps:
- Run `npm install`.
- Run `npm run lint`.
- Run `npm run build`.
- Run `npm run preview`.
- Test routes and mobile layout locally.
- Commit and push only after local verification passes.

### 2026-05-06 Final Safety Pass

Date: 2026-05-06

Goal of the session: Add long-term project memory and perform a final pre-push safety/deployment readiness review.

Summary of changes:
- Added `CODEX.MD` as the required future Codex project memory file.
- Documented the rule that future Codex sessions must update `CODEX.MD` before finishing.
- Rechecked README, workflow, routing, active source files, env examples, package files, and ignored files.
- Removed stale package-lock entries for dependencies removed from the active app.

Files changed:
- `CODEX.MD`
- `package-lock.json`
- `server/.env.example`

Commands run:
- `Get-Content` on README, workflow, package files, routing files, and env examples.
- `rg` searches for local paths, secrets, localhost calls, fake testimonials, removed dependency imports, and stale asset references.
- `Test-Path dist`
- `git check-ignore -v CODEX.MD`
- PowerShell JSON parse check for `package-lock.json`
- PowerShell relative import resolution check
- Attempted Python JSON cleanup, but Python was unavailable/inaccessible in the shell.

Build/test result:
- Build was not run because Node/npm are unavailable in the Codex shell.
- Static verification passed for secrets, local paths, active imports, routing setup, workflow shape, and ignored files.
- `package-lock.json` is valid JSON after cleanup.

Remaining issues:
- Adel still needs to run `npm install`, `npm run lint`, `npm run build`, and `npm run preview` locally.
- Because the lockfile was edited without npm, Adel should allow `npm install` to normalize formatting/content if npm changes it.

Next recommended steps:
- Run the local verification commands listed in README and this file.
- Review any package-lock changes produced by local `npm install`.
- Push to `main` only after local build and preview pass.

### 2026-05-07 Blank Screen Runtime Fix

Date: 2026-05-07

Goal of the session: Debug and fix the production preview black/empty screen at `http://localhost:4173/Adel_Portfolio-/`.

Root cause:
- `vite.config.js` used `id.includes('three')` for manual chunking. That also matched `@react-three/fiber` and `@react-three/drei`, putting React-dependent Drei/Fiber code into the raw `three` chunk. The production browser runtime failed before React mounted with `TypeError: Cannot read properties of undefined (reading 'useLayoutEffect')`.
- A secondary console issue came from `Stars.jsx` using `new Float32Array(25000)`, which is not divisible by 3 for XYZ point data and caused a Three.js NaN bounding sphere error.
- The skills section also created many simultaneous `BallCanvas` WebGL contexts, which could trigger browser WebGL context warnings on initial load.

Summary of changes:
- Tightened Vite manual chunking so only `node_modules/three` and `node_modules/three-stdlib` go into the `three` chunk; `@react-three/*` remains in `vendor`.
- Kept `HashRouter` and the `/Adel_Portfolio-/` base path.
- Added a lightweight `ErrorBoundary` component and wrapped the navbar, route tree, star canvas, hero computer canvas, and earth canvas.
- Replaced the many skills `BallCanvas` instances with static optimized icon tiles to avoid creating excessive WebGL contexts.
- Fixed the star point buffer length from `25000` to `24000`.

Files changed:
- `vite.config.js`
- `src/App.jsx`
- `src/components/ErrorBoundary.jsx`
- `src/components/Hero.jsx`
- `src/components/Contact.jsx`
- `src/components/Tech.jsx`
- `src/components/canvas/Stars.jsx`
- `CODEX.MD`

Commands run:
- `npm.cmd run build`
- `npm.cmd run preview -- --host 127.0.0.1` via `Start-Process`
- Browser DevTools smoke checks against:
  - `http://127.0.0.1:4173/Adel_Portfolio-/`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/myworld`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/todo`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/movie-app`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/event-calendar`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/notes-app`
- `rg` checks for localhost/API/secrets patterns.

Build/preview result:
- `npm.cmd run build` passed.
- Preview served the production build at `/Adel_Portfolio-/`.
- Browser smoke checks showed rendered content for home, navbar, portfolio sections, and all requested MyWorld hash routes.
- No uncaught browser runtime errors were captured after the fix.

Remaining warnings:
- Browserslist/caniuse-lite data is outdated.
- `three-stdlib/libs/lottie.js` still reports an eval warning during build.
- The raw `three` chunk remains larger than Vite's default 500 kB warning threshold.

Next recommended steps:
- Optionally run `npm.cmd run lint`.
- Consider updating Browserslist data later with `npx update-browserslist-db@latest`.
- Consider further 3D code splitting or lighter 3D assets if bundle size becomes a real user-facing load problem.

### 2026-05-07 Visual Identity Restoration

Date: 2026-05-07

Goal of the session: Restore the old premium dark/3D developer portfolio visual identity after the modernization pass while keeping the technical fixes and deployment setup.

Root issue:
- The modernization changed layout and visual proportions too aggressively. The site still worked technically, but the hero, cards, MyWorld page, and section spacing no longer felt like the old dark navy/purple 3D portfolio.

Sections fixed:
- Hero: restored the old `Hi, I'm Adel` composition, purple name highlight, shorter professional subtitle, stronger space/star atmosphere, clean CTA placement, and larger/lower workstation canvas.
- Navbar: adjusted spacing, desktop breakpoints, brand text, GitHub/MyWorld alignment, and mobile menu width.
- About: kept professional content and restored a balanced four-card grid.
- Experience: kept updated professional content and polished timeline card proportions, borders, and shadows.
- Education: standardized card sizing and used contained image treatment to avoid awkward logo crops.
- Projects: widened cards, improved visual hierarchy, replaced stretched placeholder icons with cleaner branded visual panels where assets were too small, and aligned tags/actions.
- Contact: kept EmailJS env/fallback behavior and added stronger two-column card/visual framing.
- MyWorld: restored the `EXPLORE.` / `My World.` gallery structure, removed visible implementation notes, fixed clipped/overflowing cards, and improved demo card image treatment.

Files changed:
- `src/index.css`
- `src/components/Hero.jsx`
- `src/components/canvas/Computers.jsx`
- `src/components/Navbar.jsx`
- `src/components/About.jsx`
- `src/components/Experience.jsx`
- `src/components/Education.jsx`
- `src/components/Works.jsx`
- `src/components/Contact.jsx`
- `src/components/MyWorld/MyWorld.jsx`
- `src/constants/index.js`
- `CODEX.MD`

Commands run:
- `npm.cmd run build`
- `npm.cmd run preview -- --host 127.0.0.1` via `Start-Process`
- Headless Chrome screenshots for the home hero and MyWorld page.
- Browser DevTools route smoke checks against:
  - `http://127.0.0.1:4173/Adel_Portfolio-/`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/myworld`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/todo`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/movie-app`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/event-calendar`
  - `http://127.0.0.1:4173/Adel_Portfolio-/#/notes-app`
- `rg` checks for leftover visible MyWorld technical copy, localhost/API references, and old secret strings.

Build/preview result:
- `npm.cmd run build` passed.
- Preview served the production build at `/Adel_Portfolio-/`.
- Browser route smoke checks passed with rendered content on all requested routes.
- Home smoke check confirmed the main section headings render.
- No browser console errors were captured in the route smoke pass.

Remaining warnings:
- Browserslist/caniuse-lite data is outdated.
- `three-stdlib/libs/lottie.js` still reports an eval warning during build.
- The raw `three` chunk remains larger than Vite's default 500 kB warning threshold.

Remaining visual TODOs:
- The available local assets for Miktsoan and Crystallia are still placeholder-style; replace them later with real high-quality screenshots when available.
- A final human comparison against the original screenshot set is still useful for tiny spacing/crop tweaks.
