export default (attributes = {}) =>
  Object.entries(attributes)
    .map(
      ([key, value], idx) =>
        `${idx !== 0 ? ' ' : ''}${key}${value ? `="${value}"` : ''}`
    )
    .join(' ');
