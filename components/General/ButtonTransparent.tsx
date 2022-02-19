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

const ButtonTransparent = styled<
  'button',
  SpaceProps & ColorProps & TypographyProps & BorderProps & LayoutProps
>('button')`
  color: ${p => p.theme.colors.black};
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${space}
  ${color}
  ${typography}
  ${layout}
  ${border}

  &:active,
  &:hover {
    background-color: ${p =>
      p.theme.colors.dark_theme
        ? 'rgba(0, 0, 0, 0.15)'
        : 'rgba(255, 255, 255, 0.05)'};
  }
`;

export default ButtonTransparent;
