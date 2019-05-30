import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Img } from 'components/General';
import { FormattedMessage, FormattedRelative } from 'react-intl';

const AnonymousBase = styled.div`
  text-align: center;
  border-radius: 10px;
  margin-right: 6px;
  margin-bottom: 3px;
  font-size: 0.9em;
  display: inline-flex;
`;

const Anonymous = () => (
  <AnonymousBase>
    <Img
      size="1.4em"
      border="1px solid"
      borderRadius={4}
      src="/static/images/anonymous.png"
    />
  </AnonymousBase>
);

export default Anonymous;
