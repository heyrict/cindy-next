import { Genre, Yami, Status } from 'generated/globalTypes';

export let PuzzleStatusChoices = [
  { id: Status.UNDERGOING, name: 'UNDERGOING' },
  { id: Status.SOLVED, name: 'SOLVED' },
  { id: Status.DAZED, name: 'DAZED' },
  { id: Status.HIDDEN, name: 'HIDDEN' },
  { id: Status.FORCE_HIDDEN, name: 'FORCE_HIDDEN' },
];

export let PuzzleGenreChoices = [
  { id: Genre.CLASSIC, name: 'CLASSIC' },
  { id: Genre.LITTLE_ALBAT, name: 'LITTLE_ALBAT' },
  { id: Genre.OTHERS, name: 'OTHERS' },
  { id: Genre.TWENTY_QUESTIONS, name: 'TWENTY_QUESTIONS' },
];

export let PuzzleYamiChoices = [
  { id: Yami.LONGTERM, name: 'LONGTERM' },
  { id: Yami.NONE, name: 'NONE' },
  { id: Yami.NORMAL, name: 'NORMAL' },
];
