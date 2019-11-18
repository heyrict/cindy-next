import styled from 'theme/styled';
import {
  space,
  color,
  typography,
  border,
  layout,
  flexbox,
  overflow,
  SpaceProps,
  ColorProps,
  TypographyProps,
  BorderProps,
  LayoutProps,
  FlexboxProps,
  OverflowProps,
} from 'styled-system';

const Box = styled<
  'div',
  SpaceProps &
    ColorProps &
    TypographyProps &
    BorderProps &
    FlexboxProps &
    LayoutProps &
    OverflowProps
>('div')`
  box-sizing: 'border-box';
  min-width: 0;
  ${space}
  ${color}
  ${typography}
  ${border}
  ${layout}
  ${overflow}
  ${flexbox}
`;

export default Box;
