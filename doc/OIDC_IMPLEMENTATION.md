# OIDC Integration Documentation

## 📋 Overview

This branch implements **full OIDC (OpenID Connect)** authentication and authorization using **Keycloak** as the identity provider.

### What's Implemented

| Component | Details |
|-----------|---------|
| **Backend** | Quarkus OIDC with 3 auth endpoints: `/login`, `/logout`, `/session` |
| **Frontend** | Angular services for login/logout flows with token management |
| **Protected APIs** | All endpoints require `@Authenticated` annotation |
| **Token Management** | Automatic JWT extraction and session management |

### Tech Stack

- **Backend:** Quarkus OIDC + SmallRye JWT
- **Frontend:** Angular Signals for reactive state
- **Identity Provider:** Keycloak (confidential OAuth2 client)
- **Protocol:** OpenID Connect 1.0

---

## 🔧 Backend Implementation

### 1️⃣ Dependencies

**File:** `src/backend/pom.xml`

```xml
<dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-oidc</artifactId>
</dependency>
<dependency>
    <groupId>io.quarkus</groupId>
    <artifactId>quarkus-smallrye-jwt</artifactId>
</dependency>
```

### 2️⃣ Configuration

**File:** `src/backend/src/main/resources/application.properties` (lines 24-39)

```properties
# Keycloak OIDC Configuration
quarkus.rest-client.keycloak.url=http://localhost:8080
quarkus.oidc.application-type=web-app
quarkus.oidc.auth-server-url=http://localhost:8080/realms/centralhub
quarkus.oidc.client-id=confidential-client
quarkus.oidc.credentials.secret=yv6Y6IibLfVUgJkAwoGkVsJ9IUiqYZc4
quarkus.oidc.authentication.user-info-required=true
quarkus.oidc.authentication.cookie-path=/
quarkus.http.proxy.proxy-address-forwarding=true
quarkus.oidc.authentication.redirect-path=/callback
quarkus.oidc.authentication.restore-path-after-redirect=true
quarkus.http.auth.permission.authenticated.paths=/logout
quarkus.http.auth.permission.authenticated.policy=authenticated
```

**Configuration Reference:**

| Property | Value | Purpose |
|----------|-------|---------|
| `application-type` | `web-app` | Server-side OIDC flow |
| `auth-server-url` | `http://localhost:8080/realms/centralhub` | Keycloak realm endpoint |
| `client-id` | `confidential-client` | OAuth2 client identifier |
| `credentials.secret` | `***` | Client secret (keep secure!) |
| `user-info-required` | `true` | Always fetch user info |
| `redirect-path` | `/callback` | OIDC callback endpoint |
| `restore-path-after-redirect` | `true` | Restore original URL after login |

### 3️⃣ AuthService

**File:** `src/backend/src/main/java/pt/amaralsoftware/service/AuthService.java`

```java
@ApplicationScoped
public class AuthService {
    
    @Inject
    @IdToken
    JsonWebToken idToken;
    
    @ConfigProperty(name = "quarkus.oidc.auth-server-url")
    String authServerUrl;
    
    /**
     * Extracts user information from OIDC ID token
     */
    public UserInfoDTO getUserInfo() {
        String userName = this.idToken.getName();
        String tokenID = this.idToken.getRawToken();
        
        UserInfoDTO dto = new UserInfoDTO();
        dto.setName(userName);
        dto.setIdToken(tokenID);
        return dto;
    }
    
    /**
     * Constructs Keycloak logout URL with proper parameters
     */
    public String getLogoutUrl(String redirectUri, String idToken) {
        return authServerUrl + "/protocol/openid-connect/logout?post_logout_redirect_uri=" +
            URLEncoder.encode(redirectUri, StandardCharsets.UTF_8) + 
            "&client_id=confidential-client&id_token_hint=" + idToken;
    }
}
```

**Key Methods:**

- **`getUserInfo()`** → Extracts username & token from JWT
- **`getLogoutUrl()`** → Builds secure Keycloak logout URL with id_token_hint

### 4️⃣ REST Endpoints

**File:** `src/backend/src/main/java/pt/amaralsoftware/api/AuthAPI.java`

```java
@Path("/auth")
@Authenticated
public class AuthAPI {
    
    @Inject
    AuthService authService;
    
    /**
     * GET /auth/session
     * Retrieve current user information and token
     */
    @GET
    @Path("/session")
    public RestResponse<UserInfoDTO> getSession() {
        return RestResponse.ok(authService.getUserInfo());
    }
    
    /**
     * GET /auth/login?redirect_uri=...
     * Initiate login flow
     */
    @GET
    @Path("/login")
    @Produces(MediaType.TEXT_HTML)
    public RestResponse<Void> login(@QueryParam("redirect_uri") String redirectUri) {
        return RestResponse.seeOther(URI.create(redirectUri));
    }
    
    /**
     * GET /auth/logout?redirect_uri=...&idToken=...
     * Initiate logout with Keycloak
     */
    @GET
    @Path("/logout")
    @Produces(MediaType.TEXT_HTML)
    public RestResponse<Void> logout(
            @QueryParam("redirect_uri") String redirectUri,
            @QueryParam("idToken") String idToken) {
        String logoutUrl = authService.getLogoutUrl(redirectUri, idToken);
        return RestResponse.seeOther(URI.create(logoutUrl));
    }
}
```

**Endpoints:**

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/auth/session` | GET | ✅ | Get current user info |
| `/auth/login` | GET | ❌ | Redirect to Keycloak login |
| `/auth/logout` | GET | ❌ | Redirect to Keycloak logout |

### 5️⃣ Protected APIs

All application APIs require authentication:

```java
@Path("/shelve/api")
@Authenticated
public class ShelveProductAPI { ... }

@Path("/games/api")
@Authenticated
public class GameVaultAPI { ... }
```

---

## 🎨 Frontend Implementation

### 1️⃣ AuthState (State Management)

**File:** `src/frontend/packages/portal-lib/src/lib/auth/auth-state.ts`

```typescript
@Injectable()
export class AuthState {
    
    private readonly defaultState = {
        isLoggedIn: false,
        userName: "",
        idToken: "",
    }
    
    readonly state = signal<State>(this.defaultState)
    
    /**
     * Reset auth state to default (logout)
     */
    restoreState() {
        this.state.set(this.defaultState);
    }
}
```

**State Properties:**

| Property | Type | Purpose |
|----------|------|---------|
| `isLoggedIn` | `boolean` | User authentication status |
| `userName` | `string` | Current user's name from Keycloak |
| `idToken` | `string` | JWT ID token from Keycloak |

> Uses **Angular Signals** for reactive state management

### 2️⃣ AuthApi Service

**File:** `src/frontend/packages/portal-lib/src/lib/auth/auth-api.ts`

```typescript
@Injectable()
export class AuthApi {
    
    readonly #httpClient = inject(HttpClient);
    readonly #authState = inject(AuthState);
    
    /**
     * Silent login - checks if user already authenticated
     * Used during app initialization
     */
    public doAutoLogin() {
        this.checkSession()
            .then(userInfo => this.setAuthState(userInfo, true))
    }
    
    /**
     * Manual login - redirects to Keycloak if not authenticated
     */
    public doManualLogin() {
        this.checkSession()
            .then(userInfo => this.setAuthState(userInfo, true))
            .catch(() => {
                window.location.href = 
                    `/auth/login?redirect_uri=${encodeURIComponent(window.location.href)}`;
            })
    }
    
    /**
     * Logout - clears state and redirects to Keycloak logout
     */
    public doManualLogout(idToken: string) {
        window.location.href = 
            `/auth/logout?redirect_uri=${encodeURIComponent(window.location.href)}&idToken=${idToken}`;
        this.#authState.restoreState();
    }
}
```

**Key Methods:**

| Method | Behavior |
|--------|----------|
| `doAutoLogin()` | Silent session check (app init) |
| `doManualLogin()` | Redirects to Keycloak if needed |
| `doManualLogout()` | Logs out from both app and Keycloak |

### 3️⃣ Auth Provider

**File:** `src/frontend/packages/portal-lib/src/lib/auth/auth-provider.ts`

```typescript
export function providerOidcAuth() {
    return makeEnvironmentProviders([
        AuthApi,
        AuthState
    ]);
}
```

**Registered in:** `src/frontend/packages/portal/src/app/app.config.ts`

Makes `AuthApi` and `AuthState` available for dependency injection throughout the app.

---

## 🔐 Authentication Flows

### Login Sequence

```
User clicks Login
        │
        ▼
Frontend: AuthApi.doManualLogin()
  │ GET /auth/session
  │
  └─→ 401 Unauthorized
       │
       ▼
Redirect: /auth/login?redirect_uri=...
       │
       ▼
Backend: AuthAPI.login()
  │ Redirect to Keycloak
  │
  └─→ http://localhost:8080/realms/centralhub/protocol/openid-connect/auth
       │
       ▼
User: Enter credentials
       │
       ▼
Keycloak: Validates & redirects
  │ POST /callback?code=...
  │
  └─→ Backend receives code
       │
       ▼
Quarkus OIDC: Exchanges code for tokens
  │ Token validation
  │ Cookie/Session setup
  │
  └─→ Frontend retries GET /auth/session
       │
       ▼
Backend: AuthService.getUserInfo()
  │ Extract from ID token
  │
  └─→ Return { name, idToken }
       │
       ▼
Frontend: AuthState updated ✅
  │ isLoggedIn = true
  │ userName = "user@example.com"
  │ idToken = "jwt_token"
```

### Logout Sequence

```
User clicks Logout
        │
        ▼
Frontend: AuthApi.doManualLogout(idToken)
        │
        ▼
Redirect: /auth/logout?redirect_uri=...&idToken=...
        │
        ▼
Backend: AuthAPI.logout()
  │ AuthService.getLogoutUrl()
  │
  └─→ Build logout URL with id_token_hint
       │
       ▼
Frontend: Redirect to Keycloak logout
  │ http://localhost:8080/realms/centralhub/protocol/openid-connect/logout?...
  │
  └─→ Keycloak invalidates session
       │
       ▼
Keycloak: Redirects back to post_logout_redirect_uri
        │
        ▼
Frontend: AuthState.restoreState() ✅
  │ isLoggedIn = false
  │ userName = ""
  │ idToken = ""
```

### Session Validation

```
Request to Protected API
  │ /games/api/...
  │
  ├─→ Quarkus @Authenticated interceptor
       │
       ├─ Has valid session/token?
       │
       ├─ YES ✅
       │  │ AuthService.getUserInfo()
       │  │ Extract user from ID token
       │  │ Continue request
       │
       └─ NO ❌
          │ Return 401 Unauthorized
          │ Frontend triggers login
```

---

## 🚀 Getting Started

### Prerequisites

- Docker (for Keycloak)
- JDK 11+ (Quarkus)
- Node.js 18+ (Angular/Nx)

### Keycloak Setup

#### 1. Start Keycloak

```bash
docker run -p 8080:8080 \
  -e KEYCLOAK_ADMIN=admin \
  -e KEYCLOAK_ADMIN_PASSWORD=admin \
  quay.io/keycloak/keycloak:latest start-dev
```

**Access:** http://localhost:8080/admin → Login with `admin:admin`

#### 2. Create Realm

1. Go to **Realms** section
2. Click **Create Realm**
3. Name: `centralhub`
4. Click **Create**

#### 3. Create Client

1. In `centralhub` realm → **Clients** → **Create client**
2. **General Settings:**
   - Client ID: `confidential-client`
   - Client type: `OpenID Connect`
3. **Capability config:**
   - Client authentication: `ON`
   - Authorization: `OFF`
4. **Save**
5. **Credentials tab:**
   - Copy the **Client Secret**
   - Paste into `application.properties`: `quarkus.oidc.credentials.secret=<secret>`

#### 4. Create Test User (Optional)

1. **Users** → **Create user**
2. Username: `testuser`
3. Set password in **Credentials** tab
4. Temporary: `OFF`

### Running Locally

#### Backend (Quarkus)

```bash
cd src/backend
mvn quarkus:dev
```

> Backend runs at `http://localhost:8081` (adjust port if needed)

#### Frontend (Angular)

```bash
cd src/frontend
npm install  # if first time
nx serve portal
```

> Frontend runs at `http://localhost:4200`

### Testing the Flow

1. Open http://localhost:4200 in browser
2. Click **Login** button
3. Enter Keycloak credentials (or create user first)
4. After login → App shows username
5. Try accessing protected APIs
6. Click **Logout** → Keycloak logs out → App resets state

---

## 🔒 Security Checklist

### Development ✅

- [x] Localhost HTTP acceptable
- [x] Client secret in `application.properties` for testing
- [x] CORS configured for localhost
- [x] Token validation enabled

### Production ⚠️

Before deploying, ensure:

- [ ] **HTTPS/TLS enabled** on all URLs
- [ ] **Client secret moved to environment variable or vault**
  ```bash
  export QUARKUS_OIDC_CREDENTIALS_SECRET=your-secret
  ```
- [ ] **Keycloak auth-server-url uses HTTPS**
- [ ] **Frontend and Backend on same origin** (or CORS properly configured)
- [ ] **Secure cookies enabled:**
  ```properties
  quarkus.oidc.authentication.cookie-secure=true
  quarkus.oidc.authentication.cookie-http-only=true
  quarkus.oidc.authentication.cookie-same-site=strict
  ```
- [ ] **Token lifetimes configured** in Keycloak realm
- [ ] **Database secrets** not logged
- [ ] **Rate limiting** on auth endpoints

---

## 🐛 Troubleshooting

### ❌ Login Redirect Fails

**Symptoms:** Page stuck on Keycloak login

**Solutions:**
- Verify Keycloak running: `http://localhost:8080`
- Check Keycloak client **Valid Redirect URIs** includes `http://localhost:*` or `http://localhost:8081/callback`
- Verify `quarkus.oidc.auth-server-url` matches realm URL
- Check Keycloak logs: `docker logs keycloak-container`

### ❌ "User info required but not available"

**Symptoms:** `UserInfoDTO` is null or empty

**Solutions:**
- Verify `quarkus.oidc.authentication.user-info-required=true`
- Check Keycloak realm has **user info** enabled
- Verify token includes `name` claim
- Inspect token at https://jwt.io

### ❌ 401 on Protected Endpoints

**Symptoms:** `/games/api` returns Unauthorized

**Solutions:**
- Verify `GET /auth/session` returns 200 with user info
- Check `@Authenticated` annotation present on controller
- Verify session cookie present in browser DevTools → Storage → Cookies
- Try hard refresh (Ctrl+Shift+R)

### ❌ Frontend Shows Blank Username

**Symptoms:** `AuthState.isLoggedIn = true` but `userName = ""`

**Solutions:**
- Verify `/auth/session` endpoint returns correct `UserInfoDTO`
- Check `AuthApi.setAuthState()` called correctly
- Inspect browser console for JavaScript errors
- Verify Angular component subscribes to `AuthState.state` signal

### ❌ Logout Doesn't Work

**Symptoms:** Still logged in after logout

**Solutions:**
- Verify `idToken` passed to `doManualLogout()`
- Check `/auth/logout` endpoint returns 302 redirect
- Verify `post_logout_redirect_uri` is URL-encoded
- Hard refresh to clear browser cache
- Check Keycloak session: May need separate browser/incognito

### ❌ CORS Errors

**Symptoms:** `Access-Control-Allow-Origin` missing

**Solutions:**
- If same origin: no CORS needed
- If separate: Add to `application.properties`:
  ```properties
  quarkus.http.cors=true
  quarkus.http.cors.origins=http://localhost:4200
  quarkus.http.cors.methods=GET,POST,PUT,DELETE
  quarkus.http.cors.credentials=true
  ```

---

## 📚 References

- **Quarkus OIDC:** https://quarkus.io/guides/security-openid-connect
- **Quarkus Security:** https://quarkus.io/guides/security
- **Keycloak Docs:** https://www.keycloak.org/documentation.html
- **OpenID Connect:** https://openid.net/specs/openid-connect-core-1_0.html
- **JWT Decode:** https://jwt.io

---

**Branch:** `Implement-Keycloak-Authentication-and-Authorization`  
**Last Updated:** April 2026
