import styled from '@emotion/styled';
import { fontSize } from 'styled-system';

const Heading = styled.div`
  color: ${p => p.theme.colors.kogecha};
  margin-left: 1.2em;
  margin-bottom: 1em;
  padding-top: 0.8em;
  ${fontSize}
`;

Heading.propTypes = {
  ...fontSize.propTypes,
};

Heading.defaultProps = {
  fontSize: 6,
};

export default Heading;
