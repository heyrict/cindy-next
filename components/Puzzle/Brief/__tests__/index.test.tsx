import React from 'react';
import { shallow, render } from 'enzyme';

import { Hr, Time, PuzzleBrief } from '../index';

import theme from 'theme';
import Bookmark from '../Bookmark';
import Comment from '../Comment';
import Genre from '../Genre';
import Process from '../Process';
import Star from '../Star';
import Status from '../Status';
import Yami from '../Yami';

import {
  Genre as GenreEnum,
  Yami as YamiEnum,
  Status as StatusEnum,
} from 'generated/globalTypes';

const puzzleMinimal = {
  id: 1,
  genre: GenreEnum.CLASSIC,
  title: 'ウミガメのスープ',
  status: StatusEnum.SOLVED,
  yami: YamiEnum.NONE,
  created: '2019-06-26T00:00:00Z',
  modified: '2019-06-26T00:00:00Z',
  user: {
    id: 1,
    nickname: 'はやて',
  },
};

const puzzleMaximum = {
  ...puzzleMinimal,
  anonymous: true,
  dazedOn: '2018-11-29',
  stars_aggregate: {
    aggregate: {
      count: 7,
      sum: {
        value: 35,
      },
    },
  },
  comments_aggregate: {
    aggregate: {
      count: 5,
    },
  },
  bookmarks_aggregate: {
    aggregate: {
      count: 15,
    },
  },
  dialogues_aggregate: {
    aggregate: {
      count: 16,
      max: {
        answeredTime: '2017-10-02T21:49:22.066+08:00',
        created: '2017-10-02T20:07:00.000+08:00',
      },
    },
  },
};

const externalProps = {
  bookmarkCount: 15,
  commentCount: 5,
  starCount: 7,
  starSum: 35,
  dialogueCount: 16,
  dialogueMaxAnsweredtime: '2017-10-02T21:49:22.066+08:00',
};

describe('<Brief />', () => {
  describe('renders with minimum props', () => {
    const node = shallow(
      <PuzzleBrief puzzle={puzzleMinimal} showGenreImage={false} />,
    );
    it('has Genre and Yami', () => {
      expect(node.find(Genre).exists()).toBe(true);
      expect(node.find(Yami).exists()).toBe(true);
    });
    it('has title', () => {
      expect(node.contains(puzzleMinimal.title)).toBe(true);
    });
    it('has Status', () => {
      expect(node.find(Status).exists()).toBe(true);
    });
  });

  describe('renders with maximum props in puzzle', () => {
    const node = shallow(
      <PuzzleBrief puzzle={puzzleMaximum} showGenreImage={true} />,
    );
    it('has Star, Comment, Bookmark', () => {
      expect(node.find(Star).exists()).toBe(true);
      expect(node.find(Comment).exists()).toBe(true);
      expect(node.find(Bookmark).exists()).toBe(true);
    });
    it('has Process', () => {
      expect(node.find(Process).exists()).toBe(true);
    });
  });

  describe('renders with maximum props in external props', () => {
    const node = shallow(
      <PuzzleBrief
        puzzle={puzzleMinimal}
        showGenreImage={true}
        {...externalProps}
      />,
    );
    it('has Star, Comment, Bookmark', () => {
      expect(node.find(Star).exists()).toBe(true);
      expect(node.find(Comment).exists()).toBe(true);
      expect(node.find(Bookmark).exists()).toBe(true);
    });
    it('has Process', () => {
      expect(node.find(Process).exists()).toBe(true);
    });
  });
});

describe('<Hr />', () => {
  it('works in current theme', () => {
    const node = render(<Hr theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});

describe('<Time />', () => {
  it('works in current theme', () => {
    const node = render(<Time theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
