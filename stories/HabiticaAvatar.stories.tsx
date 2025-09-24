import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from '../HabiticaAvatar';

import user from './data/user.json';
import minimalUser from './data/minimalUser.json';
//import gifEquipmentUser from './data/gifEquipmentUser.json';

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

export const SleepingUser: Story = {
  args: {
    user: {
      ...user,
      preferences: {
        ...user.preferences,
        sleep: true,
      },
    },
  },
};

export const WithGear: Story = {
  args: {
    user: {
      ...user,
      preferences: {
        ...user.preferences,
        costume: false,
      },
    },
  },
};

export const Empty: Story = {
  args: {
    user: minimalUser,
  },
};

// export const WithGifEquipment: Story = {
//   args: {
//     user: gifEquipmentUser,
//   },
// };
