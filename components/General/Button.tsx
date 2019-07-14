import styled from 'theme/styled';
import {
  space,
  color,
  typography,
  border,
  layout,
  SpaceProps,
  ColorProps,
  TypographyProps,
  BorderProps,
  LayoutProps,
} from 'styled-system';

const Button = styled<
  'button',
  SpaceProps & ColorProps & TypographyProps & BorderProps & LayoutProps
>('button')`
  background-color: ${p => p.theme.colors.orange[6]};
  color: ${p => p.theme.colors.gray[1]};
  overflow: hidden;
  &:hover, &:active {
    background-color: ${p => p.theme.colors.orange[7]};
  }
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${space}
  ${color}
  ${layout}
  ${typography}
  ${border}
`;

export default Button;
