import React from 'react';
import { shallow, render } from 'enzyme';

import { Status, StatusBase, StatusText, getStatusColor } from '../Status';
import theme from 'theme';

const status = 0;

describe('<Status />', () => {
  it('component should render', () => {
    const node = shallow(<Status status={status} />);
    expect(node.find(StatusBase).prop('status')).toBe(status);
    expect(node.find(StatusText).prop('status')).toBe(status);
  });

  describe('<StatusText status={...} />', () => {
    it.each`
      status | src
      ${0}   | ${'undergoing'}
      ${1}   | ${'solved'}
      ${2}   | ${'dazed'}
      ${3}   | ${'hidden'}
      ${4}   | ${'forbidden'}
    `('<StatusText status={$status} />', ({ status, src }) => {
      const node = shallow(<StatusText status={status} />);
      expect(node.find('FormattedMessage').prop('id')).toContain(src);
    });

    it('<StatusText status={others} />', () => {
      const node = shallow(<StatusText status={5} />);
      expect(node.isEmptyRender()).toBe(true);
    });
  });

  describe('<StatusBase status={...} /> works', () => {
    it.each`
      status
      ${0}
      ${1}
      ${2}
      ${3}
      ${4}
      ${'others'}
    `('status === $status', ({ status }) => {
      const nodeBase = render(<StatusBase status={status} theme={theme} />);
      expect(nodeBase.attr('class')).toBeTruthy();
    });
  });
});
