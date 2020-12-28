var ArrayProto = Array.prototype
var ObjProto = Object.prototype
var ObjProto = Object.prototype
var hasOwnProperty = ObjProto.hasOwnProperty
var slice = ArrayProto.slice
var toString = ObjProto.toString
var nativeForEach = ArrayProto.forEach
var breaker = false
export var isArguments = function (obj) {
	return !!(obj && hasOwnProperty.call(obj, 'callee'))
}
export var each = function (obj, iterator, context) {
	if (obj === null) return false
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(iterator, context)
	} else if (obj.length === +obj.length) {
		for (var i = 0, l = obj.length; i < l; i++) {
			if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
				return false
			}
		}
	} else {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				if (iterator.call(context, obj[key], key, obj) === breaker) {
					return false
				}
			}
		}
	}
}
export var values = function (obj) {
	var results = []
	if (obj === null) {
		return results
	}
	each(obj, function (value) {
		results[results.length] = value
	})
	return results
}
export function round(num, decimals) {
	return +num.toFixed(decimals)
}

export function msToNs(duration) {
	if (typeof duration !== 'number') {
		return duration
	}
	return round(duration * 1e6, 0)
}
export var isUndefined = function (obj) {
	return obj === void 0
}
export var isString = function (obj) {
	return toString.call(obj) === '[object String]'
}
export var isDate = function (obj) {
	return toString.call(obj) === '[object Date]'
}
export var isBoolean = function (obj) {
	return toString.call(obj) === '[object Boolean]'
}
export var isNumber = function (obj) {
	return toString.call(obj) === '[object Number]' && /[\d\.]+/.test(String(obj))
}

export var toArray = function (iterable) {
	if (!iterable) return []
	if (iterable.toArray) {
		return iterable.toArray()
	}
	if (Array.isArray(iterable)) {
		return slice.call(iterable)
	}
	if (isArguments(iterable)) {
		return slice.call(iterable)
	}
	return values(iterable)
}
export var areInOrder = function () {
	var numbers = toArray(arguments)
	for (var i = 1; i < numbers.length; i += 1) {
		if (numbers[i - 1] > numbers[i]) {
			return false
		}
	}
	return true
}
/**
 * UUID v4
 * from https://gist.github.com/jed/982883
 */
export function UUID(placeholder) {
	return placeholder
		? // tslint:disable-next-line no-bitwise
		  (
				parseInt(placeholder, 10) ^
				((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))
		  ).toString(16)
		: `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, UUID)
}

export function isPercentage(value) {
	return isNumber(value) && value >= 0 && value <= 100
}

export var extend = function (obj) {
	slice.call(arguments, 1).forEach(function (source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				obj[prop] = source[prop]
			}
		}
	})
	return obj
}
export var extend2Lev = function (obj) {
	slice.call(arguments, 1).forEach(function (source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				if (isObject(source[prop]) && isObject(obj[prop])) {
					extend(obj[prop], source[prop])
				} else {
					obj[prop] = source[prop]
				}
			}
		}
	})
	return obj
}

export var trim = function (str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}
export var isObject = function (obj) {
	if (obj === null) return false
	return toString.call(obj) === '[object Object]'
}
export var isEmptyObject = function (obj) {
	if (isObject(obj)) {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false
			}
		}
		return true
	} else {
		return false
	}
}

export var isJSONString = function (str) {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}
export var safeJSONParse = function (str) {
	var val = null
	try {
		val = JSON.parse(str)
	} catch (e) {
		return false
	}
	return val
}
export var now =
	Date.now ||
	function () {
		return new Date().getTime()
	}
export var throttle = function (func, wait, options) {
	var timeout, context, args, result
	var previous = 0
	if (!options) options = {}

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
		args = arguments
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		//下次触发 func 剩余的时间
		var remaining = wait - (now - previous)
		context = this
		// 如果没有剩余的时间了或者你改了系统时间
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			result = func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
		return result
	}
	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = null
	}
	return throttled
}
export function noop() {}
/**
 * Return true if the draw is successful
 * @param threshold between 0 and 100
 */
export function performDraw(threshold) {
	return threshold !== 0 && Math.random() * 100 <= threshold
}
export function findByPath(source, path) {
	var pathArr = path.split('.')
	while (pathArr.length) {
		var key = pathArr.shift()
		if (key in source && hasOwnProperty.call(source, key)) {
			source = source[key]
		} else {
			return undefined
		}
	}
	return source
}
export function withSnakeCaseKeys(candidate) {
	const result = {}
	Object.keys(candidate).forEach((key) => {
		result[toSnakeCase(key)] = deepSnakeCase(candidate[key])
	})
	return result
}

export function deepSnakeCase(candidate) {
	if (Array.isArray(candidate)) {
		return candidate.map((value) => deepSnakeCase(value))
	}
	if (typeof candidate === 'object' && candidate !== null) {
		return withSnakeCaseKeys(candidate)
	}
	return candidate
}

export function toSnakeCase(word) {
	return word
		.replace(
			/[A-Z]/g,
			(uppercaseLetter, index) =>
				`${index !== 0 ? '_' : ''}${uppercaseLetter.toLowerCase()}`,
		)
		.replace(/-/g, '_')
}

export function escapeRowData(str) {
	if (!isString(str)) return str
	var reg = /[\s=,"]/g
	return String(str).replace(reg, function (word) {
		return '\\' + word
	})
}
export var urlParse = function (para) {
	var URLParser = function (a) {
		this._fields = {
			Username: 4,
			Password: 5,
			Port: 7,
			Protocol: 2,
			Host: 6,
			Path: 8,
			URL: 0,
			QueryString: 9,
			Fragment: 10,
		}
		this._values = {}
		this._regex = null
		this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/

		if (typeof a != 'undefined') {
			this._parse(a)
		}
	}
	URLParser.prototype.setUrl = function (a) {
		this._parse(a)
	}
	URLParser.prototype._initValues = function () {
		for (var a in this._fields) {
			this._values[a] = ''
		}
	}
	URLParser.prototype.addQueryString = function (queryObj) {
		if (typeof queryObj !== 'object') {
			return false
		}
		var query = this._values.QueryString || ''
		for (var i in queryObj) {
			if (new RegExp(i + '[^&]+').test(query)) {
				query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i])
			} else {
				if (query.slice(-1) === '&') {
					query = query + i + '=' + queryObj[i]
				} else {
					if (query === '') {
						query = i + '=' + queryObj[i]
					} else {
						query = query + '&' + i + '=' + queryObj[i]
					}
				}
			}
		}
		this._values.QueryString = query
	}
	URLParser.prototype.getParse = function () {
		return this._values
	}
	URLParser.prototype.getUrl = function () {
		var url = ''
		url += this._values.Origin
		url += this._values.Port ? ':' + this._values.Port : ''
		url += this._values.Path
		url += this._values.QueryString ? '?' + this._values.QueryString : ''
		return url
	}
	URLParser.prototype._parse = function (a) {
		this._initValues()
		var b = this._regex.exec(a)
		if (!b) {
			throw 'DPURLParser::_parse -> Invalid URL'
		}
		for (var c in this._fields) {
			if (typeof b[this._fields[c]] != 'undefined') {
				this._values[c] = b[this._fields[c]]
			}
		}
		this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '')
		this._values['Origin'] =
			this._values['Protocol'] + '://' + this._values['Hostname']
	}
	return new URLParser(para)
}
export const getOwnObjectKeys = function (obj, isEnumerable) {
	var keys = Object.keys(obj)
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(obj)
		if (isEnumerable) {
			symbols = symbols.filter(function (t) {
				return Object.getOwnPropertyDescriptor(obj, t).enumerable
			})
		}
		keys.push.apply(keys, symbols)
	}
	return keys
}
export const defineObject = function (obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true,
		})
	} else {
		obj[key] = value
	}
	return obj
}
export const deepMixObject = function (targetObj) {
	for (var t = 1; t < arguments.length; t++) {
		var target = arguments[t] != null ? arguments[t] : {}
		if (t % 2) {
			getOwnObjectKeys(Object(target), true).forEach(function (t) {
				defineObject(targetObj, t, target[t])
			})
		} else {
			if (Object.getOwnPropertyDescriptors) {
				Object.defineProperties(
					targetObj,
					Object.getOwnPropertyDescriptors(target),
				)
			} else {
				getOwnObjectKeys(Object(target)).forEach(function (t) {
					Object.defineProperty(
						targetObj,
						t,
						Object.getOwnPropertyDescriptor(target, t),
					)
				})
			}
		}
	}
	return targetObj
}
