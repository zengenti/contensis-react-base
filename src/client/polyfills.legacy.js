export default function loadPolyfills() {
  const fillFetch = () =>
    new Promise(resolve => {
      if ('fetch' in window) return resolve();

      require.ensure(
        [],
        () => {
          require('whatwg-fetch');

          resolve();
        },
        'fetch'
      );
    });

  const fillCoreJs = () =>
    new Promise(resolve => {
      if (
        'startsWith' in String.prototype &&
        'endsWith' in String.prototype &&
        'includes' in Array.prototype &&
        'assign' in Object &&
        'keys' in Object
      )
        return resolve();

      require.ensure(
        [],
        () => {
          require('core-js');

          resolve();
        },
        'core-js'
      );
    });

  return Promise.all([fillFetch(), fillCoreJs()]);
}
