import React from 'react';
import { shallow, render } from 'enzyme';

import Comment, { CommentBase } from '../Comment';
import defaultTheme from 'theme';
import { ThemesEnum } from 'theme/types';

const count = 42;

describe('<Comment />', () => {
  const node = shallow(<Comment puzzleId={1} count={count} />);
  const theme = {
    ...defaultTheme,
    ...defaultTheme.colorthemes.light,
    theme: ThemesEnum.LIGHT,
  };

  it('component renders', () => {
    expect(node.exists()).toBe(true);
  });

  it('component renders given count', () => {
    expect(node.text().search(count.toString())).not.toBe(-1);
  });

  it('<CommentBase /> works', () => {
    const nodeBase = render(<CommentBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
