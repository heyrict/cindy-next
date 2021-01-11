import MarkdownIt from 'markdown-it';
import mdEmoji from 'markdown-it-emoji/light';
import mdEmojiLight from 'markdown-it-emoji/lib/data/light.json';
import createDOMPurify from 'dompurify';
import { compose } from 'redux';

import { stampDefs } from 'stamps';

import normTabs from './plugin-tabs';
import { normLinkHook } from './plugin-link';
//import normCountdown from './plugin-countdown';
import normNewline from './plugin-newline';

export { changeTabularTab } from './plugin-tabs';

const REMOVE_HTML_REGEXP = new RegExp('<[^<>\n]+>', 'g');

const DOMPurifyParamsText = {
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|chat):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  FORCE_BODY: true,
};

const DOMPurifyParamsLine = {
  ...DOMPurifyParamsText,
  FORBID_TAGS: [
    'audio',
    'head',
    'math',
    'script',
    'style',
    'template',
    'svg',
    'video',
  ],
};

let DOMPurify = createDOMPurify;
if (!process.browser) {
  const { JSDOM } = require('jsdom');
  const window = new JSDOM('').window;
  DOMPurify = createDOMPurify(window) as any;
}

DOMPurify.addHook('afterSanitizeAttributes', normLinkHook);

const HtmlPurify = (html: string, config: any) =>
  DOMPurify.isSupported ? DOMPurify.sanitize(html, config) : html;

const md = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
  .enable(['table', 'strikethrough'])
  .use(mdEmoji, {
    defs: Object.assign({}, mdEmojiLight, stampDefs),
  });

const PreNorm = (s: string) => {
  return compose(normTabs, normNewline)(s);
};

export const line2md = (s: string) => {
  const rendered = md.render(PreNorm(s));

  // Drop the last </p>, replace other </p>s with line break;
  const purified = HtmlPurify(rendered, DOMPurifyParamsLine);
  const lastPCloseIndex = purified.lastIndexOf('</p>');
  const stripped =
    lastPCloseIndex === -1
      ? purified
      : `${purified.substr(0, lastPCloseIndex)}${purified.substr(
          lastPCloseIndex + 4,
        )}`
          .replace(/<p>/g, '')
          .replace(/<\/p>/g, '<div style="margin-bottom: 1em"></div>');
  return stripped;
};

export const text2md = (s: string) => {
  const rendered = md.render(PreNorm(s));
  const purified = HtmlPurify(rendered, DOMPurifyParamsText);
  return purified;
};

export const text2raw = (s: string) =>
  md
    .render(s)
    .replace(REMOVE_HTML_REGEXP, '')
    .replace(/\s{2,}/, ' ');
