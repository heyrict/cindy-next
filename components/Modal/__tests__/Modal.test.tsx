import React from 'react';
import { shallow, render } from 'enzyme';

import defaultTheme from 'theme';
import Modal, { Shader, ModalContainer, Container } from '../Modal';
import { ThemesEnum } from 'theme/types';

describe.each([false, true])('<Modal show={%s} />', show => {
  const theme = {
    ...defaultTheme,
    ...defaultTheme.colorthemes.light,
    theme: ThemesEnum.LIGHT,
  };
  it('<Shader /> should work in current theme', () => {
    const node = render(<Shader show={show} theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<ModalContainer /> should work in current theme', () => {
    const node = render(<ModalContainer show={show} theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<Container /> should work in current theme', () => {
    const node = render(<Container show={show} theme={theme} />);
    expect(node.attr('class')).toBeTruthy();
  });

  it('<Modal /> should render properly', () => {
    const node = shallow(<Modal show={show} />);
    expect(node.exists()).toBe(true);
  });
});
