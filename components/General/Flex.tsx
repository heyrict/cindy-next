import styled from 'theme/styled';
import {
  flexbox,
  space,
  border,
  color,
  layout,
  SpaceProps,
} from 'styled-system';
import { LayoutProps, FlexboxProps, ColorProps, BorderProps } from './types';

const Flex = styled.div<
  SpaceProps & FlexboxProps & BorderProps & ColorProps & LayoutProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  display: flex;
  ${flexbox}
  ${space}
  ${border}
  ${color}
  ${layout}
`;

export default Flex;
