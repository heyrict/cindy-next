import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import Img from 'components/General/Img';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import classicJp from 'svgs/classicJp.svg';
import twentyQuestionsJp from 'svgs/twentyQuestionsJp.svg';
import littleAlbatJp from 'svgs/littleAlbatJp.svg';
import othersJp from 'svgs/othersJp.svg';

import messages from 'messages/components/puzzle';

export const GenreText = ({ genre }) => {
  switch (genre) {
    case 0:
      return (
        <span>
          [<FormattedMessage {...messages.genre_classic} />]
        </span>
      );
    case 1:
      return (
        <span>
          [<FormattedMessage {...messages.genre_twentyQuestions} />]
        </span>
      );
    case 2:
      return (
        <span>
          [<FormattedMessage {...messages.genre_littleAlbat} />]
        </span>
      );
    case 3:
      return (
        <span>
          [<FormattedMessage {...messages.genre_others} />]
        </span>
      );
    default:
      return null;
  }
};

export const GenreImage = ({ genre }) => {
  switch (genre) {
    case 0:
      return <Img size="sm" px={1} src={classicJp} />;
    case 1:
      return <Img size="sm" px={1} src={twentyQuestionsJp} />;
    case 2:
      return <Img size="sm" px={1} src={littleAlbatJp} />;
    case 3:
      return <Img size="sm" px={1} src={othersJp} />;
    default:
      return null;
  }
};

export const Genre = ({ genre, showGenreImage }) =>
  showGenreImage ? <GenreImage genre={genre} /> : <GenreText genre={genre} />;

Genre.propTypes = {
  genre: PropTypes.number.isRequired,
  showGenreImage: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Genre);
