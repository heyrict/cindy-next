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
export const mergeList = (listA, listB, sort = 'asc') => {
  if (listA.length === 0) return listB;
  if (listB.length === 0) return listA;

  const updatedArray = listA.map(itemA => ({
    ...itemA,
    ...(listB.find(item => item.id === itemA.id) || {}),
  }));

  if (sort === 'asc') {
    const aTailID = listA[listA.length - 1].id;
    const appendingArray = listB.slice(
      listB.findIndex(item => item.id > aTailID),
    );
    return [...updatedArray, ...appendingArray];
  }

  const aHeadID = listA[0].id;
  const prependingArray = listB.slice(
    0,
    listB.findIndex(item => item.id < aHeadID) - 1,
  );
  return [...prependingArray, ...updatedArray];
};

/*
 * function updateItem(list, item)
 * update item if list contains an item with same `id`.
 */
export const updateItem = (list, item, key = 'id') => {
  let index = list.findIndex(o => o[key] === item[key]);
  if (index < 0) return list;
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
  const updatedList = updateItem(list, item, key);
  if (updatedList === list) {
    return insertItem(list, item, key, sort);
  }
  return updatedList;
};
