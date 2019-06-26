import React from 'react';
import { shallow } from 'enzyme';

import Anonymous from '../Anonymous';

describe('<Anonymous />', () => {
  it('component renders', () => {
    const node = shallow(<Anonymous />);
    expect(node.exists()).toBe(true);
  });
});
