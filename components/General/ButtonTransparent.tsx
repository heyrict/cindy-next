import styled from 'theme/styled';
import {
  space,
  color,
  typography,
  border,
  layout,
  SpaceProps,
} from 'styled-system';
import { ColorProps, LayoutProps, TypographyProps, BorderProps } from './types';

const ButtonTransparent = styled.button<
  SpaceProps & ColorProps & TypographyProps & BorderProps & LayoutProps
>`
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
