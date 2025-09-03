import { Client } from 'contensis-delivery-api';
import { getClientConfig } from '~/util/ContensisDeliveryApi';
import { LruCache } from '~/util/LruCache';

class CachedTaxonomyLookup {
  cache = new LruCache();
  taxonomyLookup = {};

  getTaxonomyNodeByPath(path, project, env) {
    const client = Client.create(getClientConfig(project, env));
    return this.request(`[TAXONOMY] ${path}`, () =>
      client.taxonomy
        .getNodeByPath({ path: path, order: 'defined', childDepth: 2 })
        .then(node => this.extendTaxonomyNode(node))
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

  extendTaxonomyNode(node) {
    let id = this.getTaxonomyId(node);
    this.taxonomyLookup[id] = node.key;
    return {
      ...node,
      id,
      children: node.children
        ? node.children.map(n => this.extendTaxonomyNode(n))
        : null,
    };
  }

  getTaxonomyId(node) {
    if (node.key) {
      let parts = node.key.split('/');
      return parts[parts.length - 1];
    }
    return '';
  }
}

/** @deprecated Taxonomy is deprecated in Contensis, code remains
 * to support any legacy implementations using Taxonomy in their search */
export const cachedTaxonomyLookup = new CachedTaxonomyLookup();
