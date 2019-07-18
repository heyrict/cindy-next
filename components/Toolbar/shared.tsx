import styled from 'theme/styled';
import { Box, Flex } from 'components/General';

export const ToolbarFlex = styled(Flex)`
  height: ${p => p.theme.sizes.toolbar};
  text-align: center;
  overflow-x: auto;
  overflow-y: hidden;
`;

export const ToolbarButton = styled(Box)`
  min-width: ${p => p.theme.sizes.toolbuttonMin};
  max-width: ${p => p.theme.sizes.toolbuttonMax};
  height: ${p => p.theme.sizes.toolbar};
  overflow: hidden;
`;

export const ToolbarDisplayGeneral = styled.div`
  display: block;
  ${p => p.theme.mediaQueries.large} {
    display: none;
  }
  ${p => p.theme.mediaQueries.medium} {
    display: block;
  }
  ${p => p.theme.mediaQueries.small} {
    display: none;
  }
`;

export const ToolbarDisplayResponsive = styled.div`
  display: none;
  ${p => p.theme.mediaQueries.large} {
    display: block;
  }
  ${p => p.theme.mediaQueries.medium} {
    display: none;
  }
  ${p => p.theme.mediaQueries.small} {
    display: block;
  }
`;

export const ToolbarResponsiveContents = styled.div`
  position: fixed;
  top: ${p => p.theme.sizes.toolbar};
  left: calc(${p => p.theme.sizes.chatXL});
  width: ${p => `calc(100% - ${p.theme.sizes.chatXL} - 4px)`};
  right: 0;
  background: ${p => p.theme.colors.orange[2]};
  display: flex;
  flex-wrap: wrap;
  ${p => p.theme.mediaQueries.large} {
    left: calc(${p => p.theme.sizes.chatLG});
    width: ${p => `calc(100% - ${p.theme.sizes.chatLG} - 4px)`};
  }
  ${p => p.theme.mediaQueries.medium} {
    left: 0;
    margin-left: 0;
    width: 100%;
  }
`;

export const ToolbarResponsiveButton = styled(Box)`
  height: ${p => p.theme.sizes.toolbar};
  overflow: hidden;
`;

export const ToolbarDropdownContents = styled.div`
  position: fixed;
  top: ${p => p.theme.sizes.toolbar};
  right: 0;
  min-width: ${p => p.theme.sizes.toolbuttonMin};
  max-width: ${p => p.theme.sizes.toolbuttonMax};
  background: ${p => p.theme.colors.orange[2]};
  display: flex;
  flex-direction: column;
`;
