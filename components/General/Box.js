import styled from 'theme/styled';
import { space, color, fontSize, borders, layout } from 'styled-system';

const Box = styled.div`
  box-sizing: 'border-box';
  min-width: 0;
  ${space}
  ${color}
  ${fontSize}
  ${borders}
  ${layout}
`;

Box.propTypes = {
  ...space.propTypes,
  ...color.propTypes,
  ...fontSize.propTypes,
  ...borders.propTypes,
  ...layout.propTypes,
};

export default Box;
