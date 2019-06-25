import styled from 'theme/styled';
import {
  space,
  color,
  width,
  fontSize,
  borders,
  height,
  SpaceProps,
  WidthProps,
  FontSizeProps,
  HeightProps,
  BordersProps,
} from 'styled-system';
import { ColorProps } from './types';

const LinkButton = styled.a<
  SpaceProps &
    ColorProps &
    WidthProps &
    FontSizeProps &
    HeightProps &
    BordersProps
>`
  display: block;
  background-color: ${p => p.theme.colors.blue[6]};
  ${space}
  ${color}
  ${width}
  ${height}
  ${fontSize}
  ${borders}
`;

export default LinkButton;
