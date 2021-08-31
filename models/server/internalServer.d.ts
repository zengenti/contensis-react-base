declare namespace _default {
    export { app };
    export { apiProxy };
    export { start };
}
export default _default;
declare const app: any;
import { apiProxy } from "./features/reverse-proxy";
declare function start(ReactApp: any, config: any, ServerFeatures: any): void;
