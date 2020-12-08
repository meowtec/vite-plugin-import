# vite-plugin-import
Modular import plugin for  [Vite](https://github.com/vitejs/vite)

## Install
```
npm i vite-plugin-import -D
```

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

## How it works
Internally, `vite-plugin-import` just use `babel` + `babel-plugin-import` for transforming codes.
For performance, `vite-plugin-import` will only transform codes that contain the module names.

## Options

See [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) for more detail.