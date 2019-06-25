import styled from 'theme/styled';
import { fontSize, FontSizeProps } from 'styled-system';
import { HeadingDefaultProps } from './types';

const Heading = styled.div<FontSizeProps>`
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

Heading.defaultProps = HeadingDefaultProps;

export default Heading;
