import React from 'react';
import { shallow } from 'enzyme';

import ButtonSelect from '../index';

const options = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3 },
];

describe('<ButtonSelect />', () => {
  it.each([1, 2, 3])('Should fire onChange event whatever value is', value => {
    const handleChange = jest.fn();
    const node = shallow(
      <ButtonSelect value={value} onChange={handleChange} options={options} />,
    );
    options.forEach(option => {
      node
        .findWhere(n => n.text() === (option.label || option.value).toString())
        .first()
        .simulate('click');
      expect(handleChange).toHaveBeenLastCalledWith(option);
    });
  });
});
