import minifyCssString from 'minify-css-string';

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
  // Page fragment served with client scripts and redux data that hydrate the app client side
  if (accessMethod.FRAGMENT && !accessMethod.STATIC) {
    responseHTML = templateHTMLFragment
      .replace('{{TITLE}}', title)
      .replace('{{SEO_CRITICAL_METADATA}}', metadata)
      .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
      //.replace('{{APP}}', html)
      .replace('{{LOADABLE_CHUNKS}}', bundleTags)
      .replace('{{REDUX_DATA}}', state);
  }

  // Full HTML page served statically
  if (!accessMethod.FRAGMENT && accessMethod.STATIC) {
    responseHTML = templateHTMLStatic
      .replace('{{TITLE}}', title)
      .replace('{{SEO_CRITICAL_METADATA}}', metadata)
      .replace('{{CRITICAL_CSS}}', minifyCssString(styleTags))
      //.replace('{{APP}}', html)
      .replace('{{LOADABLE_CHUNKS}}', '');
  }

  // Full HTML page served with client scripts and redux data that hydrate the app client side
  if (!accessMethod.FRAGMENT && !accessMethod.STATIC) {
    responseHTML = templateHTML
      .replace('{{TITLE}}', title)
      .replace('{{SEO_CRITICAL_METADATA}}', metadata)
      .replace('{{CRITICAL_CSS}}', styleTags)
      //.replace('{{APP}}', html)
      .replace('{{LOADABLE_CHUNKS}}', bundleTags)
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
  return html ? responseHTML.replace('{{APP}}', html) : responseHTML;
};
