/**
 * The once-per-`returnPath` redirect guard (KTD8, R16).
 *
 * A member is sent to `/idp/check` automatically at most once per path. If
 * they come straight back and the session still fails, they see an error state
 * instead of another redirect.
 *
 * The guard lives in `sessionStorage` because it has to survive the full
 * navigation to `/idp/check` and back through Keycloak — an in-memory value
 * would be gone by the time it was needed. It is keyed by the normalised
 * `returnPath` and carries a 5-minute TTL, so a stale mark from a lunchtime
 * cannot strand a member on the error page.
 *
 * `loginUser()` neither checks nor sets the guard: an explicit login click is
 * never blocked (R16).
 *
 * Where `sessionStorage` is blocked (private mode, some enterprise policy),
 * every operation fails closed to "guard not armed". That is the honest
 * answer: we cannot remember across the navigation, so we allow the redirect.
 */
import { error } from 'loglevel';

const STORAGE_PREFIX = 'idp.loginGuard.';

/** A guard older than this no longer suppresses a retry. */
export const LOGIN_GUARD_TTL_MS = 5 * 60 * 1000;

/** Delivery 401s escalate under their own key. Establishing a session must not
 *  disarm it: a member whose Delivery access keeps failing would otherwise be
 *  redirected to `/idp/check` on every load (R16). */
export const DELIVERY_GUARD = 'delivery';

const getStorage = (): Storage | null => {
  try {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const keyFor = (returnPath: string, scope?: string) =>
  `${STORAGE_PREFIX}${scope ? `${scope}.` : ''}${returnPath}`;

/** Stamped into every guard this page load arms. A guard armed by this load
 *  means the redirect is still in hand; one armed by an earlier load means we
 *  sent the visitor and it did not work (R16). */
const PAGE_LOAD_ID = Math.random().toString(36).slice(2);

const readGuard = (
  returnPath: string,
  scope?: string
): { armedAt: number; pageLoadId?: string } | null => {
  const storage = getStorage();
  if (!storage) return null;

  try {
    const raw = storage.getItem(keyFor(returnPath, scope));
    if (!raw) return null;

    const [armedAtRaw, pageLoadId] = raw.split(':');
    const armedAt = Number(armedAtRaw);
    if (!Number.isFinite(armedAt)) return null;

    if (Date.now() - armedAt > LOGIN_GUARD_TTL_MS) {
      storage.removeItem(keyFor(returnPath, scope));
      return null;
    }
    return { armedAt, pageLoadId };
  } catch {
    error('[idp] sessionStorage is unreadable, login guard treated as unset');
    return null;
  }
};

/** Has an automatic redirect to `/idp/check` already been made for this path? */
export const isLoginGuardArmed = (
  returnPath: string,
  scope?: string
): boolean => !!readGuard(returnPath, scope);

/** Was that redirect made by this page load? Then it is under way, not spent: a
 *  second concurrent route saga must not read it as a failed attempt. */
export const isRedirectPending = (returnPath: string, scope?: string): boolean =>
  readGuard(returnPath, scope)?.pageLoadId === PAGE_LOAD_ID;

/** Arm the guard for this path. Called by automatic redirects only. */
export const armLoginGuard = (returnPath: string, scope?: string) => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(
      keyFor(returnPath, scope),
      `${Date.now()}:${PAGE_LOAD_ID}`
    );
  } catch {
    // Unwritable storage: the redirect may repeat. Nothing else to do.
  }
};

/**
 * Disarm the guard. Called when a member is shown on the path, and on
 * logout — where passing no path clears every guarded path.
 */
export const clearLoginGuard = (returnPath?: string, scope?: string) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    if (returnPath) {
      storage.removeItem(keyFor(returnPath, scope));
      return;
    }
    const keys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (typeof key === 'string' && key.startsWith(STORAGE_PREFIX))
        keys.push(key);
    }
    keys.forEach(key => storage.removeItem(key));
  } catch {
    // Nothing to clear when storage is unavailable.
  }
};
