import React, { useState, useEffect } from 'react';
import { Link } from 'routes';
import { toast } from 'react-toastify';
import { text2raw } from 'common/markdown';

import { Query } from 'react-apollo';
import { USER_BRIEF_EXTRA_QUERY } from 'graphql/Queries/User';

import { Manager, Reference, Popper } from 'react-popper';
import { Anchor, Flex, Box, ButtonTransparent, Img } from 'components/General';
import homeIcon from 'svgs/home.svg';
import messageIcon from 'svgs/message.svg';

import { FormattedTime, FormattedMessage } from 'react-intl';
import authMessages from 'messages/components/auth';

import { UserBriefProfileProps } from './types';
import {
  UserBriefExtraQuery,
  UserBriefExtraQueryVariables,
} from 'graphql/Queries/generated/UserBriefExtraQuery';

const AnchorButton = Anchor.withComponent('button');
const ButtonTransparentA = ButtonTransparent.withComponent('a');

let blurHdl = null as number | null;

const UserBriefProfile = ({ user }: UserBriefProfileProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => { // Clear timeout before unmount
    return () => {
      if (blurHdl) window.clearTimeout(blurHdl);
    }
  }, [])

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <AnchorButton
            ref={ref}
            maxWidth="12em"
            onFocus={() => setShow(true)}
            onBlur={() =>
              window.setTimeout(() => {
                setShow(false);
              }, 100)
            }
          >
            {user.nickname}
          </AnchorButton>
        )}
      </Reference>
      {show && (
        <Popper placement="top">
          {({ ref, style, placement, arrowProps }) => (
            <Flex
              flexWrap="wrap"
              bg="orange.3"
              borderRadius={1}
              p={2}
              maxWidth="500px"
              ref={ref}
              style={{
                ...style,
                zIndex: 12,
              }}
              data-placement={placement}
            >
              <Box mt={2} mb={1} width={1}>
                {user.nickname}
                {user.sui_hei_current_useraward && (
                  <span>
                    [{user.sui_hei_current_useraward.sui_hei_award.name}]
                  </span>
                )}
              </Box>
              <Query<UserBriefExtraQuery, UserBriefExtraQueryVariables>
                query={USER_BRIEF_EXTRA_QUERY}
                variables={{ id: user.id }}
              >
                {({ loading, data, error }) => {
                  if (loading) return <span>...</span>;
                  if (error) {
                    toast.error(error.message);
                    return null;
                  }
                  if (!data || !data.sui_hei_user_by_pk) return null;
                  return (
                    <React.Fragment>
                      <Flex width={1} flexWrap="wrap" color="gray.8">
                        <Box mx="auto" minWidth="12em">
                          <FormattedMessage {...authMessages.date_joined} />
                        </Box>
                        <Box mx="auto">
                          <FormattedTime
                            value={data.sui_hei_user_by_pk.date_joined}
                            year="numeric"
                            month="short"
                            day="numeric"
                          />
                        </Box>
                      </Flex>
                      <Flex width={1} flexWrap="wrap" color="gray.8">
                        <Box mx="auto" minWidth="12em">
                          <FormattedMessage {...authMessages.last_login} />
                        </Box>
                        <Box mx="auto">
                          <FormattedTime
                            value={data.sui_hei_user_by_pk.last_login}
                            year="numeric"
                            month="short"
                            day="numeric"
                          />
                        </Box>
                      </Flex>
                      {data.sui_hei_user_by_pk.profile && (
                        <Box
                          width={1}
                          borderY="1px solid"
                          fontSize="12px"
                          maxHeight="120px"
                          textAlign="left"
                          overflow="hidden"
                          py={1}
                          dangerouslySetInnerHTML={{
                            __html: text2raw(
                              data.sui_hei_user_by_pk.profile,
                            ).replace(/\n/g, '<br />'),
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                }}
              </Query>
              <Flex width={1} mt={2}>
                <Link to="user" params={{ id: user.id }} passHref>
                  <ButtonTransparentA px={1}>
                    <Img height="xxs" src={homeIcon} alt="profile" />
                  </ButtonTransparentA>
                </Link>
                <ButtonTransparentA px={1}>
                  <Img height="xxs" src={messageIcon} alt="profile" />
                </ButtonTransparentA>
              </Flex>
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </Flex>
          )}
        </Popper>
      )}
    </Manager>
  );
};

export default UserBriefProfile;
