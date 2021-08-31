export = setCachingHeaders;
declare function setCachingHeaders(response: any, { cacheControl, surrogateControl }: {
    cacheControl?: string | undefined;
    surrogateControl?: string | undefined;
}, method?: string): void;
