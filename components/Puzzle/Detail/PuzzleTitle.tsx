import React from 'react';
import styled from 'theme/styled';

import { GenreText } from 'components/Puzzle/Brief/Genre';
import { YamiText } from 'components/Puzzle/Brief/Yami';

import { PuzzleTitleProps } from './types';

const PuzzleTitleBase = styled.h1`
  font-size: 2.6em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.8em;
  text-align: center;
  width: 100%;
  ${p => p.theme.mediaQueries.small} {
    font-size: 2em;
  }
`;

const PuzzleSubtitleBase = styled.h2`
  font-size: 1.62em;
  text-align: center;
  margin-top: 0;
  margin-bottom: 1em;
  width: 100%;
`;

const PuzzleTitle = ({ title, genre, yami }: PuzzleTitleProps) => (
  <React.Fragment>
    <PuzzleTitleBase>{title}</PuzzleTitleBase>
    <PuzzleSubtitleBase>
      <GenreText genre={genre} /> <YamiText yami={yami} />
    </PuzzleSubtitleBase>
  </React.Fragment>
);

export default PuzzleTitle;
