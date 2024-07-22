function fibs(n) {
  let arr = [];
  let a = 0;
  let b = 0;
  let c = 1;
  for (let i = 0; i < n; i++) {
    a = b;
    b = c;
    c = a + b;
    arr.push(a);
  }
  return arr;
}

console.log(fibs(8));

function fibsrec(n) {
  if (n <= 0) {
    return [];
  } else if (n == 1) {
    return [0];
  } else if (n == 2) {
    return [0, 1];
  } else {
    let l = fibsrec(n - 1);
    return [...l, l[n - 2] + l[n - 3]];
  }
}

console.log(fibsrec(8));
