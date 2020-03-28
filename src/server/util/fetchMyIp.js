const fetchMyIp = async (env, configureLocalEndpoint) => {
  /* eslint-disable no-console */
  try {
    const response = await fetch('https://api.ipify.org?format=json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const ipJson = await response.json();
    console.log(`Current public ip -> ${JSON.stringify(ipJson)}`);
    if (ipJson.ip.startsWith('185.18.13')) {
      console.log(
        `Using local endpoint for ${env.alias} -> ${env.internalVip}`
      );
      configureLocalEndpoint();
    } else {
      console.log(`Outside Zengenti network, use real DNS.`);
    }
  } catch (error) {
    console.log(
      `Could not work out where I am so defaulting to local DNS, as I am probably running as a container this is what matters most. Not developers at home or tests :( Sorry. error: ${error}`
    );
    configureLocalEndpoint();
  }

  /* eslint-enable no-console */
};

export default fetchMyIp;
