import React, { useState } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';
import { Global } from '@emotion/core';
import { globalStyle } from 'components/Layout';
import Flex from 'components/General/Flex';

import UserFilterSwitcher from 'components/Puzzle/Detail/PuzzleDialogues/UserFilterSwitcher';

import { UserFilterSwitcherUserType } from 'components/Puzzle/Detail/PuzzleDialogues/types';

const solvedYamiUsers: Array<UserFilterSwitcherUserType> = [
  {
    id: 1,
    nickname: 'Foo',
    dialogueCount: 12,
    trueAnswer: false,
    answeredDialogueCount: 3,
  },
  {
    id: 2,
    nickname: 'Bar',
    dialogueCount: 3,
    trueAnswer: true,
    answeredDialogueCount: 2,
  },
  {
    id: 3,
    nickname: 'Carrot',
    dialogueCount: 1,
    trueAnswer: false,
    answeredDialogueCount: 1,
  },
];

const unsolvedClassicUsers: Array<UserFilterSwitcherUserType> = [
  {
    id: 1,
    nickname: 'Foo',
    dialogueCount: 12,
    answeredDialogueCount: 10,
    trueAnswer: false,
  },
  {
    id: 2,
    nickname: 'Bar',
    dialogueCount: 3,
    answeredDialogueCount: 3,
    trueAnswer: true,
  },
  {
    id: 3,
    nickname: 'Carrot',
    dialogueCount: 1,
    answeredDialogueCount: 0,
    trueAnswer: false,
  },
];

const UserFilterSwitcherWithState = ({
  users,
}: {
  users: Array<UserFilterSwitcherUserType>;
}) => {
  const [activeUserId, setActiveUserId] = useState<number | undefined>(
    undefined,
  );
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyle} />
      <Flex width={1}>
        <UserFilterSwitcher
          users={users}
          activeUserId={activeUserId}
          onClick={userId => {
            setActiveUserId(userId);
            action('SetActiveUserId')(userId);
          }}
        />
      </Flex>
    </ThemeProvider>
  );
};

storiesOf(
  'Views | UserFilterSwitcher - 問題ページ・ユーザーフィルタリング',
  module,
)
  .add('without dialogueUnsolvedCount | 未解決質問数なし', () => (
    <UserFilterSwitcherWithState users={solvedYamiUsers} />
  ))
  .add('with dialogueUnsolvedCount | 未解決質問数付き', () => (
    <UserFilterSwitcherWithState users={unsolvedClassicUsers} />
  ));
