import { Transform } from 'vite';
import { transformAsync } from '@babel/core';

export type ImportPluginOptions = Array<{
  [key: string]: any;
  libraryName: string;
  libraryDirectory?: string;
  camel2DashComponentName?: boolean;
}>;

export default (options: ImportPluginOptions) => {
  /**
   * fast check and pass by code that does not contains libraryName
   */
  const codeIncludesLibraryName = (code: string) => {
    return !options.every(({ libraryName }) => {
      return !new RegExp(`('${libraryName}')|("${libraryName}")`).test(code);
    });
  }

  const moduleImportTransform: Transform = {
    test({ isBuild, code }: any) {
      // NOTICE: code exists only when isBuild == true
      return isBuild && code && codeIncludesLibraryName(code);
    },

    async transform({ code, path }) {
      if (!codeIncludesLibraryName(code)) {
        return code;
      }

      const result = await transformAsync(code, {
        plugins: options.map(mod => ['import', mod, `import-${mod.libraryDirectory}`]),
      });

      return result?.code ?? code;
    },
  };

  return {
    transforms: [
      moduleImportTransform,
    ],
  };
};
