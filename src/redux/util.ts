import { jpath } from '~/util/json-mapper';

export const action = (type: string, payload: any = {}) => ({
  type,
  ...payload,
});

export const getJS = <S extends Record<string, unknown>, T extends keyof S>(
  state: S,
  stateKey: T
) => {
  if (
    'get' in state &&
    typeof state.get === 'function' &&
    'toJS' in state &&
    typeof state.toJS === 'function'
  ) {
    return state.get(stateKey) as S[T];
  }
  return state[stateKey];
};

export const getImmutableOrJS = <
  S extends Record<string, unknown>,
  T extends keyof S | any
>(
  state: S,
  stateKey: T | T[],
  fallbackValue?: any
) => {
  if (
    state &&
    'get' in state &&
    typeof state.get === 'function' &&
    'getIn' in state &&
    typeof state.getIn === 'function' &&
    'toJS' in state &&
    typeof state.toJS === 'function'
  ) {
    if (Array.isArray(stateKey)) return state.getIn(stateKey, fallbackValue);
    return state.get(stateKey, fallbackValue) as S[T | any];
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
