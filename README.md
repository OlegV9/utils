# utils

A small package with commonly used JavaScript utility functions.

## Features

- ESM and CommonJS support via `exports`
- source files in `src/`
- build output in `dist/` via `esbuild`
- simple tests for both module formats

## Install Dependencies

```bash
npm install
```

## Build

```bash
npm run build
```

## Test

```bash
npm test
```

## Usage

### ESM

```js
import utils, { round, clamp, unique } from 'utils';

console.log(round(1.005, 2));
console.log(clamp(15, 1, 10));
console.log(unique([1, 1, 2, 3]));
```

### CommonJS

```js
const utils = require('utils');

console.log(utils.round(1.005, 2));
console.log(utils.clamp(15, 1, 10));
console.log(utils.unique([1, 1, 2, 3]));
```

## Exported Functions

- `average`
- `ceil`
- `chunk`
- `clamp`
- `debounce`
- `floor`
- `groupBy`
- `inRange`
- `isNil`
- `isPlainObject`
- `randomInt`
- `round`
- `sleep`
- `sum`
- `throttle`
- `toFiniteNumber`
- `toInteger`
- `unique`

## Structure

```text
src/        package source files
dist/       built package files
build.js    esbuild-based build script
test.js     ESM and CommonJS checks
```

## Package Format

This package uses a dual-package setup:

- ESM entry: `dist/index.js`
- CommonJS entry: `dist/index.cjs`

The public entry points are defined via `exports` in `package.json`.

## Development Flow

1. Install dependencies with `npm install`
2. Update source files in `src/`
3. Build the package with `npm run build`
4. Run tests with `npm test`

## Publishing Notes

If you publish this package, make sure the built files in `dist/` are generated before publishing.

Common approaches:

- keep `dist/` out of git and build before `npm publish`
- keep `dist/` in git if the package is installed directly from the repository

## License

ISC
