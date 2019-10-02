const servers = SERVERS; /* global SERVERS */
const alias = servers.alias;
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

    // the url structure is different for website (we don't prefix)
    if (p.id == 'website') {
      // check for internal and external hostnames
      // we check live and preview distinctly so our rule does not clash with
      // hostnames that use a project prefix
      if (
        hostname.includes(`live-${alias}.cloud.contensis.com`) ||
        hostname.includes(`live.${alias}.contensis.cloud`) ||
        hostname.includes(`preview-${alias}.cloud.contensis.com`) ||
        hostname.includes(`preview.${alias}.contensis.cloud`)
      )
        project = p.id;
    } else {
      // check for internal and external hostnames, prefixed with the projectId
      if (
        hostname.includes(`${p.id}-${alias}.cloud.contensis.com`) ||
        hostname.includes(`${p.id}.${alias}.contensis.cloud`)
      )
        project = p.id;
    }
  });
  return project;
};

export const allowedGroups = project => {
  return ALLOWED_GROUPS[project] /* global ALLOWED_GROUPS */;
};

export default pickProject;
