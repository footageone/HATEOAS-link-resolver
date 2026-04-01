import { describe, expect, test } from 'bun:test';
import { LinkRepository } from '../src/link-repository';

const links = {
  endpoint1: {
    href: 'https://example.org/{id}',
    templated: true,
  },
  endpoint2: {
    href: 'https://example.org/path/{id}',
    templated: true,
  },
};

describe('LinkRepository', () => {
  test('create repository', () => {
    const repo = new LinkRepository(links);
    expect(repo.has('endpoint1')).toBe(true);
    expect(repo.has('endpoint2')).toBe(true);
    expect(repo.has('endpoint3' as keyof typeof links)).toBe(false);
  });

  test('get link', () => {
    const repo = new LinkRepository(links);
    expect(repo.get('endpoint1')).toEqual('https://example.org/{id}');
  });

  test('resolve link', () => {
    const repo = new LinkRepository(links);
    expect(repo.resolve('endpoint1', { id: '124' })).toEqual(
      'https://example.org/124',
    );
  });
});
