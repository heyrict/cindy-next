import { mergeNeighbor, filterNeighbor } from '../replay';

// {{{1 mergeNeighbor
describe('mergeNeighbor', () => {
  it('should work with 2 neighbors', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
      {
        name: 'D',
      },
    ];
    const neighbors = ['B', 'C'];
    const mergeTo = { name: 'E' };
    const expected = [
      {
        name: 'A',
      },
      {
        name: 'E',
      },
      {
        name: 'D',
      },
    ];
    expect(
      mergeNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        mergeTo,
        neighbors.length,
      ),
    ).toStrictEqual(expected);
  });

  it('should work with 3 neighbors', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
      {
        name: 'D',
      },
    ];
    const neighbors = ['B', 'C', 'D'];
    const mergeTo = { name: 'E' };
    const expected = [
      {
        name: 'A',
      },
      {
        name: 'E',
      },
    ];
    expect(
      mergeNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        mergeTo,
        neighbors.length,
      ),
    ).toStrictEqual(expected);
  });

  it('should work properly in tail', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
    ];
    const neighbors = ['B', 'C', 'D'];
    const mergeTo = { name: 'E' };
    const expected = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
    ];
    expect(
      mergeNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        mergeTo,
        neighbors.length,
      ),
    ).toStrictEqual(expected);
  });

  it('should merge multiple instances', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'A',
      },
      {
        name: 'B',
      },
    ];
    const neighbors = ['A', 'B'];
    const mergeTo = { name: 'E' };
    const expected = [
      {
        name: 'E',
      },
      {
        name: 'E',
      },
    ];
    expect(
      mergeNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        mergeTo,
        neighbors.length,
      ),
    ).toStrictEqual(expected);
  });
});

// {{{1 filterNeighbor
describe('filterNeighbor', () => {
  it('should work with 2 neighbors', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
      {
        name: 'D',
      },
    ];
    const neighbors = ['B', 'C'];
    const expected = true;
    expect(
      filterNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        neighbors.length,
      ),
    ).toBe(expected);
  });

  it('should work with 3 neighbors', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
      {
        name: 'D',
      },
    ];
    const neighbors = ['B', 'C', 'D'];
    const expected = true;
    expect(
      filterNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        neighbors.length,
      ),
    ).toBe(expected);
  });

  it('should work properly in tail', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'C',
      },
    ];
    const neighbors = ['B', 'C', 'D'];
    const expected = false;
    expect(
      filterNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        neighbors.length,
      ),
    ).toBe(expected);
  });

  it('should merge multiple instances', () => {
    const arr = [
      {
        name: 'A',
      },
      {
        name: 'B',
      },
      {
        name: 'A',
      },
      {
        name: 'B',
      },
    ];
    const neighbors = ['A', 'B'];
    const expected = true;
    expect(
      filterNeighbor<{ name: string }>(
        arr,
        (item, index) => item.name === neighbors[index],
        neighbors.length,
      ),
    ).toBe(expected);
  });
});
