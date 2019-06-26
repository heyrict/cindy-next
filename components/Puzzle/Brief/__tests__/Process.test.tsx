import React from 'react';
import { shallow, render } from 'enzyme';

import Process, { ProcessBase } from '../Process';
import theme from 'theme';

const count = 42;

describe('<Process />', () => {
  const node = shallow(<Process count={count} />);

  it('component renders', () => {
    expect(node.exists()).toBe(true);
  });

  it('component renders given count', () => {
    expect(node.text().search(count.toString())).not.toBe(-1);
  });

  it('<ProcessBase /> works', () => {
    const nodeBase = render(<ProcessBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
