/* eslint-disable no-console */
import chalk from 'chalk';

export const unhandledExceptionHandler = (handleExceptions = true) => {
  const exceptionTypes =
    handleExceptions === true
      ? ['uncaughtException', 'unhandledRejection', 'SIGTERM', 'SIGINT'] // Default exception types to add event listeners for
      : Array.isArray(handleExceptions) // In future we could accept an array of specific exception types to handle for a specific application?
      ? handleExceptions
      : [];

  for (const type of exceptionTypes) {
    process.on(type, (err: Error) => {
      if (err && err instanceof Error) {
        // Print a message to inform admins and developers the error should not be ignored
        console.log(
          `${`[contensis-react-base] ❌ ${chalk.red.bold(
            `${type} - ${err.message}`
          )}`}`
        );
        console.log(
          chalk.gray` - you are seeing this because we have tried to prevent the app from completely crashing - you should not ignore this problem`
        );
        // Log the error to server console
        console.error(err);
      }
    });
  }
};
