// @vitest-environment jsdom
import React from 'react';
import { render } from '@testing-library/react';
import HabiticaAvatar from '../HabiticaAvatar';
import { describe, it, expect } from 'vitest';

const baseUser = {
  items: {
    currentMount: 'Wolf-Ghost',
    currentPet: 'BearCub-Ghost',
    gear: {
      costume: {
        headAccessory: 'headAccessory_base_0',
        eyewear: 'eyewear_base_0',
        back: 'back_base_0',
        weapon: 'weapon_special_critical',
        shield: 'shield_base_0',
        head: 'head_mystery_301405',
        armor: 'armor_mystery_301404',
      },
      equipped: {
        body: 'body_special_summerMage',
        weapon: 'weapon_special_critical',
        headAccessory: 'headAccessory_special_spring2015Rogue',
        back: 'back_mystery_201706',
        eyewear: 'eyewear_special_yellowTopFrame',
        shield: 'shield_special_goldenknight',
        head: 'head_special_2',
        armor: 'armor_wizard_5',
      },
    },
  },
  preferences: {
    costume: false,
    background: 'alpine_slopes',
    sleep: true,
    chair: 'black',
    shirt: 'black',
    skin: 'f5a76e',
    hair: {
      flower: 1,
      mustache: 0,
      beard: 0,
      bangs: 1,
      base: 1,
      color: 'black',
    },
    size: 'broad',
  },
  stats: {
    buffs: {},
    class: 'wizard',
  },
};

describe('HabiticaAvatar React', () => {
  it('renders without crashing', () => {
    const { container } = render(<HabiticaAvatar user={baseUser} />);
    expect(container.querySelector('div')).toBeTruthy();
  });

  it('applies extra padding if user has no mount', () => {
    const user = { ...baseUser, items: { ...baseUser.items, currentMount: '' } };
    const { container } = render(<HabiticaAvatar user={user} />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv.style.paddingTop).toBe('24.5px');
  });

  it('does not apply extra padding if user has mount', () => {
    const user = { ...baseUser, items: { ...baseUser.items, currentMount: 'Wolf-Base' } };
    const { container } = render(<HabiticaAvatar user={user} />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv.style.paddingTop).not.toBe('24.5px');
  });

  it('applies background if user has one', () => {
    const user = { ...baseUser, preferences: { ...baseUser.preferences, background: 'fake-background' } };
    const { container } = render(<HabiticaAvatar user={user} />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv.style.backgroundImage).toContain('background_fake-background');
  });

  it('does not apply background if user does not have one', () => {
    const user = { ...baseUser, preferences: { ...baseUser.preferences, background: '' } };
    const { container } = render(<HabiticaAvatar user={user} />);
    const avatarDiv = container.firstChild as HTMLElement;
    expect(avatarDiv.style.backgroundImage).toBe('');
  });
});
