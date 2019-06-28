import styled from 'theme/styled';

const IndexLabel = styled.div`
  color: ${p => p.theme.colors.blue[6]};
  font-weight: bold;
  margin: ${p => p.theme.space[1]} 0;
  display: inline-flex;
  &:after {
    content: '»';
    display: inline-block;
    color: ${p => p.theme.colors.blue[6]};
  }
`;

export default IndexLabel;
