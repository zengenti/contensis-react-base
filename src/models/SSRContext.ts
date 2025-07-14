import { Request, Response } from 'express';
import { Dispatch } from 'redux';
import { CookieHelper } from '~/user/util/CookieHelper.class';
import { cachedSearchWithCookies } from '~/util';

export type SSRContext = {
  api: ReturnType<typeof cachedSearchWithCookies>;
  cookies: CookieHelper;
  dispatch: Dispatch<any>;
  request?: Request;
  response?: Response;
};
