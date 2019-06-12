import React from 'react';
import { shallow, render } from 'enzyme';

import Bookmark, { BookmarkBase } from '../Bookmark';
import theme from 'lib/theme';

const count = 42;

describe('<Bookmark />', () => {
  const node = shallow(<Bookmark count={count} />);

  it('component renders', () => {
    expect(node.exists()).toBe(true);
  });

  it('component renders given count', () => {
    expect(node.contains(count)).toBe(true);
  });

  it('<BookmarkBase /> works', () => {
    const nodeBase = render(<BookmarkBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
