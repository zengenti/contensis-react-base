export type ReduxInjector = () => Promise<{
    key: string;
    reducer: any;
    saga: any;
}>;
