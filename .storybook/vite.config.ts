import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig, UserConfig } from 'vite';
import viteConfig from '../vite.config';


const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config: UserConfig) {
    return mergeConfig(config, viteConfig);
  },
};

export default config;
