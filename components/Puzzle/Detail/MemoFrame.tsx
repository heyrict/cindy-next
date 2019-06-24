import React, { useState } from 'react';
import styled from 'theme/styled';

import { Box, Panel, ButtonTransparent, Img } from 'components/General';
import memoIcon from 'svgs/memo.svg';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/puzzle';
import puzzleMessages from 'messages/components/puzzle';

import { text2md } from 'common';
import { widthSplits } from './constants';

import { MemoFrameType } from './types';

function MemoFrame(props: MemoFrameType) {
  const { memo } = props;
  const [show, setShow] = useState(true);

  return (
    <Box
      borderColor="grape.6"
      borderWidth="2px"
      borderStyle="groove"
      borderRadius={1}
      display="block"
      width={1}
      mx={widthSplits[2]}
      mb={4}
    >
      <Box width={1} bg="violet.1">
        <ButtonTransparent
          onClick={() => setShow(!show)}
          color="grape.6"
          borderColor="graphe.6"
          fontSize="1.2em"
          borderBottom={show ? '2px solid' : 'none'}
          width={1}
        >
          <Img size="xs" mr={2} src={memoIcon} alt="Memo" title="memo" />
          <FormattedMessage {...messages.memoFromCreator} />
        </ButtonTransparent>
      </Box>
      {show && (
        <Box px={2} dangerouslySetInnerHTML={{ __html: text2md(memo) }} />
      )}
    </Box>
  );
}

export default MemoFrame;
