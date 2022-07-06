import styled from 'theme/styled';
import multiavatar from '@multiavatar/multiavatar';

import { Box, Flex, Img } from 'components/General';
import UserInline from 'components/User/UserInline';
import userIcon from 'svgs/user.svg';

import { useQuery } from '@apollo/client';
import { USER_BRIEF_QUERY } from 'graphql/Queries/User';
import {
  UserBriefQuery,
  UserBriefQueryVariables,
} from 'graphql/Queries/generated/UserBriefQuery';

import { InlineUser } from 'components/User/types';
import {
  IconDisplayDefaultProps,
  IconDisplayProps,
  UserIconDisplayProps,
} from './types';

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
  background: ${p => p.theme.colors.preset.menubar.bg};
  display: none;
  flex-wrap: wrap;
  z-index: 190;
  ${p => p.theme.mediaQueries.large} {
    left: calc(${p => p.theme.sizes.chatLG});
    width: ${p => `calc(100% - ${p.theme.sizes.chatLG} - 4px)`};
    display: flex;
  }
  ${p => p.theme.mediaQueries.medium} {
    left: 0;
    margin-left: 0;
    width: 100%;
    display: flex;
  }
`;

export const ToolbarResponsiveButton = styled(Box)`
  height: ${p => p.theme.sizes.toolbar};
  overflow: hidden;
`;

export const ToolbarDropdownContents = styled.div`
  position: fixed;
  padding: ${p => p.theme.space[1]}px;
  min-width: ${p => p.theme.sizes.toolbuttonMin};
  max-width: ${p => p.theme.sizes.toolbuttonMax};
  background: ${p => p.theme.colors.preset.menubar.bg};
  display: flex;
  flex-direction: column;
  z-index: 190;
  box-shadow: 3px 3px 4px 0 ${p => p.theme.colors.preset.menubar.ac};
`;

export const IconDisplay = ({ user, iconOnly }: IconDisplayProps) => {
  return iconOnly ? (
    user.id && user.nickname ? (
      <UserIconDisplay user={user as InlineUser} iconOnly />
    ) : (
      <Img height="xs" src={userIcon} />
    )
  ) : user.id && user.nickname ? (
    <Box px={1} maxWidth="100px" overflowX="hidden">
      <UserIconDisplay user={user as InlineUser} />
    </Box>
  ) : (
    <Img ml={2} mr={1} src={userIcon} maxHeight="xxs" />
  );
};

IconDisplay.defaultProps = IconDisplayDefaultProps;

export const UserIconDisplay = ({ user, iconOnly }: UserIconDisplayProps) => {
  const { data } = useQuery<UserBriefQuery, UserBriefQueryVariables>(
    USER_BRIEF_QUERY,
    {
      variables: {
        id: user.id,
      },
      fetchPolicy: 'cache-first',
    },
  );
  const userWithIcon = data ? { ...user, ...data.user } : user;

  return iconOnly ? (
    userWithIcon.icon ? (
      userWithIcon.icon.startsWith('multiavatar://') ? (
        <Box
          mr={1}
          size="xs"
          border="1px solid"
          borderRadius={4}
          dangerouslySetInnerHTML={{
            __html: multiavatar(userWithIcon.icon.slice(14), true),
          }}
        />
      ) : (
        <Img
          mr={1}
          size="xs"
          border="1px solid"
          borderRadius={4}
          src={userWithIcon.icon}
        />
      )
    ) : (
      <Img height="xs" src={userIcon} />
    )
  ) : (
    <UserInline user={userWithIcon} unclickable />
  );
};

UserIconDisplay.defaultProps = IconDisplayDefaultProps;
