import sitemap from './sitemap';
import solentSitemap from './solentSitemap';

// Import and load any server-side features here
// We have an instance of the express app available to configure
const configureFeatures = app => {
  sitemap(app);
  solentSitemap(app);
};

export default configureFeatures;
