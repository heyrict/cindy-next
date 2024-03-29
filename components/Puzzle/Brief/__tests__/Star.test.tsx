import React from 'react';
import { shallow, render } from 'enzyme';

import Star, { StarBase } from '../Star';
import defaultTheme from 'theme';
import { ThemesEnum } from 'theme/types';

const count = 42;
const sum = 67;

describe('<Star />', () => {
  const node = shallow(<Star count={count} sum={sum} />);
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

  it('component renders given sum', () => {
    expect(node.text().search(sum.toString())).not.toBe(-1);
  });

  it('<StarBase /> works', () => {
    const nodeBase = render(<StarBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
