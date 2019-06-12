import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { Box, Panel } from 'components/General';
import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';

import { FormattedMessage, FormattedTime } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';

import { text2md } from 'common';
import { widthSplits } from './constants';

const Label = styled.span`
  padding: 5px;
  color: #4877d7;
`;

const RightBox = styled(Box)`
  text-align: right;
`;

const ContentBox = styled(Box)`
  overflow-x: auto;
  font-size: 1.2em;
`;

function ContentsFrame(props) {
  const { text, anonymous, status, user, created, solved } = props;
  const shouldHideIdentity = anonymous && status === 0;

  return (
    <Panel display="block" width={1} mx={widthSplits[2]} my={3}>
      {typeof props.text === 'string' ? (
        <ContentBox
          px={2}
          dangerouslySetInnerHTML={{ __html: text2md(props.text, props.safe) }}
        />
      ) : (
        props.text
      )}
      <br />
      {user && (
        <RightBox>
          <Label>
            <FormattedMessage {...messages.creator} />:
          </Label>
          {shouldHideIdentity ? (
            <AnonymousUserInline user={user} />
          ) : (
            <UserInline user={user} />
          )}
        </RightBox>
      )}
      {created ? (
        <RightBox>
          <Label>
            <FormattedMessage {...puzzleMessages.createdAt} />:{' '}
            <FormattedTime
              value={created}
              year="numeric"
              month="short"
              day="numeric"
            />
          </Label>
        </RightBox>
      ) : null}
      {solved ? (
        <RightBox>
          <Label>
            <FormattedMessage {...puzzleMessages.solvedAt} />:{' '}
            <FormattedTime
              value={solved}
              year="numeric"
              month="short"
              day="numeric"
            />
          </Label>
        </RightBox>
      ) : null}
    </Panel>
  );
}

ContentsFrame.propTypes = {
  text: PropTypes.node.isRequired,
  anonymous: PropTypes.bool,
  status: PropTypes.number,
  user: PropTypes.object,
  created: PropTypes.string,
  solved: PropTypes.string,
};

export default ContentsFrame;