import MarkdownIt from 'markdown-it';
import mdEmoji from 'markdown-it-emoji/light';
import mdEmojiLight from 'markdown-it-emoji/lib/data/light.json';
import DOMPurify from 'dompurify';

import stampDefs from 'stamps';

import normTabs from './plugin-tabs';
import { normLinkHook, normLink } from './plugin-link';
import normCountdown from './plugin-countdown';

export { changeTabularTab } from './plugin-tabs.js';

const DOMPurifyParams = {
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|chat):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
  FORCE_BODY: true,
};

if (DOMPurify.isSupported) {
  DOMPurify.addHook('afterSanitizeAttributes', normLinkHook);
}

const HtmlPurify = (html, config) =>
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

const PreNorm = string => {
  return normTabs(string);
};

const PostNorm = string => {
  if (!HtmlPurify.isSupported) {
    return normLink(string);
  }
  return string;
};

export const line2md = string => {
  const mdEscape = MarkdownIt({
    html: false,
    breaks: true,
    linkify: true,
    typographer: true,
  })
    .enable(['table', 'strikethrough'])
    .use(mdEmoji, {
      defs: Object.assign({}, mdEmojiLight, stampDefs),
    });

  const rendered = mdEscape
    .render(string)
    .replace(/<p>/g, '')
    .replace(/<\/p>\s*$/g, '')
    .replace(/<\/p>/g, '<br style="margin-bottom: 10px" />');
  const purified = HtmlPurify(rendered, DOMPurifyParams);
  return PostNorm(purified);
};

export const text2md = string => {
  const rendered = md.render(PreNorm(string));
  const purified = HtmlPurify(rendered, DOMPurifyParams);
  return PostNorm(purified);
};
