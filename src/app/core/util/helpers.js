export function action(type, payload = {}) {
  return { type, ...payload };
}

export const getWebPImageUri = uri => {
  let formatedUri = uri;
  if (uri.indexOf('.gif') == -1) {
    if (uri.indexOf('f=') == -1 && uri.indexOf('format=') == -1) {
      if (uri.indexOf('?') > -1) {
        formatedUri = `${uri}&f=webp`;
      } else {
        formatedUri = `${uri}?f=webp`;
      }
    }
    if (
      formatedUri.indexOf('q=') == -1 &&
      formatedUri.indexOf('quality=') == -1
    ) {
      if (formatedUri.indexOf('?') > -1) {
        formatedUri = `${formatedUri}&q=70`;
      } else {
        formatedUri = `${formatedUri}?q=70`;
      }
    }
  }
  return formatedUri;
};

export const resizeImage = (image, height, width) => {
  if (image.asset && image.asset.sys && image.asset.sys.uri) {
    image.asset.sys.uri = resizeImageUri(image.asset.sys.uri, height, width);
  }
};
export const resizeImageUri = (uri, height, width) => {
  let formatedUri = uri;
  let paramDelimeter = '?';
  if (uri.indexOf('?') > -1) {
    paramDelimeter = '&';
  }
  if (width) {
    if (
      formatedUri.indexOf('w=') == -1 &&
      formatedUri.indexOf('width=') == -1
    ) {
      formatedUri = `${formatedUri}${paramDelimeter}w=${width}`;
      paramDelimeter = '&';
    }
  }
  if (height) {
    if (
      formatedUri.indexOf('h=') == -1 &&
      formatedUri.indexOf('height=') == -1
    ) {
      formatedUri = `${formatedUri}${paramDelimeter}h=${height}`;
    }
  }

  return formatedUri;
};

export function flattenArray(arr) {
  // flatten arrays inside the supplied array and
  // remove duplicates from the result
  return arr
    .reduce((acc, val) => acc.concat(val), [])
    .filter((elem, pos, arr) => arr.indexOf(elem) == pos);
}

export async function api(url, options) {
  return fetch(url, options)
    .then(async response => {
      setTimeout(() => null, 0);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json().then(data => data);
    })
    .catch(error => {
      //console.log(error);
      throw error;
    });
}

export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === '-') {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function(a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export const randomString = length => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const findContentTypeMapping = (ContentTypeMappings, contentTypeId) =>
  ContentTypeMappings.find(ct => ct.contentTypeID === contentTypeId);
