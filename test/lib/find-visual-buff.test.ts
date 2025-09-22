import { describe, it, expect, beforeEach } from 'vitest';
import findVisualBuff from '../../lib/find-visual-buff';
'use strict'

describe('findVisualBuff', () => {
  let user: any;

  beforeEach(() => {
    user = {
      stats: {
        buffs: {
          snowball: true
        },
        class: 'wizard'
      }
    };
  });

  it('returns visual buff class', () => {
    expect(findVisualBuff(user)).to.equal('snowman');
  });

  it('appends class to shinySeed', () => {
    user.stats.buffs.snowball = false;
    user.stats.buffs.shinySeed = true;

    expect(findVisualBuff(user)).to.equal('avatar_floral_wizard');
  });

  it('returns nothing if no visual buffs are found', () => {
    user.stats.buffs.snowball = false;

    expect(findVisualBuff(user)).to.not.exist;
  });
});
