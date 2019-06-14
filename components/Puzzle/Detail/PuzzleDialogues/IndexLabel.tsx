import styled from 'theme/styled';

const IndexLabel = styled.span`
  color: ${p => p.theme.colors.blue[6]};
  font-weight: bold;
  margin: ${p => p.theme.space[1]} 0;
  &:after {
    content: '»';
    display: inline-block;
    color: ${p => p.theme.colors.blue[6]};
  }
`;

export default IndexLabel;
