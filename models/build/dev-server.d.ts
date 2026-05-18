interface DevOptions {
    config?: string;
    envFile?: string;
    devHost?: string;
    devPort?: string;
    devListen?: string;
    open?: boolean;
    inspect?: boolean | string;
    inspectBrk?: boolean | string;
}
export declare function runDev(args: DevOptions): void;
export {};
