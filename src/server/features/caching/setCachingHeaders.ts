import { Response } from 'express';

const setCachingHeaders = (
  response: Response,
  { cacheControl = 'private', surrogateControl = '3600' },
  method = 'header'
) => {
  if (cacheControl) response[method]('Cache-Control', cacheControl);
  if (surrogateControl)
    response[method](
      'Surrogate-Control',
      `max-age=${surrogateControl.toString()}`
    );
};

export default setCachingHeaders;
