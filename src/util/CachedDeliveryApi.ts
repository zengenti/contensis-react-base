import { VersionStatus } from 'contensis-core-api';
import { Client, Query } from 'contensis-delivery-api';
import {
  INodeOperations,
  NodeGetRootOptions,
} from 'contensis-delivery-api/lib/models';

import {
  DeliveryApi,
  SSRContext,
  getClientConfig,
} from './ContensisDeliveryApi';
import { LruCache } from './LruCache';
import { CookieObject } from '~/user/util/CookieConstants';

// CachedSearch does not cache results in SSR by design
class CachedSearch {
  cache = new LruCache();
  cookies?: CookieObject;
  ssr?: SSRContext;

  constructor(ssr?: SSRContext) {
    this.ssr = ssr;
    this.cookies = this.ssr?.cookies.raw;
  }

  getClient(...args: Parameters<DeliveryApi['getClient']>) {
    return new DeliveryApi(this.ssr).getClient(...args);
  }

  search(query: Query, linkDepth = 0, project?: string) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(
      `${project}+${JSON.stringify(query)}+${linkDepth}`,
      () => client.entries.search(query, linkDepth)
    );
  }

  searchUsingPost(query: Query, linkDepth = 0, project = '') {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(
      `${project}+${JSON.stringify(query)}+${linkDepth}`,
      () => (client.entries as any).searchUsingPost(query, linkDepth)
    );
  }

  get(
    id: string,
    linkDepth = 0,
    versionStatus: VersionStatus = 'published',
    project?: string,
    fields?: string[]
  ) {
    const client = Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus,
    });
    return this.request(id, () => client.entries.get({ id, linkDepth, fields }));
  }

  getContentType(id: string, project?: string) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(`[CONTENT TYPE] ${id} ${project}`, () =>
      client.contentTypes.get(id)
    );
  }

  getRootNode(
    options: NodeGetRootOptions,
    versionStatus: VersionStatus = 'published',
    project?: string
  ) {
    const client = Client.create({
      ...getClientConfig(project, this.ssr),
      versionStatus,
    });
    return this.request(`${project} / ${JSON.stringify(options)}`, () =>
      client.nodes.getRoot(options)
    );
  }

  getNode(options: Parameters<INodeOperations['get']>[0], project?: string) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(
      `${project} ${
        options && typeof options !== 'string'
          ? 'path' in options
            ? options.path
            : options.id
          : options
      } ${JSON.stringify(options)}`,
      () => client.nodes.get(options)
    );
  }

  getAncestors(
    options: Parameters<INodeOperations['getAncestors']>[0],
    project?: string
  ) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(
      `${project} [A] ${
        (options && typeof options !== 'string' && options.id) || options
      } ${JSON.stringify(options)}`,
      () => client.nodes.getAncestors(options)
    );
  }

  getChildren(
    options: Parameters<INodeOperations['getChildren']>[0],
    project?: string
  ) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(
      `${project} [C] ${
        (options && typeof options !== 'string' && options.id) || options
      } ${JSON.stringify(options)}`,
      () => client.nodes.getChildren(options)
    );
  }

  getSiblings(
    options: Parameters<INodeOperations['getSiblings']>[0],
    project?: string
  ) {
    const client = Client.create(getClientConfig(project, this.ssr));
    return this.request(
      `${project} [S] ${
        (options && typeof options !== 'string' && options.id) || options
      } ${JSON.stringify(options)}`,
      () => client.nodes.getSiblings(options)
    );
  }

  request<T extends () => Promise<any>>(key: string, execute: T) {
    // do not cache results in SSR
    if (!this.cache.get(key) || typeof window == 'undefined') {
      const promise = execute();
      this.cache.set(key, promise);
      promise.catch(() => {
        this.cache.remove(key);
      });
    }
    return this.cache.get(key) as ReturnType<T>;
  }
}

export const cachedSearch = new CachedSearch();
export const cachedSearchWithCookies = (ssr?: SSRContext) =>
  new CachedSearch(ssr);
