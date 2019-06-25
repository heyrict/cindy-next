import styled from 'theme/styled';
import {
  space,
  color,
  fontSize,
  borders,
  layout,
  SpaceProps,
  FontSizeProps,
  BordersProps,
} from 'styled-system';
import { ColorProps, LayoutProps } from './types';

const Button = styled.button<
  SpaceProps & ColorProps & FontSizeProps & BordersProps & LayoutProps
>`
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
  ${fontSize}
  ${borders}
`;

export default Button;
