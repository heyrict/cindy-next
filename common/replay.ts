export function mergeNeighbor<T>(
  arr: Array<T>,
  isSame: (item: T, index: number) => boolean,
  mergeTo: T,
  numNeighbors: number = 2,
) {
  let out = [] as Array<T>;
  let pending = [] as Array<T>;
  let neighborCount = 0;
  arr.forEach(item => {
    if (isSame(item, neighborCount)) {
      pending.push(item);
      neighborCount += 1;
    } else {
      out.push(item);
    }
    if (neighborCount >= numNeighbors) {
      out.push(mergeTo);
      pending = [];
      neighborCount = 0;
    }
  });
  return out.concat(...pending);
}

export function filterNeighbor<T>(
  arr: Array<T>,
  isSame: (item: T, index: number) => boolean,
  numNeighbors: number = 2,
) {
  let neighborCount = 0;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (isSame(item, neighborCount)) {
      neighborCount += 1;
    }
    if (neighborCount >= numNeighbors) {
      return true;
    }
  }
  return false;
}
