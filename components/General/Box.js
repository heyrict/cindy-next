import styled from '@emotion/styled';
import { space, color, width, fontSize, borders, height } from 'styled-system';

const Box = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  ${space}
  ${color}
  ${fontSize}
  ${borders}
  ${width}
  ${height}
`;

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
  ...width.propTypes,
  ...height.propTypes,
};

export default Box;
