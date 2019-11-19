import { createBrowserHistory, createMemoryHistory } from 'history';

// Create a history depending on the environment
const selectedHistory =
  typeof window !== 'undefined' ? createBrowserHistory : createMemoryHistory;

export const history = (options = {}) => selectedHistory(options);
export const browserHistory = selectedHistory();
