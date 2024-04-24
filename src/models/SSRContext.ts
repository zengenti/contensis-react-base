import { Dispatch } from 'redux';
import { CookieHelper } from '~/user/util/CookieHelper.class';

export type SSRContext = {
  cookies: CookieHelper;
  dispatch: Dispatch<any>;
};
