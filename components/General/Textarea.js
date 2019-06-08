import styled from '@emotion/styled';
import { space, width, height, borders, color } from 'styled-system';

const Textarea = styled.textarea`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  background-color: ${p => p.theme.colors.white};
  min-height: 5em;
  padding: ${p => p.theme.space[1]}px;
  flex-grow: 1;
  ${space}
  ${width}
  ${height}
  ${borders}
  ${color}
`;

Textarea.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...borders.propTypes,
  ...color.propTypes,
};

export default Textarea;
