export const getMonthlyDate = (now: Date) => {
  const temp = new Date(now);
  temp.setUTCDate(1);
  temp.setUTCHours(0);
  temp.setUTCMinutes(0);
  temp.setUTCSeconds(0);
  temp.setUTCMilliseconds(0);
  if (now.getUTCDate() > 15) {
    const end = temp.toISOString();
    temp.setUTCMonth(now.getUTCMonth() - 1);
    const start = temp.toISOString();
    return [start, end];
  } else {
    temp.setUTCMonth(now.getUTCMonth() - 1);
    const end = temp.toISOString();
    temp.setUTCMonth(now.getUTCMonth() - 2);
    const start = temp.toISOString();
    return [start, end];
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
