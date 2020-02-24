export const hashKeys = keys => {
  const XXHash = require('xxhash');
  const returnKeys = [];
  keys.forEach(cacheKey => {
    const inputBuffer = Buffer.from(cacheKey.toLowerCase(), 'utf-8');
    const outputBuffer = Buffer.alloc(4);
    XXHash.hash(inputBuffer, 0x0, outputBuffer);
    returnKeys.push(outputBuffer.toString('base64').substring(0, 6));
  });
  return returnKeys;
};
