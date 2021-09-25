import React from 'react';

import styled from 'theme/styled';
import { Box, Panel, ButtonTransparent } from 'components/General';
import UserInline from 'components/User/UserInline';
import { AnonymousUserInline } from 'components/User/Anonymous';

import { FormattedMessage, FormattedTime } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';

import { text2md } from 'common/markdown';
import { widthSplits } from './constants';

import { ContentsFrameType } from './types';
import { Status } from 'generated/globalTypes';
import QuoteBox from './QuoteBox';
import Tooltip from 'components/Hoc/Tooltip';

const QuoteDetails = styled.details`
  margin-top: ${styles => styles.theme.space[2]}px;
  background: rgba(0, 0, 0, 0.1);
  font-size: 0.8em;
  border-radius: ${styles => styles.theme.radii[2]}px;
`;

const QuoteSummary = styled.summary`
  ::marker {
    content: '“';
    font-size: 2em;
  }
  cursor: help;
`;

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

const ButtonTransparentA = ButtonTransparent.withComponent('a');

function ContentsFrame(props: ContentsFrameType) {
  const { title, text, anonymous, status, user, created, solved, license, contentImage } =
    props;
  const shouldHideIdentity = anonymous && status === Status.UNDERGOING;

  let imgBase64 = '';
  if(contentImage) {
    const buffer = new Uint8Array(contentImage);
    imgBase64 = 'data:image/png;base64,' + Buffer.from(buffer).toString('base64');  
  }

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

      {imgBase64 ? (
        <img 
          src={imgBase64} />
      ): null}

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

      {license !== undefined && title && created && user && (
        <QuoteDetails>
          <QuoteSummary>
            {license ? (
              <FormattedMessage
                {...puzzleMessages.licenseSummary}
                values={{
                  license: (
                    <Tooltip
                      referenceStyles={{ display: 'inline-block' }}
                      reference={
                        license.url ? (
                          <ButtonTransparentA href={license.url}>
                            {license.name}
                          </ButtonTransparentA>
                        ) : (
                          license.name
                        )
                      }
                      tooltip={
                        <div
                          dangerouslySetInnerHTML={{
                            __html: text2md(license.description),
                          }}
                        />
                      }
                      delay={800}
                    />
                  ),
                }}
              />
            ) : (
              <FormattedMessage
                {...puzzleMessages.allRightsReserved}
                values={{
                  year: new Date(created).getFullYear(),
                  user: user.nickname,
                }}
              />
            )}
          </QuoteSummary>
          <QuoteBox
            title={title}
            created={created}
            user={user}
          />
        </QuoteDetails>
      )}
    </Panel>
  );
}

export default ContentsFrame;
