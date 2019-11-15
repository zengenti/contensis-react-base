const DisplayStartupConfiguration = (servers, projects, reverseProxyPaths) => {
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
