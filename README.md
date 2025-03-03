# @checkdigit/eslint-config

Copyright © 2021-2025 [Check Digit, LLC](https://checkdigit.com)

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
    "lint": "eslint --max-warnings 0 .",
    "lint:fix": "eslint . --fix",
    "test": "... && npm run lint",
  },
  // ...
}
```

### Example `eslint.config.mjs`

```ts
export { default } from '@checkdigit/eslint-config';
```

## License

MIT
