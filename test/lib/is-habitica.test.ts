// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import isHabitica from '../../lib/is-habitica';

describe('isHabitica', () => {
  function setWindowHost(host: string) {
    // @ts-expect-error
    delete window.location;
    // @ts-expect-error
    window.location = { host };
  }

  it('returns true if hostname is habitica.com', () => {
    setWindowHost('habitica.com');
    expect(isHabitica()).toBe(true);
  });

  it('returns false if hostname is not habitica.com', () => {
    setWindowHost('another-host.com');
    expect(isHabitica()).toBe(false);
  });

  it('returns false fo subdomain of habitica.com', () => {
    setWindowHost('subdomain.habitica.com');
    expect(isHabitica()).toBe(false);
  });
});
