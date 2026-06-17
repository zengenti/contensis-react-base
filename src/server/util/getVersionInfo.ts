import fs from 'fs';

/**
 * Arguably deprecated functionality driven by a version.json file
 * injected into the container from the CI build process.
 * This is used to provide version information for the application
 * such as the commit id and the build number.
 * @param staticFolderPath if the app is not built into the `dist/static` folder, we can provide a different path to the static folder.
 * @returns version.json as a JSON object, or an empty object if the file cannot be read.
 */
export const getVersionInfo = (staticFolderPath: string) => {
  try {
    const versionData = fs.readFileSync(
      `dist/${staticFolderPath}/version.json`,
      'utf8'
    );
    const versionInfo = JSON.parse(versionData);
    return versionInfo;
  } catch (ex) {
    // We don't need to log this error as it is just noise in the logs
    // when the version.json file is not constructed and injected into 
    // the build container or a development stub included in the project.
    // console.error(`Unable to read from "version.json"`, ex);
    return {};
  }
};
