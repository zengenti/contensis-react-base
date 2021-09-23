export declare const makeFromJS: (returnType?: 'immutable' | 'js') => any;
declare const getImmutableOrJS: <S extends Record<string, unknown>, T extends unknown>(state: S, stateKey: T | T[], fallbackValue?: any, returnType?: 'immutable' | 'js') => any;
export default getImmutableOrJS;
