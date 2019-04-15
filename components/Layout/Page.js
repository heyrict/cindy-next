import styled from '@emotion/styled';

const Page = styled.div`
  margin-left: ${p => p.theme.sizes.chat};
  margin-top: ${p => p.theme.sizes.toolbar};
  min-height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
`;

export default Page;
