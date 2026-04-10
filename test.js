import assert from 'node:assert';
import { createRequire } from 'node:module';
import utils, { round } from './dist/index.js';

var require = createRequire(import.meta.url);
var utilsCjs = require('./dist/index.cjs');

function runSharedAssertions(target) {
	assert.strictEqual(target.round(1.005, 2), 1.01);
	assert.strictEqual(target.round(1234, -2), 1200);
	assert.strictEqual(target.floor(9.99, 1), 9.9);
	assert.strictEqual(target.ceil(9.01, 1), 9.1);
	assert.strictEqual(target.clamp(15, 1, 10), 10);
	assert.strictEqual(target.inRange(5, 1, 10), true);
	assert.strictEqual(target.sum([1, 2, 3]), 6);
	assert.strictEqual(target.average([2, 4, 6]), 4);
	assert.deepStrictEqual(target.unique([1, 1, 2, 3, 3]), [1, 2, 3]);
	assert.deepStrictEqual(target.chunk([1, 2, 3, 4, 5], 2), [[1, 2], [3, 4], [5]]);
	assert.deepStrictEqual(target.groupBy([
		{ type: 'a', value: 1 },
		{ type: 'b', value: 2 },
		{ type: 'a', value: 3 },
	], 'type'), {
		a: [
			{ type: 'a', value: 1 },
			{ type: 'a', value: 3 },
		],
		b: [
			{ type: 'b', value: 2 },
		],
	});
	assert.strictEqual(target.isNil(null), true);
	assert.strictEqual(target.isNil(0), false);
	assert.strictEqual(target.isPlainObject({ a: 1 }), true);
	assert.strictEqual(target.isPlainObject([]), false);
}

assert.strictEqual(round(1.005, 2), 1.01);

runSharedAssertions(utils);
runSharedAssertions(utilsCjs);

console.log('All utils tests passed for ESM and CommonJS.');
