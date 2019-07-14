import styled from 'theme/styled';

import { SwitchProps } from './types';

export const Switch = styled<'button', SwitchProps>('button')`
  margin: 2px 5px;
  background-color: ${p =>
    p.selected ? p.theme.colors.blue[6] : p.theme.colors.blue[0]};
  border-radius: 24px;
  display: inline-flex;
  width: 40px;
  height: 24px;
  box-shadow: 0px 0px 0px 2px inset;
  transition-property: background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  &::after,
  &::before {
    background-repeat: no-repeat;
  }
  &::after {
    content: ' ';
    width: 16px;
    height: 16px;
    margin: 1px;
    border-radius: 16px;
    transition-property: transform, color;
    transition-duration: 0.1s;
    transition-timing-function: ease-out;
    transform: translateX(${p => (p.value ? '16px' : '0')});
    background-color: ${p =>
      p.selected ? p.theme.colors.blue[0] : p.theme.colors.blue[6]};
  }
`;

export default Switch;
