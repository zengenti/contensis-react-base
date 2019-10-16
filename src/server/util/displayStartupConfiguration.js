const DisplayStartupConfiguration = () => {
  /* eslint-disable no-console */
  console.log();
  console.log(
    `Configured servers:
`,
    JSON.stringify(SERVERS /* global SERVERS */, null, 2)
  );
  console.log();
  console.log(
    `Configured projects:
`,
    JSON.stringify(PROJECTS /* global PROJECTS */, null, 2)
  );
  console.log();
  /* eslint-enable no-console */
};

export default DisplayStartupConfiguration;
