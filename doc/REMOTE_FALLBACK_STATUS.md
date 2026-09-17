# Remote Fallback Status Verification

Documents commit `de68ffb` ("Add error remote status verify"), which verifies whether each remote microfrontend is reachable at startup and uses that status to hide unreachable remotes from the portal navbar (fallback behavior when a remote fails to load).

## What changed

| File | Change |
|------|--------|
| `src/frontend/packages/portal/src/domains/remotes/remotes.ts` | New: type definitions (`RemoteStatus`, `RemoteMeta`, `RemotesConfig`) |
| `src/frontend/packages/portal/src/domains/remotes/remote-registry.ts` | New: `RemoteRegistry` service (signal-based state holder) |
| `src/frontend/packages/portal/src/domains/remotes/providers.ts` | New: `providerRemotesStatus()` environment provider + app initializer |
| `src/frontend/packages/portal/src/domains/app/app.config.ts` | Registers `providerRemotesStatus(remotesConfig)`; removes the old `REMOTES_CONFIG` injection-token provide |
| `src/frontend/packages/portal/src/domains/layout/feature-navbar/navbar.ts` | Nav items now come from `RemoteRegistry` instead of the `REMOTES_CONFIG` token |
| `src/frontend/packages/portal/src/domains/layout/feature-navbar/navbar.html` | Nav links only render while `remote.status === 'available'` |
| `src/frontend/packages/portal/src/domains/shared/util-application/application-remotes-token.ts` | Deleted (token approach replaced by DI + signals) |
| `app.routes.ts`, `bootstrap.ts` | Import moved to the new `remotes/remotes.ts` types |
| `navbar.spec.ts`, `portal.spec.ts` | Tests now provide `RemoteRegistry` instead of `{ provide: REMOTES_CONFIG, ... }` |

## Logic

### 1. Status model (`remotes.ts`)

Each remote has a status that starts as `unknown` and is resolved to exactly one of:

- `unknown` — initial state before the verification run
- `available` — the probe request succeeded
- `unavailable` — the probe request failed

### 2. Registry (`remote-registry.ts`)

`RemoteRegistry` is an injectable service backed by a single Angular signal:

- `state = signal<Record<string, RemoteMeta>>({})` — keyed by remote name
- `initializeRemotes(definitions)` — seeds the state; every remote starts with `status: 'unknown'`
- `checkRemotesStatus(remotes)` — probes every remote **in parallel** (`Promise.all`), each probe marked `available` on success or `unavailable` on failure
- Probe (`#checkOne`): a `GET` via Angular `HttpClient` against `remote.url` with `responseType: 'text'`, consuming the first emission via `firstValueFrom`. Success → `available`; **any** error (network failure, CORS block, 4xx/5xx status) → `unavailable`
- `remotes`, `availableRemotes`, `unavailableRemotes` are `computed()` views over the signal
- `#update` merges a partial update into the named entry in the signal state; unknown names are ignored

### 3. Bootstrap wiring (`providers.ts`, `app.config.ts`)

`providerRemotesStatus(remotesConfig)` returns environment providers with:

1. `RemoteRegistry` registered for DI
2. `provideAppInitializer(async () => ...)` — during bootstrap the app:
   - `initializeRemotes(remotesConfig)` (all remotes → `unknown`)
   - `await checkRemotesStatus(remotesConfig)` — all probes complete **before** the application finishes bootstrapping

The old `{ provide: REMOTES_CONFIG, useValue: remotesConfig }` token was removed; the config is now passed directly into the provider factory, and remote metadata lives in the registry rather than a static token.

### 4. Consumer: navbar fallback (`navbar.ts` / `navbar.html`)

- `NavbarComponent` injects `RemoteRegistry` and exposes `remotes` (the full list, each item carrying its status)
- The template renders a `<li>` per remote, but the `<a routerLink>` is only rendered inside `@if (remote.status === 'available')`
- Result: a remote that failed its probe produces an empty `<li>` — its link is not rendered, so the user cannot navigate to a microfrontend that failed to load. This is the "error fallback" for the navbar

### 5. Routes

`createDynamicRoutes` (`app.routes.ts`) is unchanged: every remote still gets a lazy route (`loadRemoteModule`). The registry does not remove routes; it only gates the navbar visibility. If a remote is `unavailable` and the user navigates to its path manually, the existing route-loading failure behavior still applies.

## Sequence

```
bootstrapApplication
  └─ app initializer
       ├─ RemoteRegistry.initializeRemotes()      → status: 'unknown' for each remote
       └─ await RemoteRegistry.checkRemotesStatus()
            └─ for each remote (in parallel):
                 GET remote.url (text)
                 OK          → status: 'available'
                 any error   → status: 'unavailable'
  └─ bootstrap finishes → components created
       └─ NavbarComponent reads remotes
            └─ template renders <a> only while status === 'available'
```

## Notes / caveats

- **One capture in the navbar**: `NavbarComponent.remotes` is assigned once at construction (`this.#remotes.remotes()`), not a `computed`. Since the status is fully resolved during the app initializer — before components are created — this works for the current flow; there is no re-probing later, so a remote that recovers after startup will not reappear in the navbar without a reload.
- **Probe semantics**: any successful HTTP response counts as `available`; any non-2xx status counts as `unavailable`. CORS restrictions or non-GET-friendly remote endpoints (that don't answer `GET /`) will be reported as unavailable.
- **`availableRemotes` / `unavailableRemotes`** are public computed views of the registry and are reusable by other features, but the navbar currently filters on `status` in the template directly.
- **Tests** supply `RemoteRegistry` as a real DI provider in `navbar.spec.ts` / `portal.spec.ts`; since `checkRemotesStatus` is only invoked by the app initializer (not run in unit tests), the registry stays at `unknown` in those specs unless the component explicitly initializes it.
