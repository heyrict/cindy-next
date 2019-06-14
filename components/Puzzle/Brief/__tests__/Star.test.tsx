import React from 'react';
import { shallow, render } from 'enzyme';

import Star, { StarBase } from '../Star';
import theme from 'theme';

const count = 42;
const sum = 67;

describe('<Star />', () => {
  const node = shallow(<Star count={count} sum={sum} />);

  it('component renders', () => {
    expect(node.exists()).toBe(true);
  });

  it('component renders given count', () => {
    expect(node.contains(count)).toBe(true);
  });

  it('component renders given sum', () => {
    expect(node.contains(sum)).toBe(true);
  });

  it('<StarBase /> works', () => {
    const nodeBase = render(<StarBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
