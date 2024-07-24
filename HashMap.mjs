export default class HashMap {
  constructor() {
    this.buckets = new Array(16);
  }

  insert(index, value) {
    if (index < 0 || index >= this.buckets.length) {
      throw new Error('Trying to access index out of bound');
    } else {
      this.buckets[index] = value;
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode %= this.buckets.length;
    }

    return hashCode;
  }

  set(key, value) {
    this.buckets.insert(this.hash(key), [key, value]);
  }

  get(key) {
    const bucket = this.buckets[this.hash(key)];
    return bucket !== undefined ? bucket[1] : null;
  }

  has(key) {
    const bucket = this.buckets[this.hash(key)];
    if (bucket !== undefined && bucket[0] === key) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    const bucket = this.buckets[this.hash(key)];
    if (bucket !== undefined && bucket[0] === key) {
      delete this.buckets[this.hash(key)];
      return true;
    } else {
      return false;
    }
  }

  length() {
    let c = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      const element = this.buckets[i];
      if (element !== undefined) c++;
    }
    return c;
  }

  clear() {
    this.buckets = new Array(this.buckets.length);
  }

  keys() {
    let keys = [];
    this.buckets.forEach((e) => {
      if (e !== undefined) keys.push(e[0]);
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((e) => {
      if (e !== undefined) values.push(e[1]);
    });
    return values;
  }

  entries() {
    let res = [];
    this.buckets.forEach((e) => {
      if (e !== undefined) res.push([e[0], e[1]]);
    });
    return res;
  }
}

let table = new HashMap();
table.set('amir', 'fattah');
table.set('niusha', 'fattah');
console.log(table.get('amir'));
console.log(table.buckets);
console.log(table.has('amir'));
console.log(table.length());
console.log(table.keys());
console.log(table.values());
console.log(...table.entries());
