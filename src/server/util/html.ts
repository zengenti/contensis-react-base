import minifyCssString from 'minify-css-string';

/**
 * Add assets to templateHTML in the positions represented
 * by replacing specific keys wrapped in handlebars depending
 * on the accessMethod(s) that have been set (or updated)
 * while processing the request
 */
export const replaceHtml = (
  {
    bundleTags = '',
    html = '',
    htmlAttributes = '',
    metadata = '',
    state = '',
    styleTags = '',
    title = '',
    templateHTML = '',
    templateHTMLFragment = '',
    templateHTMLStatic = '',
  },
  accessMethod: {
    DYNAMIC: boolean;
    REDUX: boolean;
    FRAGMENT: boolean;
    STATIC: boolean;
  }
) => {
  let responseHTML = '';
  // Serve a blank HTML page with client scripts to load the app in the browser
  if (accessMethod.DYNAMIC) {
    responseHTML = templateHTML
      .replace('{{TITLE}}', '')
      .replace('{{SEO_CRITICAL_METADATA}}', '')
      .replace('{{CRITICAL_CSS}}', '')
      .replace('{{APP}}', '')
      // .replace('{{LOADABLE_CHUNKS}}', bundleTags)
      .replace('{{REDUX_DATA}}', state);
  }

  // Page fragment served with client scripts and redux data that hydrate the app client side
  else if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
    responseHTML = templateHTMLFragment
      .replace('{{TITLE}}', title)
      .replace('{{SEO_CRITICAL_METADATA}}', metadata)
      .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
      //.replace('{{APP}}', html)
      // .replace('{{LOADABLE_CHUNKS}}', bundleTags)
      .replace('{{REDUX_DATA}}', state);
  }

  // Full HTML page served statically
  else if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
    responseHTML = templateHTMLStatic
      .replace('{{TITLE}}', title)
      .replace('{{SEO_CRITICAL_METADATA}}', metadata)
      .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
      //.replace('{{APP}}', html)
      .replace('{{LOADABLE_CHUNKS}}', '');
  }

  // Full HTML page served with client scripts and redux data that hydrate the app client side
  else if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
    responseHTML = templateHTML
      .replace('{{TITLE}}', title)
      .replace('{{SEO_CRITICAL_METADATA}}', metadata)
      .replace('{{CRITICAL_CSS}}', styleTags)
      //.replace('{{APP}}', html)
      // .replace('{{LOADABLE_CHUNKS}}', bundleTags)
      .replace('{{REDUX_DATA}}', state);
  }

  // If react-helmet htmlAttributes are being used,
  // replace the html tag with those attributes sepcified
  // e.g. (lang, dir etc.)
  if (htmlAttributes) {
    responseHTML = responseHTML.replace(
      /<html?.+?>/,
      `<html ${htmlAttributes}>`
    );
  }
  responseHTML = html ? responseHTML.replace('{{APP}}', html) : responseHTML;

  // Only replace bundle tags at the very end when we have rendered and are
  // streaming out the HTML "footer"
  if (bundleTags)
    responseHTML = responseHTML.replace('{{LOADABLE_CHUNKS}}', bundleTags);

  return responseHTML;
};
