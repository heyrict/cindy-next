import MarkdownIt from 'markdown-it';
import createDOMPurify from 'dompurify';

import { normLinkHook } from '../plugin-link';

const testSet = [
  {
    data: '[test](chat://test)',
    expected:
      '<p><a data-event="open-channel" data-target="test">test</a></p>\n',
  },
  {
    data: '[チャンネル](chat://チャンネル)',
    expected:
      '<p><a data-event="open-channel" data-target="チャンネル">チャンネル</a></p>\n',
  },
];

describe('normPuzzleQjump()', () => {
  const md = MarkdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
  });
  const { JSDOM } = require('jsdom');
  const window = new JSDOM('').window;
  const DOMPurify = createDOMPurify(window);
  const config = {
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|chat):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    FORCE_BODY: true,
  };
  DOMPurify.addHook('afterSanitizeAttributes', normLinkHook);

  it.each`
    data               | expected
    ${testSet[0].data} | ${testSet[0].expected}
    ${testSet[1].data} | ${testSet[1].expected}
  `('Expect output of "$data" to be "$expected"', ({ data, expected }) => {
    expect(DOMPurify.sanitize(md.render(data), config)).toEqual(expected);
  });
});
