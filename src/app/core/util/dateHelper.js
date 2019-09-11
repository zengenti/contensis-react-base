export const getThisMonthStartDateAsISOString = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  return new Date(currentYear, currentMonth, 1).toISOString().splice(0, 10);
};

export const geReadableDateFromISODateStringArray = dateStringArray => {
  let readable = '';
  if (dateStringArray.length) {
    readable = new Date(dateStringArray[0].startDateTime).toLocaleDateString(
      'en-GB'
    );
    if (dateStringArray.length > 1) {
      readable = `${readable} - ${new Date(
        dateStringArray[dateStringArray.length - 1].startDateTime
      ).toLocaleDateString('en-GB')}`;
    }
  }
  return readable;
};
const defaultLocale = 'en-GB';
//this converts date to a human readable day (8) month (Jul) year (2019)
//e.g. Jul 12, 2019
//2 arguments: (inputDate, options)
//options include locale and all options for Date.toLocaleDateString (see MDN)
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
//e.g. const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
export const getHumanReadableDate = (
  inputDate,
  { locale = defaultLocale, ...options } = { local: defaultLocale }
) =>
  new Date(inputDate).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  });
export const formatDateToParts = (date, options = {}) => {
  //Intl.DateTimeFormat may need a polyfill for IE. see:
  //https://github.com/tc39/proposal-intl-formatToParts
  //alternatively, use toLocaleDateString as above and write custom parsing function
  const formatter = new Intl.DateTimeFormat(
    options.locale || defaultLocale,
    options
  );

  const formattedArray = formatter.formatToParts(new Date(date));
  const typesSelected = Object.keys(options);
  //console.info('formatted', formattedArray, 'types', typesSelected);
  return (
    formattedArray
      .filter(({ type }) => typesSelected.indexOf(type) >= 0)
      //for example
      //[{'aKey': 'aValue'}, {'bKey': 'bValue' }] -> { aKey: aValue, bKey: bValue }
      //.reduce((acc, { type, value }) => ({ ...acc, ...{ [type]: value } }), {})
      //more readable version:
      .reduce((accumulatedObject, { type, value }) => {
        //type could be day, month etc.
        //value is the day of the month, month of the year etc.
        const nextObjectToAccumulate = { [type]: value };
        return { ...accumulatedObject, ...nextObjectToAccumulate };
      }, {})
  );
};
export const getSocialFeedDateTime = timestamp => {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };
  //console.log('hrd', getHumanReadableDate(timestamp, options));
  const { hour, minute, dayPeriod, day, month, year } = formatDateToParts(
    timestamp,
    {
      ...options,
      dayPeriod: true,
    }
  );
  return `${hour}:${minute} ${dayPeriod.toUpperCase()} - ${day} ${month} ${year}`;
};

export const getEventTime = timestamp => {
  const options = {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  //console.log('hrd', getHumanReadableDate(timestamp, options));
  const { hour, minute, dayPeriod } = formatDateToParts(timestamp, {
    ...options,
    dayPeriod: true,
  });
  return `${hour}:${minute} ${dayPeriod.toUpperCase()}`;
};
