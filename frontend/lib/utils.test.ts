import { describe, expect, it } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    expect(cn('class1', true && 'class2', false && 'class3')).toBe('class1 class2');
  });

  it('merges tailwind classes properly', () => {
    expect(cn('p-4 px-2')).toBe('p-4 px-2'); // Normal clsx behavior on conflict without twmerge
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4'); // twMerge resolves conflicts depending on order
  });
});
