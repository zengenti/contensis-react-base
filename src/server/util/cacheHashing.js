export const hashKeys = keys => {
  const XXHash = require('xxhashjs');
  const returnKeys = [];
  keys.forEach(cacheKey => {
    const inputBuffer = Buffer.from(cacheKey.toLowerCase(), 'utf-8');

    const hashed = XXHash.h32(inputBuffer, 0x0).toString(16);
    const reversedhex = hashed
      .match(/[a-fA-F0-9]{2}/g)
      .reverse()
      .join('');

    const outputBuffer = Buffer.from(reversedhex, 'hex');

    returnKeys.push(outputBuffer.toString('base64').substring(0, 6));
  });
  return returnKeys;
};
