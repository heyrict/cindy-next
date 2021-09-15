import styled from 'theme/styled';

const Page = styled.div`
  margin-left: ${p => p.theme.sizes.chatXL};
  padding-top: ${p => p.theme.sizes.toolbar};
  min-height: calc(100vh - ${p => p.theme.sizes.toolbar});
  overflow-y: hidden;
  overflow-x: auto;
  ${p => p.theme.mediaQueries.large} {
    margin-left: ${p => p.theme.sizes.chatLG};
  }
  ${p => p.theme.mediaQueries.medium} {
    margin-left: 0;
    width: 100%;
  }
  display: flex;
  flex-direction: column;
`;

export default Page;
