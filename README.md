# Zengenti Base Project :boom:

## Key scripts :vertical_traffic_light: :page_with_curl:

- `npm install` - install dependencies so we can use the application
- `npm start` - start the application in development mode
- `npm run storybook` - start storybook in development mode
- `npm run build` - build the application into production-ready client and server-side bundles
- `npm run server` - start the application server same as we would as if it were deployed in production
- `npm run build && npm run dev:server` - build the application and start the server-side application from source code (allowing us to connect a debugger and stop on code that is executed server-side)

There is also a README in the webpack folder that goes into detail using multiple environments for a project and setting variables as part of launching the application.

## Branches

### feature-featureName :exclamation:

We are using feature branches on this project, if you are developing a new feature please create a new branch with the following naming convention `feature-featureName` this will clearly indicate that it is a feature branch. You should work on your feature branch until you are happy it passes tests and can be reviewed, your branch can then be merged into develop.

### Develop :bug:

This is the development branch, it can be viewed by the client but they understand that it is under development and they may see some unusual things. The reasons for this branch are as follows:

- A location to see prototypes that are functionality only
- Peer reviews

### Staging :question:

Staging branch is used for reviwing features that are ready to be merged into master

### Master :zap:

This branch is the master branch, it shoould only contain code that is ready to be released.

## Jira Integration

If your commit message contains a Jira task ID gitlab will automatically add a comment to the Jira task, you can also add the following to your commit messages:

- `Resolves PSBP-1`
- `Closes PSBP-1`
- `Fixes PSBP-1`
