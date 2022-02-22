import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';

/**
 *
 * @param { appRootPath: string; maxage: number; staticFolderPath: string, startupScriptFilename: string } args
 * @returns Response | next()
 * A middleware function to resolve /dist/static/startup.js under a supplied startupScriptFilename variable
 */
export const resolveStartupMiddleware =
  ({
    appRootPath,
    maxage,
    staticFolderPath,
    startupScriptFilename,
  }: {
    appRootPath: string;
    maxage: string;
    staticFolderPath: string;
    startupScriptFilename: string;
  }): RequestHandler =>
  async (req, res, next) => {
    if (
      startupScriptFilename !== 'startup.js' &&
      req.path === `/${startupScriptFilename}`
    ) {
      let startupFileLocation = '';
      try {
        const startupFilePaths = [
          `dist/static/startup.js`,
          `dist/${staticFolderPath}/startup.js`,
        ];
        let startupFilePath = '';
        startupFilePaths.forEach(async testPath => {
          try {
            fs.accessSync(testPath);
            startupFilePath = testPath;
          } catch (ex) {
            // Do nothing
          }
        });
        startupFileLocation = path.resolve(appRootPath, startupFilePath);

        if (maxage) res.set('Cache-Control', `public, max-age=${maxage}`);

        res.sendFile(startupFileLocation);
      } catch (sendFileError) {
        // eslint-disable-next-line no-console
        console.log(
          `Unable to send file startup.js at '${startupFileLocation}'`,
          sendFileError
        );
        next();
      }
    } else {
      next();
    }
  };
