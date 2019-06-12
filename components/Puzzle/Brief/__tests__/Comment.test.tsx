import React from 'react';
import { shallow, render } from 'enzyme';

import Comment, { CommentBase } from '../Comment';
import theme from 'lib/theme';

const count = 42;

describe('<Comment />', () => {
  const node = shallow(<Comment count={count} />);

  it('component renders', () => {
    expect(node.exists()).toBe(true);
  });

  it('component renders given count', () => {
    expect(node.contains(count)).toBe(true);
  });

  it('<CommentBase /> works', () => {
    const nodeBase = render(<CommentBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
