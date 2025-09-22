
import { describe, it, expect } from 'vitest';
import formatEquipment from '../../lib/format-equipment-img';
import { background } from 'storybook/internal/theming';

describe('formatEquipment', () => {
  it('returns the equipment name', () => {
    const name = formatEquipment('name', { style: {} });
    expect(name).toBe('name');
  });

  it('returns nothing if name includes "base_0"', () => {
    const name = formatEquipment('warrior_base_0', { style: {} });
    expect(name).toBeUndefined();
  });

  it('returns nothing if equipment does not exist', () => {
    let empty: any;
    const name = formatEquipment(empty, { style: {} });
    expect(name).toBeUndefined();
  });

  it('assigns extra styles to image if item is weapon_special_critical', () => {
    const img = {
      style: {
        color: 'red',
      },
    };

    formatEquipment('weapon_special_critical', img);

    expect(img.style).toEqual({
      color: 'red',
      marginLeft: '-12px',
      marginTop: '12px',
    });
  });

  it('does not assign extra styles to image when no special styles are specified', () => {
    const img = {
      style: {
        background: 'black',
      },
    };

    formatEquipment('foo', img);
    
    expect(img.style).toEqual({
      background: 'black',
    });
  });
});
