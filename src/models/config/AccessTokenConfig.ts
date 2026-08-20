import { RequireLogin } from '../RequireLogin';

export type ScopedAccessToken = {
  token: string;
  /** `requireLogin: true` - skip SSR, access token is never injected, the client must authenticate (and request it)
   *
   *  `requireLogin: [{ id }, { name }]` - as above, but the token is only released to a
   *  caller who is a member of at least one of the given user groups
   *
   *  `requireLogin: false` - access token injected into the page, SSR renders as normal (default: `false`). */
  requireLogin?: RequireLogin;
};

export type ScopedAccessTokenConfig =
  | {
      /** Serves published content */
      published?: undefined;
      /** Serves latest/draft content */
      latest?: undefined;
    }
  | {
      /** Serves published content */
      published: ScopedAccessToken;
      /** Serves latest/draft content */
      latest: ScopedAccessToken;
    };

export type AccessTokenConfig = ScopedAccessTokenConfig & {
  /** Per-project tokens. Used in place of the top-level values when a
   *  request resolves to that project. */
  projects?: {
    [projectId: string]: ScopedAccessTokenConfig;
  };
};
