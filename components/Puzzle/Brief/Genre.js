import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage } from 'react-intl';

import messages from 'messages/components/puzzle';

const Genre = ({ genre }) => {
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

Genre.propTypes = {
  genre: PropTypes.number.isRequired,
};

export default Genre;
