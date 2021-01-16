export const ITEMS_PER_PAGE = 20;

export const getMonthlyDate = (now: Date) => {
  const temp = new Date(now);
  temp.setDate(1);
  temp.setHours(0);
  temp.setMinutes(0);
  temp.setSeconds(0);
  temp.setMilliseconds(0);
  if (now.getDate() > 15) {
    const end = temp.toISOString();
    temp.setMonth(temp.getMonth() - 1);
    const start = temp.toISOString();
    return [start, end];
  } else {
    temp.setMonth(temp.getMonth() - 1);
    const end = temp.toISOString();
    temp.setMonth(temp.getMonth() - 1);
    const start = temp.toISOString();
    return [start, end];
  }
};

export const getRankingDate = (d?: Date) => {
  let date = d ? new Date(d) : new Date();

  if (date.getDate() > 15) {
    date.setMonth(date.getMonth() - 1);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
    };
  } else {
    date.setMonth(date.getMonth() - 2);
    return {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
    };
  }
};

export const rankingPanelProps = {
  m: 2,
  flexWrap: 'wrap' as 'wrap',
  borderRadius: 2,
  border: '5px double',
  borderColor: 'yellow.8',
  bg: 'yellow.1',
};

export const rankingPanelTitleProps = {
  p: 2,
  fontSize: '1.2em',
  bg: 'yellow.6',
  color: 'yellow.1',
};
