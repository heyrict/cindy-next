import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { GenreText } from 'components/Puzzle/Brief/Genre';
import { YamiText } from 'components/Puzzle/Brief/Yami';

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

const PuzzleTitle = ({ title, genre, yami }) => (
  <React.Fragment>
    <PuzzleTitleBase>{title}</PuzzleTitleBase>
    <PuzzleSubtitleBase>
      <GenreText genre={genre} /> <YamiText yami={yami} />
    </PuzzleSubtitleBase>
  </React.Fragment>
);

PuzzleTitle.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.number.isRequired,
  yami: PropTypes.number.isRequired,
};

export default PuzzleTitle;
