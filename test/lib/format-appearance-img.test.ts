
import { describe, it, expect } from 'vitest';
import formatAppearance from '../../lib/format-appearance-img';

describe('formatAppearance', () => {
  it('returns the name from the appearance object', () => {
    const name = formatAppearance('foo', {
      appearance: {
        foo: 'bar',
        hair: {},
      },
    });
    expect(name).toBe('bar');
  });

  it('accounts for sleeping in inn when rendering skin', () => {
    const name = formatAppearance('skin', {
      appearance: {
        sleep: true,
        skin: 'bar',
        hair: {},
      },
    });
    expect(name).toBe('bar_sleep');
  });

  it('does not change skin if ignore sleep is used', () => {
    const name = formatAppearance('skin', {
      ignore: { sleep: true },
      appearance: {
        sleep: true,
        skin: 'bar',
        hair: {},
      },
    });
    expect(name).toBe('bar');
  });

  it('uses zzz key for sleep node', () => {
    const name = formatAppearance('sleep', {
      appearance: {
        sleep: true,
        hair: {},
      },
    });
    expect(name).toBe('zzz');
  });

  it('skips sleep node if not asleep', () => {
    const name = formatAppearance('sleep', {
      appearance: {
        sleep: false,
        hair: {},
      },
    });
    expect(name).toBeUndefined();
  });

  it('returns nothing if hair subproperty does not exist', () => {
    const name = formatAppearance('hair', {
      subName: 'flower',
      appearance: {
        hair: {
          flower: 0,
        },
      },
    });
    expect(name).toBeUndefined();
  });

  it('returns nothing if hair subproperty is 0', () => {
    const name = formatAppearance('hair', {
      subName: 'flower',
      appearance: {
        hair: {
          flower: '0',
        },
      },
    });
    expect(name).toBeUndefined();
  });

  it('returns hair value with hair color', () => {
    const name = formatAppearance('hair', {
      subName: 'bangs',
      appearance: {
        hair: {
          bangs: 1,
          color: 'white',
        },
      },
    });
    expect(name).toBe('1_white');
  });

  it('returns flower without hair color', () => {
    const name = formatAppearance('hair', {
      subName: 'flower',
      appearance: {
        hair: {
          flower: 1,
          color: 'white',
        },
      },
    });
    expect(name).toBe('1');
  });

  it('returns nothing if value is none', () => {
    const name = formatAppearance('chair', {
      appearance: {
        chair: 'none',
        hair: {},
      },
    });
    expect(name).toBeUndefined();
  });
});
