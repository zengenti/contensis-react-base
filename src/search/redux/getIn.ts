import { jpath } from 'jsonpath-mapper';

// Find a fromJS function from global that is dynamically loaded in createStore
// or replace with a stub function for non-immutable gets
export const makeFromJS = (
  returnType: 'immutable' | 'js' = (globalThis as any).STATE_TYPE || 'immutable'
) =>
  returnType === 'immutable'
    ? (globalThis as any).immutable?.fromJSOrdered ||
      (globalThis as any).immutable?.fromJS ||
      ((v: any) => v)
    : (v: any) => v;

const getImmutableOrJS = <
  S extends Record<string, unknown>,
  T extends keyof S | any
>(
  state: S,
  stateKey: T | T[],
  fallbackValue?: any,
  returnType: 'immutable' | 'js' = (globalThis as any).STATE_TYPE || 'immutable'
) => {
  // Find a fromJS function from global that is dynamically loaded in createStore
  // or replace with a stub function for non-immutable gets
  const fromJS = makeFromJS(returnType);

  if (
    state &&
    'get' in state &&
    typeof state.get === 'function' &&
    'getIn' in state &&
    typeof state.getIn === 'function' &&
    'toJS' in state &&
    typeof state.toJS === 'function'
  ) {
    if (Array.isArray(stateKey))
      return fromJS(state.getIn(stateKey, fallbackValue));
    return fromJS(state.get(stateKey, fallbackValue)) as S[T | any];
  }

  if (Array.isArray(stateKey) && state && typeof state === 'object') {
    const result = jpath(stateKey.join('.'), state);
    if (typeof result === 'undefined') return fallbackValue;
    return result;
  }

  const result =
    state && typeof state === 'object' ? state[stateKey as string] : undefined;
  if (typeof result === 'undefined') return fallbackValue;
  return result;
};

export default getImmutableOrJS;
