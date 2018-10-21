import { injectEntry, ENTRY_ORDER } from '../main';

describe('injectEntry', () => {
  it('appends to the entry config correctly', () => {
    expect(injectEntry(undefined, 'foo', {})).toEqual('foo');
    expect(injectEntry(['original'], 'added', {})).toEqual([
      'added',
      'original'
    ]);
    expect(injectEntry('original', 'added', {})).toEqual(['added', 'original']);
    expect(injectEntry(['foo', 'bar'], 'baz', {})).toEqual([
      'foo',
      'baz',
      'bar'
    ]);
    expect(injectEntry(['foo', 'bar', 'baz', 'blah'], 'aaa', {})).toEqual([
      'foo',
      'bar',
      'baz',
      'aaa',
      'blah'
    ]);
    expect(
      injectEntry(
        {
          foo: 'bar',
          another: ['an', 'array']
        },
        'added',
        {}
      )
    ).toEqual({
      foo: ['added', 'bar'],
      another: ['an', 'added', 'array']
    });
  });

  it('appends to only the specified entry', () => {
    expect(injectEntry(undefined, 'foo', { entryName: 'bar' })).toBe('foo');
    expect(
      injectEntry({ foo: 'bar', bar: 'baz' }, 'added', { entryName: 'bar' })
    ).toEqual({
      foo: 'bar',
      bar: ['added', 'baz']
    });
  });

  it('respects the config for ordering', () => {
    expect(
      injectEntry(['foo', 'bar'], 'baz', { entryOrder: ENTRY_ORDER.First })
    ).toEqual(['baz', 'foo', 'bar']);
    expect(
      injectEntry(['foo', 'bar'], 'baz', { entryOrder: ENTRY_ORDER.Last })
    ).toEqual(['foo', 'bar', 'baz']);
    expect(
      injectEntry(['foo', 'bar'], 'baz', { entryOrder: ENTRY_ORDER.NotLast })
    ).toEqual(['foo', 'baz', 'bar']);
  });

  it('order config for strings', () => {
    expect(
      injectEntry('original', 'new', { entryOrder: ENTRY_ORDER.First })
    ).toEqual(['new', 'original']);
    expect(
      injectEntry('original', 'new', { entryOrder: ENTRY_ORDER.Last })
    ).toEqual(['original', 'new']);
    expect(
      injectEntry('original', 'new', { entryOrder: ENTRY_ORDER.NotLast })
    ).toEqual(['new', 'original']);
  });
});