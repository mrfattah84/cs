function mergeSort(list) {
  let lh,
    rh = [];
  if (list.length === 1) {
    return list;
  } else if (list.length % 2 == 0) {
    lh = mergeSort(list.slice(0, list.length / 2));
    rh = mergeSort(list.slice(list.length / 2));
  } else if (list.length % 2 == 1) {
    lh = mergeSort(list.slice(0, (list.length - 1) / 2));
    rh = mergeSort(list.slice((list.length - 1) / 2));
  }
  let li = 0;
  let ri = 0;
  for (let i = 0; i < list.length; i++) {
    if (lh[li] <= rh[ri]) {
      list[i] = lh[li];
      li++;
      if (li === lh.length) {
        list = [...list.slice(0, i + 1), ...rh.slice(ri)];
        return list;
      }
    } else {
      list[i] = rh[ri];
      ri++;
      if (ri === rh.length) {
        list = [...list.slice(0, i + 1), ...lh.slice(li)];
        return list;
      }
    }
  }
}

console.log(mergeSort([105, 79, 100, 110]));
