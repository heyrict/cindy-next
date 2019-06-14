import { shallow, render } from 'enzyme';

import theme from 'theme';
import Modal, { Shader, ModalContainer, Container } from '../Modal';
import React from 'react';

describe.each([false, true])('<Modal show={%s} />', show => {
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
