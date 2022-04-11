import React from 'react';
import { shallow, render } from 'enzyme';

import Process, { ProcessBase } from '../Process';
import defaultTheme from 'theme';
import { ThemesEnum } from 'theme/types';

const count = 42;

describe('<Process />', () => {
  const node = shallow(<Process count={count} />);
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

  it('<ProcessBase /> works', () => {
    const nodeBase = render(<ProcessBase theme={theme} />);
    expect(nodeBase.attr('class')).toBeTruthy();
  });
});
