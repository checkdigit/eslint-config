# eslint-config 

Copyright (c) 2021 [Check Digit, LLC](https://checkdigit.com)

Check Digit [ESLint](https://eslint.org/) configuration

### Install

```bash
$ npm i @checkdigit/eslint-config eslint --save-dev
```

### Edit `package.json`
Replace npm scripts and set lint to false within the service key to disable running tslint as part of `serve test`
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

