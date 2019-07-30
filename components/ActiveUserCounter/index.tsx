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
    const countNow = yandexUsersReport.data[0].metrics[0];
    const countPrev = yandexUsersReport.data[1].metrics[0];
    count = Math.max(countNow, countPrev);
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
