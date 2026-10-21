/**
 * Map order is the LRU policy: re-insert on read, evict the first key. A linked list
 * kept beside the lookup map could desync from it, and removals then crashed.
 */
export class LruCache {
  constructor(limit = 100) {
    this.map = new Map();
    this.limit = limit > 0 ? limit : 100;
  }

  get size() {
    return this.map.size;
  }

  get(key) {
    if (!this.map.has(key)) {
      return undefined;
    }

    const value = this.map.get(key);
    // Re-inserting moves the entry to the end, which is the most-recently-used slot.
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key, value) {
    this.map.delete(key);
    this.map.set(key, value);

    if (this.map.size > this.limit) {
      this.remove(this.map.keys().next().value);
    }
  }

  remove(key) {
    this.map.delete(key);
  }
}
