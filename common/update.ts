import isEqual from 'react-fast-compare';
/*
 * function concatList(listA, listB)
 *
 * Literally concatenating listA with listB.
 */
export function concatList<V = any>(
  listA: Array<V>,
  listB: Array<V>,
): Array<V> {
  return [...listA, ...listB];
}

/*
 * function mergeList(listA, listB, sort = 'asc')
 *
 * Merging listA with listB (newer)
 * All items in both lists should be an object containing
 * `id` property, which is used to update corresponding item
 * in the previous list.
 *
 * Item IDs are assumed ascending in both arrays.
 *
 * Items with id greater than the id of the last item in listA
 * are considered new items and will be appended to the tail.
 */
export function mergeList<V = any>(
  a: Array<V>,
  b: Array<V>,
  key: keyof V = 'id' as keyof V,
  sort: 'asc' | 'desc' = 'asc',
): Array<V> {
  let answer = new Array(a.length + b.length);
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < a.length && j < b.length) {
    if (a[i][key] < b[j][key]) {
      if (sort === 'asc') {
        answer[k] = a[i];
        i++;
      } else {
        answer[k] = b[j];
        j++;
      }
    } else if (a[i][key] === b[j][key]) {
      answer[k] = b[j]; // b is newer than a
      i++;
      j++;
    } else {
      if (sort === 'asc') {
        answer[k] = b[j];
        j++;
      } else {
        answer[k] = a[i];
        i++;
      }
    }
    k++;
  }
  while (i < a.length) {
    answer[k] = a[i];
    i++;
    k++;
  }
  while (j < b.length) {
    answer[k] = b[j];
    j++;
    k++;
  }
  return answer.filter(o => o !== undefined);
}

/*
 * function updateItem(list, item)
 * update item if list contains an item with same `id`.
 */
export function updateItem<V = any>(
  list: Array<V>,
  item: V,
  key: keyof V = 'id' as keyof V,
  itemIndex: any = undefined,
): Array<V> {
  let index =
    itemIndex === undefined
      ? list.findIndex(o => o[key] === item[key])
      : itemIndex;
  if (index < 0) return list;
  if (isEqual(list[index], item)) return list;
  const newList = [...list];
  newList[index] = { ...list[index], ...item };
  return newList;
}

export function insertItem<V = any>(
  list: Array<V>,
  item: V,
  key: keyof V = 'id' as keyof V,
  sort: 'asc' | 'desc' = 'asc',
): Array<V> {
  if (list.length <= 0) {
    return [item];
  }
  let indexToInsert;
  if (sort === 'asc') {
    indexToInsert = list.findIndex(o => o[key] > item[key]);
  } else {
    indexToInsert = list.findIndex(o => o[key] < item[key]);
  }

  if (indexToInsert === -1) {
    return [...list, item];
  } else {
    return [
      ...list.slice(0, indexToInsert),
      item,
      ...list.slice(indexToInsert),
    ];
  }
}

export function upsertItem<V = any>(
  list: Array<V>,
  item: V,
  key: keyof V = 'id' as keyof V,
  sort: 'asc' | 'desc' = 'asc',
): Array<V> {
  if (list.length == 0) {
    return [item];
  }

  // Don't prepend item to the list
  if (
    (sort === 'asc' && list[0][key] > item[key]) ||
    (sort === 'desc' && list[list.length - 1][key] < item[key])
  ) {
    return list;
  }

  let index = list.findIndex(o => o[key] === item[key]);
  if (index === -1) {
    return insertItem(list, item, key, sort);
  }
  return updateItem(list, item, key, index);
}

/*
 * function upsertMultipleItem(list, items, key, sort)
 *
 * Given items sorted by updated time, append them to list if newly added,
 * or update the corresponding item if it is found in list.
 */
export function upsertMultipleItem<V = any>(
  list: Array<V>,
  items: Array<V>,
  key: keyof V = 'id' as keyof V,
  sort: 'asc' | 'desc' = 'asc',
): Array<V> {
  items.forEach(item => {
    list = upsertItem(list, item, key, sort);
  });
  return list;
}
