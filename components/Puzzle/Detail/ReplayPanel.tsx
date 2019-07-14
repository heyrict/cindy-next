import React from 'react';
import styled from 'theme/styled';

import { Box, Flex, Img, Button } from 'components/General';
import Link from 'next/link';

import replayIcon from 'svgs/puzzleDetailReplay.svg';

import { ReplayPanelProps } from './types';

const ReplayButton = styled(Button)`
  background: transparent;
  &:hover {
    background: rgb(0, 0, 0, 0.05);
  }
  &:active {
    background: rgb(0, 0, 0, 0.1);
  }
`.withComponent('a');

const ReplayPanel = ({ puzzleId }: ReplayPanelProps) => {
  return (
    <React.Fragment>
      <Box width={[1, 1 / 2]} mb={2}>
        <Box px={2}>
          <Link href="/add/replay/[id]" as={`/add/replay/${puzzleId}`} passHref>
            <ReplayButton
              width={1}
              height="4em"
              borderWidth={2}
              borderRadius={3}
              bg="transparent"
              borderColor="orange.6"
              borderStyle="solid"
            >
              <Flex alignItems="center" justifyContent="center" p={2}>
                <Img mr={2} size="xs" src={replayIcon} />
                <Box fontSize={3} color="orange.6">
                  Add replay
                </Box>
              </Flex>
            </ReplayButton>
          </Link>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default ReplayPanel;
