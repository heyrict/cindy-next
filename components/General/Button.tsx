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
  color: ${p => p.theme.colors.preset.button.fg};
  background: ${p => p.theme.colors.preset.button.bg};
  overflow: hidden;
  &:hover,
  &:active {
    background-color: ${p => p.theme.colors.preset.button.ac};
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
