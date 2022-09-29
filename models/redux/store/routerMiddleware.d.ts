export default routerMiddleware;
/**
 * This middleware captures 'CALL_HISTORY_METHOD' actions to redirect to the
 * provided history object. This will prevent these actions from reaching your
 * reducer or any middleware that comes after this one.
 */
declare function routerMiddleware(history: any): (store: any) => (next: any) => (action: any) => any;
