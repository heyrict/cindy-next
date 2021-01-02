import React from 'react';

import styled from 'theme/styled';
import { Box, Panel } from 'components/General';
import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';

import { FormattedMessage, FormattedTime } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';

import { text2md } from 'common/markdown';
import { widthSplits } from './constants';

import { ContentsFrameType } from './types';
import {Status} from 'generated/globalTypes';

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

function ContentsFrame(props: ContentsFrameType) {
  const { text, anonymous, status, user, created, solved } = props;
  const shouldHideIdentity = anonymous && status === Status.UNDERGOING;

  return (
    <Panel display="block" width={1} mx={widthSplits[2]} my={3}>
      {typeof text === 'string' ? (
        <ContentBox
          px={2}
          dangerouslySetInnerHTML={{ __html: text2md(text) }}
        />
      ) : (
        text
      )}
      <br />
      {user && (
        <RightBox>
          <Label>
            <FormattedMessage {...messages.creator} />:
          </Label>
          {shouldHideIdentity ? (
            <AnonymousUserInline />
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

export default ContentsFrame;
