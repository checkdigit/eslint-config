# eslint-config

Copyright (c) 2021-2024 [Check Digit, LLC](https://checkdigit.com)

Check Digit [ESLint](https://eslint.org/) configuration

### Install

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
    "lint": "eslint --max-warnings 0 --ignore-path .gitignore .",
    "lint:fix": "eslint --ignore-path .gitignore . --fix",
    "test": "... && npm run lint"
  }
  "eslintConfig": {
    "extends": [
      "@checkdigit/eslint-config"
    ]
  }
  // ...
}
```

## License

MIT
