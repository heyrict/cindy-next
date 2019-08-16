import { domainFilter } from '../settings';

describe('domainFilter', () => {
  it.each`
    url                                        | expected
    ${'http://localhost:3000/puzzle/1'}        | ${true}
    ${'https://127.0.0.1:3000/puzzle/1'}       | ${true}
    ${'http://cindythink.com'}                 | ${true}
    ${'http://www.cindythink.com'}             | ${true}
    ${'https://www.cindythink.com/puzzles'}    | ${true}
    ${'https://static.cindythink.com/puzzles'} | ${false}
  `('$url should be a $expected same domain', ({ url, expected }) => {
    expect(domainFilter(url).selfDomain).toBe(expected);
  });

  it.each`
    url                                     | expected
    ${'http://localhost:3000/puzzle/1'}     | ${'/puzzle/1'}
    ${'https://127.0.0.1:3000/puzzle/1'}    | ${'/puzzle/1'}
    ${'http://cindythink.com'}              | ${''}
    ${'http://www.cindythink.com/'}         | ${'/'}
    ${'https://www.cindythink.com/puzzles'} | ${'/puzzles'}
  `('$url should be extracted to $expected', ({ url, expected }) => {
    expect(domainFilter(url).url).toBe(expected);
  });
});
