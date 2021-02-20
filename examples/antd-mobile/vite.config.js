/* eslint-disable import/no-extraneous-dependencies */
// @ts-check
import importPlugin from 'vite-plugin-import';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  plugins: [
    importPlugin([
      {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
      },
    ]),
  ],
};

export default config;
