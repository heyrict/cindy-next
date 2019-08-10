export const getMonthlyDate = (now: Date) => {
  const temp = new Date(now);
  temp.setDate(1);
  temp.setHours(0);
  temp.setMinutes(0);
  temp.setSeconds(0);
  temp.setMilliseconds(0);
  if (now.getDate() > 15) {
    const end = temp.toISOString();
    temp.setMonth(now.getMonth() - 1);
    const start = temp.toISOString();
    return [start, end];
  } else {
    temp.setMonth(now.getMonth() - 1);
    const end = temp.toISOString();
    temp.setMonth(now.getMonth() - 2);
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
