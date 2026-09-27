# AGENTS.md — Central Hub Backend (Quarkus BFF)

Quarkus 3.36.1 REST API (backends-for-frontends) for the Central Hub platform. Serves
both micro frontends (`gameQ`, `shelveProducts`) via a shared `/api` prefix. Java 21,
Maven, port **8088**. This is a single-module Maven project — **not** the Quarkus
core repository.

is.auth.activate=false disables OIDC enforcement (Keycloak) for now. Don't change this without the order of the developer.

## Developing best pratices

- The quarkus project is a backend-for-frontend (BFF) for the Angular frontend. It is not a
  generic REST API, so it should not be used as a reference for other projects.
- The BFF is organized by **domain** (application, authentication, gameq, shelveproduct, shared) rather than by layer (api, service, repository). Each domain owns its own API, service, repository, and models. This is a DDD (Domain-Driven Design) approach.
- Before making a change, identify which domain owns it. Cross-domain changes belong in shared.
- The backend API is a contract with the frontend. Do not change an existing endpoint's shape without updating the corresponding frontend consumer in the same change.
- Within a domain, place changes in the correct layer: api for endpoint/request-response shape, service for business logic, repository for persistence.

## Build / Run

| Command | What it does |
|---------|-------------|
| `./mvnw quarkus:dev` | Dev mode on port 8088, live coding |
| `./mvnw package` | Package as `target/quarkus-app/quarkus-run.jar` |
| `./mvnw package -Dnative` | Native executable (requires GraalVM) |
| `./mvnw -DskipITs test` | Run unit tests |

- The root project-level `AGENTS.md` has the full frontend/backend overview in the
  Central Hub repo; this file covers only the Quarkus BFF under `src/backend`.
- **No backend unit tests exist** (`src/test/` is absent). Ignore the unit tests for now.
- Flyway migrations auto-run at startup (`quarkus.flyway.migrate-at-start=true`).
- REST path prefix is `/api` (`quarkus.rest.path=/api`), so a resource at `@Path("/remotes")`
  is reachable at `/api/remotes`.
- DB, Ntfy, and Keycloak (OAuth) credentials come from environment variables in
  `application.properties`; `application-dev.properties` overrides for local dev.
- `is.auth.activate=false` disables OIDC enforcement (Keycloak) for now. Don't change this without the order of the developer.


## Folder Structure

All Java sources live under `src/main/java/pt/amaralsoftware/`. The package tree is
organized **by domain**, not by layer: each domain owns its `api`, `service`,
`repository`, and models.

```
src/backend/
├── pom.xml                          # Quarkus 3.36.1 BOM, Java 21, quarkus-rest/jackson,
│                                    #  hibernate-orm-panache, flyway, oidc/jwt, rest-client,
│                                    #  scheduler, mailer, caffeine cache, JDA (Discord)
├── mvnw / mvnw.cmd                  # Maven wrapper
├── bin/                             # docker run scripts (db, keycloak, backend)
├── Dockerfile-backend               # container build for the BFF (see build/createImage.sh)
├── src/main/java/pt/amaralsoftware/
│   ├── application/                 # App-level / bootstrap domain (portal shell)
│   │   ├── api/                     #   ApplicationAPI (@Path("/")) → /api/remotes, /api/configurations
│   │   ├── config/                  #   RegisterCustomModuleCustomizer (Jackson ObjectMapper setup)
│   │   ├── models/                  #   ApplicationConfiguration response model
│   │   │   ├── dto/                 #     RemoteDTO (microfrontend remote descriptor)
│   │   │   └── entity/              #     CatConfigEntity, GuiRemoteEntity (Panache entities)
│   │   ├── repository/              #   CatConfigRepository, GuiRemoteRepository
│   │   └── service/                 #   ApplicationService, CatConfigService, GuiRemoteService
│   ├── authentication/              # OIDC/Keycloak + JWT integration (gated by is.auth.activate)
│   │   ├── api/                     #   AuthAPI
│   │   ├── models/dto/              #   UserInfoDTO
│   │   └── service/                 #   AuthService
│   ├── gameq/                       # Game catalog / game vault domain
│   │   ├── api/                     #   GameQGamesAPI, GameQAdministrationAPI
│   │   ├── mapper/                  #   CatGameMapper (entity ↔ DTO)
│   │   ├── models/                  #   GameQConfiguration, GameQPlatform, UpdateSelectedPlatformPayload
│   │   │   ├── dto/                 #     GameQGameDTO, GameQConfigurationDTO, GameVaultPlatformDTO
│   │   │   └── entity/              #     CatGameEntity, CatGamePlatformEntity, CatDigitalPcStoresEntity
│   │   ├── modules/                 #   Feature modules
│   │   │   └── dataProcessor/       #     Hybrid data pipeline (download → extract → parse → clean)
│   │   │       ├── flows/           #       DataInitializeFlow, DataDownloaderFlow, DataExtractorFlow,
│   │   │       │                    #       DataGameParserFlow, DataPlatformParserFlow, DataCleanUpFlow
│   │   │       └── models/          #       ParsingFlow, ParsingResult, ParsedMetadataModel, GameQParsingStates
│   │   ├── repository/              #   CatGameRepository, CatGamePlatformRepository, CatDigitalPcStoresRepository
│   │   ├── resolvers/               #   PlatformIconResolver (icon by platform, Caffeine-cached)
│   │   └── service/                 #   CatGameService, CatGamePlatformService, CatDigitalPcStoresService
│   ├── shared/                      # Cross-domain utilities and rest clients
│   │   ├── client/                  #   NtfyClient (REST client for Ntfy notifications)
│   │   ├── models/                  #   RemoteDataSourceResult
│   │   └── util/                    #   JSONSerializer, MapSerializer, MapUtils, NtfyUtils
│   └── shelveproduct/               # Shelve-product domain
│       ├── api/                     #   ShelveProductAPI
│       ├── config/                  #   ShelveProductValidations
│       ├── model/                   #   ProductCount
│       │   ├── dto/                 #     ShelveProductDTO
│       │   └── entity/              #     CatShelveProductEntity
│       ├── repository/              #   ShelveProductRepository
│       └── service/                 #   ShelveProductService
└── src/main/resources/
    ├── application.properties       # prod config — env vars: DATABASE_USER, DATABASE_PASSWORD,
    │                                #  DATABASE_URL, NTFY_URL, NTFY_TOPIC, NTFY_USER, NTFY_PASSWORD
    ├── application-dev.properties   # dev profile — local Postgres (localhost:5432)
    └── db/                          # Flyway migrations
        ├── V*.sql                   #   versioned migrations (V1.0.0_* … V3.0.0_*)
        └── all/                     #   repeatable migrations (R__insert_gui_remotes.sql)
```

## Conventions

- Package root: `pt.amaralsoftware`, domains in lowercase (`shelveproduct`, not `shelveProduct`).
- Entities use Hibernate ORM with Panache (`PanacheEntity` / repository pattern).
- Naming: `<Domain>API` for resources, `<Domain>Service` for business logic,
  `<Domain>Repository` for persistence, `Cat*Entity` for entities, `*Entity` ↔ `*DTO`
  split at `models/entity` vs `models/dto`.
- The `gameq` domain is organized by feature under `modules/` for pipelines (see
  `dataProcessor`); keep pipeline flow steps in `flows/`.
- Mappers (`CatGameMapper`) centralize entity↔DTO conversions; new domains should
  follow the same pattern.
- Environment-sensitive values must go through config (`application.properties` /
  `application-dev.properties`), never hardcoded.
- OIDC enforcement is toggled by `is.auth.activate` (false by default) — the
  `/logout` path alone is protected in production config.
- Every object returned by a REST endpoint must be serializable to JSON (no circular references, no non-serializable types). Use DTOs for any complex objects. This files must stay in the domain's `models/dto` folder using the name conventions *name*DTO.java. The `models/entity` folder is for persistence entities only and the name convention is *name*Entity.java. The `models` folder is for any other model that is not a DTO or an entity.
- Use ORM over sql queries whenever possible. Use sql queries only when the ORM is not able to provide the required functionality.
- Regarding the database name scheme follow the following conventions:
  - Use snake_case for table and column names.
  - Use singular nouns for table names (e.g., `cat_game`, not `cat_games`).
  - Use lowercase letters for table and column names.
  - Use underscores to separate words in table and column names (e.g., `cat_game_platform`, not `catGamePlatform`).
  - For catalogs tables, use the prefix `cat_` (e.g., `cat_game`, `cat_game_platform`).
  - For tables necessary for the GUI use the prefix `gui_` (e.g., `gui_remote`).
  - Junction tables use the same prefix as the tables they join, since a junction only ever connects tables within the same prefix group (e.g., cat_game_platform joins cat_game and cat_platform).