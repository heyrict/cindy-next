import styled from 'theme/styled';
import { space, layout, border, color, SpaceProps } from 'styled-system';
import { ColorProps, LayoutProps, BorderProps } from './types';

const Textarea = styled.textarea<
  SpaceProps & LayoutProps & BorderProps & ColorProps
>`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  background-color: ${p => p.theme.colors.white};
  min-height: 5em;
  max-width: 100%;
  padding: ${p => p.theme.space[1]}px;
  flex-grow: 1;
  ${space}
  ${layout}
  ${border}
  ${color}
`;

export default Textarea;
