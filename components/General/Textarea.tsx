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

const Textarea = styled.textarea<
  SpaceProps & LayoutProps & BordersProps & ColorProps
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
  ${layout}
  ${borders}
  ${color}
`;

export default Textarea;
