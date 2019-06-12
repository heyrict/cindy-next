import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import messages from 'messages/pages/add_puzzle';
import commonMessages from 'messages/common';
import puzzleMessages from 'messages/components/puzzle';

import { Mutation } from 'react-apollo';
import { AddPuzzleMutation } from 'graphql/Mutations/Puzzle';

import { Flex, Box, Input } from 'components/General';
import ButtonSelect from 'components/ButtonSelect';
import PreviewEditor from 'components/PreviewEditor';

export const PuzzleAddFormInner = () => {
  const contentEditor = React.createRef();
  const solutionEditor = React.createRef();
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(0);
  const [yami, setYami] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [grotesque, setGrotesque] = useState(false);

  return (
    <Box px={[2, 3]} py={3}>
      <Flex flexWrap="wrap" width={1}>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 3]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em 0 0 2em"
        >
          <FormattedMessage {...puzzleMessages.title} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <Input
            width={1}
            value={title}
            onChange={e => setTitle(e.target.value)}
            bg="orange.0"
            borderRadius={['2em', '0 2em 2em 0']}
          />
        </Box>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 3]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em"
        >
          <FormattedMessage {...puzzleMessages.genre} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <ButtonSelect
            width={1}
            flexProps={{ px: 2 }}
            value={genre}
            onChange={option => setGenre(option.value)}
            options={[
              {
                value: 0,
                label: <FormattedMessage {...puzzleMessages.genre_classic} />,
              },
              {
                value: 1,
                label: (
                  <FormattedMessage {...puzzleMessages.genre_twentyQuestions} />
                ),
              },
              {
                value: 2,
                label: (
                  <FormattedMessage {...puzzleMessages.genre_littleAlbat} />
                ),
              },
              {
                value: 3,
                label: <FormattedMessage {...puzzleMessages.genre_others} />,
              },
            ]}
          />
        </Box>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 3]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em"
        >
          <FormattedMessage {...puzzleMessages.yami} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <ButtonSelect
            width={1}
            flexProps={{ px: 2 }}
            value={yami}
            onChange={option => setYami(option.value)}
            options={[
              {
                value: 0,
                label: <FormattedMessage {...commonMessages.none} />,
              },
              {
                value: 1,
                label: <FormattedMessage {...puzzleMessages.yami_yami} />,
              },
              {
                value: 2,
                label: (
                  <FormattedMessage {...puzzleMessages.yami_longtermYami} />
                ),
              },
            ]}
          />
        </Box>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 3]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em"
        >
          <FormattedMessage {...puzzleMessages.anonymous} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <ButtonSelect
            width={1}
            flexProps={{ px: 2 }}
            value={anonymous}
            onChange={option => setAnonymous(option.value)}
            options={[
              {
                value: false,
                label: ' X ',
              },
              {
                value: true,
                label: ' O ',
              },
            ]}
          />
        </Box>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 2]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em"
        >
          <FormattedMessage {...puzzleMessages.grotesque} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <ButtonSelect
            width={1}
            flexProps={{ px: 2 }}
            value={grotesque}
            onChange={option => setGrotesque(option.value)}
            options={[
              {
                value: false,
                label: ' X ',
              },
              {
                value: true,
                label: ' O ',
              },
            ]}
          />
        </Box>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 3]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em 0 0 2em"
        >
          <FormattedMessage {...puzzleMessages.content} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <PreviewEditor useNamespaces={['puzzle']} ref={contentEditor} />
        </Box>
        <Box
          width={[1, 1 / 6]}
          textAlign={['initial', 'center']}
          borderWidth={[0, 1]}
          mx={[0, -1]}
          mb={[0, 3]}
          borderStyle="solid"
          borderColor="gray.6"
          borderRadius="2em 0 0 2em"
        >
          <FormattedMessage {...puzzleMessages.solution} />
        </Box>
        <Box width={[1, 3 / 4, 5 / 6]} mb={3}>
          <PreviewEditor useNamespaces={['puzzle']} ref={solutionEditor} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PuzzleAddFormInner;
