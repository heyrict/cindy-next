import React from 'react';
import { DEFAULT_LOCALE } from 'settings';

import { useSelector } from 'react-redux';
import * as settingReducer from 'reducers/setting';

import { StateType } from 'reducers/types';
import { Pre } from './styles';
import { QuoteBiblatexProps } from './types';

const QuoteBiblatex = ({ user, created, title }: QuoteBiblatexProps) => {
  const language = useSelector(
    (state: StateType) => settingReducer.rootSelector(state).language,
  );
  const createdTime = new Date(created);
  const now = new Date();
  return (
    <Pre>
      <code>
        {`@online{${user.nickname}${createdTime.toISOString().slice(0, 10)},
  type = {Forum},
  title = {${title}},
  shorttitle = {${title}},
  author = {{${user.nickname}}},
  date = {${createdTime.toISOString().slice(0, 10)}},
  url = {${
    process.browser && window && window.location ? window.location.href : ''
  }},
  urldate = {${now.toISOString().slice(0, 10)}},
  langid = {${language || DEFAULT_LOCALE}},
  organization = {{Cindy (https://www.cindythink.com/)}}
}`}
      </code>
    </Pre>
  );
};

export default QuoteBiblatex;
