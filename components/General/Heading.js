import styled from 'theme/styled';
import { fontSize } from 'styled-system';

const Heading = styled.div`
  color: ${p => p.theme.colors.red[9]};
  margin-left: 1.2em;
  margin-bottom: 0.6em;
  padding-top: 0.8em;
  ${p => p.theme.mediaQueries.small} {
    margin-left: 0.6em;
    padding-top: 0.4em;
    margin-bottom: 0.3em;
  }
  ${fontSize}
`;

Heading.propTypes = {
  ...fontSize.propTypes,
};

Heading.defaultProps = {
  fontSize: 6,
};

export default Heading;
