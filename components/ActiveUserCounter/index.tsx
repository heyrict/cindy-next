import { connect } from 'react-redux';
import * as globalReducer from 'reducers/global';

import { FormattedMessage } from 'react-intl';
import toolbarMessages from 'messages/components/toolbar';

import { ActiveUserCounterProps } from './types';
import { StateType } from 'reducers/types';

const ActiveUserCounter = ({ yandexUsersReport }: ActiveUserCounterProps) => {
  let count: string | number;
  if (!yandexUsersReport) {
    count = '...';
  } else if (yandexUsersReport.data.length === 0) {
    count = 1;
  } else if (yandexUsersReport.data.length === 1) {
    count = yandexUsersReport.data[0].metrics[0];
  } else {
    count = yandexUsersReport.data[0].metrics[1];
  }

  return (
    <FormattedMessage {...toolbarMessages.usersOnline} values={{ count }} />
  );
};

const mapStateToProps = (state: StateType) => ({
  yandexUsersReport: globalReducer.rootSelector(state).yandexUsersReport,
});

const withRedux = connect(mapStateToProps);

export default withRedux(ActiveUserCounter);
