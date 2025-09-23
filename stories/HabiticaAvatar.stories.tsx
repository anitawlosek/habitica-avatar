import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from '../HabiticaAvatar';

import user from './data/user.json';
import minimalUser from './data/minimalUser.json';

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar',
  component: HabiticaAvatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HabiticaAvatar>;

export const Default: Story = {
  args: {
    user,
  },
};

export const Empty: Story = {
  args: {
    user: minimalUser,
  },
};

export const WithCostume: Story = {
  args: {
    user: {
      ...user,
      preferences: {
        ...user.preferences,
        costume: true,
      },
    },
  },
};

export const ForceImageMode: Story = {
  args: {
    user,
    forceImageMode: true,
  },
};
