/**
 * The messages and the error shape the IDP route sagas raise. Both the
 * require-login saga and the Delivery auth-error saga throw them — thrown rather
 * than put, so `do500` renders them through the site's `notFoundComponent`.
 */

/** What we could not reach. Says nothing about the member, and nothing about
 *  how they sign in. */
export const GENERIC_ERROR_MESSAGE =
  'We could not reach the service that signs you in. Please try again.';

/** We already sent the member to sign in for this page and it did not work. */
export const LOOP_GUARD_MESSAGE = 'We could not sign you in. Please try again.';

/** The shape `do500` reports through `SET_ENTRY`, so the site's
 *  `notFoundComponent` renders with this status. */
export const idpRouteError = (
  status: number,
  statusText: string,
  message: string
) => ({ status, statusText, data: { message } });
