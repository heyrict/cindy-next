import {
  concatList,
  mergeList,
  updateItem,
  insertItem,
  upsertItem,
  upsertMultipleItem,
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

const updateMultipleList = {
  A: [
    {
      id: 8,
      value: 'B',
      modified: '2019-01-10',
    },
    {
      id: 14,
      value: 'D',
      modified: '2019-01-12',
    },
    {
      id: 15,
      value: 'E',
      modified: '2019-01-14',
    },
  ],
  B: [
    {
      id: 14,
      value: 'd',
      modified: '2019-01-15',
    },
    {
      id: 7,
      value: 'S',
      modified: '2019-01-16',
    },
    {
      id: 8,
      value: 'b',
      modified: '2019-01-17',
    },
    {
      id: 17,
      value: 'H',
      modified: '2019-01-18',
    },
  ],
  AmB: [
    {
      id: 8,
      value: 'b',
      modified: '2019-01-17',
    },
    {
      id: 14,
      value: 'd',
      modified: '2019-01-15',
    },
    {
      id: 15,
      value: 'E',
      modified: '2019-01-14',
    },
    {
      id: 17,
      value: 'H',
      modified: '2019-01-18',
    },
  ],
};

const dialogueList = {
  A: [
    {
      id: 97002,
      good: false,
      true: false,
      question: 'Question 1',
      questionEditTimes: 0,
      answer: 'Answer 1',
      answerEditTimes: 8,
      created: '2019-06-09T14:19:50.799224+08:00',
      answeredtime: '2019-06-09T14:39:01.110038+08:00',
      sui_hei_user: {
        id: 1,
        nickname: 'はやて',
        username: 'heyrict',
        sui_hei_current_useraward: {
          id: 4,
          created: '2017-11-29',
          sui_hei_award: {
            id: 2,
            name: '★★管理人',
            description: 'このサイトの創設者でありたった一人の管理人である。',
            __typename: 'sui_hei_award',
          },
          __typename: 'sui_hei_useraward',
        },
        __typename: 'sui_hei_user',
      },
      __typename: 'sui_hei_dialogue',
    },
  ],
  up: {
    id: 97002,
    answer: 'Answer 1',
    good: true,
    true: false,
    answerEditTimes: 9,
    answeredtime: '2019-06-09T14:39:01.110038+08:00',
    __typename: 'sui_hei_dialogue',
  },
  sub: {
    id: 97002,
    answer: 'Answer 1',
    good: true,
    true: false,
    question: 'Question 1',
    questionEditTimes: 0,
    answerEditTimes: 9,
    answeredtime: '2019-06-09T14:39:01.110038+08:00',
    created: '2019-06-09T14:19:50.799224+08:00',
    sui_hei_user: {
      id: 1,
      nickname: 'はやて',
      username: 'heyrict',
      sui_hei_current_useraward: {
        id: 4,
        created: '2017-11-29',
        sui_hei_award: {
          id: 2,
          name: '★★管理人',
          description: 'このサイトの創設者でありたった一人の管理人である。',
          __typename: 'sui_hei_award',
        },
        __typename: 'sui_hei_useraward',
      },
      __typename: 'sui_hei_user',
    },
    __typename: 'sui_hei_dialogue',
  },
  Aup: [
    {
      id: 97002,
      good: true,
      true: false,
      question: 'Question 1',
      questionEditTimes: 0,
      answer: 'Answer 1',
      answerEditTimes: 9,
      created: '2019-06-09T14:19:50.799224+08:00',
      answeredtime: '2019-06-09T14:39:01.110038+08:00',
      sui_hei_user: {
        id: 1,
        nickname: 'はやて',
        username: 'heyrict',
        sui_hei_current_useraward: {
          id: 4,
          created: '2017-11-29',
          sui_hei_award: {
            id: 2,
            name: '★★管理人',
            description: 'このサイトの創設者でありたった一人の管理人である。',
            __typename: 'sui_hei_award',
          },
          __typename: 'sui_hei_useraward',
        },
        __typename: 'sui_hei_user',
      },
      __typename: 'sui_hei_dialogue',
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

describe('Test mergeList(listA, listB)', () => {
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

  it('Should work with dialogue subscription', () => {
    expect(updateItem(dialogueList.A, dialogueList.sub)).toStrictEqual(
      dialogueList.Aup,
    );
  });

  it('Should not re-render if the two objects are deeply equal', () => {
    expect(updateItem(dialogueList.Aup, dialogueList.sub)).toBe(
      dialogueList.Aup,
    );
  });
});

describe('Test upsertItem(list, item)', () => {
  describe('Should work similarly to insertItem', () => {
    it('Append item to simpleList should work', () => {
      expect(upsertItem(simpleList.A, simpleList.add, 'id')).toStrictEqual(
        simpleList.Aadd,
      );
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
    it('Should work with dialogue subscription', () => {
      expect(upsertItem(dialogueList.A, dialogueList.sub)).toStrictEqual(
        dialogueList.Aup,
      );
    });

    it('Should not re-render if the two objects are deeply equal', () => {
      expect(upsertItem(dialogueList.Aup, dialogueList.sub)).toBe(
        dialogueList.Aup,
      );
    });
  });
});

describe('Test upsertMultipleItem(list, item)', () => {
  it('Should update items in ambiguous order', () => {
    expect(
      upsertMultipleItem(
        updateMultipleList.A,
        updateMultipleList.B,
        'id',
        'asc',
      ),
    ).toStrictEqual(updateMultipleList.AmB);
  });
});
