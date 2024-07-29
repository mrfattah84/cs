class Node {
  constructor(value, leftElement, rightElement) {
    this.data = value;
    this.left = leftElement;
    this.right = rightElement;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(array) {
    array = array.filter((item, index) => array.indexOf(item) === index);
    array.sort(function (a, b) {
      return a - b;
    });
    const l = array.length;
    if (l == 0) {
      return null;
    } else {
      let value = array[Math.floor(l / 2)];
      let lh = array.slice(0, Math.floor(l / 2));
      let rh = array.slice(Math.floor(l / 2) + 1);
      return new Node(value, this.buildTree(lh), this.buildTree(rh));
    }
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  insert(value) {
    let node = this.root;
    while (true) {
      if (value > node.data) {
        if (node.right === null) {
          node.right = new Node(value, null, null);
          break;
        }
        node = node.right;
      } else {
        if (node.left === null) {
          node.left = new Node(value, null, null);
          break;
        }
        node = node.left;
      }
    }
  }

  deleteItem(value) {
    let node = this.root;
    let pNode;
    while (node.data != value) {
      if (node.data > value) {
        pNode = node;
        node = node.left;
      } else {
        pNode = node;
        node = node.right;
      }
    }
    if (node.left === null && node.right === null) {
      if (pNode.right === node) {
        pNode.right = null;
      } else {
        pNode.left = null;
      }
    } else if (node.left !== null && node.right !== null) {
      let replacer = node.right;
      while (replacer.left !== null) {
        replacer = replacer.left;
      }
      console.log(node, replacer);
      this.deleteItem(replacer.data);
      node.data = replacer.data;
    } else {
      if (pNode.right === node) {
        pNode.right = node.left || node.right;
      } else {
        pNode.left = node.left || node.right;
      }
    }
  }

  find(value) {
    let node = this.root;
    while (node.data != value) {
      if (node.data > value) {
        node = node.left;
      } else {
        node = node.right;
      }
    }
    return node;
  }

  levelOrder(callback = null) {
    if (callback === null) {
      throw new Error('a callback is required!');
    }
    let queue = [this.root];
    while (queue.length != 0) {
      callback(queue[0]);
      if (queue[0].left !== null) {
        queue.push(queue[0].left);
      }
      if (queue[0].right !== null) {
        queue.push(queue[0].right);
      }

      queue.shift();
    }
  }

  inOrder(callback = null, node = this.root) {
    if (callback === null) {
      throw new Error('a callback is required!');
    }
    if (node.left !== null) {
      this.inOrder(callback, node.left);
    }
    callback(node);
    if (node.right !== null) {
      this.inOrder(callback, node.right);
    }
  }

  preOrder(callback = null, node = this.root) {
    if (callback === null) {
      throw new Error('a callback is required!');
    }
    callback(node);
    if (node.left !== null) {
      this.preOrder(callback, node.left);
    }
    if (node.right !== null) {
      this.preOrder(callback, node.right);
    }
  }

  postOrder(callback = null, node = this.root) {
    if (callback === null) {
      throw new Error('a callback is required!');
    }
    if (node.left !== null) {
      this.postOrder(callback, node.left);
    }
    if (node.right !== null) {
      this.postOrder(callback, node.right);
    }
    callback(node);
  }

  height(node = this.root) {
    if (node.left === null && node.right === null) {
      return 0;
    } else if (node.left !== null && node.right !== null) {
      return Math.max(this.height(node.left), this.height(node.right)) + 1;
    } else {
      return this.height(node.left || node.right) + 1;
    }
  }

  depth(value) {
    let c = 0;
    let node = this.root;
    while (node != value) {
      if (node.data > value.data) {
        node = node.left;
        c++;
      } else {
        node = node.right;
        c++;
      }
    }
    return c;
  }

  isBalancedrec(node) {
    if (node === null) {
      return { res: true, height: -1 };
    } else {
      const ln = this.isBalancedrec(node.left);
      const rn = this.isBalancedrec(node.right);
      return {
        res: ln.res && rn.res && Math.abs(ln.height - rn.height) <= 1,
        height: Math.max(ln.height, rn.height) + 1,
      };
    }
  }

  isBalanced() {
    return this.isBalancedrec(this.root).res;
  }

  rebalance() {
    let arr = [];
    this.inOrder((e) => {
      arr.push(e.data);
    });
    this.root = this.buildTree(arr);
  }
}

function makeArray(length) {
  let arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(Math.floor(Math.random() * 100));
  }
  return arr;
}
let tree = new Tree(makeArray(10));

tree.prettyPrint();
console.log(tree.isBalanced());

let tmp = [];
tree.levelOrder((e) => {
  tmp.push(e.data);
});
console.log('levelOrder: ', ...tmp);
tmp = [];
tree.preOrder((e) => {
  tmp.push(e.data);
});
console.log('preOrder: ', ...tmp);
tmp = [];
tree.postOrder((e) => {
  tmp.push(e.data);
});
console.log('postOrder: ', ...tmp);
tmp = [];
tree.inOrder((e) => {
  tmp.push(e.data);
});
console.log('inOrder: ', ...tmp);

tree.insert(1044);
tree.insert(4484);
tree.insert(1784);
tree.insert(8454);

tree.prettyPrint();
console.log(tree.isBalanced());

tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());

tmp = [];
tree.levelOrder((e) => {
  tmp.push(e.data);
});
console.log('levelOrder: ', ...tmp);
tmp = [];
tree.preOrder((e) => {
  tmp.push(e.data);
});
console.log('preOrder: ', ...tmp);
tmp = [];
tree.postOrder((e) => {
  tmp.push(e.data);
});
console.log('postOrder: ', ...tmp);
tmp = [];
tree.inOrder((e) => {
  tmp.push(e.data);
});
console.log('inOrder: ', ...tmp);
