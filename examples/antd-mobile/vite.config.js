/* eslint-disable import/no-extraneous-dependencies */
// @ts-check
import reactPlugin from 'vite-plugin-react';
import importPlugin from 'vite-plugin-import';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  plugins: [
    reactPlugin,
    // importPlugin([
    //   { libraryName: 'antd-mobile', style: 'css' },
    // ]),
  ],
};

export default config;
