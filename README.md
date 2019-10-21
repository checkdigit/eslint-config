# eslint-config

Check Digit [ESLint](https://eslint.org/) configuration

### Install

```bash
$ npm i @checkdigit/eslint-config eslint --save-dev
```

### Create `tsconfig.eslint.json`

```json
{
  "compilerOptions": { "strict": true },
  "include": [
    "**/src/**/*.ts"
  ]
}
```

### Edit `package.json`
Replace npm scripts and set lint to false within the service key to disable running tslint as part of `serve test`
```jsonc
{
  // ...
  "scripts": {
    "lint": "eslint -f unix --ext .js,.ts 'src/**'",
    "lint:fix": "eslint -f unix --ext .js,.ts 'src/**' --fix",
    "test": "export PORT=3002 && export AWS_REGION=us-east-1 && export AWS_ACCESS_KEY_ID=test && export AWS_SECRET_ACCESS_KEY=test && serve test && npm run lint"
  },
  // ...
  "service": {
    "lint": false
    // ...
  }
}
```

### Add `.eslintrc` file

```jsonc
{
  "extends": ["@checkdigit"]
}
```
