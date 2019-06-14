import styled from 'theme/styled';

const Page = styled.div`
  margin-left: ${p => p.theme.sizes.chatXL};
  margin-top: ${p => p.theme.sizes.toolbar};
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  ${p => p.theme.mediaQueries.large} {
    margin-left: ${p => p.theme.sizes.chatLG};
  }
  ${p => p.theme.mediaQueries.medium} {
    margin-left: 0;
    width: 100%;
  }
`;

export default Page;
