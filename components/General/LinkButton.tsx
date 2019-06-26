import styled from 'theme/styled';
import {
  space,
  color,
  layout,
  typography,
  border,
  SpaceProps,
} from 'styled-system';
import { ColorProps, LayoutProps, TypographyProps, BorderProps } from './types';

const LinkButton = styled.a<
  SpaceProps & ColorProps & LayoutProps & TypographyProps & BorderProps
>`
  display: block;
  background-color: ${p => p.theme.colors.blue[6]};
  ${space}
  ${color}
  ${layout}
  ${typography}
  ${border}
`;

export default LinkButton;
