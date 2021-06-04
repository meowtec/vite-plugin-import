import { Plugin } from 'vite';
import { transformAsync } from '@babel/core';

type BabelImportPluginOptions = Array<{
  [key: string]: any;
  libraryName: string;
  libraryDirectory?: string;
  camel2DashComponentName?: boolean;
}>;

export type ImportPluginOptions = BabelImportPluginOptions | {
  onlyBuild?: boolean;
  babelImportPluginOptions: BabelImportPluginOptions;
};

export default (options: ImportPluginOptions) => {
  let babelImportPluginOptions: BabelImportPluginOptions = [];
  let onlyBuild = true;
  if (Array.isArray(options)) {
    babelImportPluginOptions = options;
  } else {
    babelImportPluginOptions = options.babelImportPluginOptions;
    onlyBuild = options.onlyBuild !== false;
  }

  /**
   * fast check and pass by code that does not contains libraryName
   */
  const codeIncludesLibraryName = (code: string) => !babelImportPluginOptions.every(({ libraryName }) => !new RegExp(`('${libraryName}')|("${libraryName}")`).test(code));

  let isBuild = false;

  const plugin: Plugin = {
    name: 'modular-import',

    configResolved(config) {
      isBuild = config.command === 'build' || config.isProduction;
    },

    async transform(src) {
      if ((onlyBuild && !isBuild) || !codeIncludesLibraryName(src)) {
        return undefined;
      }

      const result = await transformAsync(src, {
        plugins: babelImportPluginOptions.map((mod) => ['import', mod, `import-${mod.libraryName}`]),
      });

      return result?.code;
    },
  };

  return plugin;
};
