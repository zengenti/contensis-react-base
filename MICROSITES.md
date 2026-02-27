# Microsites

Microsites allow you to serve the same application from a single codebase  where the microsite content is served from a sub-folder or site-view node in the same project.


## 1. Why Microsites?

Microsites were regularly used with Contensis Classic where the content is stored inside a folder of an existing project but the microsite host/domain has all of its requests routed to the content folder path.

This feature aims to offer the same experience except in the modern Contensis React, Site View and Blocks framework.

> A host must be configured in the Contensis Cloud Dashboard with a `/path/` configured to direct inbound requests to this sub-path


## 2. Configuring Microsites

Each microsite entry defines a `basePath` and a list of `domains` that should resolve content from that base path when rendered from that domain.

We've created a separate file so we can add this config to our server start options, and use it in client-side components

```typescript
// src/microsites.ts

import type { ServerConfig } from '@zengenti/contensis-react-base';

export const microsites: ServerConfig['microsites'] = [
  {
    basePath: '/help-and-docs/react-starter',
    domains: ['www.react-starter.com'],
  },
];
```

To enable microsites, pass the `microsites` config to your server start options. This ensures the server is aware of all configured microsites and can route requests accordingly.

```typescript
// src/server/server.ts

import { microsites } from '../microsites';

ZengentiAppServer.start(
  ReactApp,
  {
    microsites,
    // ...other options...
  },
  ServerFeatures
);
```

## 3. Local Debugging

When developing locally, you may want to test microsite routing without deploying to the actual microsite domain. To do this, add a catch-all route in your server features and use the provided debug middleware.

```typescript
// src/server/features/configure.ts

import { microsites } from '~/../microsites';
import { DO_NOT_COMMIT_micrositeDebugMiddleware } from '@zengenti/contensis-react-base';

app.all(
  '/{*splat}',
  DO_NOT_COMMIT_micrositeDebugMiddleware(microsites?.[0])
);
```

This middleware rewrites URLs to include the microsite base path when visiting from localhost, allowing you to simulate microsite behavior during development.


> The naming is clear - do not commit this code to your repository; it is for local testing only.
>
> You will need to remove this code to revert to your normal main site debugging

## 4. Mediating Rendered Links

To ensure links in your app behave correctly for microsite visitors, we have used a hook to determine if the current visitor is on a microsite domain and amends content links accordingly.

```typescript
import { microsites } from '~/../microsites';

/**
 * Remove the basePath from the uri when rendered in a microsite domain
 * - Only if the uri starts with the microsite basePath.
 * - Other local paths will be prefixed with the main site domain
 * @param href the content uri to translate
 * @returns the microsite-scoped content uri or the original href if we are not visiting from a microsite
 */
export const useMicrositePath = <T extends string | undefined>(href: T): T => {
  const ssrHostname = useSelector(selectors.selectSsrHostname);

  if (href?.length) {
    const microsite = microsites.find(microsite =>
      microsite.domains.includes(ssrHostname)
    );

    if (microsite) {
      if (href.startsWith(microsite.basePath)) {
        return (href.substring(microsite.basePath.length) || '/') as T;
      }
      if (href.startsWith('/')) return `https://www.contensis.com${href}` as T;
    }
  }

  return href as T;
};
```

Update your link components to fix the href by passing it through this hook:

```typescript
// link.component.tsx

const href = useMicrositePath(uri);

return (
  <a {...props} href={href}>
    {children}
  </a>
);
```

This ensures that all root-relative links are correctly truncated prefixed or based on the current microsite context, providing a seamless experience for users regardless of the domain or base path.

## Summary

- **Configure** microsites in `microsites.ts`.
- **Register** the config with your server start options.
- **Test** locally using the debug middleware and a catch-all route.
- **Mediate** all rendered links using a hook or similar utility.


> The Contensis Cloud Dashboard will have a host configuration with a `/path/` configured to direct inbound requests to this sub-path when deployed to production
