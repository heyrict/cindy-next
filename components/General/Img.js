import styled from 'theme/styled';
import { space, borders, layout } from 'styled-system';

const Img = styled.img`
  overflow: hidden;
  vertical-align: middle;
  ${layout}
  ${space}
  ${borders}
`;

Img.propTypes = {
  ...layout.propTypes,
  ...space.propTypes,
  ...borders.propTypes,
};

export default Img;
