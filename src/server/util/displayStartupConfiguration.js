const servers = SERVERS; /* global SERVERS */
const projects = PROJECTS; /* global PROJECTS */
const reverseProxyPaths = REVERSE_PROXY_PATHS; /* global REVERSE_PROXY_PATHS */

const DisplayStartupConfiguration = () => {
  /* eslint-disable no-console */
  console.log();
  console.log(
    `Configured servers:
`,
    JSON.stringify(servers, null, 2)
  );
  console.log();
  console.log(
    `Configured projects:
`,
    JSON.stringify(projects, null, 2)
  );
  console.log();
  console.log(
    'Reverse proxy paths: ',
    JSON.stringify(reverseProxyPaths, null, 2)
  );
  console.log();

  /* eslint-enable no-console */
};

export default DisplayStartupConfiguration;
