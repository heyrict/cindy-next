import styled from 'theme/styled';
import {
  flexbox,
  space,
  border,
  color,
  layout,
  SpaceProps,
  FlexboxProps,
  BorderProps,
  ColorProps,
  LayoutProps,
} from 'styled-system';

const Flex = styled<
  'div',
  SpaceProps & FlexboxProps & BorderProps & ColorProps & LayoutProps
>('div')`
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
