export const ITEMS_PER_PAGE = 20;

export const getRankingDate = (d?: Date) => {
  let date = d ? new Date(d) : new Date();

  if (date.getDate() > 15) {
    date.setMonth(date.getMonth() - 1);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  } else {
    date.setMonth(date.getMonth() - 2);
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
    };
  }
};

export const rankingPanelProps = {
  m: 2,
  flexWrap: 'wrap' as 'wrap',
  borderRadius: 2,
  border: '5px double',
  borderColor: 'preset.rankingpanel.ac',
  bg: 'preset.rankingpanel.bg',
};

export const rankingPanelTitleProps = {
  p: 2,
  fontSize: '1.2em',
  bg: 'preset.rankingpaneltitle.bg',
  color: 'preset.rankingpaneltitle.fg',
};
