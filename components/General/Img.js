import styled from '@emotion/styled';
import { space, borders } from 'styled-system';

const Img = styled.img`
  overflow: hidden;
  width: ${p => p.theme.sizes[p.size || 'md'] || p.size};
  ${space}
  ${borders}
`;

Img.propTypes = {
  ...space.propTypes,
  ...borders.propTypes,
};

export default Img;
