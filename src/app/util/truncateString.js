//arguments are: (string to truncate, truncate length, concatenated onto truncated string)
export default function truncateString(s, n, endsWith = '') {
  if (typeof s != 'string') {
    throw new TypeError('First argument must be a string');
  }
  if (typeof n != 'number') {
    throw new TypeError('Second argument must be a number');
  }
  //if string is within the max size, just return it
  if (s.length <= n) return s;
  //ensure sliceAmount is >= 0 so it doesn't slice from end of string, only from the start
  let sliceAmount = n - endsWith.length;
  if (sliceAmount < 0) {
    sliceAmount = 0;
  }
  //this will still add endsWith e.g. '...' onto the string, even if the final length > truncation amount
  //if the string is very small, else it replaces the last characters with the endsWith string.
  return s.slice(0, sliceAmount) + endsWith;
}
