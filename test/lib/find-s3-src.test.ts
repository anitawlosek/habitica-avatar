
import { describe, it, expect } from 'vitest';
import findS3Src from '../../lib/find-s3-src';

describe('findS3Src', () => {
  it('returns the value with the s3 prefix and png suffix', () => {
    expect(findS3Src('foo')).toBe('https://s3.amazonaws.com/habitica-assets/mobileApp/images/foo.png');
  });

  it('returns gif extension for special keys', () => {
    [
      'broad_armor_special_0',
      'slim_armor_special_0',
      'broad_armor_special_1',
      'slim_armor_special_1',
      'head_special_0',
      'head_special_1',
      'shield_special_0',
      'weapon_special_0',
      'weapon_special_critical',
      'Pet-Wolf-Cerberus',
    ].forEach((key) => {
      expect(findS3Src(key)).toBe(`https://s3.amazonaws.com/habitica-assets/mobileApp/images/${key}.gif`);
    });
  });
});
