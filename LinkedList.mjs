class node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}

export default class LinkedList {
  constructor() {
    this.headNode = new node();
  }

  append(value) {
    let tmp = this.headNode;
    while (tmp.nextNode != null) tmp = tmp.nextNode;
    tmp.nextNode = new node(value);
  }

  prepend(value) {
    this.headNode.value = value;
    this.headNode = new node(null, this.headNode);
  }

  size() {
    let i = 0;
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      i++;
      tmp = tmp.nextNode;
    }
    return i;
  }

  head() {
    return this.headNode.nextNode;
  }

  tail() {
    let tmp = this.headNode;
    while (tmp.nextNode != null) tmp = tmp.nextNode;
    return tmp;
  }

  at(index) {
    let i = 0;
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
      if (i == index) {
        return tmp;
      }
      i++;
    }
    return null;
  }

  pop() {
    let prev;
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      prev = tmp;
      tmp = tmp.nextNode;
    }
    prev.nextNode = null;
  }

  contains(value) {
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
      if (tmp.value == value) {
        return true;
      }
    }
    return false;
  }

  find(value) {
    let i = 0;
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
      if (tmp.value == value) {
        return i;
      }
      i++;
    }
    return null;
  }

  toString() {
    let str = '';
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      tmp = tmp.nextNode;
      str += `( ${tmp.value} ) -> `;
    }
    return (str += 'null');
  }

  insertAt(value, index) {
    let i = 0;
    let prev;
    let tmp = this.headNode;
    while (tmp.nextNode != null) {
      prev = tmp;
      tmp = tmp.nextNode;
      if (i == index) {
        prev.nextNode = new node(value, tmp);
        return true;
      }
      i++;
    }
    return false;
  }

  removeAt(index) {
    let i = 0;
    let prev;
    let tmp = this.headNode;
    let next;
    while (tmp.nextNode != null) {
      prev = tmp;
      tmp = tmp.nextNode;
      if (i == index) {
        prev.nextNode = tmp.nextNode;
        return true;
      }
      i++;
    }
    return false;
  }
}
