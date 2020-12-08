/* eslint-disable import/no-extraneous-dependencies */
// @ts-check
import reactPlugin from 'vite-plugin-react';
import createImportPlugin from 'vite-plugin-import';

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  plugins: [
    reactPlugin,
    createImportPlugin([
      {
        libraryName: '@byte-design/ui',
        libraryDirectory: 'es/components',
        transformToDefaultImport: false,
        style: true,
      },
      {
        libraryName: '@byte-design/form',
        libraryDirectory: 'es/fields',
        camel2DashComponentName: false,
        transformToDefaultImport: false,
        style: false,
      },
    ]),
  ],
  resolvers: [
    {
      alias(path) {
        if (path.startsWith('@/')) {
          return path.replace('@/', '/');
        }

        return null;
      },
    },
  ],
  optimizeDeps: {
    include: ['semver/functions/valid'],
  },
  base: 'https://sf3-scmcdn-tos.pstatp.com/goofy/sev-platform',
  proxy: {
    '/api': 'http://localhost:8899/',
    '/sso': 'http://localhost:8899/',
  },
};

export default config;
