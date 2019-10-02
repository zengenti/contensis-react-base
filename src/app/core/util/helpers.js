export default class ProjectHelper {
  static currencyFormat(val) {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    });
    return formatter.format(val);
  }

  static showChildren(e) {
    e.preventDefault;

    let children = document.getElementById(e);
    if (children.style.display == 'block') {
      children.style.display = 'none';
    } else {
      children.style.display = 'block';
    }
  }

  static camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  static ltrim(stringToTrim) {
    return stringToTrim.replace(/^\s+/, '');
  }

  static trim(s, c = ' ') {
    if (c === ']') c = '\\]';
    if (c === '\\') c = '\\\\';
    return s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
  }

  static ArrayToSentence(arr, connector = 'and') {
    return arr.length > 1
      ? arr.slice(0, -1).join(', ') + ' ' + connector + ' ' + arr.slice(-1)
      : arr.toString();
  }

  static GetComposerContent(composer, fieldName) {
    if (composer) {
      let composerField = composer
        .filter(c => c.type === fieldName)
        .map(c => {
          return c.value;
        });
      return composerField;
    }
    return null;
  }

  static dedupeUriSlashes(uri) {
    const work = uri.replace('//', '~~'); // replace first instance of double slash with tildes to switch out again for slashes later
    const uriParts = work.split('/').filter(part => part); // split the working url into parts and filter any null parts
    return uriParts.join('/').replace('~~', '//');
  }

  static dedupeArray(arr) {
    // remove duplicates from simple array
    return arr.filter((elem, pos, arr) => arr.indexOf(elem) == pos);
  }

  static stringToArray(s, seperator = ',') {
    return typeof s === 'string'
      ? s.split(seperator).map(item => ProjectHelper.trim(item))
      : s;
  }

  static composedFieldToObject(composer) {
    // convert array of [ { type: 'type', value: composerItem } ]
    // to plain object of { type: composerItem }
    const object = {};
    composer.forEach(
      cfi =>
        (object[cfi.type] = ProjectHelper.getComposerContent(
          cfi.type,
          composer
        ))
    );
    return object;
  }

  static getComposerContent(type, composer) {
    const component = composer.find(c => c.type === type);
    return component && component.value;
  }

  static getFileSize(fileSize) {
    const kb = Math.ceil(fileSize * 0.0009765625);
    const mb =
      Math.round(
        parseFloat((fileSize * 0.00000095367432 * Math.pow(10, 2)).toFixed(2))
      ) / Math.pow(10, 2);

    if (kb < 1000) {
      return kb + 'KB';
    }
    return mb + 'MB';
  }

  static getFileExtension(uri) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(uri)[1];

    if (ext) {
      return ext.toUpperCase();
    }
    return '';
  }
  static renderImageAsWebP(imageUrl) {
    //Set new url to current url by default
    let newImageUrl = imageUrl;
    //First check if image has has webp referenced in url
    if (imageUrl && !imageUrl.includes('webp')) {
      //Check if image already has transformations
      if (!imageUrl.includes('?')) {
        //If not load image as webp
        newImageUrl = imageUrl + '?f=webp';
      } else {
        //Otherwise append webp format to existing transformations
        newImageUrl = imageUrl + '&f=webp';
      }
    }
    return newImageUrl;
  }

  static decodeEntities(encodedString) {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: ' ',
      amp: '&',
      quot: '"',
      lt: '<',
      gt: '>',
    };
    return encodedString
      .replace(translate_re, function(match, entity) {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, function(match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  }

  static keyPress(event, action) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      action;
    }
  }

  static GroupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });
    return map;
  }
}
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
