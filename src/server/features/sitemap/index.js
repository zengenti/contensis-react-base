import generateSiteMap from './siteMapGenerator';

const sitemap = app => {
  // generates and returns a site-map, also updates the sitemap in dist/static/sitemap.xml
  // possibly recommend robots.txt has link to dist/static/sitemap.xml
  // and another process routinely calls this endpoint to refresh sitemap?
  app.get('/sitemap1.xml', (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/xml',
      'Surrogate-Control': 'max-age=3600',
    });
    generateSiteMap(res).catch(e =>
      res.status(500).send(`Error occurred: ${e.stack}`)
    );
  });
};

export default sitemap;
