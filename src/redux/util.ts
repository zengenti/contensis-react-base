export const action = (type: string, payload: any = {}) => ({
  type,
  ...payload,
});

export const getJS = <S extends Record<string, unknown>, T extends keyof S>(
  state: S,
  stateKey: T
) => {
  if ('get' in state && typeof state.get === 'function') {
    const result = state.get(stateKey);
    if ('toJS' in result && typeof result.toJS === 'function')
      return result.toJS() as S[T];
    return result as S[T];
  }
  return state[stateKey];
};
