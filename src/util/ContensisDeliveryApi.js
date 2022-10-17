import { Client } from 'contensis-delivery-api';
import { parse } from 'query-string';
import { setSurrogateKeys } from '../routing/redux/actions';
import { reduxStore } from '~/redux/store/store';

const storeSurrogateKeys = response => {
  const keys = response.headers.get
    ? response.headers.get('surrogate-key')
    : response.headers.map['surrogate-key'];
  if (keys) reduxStore?.dispatch(setSurrogateKeys(keys, response.url));
};

const getClientConfig = project => {
  let config = DELIVERY_API_CONFIG; /* global DELIVERY_API_CONFIG */
  config.responseHandler = {};

  if (project) {
    config.projectId = project;
  }

  // we only want the surrogate key header in a server context
  if (typeof window === 'undefined') {
    config.defaultHeaders = {
      'x-require-surrogate-key': true,
    };
    config.responseHandler[200] = storeSurrogateKeys;
  }

  if (
    typeof window !== 'undefined' &&
    PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */
  ) {
    // ensure a relative url is used to bypass the need for CORS (separate OPTIONS calls)
    config.rootUrl = '';
    config.responseHandler[404] = () => null;
  }
  return config;
};

export * from 'contensis-delivery-api';

class DeliveryApi {
  getClientSideVersionStatus = () => {
    if (typeof window !== 'undefined') {
      // Allow overriding versionStatus with the querystring
      const { versionStatus } = parse(window.location.search);
      if (versionStatus) return versionStatus;
      // Client-side we will have a global variable set if rendered by SSR in production
      if (typeof window.versionStatus !== 'undefined')
        return window.versionStatus;
      // For localhost development we can only work out versionStatus from the current hostname
      const currentHostname = window.location.hostname;
      return this.getVersionStatusFromHostname(currentHostname);
    }
    return null;
  };
  getServerSideVersionStatus = request =>
    request.query.versionStatus ||
    deliveryApi.getVersionStatusFromHeaders(request.headers) ||
    deliveryApi.getVersionStatusFromHostname(request.hostname);
  getVersionStatusFromHeaders = headers => {
    const versionStatusHeader = headers['x-entry-versionstatus'];
    if (typeof versionStatusHeader !== 'undefined') return versionStatusHeader;
    return null;
  };
  getVersionStatusFromHostname = currentHostname => {
    if (currentHostname.indexOf('localhost') > -1) return 'latest';

    if (currentHostname.endsWith('contensis.cloud')) {
      if (currentHostname.indexOf('preview.') > -1) {
        return 'latest';
      } else {
        return 'published';
      }
    }

    if (currentHostname.endsWith('cloud.contensis.com')) {
      if (currentHostname.indexOf('preview-') > -1) {
        return 'latest';
      } else {
        return 'published';
      }
    }

    return 'published';
  };
  search = (query, linkDepth, project, env) => {
    const client = Client.create(getClientConfig(project, env));
    return client.entries.search(
      query,
      typeof linkDepth !== 'undefined' ? linkDepth : 1
    );
  };
  getClient = (deliveryApiStatus = 'published', project, env) => {
    const baseConfig = getClientConfig(project, env);
    baseConfig.versionStatus = deliveryApiStatus;
    return Client.create(baseConfig);
  };
  getEntry = (
    id,
    linkDepth = 0,
    deliveryApiStatus = 'published',
    project,
    env
  ) => {
    const baseConfig = getClientConfig(project, env);
    baseConfig.versionStatus = deliveryApiStatus;
    const client = Client.create(baseConfig);
    // return client.entries.get(id, linkDepth);
    return client.entries.get({ id, linkDepth });
  };
}

export const deliveryApi = new DeliveryApi();

class CacheNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class LruCache {
  constructor(limit = 100) {
    this.map = {};
    this.head = null;
    this.tail = null;
    this.limit = limit || 100;
    this.size = 0;
  }

  get(key) {
    if (this.map[key]) {
      let value = this.map[key].value;
      let node = new CacheNode(key, value);
      this.remove(key);
      this.setHead(node);
      return value;
    }
  }

  set(key, value) {
    let node = new CacheNode(key, value);
    if (this.map[key]) {
      this.remove(key);
    } else {
      if (this.size >= this.limit) {
        delete this.map[this.tail.key];
        this.size--;
        this.tail = this.tail.prev;
        this.tail.next = null;
      }
    }
    this.setHead(node);
  }

  setHead(node) {
    node.next = this.head;
    node.prev = null;
    if (this.head) {
      this.head.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    this.size++;
    this.map[node.key] = node;
  }

  remove(key) {
    let node = this.map[key];
    if (!node) return; // This is sometimes null and crashes the container without this check

    if (node.prev) {
      node.prev.next = node.next;
    } else {
      this.head = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    } else {
      this.tail = node.prev;
    }
    delete this.map[key];
    this.size--;
  }
}

class CachedSearch {
  cache = new LruCache();
  taxonomyLookup = {};

  search(query, linkDepth, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(
      project + JSON.stringify(query) + linkDepth.toString(),
      () => client.entries.search(query, linkDepth)
    );
  }

  searchUsingPost(query, linkDepth = 0, project = '', env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(
      project + JSON.stringify(query) + linkDepth.toString(),
      () => client.entries.searchUsingPost(query, linkDepth)
    );
  }

  get(id, linkDepth, versionStatus, project, env) {
    const client = Client.create(getClientConfig(project, env));
    client.clientConfig.versionStatus = versionStatus;
    return this.request(id, () => client.entries.get({ id, linkDepth }));
  }

  getContentType(id, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () =>
      client.contentTypes.get(id)
    );
  }

  getTaxonomyNode(key, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`[TAXONOMY NODE] ${key}`, () =>
      client.taxonomy
        .resolveChildren(key)
        .then(node => this.extendTaxonomyNode(node))
    );
  }

  getRootNode(options, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`${project} / ${JSON.stringify(options)}`, () =>
      client.nodes.getRoot(options)
    );
  }

  getNode(options, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(
      `${project} ${(options && options.path) || options} ${JSON.stringify(
        options
      )}`,
      () => client.nodes.get(options)
    );
  }

  getAncestors(options, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(
      `${project} [A] ${(options && options.id) || options} ${JSON.stringify(
        options
      )}`,
      () => client.nodes.getAncestors(options)
    );
  }

  getChildren(options, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(
      `${project} [C] ${(options && options.id) || options} ${JSON.stringify(
        options
      )}`,
      () => client.nodes.getChildren(options)
    );
  }

  getSiblings(options, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(
      `${project} [S] ${(options && options.id) || options} ${JSON.stringify(
        options
      )}`,
      () => client.nodes.getSiblings(options)
    );
  }

  request(key, execute) {
    if (!this.cache.get(key) || typeof window == 'undefined') {
      let promise = execute();
      this.cache.set(key, promise);
      promise.catch(() => {
        this.cache.remove(key);
      });
    }
    return this.cache.get(key);
  }
}

export const cachedSearch = new CachedSearch();
