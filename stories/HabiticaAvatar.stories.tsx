import type { Meta, StoryObj } from '@storybook/react';
import HabiticaAvatar from '../HabiticaAvatar';
import userData from './userData.avatar.json';
import emptyUserData from './emptyUserData.avatar.json';

const meta: Meta<typeof HabiticaAvatar> = {
  title: 'HabiticaAvatar',
  component: HabiticaAvatar,
};
export default meta;

type Story = StoryObj<typeof HabiticaAvatar>;

export const Default: Story = {
  args: {
    user: userData.data,
  },
};

export const Empty: Story = {
    args: {
        user: emptyUserData.data
    }
}
