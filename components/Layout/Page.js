import styled from '@emotion/styled';

const Page = styled.div`
  margin-left: ${p => p.theme.sizes.chat};
  margin-top: ${p => p.theme.sizes.toolbar};
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  ${p => p.theme.mediaQueries.medium} {
    margin-left: 0;
    width: 100%;
  }
`;

export default Page;
