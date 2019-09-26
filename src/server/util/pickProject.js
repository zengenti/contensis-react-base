const servers = SERVERS; /* global SERVERS */
const aliases = [servers.alias]; //Object.entries(servers).map(([, value]) => value.alias);
const publicUri = PUBLIC_URI; /* global PUBLIC_URI */
const projects = PROJECTS; /* global PROJECTS */

// return a projectId via the request hostname
const pickProject = (hostname, query) => {
  // if localhost we can only infer via a querystring, and take your word for it
  if (hostname == 'localhost') {
    return (query && query.p) || projects[0].id;
  }

  // if hostname is the actual public uri we can return the first project from the list
  if (hostname == publicUri) {
    return projects[0].id;
  }

  let project = 'unknown';

  // go through all the defined projects
  projects.forEach(p => {
    // check if we're accessing via the project's public uri
    if (hostname.includes(p.publicUri)) project = p.id;

    // go through all the defined cms aliases (e.g. live/dev)
    aliases.forEach(a => {
      // the url structure is different for website (we don't prefix)
      if (p.id == 'website') {
        // check for internal and external hostnames
        // we check live and preview distinctly so our rule does not clash with
        // hostnames that use a project prefix
        if (
          hostname.includes(`live-${a}.cloud.contensis.com`) ||
          hostname.includes(`live.${a}.contensis.cloud`) ||
          hostname.includes(`preview-${a}.cloud.contensis.com`) ||
          hostname.includes(`preview.${a}.contensis.cloud`)
        )
          project = p.id;
      } else {
        // check for internal and external hostnames, prefixed with the projectId
        if (
          hostname.includes(`${p.id}-${a}.cloud.contensis.com`) ||
          hostname.includes(`${p.id}.${a}.contensis.cloud`)
        )
          project = p.id;
      }
    });
  });
  return project;
};

export const allowedGroups = project => {
  if (project == 'staff') return [101, 2];
  if (project == 'students') return [1];
};

export default pickProject;
