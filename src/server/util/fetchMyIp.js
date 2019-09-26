const fetchMyIp = (env, configureLocalEndpoint) => {
  /* eslint-disable no-console */
  fetch('https://api.ipify.org?format=json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(
      response => {
        return response.json();
      },
      error => {
        console.log(
          `Could not work out where I am so defaulting to local DNS, as I am probably running as a container this is what matters most. Not developers at home or tests :( Sorry. error: ${error}`
        );
        configureLocalEndpoint();
      }
    )
    .then(ipJson => {
      console.log(`Current public ip -> ${JSON.stringify(ipJson)}`);
      if (ipJson.ip.startsWith('185.18.13')) {
        console.log(
          `Using local endpoint for ${env.alias} -> ${env.internalVip}`
        );
        configureLocalEndpoint();
      } else {
        console.log(`Outside Zengenti network, use real DNS.`);
      }
    })
    .catch(error => {
      configureLocalEndpoint();
      console.log(
        `Could not work out where I am so defaulting to local DNS, as I am probably running as a container this is what matters most. Not developers at home or tests :( Sorry. error: ${error}`
      );
    });
  /* eslint-enable no-console */
};

export default fetchMyIp;
