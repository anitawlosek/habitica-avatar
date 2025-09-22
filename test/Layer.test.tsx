// @vitest-environment jsdom
import React from 'react';
import { render } from '@testing-library/react';
import Layer from '../Layer';
import { describe, it, expect, vi } from 'vitest';

describe('Layer React', () => {
  const baseUser = {
    items: {
      currentMount: 'Wolf-Base',
      gear: {
        costume: {},
        equipped: {},
      },
    },
    preferences: {
      size: 'broad',
      costume: false,
    },
    stats: {
      buffs: {},
      class: 'wizard',
    },
  };

  it('renders an img for a valid config', () => {
    const config = {
      name: 'mount',
      itemsKey: 'currentMount',
      prefix: 'Mount_Head_',
      style: { marginTop: '18px' },
    };
    const { container } = render(<Layer config={config} user={baseUser} />);
    const img = container.querySelector('img');
    expect(img).toBeTruthy();
    expect(img?.style.marginTop).toBe('18px');
    expect(img?.src).toContain('Mount_Head_Wolf-Base');
  });

  it('does not render if ignore key is set', () => {
    const config = {
      name: 'mount',
      itemsKey: 'currentMount',
    };
    const { container } = render(<Layer config={config} user={baseUser} ignore={{ mount: true }} />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render if no s3Key', () => {
    const config = {
      name: 'mount',
      itemsKey: 'notExistingKey',
    };
    const { container } = render(<Layer config={config} user={baseUser} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders a div with className in class mode', () => {
    const config = {
      name: 'mount',
      itemsKey: 'currentMount',
      prefix: 'Mount_Head_',
    };
    const { container } = render(<Layer config={config} user={baseUser} useClassMode />);
    const div = container.querySelector('div');
    expect(div).toBeTruthy();
    expect(div?.className).toContain('Mount_Head_Wolf-Base');
  });
});
