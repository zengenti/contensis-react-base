/**
 * Arguably deprecated functionality driven by a version.json file
 * injected into the container from the CI build process.
 * This is used to provide version information for the application
 * such as the commit id and the build number.
 * @param staticFolderPath if the app is not built into the `dist/static` folder, we can provide a different path to the static folder.
 * @returns version.json as a JSON object, or an empty object if the file cannot be read.
 */
export declare const getVersionInfo: (staticFolderPath: string) => any;
