import React from 'react';
import { render } from 'enzyme';

import defaultTheme from 'theme';
import {
  FooterButton,
  ModalCloseBtn,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '../index';
import { ThemesEnum } from 'theme/types';

describe('<ModalComponents />', () => {
  const theme = {
    ...defaultTheme,
    ...defaultTheme.colorthemes.light,
    theme: ThemesEnum.LIGHT,
  };

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
