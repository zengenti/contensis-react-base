const pickEnv = (hostname, query) => {
  let currentEnv = hostname.includes('-dev.') ? 'dev' : 'live';

  if (hostname == 'localhost' && query.e) {
    currentEnv = query.e;
  }

  return currentEnv;
};

export default pickEnv;
