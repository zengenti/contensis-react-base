export * from "./config";
export * from "./routing/routes";
export { default as linkDepthApi } from "./server/features/linkdepth-api/api";
import internalServer from "./server/internalServer";
export { default as ReactApp } from "./app/App";
export default internalServer;
