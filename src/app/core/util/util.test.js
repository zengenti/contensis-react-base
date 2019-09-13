//could use --json and --jsonOutputFile=<filename> to output test results for using in CI
import isNonEmptyArray from '~/core/util/isNonEmptyArray';
import truncateString from '~/core/util/truncateString';
import { getHumanReadableDate } from '~/core/util/dateHelper';
describe('#isNonEmptyArray', function() {
  it('should return true/false depending on whether input is a non-empty array or not.', function() {
    expect(isNonEmptyArray(['hello'])).toBe(true);
    expect(isNonEmptyArray([])).toBe(false);
    expect(isNonEmptyArray(5)).toBe(false);
    expect(isNonEmptyArray(new Map([['hello', 'world']]))).toBe(false);
  });
});

describe('#truncateString', function() {
  it('should return the same string if truncation size is smaller than the string size', function() {
    expect(truncateString('hello world', 200)).toBe('hello world');
    expect(truncateString('hello world', 11)).toBe('hello world');
    expect(truncateString('hello world', 12)).toBe('hello world');
  });
  it('should correctly truncate strings', function() {
    expect(truncateString('hello world', 1)).toBe('h');
    expect(truncateString('hello world', 5)).toBe('hello');
    expect(truncateString('hello world', 6)).toBe('hello ');
    expect(truncateString('hello world', 10)).toBe('hello worl');
  });
  it('should replace final characters, or concat a chosen string onto the end of the result correctly.', function() {
    expect(truncateString('hello world', 1, '...')).toBe('...');
    expect(truncateString('hello world', 2, '...')).toBe('...');
    expect(truncateString('hello world', 4, '...')).toBe('h...');
    expect(truncateString('hello world', 5, '...')).toBe('he...');
    expect(truncateString('hello world', 6, '...')).toBe('hel...');
    expect(truncateString('hello world', 10, '...')).toBe('hello w...');
    expect(truncateString('hello world', 11, '...')).toBe('hello world');
    expect(truncateString('hello world', 12, '...')).toBe('hello world');
    expect(truncateString('hello world', 13, '...')).toBe('hello world');
  });
});

describe('#getHumanReadableDate', function() {
  it('should format a valid date into a human readable format according to defaults', function() {
    expect(getHumanReadableDate('2019-07-12T16:20:55.754Z')).toBe(
      'Jul 12, 2019'
    );
    expect(getHumanReadableDate('2019-07-06T16:20:55.754Z')).toBe(
      'Jul 6, 2019'
    );
  });
  it('should format a valid date into a human readable format according to options', function() {
    expect(
      getHumanReadableDate('2019-07-06T16:20:55.754Z', { day: '2-digit' })
    ).toBe('Jul 06, 2019');
    expect(
      getHumanReadableDate('2019-07-06T16:20:55.754Z', { month: 'long' })
    ).toBe('July 6, 2019');
  });
});
