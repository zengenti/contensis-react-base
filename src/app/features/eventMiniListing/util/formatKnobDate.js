const formatKnobDate = date => {
  const rawDate = new Date(date);

  function parseMonth(month) {
    month++;
    if (month < 10) {
      return `0${month}`;
    }
    return month;
  }

  function parseDate(date) {
    if (date < 10) {
      return `0${date}`;
    }
    return date;
  }

  const formattedDate = `${rawDate.getFullYear()}-${parseMonth(
    rawDate.getMonth()
  )}-${parseDate(rawDate.getDate())}T${intWithPreceedingZero(
    rawDate.getHours()
  )}:${intWithPreceedingZero(rawDate.getMinutes())}:00`;

  return formattedDate;
};

const intWithPreceedingZero = x => {
  return x < 10 ? `0${x}` : x.toString();
};

export default formatKnobDate;
