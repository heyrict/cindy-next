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

const EditTimeSpan = styled.span<
  SpaceProps & ColorProps & TypographyProps & BorderProps & LayoutProps
>`
  box-sizing: 'border-box';
  min-width: 0;
  margin-left: ${p => p.theme.space[1]}px;
  color: ${p => p.theme.colors.gray[6]};
  font-size: 0.8em;
  ${space}
  ${color}
  ${typography}
  ${border}
  ${layout}
`;

export default EditTimeSpan;
