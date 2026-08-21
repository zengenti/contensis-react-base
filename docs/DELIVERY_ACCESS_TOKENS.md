# Delivery API access tokens

There are two ways to supply an access token for the Delivery API. Both work out of the box - pick one.

| | Classic `ACCESS_TOKEN` | Scoped `accessTokens` |
|---|---|---|
| Where it's set | Environment variable, baked in at build/startup time | Server config (`server.ts`), resolved per request |
| Granularity | One token for everything | Per version status (`published` / `latest`) and per project |
| Protection | Token is always present in the page source | Tokens can be held back until a user logs in (`requireLogin`) |
| Best for | Public, published-only sites | Sites serving draft content or multiple projects with different tokens |

## Approach 1: the classic `ACCESS_TOKEN` global

Set an environment variable and the token is baked into the `DELIVERY_API_CONFIG` startup global:

```bash
# .env
ACCESS_TOKEN=your-delivery-api-access-token
```

- The same token is used for every request, on every project, for every user.
- The token ships with the page, so anyone can read it - only use tokens that are safe to expose publicly.
- If you don't do anything else, this is still exactly how it works.

## Approach 2: scoped `accessTokens` config

Configure tokens in your server entry instead of `.env`. Each token is scoped by:

- **version status** - `published` (published content) or `latest` (draft/preview content)
- **project** - optional per-project overrides via `projects`
- **login** - optional `requireLogin`, which holds the token back from the page

```ts
// src/server.ts
import ZengentiAppServer from '@zengenti/contensis-react-base';
import ReactApp from '~/App';

ZengentiAppServer.start(
  ReactApp,
  {
    accessTokens: {
      published: {
        // Scoped to published content only
        token: 'published-only-token',
      },
      latest: {
        // Draft/preview content - released to logged-in users only
        token: 'latest-content-token',
        requireLogin: true,
      },
      projects: {
        myOtherProject: {
          published: { token: 'other-project-published-token' },
          // Falls back to top-level entries for any scope omitted here
        },
      },
    },
    // ...other server config
  }
);
```

### How requests are served

For each request the server resolves a token based on the project and version status being asked for:

- **No `requireLogin`** - the token is injected into the usual SSR response. Pages render server-side as normal.
- **`requireLogin: true`** - SSR is skipped (the page renders dynamically client-side) and no token is put in the page. Once the user is authenticated, the app requests the token from a protected release endpoint; unauthenticated visitors are redirected to login.
- **`requireLogin: [{ name: 'group-name' }]`** - as above, but the token is only released to members of at least one of the listed user groups (by id or case-sensitive name).
- **Nothing configured for that scope/project** - no token is supplied and Delivery API requests will fail where they're made.

When `accessTokens` is configured it fully replaces the baked-in startup token, so you should remove `ACCESS_TOKEN` from your `.env`.

### The access-token release endpoint

When any token for the current default project (`PROJECT` environment variable) is configured with `requireLogin`, the server self-registers a protected release endpoint:

```http
POST /crb-api/auth/access-token
```

This is how protected access tokens are released to the browser - the client authenticates (or is redirected to login) and posts to this endpoint to receive the token. It returns `401`/`403` to callers who aren't authenticated or entitled to it.

**Contensis configuration required:** requests to `/crb-api/*` must reach your Block deployment. Add a node to the project's Site View root for `crb-api` with **"Is partial match root?"** enabled and its **Renderer** set to the deployed Block.

> This step is only needed when you use `requireLogin`. Tokens without `requireLogin` never touch this endpoint.

## Which one should I use?

- **Classic**: your site only ever shows published content to everyone. Simplest option, nothing to change.
- **Scoped**: you serve draft/preview content, need different tokens per project, or want draft content locked behind a login or specific groups.

The two are mutually exclusive per deployment: if `accessTokens` is present it wins over any `ACCESS_TOKEN`.
