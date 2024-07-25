export default class HashMap {
  constructor() {
    this.buckets = Array.from(Array(16), () => new Array());
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
    let bucket = this.buckets[this.hash(key)];
    let keyFound = false;
    bucket.forEach((data) => {
      if (data[0] == key) {
        data[1] = value;
        keyFound = true;
      }
    });
    if (!keyFound) {
      bucket.push([key, value]);
    }
    if (this.length() > this.buckets.length * 0.75) {
      let bucketsCopy = [...this.buckets];
      this.buckets = Array.from(
        Array(this.buckets.length * 2),
        () => new Array()
      );
      bucketsCopy.forEach((bucket) => {
        bucket.forEach((e) => {
          this.set(e[0], e[1]);
        });
      });
    }
  }

  get(key) {
    let bucket = this.buckets[this.hash(key)];
    for (let i = 0; i < bucket.length; i++) {
      const e = bucket[i];
      if (key == e[0]) {
        return e[1];
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) === null ? false : true;
  }

  remove(key) {
    let bucket = this.buckets[this.hash(key)];
    for (let i = 0; i < bucket.length; i++) {
      const e = bucket[i];
      if (key == e[0]) {
        bucket.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  length() {
    let i = 0;
    this.buckets.forEach((bucket) => {
      bucket.forEach((e) => {
        i++;
      });
    });
    return i;
  }

  clear() {
    this.buckets = Array.from(Array(16), () => new Array());
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((e) => {
        keys.push(e[0]);
      });
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((e) => {
        values.push(e[1]);
      });
    });
    return values;
  }

  entries() {
    let entries = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((e) => {
        entries.push(e);
      });
    });
    return entries;
  }
}
