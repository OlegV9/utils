function toFiniteNumber(value, defaultValue) {
	var number = Number(value);

	if (Number.isFinite(number)) {
		return number;
	}

	return defaultValue;
}

function toInteger(value, defaultValue) {
	var number = toFiniteNumber(value, defaultValue);

	if (!Number.isFinite(number)) {
		return defaultValue;
	}

	return Math.trunc(number);
}

function shiftDecimal(value, precision) {
	return Number(value + 'e' + precision);
}

function preciseMath(method, value, precision) {
	var normalizedValue = Number(value);
	var normalizedPrecision = toInteger(precision, 0);

	if (!Number.isFinite(normalizedValue)) {
		return NaN;
	}

	if (normalizedPrecision === 0) {
		return Math[method](normalizedValue);
	}

	return shiftDecimal(Math[method](shiftDecimal(normalizedValue, normalizedPrecision)), -normalizedPrecision);
}

function round(value, precision) {
	return preciseMath('round', value, precision);
}

function floor(value, precision) {
	return preciseMath('floor', value, precision);
}

function ceil(value, precision) {
	return preciseMath('ceil', value, precision);
}

function clamp(value, min, max) {
	var normalizedValue = Number(value);
	var normalizedMin = Number(min);
	var normalizedMax = Number(max);
	var lower = Math.min(normalizedMin, normalizedMax);
	var upper = Math.max(normalizedMin, normalizedMax);

	if (!Number.isFinite(normalizedValue) || !Number.isFinite(lower) || !Number.isFinite(upper)) {
		return NaN;
	}

	return Math.min(Math.max(normalizedValue, lower), upper);
}

function inRange(value, min, max) {
	var normalizedValue = Number(value);
	var lower = Math.min(Number(min), Number(max));
	var upper = Math.max(Number(min), Number(max));

	if (!Number.isFinite(normalizedValue) || !Number.isFinite(lower) || !Number.isFinite(upper)) {
		return false;
	}

	return normalizedValue >= lower && normalizedValue <= upper;
}

function sum(list) {
	if (!Array.isArray(list) || list.length === 0) {
		return 0;
	}

	return list.reduce(function(total, item) {
		return total + toFiniteNumber(item, 0);
	}, 0);
}

function average(list) {
	if (!Array.isArray(list) || list.length === 0) {
		return 0;
	}

	return sum(list) / list.length;
}

function unique(list) {
	if (!Array.isArray(list)) {
		return [];
	}

	return Array.from(new Set(list));
}

function chunk(list, size) {
	var normalizedSize = Math.max(toInteger(size, 1), 1);
	var result = [];
	var index;

	if (!Array.isArray(list) || list.length === 0) {
		return result;
	}

	for (index = 0; index < list.length; index += normalizedSize) {
		result.push(list.slice(index, index + normalizedSize));
	}

	return result;
}

function resolveIteratee(iteratee) {
	if (typeof iteratee === 'function') {
		return iteratee;
	}

	return function(item) {
		return item == null ? undefined : item[iteratee];
	};
}

function groupBy(list, iteratee) {
	var getter = resolveIteratee(iteratee);

	if (!Array.isArray(list) || list.length === 0) {
		return {};
	}

	return list.reduce(function(groups, item, index) {
		var key = getter(item, index, list);

		if (!Object.prototype.hasOwnProperty.call(groups, key)) {
			groups[key] = [];
		}

		groups[key].push(item);

		return groups;
	}, {});
}

function isNil(value) {
	return value === null || value === undefined;
}

function isPlainObject(value) {
	if (Object.prototype.toString.call(value) !== '[object Object]') {
		return false;
	}

	var prototype = Object.getPrototypeOf(value);

	return prototype === Object.prototype || prototype === null;
}

function randomInt(min, max) {
	var lower = Math.ceil(Math.min(Number(min), Number(max)));
	var upper = Math.floor(Math.max(Number(min), Number(max)));

	if (!Number.isFinite(lower) || !Number.isFinite(upper)) {
		return NaN;
	}

	return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

function sleep(ms) {
	return new Promise(function(resolve) {
		setTimeout(resolve, Math.max(toInteger(ms, 0), 0));
	});
}

function debounce(fn, delay) {
	var timeoutId = null;
	var wait = Math.max(toInteger(delay, 0), 0);

	return function() {
		var context = this;
		var args = arguments;

		clearTimeout(timeoutId);

		timeoutId = setTimeout(function() {
			fn.apply(context, args);
		}, wait);
	};
}

function throttle(fn, delay) {
	var wait = Math.max(toInteger(delay, 0), 0);
	var lastCallTime = 0;
	var timeoutId = null;
	var pendingArgs = null;
	var pendingContext = null;

	function invoke() {
		lastCallTime = Date.now();
		timeoutId = null;
		fn.apply(pendingContext, pendingArgs);
		pendingArgs = null;
		pendingContext = null;
	}

	return function() {
		var now = Date.now();
		var remaining = wait - (now - lastCallTime);

		pendingArgs = arguments;
		pendingContext = this;

		if (remaining <= 0 || remaining > wait) {
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = null;
			}

			invoke();

			return;
		}

		if (!timeoutId) {
			timeoutId = setTimeout(invoke, remaining);
		}
	};
}

var utils = {
	average: average,
	ceil: ceil,
	chunk: chunk,
	clamp: clamp,
	debounce: debounce,
	floor: floor,
	groupBy: groupBy,
	inRange: inRange,
	isNil: isNil,
	isPlainObject: isPlainObject,
	randomInt: randomInt,
	round: round,
	sleep: sleep,
	sum: sum,
	throttle: throttle,
	toFiniteNumber: toFiniteNumber,
	toInteger: toInteger,
	unique: unique,
};

export {
	average,
	ceil,
	chunk,
	clamp,
	debounce,
	floor,
	groupBy,
	inRange,
	isNil,
	isPlainObject,
	randomInt,
	round,
	sleep,
	sum,
	throttle,
	toFiniteNumber,
	toInteger,
	unique,
};

export default utils;
