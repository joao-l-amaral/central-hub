# AGENTS.md — Central Hub

Personal project: Angular frontend (Nx monorepo) + Quarkus backend (Maven) + Docker deployment.

## Layout

- `src/frontend` — Nx workspace root. **All frontend npm/nx commands run from here.**
- `src/frontend/packages/portal` — host shell app, port **4200**, prefix `ch`
- `src/frontend/packages/shelveProducts` — remote microfrontend, port **4201**, prefix `sp`
- `src/frontend/packages/gameQ` — remote microfrontend, port **4202**, prefix `gameq`
- `src/frontend/packages/e2e` — Playwright end-to-end tests
- `src/frontend/libs/portal-lib` — shared library, Nx project name `@portal-library`, imported as `@central-hub/library`
- `src/frontend/libs/shared/styles` — shared SCSS styles to be used between microfrontends, imported as `@central-hub/styles`
- `src/frontend/libs/testing` — test helpers for all portal-lib components, imported as `@central-hub/testing``
- `src/backend` — Quarkus REST API, Maven project, port **8088**, package `pt.amaralsoftware`
- `bin/` — docker run scripts (db, keycloak, backend)
- `build/createImage.sh` — builds Docker images for frontend + backend
- `automation/docker/docker-compose.yml` — production compose (ingress 8880 → nginx)
- `automation/keycloak/realm-export.json` — Keycloak realm import for `centralhub`
- `doc/` — feature documentation

## Project Structure
- `backend/` — Quarkus + PostgreSQL API. See `src/backend/AGENTS.md` for build/test commands and DDD conventions.
- `frontend/` — Nx monorepo, Angular 21, Native Federation microfrontends. See `src/frontend/AGENTS.md` for component/testing rules.

## CI order (`development.yml`)

1. **lint** — `npm run lint`
2. **unit-test** — `npx nx run-many -t test --coverage`
3. **build** — `npm run build`
4. **e2e** — only runs on pull requests

Node 24 in CI. `NX_NO_CLOUD=true` (no Nx Cloud).

## Docker

- `bin/docker-run-db.sh` — Postgres 17, port 5432, password `Pokemon123`
- `bin/docker-run-keycloak.sh` — Keycloak, port 8080, admin:admin
- `build/createImage.sh -t <version> -p` — builds `central-hub-backend:<v>` and `central-hub-frontend:<v>`, pushes to registry
- `automation/docker/docker-compose.yml` — ingress (nginx, port 8880), frontend, backend; keycloak section is commented out
- Frontend Dockerfile: Node 22 Alpine builder → nginx-unprivileged runner;

## Gotchas

- **OIDC/Keycloak** config is in `application.properties` but `is.auth.activate=false` gates enforcement. `doc/OIDC_IMPLEMENTATION.md` is partly outdated (references old `packages/portal-lib` path — the lib is at `libs/portal-lib`).
- **Node version:** CI uses Node 24; Docker builds use Node 22. Any recent Node with npm works locally.
- **Nx cache:** daemon log and lock files live in `.nx/` — do not commit these.
- **Path aliases:** `@central-hub/library` → `libs/portal-lib/src/public-api.ts`; `@central-hub/testing` → `libs/testing/src/index.ts` (defined in `tsconfig.base.json`).
- The repo branch name (`Error_fallback-status-when-the-remote-microfrontend-fails-to-load`) is a feature branch — the current checkout represents that feature's state.
