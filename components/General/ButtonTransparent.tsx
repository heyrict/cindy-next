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
  background-color: transparent;
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

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default ButtonTransparent;
