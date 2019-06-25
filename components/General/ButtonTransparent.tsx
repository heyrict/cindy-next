import styled from 'theme/styled';
import {
  space,
  color,
  width,
  fontSize,
  fontWeight,
  borders,
  height,
  SpaceProps,
  FontSizeProps,
  BordersProps,
} from 'styled-system';
import { ColorProps, LayoutProps } from './types';

const ButtonTransparent = styled.button<
  SpaceProps & ColorProps & FontSizeProps & BordersProps & LayoutProps
>`
  background-color: transparent;
  overflow: hidden;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  ${space}
  ${width}
  ${height}
  ${color}
  ${fontSize}
  ${fontWeight}
  ${borders}

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default ButtonTransparent;
