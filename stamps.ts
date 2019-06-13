const stampA = '/static/stamps/A.png';
const stampQ = '/static/stamps/Q.png';
const stampANeko = '/static/stamps/A-neko.png';
const stampQNeko = '/static/stamps/Q-neko.png';
const stampHint = '/static/stamps/hint.png';

const stampGJ = '/static/stamps/GJ.png';
const stampSanka = '/static/stamps/sanka.png';
const stampPekori = '/static/stamps/pekori.png';
const stampTanoshi = '/static/stamps/tanoshi.png';
const stampYodare = '/static/stamps/yodare.png';
const stampNanto = '/static/stamps/nanto.png';
const stampSounan = '/static/stamps/sounan.png';
const stampItadaku = '/static/stamps/itadaku.png';
const stampChira = '/static/stamps/chira.png';
const stampDeath = '/static/stamps/death.png';
const stampGotisou = '/static/stamps/gotisousama.png';
const stampMannenn = '/static/stamps/mannennhuta.png';
const stampArigatou = '/static/stamps/arigatou.png';

const m = (_alt: string, src: string) =>
  `<img class="cindy-stamp-middle" alt="stamp" src="${src}" />`;

export interface Stamps {
  [key: string]: string;
}

export const kameoStamps = {
  'stamp-gj': stampGJ,
  'stamp-sanka': stampSanka,
  'stamp-tanoshi': stampTanoshi,
  'stamp-pekori': stampPekori,
  'stamp-yodare': stampYodare,
  'stamp-nanto': stampNanto,
};

export const chefStamps = {
  'stamp-sounan': stampSounan,
  'stamp-itadaku': stampItadaku,
  'stamp-chira': stampChira,
  'stamp-death': stampDeath,
  'stamp-gotisou': stampGotisou,
  'stamp-mannenn': stampMannenn,
  'stamp-arigatou': stampArigatou,
};

export const puzzleStamps = {
  'stamp-q': stampQ,
  'stamp-a': stampA,
  'stamp-q-neko': stampQNeko,
  'stamp-a-neko': stampANeko,
  'stamp-hint': stampHint,
};

export const allStamps = {
  ...kameoStamps,
  ...chefStamps,
  ...puzzleStamps,
};

const stampDefs = {
  'stamp-a': m('stamp-a', stampA),
  'stamp-q': m('stamp-q', stampQ),
  'stamp-q-neko': m('stamp-q-neko', stampQNeko),
  'stamp-a-neko': m('stamp-a-neko', stampANeko),
  'stamp-hint': m('stamp-hint', stampHint),
  'stamp-gj': m('stamp-gj', stampGJ),
  'stamp-sanka': m('stamp-sanka', stampSanka),
  'stamp-tanoshi': m('stamp-tanishi', stampTanoshi),
  'stamp-pekori': m('stamp-pekori', stampPekori),
  'stamp-yodare': m('stamp-yodare', stampYodare),
  'stamp-nanto': m('stamp-nanto', stampNanto),
  'stamp-sounan': m('stamp-sounan', stampSounan),
  'stamp-itadaku': m('stamp-itadaku', stampItadaku),
  'stamp-chira': m('stamp-chira', stampChira),
  'stamp-death': m('stamp-death', stampDeath),
  'stamp-gotisou': m('stamp-gotisou', stampGotisou),
  'stamp-mannenn': m('stamp-mannenn', stampMannenn),
  'stamp-arigatou': m('stamp-arigatou', stampArigatou),
};

export default stampDefs;
