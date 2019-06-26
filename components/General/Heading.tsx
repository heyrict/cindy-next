import styled from 'theme/styled';
import { typography } from 'styled-system';
import { HeadingDefaultProps, TypographyProps } from './types';

const Heading = styled.div<TypographyProps>`
  color: ${p => p.theme.colors.red[9]};
  margin-left: 1.2em;
  margin-bottom: 0.6em;
  padding-top: 0.8em;
  ${p => p.theme.mediaQueries.small} {
    margin-left: 0.6em;
    padding-top: 0.4em;
    margin-bottom: 0.3em;
  }
  ${typography}
`;

Heading.defaultProps = HeadingDefaultProps;

export default Heading;
