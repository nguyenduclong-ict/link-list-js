class LinkNode {
  /**
   * @type {LinkNode}
   */
  prev;
  /**
   * @type {LinkNode}
   */
  next;
  constructor(id, data, prev, next) {
    this.id = id;
    this.data = data;
    this.prev = prev;
    this.next = next;
  }
}

class LinkList {
  /**
   * @type {LinkNode}
   */
  #head;
  /**
   * @type {LinkNode}
   */
  #tail;
  /**
   * @type {Map<any, LinkNode>}
   */
  #nodes = new Map();

  #idKey = "";
  #parentKey = "";

  constructor(data, idKey = "id", parentKey = "parent_id") {
    this.#idKey = idKey;
    this.#parentKey = parentKey;
    if (Array.isArray(data)) {
      data.forEach((item) => this.add(item));
    }
  }

  /**
   * Add data to LinkList
   * @param {*} data
   * @returns {boolean}
   */
  add(data) {
    if (!data) return false;
    const id = data[this.#idKey];
    const parentId = data[this.#parentKey];
    const node = this.#nodes.get(id) || new LinkNode(id, data);
    node.data = data;

    if (parentId) {
      let parent = this.#nodes.get(parentId);
      if (!parent) {
        parent = new LinkNode(parentId, undefined, undefined, node);
        node.prev = parent;
        this.#nodes.set(parentId, parent);
      }
      node.prev = parent;
      parent.next = node;
    }

    this.#nodes.set(id, node);

    if (!this.#head || !node.prev || this.#head.prev === node) {
      this.#head = node;
    }
    if (!this.#tail || !node.next || this.#tail.next === node) {
      this.#tail = node;
    }
    return true;
  }

  /**
   * Delete item by Id
   * @param {*} id
   * @param {boolean} join auto remap linklist
   */
  delete(id, update = true) {
    const node = this.#nodes.get(id);
    if (!node) return false;
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }
    if (update) {
      if (node.prev && node.prev.data && node.next) {
        node.prev.data[this.#idKey] = node.next.id;
      }
      if (node.next && node.next.data && node.prev) {
        node.next.data[this.#parentKey] = node.prev.id;
      }
    }
    this.#nodes.delete(id);
    return true;
  }

  /**
   * Update data in LinkList
   * @param {*} data
   */
  update(data) {
    if (!data) return false;
    const id = data[this.#idKey];
    const node = this.#nodes.get(id);
    if (!node) return false;

    let needUpdateLink =
      !node.data || data[this.#parentKey] !== node.data[this.#parentKey];
    node.data = data;

    if (needUpdateLink) {
      const parentId = data[this.#parentKey];
      if (parentId) {
        const parent =
          this.#nodes.get(parentId) ||
          new LinkNode(parentId, undefined, undefined, node);
        parent.next = node;
        node.prev = parent;
        this.#nodes.set(parentId, parent);
      }

      if (!node.next) this.#tail = node;
      if (!node.prev) this.#head = node;

      if (node === this.#head) {
        let head = this.#head;
        while (head && head.prev) {
          head = head.prev;
        }
        this.#head = head;
      }

      if (node === this.#tail) {
        let tail = this.#tail;
        while (tail && tail.next) {
          tail = tail.next;
        }
        this.#tail = tail;
      }
    }

    return true;
  }

  /**
   *
   * @param {*} from
   * @param {*} to
   * @param {number} deep
   */
  toArray(from = null, to = null, deep = 0) {
    let i = 1;
    let current = from ? this.#nodes.get(from) : this.#head;
    const result = [];
    while (current) {
      if (current.data) result.push(current.data);
      if (to && current === this.#nodes.get(to)) {
        break;
      }
      if (deep && i === deep) {
        break;
      }
      current = current.next;
      i++;
    }
    return result;
  }

  setHead(id) {
    const node = this.#nodes.get(id);
    if (node) {
      this.#head = node;
      return true;
    }
    return false;
  }

  setTail(id) {
    const node = this.#nodes.get(id);
    if (node) {
      this.#tail = node;
      return true;
    }
    return false;
  }

  /**
   * Return item by id
   * @param {*} id
   */
  getItemById(id) {
    const node = this.#nodes.get(id);
    return node && node.data;
  }

  /**
   * Return parent of item
   * @param {*} id
   */
  getParent(id) {
    const node = this.#nodes.get(id);
    if (node && node.prev) return node.prev.data;
  }

  /**
   * Return child of item
   * @param {*} id
   */
  getChild(id) {
    const node = this.#nodes.get(id);
    if (node && node.next) return node.next.data;
  }

  /**
   * Add Item to end of linklist
   * @param {*} data
   */
  prepend(data) {
    data[this.#parentKey] = null;
    const id = data[this.#idKey];
    const node = new LinkNode(id, data, null, this.#head);
    if (this.#head) {
      this.#head.prev = node;
      if (this.#head.data) {
        this.#head.data[this.#parentKey] = id;
      }
    }
    this.#head = node;
    this.#nodes.set(id, node);
  }

  /**
   * Add Item to first of linklist
   * @param {*} data
   */
  append(data) {
    if (!data) return;
    data[this.#parentKey] = null;
    const id = data[this.#idKey];
    data[this.#parentKey] = this.#tail ? this.#tail.id : null;
    const node = new LinkNode(id, data, this.#tail, null);
    if (this.#tail) {
      this.#tail.next = node;
      this.#tail = node;
    }
    this.#tail = node;
    this.#nodes.set(id, node);
  }
}

module.exports = LinkList;
