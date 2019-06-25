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

const Textarea = styled.textarea<
  SpaceProps & WidthProps & HeightProps & BordersProps & ColorProps
>`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  background-color: ${p => p.theme.colors.white};
  min-height: 5em;
  max-width: 100%;
  padding: ${p => p.theme.space[1]}px;
  flex-grow: 1;
  ${space}
  ${width}
  ${height}
  ${borders}
  ${color}
`;

export default Textarea;
