import styled from 'theme/styled';
import {
  space,
  layout,
  borders,
  color,
  SpaceProps,
  BordersProps,
} from 'styled-system';
import { ColorProps, LayoutProps } from './types';

const Input = styled.input<
  SpaceProps & LayoutProps & BordersProps & ColorProps
>`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  border-style: solid;
  background-color: ${p => p.theme.colors.white};
  min-height: 1.5em;
  flex-grow: 1;
  ${space}
  ${layout}
  ${borders}
  ${color}
`;

export default Input;
