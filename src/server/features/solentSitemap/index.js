import generateSitemap from './sitemap';
import pickProject from '../../util/pickProject';

const sitemap = app => {
  app.get('/sitemap.xml', (req, res) => {
    const project = pickProject(req.hostname, req.query);
    generateSitemap(project)
      .then(sitemap => {
        res.writeHead(200, {
          'Content-Type': 'application/xml',
          'Surrogate-Control': 'max-age=3600',
        });
        res.write(sitemap.toString());
        res.end();
      })
      .catch(error =>
        res
          .status(500)
          .send(`Error occurred generating sitemap -- ${error.toString()}`)
      );
  });
};

export default sitemap;
