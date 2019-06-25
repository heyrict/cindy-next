import styled from 'theme/styled';
import {
  flexbox,
  space,
  borders,
  color,
  layout,
  SpaceProps,
  BordersProps,
} from 'styled-system';
import { LayoutProps, FlexboxProps, ColorProps } from './types';

const Flex = styled.div<
  SpaceProps & FlexboxProps & BordersProps & ColorProps & LayoutProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  ${flexbox}
  ${space}
  ${borders}
  ${color}
  ${layout}
`;

export default Flex;
