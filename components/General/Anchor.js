import PropTypes from 'prop-types';
import styled from 'theme/styled';
import { space, maxWidth } from 'styled-system';

const Anchor = styled.a`
  display: inline-block;
  color: ${p => p.theme.colors.blue[6]};
  overflow-x: hidden;
  overflow-y: hidden;
  &:hover,
  &:active {
    color: ${p => p.theme.colors.cyan[6]};
  }
  ${space}
  ${maxWidth}
`;

Anchor.propTypes = {
  ...space.propTypes,
  ...maxWidth.propTypes,
};

export default Anchor;
