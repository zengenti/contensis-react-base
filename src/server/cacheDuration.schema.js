export const CacheDuration = {
  200: '3600',
  404: '5',
  static: '31536000', // Believe it or not these two max ages are the same in runtime
  expressStatic: '31557600h', // Believe it or not these two max ages are the same in runtime
};

export const getCacheDuration = (status = 200) => {
  if (status > 400) return CacheDuration[404];
  return CacheDuration[200];
};
