import { domainFilter } from '../settings';

describe('domainFilter', () => {
  it.each`
    url                                        | selfDomain | href                                       | as
    ${'http://localhost:3000/puzzle/1'}        | ${true}    | ${'/puzzle/[id]'}                          | ${'/puzzle/1'}
    ${'https://127.0.0.1:3000/puzzle/show/1'}  | ${true}    | ${'/puzzle/show/[id]'}                     | ${'/puzzle/show/1'}
    ${'http://cindythink.com'}                 | ${true}    | ${''}                                      | ${''}
    ${'http://www.cindythink.com/puzzles'}     | ${true}    | ${'/puzzles'}                              | ${'/puzzles'}
    ${'https://static.cindythink.com/puzzles'} | ${false}   | ${'https://static.cindythink.com/puzzles'} | ${'https://static.cindythink.com/puzzles'}
  `(
    '$url should be a parsed as selfDomain=$selfDomain, href=$href, as=$as',
    ({ url, selfDomain, href, as }) => {
      expect(domainFilter(url)).toStrictEqual({ selfDomain, href, as });
    },
  );
});
