import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { FormattedMessage, FormattedRelative } from 'react-intl';

const StarBase = styled.div`
  text-align: center;
  border-radius: 10px;
  padding: 0 6px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  color: ${p => p.theme.colors.white};
  background: ${p => p.theme.colors.violet[6]};
`;

const Star = ({ count, sum }) => (
  <StarBase>
    ★{count}({sum})
  </StarBase>
);

Star.propTypes = {
  count: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
};

export default Star;
