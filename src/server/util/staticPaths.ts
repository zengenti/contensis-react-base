export const replaceStaticPath = (str: string, staticFolderPath = 'static') =>
  str.replace(/static\//g, `${staticFolderPath}/`);
