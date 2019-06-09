import isEqual from 'react-fast-compare';
/*
 * function concatList(listA, listB)
 *
 * Literally concatenating listA with listB.
 */
export const concatList = (listA, listB) => [...listA, ...listB];

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
export const mergeList = (a, b, key = 'id', sort = 'asc') => {
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
};

/*
 * function updateItem(list, item)
 * update item if list contains an item with same `id`.
 */
export const updateItem = (list, item, key = 'id', itemIndex = undefined) => {
  let index =
    itemIndex === undefined
      ? list.findIndex(o => o[key] === item[key])
      : itemIndex;
  if (index < 0) return list;
  if (isEqual(list[index], item)) return list;
  const newList = [...list];
  newList[index] = { ...list[index], ...item };
  return newList;
};

export const insertItem = (list, item, key = 'id', sort = 'asc') => {
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
};

export const upsertItem = (list, item, key = 'id', sort = 'asc') => {
  let index = list.findIndex(o => o[key] === item[key]);
  if (index === -1) {
    return insertItem(list, item, key, sort);
  }
  return updateItem(list, item, key, index);
};
