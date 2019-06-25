import styled from 'theme/styled';
import {
  space,
  width,
  height,
  borders,
  color,
  SpaceProps,
  WidthProps,
  HeightProps,
  BordersProps,
} from 'styled-system';
import { ColorProps } from './types';

const Input = styled.input<
  SpaceProps & WidthProps & HeightProps & BordersProps & ColorProps
>`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  border-style: solid;
  background-color: ${p => p.theme.colors.white};
  min-height: 1.5em;
  flex-grow: 1;
  ${space}
  ${width}
  ${height}
  ${borders}
  ${color}
`;

export default Input;
