import styled from 'theme/styled';
import {
  space,
  color,
  typography,
  border,
  layout,
  overflow,
  SpaceProps,
  ColorProps,
  TypographyProps,
  BorderProps,
  LayoutProps,
  OverflowProps,
} from 'styled-system';

const Box = styled<
  'div',
  SpaceProps &
    ColorProps &
    TypographyProps &
    BorderProps &
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
`;

export default Box;
