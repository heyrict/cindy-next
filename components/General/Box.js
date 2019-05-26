import styled from '@emotion/styled';
import {
  space,
  color,
  width,
  fontSize,
  borders,
  height,
  minHeight,
  minWidth,
} from 'styled-system';

const Box = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  ${space}
  ${color}
  ${fontSize}
  ${borders}
  ${width}
  ${height}
  ${minHeight}
  ${minWidth}
`;

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
  ...width.propTypes,
  ...height.propTypes,
  ...minHeight.propTypes,
  ...minWidth.propTypes,
};

export default Box;
