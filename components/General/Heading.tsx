import styled from 'theme/styled';
import { typography, space } from 'styled-system';
import { HeadingProps } from './types';

const StyledHeading = styled.div<HeadingProps>`
  color: ${p => p.theme.colors.black};
  margin-left: 50px;
  margin-bottom: 20px;
  padding-top: 30px;
  ${p => p.theme.mediaQueries.small} {
    margin-left: 25px;
    margin-bottom: 10px;
    padding-top: 15px;
  }
  ${typography}
  ${space}
`;

const Heading = ({ fontSize = 6, ...props }: HeadingProps) => (
  <StyledHeading fontSize={fontSize} {...props} />
);

export default Heading;
