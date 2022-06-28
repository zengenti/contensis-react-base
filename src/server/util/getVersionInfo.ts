import fs from 'fs';

export const getVersionInfo = (staticFolderPath: string) => {
  try {
    const versionData = fs.readFileSync(
      `dist/${staticFolderPath}/version.json`,
      'utf8'
    );
    const versionInfo = JSON.parse(versionData);
    return versionInfo;
  } catch (ex) {
    console.error(`Unable to read from "version.json"`, ex);
    return {};
  }
};
