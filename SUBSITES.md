# Subsites

Subsites allow you to serve the same application from a single codebase where the subsite content is served from a sub-folder or site-view node in the same project.

## 1. Why Subsites?

Subsites (or microsites) were sometimes used with Contensis Classic where the content is stored inside a folder of an existing project but the subsite host/domain has all of its requests routed to the content folder path.

This feature aims to offer the same experience except in the modern Contensis React, Site View and Blocks framework.

> A host must be configured in the Contensis Cloud Dashboard with a `/path/` configured to direct inbound requests to this sub-path

## 2. Configuring Subsites

No configuration is needed, requests from subsites are identified in the backend by the presence of a `subsite_path` header and the app will render with its routing reach scoped to this content path.

## 3. Local Debugging

When developing locally, you may want to test subsite routing without deploying to the actual subsite domain. To do this, add a catch-all route in your server features and use the provided debug middleware.

```typescript
// src/server/features/configure.ts
import { DO_NOT_COMMIT_subsiteDebugMiddleware } from '@zengenti/contensis-react-base';

app.all(
  '/{*splat}',
  DO_NOT_COMMIT_subsiteDebugMiddleware('/help-and-docs/react-starter', [
    '/static/',
  ])
);
```

This middleware rewrites URLs to include the subsite base path when visiting from localhost, allowing you to simulate subsite-scoped routing during development.

> The naming is clear - do not commit this code to your repository; it is for local testing only and it works when your build is development or production.
>
> You will need to remove this code to revert to your normal main site debugging

## 4. Mediating Content Links

To ensure links in your app behave correctly for subsite visitors, we have used a hook to determine if the current visitor is scoped to a subsite and amends content links accordingly.

```typescript
import { useSSRContext } from '@zengenti/contensis-react-base/util';

/**
 * Remove the subsitePath from the uri when rendered in a subsite scope
 * - Only if the uri starts with the subsite path.
 * - Other local paths will be prefixed with the main site domain
 * @param href the content uri to translate
 * @returns the subsite-scoped content uri or the original href if we are not visiting from a subsite
 */
export const useFixSubsitePath = <T extends string | undefined>(href: T): T => {
  const { subsitePath } = useSSRContext();
  if (href?.length && subsitePath) {
    if (href.startsWith(subsitePath)) {
      return (href.substring(subsitePath.length) || '/') as T;
    }
    if (href.startsWith('/')) return `https://www.contensis.com${href}` as T;
  }

  return href as T;
};
```

Update your link components to fix the href by passing it through this hook:

```typescript
// link.component.tsx

const href = useFixSubsitePath(uri);

return (
  <a {...props} href={href}>
    {children}
  </a>
);
```

This ensures that all root-relative links are correctly truncated prefixed or based on the current subsite context, providing a seamless experience for visitors regardless of the domain or subsite path.
