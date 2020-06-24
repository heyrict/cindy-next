import React from 'react';

import { Panel, Box, Img } from 'components/General';
import UserCol from 'components/User/UserCol';
import replayIcon from 'svgs/puzzleDetailReplay.svg';

import { ReplayBriefProps } from './types';
import Link from 'next/link';
import { Title, Time } from 'components/Puzzle/Brief';
import { FormattedMessage, FormattedTime } from 'react-intl';
import puzzleMessages from 'messages/components/puzzle';

const ReplayBrief = ({ replay }: ReplayBriefProps) => (
  <Panel alignItems="center" justifyContent="center">
    <UserCol width={[1 / 3, 1 / 5]} user={replay.sui_hei_user} />
    <Box width={[2 / 3, 4 / 5]} px={2}>
      <Img height="xs" src={replayIcon} mr={2} />
      <Link href="/replay/[id]" as={`/replay/${replay.id}`} passHref>
        <Title>{replay.title}</Title>
      </Link>
      <Time width={1} mt={1}>
        <FormattedMessage {...puzzleMessages.createdAt} />:{' '}
        <FormattedTime
          value={replay.created}
          year="numeric"
          month="short"
          day="numeric"
        />
      </Time>
    </Box>
  </Panel>
);

export default ReplayBrief;
