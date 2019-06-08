import {
  concatList,
  mergeList,
  updateItem,
  insertItem,
  upsertItem,
} from '../update';
const simpleList = {
  A: [
    {
      id: 8,
      value: 'B',
    },
    {
      id: 14,
      value: 'D',
    },
    {
      id: 15,
      value: 'E',
    },
  ],
  B: [
    {
      id: 15,
      value: 'F',
    },
    {
      id: 16,
      value: 'G',
    },
  ],
  up: {
    id: 15,
    value: 'F',
  },
  add: {
    id: 16,
    value: 'G',
  },
  ins: {
    id: 9,
    value: 'C',
  },
  Aup: [
    {
      id: 8,
      value: 'B',
    },
    {
      id: 14,
      value: 'D',
    },
    {
      id: 15,
      value: 'F',
    },
  ],
  Aadd: [
    {
      id: 8,
      value: 'B',
    },
    {
      id: 14,
      value: 'D',
    },
    {
      id: 15,
      value: 'E',
    },
    {
      id: 16,
      value: 'G',
    },
  ],
  Ains: [
    {
      id: 8,
      value: 'B',
    },
    {
      id: 9,
      value: 'C',
    },
    {
      id: 14,
      value: 'D',
    },
    {
      id: 15,
      value: 'E',
    },
  ],
  AmB: [
    {
      id: 8,
      value: 'B',
    },
    {
      id: 14,
      value: 'D',
    },
    {
      id: 15,
      value: 'F',
    },
    {
      id: 16,
      value: 'G',
    },
  ],
  AnB: [
    {
      id: 8,
      value: 'B',
    },
    {
      id: 14,
      value: 'D',
    },
    {
      id: 15,
      value: 'E',
    },
    {
      id: 15,
      value: 'F',
    },
    {
      id: 16,
      value: 'G',
    },
  ],
};

describe('Test concatList(listA, listB)', () => {
  it('Concatenating simple lists should work', () => {
    expect(concatList(simpleList.A, simpleList.B)).toStrictEqual(
      simpleList.AnB,
    );
  });
});

describe.only('Test mergeList(listA, listB)', () => {
  it('Merge simple lists should work', () => {
    expect(mergeList(simpleList.A, simpleList.B, 'id', 'asc')).toStrictEqual(
      simpleList.AmB,
    );
  });

  it('and should also work in reverse order', () => {
    expect(
      mergeList(
        [...simpleList.A].reverse(),
        [...simpleList.B].reverse(),
        'id',
        'desc',
      ),
    ).toStrictEqual([...simpleList.AmB].reverse());
  });
});

describe('Test insertItem(list, item, key, sort)', () => {
  it('Append item to simpleList should work', () => {
    expect(insertItem(simpleList.A, simpleList.add, 'id')).toStrictEqual(
      simpleList.Aadd,
    );
  });
  it('and should also work in reverse order', () => {
    expect(
      insertItem([...simpleList.A].reverse(), simpleList.add, 'id', 'desc'),
    ).toStrictEqual([...simpleList.Aadd].reverse());
  });
  it('Insert item to simpleList should work', () => {
    expect(insertItem(simpleList.A, simpleList.ins, 'id')).toStrictEqual(
      simpleList.Ains,
    );
  });
});

describe('Test updateItem(list, item)', () => {
  it('Update item in simpleList should work', () => {
    expect(updateItem(simpleList.A, simpleList.up)).toStrictEqual(
      simpleList.Aup,
    );
  });

  it('Should return the same object if no item should be updated', () => {
    expect(updateItem(simpleList.A, simpleList.add)).toBe(simpleList.A);
  });
});

describe('Test upsertItem(list, item)', () => {
  describe('Should work similarly to insertItem', () => {
    it('Append item to simpleList should work', () => {
      expect(upsertItem(simpleList.A, simpleList.add, 'id')).toStrictEqual(
        simpleList.Aadd,
      );
    });
    it('and should also work in reverse order', () => {
      expect(
        upsertItem([...simpleList.A].reverse(), simpleList.add, 'id', 'desc'),
      ).toStrictEqual([...simpleList.Aadd].reverse());
    });
    it('Insert item to simpleList should work', () => {
      expect(upsertItem(simpleList.A, simpleList.ins, 'id')).toStrictEqual(
        simpleList.Ains,
      );
    });
  });

  describe('Should work similarly to updateItem', () => {
    it('Update item in simpleList should work', () => {
      expect(upsertItem(simpleList.A, simpleList.up)).toStrictEqual(
        simpleList.Aup,
      );
    });
  });
});
