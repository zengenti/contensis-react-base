export declare const isApiError: (e: unknown) => e is {
    status: number;
    statusText: string;
    url?: string;
    data?: {
        logId?: string;
        message?: string;
        data?: {
            responseDuration: string;
        };
        type: string;
    };
};
export declare const isPlainError: (e: unknown) => e is Error;
export declare const logError: (prefix: string, e: unknown) => void;
export declare const shorten: (str: string, maxLength?: number, endWeight?: number) => string;
