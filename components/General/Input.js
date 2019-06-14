import styled from 'theme/styled';
import { space, width, height, borders, color } from 'styled-system';

const Input = styled.input`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.orange[5]};
  border-style: solid;
  background-color: ${p => p.theme.colors.white};
  min-height: 1.5em;
  flex-grow: 1;
  ${space}
  ${width}
  ${height}
  ${borders}
  ${color}
`;

Input.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...borders.propTypes,
  ...color.propTypes,
};

export default Input;
