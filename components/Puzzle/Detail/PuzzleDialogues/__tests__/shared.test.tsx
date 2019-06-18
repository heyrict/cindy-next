import React from 'react';
import { render } from 'enzyme';

import theme from 'theme';
import IndexLabel from '../IndexLabel';
import FilterButton from '../FilterButton';

describe('<IndexLabel />', () => {
  it('Should render properly in current theme', () => {
    render(<IndexLabel theme={theme} />);
  });
});

describe('<FilterButton />', () => {
  it('Should render properly in current theme', () => {
    render(<FilterButton active={false} accent={false} theme={theme} />);
    render(<FilterButton active={true} accent={true} theme={theme} />);
  });
});
