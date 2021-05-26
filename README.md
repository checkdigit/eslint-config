# eslint-config 

[![MIT License](https://img.shields.io/github/license/checkdigit/eslint-config)](https://github.com/checkdigit/eslint-config/blob/master/LICENSE.txt)
[![David](https://status.david-dm.org/gh/checkdigit/eslint-config.svg)](https://status.david-dm.org/gh/checkdigit/eslint-config.svg)

Copyright (c) 2021 [Check Digit, LLC](https://checkdigit.com)

Check Digit [ESLint](https://eslint.org/) configuration

### Install

```bash
$ npm i @checkdigit/eslint-config eslint --save-dev
```

### Example `package.json`
```jsonc
{
  // ...
  "scripts": {
    "lint": "eslint -f unix 'src/**/*.ts'",
    "lint:fix": "eslint -f unix 'src/**/*.ts' --fix",
    "test": "... && npm run lint"
  },
  // ...
}
```

### Add `.eslintrc` file

```jsonc
{
  "extends": ["@checkdigit"]
}
```

## License

MIT

