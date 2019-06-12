import React from 'react';
import { shallow } from 'enzyme';

import ButtonSelect from '../index';

describe('<ButtonSelect />', () => {
  it('Should render without problem', () => {
    const handleChange = jest.fn();
    const node = shallow(
      <ButtonSelect
        value={true}
        onChange={handleChange}
        options={[
          { value: true, label: 'True' },
          { value: false, label: 'False' },
        ]}
      />,
    );
    node
      .findWhere(n => n.text() === 'True')
      .first()
      .simulate('click');
    expect(handleChange.mock.calls.length).toEqual(1);
  });
});
