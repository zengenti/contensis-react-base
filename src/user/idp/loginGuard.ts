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

const getStorage = (): Storage | null => {
  try {
    if (typeof window === 'undefined') return null;
    return window.sessionStorage;
  } catch {
    return null;
  }
};

const keyFor = (returnPath: string) => `${STORAGE_PREFIX}${returnPath}`;

/** Has an automatic redirect to `/idp/check` already been made for this path? */
export const isLoginGuardArmed = (returnPath: string): boolean => {
  const storage = getStorage();
  if (!storage) return false;

  try {
    const raw = storage.getItem(keyFor(returnPath));
    if (!raw) return false;

    const armedAt = Number(raw);
    if (!Number.isFinite(armedAt)) return false;

    if (Date.now() - armedAt > LOGIN_GUARD_TTL_MS) {
      storage.removeItem(keyFor(returnPath));
      return false;
    }
    return true;
  } catch {
    error('[idp] sessionStorage is unreadable, login guard treated as unset');
    return false;
  }
};

/** Arm the guard for this path. Called by automatic redirects only. */
export const armLoginGuard = (returnPath: string) => {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(keyFor(returnPath), String(Date.now()));
  } catch {
    // Unwritable storage: the redirect may repeat. Nothing else to do.
  }
};

/**
 * Disarm the guard. Called when a session is established for the path, and on
 * logout — where passing no path clears every guarded path.
 */
export const clearLoginGuard = (returnPath?: string) => {
  const storage = getStorage();
  if (!storage) return;

  try {
    if (returnPath) {
      storage.removeItem(keyFor(returnPath));
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
