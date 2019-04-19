import MarkdownIt from 'markdown-it';
import mdEmoji from 'markdown-it-emoji/light';
import mdEmojiLight from 'markdown-it-emoji/lib/data/light.json';
import sanitizeHtml from 'sanitize-html';
import normTabs from './plugin-tabs';
import normLink from './plugin-link';
import normCountdown from './plugin-countdown';

export { changeTabularTab } from './plugin-tabs.js';

const stampDefs = {};

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

export function line2md(string) {
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
  string = PreNorm(string);

  return sanitizeHtml(
    mdEscape
      .render(string)
      .replace(/<p>/g, '')
      .replace(/<\/p>\s*$/g, '')
      .replace(/<\/p>/g, '<br style="margin-bottom: 10px" />'),
    {
      allowedTags: false,
      allowedAttributes: false,
      allowedSchemes: [
        'http',
        'https',
        'ftp',
        'mailto',
        'chat',
        'javascript',
        'data',
      ],
      textFilter: normCountdown,
      transformTags: {
        '*': (tagName, attribs) => ({
          tagName,
          attribs: attribs.href
            ? {
                ...attribs,
                href: normLink(attribs.href),
              }
            : attribs,
        }),
      },
    },
  );
}

export function text2md(string, safe = true) {
  if (safe) {
    return sanitizeHtml(md.render(PreNorm(string)), {
      allowedTags: false,
      allowedAttributes: false,
      allowedSchemes: [
        'http',
        'https',
        'ftp',
        'mailto',
        'chat',
        'javascript',
        'data',
      ],
      textFilter: normCountdown,
      transformTags: {
        '*': (tagName, attribs) => ({
          tagName,
          attribs: attribs.href
            ? {
                ...attribs,
                href: normLink(attribs.href),
              }
            : attribs,
        }),
        img: (tagName, attribs) => ({
          tagName,
          attribs: {
            ...attribs,
            class: attribs.class || 'widthfull',
          },
        }),
      },
    });
  } else {
    return sanitizeHtml(md.render(PreNorm(string)), {
      allowedTags: [
        'a',
        'b',
        'big',
        'blockquote',
        'br',
        'caption',
        'center',
        'code',
        'div',
        'em',
        'font',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'hr',
        'i',
        'img',
        'li',
        'nl',
        'ol',
        'p',
        'pre',
        'small',
        'span',
        'strike',
        'strong',
        'table',
        'tbody',
        'td',
        'th',
        'thead',
        'tr',
        'u',
        'ul',
      ],
      allowedAttributes: {
        '*': [
          'align',
          'background',
          'bgcolor',
          'class',
          'color',
          'data-*',
          'height',
          'href',
          'id',
          'size',
          'style',
          'valign',
          'width',
        ],
        img: ['src', 'alt'],
      },
      allowedStyles: {
        '*': {
          // Match HEX and RGB
          color: [
            /^[a-z]+$/i,
            /^\#(0x)?[0-9a-f]+$/i,
            /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
          ],
          background: [
            /^[a-z]+$/i,
            /^\#(0x)?[0-9a-f]+$/i,
            /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
            /^url(\S+)$/i,
          ],
          'background-image': [/^url(\S+)$/],
          'background-color': [
            /^[a-z]+$/i,
            /^\#(0x)?[0-9a-f]+$/i,
            /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
          ],
          'text-align': [/^left$/, /^right$/, /^center$/],
          // Match any number with px, em, or %
          'font-size': [/^\d+(px|em|\%)?$/],
          width: [/^\d+(px|em|\%)?$/],
          height: [/^\d+(px|em|\%)?$/],
          padding: [/^.*$/],
          margin: [/^.*$/],
          border: [/^.*$/],
          'padding-left': [/^\d+(px|em|\%)?$/],
          'padding-right': [/^\d+(px|em|\%)?$/],
          'padding-top': [/^\d+(px|em|\%)?$/],
          'padding-bottom': [/^\d+(px|em|\%)?$/],
          'margin-left': [/^\d+(px|em|\%)?$/],
          'margin-right': [/^\d+(px|em|\%)?$/],
          'margin-top': [/^\d+(px|em|\%)?$/],
          'margin-bottom': [/^\d+(px|em|\%)?$/],
          'border-left': [/^\d+(px|em|\%)?$/],
          'border-right': [/^\d+(px|em|\%)?$/],
          'border-top': [/^\d+(px|em|\%)?$/],
          'border-bottom': [/^\d+(px|em|\%)?$/],
          float: [/(left|right)/],
        },
      },
      allowedSchemes: ['http', 'https', 'ftp', 'mailto', 'chat', 'data'],
      nonTextTags: ['style', 'script'],
      textFilter: normCountdown,
      transformTags: {
        '*': (tagName, attribs) => ({
          tagName,
          attribs: attribs.href
            ? {
                ...attribs,
                href: normLink(attribs.href),
              }
            : attribs,
        }),
        img: (tagName, attribs) => ({
          tagName,
          attribs: {
            ...attribs,
            class: attribs.class || 'widthfull',
          },
        }),
      },
    });
  }
}

export function text2desc(string) {
  return sanitizeHtml(md.render(string), {
    allowedTags: [],
    allowedAttributes: [],
  }).substr(0, 250);
}
