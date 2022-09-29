import { Response } from 'express';
declare const setCachingHeaders: (response: Response, { cacheControl, surrogateControl }: {
    cacheControl?: string | undefined;
    surrogateControl?: string | undefined;
}, method?: string) => void;
export default setCachingHeaders;
