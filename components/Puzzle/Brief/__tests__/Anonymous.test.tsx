import React from 'react';
import { shallow } from 'enzyme';

import Anonymous from '../Anonymous';

const count = 42;

describe('<Anonymous />', () => {
  it('component renders', () => {
    const node = shallow(<Anonymous count={count} />);
    expect(node.exists()).toBe(true);
  });
});
