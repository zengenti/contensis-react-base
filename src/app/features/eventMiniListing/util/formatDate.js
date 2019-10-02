//example date string: 2019-01-02T13:05:00 (expects ISO 8601 Datetime format yyyy-mm-ddThh:mm:ss [this is the format returned from Contensis delivery api])
//yyyy > year long, eg. 2019
//yy > year short, eg. 19
//MMMM > month long, eg. January
//MMM > month short, eg. Jan
//MM > month with leading 0, eg. 01
//M > month, eg. 1
//dddd > day long, eg. Monday
//ddd > day short, eg. Mon
//dd > date with leading 0, eg. 02
//d > date, eg. 2
//HH > 24 hour clock hour parameter with leading 0, eg. ...T03:05:00 = 03
//H > 24 hour clock hour parameter, eg. ...T03:05:00 = 3
//hh > 12 hour clock hour parameter with leading 0, eg. ...T16:05:00 = 04
//h > 12 hour clock hour parameter, eg. ...T16:05:00 = 4
//mm > minutes with leading 0, eg. ...T16:05:00 = 05
//m > minutes, eg ...T16:05:00 = 5
//t > abbreviated AM / PM, e.g. A or P
//tt > AM / PM, e.g. AM or PM

const formatDate = (date, format = 'dd MMMM yyyy') => {
  if (!date) return null;
  const dateObj = new Date(date);
  const dateString = date.toString().split('T');
  const dateArr = dateString[0].split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const dayNameInt = dateObj.getDay();
  const timeArr = dateString[1].split(':');
  const hour = timeArr[0];
  const minute = timeArr[1];

  //convert to abstract strings to avoid character replacement along the chain, eg. Monday would match 'M' month single parameter
  const YEAR = ['&&', '&'];
  const MONTH = ['££££', '£££', '££', '£'];
  const DAY = ['%%%%', '%%%', '%%', '%'];
  const HOUR24 = ['!!', '!'];
  const HOUR12 = ['^^', '^'];
  const MINUTE = ['**', '*'];
  const TF = ['??', '?'];

  let formattedDate = format
    .replace('yyyy', YEAR[0])
    .replace('yy', YEAR[1])
    .replace('y', '') //'y' && 'yyy' not valid
    .replace('MMMM', MONTH[0])
    .replace('MMM', MONTH[1])
    .replace('MM', MONTH[2])
    .replace('M', MONTH[3])
    .replace('dddd', DAY[0])
    .replace('ddd', DAY[1])
    .replace('dd', DAY[2])
    .replace('d', DAY[3])
    .replace('HH', HOUR24[0])
    .replace('H', HOUR24[1])
    .replace('hh', HOUR12[0])
    .replace('h', HOUR12[1])
    .replace('mm', MINUTE[0])
    .replace('m', MINUTE[1])
    .replace('tt', TF[0])
    .replace('t', TF[1])
    .replace(YEAR[0], year)
    .replace(YEAR[1], year.slice(-2))
    .replace(MONTH[0], monthsLong[parseInt(month, 10)])
    .replace(MONTH[1], monthsShort[parseInt(month, 10)])
    .replace(MONTH[2], month)
    .replace(MONTH[3], parseInt(month, 10))
    .replace(DAY[0], daysLong[dayNameInt])
    .replace(DAY[1], daysShort[dayNameInt])
    .replace(DAY[2], day)
    .replace(DAY[3], parseInt(day, 10))
    .replace(HOUR24[0], hour)
    .replace(HOUR24[1], parseInt(hour, 10))
    .replace(HOUR12[0], parseHour(hour))
    .replace(HOUR12[1], parseInt(parseHour(hour), 10))
    .replace(MINUTE[0], minute)
    .replace(MINUTE[1], parseInt(minute, 10))
    .replace(TF[0], parseTF(hour))
    .replace(TF[1], parseTF(hour).slice(0, -1));

  return formattedDate;
};

const monthsShort = [
  '',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const monthsLong = [
  '',
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const daysLong = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const parseHour = hour => {
  return hour > 12 ? hour - 12 : hour;
};

const parseTF = hour => {
  return hour > 11 ? 'PM' : 'AM';
};

export default formatDate;
