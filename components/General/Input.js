import styled from '@emotion/styled';
import { space, width, height, borders } from 'styled-system';

const Input = styled.input`
  box-sizing: 'border-box';
  border-width: 1px;
  border-color: ${p => p.theme.colors.yamabukicha};
  background-color: ${p => p.theme.colors.hakuren};
  min-height: 1.5em;
  ${space}
  ${width}
  ${height}
  ${borders}
`;

Input.propTypes = {
  ...space.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...borders.propTypes,
};

export default Input;
