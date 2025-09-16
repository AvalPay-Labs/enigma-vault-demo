# Repository Guidelines

## Project Structure & Module Organization
- `src/` — React + TypeScript app (components, pages, hooks, services, lib, config).
- `server/` — Express API (`/api/*`) with routes, controllers, services, utils.
- `public/` — Static assets served by Vite.
- `scripts/supabase/` — SQL for schema, RLS, and auth triggers.
- Key entry points: `src/main.tsx`, `src/App.tsx`, `server/index.js`, `server/app.js`.

## Build, Test, and Development Commands
- `npm run dev` — Start Vite dev server on `:8080`; proxies `/api` → `:3000`.
- `node server/index.js` — Start Express API on `:3000`.
- `npm run build` — Production build to `dist/`.
- `npm run preview` — Serve built app locally.
- `npm run lint` — Lint TypeScript/React sources.

Example (two terminals):
```
npm run dev
node server/index.js
```

## Coding Style & Naming Conventions
- TypeScript, 2‑space indent; semicolons optional per existing files.
- Components: `PascalCase` (e.g., `LoginModal.tsx`); hooks: `useX.ts(x)`.
- Utilities/config: `camelCase` or descriptive file names (`encryptedERCUtils.ts`).
- Use ESLint config in `eslint.config.js` (React Hooks, TypeScript rules). Run `npm run lint` before PRs.
- TailwindCSS for styling; prefer utility classes and existing `ui/` components.

## Testing Guidelines
- No formal test suite yet. Prefer adding Vitest + React Testing Library.
- Suggested naming: `*.test.ts` / `*.test.tsx` colocated near source or under `tests/`.
- Until tests exist: manually validate key flows (auth, converter, deposits/withdrawals) and check console warnings.

## Commit & Pull Request Guidelines
- Follow Conventional Commits where possible: `feat:`, `fix:`, `chore:`, `docs:`, etc.
- PRs must include: concise description, linked issue, screenshots for UI changes, and steps to reproduce/verify.
- Keep changes scoped; update docs and env examples (`.env.example`) when applicable.

## Security & Configuration Tips
- Do not commit secrets. Use `.env` locally; reference `.env.example` for required vars.
- Frontend expects `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
- API uses Express; validate inputs server‑side. Review `scripts/supabase/` for RLS policies.

## Architecture Overview
- Frontend (Vite/React) on `:8080` consumes API via `/api/*` proxy.
- Backend (Express) on `:3000` exposes modular routes under `server/routes`.
- Shared types and service logic live under `src/types` and `src/services`.
