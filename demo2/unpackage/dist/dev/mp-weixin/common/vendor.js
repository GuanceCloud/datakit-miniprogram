(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse || !wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"rrr","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destory', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueId = this.$options.propsData.vueId;
    var object = center[vueId] = center[vueId] || {};
    object[name] = value;
    if (parents[vueId]) {
      parents[vueId].$forceUpdate();
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      appOptions.onShow.apply(app, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      appOptions.onHide.apply(app, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(app, args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      appOptions.onShow.apply(vm, args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      appOptions.onHide.apply(vm, args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch.call(vm, args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"rrr","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"rrr","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"rrr","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"rrr","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!******************************************************************************!*\
  !*** /Users/arnolddeng/Desktop/www/dataflux-rum-sdk-wechat/demo2/pages.json ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */
/*!*******************************************************************************************************!*\
  !*** /Users/arnolddeng/Desktop/www/dataflux-rum-sdk-wechat/demo2/miniprogram/dataflux-rum-miniapp.js ***!
  \*******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} /******/(function () {// webpackBootstrap
  /******/"use strict";
  /******/var __webpack_modules__ = {

    /***/"./src/boot/buildEnv.js":
    /*!******************************!*\
                                     !*** ./src/boot/buildEnv.js ***!
                                     \******************************/
    /***/function srcBootBuildEnvJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"buildEnv": function buildEnv() {return (/* binding */_buildEnv);}
        /* harmony export */ });
      var _buildEnv = {
        sdkVersion: '<<< SDK_VERSION >>>',
        sdkName: 'df_miniapp_rum_sdk' };



      /***/},

    /***/"./src/boot/rum.entry.js":
    /*!*******************************!*\
                                      !*** ./src/boot/rum.entry.js ***!
                                      \*******************************/
    /***/function srcBootRumEntryJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"makeRum": function makeRum() {return (/* binding */_makeRum);},
        /* harmony export */"datafluxRum": function datafluxRum() {return (/* binding */_datafluxRum);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _rum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./rum */"./src/boot/rum.js");


      var _makeRum = function _makeRum(startRumImpl) {
        var isAlreadyInitialized = false;
        var rumGlobal = {
          init: function init(userConfiguration) {
            if (typeof userConfiguration === 'undefined') {
              userConfiguration = {};
            }
            if (!canInitRum(userConfiguration)) {
              return;
            }
            startRumImpl(userConfiguration);

            isAlreadyInitialized = true;
          } };

        return rumGlobal;
        function canInitRum(userConfiguration) {
          if (isAlreadyInitialized) {
            console.error('DATAFLUX_RUM is already initialized.');
            return false;
          }

          if (!userConfiguration.applicationId) {
            console.error(
            'Application ID is not configured, no RUM data will be collected.');

            return false;
          }
          if (!userConfiguration.datakitOrigin) {
            console.error(
            'datakitOrigin is not configured, no RUM data will be collected.');

            return false;
          }
          if (
          userConfiguration.sampleRate !== undefined &&
          !(0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isPercentage)(userConfiguration.sampleRate))
          {
            console.error('Sample Rate should be a number between 0 and 100');
            return false;
          }
          return true;
        }
      };
      var _datafluxRum = _makeRum(_rum__WEBPACK_IMPORTED_MODULE_1__.startRum);


      /***/},

    /***/"./src/boot/rum.js":
    /*!*************************!*\
                                !*** ./src/boot/rum.js ***!
                                \*************************/
    /***/function srcBootRumJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startRum": function startRum() {return (/* binding */_startRum);}
        /* harmony export */ });
      /* harmony import */var _buildEnv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./buildEnv */"./src/boot/buildEnv.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _core_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/configuration */"./src/core/configuration.js");
      /* harmony import */var _rumEventsCollection_error_errorCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../rumEventsCollection/error/errorCollection */"./src/rumEventsCollection/error/errorCollection.js");
      /* harmony import */var _rumEventsCollection_assembly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ../rumEventsCollection/assembly */"./src/rumEventsCollection/assembly.js");
      /* harmony import */var _rumEventsCollection_parentContexts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ../rumEventsCollection/parentContexts */"./src/rumEventsCollection/parentContexts.js");
      /* harmony import */var _rumEventsCollection_transport_batch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__( /*! ../rumEventsCollection/transport/batch */"./src/rumEventsCollection/transport/batch.js");
      /* harmony import */var _rumEventsCollection_page_viewCollection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__( /*! ../rumEventsCollection/page/viewCollection */"./src/rumEventsCollection/page/viewCollection.js");
      /* harmony import */var _rumEventsCollection_requestCollection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__( /*! ../rumEventsCollection/requestCollection */"./src/rumEventsCollection/requestCollection.js");
      /* harmony import */var _rumEventsCollection_resource_resourceCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__( /*! ../rumEventsCollection/resource/resourceCollection */"./src/rumEventsCollection/resource/resourceCollection.js");
      /* harmony import */var _rumEventsCollection_app_appCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__( /*! ../rumEventsCollection/app/appCollection */"./src/rumEventsCollection/app/appCollection.js");
      /* harmony import */var _rumEventsCollection_performanceCollection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__( /*! ../rumEventsCollection/performanceCollection */"./src/rumEventsCollection/performanceCollection.js");
      /* harmony import */var _rumEventsCollection_setDataCollection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__( /*! ../rumEventsCollection/setDataCollection */"./src/rumEventsCollection/setDataCollection.js");
      /* harmony import */var _rumEventsCollection_action_actionCollection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__( /*! ../rumEventsCollection/action/actionCollection */"./src/rumEventsCollection/action/actionCollection.js");
      /* harmony import */var _core_sdk__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__( /*! ../core/sdk */"./src/core/sdk.js");
















      var _startRum = function _startRum(userConfiguration) {
        var configuration = (0, _core_configuration__WEBPACK_IMPORTED_MODULE_2__.commonInit)(userConfiguration, _buildEnv__WEBPACK_IMPORTED_MODULE_0__.buildEnv);
        var lifeCycle = new _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycle();
        var parentContexts = (0, _rumEventsCollection_parentContexts__WEBPACK_IMPORTED_MODULE_5__.startParentContexts)(lifeCycle);
        var batch = (0, _rumEventsCollection_transport_batch__WEBPACK_IMPORTED_MODULE_6__.startRumBatch)(configuration, lifeCycle);
        (0, _rumEventsCollection_assembly__WEBPACK_IMPORTED_MODULE_4__.startRumAssembly)(
        userConfiguration.applicationId,
        configuration,
        lifeCycle,
        parentContexts);

        (0, _rumEventsCollection_app_appCollection__WEBPACK_IMPORTED_MODULE_10__.startAppCollection)(lifeCycle, configuration);
        (0, _rumEventsCollection_resource_resourceCollection__WEBPACK_IMPORTED_MODULE_9__.startResourceCollection)(lifeCycle, configuration);
        (0, _rumEventsCollection_page_viewCollection__WEBPACK_IMPORTED_MODULE_7__.startViewCollection)(lifeCycle, configuration);
        (0, _rumEventsCollection_error_errorCollection__WEBPACK_IMPORTED_MODULE_3__.startErrorCollection)(lifeCycle, configuration);
        (0, _rumEventsCollection_requestCollection__WEBPACK_IMPORTED_MODULE_8__.startRequestCollection)(lifeCycle, configuration);
        (0, _rumEventsCollection_performanceCollection__WEBPACK_IMPORTED_MODULE_11__.startPagePerformanceObservable)(lifeCycle, configuration);
        (0, _rumEventsCollection_setDataCollection__WEBPACK_IMPORTED_MODULE_12__.startSetDataColloction)(lifeCycle);
        (0, _rumEventsCollection_action_actionCollection__WEBPACK_IMPORTED_MODULE_13__.startActionCollection)(lifeCycle, configuration);
      };


      /***/},

    /***/"./src/core/baseInfo.js":
    /*!******************************!*\
                                     !*** ./src/core/baseInfo.js ***!
                                     \******************************/
    /***/function srcCoreBaseInfoJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"default": function _default() {return __WEBPACK_DEFAULT_EXPORT__;}
        /* harmony export */ });
      /* harmony import */var _core_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../core/sdk */"./src/core/sdk.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");var



      BaseInfo = /*#__PURE__*/function () {
        function BaseInfo() {_classCallCheck(this, BaseInfo);
          this.sessionId = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.UUID)();
          this.getDeviceInfo();
          this.getNetWork();
        }_createClass(BaseInfo, [{ key: "getDeviceInfo", value: function getDeviceInfo()
          {
            try {
              var deviceInfo = _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getSystemInfoSync();
              var osInfo = deviceInfo.system.split(' ');
              var osVersion = osInfo.length > 1 && osInfo[1];
              var osVersionMajor =
              osVersion.split('.').length && osVersion.split('.')[0];
              var deviceUUid = '';
              if (deviceInfo.host) {
                deviceUUid = deviceInfo.host.appId;
              }
              this.deviceInfo = {
                screenSize: "".concat(deviceInfo.screenWidth, "*").concat(deviceInfo.screenHeight, " "),
                platform: deviceInfo.platform,
                platformVersion: deviceInfo.version,
                osVersion: osVersion,
                osVersionMajor: osVersionMajor,
                os: osInfo.length > 1 && osInfo[0],
                brand: deviceInfo.brand,
                model: deviceInfo.model,
                frameworkVersion: deviceInfo.SDKVersion,
                pixelRatio: deviceInfo.pixelRatio,
                deviceUuid: deviceUUid };

            } catch (e) {}
          } }, { key: "getClientID", value: function getClientID()
          {
            var clienetId = _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getStorageSync(_helper_enums__WEBPACK_IMPORTED_MODULE_2__.CLIENT_ID_TOKEN);
            if (!clienetId) {
              clienetId = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.UUID)();
              _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.setStorageSync(_helper_enums__WEBPACK_IMPORTED_MODULE_2__.CLIENT_ID_TOKEN, clienetId);
            }
            return clienetId;
          } }, { key: "getNetWork", value: function getNetWork()
          {var _this2 = this;
            _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getNetworkType({
              success: function success(e) {
                _this2.deviceInfo.network = e.networkType ? e.networkType : 'unknown';
              } });

            _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onNetworkStatusChange(function (e) {
              _this2.deviceInfo.network = e.networkType ? e.networkType : 'unknown';
            });
          } }, { key: "getSessionId", value: function getSessionId()
          {
            return this.sessionId;
          } }]);return BaseInfo;}();


      /* harmony default export */var __WEBPACK_DEFAULT_EXPORT__ = new BaseInfo();


      /***/},

    /***/"./src/core/configuration.js":
    /*!***********************************!*\
                                          !*** ./src/core/configuration.js ***!
                                          \***********************************/
    /***/function srcCoreConfigurationJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"DEFAULT_CONFIGURATION": function DEFAULT_CONFIGURATION() {return (/* binding */_DEFAULT_CONFIGURATION);},
        /* harmony export */"commonInit": function commonInit() {return (/* binding */_commonInit);},
        /* harmony export */"isIntakeRequest": function isIntakeRequest() {return (/* binding */_isIntakeRequest);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");


      var _DEFAULT_CONFIGURATION = {
        sampleRate: 100,
        flushTimeout: 30 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_SECOND,
        maxErrorsByMinute: 3000,
        /**
                                  * Logs intake limit
                                  */
        maxBatchSize: 50,
        maxMessageSize: 256 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,

        /**
                                                                                         * beacon payload max queue size implementation is 64kb
                                                                                         * ensure that we leave room for logs, rum and potential other users
                                                                                         */
        batchBytesLimit: 16 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
        datakitUrl: '',
        /**
                         * arbitrary value, byte precision not needed
                         */
        requestErrorResponseLengthLimit: 32 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
        trackInteractions: false };


      function getDatakitUrlUrl(url) {
        if (url && url.lastIndexOf('/') === url.length - 1)
        return url + 'v1/write/rum';
        return url + '/v1/write/rum';
      }
      function _commonInit(userConfiguration, buildEnv) {
        var transportConfiguration = {
          applicationId: userConfiguration.applicationId,
          env: userConfiguration.env || '',
          version: userConfiguration.version || '',
          sdkVersion: buildEnv.sdkVersion,
          sdkName: buildEnv.sdkName,
          datakitUrl: getDatakitUrlUrl(
          userConfiguration.datakitUrl || userConfiguration.datakitOrigin),

          tags: userConfiguration.tags || [] };

        if ('trackInteractions' in userConfiguration) {
          transportConfiguration.trackInteractions = !!userConfiguration.trackInteractions;
        }
        return (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(_DEFAULT_CONFIGURATION, transportConfiguration);
      }
      var haveSameOrigin = function haveSameOrigin(url1, url2) {
        var parseUrl1 = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.urlParse)(url1).getParse();
        var parseUrl2 = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.urlParse)(url2).getParse();
        return parseUrl1.Origin === parseUrl2.Origin;
      };
      function _isIntakeRequest(url, configuration) {
        return haveSameOrigin(url, configuration.datakitUrl);
      }


      /***/},

    /***/"./src/core/dataMap.js":
    /*!*****************************!*\
                                    !*** ./src/core/dataMap.js ***!
                                    \*****************************/
    /***/function srcCoreDataMapJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"commonTags": function commonTags() {return (/* binding */_commonTags);},
        /* harmony export */"dataMap": function dataMap() {return (/* binding */_dataMap);}
        /* harmony export */ });
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");

      // 需要用双引号将字符串类型的field value括起来， 这里有数组标示[string, path]
      var _commonTags = {
        sdk_name: '_dd.sdk_name',
        sdk_version: '_dd.sdk_version',
        app_id: 'application.id',
        env: '_dd.env',
        version: '_dd.version',
        userid: 'user.user_id',
        session_id: 'session.id',
        is_signin: 'user.is_signin',
        device: 'device.brand',
        model: 'device.model',
        device_uuid: 'device.device_uuid',
        os: 'device.os',
        os_version: 'device.os_version',
        os_version_major: 'device.os_version_major',
        screen_size: 'device.screen_size',
        network_type: 'device.network_type',
        platform: 'device.platform',
        platform_version: 'device.platform_version',
        app_framework_version: 'device.framework_version',
        view_id: 'page.id',
        view_name: 'page.route',
        view_referer: 'page.referer' };

      var _dataMap = {
        view: {
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.VIEW,
          tags: {
            view_apdex_level: 'page.apdex_level',
            is_active: 'page.is_active' },

          fields: {
            page_fmp: 'page.fmp',
            first_paint_time: 'page.fpt',
            loading_time: 'page.loading_time',
            onload_to_onshow: 'page.onload2onshow',
            onshow_to_onready: 'page.onshow2onready',
            time_spent: 'page.time_spent',
            view_error_count: 'page.error.count',
            view_resource_count: 'page.error.count',
            view_long_task_count: 'page.long_task.count',
            view_action_count: 'page.action.count',
            view_setdata_count: 'page.setdata.count' } },


        resource: {
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.RESOURCE,
          tags: {
            resource_type: 'resource.type',
            resource_status: 'resource.status',
            resource_status_group: 'resource.status_group',
            resource_method: 'resource.method',
            resource_url: 'resource.url',
            resource_url_host: 'resource.url_host',
            resource_url_path: 'resource.url_path',
            resource_url_path_group: 'resource.url_path_group',
            resource_url_query: 'resource.url_query' },

          fields: {
            resource_size: 'resource.size',
            resource_load: 'resource.load',
            resource_dns: 'resource.dns',
            resource_tcp: 'resource.tcp',
            resource_ssl: 'resource.ssl',
            resource_ttfb: 'resource.ttfb',
            resource_trans: 'resource.trans',
            resource_first_byte: 'resource.firstbyte',
            duration: 'resource.duration' } },


        error: {
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.ERROR,
          tags: {
            error_source: 'error.source',
            error_type: 'error.type',
            resource_url: 'error.resource.url',
            resource_url_host: 'error.resource.url_host',
            resource_url_path: 'error.resource.url_path',
            resource_url_path_group: 'error.resource.url_path_group',
            resource_status: 'error.resource.status',
            resource_status_group: 'error.resource.status_group',
            resource_method: 'error.resource.method' },

          fields: {
            error_message: ['string', 'error.message'],
            error_stack: ['string', 'error.stack'] } },


        long_task: {
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.LONG_TASK,
          tags: {},
          fields: {
            duration: 'long_task.duration' } },


        action: {
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.ACTION,
          tags: {
            action_id: 'action.id',
            action_name: 'action.target.name',
            action_type: 'action.type' },

          fields: {
            duration: 'action.loading_time' } } };





      /***/},

    /***/"./src/core/downloadProxy.js":
    /*!***********************************!*\
                                          !*** ./src/core/downloadProxy.js ***!
                                          \***********************************/
    /***/function srcCoreDownloadProxyJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startDownloadProxy": function startDownloadProxy() {return (/* binding */_startDownloadProxy);},
        /* harmony export */"resetDownloadProxy": function resetDownloadProxy() {return (/* binding */_resetDownloadProxy);}
        /* harmony export */ });
      /* harmony import */var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./sdk */"./src/core/sdk.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");



      var downloadProxySingleton;
      var beforeSendCallbacks = [];
      var onRequestCompleteCallbacks = [];
      var originalDownloadRequest;
      function _startDownloadProxy() {
        if (!downloadProxySingleton) {
          proxyDownload();
          downloadProxySingleton = {
            beforeSend: function beforeSend(callback) {
              beforeSendCallbacks.push(callback);
            },
            onRequestComplete: function onRequestComplete(callback) {
              onRequestCompleteCallbacks.push(callback);
            } };

        }
        return downloadProxySingleton;
      }

      function _resetDownloadProxy() {
        if (downloadProxySingleton) {
          downloadProxySingleton = undefined;
          beforeSendCallbacks.splice(0, beforeSendCallbacks.length);
          onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length);
          _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile = originalDownloadRequest;
        }
      }

      function proxyDownload() {
        originalDownloadRequest = _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile;
        _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile = function () {
          var _this = this;
          var dataflux_xhr = {
            method: 'GET',
            startTime: 0,
            url: arguments[0].url,
            type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RequestType.DOWNLOAD,
            responseType: 'file' };

          dataflux_xhr.startTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)();

          var originalSuccess = arguments[0].success;

          arguments[0].success = function () {
            reportXhr(arguments[0]);

            if (originalSuccess) {
              originalSuccess.apply(_this, arguments);
            }
          };
          var originalFail = arguments[0].fail;
          arguments[0].fail = function () {
            reportXhr(arguments[0]);
            if (originalFail) {
              originalFail.apply(_this, arguments);
            }
          };
          var hasBeenReported = false;
          var reportXhr = function reportXhr(res) {
            if (hasBeenReported) {
              return;
            }
            hasBeenReported = true;
            dataflux_xhr.duration = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - dataflux_xhr.startTime;
            dataflux_xhr.response = JSON.stringify({
              filePath: res.filePath,
              tempFilePath: res.tempFilePath });

            dataflux_xhr.header = res.header || {};
            dataflux_xhr.profile = res.profile;
            dataflux_xhr.status = res.statusCode || res.status || 0;
            onRequestCompleteCallbacks.forEach(function (callback) {
              callback(dataflux_xhr);
            });
          };
          beforeSendCallbacks.forEach(function (callback) {
            callback(dataflux_xhr);
          });
          return originalDownloadRequest.apply(this, arguments);
        };
      }


      /***/},

    /***/"./src/core/errorCollection.js":
    /*!*************************************!*\
                                            !*** ./src/core/errorCollection.js ***!
                                            \*************************************/
    /***/function srcCoreErrorCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startConsoleTracking": function startConsoleTracking() {return (/* binding */_startConsoleTracking);},
        /* harmony export */"stopConsoleTracking": function stopConsoleTracking() {return (/* binding */_stopConsoleTracking);},
        /* harmony export */"filterErrors": function filterErrors() {return (/* binding */_filterErrors);},
        /* harmony export */"startRuntimeErrorTracking": function startRuntimeErrorTracking() {return (/* binding */_startRuntimeErrorTracking);},
        /* harmony export */"stopRuntimeErrorTracking": function stopRuntimeErrorTracking() {return (/* binding */_stopRuntimeErrorTracking);},
        /* harmony export */"startAutomaticErrorCollection": function startAutomaticErrorCollection() {return (/* binding */_startAutomaticErrorCollection);},
        /* harmony export */"trackNetworkError": function trackNetworkError() {return (/* binding */_trackNetworkError);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _errorTools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./errorTools */"./src/core/errorTools.js");
      /* harmony import */var _helper_tracekit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../helper/tracekit */"./src/helper/tracekit.js");
      /* harmony import */var _observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ./observable */"./src/core/observable.js");
      /* harmony import */var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ./configuration */"./src/core/configuration.js");
      /* harmony import */var _xhrProxy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__( /*! ./xhrProxy */"./src/core/xhrProxy.js");
      /* harmony import */var _downloadProxy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__( /*! ./downloadProxy */"./src/core/downloadProxy.js");








      var originalConsoleError;

      function _startConsoleTracking(errorObservable) {
        originalConsoleError = console.error;
        console.error = function () {
          originalConsoleError.apply(console, arguments);
          var args = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.toArray)(arguments);
          var message = [];
          args.concat(['console error:']).forEach(function (para) {
            message.push(formatConsoleParameters(para));
          });

          errorObservable.notify({
            message: message.join(' '),
            source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.CONSOLE,
            startTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() });

        };
      }

      function _stopConsoleTracking() {
        console.error = originalConsoleError;
      }

      function formatConsoleParameters(param) {
        if (typeof param === 'string') {
          return param;
        }
        if (param instanceof Error) {
          return (0, _errorTools__WEBPACK_IMPORTED_MODULE_2__.toStackTraceString)((0, _helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.computeStackTrace)(param));
        }
        return JSON.stringify(param, undefined, 2);
      }
      function _filterErrors(configuration, errorObservable) {
        var errorCount = 0;
        var filteredErrorObservable = new _observable__WEBPACK_IMPORTED_MODULE_4__.Observable();
        errorObservable.subscribe(function (error) {
          if (errorCount < configuration.maxErrorsByMinute) {
            errorCount += 1;
            filteredErrorObservable.notify(error);
          } else if (errorCount === configuration.maxErrorsByMinute) {
            errorCount += 1;
            filteredErrorObservable.notify({
              message:
              'Reached max number of errors by minute: ' +
              configuration.maxErrorsByMinute,
              source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.AGENT,
              startTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() });

          }
        });
        setInterval(function () {
          errorCount = 0;
        }, _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_MINUTE);
        return filteredErrorObservable;
      }
      var traceKitReportHandler;

      function _startRuntimeErrorTracking(errorObservable) {
        traceKitReportHandler = function traceKitReportHandler(stackTrace, _, errorObject) {
          var error = (0, _errorTools__WEBPACK_IMPORTED_MODULE_2__.formatUnknownError)(stackTrace, errorObject, 'Uncaught');
          errorObservable.notify({
            message: error.message,
            stack: error.stack,
            type: error.type,
            source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.SOURCE,
            startTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() });

        };
        _helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.report.subscribe(traceKitReportHandler);
      }

      function _stopRuntimeErrorTracking() {
        _helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.report.unsubscribe(traceKitReportHandler);
      }
      var filteredErrorsObservable;

      function _startAutomaticErrorCollection(configuration) {
        if (!filteredErrorsObservable) {
          var errorObservable = new _observable__WEBPACK_IMPORTED_MODULE_4__.Observable();
          _trackNetworkError(configuration, errorObservable);
          _startConsoleTracking(errorObservable);
          _startRuntimeErrorTracking(errorObservable);
          filteredErrorsObservable = _filterErrors(configuration, errorObservable);
        }
        return filteredErrorsObservable;
      }

      function _trackNetworkError(configuration, errorObservable) {
        (0, _xhrProxy__WEBPACK_IMPORTED_MODULE_6__.startXhrProxy)().onRequestComplete(function (context) {
          return handleCompleteRequest(context.type, context);
        });
        (0, _downloadProxy__WEBPACK_IMPORTED_MODULE_7__.startDownloadProxy)().onRequestComplete(function (context) {
          return handleCompleteRequest(context.type, context);
        });

        function handleCompleteRequest(type, request) {
          if (
          !(0, _configuration__WEBPACK_IMPORTED_MODULE_5__.isIntakeRequest)(request.url, configuration) && (
          isRejected(request) || isServerError(request)))
          {
            errorObservable.notify({
              message: format(type) + 'error' + request.method + ' ' + request.url,
              resource: {
                method: request.method,
                statusCode: request.status,
                url: request.url },

              type: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.NETWORK,
              source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.NETWORK,
              stack:
              truncateResponse(request.response, configuration) || 'Failed to load',
              startTime: request.startTime });

          }
        }

        return {
          stop: function stop() {
            (0, _xhrProxy__WEBPACK_IMPORTED_MODULE_6__.resetXhrProxy)();
            (0, _downloadProxy__WEBPACK_IMPORTED_MODULE_7__.resetDownloadProxy)();
          } };

      }
      function isRejected(request) {
        return request.status === 0 && request.responseType !== 'opaque';
      }

      function isServerError(request) {
        return request.status >= 500;
      }

      function truncateResponse(response, configuration) {
        if (
        response &&
        response.length > configuration.requestErrorResponseLengthLimit)
        {
          return (
            response.substring(0, configuration.requestErrorResponseLengthLimit) +
            '...');

        }
        return response;
      }

      function format(type) {
        if (_helper_enums__WEBPACK_IMPORTED_MODULE_1__.RequestType.XHR === type) {
          return 'XHR';
        }
        return _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RequestType.DOWNLOAD;
      }


      /***/},

    /***/"./src/core/errorTools.js":
    /*!********************************!*\
                                       !*** ./src/core/errorTools.js ***!
                                       \********************************/
    /***/function srcCoreErrorToolsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"ErrorSource": function ErrorSource() {return (/* binding */_ErrorSource);},
        /* harmony export */"formatUnknownError": function formatUnknownError() {return (/* binding */_formatUnknownError);},
        /* harmony export */"toStackTraceString": function toStackTraceString() {return (/* binding */_toStackTraceString);}
        /* harmony export */ });
      var _ErrorSource = {
        AGENT: 'agent',
        CONSOLE: 'console',
        NETWORK: 'network',
        SOURCE: 'source',
        LOGGER: 'logger' };

      function _formatUnknownError(stackTrace, errorObject, nonErrorPrefix) {
        if (
        !stackTrace ||
        stackTrace.message === undefined && !(errorObject instanceof Error))
        {
          return {
            message: nonErrorPrefix + '' + JSON.stringify(errorObject),
            stack: 'No stack, consider using an instance of Error',
            type: stackTrace && stackTrace.name };

        }
        return {
          message: stackTrace.message || 'Empty message',
          stack: _toStackTraceString(stackTrace),
          type: stackTrace.name };

      }

      function _toStackTraceString(stack) {
        var result = stack.name || 'Error' + ': ' + stack.message;
        stack.stack.forEach(function (frame) {
          var func = frame.func === '?' ? '<anonymous>' : frame.func;
          var args =
          frame.args && frame.args.length > 0 ?
          '(' + frame.args.join(', ') + ')' :
          '';
          var line = frame.line ? ':' + frame.line : '';
          var column = frame.line && frame.column ? ':' + frame.column : '';
          result += '\n  at ' + func + args + ' @ ' + frame.url + line + column;
        });
        return result;
      }


      /***/},

    /***/"./src/core/lifeCycle.js":
    /*!*******************************!*\
                                      !*** ./src/core/lifeCycle.js ***!
                                      \*******************************/
    /***/function srcCoreLifeCycleJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"LifeCycle": function LifeCycle() {return (/* binding */_LifeCycle);},
        /* harmony export */"LifeCycleEventType": function LifeCycleEventType() {return (/* binding */_LifeCycleEventType);}
        /* harmony export */ });var
      _LifeCycle = /*#__PURE__*/function () {
        function _LifeCycle() {_classCallCheck(this, _LifeCycle);
          this.callbacks = {};
        }_createClass(_LifeCycle, [{ key: "notify", value: function notify(
          eventType, data) {
            var eventCallbacks = this.callbacks[eventType];
            if (eventCallbacks) {
              eventCallbacks.forEach(function (callback) {return callback(data);});
            }
          } }, { key: "subscribe", value: function subscribe(
          eventType, callback) {var _this3 = this;
            if (!this.callbacks[eventType]) {
              this.callbacks[eventType] = [];
            }
            this.callbacks[eventType].push(callback);
            return {
              unsubscribe: function unsubscribe() {
                _this3.callbacks[eventType] = _this3.callbacks[eventType].filter(
                function (other) {return callback !== other;});

              } };

          } }]);return _LifeCycle;}();


      var _LifeCycleEventType = {
        PERFORMANCE_ENTRY_COLLECTED: 'PERFORMANCE_ENTRY_COLLECTED',
        AUTO_ACTION_CREATED: 'AUTO_ACTION_CREATED',
        AUTO_ACTION_COMPLETED: 'AUTO_ACTION_COMPLETED',
        AUTO_ACTION_DISCARDED: 'AUTO_ACTION_DISCARDED',
        APP_HIDE: 'APP_HIDE',
        APP_UPDATE: 'APP_UPDATE',
        PAGE_SET_DATA_UPDATE: 'PAGE_SET_DATA_UPDATE',
        PAGE_ALIAS_ACTION: 'PAGE_ALIAS_ACTION',
        VIEW_CREATED: 'VIEW_CREATED',
        VIEW_UPDATED: 'VIEW_UPDATED',
        VIEW_ENDED: 'VIEW_ENDED',
        REQUEST_STARTED: 'REQUEST_STARTED',
        REQUEST_COMPLETED: 'REQUEST_COMPLETED',
        RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
        RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED' };



      /***/},

    /***/"./src/core/miniaTouch.js":
    /*!********************************!*\
                                       !*** ./src/core/miniaTouch.js ***!
                                       \********************************/
    /***/function srcCoreMiniaTouchJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"MinaTouch": function MinaTouch() {return (/* binding */_MinaTouch);}
        /* harmony export */ });
      var DEFAULT_OPTIONS = {
        touchStart: function touchStart() {},
        touchMove: function touchMove() {},
        touchEnd: function touchEnd() {},
        touchCancel: function touchCancel() {},
        multipointStart: function multipointStart() {},
        multipointEnd: function multipointEnd() {},
        tap: function tap() {},
        doubleTap: function doubleTap() {},
        longTap: function longTap() {},
        singleTap: function singleTap() {},
        rotate: function rotate() {},
        pinch: function pinch() {},
        pressMove: function pressMove() {},
        swipe: function swipe() {} };

      function _MinaTouch(_page, name) {var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        this.preV = { x: null, y: null };
        this.pinchStartLen = null;
        this.scale = 1;
        this.isDoubleTap = false;

        this.delta = null;
        this.last = null;
        this.now = null;
        this.tapTimeout = null;
        this.singleTapTimeout = null;
        this.longTapTimeout = null;
        this.swipeTimeout = null;
        this.x1 = this.x2 = this.y1 = this.y2 = null;
        this.preTapPosition = { x: null, y: null };

        this.lastZoom = 1;
        this.tempZoom = 1;

        try {
          if (this._checkBeforeCreate(_page, name)) {
            this._name = name;
            this._option = _objectSpread(_objectSpread({}, DEFAULT_OPTIONS), option);
            _page[name] = this;
            this._bindFunc(_page);
          }
        } catch (error) {
          console.error(error);
        }
      }
      _MinaTouch.prototype = {
        _checkBeforeCreate: function _checkBeforeCreate(_page, name) {
          if (!_page || !name) {
            throw new Error('MinaTouch实例化时，必须传入page对象和引用名');
          }
          if (_page[name]) {
            throw new Error('MinaTouch实例化error： ' + name + ' 已经存在page中');
          }
          return true;
        },
        _bindFunc: function _bindFunc(_page) {
          var funcNames = ['start', 'move', 'end', 'cancel'];
          for (var _i = 0, _funcNames = funcNames; _i < _funcNames.length; _i++) {var funcName = _funcNames[_i];
            _page[this._name + '.' + funcName] = this[funcName].bind(this);
          }
        },
        start: function start(evt) {
          if (!evt.touches) return;
          this.now = Date.now();
          this.x1 =
          evt.touches[0].pageX == null ? evt.touches[0].x : evt.touches[0].pageX;
          this.y1 =
          evt.touches[0].pageY == null ? evt.touches[0].y : evt.touches[0].pageY;
          this.delta = this.now - (this.last || this.now);
          this._option.touchStart(evt);
          if (this.preTapPosition.x !== null) {
            this.isDoubleTap =
            this.delta > 0 &&
            this.delta <= 250 &&
            Math.abs(this.preTapPosition.x - this.x1) < 30 &&
            Math.abs(this.preTapPosition.y - this.y1) < 30;
          }
          this.preTapPosition.x = this.x1;
          this.preTapPosition.y = this.y1;
          this.last = this.now;
          var preV = this.preV,
          len = evt.touches.length;
          if (len > 1) {
            this._cancelLongTap();
            this._cancelSingleTap();
            var otx =
            evt.touches[1].pageX == null ? evt.touches[1].x : evt.touches[1].pageX;
            var oty =
            evt.touches[1].pageY == null ? evt.touches[1].y : evt.touches[1].pageY;
            var v = { x: otx - this.x1, y: oty - this.y1 };
            preV.x = v.x;
            preV.y = v.y;
            this.pinchStartLen = getLen(preV);
            this._option.multipointStart(evt);
          }
          this.longTapTimeout = setTimeout(
          function () {
            evt.type = 'longTap';
            this._option.longTap(evt);
          }.bind(this),
          750);

        },
        move: function move(evt) {
          if (!evt.touches) return;
          var preV = this.preV,
          len = evt.touches.length,
          currentX =
          evt.touches[0].pageX == null ? evt.touches[0].x : evt.touches[0].pageX,
          currentY =
          evt.touches[0].pageY == null ? evt.touches[0].y : evt.touches[0].pageY;
          this.isDoubleTap = false;
          if (len > 1) {
            var otx =
            evt.touches[1].pageX == null ? evt.touches[1].x : evt.touches[1].pageX;
            var oty =
            evt.touches[1].pageY == null ? evt.touches[1].y : evt.touches[1].pageY;
            var v = { x: otx - currentX, y: oty - currentY };

            if (preV.x !== null) {
              if (this.pinchStartLen > 0) {
                evt.singleZoom = getLen(v) / this.pinchStartLen;
                evt.zoom = evt.singleZoom * this.lastZoom;
                this.tempZoom = evt.zoom;
                evt.type = 'pinch';
                this._option.pinch(evt);
              }

              evt.angle = getRotateAngle(v, preV);
              evt.type = 'rotate';
              this._option.rotate(evt);
            }
            preV.x = v.x;
            preV.y = v.y;
          } else {
            if (this.x2 !== null) {
              evt.deltaX = currentX - this.x2;
              evt.deltaY = currentY - this.y2;
            } else {
              evt.deltaX = 0;
              evt.deltaY = 0;
            }
            this._option.pressMove(evt);
          }

          this._option.touchMove(evt);

          this._cancelLongTap();
          this.x2 = currentX;
          this.y2 = currentY;
          if (len > 1) {
            // evt.preventDefault();
          }
        },
        end: function end(evt) {
          if (!evt.changedTouches) return;
          this._cancelLongTap();
          var self = this;
          evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2); //在结束钩子都加入方向判断，但触发swipe瞬时必须位移大于30
          if (evt.touches.length < 2) {
            this.lastZoom = this.tempZoom;
            this._option.multipointEnd(evt);
          }
          this._option.touchEnd(evt);
          //swipe
          if (
          this.x2 && Math.abs(this.x1 - this.x2) > 30 ||
          this.y2 && Math.abs(this.y1 - this.y2) > 30)
          {
            // evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
            this.swipeTimeout = setTimeout(function () {
              evt.type = 'swipe';
              self._option.swipe(evt);
            }, 0);
          } else {
            this.tapTimeout = setTimeout(function () {
              evt.type = 'tap';
              self._option.tap(evt);
              // trigger double tap immediately
              if (self.isDoubleTap) {
                evt.type = 'doubleTap';
                self._option.doubleTap(evt);
                clearTimeout(self.singleTapTimeout);
                self.isDoubleTap = false;
              }
            }, 0);

            if (!self.isDoubleTap) {
              self.singleTapTimeout = setTimeout(function () {
                self._option.singleTap(evt);
              }, 250);
            }
          }

          this.preV.x = 0;
          this.preV.y = 0;
          this.scale = 1;
          this.pinchStartLen = null;
          this.x1 = this.x2 = this.y1 = this.y2 = null;
        },
        cancel: function cancel(evt) {
          clearTimeout(this.singleTapTimeout);
          clearTimeout(this.tapTimeout);
          clearTimeout(this.longTapTimeout);
          clearTimeout(this.swipeTimeout);
          this._option.touchCancel(evt);
        },
        _cancelLongTap: function _cancelLongTap() {
          clearTimeout(this.longTapTimeout);
        },

        _cancelSingleTap: function _cancelSingleTap() {
          clearTimeout(this.singleTapTimeout);
        },

        _swipeDirection: function _swipeDirection(x1, x2, y1, y2) {
          return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ?
          x1 - x2 > 0 ?
          'Left' :
          'Right' :
          y1 - y2 > 0 ?
          'Up' :
          'Down';
        },
        destroy: function destroy() {
          if (this.singleTapTimeout) clearTimeout(this.singleTapTimeout);
          if (this.tapTimeout) clearTimeout(this.tapTimeout);
          if (this.longTapTimeout) clearTimeout(this.longTapTimeout);
          if (this.swipeTimeout) clearTimeout(this.swipeTimeout);

          this._option.rotate = null;
          this._option.touchStart = null;
          this._option.multipointStart = null;
          this._option.multipointEnd = null;
          this._option.pinch = null;
          this._option.swipe = null;
          this._option.tap = null;
          this._option.doubleTap = null;
          this._option.longTap = null;
          this._option.singleTap = null;
          this._option.pressMove = null;
          this._option.touchMove = null;
          this._option.touchEnd = null;
          this._option.touchCancel = null;

          this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null;

          return null;
        } };


      function getLen(v) {
        return Math.sqrt(v.x * v.x + v.y * v.y);
      }

      function dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
      }

      function getAngle(v1, v2) {
        var mr = getLen(v1) * getLen(v2);
        if (mr === 0) return 0;
        var r = dot(v1, v2) / mr;
        if (r > 1) r = 1;
        return Math.acos(r);
      }

      function cross(v1, v2) {
        return v1.x * v2.y - v2.x * v1.y;
      }

      function getRotateAngle(v1, v2) {
        var angle = getAngle(v1, v2);
        if (cross(v1, v2) > 0) {
          angle *= -1;
        }

        return angle * 180 / Math.PI;
      }


      /***/},

    /***/"./src/core/observable.js":
    /*!********************************!*\
                                       !*** ./src/core/observable.js ***!
                                       \********************************/
    /***/function srcCoreObservableJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"Observable": function Observable() {return (/* binding */_Observable);}
        /* harmony export */ });var
      _Observable = /*#__PURE__*/function () {
        function _Observable() {_classCallCheck(this, _Observable);
          this.observers = [];
        }_createClass(_Observable, [{ key: "subscribe", value: function subscribe(
          f) {
            this.observers.push(f);
          } }, { key: "notify", value: function notify(
          data) {
            this.observers.forEach(function (observer) {
              observer(data);
            });
          } }]);return _Observable;}();



      /***/},

    /***/"./src/core/sdk.js":
    /*!*************************!*\
                                !*** ./src/core/sdk.js ***!
                                \*************************/
    /***/function srcCoreSdkJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"sdk": function sdk() {return (/* binding */_sdk);},
        /* harmony export */"tracker": function tracker() {return (/* binding */_tracker);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");


      function getSDK() {
        var sdk = null,
        tracker = '';
        try {
          if (wx && typeof wx === 'object' && typeof wx.request === 'function') {
            sdk = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.deepMixObject)({}, wx);
            tracker = 'wx';
            wx = sdk;
          }
        } catch (err) {
          console.warn('unsupport platform, Fail to start');
        }
        console.log('------get SDK-------');
        return { sdk: sdk, tracker: tracker };
      }
      var instance = getSDK();

      var _sdk = instance.sdk;
      var _tracker = instance.tracker;


      /***/},

    /***/"./src/core/transport.js":
    /*!*******************************!*\
                                      !*** ./src/core/transport.js ***!
                                      \*******************************/
    /***/function srcCoreTransportJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"HttpRequest": function HttpRequest() {return (/* binding */_HttpRequest);},
        /* harmony export */"Batch": function Batch() {return (/* binding */_Batch);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../core/sdk */"./src/core/sdk.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _dataMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./dataMap */"./src/core/dataMap.js");




      // https://en.wikipedia.org/wiki/UTF-8
      var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;
      function addBatchPrecision(url) {
        if (!url) return url;
        return url + (url.indexOf('?') === -1 ? '?' : '&') + 'precision=ms';
      }
      var httpRequest = function httpRequest(endpointUrl, bytesLimit) {
        this.endpointUrl = endpointUrl;
        this.bytesLimit = bytesLimit;
      };
      httpRequest.prototype = {
        send: function send(data) {
          var url = addBatchPrecision(this.endpointUrl);
          _core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.request({
            method: 'POST',
            header: {
              'content-type': 'text/plain;charset=UTF-8' },

            url: url,
            data: data });

        } };


      var _HttpRequest = httpRequest;

      function batch(
      request,
      maxSize,
      bytesLimit,
      maxMessageSize,
      flushTimeout,
      lifeCycle)
      {
        this.request = request;
        this.maxSize = maxSize;
        this.bytesLimit = bytesLimit;
        this.maxMessageSize = maxMessageSize;
        this.flushTimeout = flushTimeout;
        this.lifeCycle = lifeCycle;
        this.flushOnVisibilityHidden();
        this.flushPeriodically();
      }
      batch.prototype = {
        pushOnlyBuffer: [],
        upsertBuffer: {},
        bufferBytesSize: 0,
        bufferMessageCount: 0,
        add: function add(message) {
          this.addOrUpdate(message);
        },

        upsert: function upsert(message, key) {
          this.addOrUpdate(message, key);
        },

        flush: function flush() {
          if (this.bufferMessageCount !== 0) {
            var messages = this.pushOnlyBuffer.concat((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.values)(this.upsertBuffer));
            this.request.send(messages.join('\n'), this.bufferBytesSize);
            this.pushOnlyBuffer = [];
            this.upsertBuffer = {};
            this.bufferBytesSize = 0;
            this.bufferMessageCount = 0;
          }
        },

        processSendData: function processSendData(message) {
          // var data = safeJSONParse(message)
          if (!message || !message.type) return '';
          var rowStr = '';
          var hasFileds = false;
          (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(_dataMap__WEBPACK_IMPORTED_MODULE_3__.dataMap, function (value, key) {
            if (value.type === message.type) {
              rowStr += key + ',';
              var tagsStr = [];
              var tags = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, _dataMap__WEBPACK_IMPORTED_MODULE_3__.commonTags, value.tags);
              (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(tags, function (value_path, _key) {
                var _value = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, value_path);
                if (_value || (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_value)) {
                  tagsStr.push((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_value));
                }
              });
              if (message.tags.length) {
                // 自定义tag
                (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(message.tags, function (_value, _key) {
                  if (_value || (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_value)) {
                    tagsStr.push((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_value));
                  }
                });
              }
              var fieldsStr = [];
              (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(value.fields, function (_value, _key) {
                if (Array.isArray(_value) && _value.length === 2) {
                  var type = _value[0],
                  value_path = _value[1];
                  var _valueData = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, value_path);
                  if (_valueData || (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_valueData)) {
                    _valueData =
                    type === 'string' ?
                    '"' +
                    String(_valueData).
                    replace(/[\\]*"/g, '"').
                    replace(/"/g, '\\"') +
                    '"' :
                    (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_valueData);
                    fieldsStr.push((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + _valueData);
                  }
                } else if ((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(_value)) {
                  var _valueData = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, _value);
                  if (_valueData || (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_valueData)) {
                    _valueData = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_valueData);
                    fieldsStr.push((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + _valueData);
                  }
                }
              });
              if (tagsStr.length) {
                rowStr += tagsStr.join(',');
              }
              if (fieldsStr.length) {
                rowStr += ' ';
                rowStr += fieldsStr.join(',');
                hasFileds = true;
              }
              rowStr = rowStr + ' ' + message.date;
            }
          });
          return hasFileds ? rowStr : '';
        },
        sizeInBytes: function sizeInBytes(candidate) {
          // Accurate byte size computations can degrade performances when there is a lot of events to process
          if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
            return candidate.length;
          }
          var total = 0,
          charCode;
          // utf-8编码
          for (var i = 0, len = candidate.length; i < len; i++) {
            charCode = candidate.charCodeAt(i);
            if (charCode <= 0x007f) {
              total += 1;
            } else if (charCode <= 0x07ff) {
              total += 2;
            } else if (charCode <= 0xffff) {
              total += 3;
            } else {
              total += 4;
            }
          }
          return total;
        },

        addOrUpdate: function addOrUpdate(message, key) {
          var process = this.process(message);
          if (!process.processedMessage || process.processedMessage === '') return;
          if (process.messageBytesSize >= this.maxMessageSize) {
            console.warn(
            'Discarded a message whose size was bigger than the maximum allowed size' +
            this.maxMessageSize +
            'KB.');

            return;
          }
          if (this.hasMessageFor(key)) {
            this.remove(key);
          }
          if (this.willReachedBytesLimitWith(process.messageBytesSize)) {
            this.flush();
          }
          this.push(process.processedMessage, process.messageBytesSize, key);
          if (this.isFull()) {
            this.flush();
          }
        },
        process: function process(message) {
          var processedMessage = this.processSendData(message);
          var messageBytesSize = this.sizeInBytes(processedMessage);
          return {
            processedMessage: processedMessage,
            messageBytesSize: messageBytesSize };

        },

        push: function push(processedMessage, messageBytesSize, key) {
          if (this.bufferMessageCount > 0) {
            // \n separator at serialization
            this.bufferBytesSize += 1;
          }
          if (key !== undefined) {
            this.upsertBuffer[key] = processedMessage;
          } else {
            this.pushOnlyBuffer.push(processedMessage);
          }
          this.bufferBytesSize += messageBytesSize;
          this.bufferMessageCount += 1;
        },

        remove: function remove(key) {
          var removedMessage = this.upsertBuffer[key];
          delete this.upsertBuffer[key];
          var messageBytesSize = this.sizeInBytes(removedMessage);
          this.bufferBytesSize -= messageBytesSize;
          this.bufferMessageCount -= 1;
          if (this.bufferMessageCount > 0) {
            this.bufferBytesSize -= 1;
          }
        },

        hasMessageFor: function hasMessageFor(key) {
          return key !== undefined && this.upsertBuffer[key] !== undefined;
        },

        willReachedBytesLimitWith: function willReachedBytesLimitWith(messageBytesSize) {
          // byte of the separator at the end of the message
          return this.bufferBytesSize + messageBytesSize + 1 >= this.bytesLimit;
        },

        isFull: function isFull() {
          return (
            this.bufferMessageCount === this.maxSize ||
            this.bufferBytesSize >= this.bytesLimit);

        },

        flushPeriodically: function flushPeriodically() {
          var _this = this;
          setTimeout(function () {
            _this.flush();
            _this.flushPeriodically();
          }, _this.flushTimeout);
        },

        flushOnVisibilityHidden: function flushOnVisibilityHidden() {
          var _this = this;
          /**
                             * With sendBeacon, requests are guaranteed to be successfully sent during document unload
                             */
          // @ts-ignore this function is not always defined
          this.lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.APP_HIDE, function () {
            _this.flush();
          });
        } };


      var _Batch = batch;


      /***/},

    /***/"./src/core/xhrProxy.js":
    /*!******************************!*\
                                     !*** ./src/core/xhrProxy.js ***!
                                     \******************************/
    /***/function srcCoreXhrProxyJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startXhrProxy": function startXhrProxy() {return (/* binding */_startXhrProxy);},
        /* harmony export */"resetXhrProxy": function resetXhrProxy() {return (/* binding */_resetXhrProxy);}
        /* harmony export */ });
      /* harmony import */var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./sdk */"./src/core/sdk.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");



      var xhrProxySingleton;
      var beforeSendCallbacks = [];
      var onRequestCompleteCallbacks = [];
      var originalXhrRequest;
      function _startXhrProxy() {
        if (!xhrProxySingleton) {
          proxyXhr();
          xhrProxySingleton = {
            beforeSend: function beforeSend(callback) {
              beforeSendCallbacks.push(callback);
            },
            onRequestComplete: function onRequestComplete(callback) {
              onRequestCompleteCallbacks.push(callback);
            } };

        }
        return xhrProxySingleton;
      }

      function _resetXhrProxy() {
        if (xhrProxySingleton) {
          xhrProxySingleton = undefined;
          beforeSendCallbacks.splice(0, beforeSendCallbacks.length);
          onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length);
          _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request = originalXhrRequest;
        }
      }

      function proxyXhr() {
        originalXhrRequest = _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request;
        _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request = function () {
          var _this = this;
          var dataflux_xhr = {
            method: arguments[0].method || 'GET',
            startTime: 0,
            url: arguments[0].url,
            type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RequestType.XHR,
            responseType: arguments[0].responseType || 'text' };

          dataflux_xhr.startTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)();

          var originalSuccess = arguments[0].success;

          arguments[0].success = function () {
            reportXhr(arguments[0]);

            if (originalSuccess) {
              originalSuccess.apply(_this, arguments);
            }
          };
          var originalFail = arguments[0].fail;
          arguments[0].fail = function () {
            reportXhr(arguments[0]);
            if (originalFail) {
              originalFail.apply(_this, arguments);
            }
          };
          var hasBeenReported = false;
          var reportXhr = function reportXhr(res) {
            if (hasBeenReported) {
              return;
            }
            hasBeenReported = true;
            dataflux_xhr.duration = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - dataflux_xhr.startTime;
            dataflux_xhr.response = JSON.stringify(res.data);
            dataflux_xhr.header = res.header || {};
            dataflux_xhr.profile = res.profile;
            dataflux_xhr.status = res.statusCode || res.status || 0;
            onRequestCompleteCallbacks.forEach(function (callback) {
              callback(dataflux_xhr);
            });
          };
          beforeSendCallbacks.forEach(function (callback) {
            callback(dataflux_xhr);
          });
          return originalXhrRequest.apply(this, arguments);
        };
      }


      /***/},

    /***/"./src/helper/enums.js":
    /*!*****************************!*\
                                    !*** ./src/helper/enums.js ***!
                                    \*****************************/
    /***/function srcHelperEnumsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"ONE_SECOND": function ONE_SECOND() {return (/* binding */_ONE_SECOND);},
        /* harmony export */"ONE_MINUTE": function ONE_MINUTE() {return (/* binding */_ONE_MINUTE);},
        /* harmony export */"ONE_HOUR": function ONE_HOUR() {return (/* binding */_ONE_HOUR);},
        /* harmony export */"ONE_KILO_BYTE": function ONE_KILO_BYTE() {return (/* binding */_ONE_KILO_BYTE);},
        /* harmony export */"CLIENT_ID_TOKEN": function CLIENT_ID_TOKEN() {return (/* binding */_CLIENT_ID_TOKEN);},
        /* harmony export */"RumEventType": function RumEventType() {return (/* binding */_RumEventType);},
        /* harmony export */"RequestType": function RequestType() {return (/* binding */_RequestType);},
        /* harmony export */"ActionType": function ActionType() {return (/* binding */_ActionType);},
        /* harmony export */"MpHook": function MpHook() {return (/* binding */_MpHook);}
        /* harmony export */ });
      var _ONE_SECOND = 1000;
      var _ONE_MINUTE = 60 * _ONE_SECOND;
      var _ONE_HOUR = 60 * _ONE_MINUTE;
      var _ONE_KILO_BYTE = 1024;
      var _CLIENT_ID_TOKEN = 'datafluxRum:client:id';
      var _RumEventType = _defineProperty({
        ACTION: 'action',
        ERROR: 'error',
        LONG_TASK: 'long_task',
        VIEW: 'view',
        RESOURCE: 'resource',
        APP: 'app' }, "ACTION",
      'action');


      var _RequestType = {
        XHR: 'network',
        DOWNLOAD: 'resource' };


      var _ActionType = {
        tap: 'tap',
        longpress: 'longpress',
        longtap: 'longtap' };

      var _MpHook = {
        data: 1,
        onLoad: 1,
        onShow: 1,
        onReady: 1,
        onPullDownRefresh: 1,
        onReachBottom: 1,
        onShareAppMessage: 1,
        onPageScroll: 1,
        onResize: 1,
        onTabItemTap: 1,
        onHide: 1,
        onUnload: 1 };



      /***/},

    /***/"./src/helper/tracekit.js":
    /*!********************************!*\
                                       !*** ./src/helper/tracekit.js ***!
                                       \********************************/
    /***/function srcHelperTracekitJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"wrap": function wrap() {return (/* binding */_wrap);},
        /* harmony export */"report": function report() {return (/* binding */_report);},
        /* harmony export */"computeStackTrace": function computeStackTrace() {return (/* binding */_computeStackTrace);}
        /* harmony export */ });
      /* harmony import */var _core_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../core/sdk */"./src/core/sdk.js");


      var UNKNOWN_FUNCTION = '?';
      function has(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
      }
      function isUndefined(what) {
        return typeof what === 'undefined';
      }
      function _wrap(func) {
        var _this = this;
        function wrapped() {
          try {
            return func.apply(_this, arguments);
          } catch (e) {
            _report(e);
            throw e;
          }
        }
        return wrapped;
      }
      /**
         * Cross-browser processing of unhandled exceptions
         *
         * Syntax:
         * ```js
         *   report.subscribe(function(stackInfo) { ... })
         *   report.unsubscribe(function(stackInfo) { ... })
         *   report(exception)
         *   try { ...code... } catch(ex) { report(ex); }
         * ```
         *
         * Supports:
         *   - Firefox: full stack trace with line numbers, plus column number
         *     on top frame; column number is not guaranteed
         *   - Opera: full stack trace with line and column numbers
         *   - Chrome: full stack trace with line and column numbers
         *   - Safari: line and column number for the top frame only; some frames
         *     may be missing, and column number is not guaranteed
         *   - IE: line and column number for the top frame only; some frames
         *     may be missing, and column number is not guaranteed
         *
         * In theory, TraceKit should work on all of the following versions:
         *   - IE5.5+ (only 8.0 tested)
         *   - Firefox 0.9+ (only 3.5+ tested)
         *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
         *     Exceptions Have Stacktrace to be enabled in opera:config)
         *   - Safari 3+ (only 4+ tested)
         *   - Chrome 1+ (only 5+ tested)
         *   - Konqueror 3.5+ (untested)
         *
         * Requires computeStackTrace.
         *
         * Tries to catch all unhandled exceptions and report them to the
         * subscribed handlers. Please note that report will rethrow the
         * exception. This is REQUIRED in order to get a useful stack trace in IE.
         * If the exception does not reach the top of the browser, you will only
         * get a stack trace from the point where report was called.
         *
         * Handlers receive a StackTrace object as described in the
         * computeStackTrace docs.
         *
         * @memberof TraceKit
         * @namespace
         */
      var _report = function reportModuleWrapper() {
        var handlers = [];

        /**
                            * Add a crash handler.
                            * @param {Function} handler
                            * @memberof report
                            */
        function subscribe(handler) {
          installGlobalHandler();
          installGlobalUnhandledRejectionHandler();
          installGlobalOnPageNotFoundHandler();
          installGlobalOnMemoryWarningHandler();
          handlers.push(handler);
        }

        /**
           * Remove a crash handler.
           * @param {Function} handler
           * @memberof report
           */
        function unsubscribe(handler) {
          for (var i = handlers.length - 1; i >= 0; i -= 1) {
            if (handlers[i] === handler) {
              handlers.splice(i, 1);
            }
          }
        }

        /**
           * Dispatch stack information to all handlers.
           * @param {StackTrace} stack
           * @param {boolean} isWindowError Is this a top-level window error?
           * @param {Error=} error The error that's being handled (if available, null otherwise)
           * @memberof report
           * @throws An exception if an error occurs while calling an handler.
           */
        function notifyHandlers(stack, isWindowError, error) {
          var exception;
          for (var i in handlers) {
            if (has(handlers, i)) {
              try {
                handlers[i](stack, isWindowError, error);
              } catch (inner) {
                exception = inner;
              }
            }
          }

          if (exception) {
            throw exception;
          }
        }

        var onErrorHandlerInstalled;
        var onUnhandledRejectionHandlerInstalled;
        var onPageNotFoundHandlerInstalled;
        var onOnMemoryWarningHandlerInstalled;
        /**
                                                * Ensures all global unhandled exceptions are recorded.
                                                * Supported by Gecko and IE.
                                                * @param {Event|string} message Error message.
                                                * @param {string=} url URL of script that generated the exception.
                                                * @param {(number|string)=} lineNo The line number at which the error occurred.
                                                * @param {(number|string)=} columnNo The column number at which the error occurred.
                                                * @param {Error=} errorObj The actual Error object.
                                                * @memberof report
                                                */
        function traceKitWindowOnError(err) {
          var error = typeof err === 'string' ? new Error(err) : err;
          var stack;
          var name = '';
          var msg = '';
          stack = _computeStackTrace(error);
          if (
          error &&
          error.message &&
          {}.toString.call(error.message) === '[object String]')
          {
            var messages = error.message.split('\n');
            if (messages.length >= 3) {
              msg = messages[2];
              var groups = msg.match(ERROR_TYPES_RE);
              if (groups) {
                name = groups[1];
                msg = groups[2];
              }
            }
          }
          if (msg) {
            stack.message = msg;
          }
          if (name) {
            stack.name = name;
          }
          notifyHandlers(stack, true, error);
        }

        /**
           * Ensures all unhandled rejections are recorded.
           * @param {PromiseRejectionEvent} e event.
           * @memberof report
           * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
           * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
           */
        function traceKitWindowOnUnhandledRejection(_ref) {var reason = _ref.reason,promise = _ref.promise;
          var error = typeof reason === 'string' ? new Error(reason) : reason;
          var stack;
          var name = '';
          var msg = '';
          stack = _computeStackTrace(error);
          if (
          error &&
          error.message &&
          {}.toString.call(error.message) === '[object String]')
          {
            var messages = error.message.split('\n');
            if (messages.length >= 3) {
              msg = messages[2];
              var groups = msg.match(ERROR_TYPES_RE);
              if (groups) {
                name = groups[1];
                msg = groups[2];
              }
            }
          }
          if (msg) {
            stack.message = msg;
          }
          if (name) {
            stack.name = name;
          }
          notifyHandlers(stack, true, error);
        }

        /**
           * Install a global onerror handler
           * @memberof report
           */
        function installGlobalHandler() {
          if (onErrorHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onError) {
            return;
          }
          _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onError(traceKitWindowOnError);
          onErrorHandlerInstalled = true;
        }

        /**
           * Install a global onunhandledrejection handler
           * @memberof report
           */
        function installGlobalUnhandledRejectionHandler() {
          if (onUnhandledRejectionHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection) {
            return;
          }

          _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection &&
          _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection(traceKitWindowOnUnhandledRejection);
          onUnhandledRejectionHandlerInstalled = true;
        }
        function installGlobalOnPageNotFoundHandler() {
          if (onPageNotFoundHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onPageNotFound) {
            return;
          }
          _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onPageNotFound(function (res) {
            var url = res.path.split('?')[0];
            notifyHandlers(
            {
              message: JSON.stringify(res),
              type: 'pagenotfound',
              name: url + '页面无法找到' },

            true,
            {});

          });
          onPageNotFoundHandlerInstalled = true;
        }
        function installGlobalOnMemoryWarningHandler() {
          if (onOnMemoryWarningHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onMemoryWarning) {
            return;
          }
          _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onMemoryWarning(function (_ref2) {var _ref2$level = _ref2.level,level = _ref2$level === void 0 ? -1 : _ref2$level;
            var levelMessage = '没有获取到告警级别信息';

            switch (level) {
              case 5:
                levelMessage = 'TRIM_MEMORY_RUNNING_MODERATE';
                break;
              case 10:
                levelMessage = 'TRIM_MEMORY_RUNNING_LOW';
                break;
              case 15:
                levelMessage = 'TRIM_MEMORY_RUNNING_CRITICAL';
                break;
              default:
                return;}

            notifyHandlers(
            {
              message: levelMessage,
              type: 'memorywarning',
              name: '内存不足告警' },

            true,
            {});

          });
          onOnMemoryWarningHandlerInstalled = true;
        }
        /**
           * Reports an unhandled Error.
           * @param {Error} ex
           * @memberof report
           * @throws An exception if an incompvare stack trace is detected (old IE browsers).
           */
        function doReport(ex) {}

        doReport.subscribe = subscribe;
        doReport.unsubscribe = unsubscribe;
        doReport.traceKitWindowOnError = traceKitWindowOnError;

        return doReport;
      }();

      /**
            * computeStackTrace: cross-browser stack traces in JavaScript
            *
            * Syntax:
            *   ```js
            *   s = computeStackTrace.ofCaller([depth])
            *   s = computeStackTrace(exception) // consider using report instead (see below)
            *   ```
            *
            * Supports:
            *   - Firefox:  full stack trace with line numbers and unreliable column
            *               number on top frame
            *   - Opera 10: full stack trace with line and column numbers
            *   - Opera 9-: full stack trace with line numbers
            *   - Chrome:   full stack trace with line and column numbers
            *   - Safari:   line and column number for the topmost stacktrace element
            *               only
            *   - IE:       no line numbers whatsoever
            *
            * Tries to guess names of anonymous functions by looking for assignments
            * in the source code. In IE and Safari, we have to guess source file names
            * by searching for function bodies inside all page scripts. This will not
            * work for scripts that are loaded cross-domain.
            * Here be dragons: some function names may be guessed incorrectly, and
            * duplicate functions may be mismatched.
            *
            * computeStackTrace should only be used for tracing purposes.
            * Logging of unhandled exceptions should be done with report,
            * which builds on top of computeStackTrace and provides better
            * IE support by utilizing the sdk.onError event to retrieve information
            * about the top of the stack.
            *
            * Note: In IE and Safari, no stack trace is recorded on the Error object,
            * so computeStackTrace instead walks its *own* chain of callers.
            * This means that:
            *  * in Safari, some methods may be missing from the stack trace;
            *  * in IE, the topmost function in the stack trace will always be the
            *    caller of computeStackTrace.
            *
            * This is okay for tracing (because you are likely to be calling
            * computeStackTrace from the function you want to be the topmost element
            * of the stack trace anyway), but not okay for logging unhandled
            * exceptions (because your catch block will likely be far away from the
            * inner function that actually caused the exception).
            *
            * Tracing example:
            *  ```js
            *     function trace(message) {
            *         var stackInfo = computeStackTrace.ofCaller();
            *         var data = message + "\n";
            *         for(var i in stackInfo.stack) {
            *             var item = stackInfo.stack[i];
            *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
            *         }
            *         if (window.console)
            *             console.info(data);
            *         else
            *             alert(data);
            *     }
            * ```
            * @memberof TraceKit
            * @namespace
            */
      var _computeStackTrace = function computeStackTraceWrapper() {
        var debug = false;

        // Contents of Exception in various browsers.
        //
        // SAFARI:
        // ex.message = Can't find variable: qq
        // ex.line = 59
        // ex.sourceId = 580238192
        // ex.sourceURL = http://...
        // ex.expressionBeginOffset = 96
        // ex.expressionCaretOffset = 98
        // ex.expressionEndOffset = 98
        // ex.name = ReferenceError
        //
        // FIREFOX:
        // ex.message = qq is not defined
        // ex.fileName = http://...
        // ex.lineNumber = 59
        // ex.columnNumber = 69
        // ex.stack = ...stack trace... (see the example below)
        // ex.name = ReferenceError
        //
        // CHROME:
        // ex.message = qq is not defined
        // ex.name = ReferenceError
        // ex.type = not_defined
        // ex.arguments = ['aa']
        // ex.stack = ...stack trace...
        //
        // INTERNET EXPLORER:
        // ex.message = ...
        // ex.name = ReferenceError
        //
        // OPERA:
        // ex.message = ...message... (see the example below)
        // ex.name = ReferenceError
        // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
        // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

        /**
         * Computes stack trace information from the stack property.
         * Chrome and Gecko use this property.
         * @param {Error} ex
         * @return {?StackTrace} Stack trace information.
         * @memberof computeStackTrace
         */
        function computeStackTraceFromStackProp(ex) {
          if (!ex.stack) {
            return;
          }

          // tslint:disable-next-line max-line-length
          var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i;
          // tslint:disable-next-line max-line-length
          var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i;
          // tslint:disable-next-line max-line-length
          var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i;

          // Used to additionally parse URL/line/column from eval frames
          var isEval;
          var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
          var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
          var lines = ex.stack.split('\n');
          var stack = [];
          var submatch;
          var parts;
          var element;

          for (var i = 0, j = lines.length; i < j; i += 1) {
            if (chrome.exec(lines[i])) {
              parts = chrome.exec(lines[i]);
              var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
              isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
              submatch = chromeEval.exec(parts[2]);
              if (isEval && submatch) {
                // throw out eval line/column and use top-most line/column number
                parts[2] = submatch[1]; // url
                parts[3] = submatch[2]; // line
                parts[4] = submatch[3]; // column
              }
              element = {
                args: isNative ? [parts[2]] : [],
                column: parts[4] ? +parts[4] : undefined,
                func: parts[1] || UNKNOWN_FUNCTION,
                line: parts[3] ? +parts[3] : undefined,
                url: !isNative ? parts[2] : undefined };

            } else if (winjs.exec(lines[i])) {
              parts = winjs.exec(lines[i]);
              element = {
                args: [],
                column: parts[4] ? +parts[4] : undefined,
                func: parts[1] || UNKNOWN_FUNCTION,
                line: +parts[3],
                url: parts[2] };

            } else if (gecko.exec(lines[i])) {
              parts = gecko.exec(lines[i]);
              isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
              submatch = geckoEval.exec(parts[3]);
              if (isEval && submatch) {
                // throw out eval line/column and use top-most line number
                parts[3] = submatch[1];
                parts[4] = submatch[2];
                parts[5] = undefined; // no column when eval
              } else if (i === 0 && !parts[5] && !isUndefined(ex.columnNumber)) {
                // FireFox uses this awesome columnNumber property for its top frame
                // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                // so adding 1
                // NOTE: this hack doesn't work if top-most frame is eval
                stack[0].column = ex.columnNumber + 1;
              }
              element = {
                args: parts[2] ? parts[2].split(',') : [],
                column: parts[5] ? +parts[5] : undefined,
                func: parts[1] || UNKNOWN_FUNCTION,
                line: parts[4] ? +parts[4] : undefined,
                url: parts[3] };

            } else {
              continue;
            }

            if (!element.func && element.line) {
              element.func = UNKNOWN_FUNCTION;
            }
            stack.push(element);
          }

          if (!stack.length) {
            return;
          }

          return {
            stack: stack,
            message: extractMessage(ex),
            name: ex.name };

        }

        /**
           * Computes stack trace information from the stacktrace property.
           * Opera 10+ uses this property.
           * @param {Error} ex
           * @return {?StackTrace} Stack trace information.
           * @memberof computeStackTrace
           */
        function computeStackTraceFromStacktraceProp(ex) {
          // Access and store the stacktrace property before doing ANYTHING
          // else to it because Opera is not very good at providing it
          // reliably in other circumstances.
          var stacktrace = ex.stacktrace;
          if (!stacktrace) {
            return;
          }

          var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i;
          // tslint:disable-next-line max-line-length
          var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i;
          var lines = stacktrace.split('\n');
          var stack = [];
          var parts;

          for (var line = 0; line < lines.length; line += 2) {
            var element;
            if (opera10Regex.exec(lines[line])) {
              parts = opera10Regex.exec(lines[line]);
              element = {
                args: [],
                column: undefined,
                func: parts[3],
                line: +parts[1],
                url: parts[2] };

            } else if (opera11Regex.exec(lines[line])) {
              parts = opera11Regex.exec(lines[line]);
              element = {
                args: parts[5] ? parts[5].split(',') : [],
                column: +parts[2],
                func: parts[3] || parts[4],
                line: +parts[1],
                url: parts[6] };

            }

            if (element) {
              if (!element.func && element.line) {
                element.func = UNKNOWN_FUNCTION;
              }
              element.context = [lines[line + 1]];

              stack.push(element);
            }
          }

          if (!stack.length) {
            return;
          }

          return {
            stack: stack,
            message: extractMessage(ex),
            name: ex.name };

        }

        /**
           * NOT TESTED.
           * Computes stack trace information from an error message that includes
           * the stack trace.
           * Opera 9 and earlier use this method if the option to show stack
           * traces is turned on in opera:config.
           * @param {Error} ex
           * @return {?StackTrace} Stack information.
           * @memberof computeStackTrace
           */
        function computeStackTraceFromOperaMultiLineMessage(ex) {
          // TODO: Clean this function up
          // Opera includes a stack trace into the exception message. An example is:
          //
          // Statement on line 3: Undefined variable: undefinedFunc
          // Backtrace:
          //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js:
          //   In function zzz
          //         undefinedFunc(a);
          //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
          //   In function yyy
          //           zzz(x, y, z);
          //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
          //   In function xxx
          //           yyy(a, a, a);
          //   Line 1 of function script
          //     try { xxx('hi'); return false; } catch(ex) { report(ex); }
          //   ...

          var lines = ex.message.split('\n');
          if (lines.length < 4) {
            return;
          }

          var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
          var lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
          var lineRE3 = /^\s*Line (\d+) of function script\s*$/i;
          var stack = [];
          var scripts =
          window &&
          window.document &&
          window.document.getElementsByTagName('script');
          var inlineScriptBlocks = [];
          var parts;

          for (var s in scripts) {
            if (has(scripts, s) && !scripts[s].src) {
              inlineScriptBlocks.push(scripts[s]);
            }
          }

          for (var line = 2; line < lines.length; line += 2) {
            var item;
            if (lineRE1.exec(lines[line])) {
              parts = lineRE1.exec(lines[line]);
              item = {
                args: [],
                column: undefined,
                func: parts[3],
                line: +parts[1],
                url: parts[2] };

            } else if (lineRE2.exec(lines[line])) {
              parts = lineRE2.exec(lines[line]);
              item = {
                args: [],
                column: undefined, // TODO: Check to see if inline#1 (+parts[2]) points to the script number or column number.
                func: parts[4],
                line: +parts[1],
                url: parts[3] };

            } else if (lineRE3.exec(lines[line])) {
              parts = lineRE3.exec(lines[line]);
              var url = window.location.href.replace(/#.*$/, '');
              item = {
                url: url,
                args: [],
                column: undefined,
                func: '',
                line: +parts[1] };

            }

            if (item) {
              if (!item.func) {
                item.func = UNKNOWN_FUNCTION;
              }
              item.context = [lines[line + 1]];
              stack.push(item);
            }
          }
          if (!stack.length) {
            return; // could not parse multiline exception message as Opera stack trace
          }

          return {
            stack: stack,
            message: lines[0],
            name: ex.name };

        }

        /**
           * Adds information about the first frame to incompvare stack traces.
           * Safari and IE require this to get compvare data on the first frame.
           * @param {StackTrace} stackInfo Stack trace information from
           * one of the compute* methods.
           * @param {string=} url The URL of the script that caused an error.
           * @param {(number|string)=} lineNo The line number of the script that
           * caused an error.
           * @param {string=} message The error generated by the browser, which
           * hopefully contains the name of the object that caused the error.
           * @return {boolean} Whether or not the stack information was
           * augmented.
           * @memberof computeStackTrace
           */
        function augmentStackTraceWithInitialElement(
        stackInfo,
        url,
        lineNo,
        message)
        {
          var initial = {
            url: url,
            line: lineNo ? +lineNo : undefined };


          if (initial.url && initial.line) {
            stackInfo.incompvare = false;

            var stack = stackInfo.stack;
            if (stack.length > 0) {
              if (stack[0].url === initial.url) {
                if (stack[0].line === initial.line) {
                  return false; // already in stack trace
                }
                if (!stack[0].line && stack[0].func === initial.func) {
                  stack[0].line = initial.line;
                  stack[0].context = initial.context;
                  return false;
                }
              }
            }

            stack.unshift(initial);
            stackInfo.partial = true;
            return true;
          }
          stackInfo.incompvare = true;

          return false;
        }

        /**
           * Computes stack trace information by walking the arguments.caller
           * chain at the time the exception occurred. This will cause earlier
           * frames to be missed but is the only way to get any stack trace in
           * Safari and IE. The top frame is restored by
           * {@link augmentStackTraceWithInitialElement}.
           * @param {Error} ex
           * @param {number} depth
           * @return {StackTrace} Stack trace information.
           * @memberof computeStackTrace
           */
        function computeStackTraceByWalkingCallerChain(ex, depth) {
          var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i;
          var stack = [];
          var funcs = {};
          var recursion = false;
          var parts;
          var item;

          for (
          var curr = computeStackTraceByWalkingCallerChain.caller;
          curr && !recursion;
          curr = curr.caller)
          {
            if (curr === _computeStackTrace || curr === _report) {
              continue;
            }

            item = {
              args: [],
              column: undefined,
              func: UNKNOWN_FUNCTION,
              line: undefined,
              url: undefined };


            parts = functionName.exec(curr.toString());
            if (curr.name) {
              item.func = curr.name;
            } else if (parts) {
              item.func = parts[1];
            }

            if (typeof item.func === 'undefined') {
              item.func = parts ?
              parts.input.substring(0, parts.input.indexOf('{')) :
              undefined;
            }

            if (funcs[curr + '']) {
              recursion = true;
            } else {
              funcs[curr + ''] = true;
            }

            stack.push(item);
          }

          if (depth) {
            stack.splice(0, depth);
          }

          var result = {
            stack: stack,
            message: ex.message,
            name: ex.name };

          augmentStackTraceWithInitialElement(
          result,
          ex.sourceURL || ex.fileName,
          ex.line || ex.lineNumber,
          ex.message || ex.description);

          return result;
        }

        /**
           * Computes a stack trace for an exception.
           * @param {Error} ex
           * @param {(string|number)=} depth
           * @memberof computeStackTrace
           */
        function doComputeStackTrace(ex, depth) {
          var stack;
          var normalizedDepth = depth === undefined ? 0 : +depth;

          try {
            // This must be tried first because Opera 10 *destroys*
            // its stacktrace property if you try to access the stack
            // property first!!
            stack = computeStackTraceFromStacktraceProp(ex);
            if (stack) {
              return stack;
            }
          } catch (e) {
            if (debug) {
              throw e;
            }
          }

          try {
            stack = computeStackTraceFromStackProp(ex);
            if (stack) {
              return stack;
            }
          } catch (e) {
            if (debug) {
              throw e;
            }
          }

          try {
            stack = computeStackTraceFromOperaMultiLineMessage(ex);
            if (stack) {
              return stack;
            }
          } catch (e) {
            if (debug) {
              throw e;
            }
          }

          try {
            stack = computeStackTraceByWalkingCallerChain(ex, normalizedDepth + 1);
            if (stack) {
              return stack;
            }
          } catch (e) {
            if (debug) {
              throw e;
            }
          }

          return {
            message: extractMessage(ex),
            name: ex.name,
            stack: [] };

        }

        /**
           * Logs a stacktrace starting from the previous call and working down.
           * @param {(number|string)=} depth How many frames deep to trace.
           * @return {StackTrace} Stack trace information.
           * @memberof computeStackTrace
           */
        function computeStackTraceOfCaller(depth) {
          var currentDepth = (depth === undefined ? 0 : +depth) + 1; // "+ 1" because "ofCaller" should drop one frame
          try {
            throw new Error();
          } catch (ex) {
            return _computeStackTrace(ex, currentDepth + 1);
          }
        }

        doComputeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
        doComputeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
        doComputeStackTrace.ofCaller = computeStackTraceOfCaller;

        return doComputeStackTrace;
      }();
      var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
      function extractMessage(ex) {
        var message = ex && ex.message;
        // console.log('message',message)
        if (!message) {
          return 'No error message';
        }
        if (message.error && typeof message.error.message === 'string') {
          return message.error.message;
        }

        return message;
      }


      /***/},

    /***/"./src/helper/utils.js":
    /*!*****************************!*\
                                    !*** ./src/helper/utils.js ***!
                                    \*****************************/
    /***/function srcHelperUtilsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"isArguments": function isArguments() {return (/* binding */_isArguments);},
        /* harmony export */"each": function each() {return (/* binding */_each);},
        /* harmony export */"values": function values() {return (/* binding */_values);},
        /* harmony export */"round": function round() {return (/* binding */_round);},
        /* harmony export */"msToNs": function msToNs() {return (/* binding */_msToNs);},
        /* harmony export */"isUndefined": function isUndefined() {return (/* binding */_isUndefined);},
        /* harmony export */"isString": function isString() {return (/* binding */_isString);},
        /* harmony export */"isDate": function isDate() {return (/* binding */_isDate);},
        /* harmony export */"isBoolean": function isBoolean() {return (/* binding */_isBoolean);},
        /* harmony export */"isNumber": function isNumber() {return (/* binding */_isNumber);},
        /* harmony export */"toArray": function toArray() {return (/* binding */_toArray);},
        /* harmony export */"areInOrder": function areInOrder() {return (/* binding */_areInOrder);},
        /* harmony export */"UUID": function UUID() {return (/* binding */_UUID);},
        /* harmony export */"jsonStringify": function jsonStringify() {return (/* binding */_jsonStringify);},
        /* harmony export */"elapsed": function elapsed() {return (/* binding */_elapsed);},
        /* harmony export */"getMethods": function getMethods() {return (/* binding */_getMethods);},
        /* harmony export */"replaceNumberCharByPath": function replaceNumberCharByPath() {return (/* binding */_replaceNumberCharByPath);},
        /* harmony export */"getStatusGroup": function getStatusGroup() {return (/* binding */_getStatusGroup);},
        /* harmony export */"getQueryParamsFromUrl": function getQueryParamsFromUrl() {return (/* binding */_getQueryParamsFromUrl);},
        /* harmony export */"isPercentage": function isPercentage() {return (/* binding */_isPercentage);},
        /* harmony export */"extend": function extend() {return (/* binding */_extend);},
        /* harmony export */"extend2Lev": function extend2Lev() {return (/* binding */_extend2Lev);},
        /* harmony export */"trim": function trim() {return (/* binding */_trim);},
        /* harmony export */"isObject": function isObject() {return (/* binding */_isObject);},
        /* harmony export */"isEmptyObject": function isEmptyObject() {return (/* binding */_isEmptyObject);},
        /* harmony export */"isJSONString": function isJSONString() {return (/* binding */_isJSONString);},
        /* harmony export */"safeJSONParse": function safeJSONParse() {return (/* binding */_safeJSONParse);},
        /* harmony export */"now": function now() {return (/* binding */_now);},
        /* harmony export */"throttle": function throttle() {return (/* binding */_throttle);},
        /* harmony export */"noop": function noop() {return (/* binding */_noop);},
        /* harmony export */"performDraw": function performDraw() {return (/* binding */_performDraw);},
        /* harmony export */"findByPath": function findByPath() {return (/* binding */_findByPath);},
        /* harmony export */"withSnakeCaseKeys": function withSnakeCaseKeys() {return (/* binding */_withSnakeCaseKeys);},
        /* harmony export */"deepSnakeCase": function deepSnakeCase() {return (/* binding */_deepSnakeCase);},
        /* harmony export */"toSnakeCase": function toSnakeCase() {return (/* binding */_toSnakeCase);},
        /* harmony export */"escapeRowData": function escapeRowData() {return (/* binding */_escapeRowData);},
        /* harmony export */"urlParse": function urlParse() {return (/* binding */_urlParse);},
        /* harmony export */"getOwnObjectKeys": function getOwnObjectKeys() {return (/* binding */_getOwnObjectKeys);},
        /* harmony export */"defineObject": function defineObject() {return (/* binding */_defineObject);},
        /* harmony export */"deepMixObject": function deepMixObject() {return (/* binding */_deepMixObject);}
        /* harmony export */ });
      /* harmony import */var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./enums */"./src/helper/enums.js");

      var ArrayProto = Array.prototype;
      var ObjProto = Object.prototype;
      var ObjProto = Object.prototype;
      var hasOwnProperty = ObjProto.hasOwnProperty;
      var slice = ArrayProto.slice;
      var toString = ObjProto.toString;
      var nativeForEach = ArrayProto.forEach;
      var breaker = false;
      var _isArguments = function _isArguments(obj) {
        return !!(obj && hasOwnProperty.call(obj, 'callee'));
      };
      var _each = function _each(obj, iterator, context) {
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
      var _values = function _values(obj) {
        var results = [];
        if (obj === null) {
          return results;
        }
        _each(obj, function (value) {
          results[results.length] = value;
        });
        return results;
      };
      function _round(num, decimals) {
        return +num.toFixed(decimals);
      }

      function _msToNs(duration) {
        if (typeof duration !== 'number') {
          return duration;
        }
        return _round(duration * 1e6, 0);
      }
      var _isUndefined = function _isUndefined(obj) {
        return obj === void 0;
      };
      var _isString = function _isString(obj) {
        return toString.call(obj) === '[object String]';
      };
      var _isDate = function _isDate(obj) {
        return toString.call(obj) === '[object Date]';
      };
      var _isBoolean = function _isBoolean(obj) {
        return toString.call(obj) === '[object Boolean]';
      };
      var _isNumber = function _isNumber(obj) {
        return toString.call(obj) === '[object Number]' && /[\d\.]+/.test(String(obj));
      };

      var _toArray = function _toArray(iterable) {
        if (!iterable) return [];
        if (iterable.toArray) {
          return iterable.toArray();
        }
        if (Array.isArray(iterable)) {
          return slice.call(iterable);
        }
        if (_isArguments(iterable)) {
          return slice.call(iterable);
        }
        return _values(iterable);
      };
      var _areInOrder = function _areInOrder() {
        var numbers = _toArray(arguments);
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
      function _UUID(placeholder) {
        return placeholder ?
        // tslint:disable-next-line no-bitwise
        (
        parseInt(placeholder, 10) ^
        Math.random() * 16 >> parseInt(placeholder, 10) / 4).
        toString(16) :
        "".concat(1e7, "-", 1e3, "-", 4e3, "-", 8e3, "-", 1e11).replace(/[018]/g, _UUID);
      }
      function _jsonStringify(value, replacer, space) {
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
        if (typeof value === 'object') {
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
        return (
          typeof value === 'object' &&
          value !== null &&
          value.hasOwnProperty('toJSON'));

      }
      function _elapsed(start, end) {
        return end - start;
      }
      function _getMethods(obj) {
        var funcs = [];
        for (var key in obj) {
          if (typeof obj[key] === 'function' && !_enums__WEBPACK_IMPORTED_MODULE_0__.MpHook[key]) {
            funcs.push(key);
          }
        }
        return funcs;
      }
      // 替换url包含数字的路由
      function _replaceNumberCharByPath(path) {
        if (path) {
          return path.replace(/\/([^\/]*)\d([^\/]*)/g, '/?');
        } else {
          return '';
        }
      }
      function _getStatusGroup(status) {
        if (!status) return status;
        return (
          String(status).substr(0, 1) + String(status).substr(1).replace(/\d*/g, 'x'));

      }
      var _getQueryParamsFromUrl = function _getQueryParamsFromUrl(url) {
        var result = {};
        var arr = url.split('?');
        var queryString = arr[1] || '';
        if (queryString) {
          result = getURLSearchParams('?' + queryString);
        }
        return result;
      };
      function _isPercentage(value) {
        return _isNumber(value) && value >= 0 && value <= 100;
      }

      var _extend = function _extend(obj) {
        slice.call(arguments, 1).forEach(function (source) {
          for (var prop in source) {
            if (source[prop] !== void 0) {
              obj[prop] = source[prop];
            }
          }
        });
        return obj;
      };
      var _extend2Lev = function _extend2Lev(obj) {
        slice.call(arguments, 1).forEach(function (source) {
          for (var prop in source) {
            if (source[prop] !== void 0) {
              if (_isObject(source[prop]) && _isObject(obj[prop])) {
                _extend(obj[prop], source[prop]);
              } else {
                obj[prop] = source[prop];
              }
            }
          }
        });
        return obj;
      };

      var _trim = function _trim(str) {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
      };
      var _isObject = function _isObject(obj) {
        if (obj === null) return false;
        return toString.call(obj) === '[object Object]';
      };
      var _isEmptyObject = function _isEmptyObject(obj) {
        if (_isObject(obj)) {
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

      var _isJSONString = function _isJSONString(str) {
        try {
          JSON.parse(str);
        } catch (e) {
          return false;
        }
        return true;
      };
      var _safeJSONParse = function _safeJSONParse(str) {
        var val = null;
        try {
          val = JSON.parse(str);
        } catch (e) {
          return false;
        }
        return val;
      };
      var _now =
      Date.now ||
      function () {
        return new Date().getTime();
      };
      var _throttle = function _throttle(func, wait, options) {
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
          if (!previous && options.leading === false) previous = now;
          //下次触发 func 剩余的时间
          var remaining = wait - (now - previous);
          context = this;
          // 如果没有剩余的时间了或者你改了系统时间
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
      function _noop() {}
      /**
                           * Return true if the draw is successful
                           * @param threshold between 0 and 100
                           */
      function _performDraw(threshold) {
        return threshold !== 0 && Math.random() * 100 <= threshold;
      }
      function _findByPath(source, path) {
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
      function _withSnakeCaseKeys(candidate) {
        var result = {};
        Object.keys(candidate).forEach(function (key) {
          result[_toSnakeCase(key)] = _deepSnakeCase(candidate[key]);
        });
        return result;
      }

      function _deepSnakeCase(candidate) {
        if (Array.isArray(candidate)) {
          return candidate.map(function (value) {return _deepSnakeCase(value);});
        }
        if (typeof candidate === 'object' && candidate !== null) {
          return _withSnakeCaseKeys(candidate);
        }
        return candidate;
      }

      function _toSnakeCase(word) {
        return word.
        replace(/[A-Z]/g, function (uppercaseLetter, index) {
          return (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase();
        }).
        replace(/-/g, '_');
      }

      function _escapeRowData(str) {
        if (!_isString(str)) return str;
        var reg = /[\s=,"]/g;
        return String(str).replace(reg, function (word) {
          return '\\' + word;
        });
      }
      var _urlParse = function _urlParse(para) {
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
            Fragment: 10 };

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
          if (typeof queryObj !== 'object') {
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
          this._values['Origin'] =
          this._values['Protocol'] + '://' + this._values['Hostname'];
        };
        return new URLParser(para);
      };
      var _getOwnObjectKeys = function _getOwnObjectKeys(obj, isEnumerable) {
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
      var _defineObject = function _defineObject(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true });

        } else {
          obj[key] = value;
        }
        return obj;
      };
      var _deepMixObject = function _deepMixObject(targetObj) {
        for (var t = 1; t < arguments.length; t++) {
          var target = arguments[t] != null ? arguments[t] : {};
          if (t % 2) {
            _getOwnObjectKeys(Object(target), true).forEach(function (t) {
              _defineObject(targetObj, t, target[t]);
            });
          } else {
            if (Object.getOwnPropertyDescriptors) {
              Object.defineProperties(
              targetObj,
              Object.getOwnPropertyDescriptors(target));

            } else {
              _getOwnObjectKeys(Object(target)).forEach(function (t) {
                Object.defineProperty(
                targetObj,
                t,
                Object.getOwnPropertyDescriptor(target, t));

              });
            }
          }
        }
        return targetObj;
      };


      /***/},

    /***/"./src/rumEventsCollection/action/actionCollection.js":
    /*!************************************************************!*\
                                                                   !*** ./src/rumEventsCollection/action/actionCollection.js ***!
                                                                   \************************************************************/
    /***/function srcRumEventsCollectionActionActionCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startActionCollection": function startActionCollection() {return (/* binding */_startActionCollection);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _trackActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./trackActions */"./src/rumEventsCollection/action/trackActions.js");





      function _startActionCollection(lifeCycle, configuration) {
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_COMPLETED,
        function (action) {
          lifeCycle.notify(
          _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
          processAction(action));

        });

        if (configuration.trackInteractions) {
          (0, _trackActions__WEBPACK_IMPORTED_MODULE_3__.trackActions)(lifeCycle);
        }
      }

      function processAction(action) {
        var autoActionProperties = {
          action: {
            error: {
              count: action.counts.errorCount },

            id: action.id,
            loadingTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(action.duration),
            long_task: {
              count: action.counts.longTaskCount },

            resource: {
              count: action.counts.resourceCount } } };



        var actionEvent = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(
        {
          action: {
            target: {
              name: action.name },

            type: action.type },

          date: action.startClocks,
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.ACTION },

        autoActionProperties);

        return {
          rawRumEvent: actionEvent,
          startTime: action.startClocks };

      }


      /***/},

    /***/"./src/rumEventsCollection/action/trackActions.js":
    /*!********************************************************!*\
                                                               !*** ./src/rumEventsCollection/action/trackActions.js ***!
                                                               \********************************************************/
    /***/function srcRumEventsCollectionActionTrackActionsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"trackActions": function trackActions() {return (/* binding */_trackActions);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _core_miniaTouch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../core/miniaTouch */"./src/core/miniaTouch.js");
      /* harmony import */var _trackEventCounts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../trackEventCounts */"./src/rumEventsCollection/trackEventCounts.js");
      /* harmony import */var _trackPageActiveites__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ../trackPageActiveites */"./src/rumEventsCollection/trackPageActiveites.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");






      function _trackActions(lifeCycle) {
        var action = startActionManagement(lifeCycle);

        // New views trigger the discard of the current pending Action
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.VIEW_CREATED, function () {
          action.discardCurrent();
        });
        var originPage = Page;
        Page = function Page(page) {
          var methods = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.getMethods)(page);
          methods.forEach(function (methodName) {
            clickProxy(
            page,
            methodName,
            function (_action) {
              action.create(_action.type, _action.name);
            },
            lifeCycle);

          });
          return originPage(page);
        };
        var originComponent = Component;
        Component = function Component(component) {
          var methods = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.getMethods)(component);
          methods.forEach(function (methodName) {
            clickProxy(component, methodName, function (_action) {
              action.create(_action.type, _action.name);
            });
          });
          return originComponent(component);
        };
        return {
          stop: function stop() {
            action.discardCurrent();
            // stopListener()
          } };

      }
      function clickProxy(page, methodName, callback, lifeCycle) {
        var oirginMethod = page[methodName];

        page[methodName] = function () {
          var result = oirginMethod.apply(this, arguments);
          var action = {};
          if ((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(arguments[0])) {
            var currentTarget = arguments[0].currentTarget || {};
            var dataset = currentTarget.dataset || {};
            var actionType = arguments[0].type;
            if (actionType && _helper_enums__WEBPACK_IMPORTED_MODULE_5__.ActionType[actionType]) {
              action.type = actionType;
              action.name = dataset.name || dataset.content || dataset.type;
              callback(action);
            } else if (methodName === 'onAddToFavorites') {
              action.type = 'click';
              action.name =
              '收藏 ' +
              '标题: ' +
              result.title + (
              result.query ? ' query: ' + result.query : '');
              callback(action);
              lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
            } else if (methodName === 'onShareAppMessage') {
              action.type = 'click';
              action.name =
              '转发 ' +
              '标题: ' +
              result.title + (
              result.path ? ' path: ' + result.path : '');
              callback(action);
              lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
            } else if (methodName === 'onShareTimeline') {
              action.type = 'click';
              action.name =
              '分享到朋友圈 ' +
              '标题: ' +
              result.title + (
              result.query ? ' query: ' + result.query : '');
              callback(action);
              lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
            } else if (methodName === 'onTabItemTap') {
              var item = arguments.length && arguments[0];
              action.type = 'click';
              action.name =
              'tab ' +
              '名称: ' +
              item.text + (
              item.pagePath ? ' 跳转到: ' + item.pagePath : '');
              callback(action);
              lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true);
            }
          }
          return result;
        };
      }
      function startActionManagement(lifeCycle) {
        var currentAction;
        var currentIdlePageActivitySubscription;

        return {
          create: function create(type, name) {
            if (currentAction) {
              // Ignore any new action if another one is already occurring.
              return;
            }
            var pendingAutoAction = new PendingAutoAction(lifeCycle, type, name);

            currentAction = pendingAutoAction;
            currentIdlePageActivitySubscription = (0, _trackPageActiveites__WEBPACK_IMPORTED_MODULE_4__.waitIdlePageActivity)(
            lifeCycle,
            function (params) {
              if (params.hadActivity) {
                pendingAutoAction.complete(params.endTime);
              } else {
                pendingAutoAction.discard();
              }
              currentAction = undefined;
            });

          },
          discardCurrent: function discardCurrent() {
            if (currentAction) {
              currentIdlePageActivitySubscription.stop();
              currentAction.discard();
              currentAction = undefined;
            }
          } };

      }
      var PendingAutoAction = function PendingAutoAction(lifeCycle, type, name) {
        this.id = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)();
        this.startClocks = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
        this.name = name;
        this.type = type;
        this.lifeCycle = lifeCycle;
        this.eventCountsSubscription = (0, _trackEventCounts__WEBPACK_IMPORTED_MODULE_3__.trackEventCounts)(lifeCycle);
        this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_CREATED, {
          id: this.id,
          startClocks: this.startClocks });

      };
      PendingAutoAction.prototype = {
        complete: function complete(endTime) {
          var eventCounts = this.eventCountsSubscription.eventCounts;
          this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_COMPLETED, {
            counts: {
              errorCount: eventCounts.errorCount,
              longTaskCount: eventCounts.longTaskCount,
              resourceCount: eventCounts.resourceCount },

            duration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.elapsed)(this.startClocks, endTime),
            id: this.id,
            name: this.name,
            startClocks: this.startClocks,
            type: this.type });

          this.eventCountsSubscription.stop();
        },
        discard: function discard() {
          this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_DISCARDED);
          this.eventCountsSubscription.stop();
        } };



      /***/},

    /***/"./src/rumEventsCollection/app/appCollection.js":
    /*!******************************************************!*\
                                                             !*** ./src/rumEventsCollection/app/appCollection.js ***!
                                                             \******************************************************/
    /***/function srcRumEventsCollectionAppAppCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startAppCollection": function startAppCollection() {return (/* binding */_startAppCollection);}
        /* harmony export */ });
      /* harmony import */var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./index */"./src/rumEventsCollection/app/index.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");




      function _startAppCollection(lifeCycle, configuration) {
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, function (appinfo) {
          lifeCycle.notify(
          _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
          processAppUpdate(appinfo));

        });

        return (0, _index__WEBPACK_IMPORTED_MODULE_0__.rewriteApp)(configuration, lifeCycle);
      }

      function processAppUpdate(appinfo) {
        var appEvent = {
          date: appinfo.startTime,
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.APP,
          app: {
            startupDuration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.startupDuration),
            scriptLoadDuration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.scriptLoadDuration),
            codeDownloadDuration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.codeDownloadDuration),
            startupType: appinfo.startupType,
            timeSpent: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.duration) } };


        return {
          rawRumEvent: appEvent,
          startTime: appinfo.startTime };

      }


      /***/},

    /***/"./src/rumEventsCollection/app/index.js":
    /*!**********************************************!*\
                                                     !*** ./src/rumEventsCollection/app/index.js ***!
                                                     \**********************************************/
    /***/function srcRumEventsCollectionAppIndexJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"THROTTLE_VIEW_UPDATE_PERIOD": function THROTTLE_VIEW_UPDATE_PERIOD() {return (/* binding */_THROTTLE_VIEW_UPDATE_PERIOD);},
        /* harmony export */"startupTypes": function startupTypes() {return (/* binding */_startupTypes);},
        /* harmony export */"rewriteApp": function rewriteApp() {return (/* binding */_rewriteApp);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");



      // 劫持原小程序App方法
      var _THROTTLE_VIEW_UPDATE_PERIOD = 3000;
      var _startupTypes = {
        COLD: 'cold',
        HOT: 'hot' };

      function _rewriteApp(configuration, lifeCycle) {
        var originApp = App;
        var appInfo = {
          isStartUp: false // 是否启动
        };
        var startTime;
        App = function App(app) {
          startTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
          // 合并方法，插入记录脚本
          ;['onLaunch', 'onShow', 'onHide'].forEach(function (methodName) {
            var userDefinedMethod = app[methodName]; // 暂存用户定义的方法
            app[methodName] = function (options) {
              console.log(methodName, 'methodName app');
              if (methodName === 'onLaunch') {
                appInfo.isStartUp = true;
                appInfo.isHide = false;
                appInfo.startupType = _startupTypes.COLD;
              } else if (methodName === 'onShow') {
                if (appInfo.isStartUp && appInfo.isHide) {
                  // 判断是热启动
                  appInfo.startupType = _startupTypes.HOT;
                  appUpdate();
                }
              } else if (methodName === 'onHide') {
                lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_HIDE);
                appInfo.isHide = true;
              }
              return userDefinedMethod && userDefinedMethod.call(this, options);
            };
          });
          return originApp(app);
        };
        startPerformanceObservable(lifeCycle, function (data) {
          appInfo = _objectSpread(_objectSpread({},
          appInfo),
          data);

          appUpdate();
        });
        var scheduleAppUpdate = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.throttle)(appUpdate, _THROTTLE_VIEW_UPDATE_PERIOD, {
          leading: false });

        function appUpdate() {
          lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, {
            startupDuration: appInfo.startupDuration,
            scriptLoadDuration: appInfo.scriptLoadDuration,
            codeDownloadDuration: appInfo.codeDownloadDuration,
            startupType: appInfo.startupType,
            startTime: startTime,
            duration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime });

        }
      }

      function startPerformanceObservable(lifeCycle, callback) {
        var subscribe = lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
        function (entitys) {
          // 过滤掉其他页面监听，只保留首次启动
          var startupDuration, scriptLoadDuration, codeDownloadDuration;
          var launchEntity = entitys.find(
          function (entity) {return (
              entity.entryType === 'navigation' &&
              entity.navigationType === 'appLaunch');});

          if (typeof launchEntity !== 'undefined') {
            startupDuration = launchEntity.duration;
          }
          var scriptentity = entitys.find(
          function (entity) {return (
              entity.entryType === 'script' && entity.name === 'evaluateScript');});

          if (typeof scriptentity !== 'undefined') {
            scriptLoadDuration = scriptentity.duration;
          }
          var firstEntity = entitys.find(
          function (entity) {return (
              entity.entryType === 'render' && entity.name === 'firstRender');});

          if (firstEntity && scriptentity && launchEntity) {
            if (
            !(0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.areInOrder)(firstEntity.duration, launchEntity.duration) ||
            !(0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.areInOrder)(scriptentity.duration, launchEntity.duration))
            {
              return;
            }
            codeDownloadDuration =
            launchEntity.duration - firstEntity.duration - scriptentity.duration;
            // 资源下载时间暂时定为：首次启动时间-脚本加载时间-初次渲染时间
          }
          callback({
            startupDuration: startupDuration,
            scriptLoadDuration: scriptLoadDuration,
            codeDownloadDuration: codeDownloadDuration });

        });

        return {
          stop: subscribe.unsubscribe };

      }


      /***/},

    /***/"./src/rumEventsCollection/assembly.js":
    /*!*********************************************!*\
                                                    !*** ./src/rumEventsCollection/assembly.js ***!
                                                    \*********************************************/
    /***/function srcRumEventsCollectionAssemblyJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startRumAssembly": function startRumAssembly() {return (/* binding */_startRumAssembly);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/baseInfo */"./src/core/baseInfo.js");



      function isTracked(configuration) {
        return (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.performDraw)(configuration.sampleRate);
      }
      function _startRumAssembly(
      applicationId,
      configuration,
      lifeCycle,
      parentContexts)
      {
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
        function (data) {
          var startTime = data.startTime;
          var rawRumEvent = data.rawRumEvent;
          var viewContext = parentContexts.findView(startTime);
          // console.log(
          // 	viewContext,
          // 	viewContext && viewContext.page && viewContext.page.route,
          // 	'viewContent====',
          // )
          if (rawRumEvent.type === 'view') {
            // console.log(
            // 	viewContext,
            // 	viewContext.page && viewContext.page.route,
            // 	'viewContextviewContext====',
            // )
          }

          var deviceContext = {
            device: _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__.default.deviceInfo };

          if (
          isTracked(configuration) && (
          viewContext || rawRumEvent.type === 'app'))
          {
            var actionContext = parentContexts.findAction(startTime);
            var rumContext = {
              _dd: {
                sdkName: configuration.sdkName,
                sdkVersion: configuration.sdkVersion,
                env: configuration.env,
                version: configuration.version },

              tags: configuration.tags,
              application: {
                id: applicationId },

              device: {},
              date: new Date().getTime(),
              session: {
                id: _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__.default.getSessionId() },

              user: {
                user_id: configuration.user_id || _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__.default.getClientID(),
                is_signin: configuration.user_id ? 'T' : 'F' } };



            var rumEvent = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(
            rumContext,
            deviceContext,
            viewContext,
            actionContext,
            rawRumEvent);


            var serverRumEvent = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.withSnakeCaseKeys)(rumEvent);
            // if (
            // 	serverRumEvent.type === 'view' ||
            // 	serverRumEvent.type === 'action'
            // ) {
            // 	console.log(serverRumEvent, 'serverRumEvent')
            // }

            lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent);
          }
        });

      }


      /***/},

    /***/"./src/rumEventsCollection/error/errorCollection.js":
    /*!**********************************************************!*\
                                                                 !*** ./src/rumEventsCollection/error/errorCollection.js ***!
                                                                 \**********************************************************/
    /***/function srcRumEventsCollectionErrorErrorCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startErrorCollection": function startErrorCollection() {return (/* binding */_startErrorCollection);},
        /* harmony export */"doStartErrorCollection": function doStartErrorCollection() {return (/* binding */_doStartErrorCollection);}
        /* harmony export */ });
      /* harmony import */var _core_errorCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../core/errorCollection */"./src/core/errorCollection.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");




      function _startErrorCollection(lifeCycle, configuration) {
        return _doStartErrorCollection(
        lifeCycle,
        configuration,
        (0, _core_errorCollection__WEBPACK_IMPORTED_MODULE_0__.startAutomaticErrorCollection)(configuration));

      }

      function _doStartErrorCollection(lifeCycle, configuration, observable) {
        observable.subscribe(function (error) {
          lifeCycle.notify(
          _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
          processError(error));

        });
      }

      function processError(error) {
        var resource = error.resource;
        if (resource) {
          var urlObj = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.urlParse)(error.resource.url).getParse();
          resource = {
            method: error.resource.method,
            status: error.resource.statusCode,
            statusGroup: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.getStatusGroup)(error.resource.statusCode),
            url: error.resource.url,
            urlHost: urlObj.Host,
            urlPath: urlObj.Path,
            urlPathGroup: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.replaceNumberCharByPath)(urlObj.Path) };

        }
        var rawRumEvent = {
          date: error.startTime,
          error: {
            message: error.message,
            resource: resource,
            source: error.source,
            stack: error.stack,
            type: error.type,
            starttime: error.startTime },

          type: _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ERROR };

        return {
          rawRumEvent: rawRumEvent,
          startTime: error.startTime };

      }


      /***/},

    /***/"./src/rumEventsCollection/page/index.js":
    /*!***********************************************!*\
                                                      !*** ./src/rumEventsCollection/page/index.js ***!
                                                      \***********************************************/
    /***/function srcRumEventsCollectionPageIndexJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"THROTTLE_VIEW_UPDATE_PERIOD": function THROTTLE_VIEW_UPDATE_PERIOD() {return (/* binding */_THROTTLE_VIEW_UPDATE_PERIOD2);},
        /* harmony export */"rewritePage": function rewritePage() {return (/* binding */_rewritePage);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _trackEventCounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../trackEventCounts */"./src/rumEventsCollection/trackEventCounts.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");



      // 劫持原小程序App方法
      var _THROTTLE_VIEW_UPDATE_PERIOD2 = 3000;

      function _rewritePage(configuration, lifeCycle) {
        var originPage = Page;
        console.log(originPage, 'originPage=====');
        Page = function Page(page) {
          // 合并方法，插入记录脚本
          var currentView,
          startTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
          console.
          log(page, 'page======')[(
          'onReady', 'onShow', 'onLoad', 'onUnload', 'onHide')].forEach(
          function (methodName) {
            var userDefinedMethod = page[methodName];
            page[methodName] = function () {
              console.log(methodName, 'methodName page');
              if (methodName === 'onShow' || methodName === 'onLoad') {
                if (typeof currentView === 'undefined') {
                  var activePage = getActivePage();
                  currentView = newView(
                  lifeCycle,
                  activePage && activePage.route,
                  startTime);

                }
              }

              currentView && currentView.setLoadEventEnd(methodName);

              if (
              (methodName === 'onUnload' ||
              methodName === 'onHide' ||
              methodName === 'onShow') &&
              currentView)
              {
                currentView.triggerUpdate();
                if (methodName === 'onUnload' || methodName === 'onHide') {
                  currentView.end();
                }
              }
              return userDefinedMethod && userDefinedMethod.apply(this, arguments);
            };
          });

          return originPage(page);
        };
      }
      function newView(lifeCycle, route, startTime) {
        if (typeof startTime === 'undefined') {
          startTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
        }
        var id = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)();
        var isActive = true;
        var eventCounts = {
          errorCount: 0,
          resourceCount: 0,
          userActionCount: 0 };

        var setdataCount = 0;

        var documentVersion = 0;
        var setdataDuration = 0;
        var loadingDuration = 0;
        var loadingTime;
        var showTime;
        var onload2onshowTime;
        var onshow2onready;
        var stayTime;
        var fpt, fmp;
        lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_CREATED, {
          id: id,
          startTime: startTime,
          route: route });

        var scheduleViewUpdate = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.throttle)(
        triggerViewUpdate,
        _THROTTLE_VIEW_UPDATE_PERIOD2,
        {
          leading: false });


        var cancelScheduleViewUpdate = scheduleViewUpdate.cancel;
        var _trackEventCounts = (0, _trackEventCounts__WEBPACK_IMPORTED_MODULE_1__.trackEventCounts)(
        lifeCycle,
        function (newEventCounts) {
          eventCounts = newEventCounts;
          scheduleViewUpdate();
        });

        var stopEventCountsTracking = _trackEventCounts.stop;
        var _trackFptTime = trackFptTime(lifeCycle, function (duration) {
          fpt = duration;
          scheduleViewUpdate();
        });
        var stopFptTracking = _trackFptTime.stop;
        var _trackSetDataTime = trackSetDataTime(lifeCycle, function (duration) {
          if ((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
            setdataDuration += duration;
            setdataCount++;
            scheduleViewUpdate();
          }
        });
        var stopSetDataTracking = _trackSetDataTime.stop;
        var _trackLoadingTime = trackLoadingTime(lifeCycle, function (duration) {
          if ((0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
            loadingDuration = duration;
            scheduleViewUpdate();
          }
        });
        var stopLoadingTimeTracking = _trackLoadingTime.stop;

        var setLoadEventEnd = function setLoadEventEnd(type) {
          if (type === 'onLoad') {
            loadingTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
          } else if (type === 'onShow') {
            showTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
            if (
            typeof onload2onshowTime === 'undefined' &&
            typeof loadingTime !== 'undefined')
            {
              onload2onshowTime = showTime - loadingTime;
            }
          } else if (type === 'onReady') {
            if (
            typeof onshow2onready === 'undefined' &&
            typeof showTime !== 'undefined')
            {
              onshow2onready = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - showTime;
            }
            if (typeof fmp === 'undefined') {
              fmp = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime; // 从开发者角度看，小程序首屏渲染完成的标志是首页 Page.onReady 事件触发。
            }
          } else if (type === 'onHide' || type === 'onUnload') {
            if (typeof showTime !== 'undefined') {
              stayTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - showTime;
            }
            isActive = false;
          }
          triggerViewUpdate();
        };
        function triggerViewUpdate() {
          documentVersion += 1;
          lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_UPDATED, {
            documentVersion: documentVersion,
            eventCounts: eventCounts,
            id: id,
            loadingTime: loadingDuration,
            stayTime: stayTime,
            onload2onshowTime: onload2onshowTime,
            onshow2onready: onshow2onready,
            setdataDuration: setdataDuration,
            setdataCount: setdataCount,
            fmp: fmp,
            fpt: fpt,
            startTime: startTime,
            route: route,
            duration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime,
            isActive: isActive });

        }
        return {
          scheduleUpdate: scheduleViewUpdate,
          setLoadEventEnd: setLoadEventEnd,
          triggerUpdate: function triggerUpdate() {
            cancelScheduleViewUpdate();
            triggerViewUpdate();
          },
          end: function end() {
            stopEventCountsTracking();
            stopFptTracking();
            cancelScheduleViewUpdate();
            stopSetDataTracking();
            stopLoadingTimeTracking();
            lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_ENDED, { endClocks: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() });
          } };

      }
      function trackFptTime(lifeCycle, callback) {
        var subscribe = lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
        function (entitys) {
          var firstRenderEntity = entitys.find(
          function (entity) {return (
              entity.entryType === 'render' && entity.name === 'firstRender');});


          if (typeof firstRenderEntity !== 'undefined') {
            callback(firstRenderEntity.duration);
          }
        });

        return {
          stop: subscribe.unsubscribe };

      }
      function trackLoadingTime(lifeCycle, callback) {
        var subscribe = lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
        function (entitys) {
          var navigationEnity = entitys.find(
          function (entity) {return entity.entryType === 'navigation';});

          if (typeof navigationEnity !== 'undefined') {
            callback(navigationEnity.duration);
          }
        });

        return {
          stop: subscribe.unsubscribe };

      }
      function trackSetDataTime(lifeCycle, callback) {
        var subscribe = lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PAGE_SET_DATA_UPDATE,
        function (data) {
          if (!data) return;
          callback(data.updateEndTimestamp - data.pendingStartTimestamp);
        });

        return {
          stop: subscribe.unsubscribe };

      }
      function getActivePage() {
        var curPages = getCurrentPages();
        if (curPages.length) {
          return curPages[curPages.length - 1];
        }
        return {};
      }


      /***/},

    /***/"./src/rumEventsCollection/page/viewCollection.js":
    /*!********************************************************!*\
                                                               !*** ./src/rumEventsCollection/page/viewCollection.js ***!
                                                               \********************************************************/
    /***/function srcRumEventsCollectionPageViewCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startViewCollection": function startViewCollection() {return (/* binding */_startViewCollection);}
        /* harmony export */ });
      /* harmony import */var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./index */"./src/rumEventsCollection/page/index.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");




      function _startViewCollection(lifeCycle, configuration) {
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__.LifeCycleEventType.VIEW_UPDATED, function (view) {
          lifeCycle.notify(
          _core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
          processViewUpdate(view));

        });

        return (0, _index__WEBPACK_IMPORTED_MODULE_0__.rewritePage)(configuration, lifeCycle);
      }
      function processViewUpdate(view) {
        var apdexLevel;
        if (view.fmp) {
          apdexLevel = parseInt(Number(view.fmp) / 1000);
          apdexLevel = apdexLevel > 9 ? 9 : apdexLevel;
        }
        var viewEvent = {
          _dd: {
            documentVersion: view.documentVersion },

          date: view.startTime,
          type: _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.VIEW,
          page: {
            action: {
              count: view.eventCounts.userActionCount },

            error: {
              count: view.eventCounts.errorCount },

            setdata: {
              count: view.setdataCount },

            setdata_duration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.setdataDuration),
            loadingTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.loadingTime),
            stayTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.stayTime),
            onload2onshow: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.onload2onshowTime),
            onshow2onready: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.onshow2onready),
            fpt: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.fpt),
            fmp: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.fmp),
            isActive: view.isActive,
            apdexLevel: apdexLevel,
            // longTask: {
            //   count: view.eventCounts.longTaskCount
            // },
            resource: {
              count: view.eventCounts.resourceCount },

            timeSpent: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.duration) } };


        return {
          rawRumEvent: viewEvent,
          startTime: view.startTime };

      }


      /***/},

    /***/"./src/rumEventsCollection/parentContexts.js":
    /*!***************************************************!*\
                                                          !*** ./src/rumEventsCollection/parentContexts.js ***!
                                                          \***************************************************/
    /***/function srcRumEventsCollectionParentContextsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"VIEW_CONTEXT_TIME_OUT_DELAY": function VIEW_CONTEXT_TIME_OUT_DELAY() {return (/* binding */_VIEW_CONTEXT_TIME_OUT_DELAY);},
        /* harmony export */"CLEAR_OLD_CONTEXTS_INTERVAL": function CLEAR_OLD_CONTEXTS_INTERVAL() {return (/* binding */_CLEAR_OLD_CONTEXTS_INTERVAL);},
        /* harmony export */"startParentContexts": function startParentContexts() {return (/* binding */_startParentContexts);}
        /* harmony export */ });
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");



      var _VIEW_CONTEXT_TIME_OUT_DELAY = 4 * _helper_enums__WEBPACK_IMPORTED_MODULE_0__.ONE_HOUR;
      var _CLEAR_OLD_CONTEXTS_INTERVAL = _helper_enums__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE;

      function _startParentContexts(lifeCycle) {
        var currentView;
        var currentAction;
        var previousViews = [];
        var previousActions = [];
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_CREATED,
        function (currentContext) {
          currentView = currentContext;
        });


        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_UPDATED,
        function (currentContext) {
          // A view can be updated after its end.  We have to ensure that the view being updated is the
          // most recently created.
          if (currentView && currentView.id === currentContext.id) {
            currentView = currentContext;
          }
        });

        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_ENDED, function (data) {
          if (currentView) {
            previousViews.unshift({
              endTime: data.endClocks,
              context: buildCurrentViewContext(),
              startTime: currentView.startTime });

            currentView = undefined;
          }
        });
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_CREATED,
        function (currentContext) {
          currentAction = currentContext;
        });


        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_COMPLETED,
        function (action) {
          if (currentAction) {
            previousActions.unshift({
              context: buildCurrentActionContext(),
              endTime: currentAction.startClocks + action.duration,
              startTime: currentAction.startClocks });

          }
          currentAction = undefined;
        });


        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_DISCARDED, function () {
          currentAction = undefined;
        });
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.SESSION_RENEWED, function () {
          previousViews = [];
          previousActions = [];
          currentView = undefined;
          currentAction = undefined;
        });
        var clearOldContextsInterval = setInterval(function () {
          clearOldContexts(previousViews, _VIEW_CONTEXT_TIME_OUT_DELAY);
        }, _CLEAR_OLD_CONTEXTS_INTERVAL);

        function clearOldContexts(previousContexts, timeOutDelay) {
          var oldTimeThreshold = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - timeOutDelay;
          while (
          previousContexts.length > 0 &&
          previousContexts[previousContexts.length - 1].startTime < oldTimeThreshold)
          {
            previousContexts.pop();
          }
        }
        function buildCurrentActionContext() {
          return { userAction: { id: currentAction.id } };
        }
        function buildCurrentViewContext() {
          return {
            page: {
              id: currentView.id,
              referer:
              previousViews.length &&
              previousViews[previousViews.length - 1].context.page.route ||
              undefined,
              route: currentView.route } };


        }

        function findContext(
        buildContext,
        previousContexts,
        currentContext,
        startTime)
        {
          if (startTime === undefined) {
            return currentContext ? buildContext() : undefined;
          }
          if (currentContext && startTime >= currentContext.startTime) {
            return buildContext();
          }
          var flag = undefined;
          (0, _helper_utils__WEBPACK_IMPORTED_MODULE_1__.each)(previousContexts, function (previousContext) {
            if (startTime > previousContext.endTime) {
              return false;
            }
            if (startTime >= previousContext.startTime) {
              flag = previousContext.context;
              return false;
            }
          });

          return flag;
        }

        var parentContexts = {
          findView: function findView(startTime) {
            return findContext(
            buildCurrentViewContext,
            previousViews,
            currentView,
            startTime);

          },
          findAction: function findAction(startTime) {
            return findContext(
            buildCurrentActionContext,
            previousActions,
            currentAction,
            startTime);

          },

          stop: function stop() {
            clearInterval(clearOldContextsInterval);
          } };

        return parentContexts;
      }


      /***/},

    /***/"./src/rumEventsCollection/performanceCollection.js":
    /*!**********************************************************!*\
                                                                 !*** ./src/rumEventsCollection/performanceCollection.js ***!
                                                                 \**********************************************************/
    /***/function srcRumEventsCollectionPerformanceCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startPagePerformanceObservable": function startPagePerformanceObservable() {return (/* binding */_startPagePerformanceObservable);}
        /* harmony export */ });
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _core_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../core/sdk */"./src/core/sdk.js");


      function _startPagePerformanceObservable(lifeCycle, configuration) {
        if (!!_core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.getPerformance) {
          var performance = _core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.getPerformance();
          var observer = performance.createObserver(function (entryList) {
            lifeCycle.notify(
            _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
            entryList.getEntries());

          });
          observer.observe({ entryTypes: ['render', 'script', 'navigation'] });
        }
      }


      /***/},

    /***/"./src/rumEventsCollection/requestCollection.js":
    /*!******************************************************!*\
                                                             !*** ./src/rumEventsCollection/requestCollection.js ***!
                                                             \******************************************************/
    /***/function srcRumEventsCollectionRequestCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startRequestCollection": function startRequestCollection() {return (/* binding */_startRequestCollection);},
        /* harmony export */"trackXhr": function trackXhr() {return (/* binding */_trackXhr);},
        /* harmony export */"trackDownload": function trackDownload() {return (/* binding */_trackDownload);}
        /* harmony export */ });
      /* harmony import */var _core_xhrProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../core/xhrProxy */"./src/core/xhrProxy.js");
      /* harmony import */var _core_downloadProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../core/downloadProxy */"./src/core/downloadProxy.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ../rumEventsCollection/resource/resourceUtils */"./src/rumEventsCollection/resource/resourceUtils.js");





      var nextRequestIndex = 1;

      function _startRequestCollection(lifeCycle, configuration) {
        _trackXhr(lifeCycle, configuration);
        _trackDownload(lifeCycle, configuration);
      }
      function parseHeader(header) {
        // 大小写兼容
        if (!(0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.isObject)(header)) return header;
        var res = {};
        Object.keys(header).forEach(function (key) {
          res[key.toLowerCase()] = header[key];
        });
        return res;
      }
      function getHeaderString(header) {
        if (!(0, _helper_utils__WEBPACK_IMPORTED_MODULE_3__.isObject)(header)) return header;
        var headerStr = '';
        Object.keys(header).forEach(function (key) {
          headerStr += key + ':' + header[key] + ';';
        });
        return headerStr;
      }
      function _trackXhr(lifeCycle, configuration) {
        var xhrProxy = (0, _core_xhrProxy__WEBPACK_IMPORTED_MODULE_0__.startXhrProxy)();
        xhrProxy.beforeSend(function (context) {
          if ((0, _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
            context.requestIndex = getNextRequestIndex();
            lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_STARTED, {
              requestIndex: context.requestIndex });

          }
        });
        xhrProxy.onRequestComplete(function (context) {
          if ((0, _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
            lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_COMPLETED, {
              duration: context.duration,
              method: context.method,
              requestIndex: context.requestIndex,
              performance: context.profile,
              response: context.response,
              startTime: context.startTime,
              status: context.status,
              type: context.type,
              url: context.url });

          }
        });
        return xhrProxy;
      }
      function _trackDownload(lifeCycle, configuration) {
        var dwonloadProxy = (0, _core_downloadProxy__WEBPACK_IMPORTED_MODULE_1__.startDownloadProxy)();
        dwonloadProxy.beforeSend(function (context) {
          if ((0, _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
            context.requestIndex = getNextRequestIndex();
            lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_STARTED, {
              requestIndex: context.requestIndex });

          }
        });
        dwonloadProxy.onRequestComplete(function (context) {
          if ((0, _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
            lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_COMPLETED, {
              duration: context.duration,
              method: context.method,
              requestIndex: context.requestIndex,
              performance: context.profile,
              response: context.response,
              startTime: context.startTime,
              status: context.status,
              type: context.type,
              url: context.url });

          }
        });
        return dwonloadProxy;
      }
      function getNextRequestIndex() {
        var result = nextRequestIndex;
        nextRequestIndex += 1;
        return result;
      }


      /***/},

    /***/"./src/rumEventsCollection/resource/resourceCollection.js":
    /*!****************************************************************!*\
                                                                       !*** ./src/rumEventsCollection/resource/resourceCollection.js ***!
                                                                       \****************************************************************/
    /***/function srcRumEventsCollectionResourceResourceCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startResourceCollection": function startResourceCollection() {return (/* binding */_startResourceCollection);}
        /* harmony export */ });
      /* harmony import */var _resourceUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./resourceUtils */"./src/rumEventsCollection/resource/resourceUtils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");




      function _startResourceCollection(lifeCycle, configuration) {
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_COMPLETED, function (request) {
          lifeCycle.notify(
          _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
          processRequest(request));

        });
      }

      function processRequest(request) {
        var type = request.type;
        var timing = request.performance;
        var correspondingTimingOverrides = timing ?
        computePerformanceEntryMetrics(timing) :
        undefined;
        var urlObj = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.urlParse)(request.url).getParse();
        var startTime = request.startTime;
        var resourceEvent = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.extend2Lev)(
        {
          date: startTime,
          resource: {
            type: type,
            duration: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(request.duration),
            method: request.method,
            status: request.status,
            statusGroup: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.getStatusGroup)(request.status),
            url: request.url,
            urlHost: urlObj.Host,
            urlPath: urlObj.Path,
            urlPathGroup: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.replaceNumberCharByPath)(urlObj.Path),
            urlQuery: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.jsonStringify)((0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.getQueryParamsFromUrl)(request.url)) },

          type: _helper_enums__WEBPACK_IMPORTED_MODULE_3__.RumEventType.RESOURCE },

        correspondingTimingOverrides);

        return { startTime: startTime, rawRumEvent: resourceEvent };
      }
      function computePerformanceEntryMetrics(timing) {
        return {
          resource: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_2__.extend2Lev)(
          {},
          {
            load: (0, _resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computePerformanceResourceDuration)(timing),
            size: (0, _resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computeSize)(timing) },

          (0, _resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computePerformanceResourceDetails)(timing)) };


      }


      /***/},

    /***/"./src/rumEventsCollection/resource/resourceUtils.js":
    /*!***********************************************************!*\
                                                                  !*** ./src/rumEventsCollection/resource/resourceUtils.js ***!
                                                                  \***********************************************************/
    /***/function srcRumEventsCollectionResourceResourceUtilsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"computePerformanceResourceDuration": function computePerformanceResourceDuration() {return (/* binding */_computePerformanceResourceDuration);},
        /* harmony export */"computePerformanceResourceDetails": function computePerformanceResourceDetails() {return (/* binding */_computePerformanceResourceDetails);},
        /* harmony export */"toValidEntry": function toValidEntry() {return (/* binding */_toValidEntry);},
        /* harmony export */"computeSize": function computeSize() {return (/* binding */_computeSize);},
        /* harmony export */"isAllowedRequestUrl": function isAllowedRequestUrl() {return (/* binding */_isAllowedRequestUrl);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/configuration */"./src/core/configuration.js");



      function areInOrder() {
        var numbers = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.toArray)(arguments);
        for (var i = 1; i < numbers.length; i += 1) {
          if (numbers[i - 1] > numbers[i]) {
            return false;
          }
        }
        return true;
      }

      function _computePerformanceResourceDuration(entry) {
        // Safari duration is always 0 on timings blocked by cross origin policies.
        if (entry.startTime < entry.responseEnd) {
          return (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(entry.responseEnd - entry.startTime);
        }
      }

      //  interface PerformanceResourceDetails {
      //   redirect?: PerformanceResourceDetailsElement
      //   dns?: PerformanceResourceDetailsElement
      //   connect?: PerformanceResourceDetailsElement
      //   ssl?: PerformanceResourceDetailsElement
      //   firstByte: PerformanceResourceDetailsElement
      //   download: PerformanceResourceDetailsElement
      //   fmp:
      // }
      // page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
      // page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
      // page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
      // page_firstbyte	float		首包时间	responseStart - domainLookupStart
      // page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
      // page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
      // page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
      // page_tcp	float		tcp连接时间	connectEnd - connectStart
      // page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
      // page_ttfb	float		请求响应耗时	responseStart - requestStart
      // page_trans	float		内容传输时间	responseEnd - responseStart
      // page_dom	float		DOM解析耗时	domInteractive - responseEnd
      // page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd

      //  navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性。

      // ·   unloadEventStart：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的unload事件发生时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

      // ·   unloadEventEnd：如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

      // ·   redirectStart：返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

      // ·   redirectEnd：返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

      // ·   fetchStart：返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。

      // ·   domainLookupStart：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

      // ·   domainLookupEnd：返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

      // ·   connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

      // ·   connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。

      // ·   secureConnectionStart：返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。

      // ·   requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。

      // ·   responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。

      // ·   responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。

      // ·   domLoading：返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

      // ·   domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

      // ·   domContentLoadedEventStart：返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。

      // ·   domContentLoadedEventEnd：返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。

      // ·   domComplete：返回当前网页DOM结构生成时（即Document.readyState属性变为“complete”，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。

      // ·   loadEventStart：返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。

      // ·   loadEventEnd：返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0
      function _computePerformanceResourceDetails(entry) {
        var validEntry = _toValidEntry(entry);

        if (!validEntry) {
          return undefined;
        }

        var startTime = validEntry.startTime,
        fetchStart = validEntry.fetchStart,
        redirectStart = validEntry.redirectStart,
        redirectEnd = validEntry.redirectEnd,
        domainLookupStart =
        validEntry.domainLookupStart || validEntry.domainLookUpStart,
        domainLookupEnd = validEntry.domainLookupEnd || validEntry.domainLookUpEnd,
        connectStart = validEntry.connectStart,
        SSLconnectionStart = validEntry.SSLconnectionStart,
        SSLconnectionEnd = validEntry.SSLconnectionEnd,
        connectEnd = validEntry.connectEnd,
        requestStart = validEntry.requestStart,
        responseStart = validEntry.responseStart,
        responseEnd = validEntry.responseEnd;
        var details = {
          firstbyte: formatTiming(startTime, domainLookupStart, responseStart),
          trans: formatTiming(startTime, responseStart, responseEnd),
          ttfb: formatTiming(startTime, requestStart, responseStart) };

        // Make sure a connection occurred
        if (connectEnd !== fetchStart) {
          details.tcp = formatTiming(startTime, connectStart, connectEnd);

          // Make sure a secure connection occurred
          if (areInOrder(connectStart, SSLconnectionStart, SSLconnectionEnd)) {
            details.ssl = formatTiming(
            startTime,
            SSLconnectionStart,
            SSLconnectionEnd);

          }
        }

        // Make sure a domain lookup occurred
        if (domainLookupEnd !== fetchStart) {
          details.dns = formatTiming(startTime, domainLookupStart, domainLookupEnd);
        }

        if (hasRedirection(entry)) {
          details.redirect = formatTiming(startTime, redirectStart, redirectEnd);
        }

        return details;
      }

      function _toValidEntry(entry) {
        // Ensure timings are in the right order. On top of filtering out potential invalid
        // RumPerformanceResourceTiming, it will ignore entries from requests where timings cannot be
        // collected, for example cross origin requests without a "Timing-Allow-Origin" header allowing
        // it.
        // page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
        // page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
        // page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
        // page_firstbyte	float		首包时间	responseStart - domainLookupStart
        // page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
        // page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
        // page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
        // page_tcp	float		tcp连接时间	connectEnd - connectStart
        // page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
        // page_ttfb	float		请求响应耗时	responseStart - requestStart
        // page_trans	float		内容传输时间	responseEnd - responseStart
        // page_dom	float		DOM解析耗时	domInteractive - responseEnd
        // page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd
        if (
        !areInOrder(
        entry.startTime,
        entry.fetchStart,
        entry.domainLookupStart,
        entry.domainLookupEnd,
        entry.connectStart,
        entry.connectEnd,
        entry.requestStart,
        entry.responseStart,
        entry.responseEnd))

        {
          return undefined;
        }

        if (!hasRedirection(entry)) {
          return entry;
        }

        var redirectStart = entry.redirectStart;
        var redirectEnd = entry.redirectEnd;
        // Firefox doesn't provide redirect timings on cross origin requests.
        // Provide a default for those.
        if (redirectStart < entry.startTime) {
          redirectStart = entry.startTime;
        }
        if (redirectEnd < entry.startTime) {
          redirectEnd = entry.fetchStart;
        }

        // Make sure redirect timings are in order
        if (
        !areInOrder(entry.startTime, redirectStart, redirectEnd, entry.fetchStart))
        {
          return undefined;
        }
        return (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, entry, {
          redirectEnd: redirectEnd,
          redirectStart: redirectStart });

        // return {
        //   ...entry,
        //   redirectEnd,
        //   redirectStart
        // }
      }

      function hasRedirection(entry) {
        // The only time fetchStart is different than startTime is if a redirection occurred.
        return entry.fetchStart !== entry.startTime;
      }

      function formatTiming(origin, start, end) {
        return (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(end - start);
      }

      function _computeSize(entry) {
        // Make sure a request actually occurred
        if (entry.startTime < entry.responseStart) {
          return entry.receivedBytedCount;
        }
        return undefined;
      }

      function _isAllowedRequestUrl(configuration, url) {
        return url && !(0, _core_configuration__WEBPACK_IMPORTED_MODULE_1__.isIntakeRequest)(url, configuration);
      }


      /***/},

    /***/"./src/rumEventsCollection/setDataCollection.js":
    /*!******************************************************!*\
                                                             !*** ./src/rumEventsCollection/setDataCollection.js ***!
                                                             \******************************************************/
    /***/function srcRumEventsCollectionSetDataCollectionJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startSetDataColloction": function startSetDataColloction() {return (/* binding */_startSetDataColloction);}
        /* harmony export */ });
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");


      function _startSetDataColloction(lifeCycle) {
        var originPage = Page;
        var originComponent = Component;
        Page = function Page(page) {
          var originPageOnLoad = page['onLoad'];
          page['onLoad'] = function () {
            this.setUpdatePerformanceListener &&
            this.setUpdatePerformanceListener({ withDataPaths: true }, function (res) {
              lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, res);
            });
            return originPageOnLoad.apply(this, arguments);
          };
          return originPage(page);
        };
        Component = function Component(component) {
          var originComponentAttached = component['attached'];
          component['attached'] = function () {
            this.setUpdatePerformanceListener &&
            this.setUpdatePerformanceListener({ withDataPaths: true }, function (res) {
              lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, res);
            });
            return originComponentAttached.apply(this, arguments);
          };
          return originComponent(component);
        };
      }


      /***/},

    /***/"./src/rumEventsCollection/trackEventCounts.js":
    /*!*****************************************************!*\
                                                            !*** ./src/rumEventsCollection/trackEventCounts.js ***!
                                                            \*****************************************************/
    /***/function srcRumEventsCollectionTrackEventCountsJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"trackEventCounts": function trackEventCounts() {return (/* binding */_trackEventCounts2);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../helper/enums */"./src/helper/enums.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");




      function _trackEventCounts2(lifeCycle, callback) {
        if (typeof callback === 'undefined') {
          callback = _helper_utils__WEBPACK_IMPORTED_MODULE_0__.noop;
        }
        var eventCounts = {
          errorCount: 0,
          resourceCount: 0,
          longTaskCount: 0,
          userActionCount: 0 };


        var subscription = lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
        function (data) {
          var rawRumEvent = data.rawRumEvent;
          switch (rawRumEvent.type) {
            case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ERROR:
              eventCounts.errorCount += 1;
              callback(eventCounts);
              break;
            case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.RESOURCE:
              eventCounts.resourceCount += 1;
              callback(eventCounts);
              break;
            case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ACTION:
              eventCounts.userActionCount += 1;
              callback(eventCounts);
              break;}

        });


        return {
          stop: function stop() {
            subscription.unsubscribe();
          },
          eventCounts: eventCounts };

      }


      /***/},

    /***/"./src/rumEventsCollection/trackPageActiveites.js":
    /*!********************************************************!*\
                                                               !*** ./src/rumEventsCollection/trackPageActiveites.js ***!
                                                               \********************************************************/
    /***/function srcRumEventsCollectionTrackPageActiveitesJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"PAGE_ACTIVITY_VALIDATION_DELAY": function PAGE_ACTIVITY_VALIDATION_DELAY() {return (/* binding */_PAGE_ACTIVITY_VALIDATION_DELAY);},
        /* harmony export */"PAGE_ACTIVITY_END_DELAY": function PAGE_ACTIVITY_END_DELAY() {return (/* binding */_PAGE_ACTIVITY_END_DELAY);},
        /* harmony export */"PAGE_ACTIVITY_MAX_DURATION": function PAGE_ACTIVITY_MAX_DURATION() {return (/* binding */_PAGE_ACTIVITY_MAX_DURATION);},
        /* harmony export */"waitIdlePageActivity": function waitIdlePageActivity() {return (/* binding */_waitIdlePageActivity);},
        /* harmony export */"trackPageActivities": function trackPageActivities() {return (/* binding */_trackPageActivities2);},
        /* harmony export */"waitPageActivitiesCompletion": function waitPageActivitiesCompletion() {return (/* binding */_waitPageActivitiesCompletion2);}
        /* harmony export */ });
      /* harmony import */var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../helper/utils */"./src/helper/utils.js");
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _core_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../core/observable */"./src/core/observable.js");



      // Delay to wait for a page activity to validate the tracking process
      var _PAGE_ACTIVITY_VALIDATION_DELAY = 100;
      // Delay to wait after a page activity to end the tracking process
      var _PAGE_ACTIVITY_END_DELAY = 100;
      // Maximum duration of the tracking process
      var _PAGE_ACTIVITY_MAX_DURATION = 10000;

      function _waitIdlePageActivity(lifeCycle, completionCallback) {
        var _trackPageActivities = _trackPageActivities2(lifeCycle);
        var pageActivitiesObservable = _trackPageActivities.observable;
        var stopPageActivitiesTracking = _trackPageActivities.stop;
        var _waitPageActivitiesCompletion = _waitPageActivitiesCompletion2(
        pageActivitiesObservable,
        stopPageActivitiesTracking,
        completionCallback);


        var stopWaitPageActivitiesCompletion = _waitPageActivitiesCompletion.stop;
        function stop() {
          stopWaitPageActivitiesCompletion();
          stopPageActivitiesTracking();
        }

        return { stop: stop };
      }

      // Automatic action collection lifecycle overview:
      //                      (Start new trackPageActivities)
      //              .-------------------'--------------------.
      //              v                                        v
      //     [Wait for a page activity ]          [Wait for a maximum duration]
      //     [timeout: VALIDATION_DELAY]          [  timeout: MAX_DURATION    ]
      //          /                  \                           |
      //         v                    v                          |
      //  [No page activity]   [Page activity]                   |
      //         |                   |,----------------------.   |
      //         v                   v                       |   |
      //     (Discard)     [Wait for a page activity]        |   |
      //                   [   timeout: END_DELAY   ]        |   |
      //                       /                \            |   |
      //                      v                  v           |   |
      //             [No page activity]    [Page activity]   |   |
      //                      |                 |            |   |
      //                      |                 '------------'   |
      //                      '-----------. ,--------------------'
      //                                   v
      //                                 (End)
      //
      // Note: because MAX_DURATION > VALIDATION_DELAY, we are sure that if the process is still alive
      // after MAX_DURATION, it has been validated.
      function _trackPageActivities2(lifeCycle) {
        var observable = new _core_observable__WEBPACK_IMPORTED_MODULE_2__.Observable();
        var subscriptions = [];
        var firstRequestIndex;
        var pendingRequestsCount = 0;

        subscriptions.push(
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, function () {
          notifyPageActivity();
        }),
        lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, function () {
          notifyPageActivity();
        }));


        subscriptions.push(
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_STARTED,
        function (startEvent) {
          if (firstRequestIndex === undefined) {
            firstRequestIndex = startEvent.requestIndex;
          }

          pendingRequestsCount += 1;
          notifyPageActivity();
        }));



        subscriptions.push(
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_COMPLETED,
        function (request) {
          // If the request started before the tracking start, ignore it
          if (
          firstRequestIndex === undefined ||
          request.requestIndex < firstRequestIndex)
          {
            return;
          }
          pendingRequestsCount -= 1;
          notifyPageActivity();
        }));



        function notifyPageActivity() {
          observable.notify({ isBusy: pendingRequestsCount > 0 });
        }

        return {
          observable: observable,
          stop: function stop() {
            (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(subscriptions, function (sub) {
              sub.unsubscribe();
            });
          } };

      }

      function _waitPageActivitiesCompletion2(
      pageActivitiesObservable,
      stopPageActivitiesTracking,
      completionCallback)
      {
        var idleTimeoutId;
        var hasCompleted = false;

        var validationTimeoutId = setTimeout(function () {
          complete({ hadActivity: false });
        }, _PAGE_ACTIVITY_VALIDATION_DELAY);
        var maxDurationTimeoutId = setTimeout(function () {
          complete({ hadActivity: true, endTime: (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() });
        }, _PAGE_ACTIVITY_MAX_DURATION);
        pageActivitiesObservable.subscribe(function (data) {
          var isBusy = data.isBusy;
          clearTimeout(validationTimeoutId);
          clearTimeout(idleTimeoutId);
          var lastChangeTime = (0, _helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)();
          if (!isBusy) {
            idleTimeoutId = setTimeout(function () {
              complete({ hadActivity: true, endTime: lastChangeTime });
            }, _PAGE_ACTIVITY_END_DELAY);
          }
        });

        function stop() {
          hasCompleted = true;
          clearTimeout(validationTimeoutId);
          clearTimeout(idleTimeoutId);
          clearTimeout(maxDurationTimeoutId);
          stopPageActivitiesTracking();
        }

        function complete(params) {
          if (hasCompleted) {
            return;
          }
          stop();
          completionCallback(params);
        }

        return { stop: stop };
      }


      /***/},

    /***/"./src/rumEventsCollection/transport/batch.js":
    /*!****************************************************!*\
                                                           !*** ./src/rumEventsCollection/transport/batch.js ***!
                                                           \****************************************************/
    /***/function srcRumEventsCollectionTransportBatchJs(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

      __webpack_require__.r(__webpack_exports__);
      /* harmony export */__webpack_require__.d(__webpack_exports__, {
        /* harmony export */"startRumBatch": function startRumBatch() {return (/* binding */_startRumBatch);}
        /* harmony export */ });
      /* harmony import */var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ../../core/lifeCycle */"./src/core/lifeCycle.js");
      /* harmony import */var _core_transport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ../../core/transport */"./src/core/transport.js");
      /* harmony import */var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ../../helper/enums */"./src/helper/enums.js");



      function _startRumBatch(configuration, lifeCycle) {
        var batch = makeRumBatch(configuration, lifeCycle);
        lifeCycle.subscribe(
        _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.RUM_EVENT_COLLECTED,
        function (serverRumEvent) {
          if (serverRumEvent.type === _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.VIEW) {
            batch.upsert(serverRumEvent, serverRumEvent.page.id);
          } else {
            batch.add(serverRumEvent);
          }
        });

        return {
          stop: function stop() {
            batch.stop();
          } };

      }

      function makeRumBatch(configuration, lifeCycle) {
        var primaryBatch = createRumBatch(configuration.datakitUrl, lifeCycle);

        function createRumBatch(endpointUrl, lifeCycle) {
          return new _core_transport__WEBPACK_IMPORTED_MODULE_1__.Batch(
          new _core_transport__WEBPACK_IMPORTED_MODULE_1__.HttpRequest(endpointUrl, configuration.batchBytesLimit),
          configuration.maxBatchSize,
          configuration.batchBytesLimit,
          configuration.maxMessageSize,
          configuration.flushTimeout,
          lifeCycle);

        }

        var stopped = false;
        return {
          add: function add(message) {
            if (stopped) {
              return;
            }
            primaryBatch.add(message);
          },
          stop: function stop() {
            stopped = true;
          },
          upsert: function upsert(message, key) {
            if (stopped) {
              return;
            }
            primaryBatch.upsert(message, key);
          } };

      }


      /***/}

    /******/ };
  /************************************************************************/
  /******/ // The module cache
  /******/var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/var cachedModule = __webpack_module_cache__[moduleId];
    /******/if (cachedModule !== undefined) {
      /******/return cachedModule.exports;
      /******/}
    /******/ // Create a new module (and put it into the cache)
    /******/var module = __webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/exports: {}
      /******/ };
    /******/
    /******/ // Execute the module function
    /******/__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    /******/
    /******/ // Return the exports of the module
    /******/return module.exports;
    /******/}
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/(function () {
    /******/ // define getter functions for harmony exports
    /******/__webpack_require__.d = function (exports, definition) {
      /******/for (var key in definition) {
        /******/if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
          /******/Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
          /******/}
        /******/}
      /******/};
    /******/})();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/(function () {
    /******/__webpack_require__.o = function (obj, prop) {return Object.prototype.hasOwnProperty.call(obj, prop);};
    /******/})();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/(function () {
    /******/ // define __esModule on exports
    /******/__webpack_require__.r = function (exports) {
      /******/if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        /******/}
      /******/Object.defineProperty(exports, '__esModule', { value: true });
      /******/};
    /******/})();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (function () {
    /*!**********************!*\
                  !*** ./src/index.js ***!
                  \**********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony export */__webpack_require__.d(__webpack_exports__, {
      /* harmony export */"datafluxRum": function datafluxRum() {return (/* reexport safe */_boot_rum_entry__WEBPACK_IMPORTED_MODULE_0__.datafluxRum);}
      /* harmony export */ });
    /* harmony import */var _boot_rum_entry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./boot/rum.entry */"./src/boot/rum.entry.js");


  })();

  module.exports = __webpack_exports__;
  /******/})();

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map