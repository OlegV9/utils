# @olegv0907/utils

A small package with commonly used JavaScript utility functions.

## Features

- ESM and CommonJS support via `exports`
- common utility helpers for numbers, arrays, objects, and async flows

## Installation

```bash
npm install @olegv0907/utils
```

## Usage

### ESM

```js
import utils, { round, clamp, unique } from '@olegv0907/utils';

console.log(round(1.005, 2));
console.log(clamp(15, 1, 10));
console.log(unique([1, 1, 2, 3]));
```

### CommonJS

```js
const utils = require('@olegv0907/utils');

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

## License

ISC
