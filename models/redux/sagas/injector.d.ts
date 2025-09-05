export declare function reduxInjectorSaga(injectorFn: () => Promise<{
    key: string;
    reducer: any;
    saga: any;
}>): Generator<Promise<{
    key: string;
    reducer: any;
    saga: any;
}>, void, {
    key: any;
    reducer: any;
    saga: any;
}>;
