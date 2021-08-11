"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.round = round;
exports.msToNs = msToNs;
exports.UUID = UUID;
exports.jsonStringify = jsonStringify;
exports.elapsed = elapsed;
exports.getMethods = getMethods;
exports.replaceNumberCharByPath = replaceNumberCharByPath;
exports.getStatusGroup = getStatusGroup;
exports.isPercentage = isPercentage;
exports.noop = noop;
exports.performDraw = performDraw;
exports.findByPath = findByPath;
exports.withSnakeCaseKeys = withSnakeCaseKeys;
exports.deepSnakeCase = deepSnakeCase;
exports.toSnakeCase = toSnakeCase;
exports.escapeRowData = escapeRowData;
exports.deepMixObject = exports.defineObject = exports.getOwnObjectKeys = exports.urlParse = exports.throttle = exports.now = exports.safeJSONParse = exports.isJSONString = exports.isEmptyObject = exports.isObject = exports.trim = exports.extend2Lev = exports.extend = exports.getQueryParamsFromUrl = exports.areInOrder = exports.toArray = exports.isNumber = exports.isBoolean = exports.isDate = exports.isString = exports.isUndefined = exports.values = exports.each = exports.isArguments = void 0;

var _enums = require("./enums");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ArrayProto = Array.prototype;
var ObjProto = Object.prototype;
var ObjProto = Object.prototype;
var hasOwnProperty = ObjProto.hasOwnProperty;
var slice = ArrayProto.slice;
var toString = ObjProto.toString;
var nativeForEach = ArrayProto.forEach;
var breaker = false;

var isArguments = function isArguments(obj) {
  return !!(obj && hasOwnProperty.call(obj, 'callee'));
};

exports.isArguments = isArguments;

var each = function each(obj, iterator, context) {
  if (obj === null) return false;

  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
        return false;
      }
    }
  } else {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) {
          return false;
        }
      }
    }
  }
};

exports.each = each;

var values = function values(obj) {
  var results = [];

  if (obj === null) {
    return results;
  }

  each(obj, function (value) {
    results[results.length] = value;
  });
  return results;
};

exports.values = values;

function round(num, decimals) {
  return +num.toFixed(decimals);
}

function msToNs(duration) {
  if (typeof duration !== 'number') {
    return duration;
  }

  return round(duration * 1e6, 0);
}

var isUndefined = function isUndefined(obj) {
  return obj === void 0;
};

exports.isUndefined = isUndefined;

var isString = function isString(obj) {
  return toString.call(obj) === '[object String]';
};

exports.isString = isString;

var isDate = function isDate(obj) {
  return toString.call(obj) === '[object Date]';
};

exports.isDate = isDate;

var isBoolean = function isBoolean(obj) {
  return toString.call(obj) === '[object Boolean]';
};

exports.isBoolean = isBoolean;

var isNumber = function isNumber(obj) {
  return toString.call(obj) === '[object Number]' && /[\d\.]+/.test(String(obj));
};

exports.isNumber = isNumber;

var toArray = function toArray(iterable) {
  if (!iterable) return [];

  if (iterable.toArray) {
    return iterable.toArray();
  }

  if (Array.isArray(iterable)) {
    return slice.call(iterable);
  }

  if (isArguments(iterable)) {
    return slice.call(iterable);
  }

  return values(iterable);
};

exports.toArray = toArray;

var areInOrder = function areInOrder() {
  var numbers = toArray(arguments);

  for (var i = 1; i < numbers.length; i += 1) {
    if (numbers[i - 1] > numbers[i]) {
      return false;
    }
  }

  return true;
};
/**
 * UUID v4
 * from https://gist.github.com/jed/982883
 */


exports.areInOrder = areInOrder;

function UUID(placeholder) {
  return placeholder ? // tslint:disable-next-line no-bitwise
  (parseInt(placeholder, 10) ^ Math.random() * 16 >> parseInt(placeholder, 10) / 4).toString(16) : "".concat(1e7, "-", 1e3, "-", 4e3, "-", 8e3, "-", 1e11).replace(/[018]/g, UUID);
}

function jsonStringify(value, replacer, space) {
  if (value === null || value === undefined) {
    return JSON.stringify(value);
  }

  var originalToJSON = [false, undefined];

  if (hasToJSON(value)) {
    // We need to add a flag and not rely on the truthiness of value.toJSON
    // because it can be set but undefined and that's actually significant.
    originalToJSON = [true, value.toJSON];
    delete value.toJSON;
  }

  var originalProtoToJSON = [false, undefined];
  var prototype;

  if (_typeof(value) === 'object') {
    prototype = Object.getPrototypeOf(value);

    if (hasToJSON(prototype)) {
      originalProtoToJSON = [true, prototype.toJSON];
      delete prototype.toJSON;
    }
  }

  var result;

  try {
    result = JSON.stringify(value, undefined, space);
  } catch (e) {
    result = '<error: unable to serialize object>';
  } finally {
    if (originalToJSON[0]) {
      value.toJSON = originalToJSON[1];
    }

    if (originalProtoToJSON[0]) {
      prototype.toJSON = originalProtoToJSON[1];
    }
  }

  return result;
}

function hasToJSON(value) {
  return _typeof(value) === 'object' && value !== null && value.hasOwnProperty('toJSON');
}

function elapsed(start, end) {
  return end - start;
}

function getMethods(obj) {
  var funcs = [];

  for (var key in obj) {
    if (typeof obj[key] === 'function' && !_enums.MpHook[key]) {
      funcs.push(key);
    }
  }

  return funcs;
} // 替换url包含数字的路由


function replaceNumberCharByPath(path) {
  if (path) {
    return path.replace(/\/([^\/]*)\d([^\/]*)/g, '/?');
  } else {
    return '';
  }
}

function getStatusGroup(status) {
  if (!status) return status;
  return String(status).substr(0, 1) + String(status).substr(1).replace(/\d*/g, 'x');
}

var getQueryParamsFromUrl = function getQueryParamsFromUrl(url) {
  var result = {};
  var arr = url.split('?');
  var queryString = arr[1] || '';

  if (queryString) {
    result = getURLSearchParams('?' + queryString);
  }

  return result;
};

exports.getQueryParamsFromUrl = getQueryParamsFromUrl;

function isPercentage(value) {
  return isNumber(value) && value >= 0 && value <= 100;
}

var extend = function extend(obj) {
  slice.call(arguments, 1).forEach(function (source) {
    for (var prop in source) {
      if (source[prop] !== void 0) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
};

exports.extend = extend;

var extend2Lev = function extend2Lev(obj) {
  slice.call(arguments, 1).forEach(function (source) {
    for (var prop in source) {
      if (source[prop] !== void 0) {
        if (isObject(source[prop]) && isObject(obj[prop])) {
          extend(obj[prop], source[prop]);
        } else {
          obj[prop] = source[prop];
        }
      }
    }
  });
  return obj;
};

exports.extend2Lev = extend2Lev;

var trim = function trim(str) {
  return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
};

exports.trim = trim;

var isObject = function isObject(obj) {
  if (obj === null) return false;
  return toString.call(obj) === '[object Object]';
};

exports.isObject = isObject;

var isEmptyObject = function isEmptyObject(obj) {
  if (isObject(obj)) {
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
};

exports.isEmptyObject = isEmptyObject;

var isJSONString = function isJSONString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }

  return true;
};

exports.isJSONString = isJSONString;

var safeJSONParse = function safeJSONParse(str) {
  var val = null;

  try {
    val = JSON.parse(str);
  } catch (e) {
    return false;
  }

  return val;
};

exports.safeJSONParse = safeJSONParse;

var now = Date.now || function () {
  return new Date().getTime();
};

exports.now = now;

var throttle = function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function later() {
    previous = options.leading === false ? 0 : new Date().getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };

  var throttled = function throttled() {
    args = arguments;
    var now = new Date().getTime();
    if (!previous && options.leading === false) previous = now; //下次触发 func 剩余的时间

    var remaining = wait - (now - previous);
    context = this; // 如果没有剩余的时间了或者你改了系统时间

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
  };

  return throttled;
};

exports.throttle = throttle;

function noop() {}
/**
 * Return true if the draw is successful
 * @param threshold between 0 and 100
 */


function performDraw(threshold) {
  return threshold !== 0 && Math.random() * 100 <= threshold;
}

function findByPath(source, path) {
  var pathArr = path.split('.');

  while (pathArr.length) {
    var key = pathArr.shift();

    if (source && key in source && hasOwnProperty.call(source, key)) {
      source = source[key];
    } else {
      return undefined;
    }
  }

  return source;
}

function withSnakeCaseKeys(candidate) {
  var result = {};
  Object.keys(candidate).forEach(function (key) {
    result[toSnakeCase(key)] = deepSnakeCase(candidate[key]);
  });
  return result;
}

function deepSnakeCase(candidate) {
  if (Array.isArray(candidate)) {
    return candidate.map(function (value) {
      return deepSnakeCase(value);
    });
  }

  if (_typeof(candidate) === 'object' && candidate !== null) {
    return withSnakeCaseKeys(candidate);
  }

  return candidate;
}

function toSnakeCase(word) {
  return word.replace(/[A-Z]/g, function (uppercaseLetter, index) {
    return (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase();
  }).replace(/-/g, '_');
}

function escapeRowData(str) {
  if (!isString(str)) return str;
  var reg = /[\s=,"]/g;
  return String(str).replace(reg, function (word) {
    return '\\' + word;
  });
}

var urlParse = function urlParse(para) {
  var URLParser = function URLParser(a) {
    this._fields = {
      Username: 4,
      Password: 5,
      Port: 7,
      Protocol: 2,
      Host: 6,
      Path: 8,
      URL: 0,
      QueryString: 9,
      Fragment: 10
    };
    this._values = {};
    this._regex = null;
    this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

    if (typeof a != 'undefined') {
      this._parse(a);
    }
  };

  URLParser.prototype.setUrl = function (a) {
    this._parse(a);
  };

  URLParser.prototype._initValues = function () {
    for (var a in this._fields) {
      this._values[a] = '';
    }
  };

  URLParser.prototype.addQueryString = function (queryObj) {
    if (_typeof(queryObj) !== 'object') {
      return false;
    }

    var query = this._values.QueryString || '';

    for (var i in queryObj) {
      if (new RegExp(i + '[^&]+').test(query)) {
        query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i]);
      } else {
        if (query.slice(-1) === '&') {
          query = query + i + '=' + queryObj[i];
        } else {
          if (query === '') {
            query = i + '=' + queryObj[i];
          } else {
            query = query + '&' + i + '=' + queryObj[i];
          }
        }
      }
    }

    this._values.QueryString = query;
  };

  URLParser.prototype.getParse = function () {
    return this._values;
  };

  URLParser.prototype.getUrl = function () {
    var url = '';
    url += this._values.Origin;
    url += this._values.Port ? ':' + this._values.Port : '';
    url += this._values.Path;
    url += this._values.QueryString ? '?' + this._values.QueryString : '';
    return url;
  };

  URLParser.prototype._parse = function (a) {
    this._initValues();

    var b = this._regex.exec(a);

    if (!b) {
      throw 'DPURLParser::_parse -> Invalid URL';
    }

    for (var c in this._fields) {
      if (typeof b[this._fields[c]] != 'undefined') {
        this._values[c] = b[this._fields[c]];
      }
    }

    this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '');
    this._values['Origin'] = this._values['Protocol'] + '://' + this._values['Hostname'];
  };

  return new URLParser(para);
};

exports.urlParse = urlParse;

var getOwnObjectKeys = function getOwnObjectKeys(obj, isEnumerable) {
  var keys = Object.keys(obj);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(obj);

    if (isEnumerable) {
      symbols = symbols.filter(function (t) {
        return Object.getOwnPropertyDescriptor(obj, t).enumerable;
      });
    }

    keys.push.apply(keys, symbols);
  }

  return keys;
};

exports.getOwnObjectKeys = getOwnObjectKeys;

var defineObject = function defineObject(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

exports.defineObject = defineObject;

var deepMixObject = function deepMixObject(targetObj) {
  for (var t = 1; t < arguments.length; t++) {
    var target = arguments[t] != null ? arguments[t] : {};

    if (t % 2) {
      getOwnObjectKeys(Object(target), true).forEach(function (t) {
        defineObject(targetObj, t, target[t]);
      });
    } else {
      if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(targetObj, Object.getOwnPropertyDescriptors(target));
      } else {
        getOwnObjectKeys(Object(target)).forEach(function (t) {
          Object.defineProperty(targetObj, t, Object.getOwnPropertyDescriptor(target, t));
        });
      }
    }
  }

  return targetObj;
};

exports.deepMixObject = deepMixObject;