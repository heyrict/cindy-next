import React from 'react';
import Img from 'components/General/Img';
import { FormattedMessage } from 'react-intl';

import { connect } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import classicJp from 'svgs/classicJp.svg';
import twentyQuestionsJp from 'svgs/twentyQuestionsJp.svg';
import littleAlbatJp from 'svgs/littleAlbatJp.svg';
import othersJp from 'svgs/othersJp.svg';

import messages from 'messages/components/puzzle';
import { GenreType } from './types';

export type GenreInnerProps = {
  genre: GenreType;
};

export type GenreProps = {
  showGenreImage: boolean;
} & GenreInnerProps;

export const GenreText = ({ genre }: GenreInnerProps) => {
  switch (genre) {
    case GenreType.Classic:
      return (
        <span>
          [<FormattedMessage {...messages.genre_classic} />]
        </span>
      );
    case GenreType.TwentyQuestions:
      return (
        <span>
          [<FormattedMessage {...messages.genre_twentyQuestions} />]
        </span>
      );
    case GenreType.LittleAlbat:
      return (
        <span>
          [<FormattedMessage {...messages.genre_littleAlbat} />]
        </span>
      );
    case GenreType.Others:
      return (
        <span>
          [<FormattedMessage {...messages.genre_others} />]
        </span>
      );
    default:
      return null;
  }
};

export const GenreImage = ({ genre }: GenreInnerProps) => {
  switch (genre) {
    case GenreType.Classic:
      return <Img size="sm" px={1} src={classicJp} />;
    case GenreType.TwentyQuestions:
      return <Img size="sm" px={1} src={twentyQuestionsJp} />;
    case GenreType.LittleAlbat:
      return <Img size="sm" px={1} src={littleAlbatJp} />;
    case GenreType.Others:
      return <Img size="sm" px={1} src={othersJp} />;
    default:
      return null;
  }
};

export const Genre = ({ genre, showGenreImage }: GenreProps) =>
  showGenreImage ? <GenreImage genre={genre} /> : <GenreText genre={genre} />;

const mapStateToProps = (state: any) => ({
  showGenreImage: settingReducer.rootSelector(state).puzzleGenreImg,
});

const withRedux = connect(mapStateToProps);

export default withRedux(Genre);
