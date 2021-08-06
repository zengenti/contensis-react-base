import { loginSagas } from './login';
import { registerSagas } from './register';

export const userSagas = [...loginSagas, ...registerSagas];
