/**
 * The `USE_IDP` site setting, following the `WSFED_LOGIN` pattern exactly:
 *
 * - Defined at build time (webpack `DefinePlugin`, either mode): the value is
 *   baked into the bundle and wins. The read is `typeof`-guarded so consumers
 *   that never define it fall back to the runtime global instead of throwing a
 *   `ReferenceError`.
 * - Not defined: the setting arrives on `window` (browser) or `global` (server)
 *   from `startup.js` / `start.js` as the string `"true"`, which keeps a
 *   deployment that leaves it out of its bundle environment-agnostic.
 *
 * Read when the function is called and never cached at module load, so the
 * server and the client always agree on the same answer.
 *
 * `USE_IDP` takes precedence over every other login method: with the setting on,
 * no code path reaches the classic or WSFED implementations.
 */
/** Is this site opted in to IDP session auth (`/idp/*` + identity-client cookies)? */
export declare const isIdpEnabled: () => boolean;
/**
 * Is the legacy WSFED/OIDC login configured? Read here rather than through
 * `LoginHelper`, so this module depends on nothing the v5 clean-up deletes.
 * Startup log only: precedence needs no code in the WSFED paths, because none
 * of them run under `USE_IDP`.
 */
export declare const isWsFedLoginEnabled: () => boolean;
export type LoginMethod = 'idp' | 'wsfed' | 'classic';
/** The login mechanism this app actually uses: `USE_IDP` over `WSFED_LOGIN`
 *  over the classic Contensis login. */
export declare const activeLoginMethod: () => LoginMethod;
