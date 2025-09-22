import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from '../HabiticaAvatar';

import user from './user.json';
const userData = user.data;

import emptyUser from './emptyUser.json';
const emptyUserData = emptyUser.data;

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar',
  component: HabiticaAvatar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof HabiticaAvatar>;

export const Default: Story = {
  args: {
    user: userData,
  },
};

export const Empty: Story = {
  args: {
    user: emptyUserData,
  },
};

export const WithCostume: Story = {
  args: {
    user: {
      ...userData,
      preferences: {
        ...userData.preferences,
        costume: true,
      },
    },
  },
};

export const ForceImageMode: Story = {
  args: {
    user: userData,
    forceImageMode: true,
  },
};
