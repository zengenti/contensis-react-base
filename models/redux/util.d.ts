export declare const action: (type: string, payload?: any) => any;
export declare const getJS: <S extends Record<string, unknown>, T extends keyof S>(state: S, stateKey: T) => S[T];
