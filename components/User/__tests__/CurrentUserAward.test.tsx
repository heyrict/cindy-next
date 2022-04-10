import React from 'react';
import { mount } from 'enzyme';

import { IntlProvider } from 'react-intl';
import { ThemeProvider } from '@emotion/react';
import theme from 'theme/theme';

import CurrentUserAward from '../CurrentUserAward';

const user_award = {
  id: 1,
  created: '2019-01-01T01:00:00Z',
  award: {
    id: 1,
    name: 'Awesome Award',
    description: "It's awesome!",
  },
};

describe('<CurrentUserAward />', () => {
  it('should work out of the box', () => {
    mount(
      <IntlProvider locale="en">
        <ThemeProvider theme={theme}>
          <CurrentUserAward user_award={user_award} />
        </ThemeProvider>
      </IntlProvider>,
    );
  });
});
