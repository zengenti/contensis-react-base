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

const context = (
  typeof window != 'undefined' ? window : global
) as typeof globalThis & {
  USE_IDP?: string | boolean;
  WSFED_LOGIN?: string | boolean;
};

/** Both the boolean `true` and the string `"true"` turn a setting on. */
const isOn = (value: unknown) => value === true || value === 'true';

/** A build-time definition wins; otherwise the runtime global decides. */
const readSetting = (
  buildValue: string | boolean | undefined,
  runtimeValue: string | boolean | undefined
) => isOn(typeof buildValue === 'undefined' ? runtimeValue : buildValue);

/** Is this site opted in to IDP session auth (`/idp/*` + identity-client cookies)? */
export const isIdpEnabled = (): boolean =>
  readSetting(
    typeof USE_IDP !== 'undefined'
      ? /* global USE_IDP */ USE_IDP
      : undefined,
    context.USE_IDP
  );

/**
 * Is the legacy WSFED/OIDC login configured? Read here rather than through
 * `LoginHelper`, so this module depends on nothing the v5 clean-up deletes.
 * Startup log only: precedence needs no code in the WSFED paths, because none
 * of them run under `USE_IDP`.
 */
export const isWsFedLoginEnabled = (): boolean =>
  readSetting(
    typeof WSFED_LOGIN !== 'undefined'
      ? /* global WSFED_LOGIN */ WSFED_LOGIN
      : undefined,
    context.WSFED_LOGIN
  );

export type LoginMethod = 'idp' | 'wsfed' | 'classic';

/** The login mechanism this app actually uses: `USE_IDP` over `WSFED_LOGIN`
 *  over the classic Contensis login. */
export const activeLoginMethod = (): LoginMethod => {
  if (isIdpEnabled()) return 'idp';
  if (isWsFedLoginEnabled()) return 'wsfed';
  return 'classic';
};
