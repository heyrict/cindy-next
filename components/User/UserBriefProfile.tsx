import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { text2raw } from 'common/markdown';

import { Query } from '@apollo/react-components';
import { USER_BRIEF_EXTRA_QUERY } from 'graphql/Queries/User';

import { connect } from 'react-redux';
import * as directReducer from 'reducers/direct';

import { Manager, Reference, Popper } from 'react-popper';
import { Anchor, Flex, Box, ButtonTransparent, Img } from 'components/General';
import Loading from 'components/General/Loading';
import homeIcon from 'svgs/home.svg';
import messageIcon from 'svgs/message.svg';

import { FormattedTime, FormattedMessage } from 'react-intl';
import authMessages from 'messages/components/auth';

import { UserBriefProfileProps } from './types';
import {
  UserBriefExtraQuery,
  UserBriefExtraQueryVariables,
} from 'graphql/Queries/generated/UserBriefExtraQuery';
import { ActionContentType } from 'reducers/types';

const AnchorButton = Anchor.withComponent('button');
const ButtonTransparentA = ButtonTransparent.withComponent('a');

const UserBriefProfile = ({
  user,
  directChatWithUser,
}: UserBriefProfileProps) => {
  const [show, setShow] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node | null) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node | null)
      ) {
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <AnchorButton
            ref={(r: HTMLButtonElement | null) => {
              ref(r);
              btnRef.current = r;
            }}
            maxWidth="12em"
            onClick={() => setShow(!show)}
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
              ref={(r: HTMLDivElement | null) => {
                ref(r);
                popupRef.current = r;
              }}
              style={{
                ...style,
                zIndex: 12,
              }}
              data-placement={placement}
            >
              <Box mt={2} mb={1} width={1}>
                {user.nickname}
                {user.current_user_award && (
                  <span>[{user.current_user_award.award.name}]</span>
                )}
              </Box>
              <Query<UserBriefExtraQuery, UserBriefExtraQueryVariables>
                query={USER_BRIEF_EXTRA_QUERY}
                variables={{ id: user.id }}
              >
                {({ loading, data, error }) => {
                  if (loading) return <Loading centered />;
                  if (error) {
                    toast.error(error.message);
                    return null;
                  }
                  if (!data || !data.user_by_pk) return null;
                  return (
                    <React.Fragment>
                      <Flex width={1} flexWrap="wrap" color="gray.8">
                        <Box mx="auto" minWidth="12em">
                          <FormattedMessage {...authMessages.date_joined} />
                        </Box>
                        <Box mx="auto">
                          <FormattedTime
                            value={data.user_by_pk.date_joined}
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
                            value={data.user_by_pk.last_login}
                            year="numeric"
                            month="short"
                            day="numeric"
                          />
                        </Box>
                      </Flex>
                      {data.user_by_pk.profile && (
                        <Box
                          width={1}
                          borderY="1px solid"
                          fontSize="12px"
                          maxHeight="120px"
                          textAlign="left"
                          overflow="hidden"
                          py={1}
                          dangerouslySetInnerHTML={{
                            __html: text2raw(data.user_by_pk.profile).replace(
                              /\n/g,
                              '<br />',
                            ),
                          }}
                        />
                      )}
                    </React.Fragment>
                  );
                }}
              </Query>
              <Flex width={1} mt={2}>
                <Link href="/user/[id]" as={`/user/${user.id}`} passHref>
                  <ButtonTransparentA p={1}>
                    <Img height="xxs" src={homeIcon} alt="profile" />
                  </ButtonTransparentA>
                </Link>
                <ButtonTransparent
                  p={1}
                  onClick={() => directChatWithUser(user.id)}
                >
                  <Img height="xxs" src={messageIcon} alt="profile" />
                </ButtonTransparent>
              </Flex>
              <div ref={arrowProps.ref} style={arrowProps.style} />
            </Flex>
          )}
        </Popper>
      )}
    </Manager>
  );
};

const mapDispatchToProps = (dispatch: (action: ActionContentType) => void) => ({
  directChatWithUser: (userId: number) =>
    dispatch(directReducer.actions.directChatWithUser(userId)),
});

const withRedux = connect(
  null,
  mapDispatchToProps,
);

export default withRedux(UserBriefProfile);
