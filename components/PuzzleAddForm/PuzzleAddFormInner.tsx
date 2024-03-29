import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { getMaxDazedDays } from 'settings';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';
import * as globalReducer from 'reducers/global';

import { FormattedMessage, FormattedDate } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';
import commonMessages from 'messages/common';
import puzzleMessages from 'messages/components/puzzle';

import { Flex, Box, Input, ButtonTransparent } from 'components/General';
import ButtonSelect from 'components/ButtonSelect';
import { LegacyEditor } from 'components/PreviewEditor';
import PostPuzzleButton from './PostPuzzleButton';
import PreviewPuzzleDetail from './PreviewPuzzleDetail';
import LicenseButtons from './LicensesButtons';

import { StateType } from 'reducers/types';
import { stampNamespaces } from 'stamps/types';
import { PuzzleAddFormInnerProps, PostPuzzleDetailType } from './types';
import { Genre, Yami } from 'generated/globalTypes';

const ButtonTransparentA = ButtonTransparent.withComponent('a');

const fieldNameStyle = {
  width: [1, 1 / 6],
  textAlign: ['initial', 'center'] as ['initial', 'center'],
  borderWidth: [0, 1],
  mx: [0, -1],
  mb: [0, 3],
  borderStyle: 'solid' as 'solid',
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

const fieldInputStyle = {
  width: 1,
  bg: 'orange.0',
  borderRadius: ['4px', '0 2em 2em 0'],
};

export const PuzzleAddFormInner = ({
  onSubmit,
  confirmCreatePuzzle,
  userId,
}: PuzzleAddFormInnerProps) => {
  const contentEditor = useRef<LegacyEditor>(null);
  const solutionEditor = useRef<LegacyEditor>(null);
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState(Genre.CLASSIC);
  const [yami, setYami] = useState(Yami.NONE);
  const [anonymous, setAnonymous] = useState(false);
  const [grotesque, setGrotesque] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [licenseId, setLicenseId] = useState<null | number>(null);

  const now = new Date();
  const dazedTimeOffset = getMaxDazedDays({
    genre,
    yami,
  });
  now.setDate(now.getDate() + dazedTimeOffset);
  const dazedOn = now.toISOString();

  const _handleGetData = (): PostPuzzleDetailType => {
    if (contentEditor.current === null || solutionEditor.current === null)
      return;
    const content = contentEditor.current.getText();
    const solution = solutionEditor.current.getText();
    if (typeof content === 'string' && typeof solution === 'string') {
      return {
        content,
        solution,
        title,
        genre,
        yami,
        anonymous,
        grotesque,
        licenseId,
      };
    }
  };

  const FormDef = (
    <Flex
      flexWrap="wrap"
      width={1}
      style={{ display: showConfirm ? 'none' : undefined }}
    >
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.title} />
      </Box>
      <Box {...fieldContentStyle}>
        <Input
          {...fieldInputStyle}
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
              key: 'classic',
              value: Genre.CLASSIC,
              label: <FormattedMessage {...puzzleMessages.genre_classic} />,
            },
            {
              key: 'twentyQuestions',
              value: Genre.TWENTY_QUESTIONS,
              label: (
                <FormattedMessage {...puzzleMessages.genre_twentyQuestions} />
              ),
            },
            {
              key: 'littleAlbat',
              value: Genre.LITTLE_ALBAT,
              label: <FormattedMessage {...puzzleMessages.genre_littleAlbat} />,
            },
            {
              key: 'others',
              value: Genre.OTHERS,
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
              key: 'none',
              value: Yami.NONE,
              label: <FormattedMessage {...commonMessages.none} />,
            },
            {
              key: 'yami',
              value: Yami.NORMAL,
              label: <FormattedMessage {...puzzleMessages.yami_yami} />,
            },
            {
              key: 'longtermYami',
              value: Yami.LONGTERM,
              label: <FormattedMessage {...puzzleMessages.yami_longtermYami} />,
            },
          ]}
        />
      </Box>
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.dazedOn} />
      </Box>
      <Box {...fieldContentStyle} ml="3px">
        <Box
          {...fieldInputStyle}
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
              key: 'true',
              value: false,
              label: ' X ',
            },
            {
              key: 'false',
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
              key: 'false',
              value: false,
              label: ' X ',
            },
            {
              key: 'true',
              value: true,
              label: ' O ',
            },
          ]}
        />
      </Box>
      <Box {...selectFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.license} />
      </Box>
      <Box {...fieldContentStyle}>
        <LicenseButtons selected={licenseId} onChange={setLicenseId} />
      </Box>
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.content} />
      </Box>
      <Box {...fieldContentStyle}>
        <LegacyEditor
          showImages
          userId={userId}
          puzzleId={null}
          useNamespaces={[stampNamespaces.puzzle]}
          ref={contentEditor}
        />
      </Box>
      <Box {...inputFieldNameStyle}>
        <FormattedMessage {...puzzleMessages.solution} />
      </Box>
      <Box {...fieldContentStyle}>
        <LegacyEditor
          showImages
          userId={userId}
          puzzleId={null}
          useNamespaces={[stampNamespaces.puzzle]}
          ref={solutionEditor}
        />
      </Box>
    </Flex>
  );

  const PostDef = !confirmCreatePuzzle ? (
    <Box bg="orange.6" my={3} width={1} borderRadius={2}>
      <PostPuzzleButton onSubmit={onSubmit} getData={_handleGetData} />
    </Box>
  ) : showConfirm ? (
    <Flex flexWrap="wrap" width={1}>
      <PreviewPuzzleDetail getData={_handleGetData} />
      <Flex width={1} mt={4}>
        <Box bg="red.6" width={1} borderRadius={2}>
          <ButtonTransparent
            py={2}
            width={1}
            color="red.1"
            onClick={() => setShowConfirm(false)}
          >
            <FormattedMessage {...commonMessages.back} />
          </ButtonTransparent>
        </Box>
        <Box bg="preset.button.bg" width={1} borderRadius={2}>
          <PostPuzzleButton onSubmit={onSubmit} getData={_handleGetData} />
        </Box>
      </Flex>
    </Flex>
  ) : (
    <>
      <Box bg="preset.button.bg" my={3} width={1} borderRadius={2}>
        <ButtonTransparent
          py={2}
          width={1}
          color="preset.button.fg"
          onClick={() => setShowConfirm(true)}
        >
          <FormattedMessage {...puzzleMessages.gotoConfirm} />
        </ButtonTransparent>
      </Box>
    </>
  );

  const ExtraInfoDef = (
    <Box px={2} my={3} width={1} textAlign="center">
      <FormattedMessage
        values={{
          eula: (
            <Link href="/eula" passHref>
              <ButtonTransparentA color="cyan.6">
                <FormattedMessage {...toolbarMessages.eula} />
              </ButtonTransparentA>
            </Link>
          ),
          quiz: (
            <Link href="https://realtimequiz-alpha.netlify.app/" passHref>
              <ButtonTransparentA color="cyan.6">
                <FormattedMessage {...toolbarMessages.utakata} />
              </ButtonTransparentA>
            </Link>
          ),
        }}
        {...puzzleMessages.noneOrigWarn}
      />
    </Box>
  );

  return (
    <Box>
      {ExtraInfoDef}
      {FormDef}
      {PostDef}
    </Box>
  );
};

const mapStateToProps = (state: StateType) => ({
  confirmCreatePuzzle: settingReducer.rootSelector(state).confirmCreatePuzzle,
  userId: globalReducer.rootSelector(state).user.id,
});

const withRedux = connect(mapStateToProps);

export default withRedux(PuzzleAddFormInner);
