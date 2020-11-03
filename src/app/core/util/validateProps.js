export default (componentName, props) => {
  let isValid = true;
  if (process.env.NODE_ENV === 'development') {
    Object.keys(props).map(prop => {
      if (!props[prop]) {
        const msg = `${componentName}: ${prop} not declared`;
        // eslint-disable-next-line no-console
        console.log(
          '%c' + msg,
          'color: #000; background-color: #FFAE42; padding: 10px; border-radius: 5px;'
        );
        isValid = false;
      }
    });
  }
  return isValid;
};
