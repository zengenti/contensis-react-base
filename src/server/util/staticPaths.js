export const replaceStaticPath = (string, staticFolderPath = 'static') =>
  string.replace(/static\//g, `${staticFolderPath}/`);
