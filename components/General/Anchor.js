import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { space, maxWidth } from 'styled-system';

const Anchor = styled.a`
  display: inline-block;
  color: ${p => p.theme.colors.ruri};
  overflow-x: hidden;
  overflow-y: hidden;
  &:hover,
  &:active {
    color: ${p => p.theme.colors.chigusa};
  }
  ${space}
  ${maxWidth}
`;

Anchor.propTypes = {
  ...space.propTypes,
  ...maxWidth.propTypes,
};

export default Anchor;
