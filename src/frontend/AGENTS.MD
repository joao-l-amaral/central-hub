You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

Version of Angular: 21
Using Nx for monorepo management and Native Federation for microfrontend (MF) architecture.

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

## TypeScript Best Practices

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain or type of the value is inferred during run time.

## Developing Best Practices

- Use TDD (Test-Driven Development) approach for developing new features. Write tests first, then implement the feature to make the tests pass.
- To create test cases create a list of suggesting tests and pause to wait for feedback from the team before implementing them. This will help to avoid writing unnecessary tests and will also help to improve the quality of the tests.
- Use the harnesses files provided by the `@testing-library/angular` library for testing Angular components provided from `@portal-library`.
- Each component outside the testing library should have its own harnesses to test the component in isolation. The harness should be placed in the same folder of the component and named `<component-name>.harness.ts`.

## Angular Best Practices

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default in Angular v20+.
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead

### Components

- Use the DDD(Domain-Driven Design) approach for component design. Using the following folder structure for components:
  - `/frontend` - Root of the frontend application
    - `packages/` - Place of all local MFs application + shell app(portal).
    - `microfrontend-X/` - MF application "X" using nx
      - `domainX/` - Each MF should have its own domain folder, which contains all the components, services, and models related to that domain. The Domain is a group of related features that share a common purpose or business logic.
        - In this level can exist the html, scss and ts files regarding to the domain that will hold any number of features. Example: landing page with a feature to show the weather, then that feature will be inside the domain folder with its own folder to contain his own HTML, ts, etc. Named "feature-weather".
        - `api/` - Place the index.ts (or public-api.ts) file that exports components, services and models from the domain folder for the rest of the transversal domains to use. In this folder can also create files only to export logic that is shared between the components of the domain.
        - `feature-XXX/` - Like was explain before. This is the pattern to use when creating a new feature inside the domain. Each feature should have its own folder, which contains all the components, services, and models related to that feature. The Feature is a group of related components that share a common purpose or business logic.
        - `utils-XXX/` - This is the pattern to use when creating a new utility inside the domain. Each utility should have its own folder, which contains all the components, services, and models related to that utility. The Utility is a group of related components that share a common purpose or business logic.
    - `libs/` - Place of all shared libraries
      - `portal-lib/` - Contain all the shared components, services and models that are used by the microfrontends. This library is imported by the microfrontends and the shell app(portal).
      - `shared/` - At the moment only contain the `styles/` folder with the shared scss styles that are used by the microfrontends. This library is imported by the microfrontends and the shell app(portal).
      - `testing/` - At the moment only provide the harness to test the components of the `portal-lib` library.
- Keep components small and focused on a single responsibility and if possible use the DDD approach for component design.
- While creating generic components, make them reusable and configurable through inputs and outputs, avoid hardcoding values and apply Atomic Design principles to create a consistent and scalable design system.
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state.
- Prefer Reactive forms instead of Template-driven ones. Is possible to use signal-forms however there should be cautions since we are using Angular 21 and not Angular 22. In 21 verions the signal-forms are not stable yet and can cause issues in some scenarios.
- Do NOT use `ngClass`, use `class` bindings instead.
- Do NOT use `ngStyle`, use `style` bindings instead.
- In the ts component side, do NOT use `ngOnChanges` or `ngOnInit`, use `effect()` instead.
- In the ts component side, do NOT use switch statements, use action handler instead for better scalability.

## State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable

## Templates

- Keep templates simple and avoid complex logic.
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`.
- Use the async pipe to handle observables
- Do not assume globals like (`new Date()`) are available.

## Services

- Design services around a single responsibility
- Avoid providedIn: 'root' for MF-owned services — it only guarantees a singleton within a remote's own bootstrap, not across MF boundaries. Register remote-scoped services explicitly in the remote's app.config.ts (standalone) or remote-entry providers (when consumed by a shell), and reserve true cross-MF singletons for federation.config.mjs's shared list with singleton: true.
- Use the `inject()` function instead of constructor injection

```typescript
export class MyService {
  readonly #test = inject(TestService);
  readonly #test2 = inject(TestService2);
}
```
