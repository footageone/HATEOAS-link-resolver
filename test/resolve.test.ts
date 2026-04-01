import { describe, expect, test } from 'bun:test';
import { resolve } from '../src/resolve';

describe('SimplePath', () => {
  test('simple path params at end', () => {
    expect(resolve('https://example.org/{id}', { id: '2345' })).toBe(
      'https://example.org/2345',
    );
  });

  test('simple path params in middle', () => {
    expect(resolve('https://example.org/{id}/sub', { id: '2345' })).toBe(
      'https://example.org/2345/sub',
    );
  });

  test('only query params', () => {
    expect(
      resolve('https://example.org/path?elementIds={ids}', { ids: '234,345' }),
    ).toBe('https://example.org/path?elementIds=234,345');
  });
});

describe('PathAndQuery', () => {
  test('path mandatory and optional query', () => {
    expect(
      resolve('https://example.org/path/{entity}/sub?ids={ids}{&lang,set}', {
        entity: 'abc',
        ids: '678',
      }),
    ).toBe('https://example.org/path/abc/sub?ids=678');
  });

  test('query and optional only mandatory', () => {
    expect(
      resolve('https://example.org/path?ids={ids}{&lang,set}', { ids: '678' }),
    ).toBe('https://example.org/path?ids=678');
  });

  test('query and optional additional query params', () => {
    expect(
      resolve('https://example.org/path?ids={ids}{&lang,set}', {
        ids: '678',
        set: 'ALL',
      }),
    ).toBe('https://example.org/path?ids=678&set=ALL');
  });

  test('query and optional additional query params with null value', () => {
    expect(
      resolve('https://example.org/path?ids={ids}{&lang,set}', {
        ids: '678',
        lang: 'en',
        set: null,
      }),
    ).toBe('https://example.org/path?ids=678&lang=en');
  });
});

describe('MultiplePathParams', () => {
  test('multiple path params inside', () => {
    expect(
      resolve('https://example.org/path/{id}/do/{query}/end', {
        id: '456',
        query: 'TEST',
      }),
    ).toBe('https://example.org/path/456/do/TEST/end');
  });

  test('two path params as query', () => {
    expect(
      resolve('https://example.org/path?id={id}&query={query}{&lang}', {
        id: '456',
        query: 'TEST',
      }),
    ).toBe('https://example.org/path?id=456&query=TEST');
  });

  test('two path query params and query', () => {
    expect(
      resolve('https://example.org/path?id={id}&query={query}{&lang}', {
        id: '456',
        query: 'TEST',
        lang: 'de',
      }),
    ).toBe('https://example.org/path?id=456&query=TEST&lang=de');
  });
});

describe('OnlyQueryParams', () => {
  test('one from list', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
      }),
    ).toBe('https://example.org/?two=ONE');
  });

  test('one from list with boolean value', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: true,
      }),
    ).toBe('https://example.org/?two=true');
  });

  test('one from list with number value', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', { two: 2 }),
    ).toBe('https://example.org/?two=2');
  });

  test('two from list', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
      }),
    ).toBe('https://example.org/?one=TWO&two=ONE');
  });

  test('two from list one not existent', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
        six: 'NO',
      }),
    ).toBe('https://example.org/?one=TWO&two=ONE');
  });

  test('two from list one not existent one null value', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
        three: null,
        six: 'NO',
      }),
    ).toBe('https://example.org/?one=TWO&two=ONE');
  });

  test('two from list one not existent one undefined value', () => {
    expect(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
        three: undefined,
        six: 'NO',
      }),
    ).toBe('https://example.org/?one=TWO&two=ONE');
  });
});

describe('Errors', () => {
  test('no params', () => {
    expect(() => resolve('https://example.org/{id}')).toThrow(
      'Path param id is missing',
    );
  });

  test('param is null', () => {
    expect(() => resolve('https://example.org/{id}', { id: null })).toThrow();
  });

  test('param is undefined', () => {
    expect(() =>
      resolve('https://example.org/{id}', { id: undefined }),
    ).toThrow();
  });
});
