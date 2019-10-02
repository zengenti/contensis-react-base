import formatDate from './formatDate';

//example date string: 2019-01-02T13:05:00
//yyyy > year long eg. 2019
//yy > year short eg. 19
//MMMM > month long eg. January
//MMM > month short eg. Jan
//MM > month with leading 0 eg. 01
//M > month eg. 1
//dddd > day long eg. Monday
//ddd > day short eg. Mon
//dd > date with leading 0 eg. 02
//d > date eg. 2
//HH > 24 hour clock hour parameter with leading 0, eg. ...T03:05:00 = 03
//H > 24 hour clock hour parameter, eg. ...T03:05:00 = 3
//hh > 12 hour clock hour parameter with leading 0, eg. ...T16:05:00 = 04
//h > 12 hour clock hour parameter, eg. ...T16:05:00 = 4
//mm > minutes with leading 0, eg. ...T16:05:00 = 05
//m > minutes, eg ...T16:05:00 = 5
//t > abbreviated AM / PM, e.g. A or P
//tt > AM / PM, e.g. AM or PM

const formatDateRange = (
  dateRange,
  dateFormat = 'dd MMMM yyyy',
  separator = ' - '
) => {
  if (!dateRange) return null;
  if (!dateFormat) return `${dateRange.to} - ${dateRange.from}`;

  const dFrom = dateRange.from;
  const dFromDate = formatDate(dFrom, dateFormat);
  const dTo = dateRange.to;
  const dToDate = formatDate(dTo, dateFormat);

  let dateTime = '';

  if (dFromDate == dToDate) {
    dateTime = dFromDate;
  } else {
    dateTime = `${dFromDate}${separator}${dToDate}`;
  }

  return dateTime;
};

export default formatDateRange;
