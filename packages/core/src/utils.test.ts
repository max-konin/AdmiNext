import { describe, it, expect } from 'vitest';
import { removeServerFunctionsFromResourceDefinition } from './utils';
import { resources } from './data.mock';

describe('removeServerFunctionsFromResourceDefinition', () => {
  it('should remove server functions from resource definition', () => {
    const result = removeServerFunctionsFromResourceDefinition(resources.posts);

    const pages = Object.values(result.pages);

    expect(pages).toHaveLength(Object.keys(resources.posts.pages).length);

    pages.forEach((p) => {
      expect(p).not.toHaveProperty('loader');
    });
  });
});
