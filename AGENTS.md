# AGENTS.md — Central Hub

Personal project: Angular frontend (Nx monorepo) + Quarkus backend (Maven) + Docker deployment.

## Layout

- `src/frontend` — Nx workspace root. **All frontend npm/nx commands run from here.**
- `src/frontend/packages/portal` — host shell app, port **4200**, prefix `ch`
- `src/frontend/packages/shelveProducts` — remote microfrontend, port **4201**, prefix `sp`
- `src/frontend/packages/gameQ` — remote microfrontend, port **4202**, prefix `gameq`
- `src/frontend/packages/e2e` — Playwright end-to-end tests
- `src/frontend/libs/portal-lib` — shared library, Nx project name `@portal-library`, imported as `@central-hub/library`
- `src/frontend/libs/shared/styles` — shared SCSS styles
- `src/frontend/libs/testing` — test helpers, imported as `@central-hub/testing`
- `src/backend` — Quarkus REST API, Maven project, port **8088**, package `pt.amaralsoftware`
- `bin/` — docker run scripts (db, keycloak, backend)
- `build/createImage.sh` — builds Docker images for frontend + backend
- `automation/docker/docker-compose.yml` — production compose (ingress 8880 → nginx)
- `automation/keycloak/realm-export.json` — Keycloak realm import for `centralhub`
- `doc/` — feature documentation

## Frontend commands (run from `src/frontend`)

| Command | What it does |
|---------|-------------|
| `npm ci` | Install deps (lockfile present) |
| `npm start` | Serve **all** apps: portal 4200, shelveProducts 4201, gameQ 4202 |
| `npm run startShell` | Serve **portal only** (port 4200) |
| `npx nx serve <project>` | Serve a single app |
| `npm run build` | Build all apps |
| `npx nx build <project>` | Build a single app |
| `npm run lint` | Lint all projects |
| `npm run lint-dev` | Lint only affected projects |
| `npm test` | Run all unit tests |
| `npx nx test <project>` | Run tests for one project |
| `npx nx test <project> -- <file>` | Run a single spec (vitest filter passed through) |
| `npm run storybook` | Storybook (portal-lib, port 4400) |

### E2E

```sh
npx nx run e2e:e2e        # runs Playwright; webServer auto-starts `npm run start`
npx nx run e2e:e2e -- --watch=false   # CI mode
```

> **Gotcha:** The CI workflow (`development.yml`) calls `npm run e2e -- --watch=false`, but there is no `e2e` script in package.json. That CI step relies on an old script name. Use the `nx run` command above instead.

## CI order (`development.yml`)

1. **lint** — `npm run lint`
2. **unit-test** — `npx nx run-many -t test --coverage`
3. **build** — `npm run build`
4. **e2e** — only runs on pull requests

Node 24 in CI. `NX_NO_CLOUD=true` (no Nx Cloud).

## Architecture: Native Federation

Migrated from Module Federation to **Native Federation** (`@angular-architects/native-federation`) in v3.0.0.

- `portal/src/main.ts` fetches `/api/remotes` at startup → builds federation manifest → calls `initFederation(manifest)` → bootstraps with remote configs.
- Each remote exposes `./Routes` (entry.routes.ts). Portal creates lazy routes via `loadRemoteModule(name, './Routes')`.
- Each remote has a `federation.config.js` defining its name, exposed routes, and shared deps.
- `federation.manifest.json` is served in production via nginx (copied to frontend container).

### Dev proxy (`portal/proxy-local.config.js`)

| Path | Target |
|------|--------|
| `/assets/shelveProducts/*` | `localhost:4201` (path rewritten to `/assets/`) |
| `/assets/gameQ/*` | `localhost:4202` (path rewritten to `/assets/`) |
| `/api/*` | `localhost:8088` (Quarkus backend) |
| `/auth/*` | `localhost:8088` |
| `/realms/*` | `localhost:8080` (Keycloak) |

**You must run `npm start` (all apps) to develop against remotes** — the portal alone cannot serve remote modules.

### Remote status fallback

`RemoteRegistry` probes all remotes in parallel during app initialization (`providerRemotesStatus` in `providers.ts`). The navbar only renders links where `status === 'available'`. Status is resolved once at startup and never re-probed. See `doc/REMOTE_FALLBACK_STATUS.md` for full details.

## Backend (`src/backend`)

| Command | What it does |
|---------|-------------|
| `./mvnw quarkus:dev` | Dev mode (port 8088, live coding) |
| `./mvnw package` | Package as quarkus-run.jar |
| `./mvnw package -Dnative` | Native executable (requires GraalVM) |

- **No backend unit tests exist** (`src/test/` is absent).
- Flyway migrations auto-run at startup (`src/main/resources/db/`).
- REST path prefix: `/api` (e.g., `/api/shelve/api`).
- Dev profile: `application-dev.properties` (Postgres on localhost:5432, `application-dev.properties`).

## Docker

- `bin/docker-run-db.sh` — Postgres 17, port 5432, password `Pokemon123`
- `bin/docker-run-keycloak.sh` — Keycloak, port 8080, admin:admin
- `build/createImage.sh -t <version> -p` — builds `central-hub-backend:<v>` and `central-hub-frontend:<v>`, pushes to registry
- `automation/docker/docker-compose.yml` — ingress (nginx, port 8880), frontend, backend; keycloak section is commented out
- Frontend Dockerfile: Node 22 Alpine builder → nginx-unprivileged runner; `setup.sh` injects BASIC_TOKEN at runtime

## Testing quirks

- Unit tests: **vitest-angular** (`@angular/build:unit-test` executor).
- Remote app test targets use `buildTarget: portal:build:development` — they share the portal's dev build for test setup.
- Coverage is enabled by default (`--coverage`). `coverageExclude` references `**/portal-lib/*` in some projects.
- E2E: Playwright; `webServer` auto-starts all dev servers (`npm run start`); `BASE_URL` defaults to `http://localhost:4200`.

## Gotchas

- **OIDC/Keycloak** config is in `application.properties` but `is.auth.activate=false` gates enforcement. `doc/OIDC_IMPLEMENTATION.md` is partly outdated (references old `packages/portal-lib` path — the lib is at `libs/portal-lib`).
- **Node version:** CI uses Node 24; Docker builds use Node 22. Any recent Node with npm works locally.
- **Nx cache:** daemon log and lock files live in `.nx/` — do not commit these.
- **Path aliases:** `@central-hub/library` → `libs/portal-lib/src/public-api.ts`; `@central-hub/testing` → `libs/testing/src/index.ts` (defined in `tsconfig.base.json`).
- The repo branch name (`Error_fallback-status-when-the-remote-microfrontend-fails-to-load`) is a feature branch — the current checkout represents that feature's state.
