# @checkdigit/eslint-config

Copyright (c) 2021-2024 [Check Digit, LLC](https://checkdigit.com)

## Install

```bash
$ npm i @checkdigit/eslint-config --save-dev
```

Note that `@checkdigit/eslint-config` automatically brings in the correct version of `eslint` and the various
plugins that are supported by the configuration via `peerDependencies`.

### Example `package.json`

```jsonc
{
  // ...
  "scripts": {
    "lint": "NODE_OPTIONS=\"--disable-warning ExperimentalWarning\" eslint --max-warnings 0 .",
    "lint:fix": "NODE_OPTIONS=\"--disable-warning ExperimentalWarning\" eslint . --fix",
    "test": "... && npm run lint",
  },
  // ...
}
```

### Example `eslint.config.mjs`

```javascript
import { default } from '@checkdigit/eslint-config';
```

## License

MIT
