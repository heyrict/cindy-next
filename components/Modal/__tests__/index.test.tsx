import React from 'react';
import { render } from 'enzyme';

import theme from 'lib/theme';
import {
  FooterButton,
  ModalCloseBtn,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../index';

describe('<ModalComponents />', () => {
  it('<FooterButton /> should work in current theme', () => {
    const node = render(<FooterButton theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<ModalCloseBtn /> should work in current theme', () => {
    const node = render(<ModalCloseBtn theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<ModalHeader /> should work in current theme', () => {
    const node = render(<ModalHeader theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<ModalBody /> should work in current theme', () => {
    const node = render(<ModalBody theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<ModalFooter /> should work in current theme', () => {
    const node = render(<ModalFooter theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });
});
