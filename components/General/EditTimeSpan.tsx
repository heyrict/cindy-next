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

const EditTimeSpan = styled.span<
  SpaceProps & ColorProps & FontSizeProps & BordersProps & LayoutProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  margin-left: ${p => p.theme.space[1]}px;
  color: ${p => p.theme.colors.gray[6]};
  font-size: 0.8em;
  ${space}
  ${color}
  ${fontSize}
  ${borders}
  ${layout}
`;

export default EditTimeSpan;
