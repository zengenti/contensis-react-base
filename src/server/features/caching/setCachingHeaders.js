const setCachingHeaders = (
  response,
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

module.exports = setCachingHeaders;
