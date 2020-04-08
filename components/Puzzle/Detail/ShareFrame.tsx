import React from 'react';

import { Box } from 'components/General';
import Share from 'components/Share';

import { useIntl } from 'react-intl';
import shareMessages from 'messages/share';

import { text2raw } from 'common/markdown';
import { widthSplits } from './constants';

import { ShareFrameType } from './types';

const MAXLEN = 70;

const ShareFrame = ({ title, content, solved }: ShareFrameType) => {
  const intl = useIntl();
  const _ = intl.formatMessage;

  let body = text2raw(content);
  if (body.length > MAXLEN) {
    body = `${body.slice(0, MAXLEN)}...`;
  }

  return (
    <Box width={1} textAlign="right" mx={widthSplits[2]} mb={3}>
      {solved ? (
        <Share
          title={_(shareMessages.share_puzzle_solved__title)}
          text={_(shareMessages.share_puzzle_solved__text, {
            title,
            body,
          })}
          hashtags={_(shareMessages.share_puzzle_solved__hashtags)}
        />
      ) : (
        <Share
          title={_(shareMessages.share_puzzle__title)}
          text={_(shareMessages.share_puzzle__text, {
            title,
            body,
          })}
          hashtags={_(shareMessages.share_puzzle__hashtags)}
        />
      )}
    </Box>
  );
};

export default ShareFrame;
