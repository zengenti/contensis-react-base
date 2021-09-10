import { loginSagas } from './login';
import { registerSagas } from './register';
import { resetPasswordSagas } from './resetPassword';

export const userSagas = [
  ...loginSagas,
  ...registerSagas,
  ...resetPasswordSagas,
];
