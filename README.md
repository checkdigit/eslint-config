# @checkdigit/eslint-config

Copyright © 2021-2026 [Check Digit, LLC](https://checkdigit.com)

## Install

```bash
$ npm i @checkdigit/eslint-config --save-dev
```

`@checkdigit/eslint-config` installs the plugins and supporting configurations it
uses. Its exact supported version of `eslint` is automatically installed as a
peer dependency.

The configuration supports Node.js 24.18 or newer. It lints TypeScript `.ts`
files, Markdown, JSON, YAML, and Athena SQL. JavaScript and other TypeScript
source extensions—including `.js`, `.mjs`, `.cjs`, `.jsx`, `.tsx`, `.mts`, and
`.cts`—are intentionally ignored.

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
