# vite-plugin-import
Modular import plugin for  [Vite](https://github.com/vitejs/vite)

## Install
```
npm i vite-plugin-import -D
```

## When to use?

If the library that you are using tell you to use `babel-plugin-import` to reduce the bundle size, then you can use `@rollup/plugin-babel + babel-plugin-import`, or just `vite-plugin-import`.

If you need some other babel features, use `@rollup/plugin-babel + babel-plugin-import`, not `vite-plugin-import`.

`vite-plugin-import` is a little faster then `@rollup/plugin-babel + babel-plugin-import`.

## Usage
vite.config.js:

```javascript
import createImportPlugin from 'vite-plugin-import';

const config = {
  plugins: [
    createImportPlugin([
      {
        libraryName: 'antd',
        'style': true,   // or 'css'
      }
    ]),
  ],
}

// or

const config = {
  plugins: [
    createImportPlugin({
      onlyBuild: false, // if onlyBuild === true, this plugin takes effect only in vite build mode; onlyBuild's default value is true.
      babelImportPluginOptions: [{
        libraryName: 'antd',
        'style': true,   // or 'css'
      }]
    }),
  ],
}
```

app code:
```javascript
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
require('antd/lib/button/style');
ReactDOM.render(<_button>xxxx</_button>);
```

## NOTICE
Need to clarify that you DO NOT really need `vite-plugin-import` for antd, because antd is _tree shakeable_, and vite can remove the unused codes when build.

## How it works
Internally, `vite-plugin-import` just use `babel` + `babel-plugin-import` for transforming codes.
For performance, `vite-plugin-import` will only transform codes that contain the module names.

## Options

See [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) for more detail.
