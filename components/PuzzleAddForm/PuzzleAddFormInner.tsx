import React, { useState, useRef } from 'react';
import { Router } from 'routes';
import { getMaxDazedDays } from 'settings';

import { FormattedMessage, FormattedDate } from 'react-intl';
import messages from 'messages/pages/add_puzzle';
import commonMessages from 'messages/common';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, Box, Input, ButtonTransparent } from 'components/General';
import ButtonSelect from 'components/ButtonSelect';
import PreviewEditor from 'components/PreviewEditor';

import { PuzzleAddFormInnerProps } from './types';

const fieldNameStyle = {
  width: [1, 1 / 6],
  textAlign: ['initial', 'center'],
  borderWidth: [0, 1],
  mx: [0, -1],
  mb: [0, 3],
  borderStyle: 'solid',
  borderColor: 'gray.6',
};

const fieldContentStyle = {
  width: [1, 5 / 6],
  mb: 3,
};

const inputFieldNameStyle = {
  ...fieldNameStyle,
  borderRadius: '2em 0 0 2em',
};

const selectFieldNameStyle = {
  ...fieldNameStyle,
  borderRadius: '2em',
};

const fieldInputStype = {
  width: 1,
  bg: 'orange.0',
  borderRadius: ['4px', '0 2em 2em 0'],
};

export const PuzzleAddFormInner = ({ onSubmit }: PuzzleAddFormInnerProps) => {
  const contentEditor = useRef<PreviewEditor>(null);
  const solutionEditor = useRef<PreviewEditor>(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(0);
  const [yami, setYami] = useState(0);
  const [anonymous, setAnonymous] = useState(false);
  const [grotesque, setGrotesque] = useState(false);
  const now = new Date();
  const dazedTimeOffset = getMaxDazedDays({
    genre,
    yami,
  });
  now.setDate(now.getDate() + dazedTimeOffset);
  const dazedOn = now.toISOString();

  return (
    <Flex flexWrap="wrap" width={1}>
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.title} />
      </Box>
      <Box {...fieldContentStyle}>
        <Input
          {...fieldInputStype}
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
      </Box>
      <Box {...selectFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.genre} />
      </Box>
      <Box {...fieldContentStyle}>
        <ButtonSelect
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
              label: <FormattedMessage {...puzzleMessages.genre_littleAlbat} />,
            },
            {
              value: 3,
              label: <FormattedMessage {...puzzleMessages.genre_others} />,
            },
          ]}
        />
      </Box>
      <Box {...selectFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.yami} />
      </Box>
      <Box {...fieldContentStyle}>
        <ButtonSelect
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
              label: <FormattedMessage {...puzzleMessages.yami_longtermYami} />,
            },
          ]}
        />
      </Box>
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.dazedOn} />
      </Box>
      <Box {...fieldContentStyle}>
        <Box
          {...fieldInputStype}
          py={1}
          borderColor="orange.5"
          borderStyle="solid"
          borderWidth={1}
          color="gray.8"
          bg="gray.2"
        >
          <FormattedDate
            value={dazedOn}
            year="numeric"
            month="short"
            day="numeric"
          />
        </Box>
      </Box>
      <Box {...selectFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.anonymous} />
      </Box>
      <Box {...fieldContentStyle}>
        <ButtonSelect
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
      <Box {...selectFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.grotesque} />
      </Box>
      <Box {...fieldContentStyle}>
        <ButtonSelect
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
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.content} />
      </Box>
      <Box {...fieldContentStyle}>
        <PreviewEditor useNamespaces={['puzzle']} ref={contentEditor} />
      </Box>
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.solution} />
      </Box>
      <Box {...fieldContentStyle}>
        <PreviewEditor useNamespaces={['puzzle']} ref={solutionEditor} />
      </Box>
      <Box bg="orange.6" my={3} width={1} borderRadius={2}>
        <ButtonTransparent
          py={2}
          width={1}
          color="orange.1"
          onClick={() => {
            if (
              contentEditor.current === null ||
              solutionEditor.current === null
            )
              return;
            const content = contentEditor.current.getText();
            const solution = solutionEditor.current.getText();
            if (typeof content === 'string' && typeof solution === 'string') {
              onSubmit({
                content,
                solution,
                title,
                genre,
                yami,
                anonymous,
                grotesque,
                dazedOn,
              }).then(({ data, error }) => {
                if (error) {
                  console.log(error);
                }
                const addedPuzzle = data.insert_sui_hei_puzzle.returning[0];
                Router.pushRoute('puzzle', { id: addedPuzzle.id });
              });
            }
          }}
        >
          <FormattedMessage {...messages.publishPuzzle} />
        </ButtonTransparent>
      </Box>
    </Flex>
  );
};

export default PuzzleAddFormInner;