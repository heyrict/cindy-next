import { shallow, render } from 'enzyme';

import { Hr, Time, Brief } from '../index';

import theme from 'theme';
import Bookmark from '../Bookmark';
import Comment from '../Comment';
import Genre from '../Genre';
import Process from '../Process';
import Star from '../Star';
import Status from '../Status';
import Yami from '../Yami';

const puzzleMinimal = {
  id: 1,
  genre: 0,
  title: 'ウミガメのスープ',
  status: 1,
  yami: 0,
  sui_hei_user: {
    id: 1,
    nickname: 'はやて',
  },
};

const puzzleMaximum = {
  ...puzzleMinimal,
  anonymous: true,
  created: '2017-10-02T15:42:39+08:00',
  modified: '2017-10-02T15:42:39+08:00',
  dazed_on: '2018-11-29',
  sui_hei_stars_aggregate: {
    aggregate: {
      count: 7,
      sum: {
        value: 35,
      },
    },
  },
  sui_hei_comments_aggregate: {
    aggregate: {
      count: 5,
    },
  },
  sui_hei_bookmarks_aggregate: {
    aggregate: {
      count: 15,
    },
  },
  sui_hei_dialogues_aggregate: {
    aggregate: {
      count: 16,
      max: {
        answeredtime: '2017-10-02T21:49:22.066+08:00',
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
      <Brief puzzle={puzzleMinimal} showGenreImage={false} />,
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
      <Brief puzzle={puzzleMaximum} showGenreImage={true} />,
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
      <Brief puzzle={puzzleMinimal} showGenreImage={true} {...externalProps} />,
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
