class Node1 {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.#buildTree(arr);
  }

  #buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const clevArray = [...new Set(
      array.filter((data) => !Number.isNaN(data))
    )].sort((a, b) => a - b);

    if (clevArray.length === 0) {
      return null;
    }

    if (clevArray.length === 1) {
      return new Node1(clevArray[0]);
    }

    const mid = Math.floor(clevArray.length / 2);
    const root = new Node1(clevArray[mid]);

    root.left = this.#buildTree(clevArray.slice(0, mid));
    root.right = this.#buildTree(clevArray.slice(mid + 1));

    return root;
  }

  includes(val) {
    for (const [key, value] of Object.entries(this.root)) {
      if (typeof value === `object`
        && !Array.isArray(value)
        && typeof value !== null) {
        this.includes(value)
      } else {
        if (value === val) return true;
      }
    }
  }

  insert(val, root = this.root) {
    if (root === null) {
      return new Node1(val);
    }

    if (val === root.data) return root;

    if (val > root.data) {
      root.right = this.insert(val, root.right);
    } else {
      root.left = this.insert(val, root.left);
    }

    if (root === this.root) {
      this.root = root;
    }
    return root;
  }

  deleteItem(val, root = this.root) {
    if (!this.includes(val)) {
      return
    } else {
      if (root === null) {
        return root;
      }

      if (val < root.data) {
        root.left = this.deleteItem(val, root.left);
      } else if (val > root.data) {
        root.right = this.deleteItem(val, root.right);
      } else {
        if (root.left === null) {
          return root.right;
        } else if (root.right === null) {
          return root.left;
        }

        let successorNode = this.#successor(root);
        root.data = successorNode.data;
        root.right = this.deleteItem(successorNode.data, root.right);
      }
      return root;
    }
  }

  levelOrderForEach(callback) {
    if (this.root === null) {
      return;
    }

    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }

    let queue = [this.root];

    while (queue.length > 0) {
      let currentNode = queue.shift();
      callback(currentNode.data);

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback, node = this.root) {
    if (node === null) {
      return;
    }

    this.inOrderForEach(callback, node.left);
    callback(node.data);
    this.inOrderForEach(callback, node.right);
  }

  preOrderForEach(callback, node = this.root) {
    if (node === null) {
      return;
    }

    callback(node.data);
    this.preOrderForEach(callback, node.left);
    this.preOrderForEach(callback, node.right);
  }

  postOrderForEach(callback, node = this.root) {
    if (node === null) {
      return;
    }

    this.postOrderForEach(callback, node.left);
    this.postOrderForEach(callback, node.right);
    callback(node.data);
  }

  height(node) {
    if (node === null) {
      return -1;
    }
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node) {
    if (node === null) {
      return -1;
    }
    let depth = 0;
    let currentNode = this.root;

    while (currentNode !== null) {
      if (node.data < currentNode.data) {
        currentNode = currentNode.left;
        depth++;
      } else if (node.data > currentNode.data) {
        currentNode = currentNode.right;
        depth++;
      } else {
        return depth;
      }
    }
    return undefined; // Node not found
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    if (Math.abs(leftHeight - rightHeight) > 1) {
      return false;
    }

    return this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    if (this.isBalanced()) {
      return;
    }
    let nodes = [];
    this.inOrderForEach((data) => nodes.push(data));
    this.root = this.#buildTree(nodes);
  }

  rebalance() {
    let nodes = [];
    this.inOrderForEach((data) => nodes.push(data));
    this.root = this.#buildTree(nodes);
  }

  #successor(node) {
    let current = node.right;
    while (current.left !== null) {
      current = current.left;
    }
    return current;
  }

  #predecessor(node) {
    let current = node.left;
    while (current.right !== null) {
      current = current.right;
    }
    return current;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null || node === undefined) {
      return;
    }

    this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}


export { Tree };