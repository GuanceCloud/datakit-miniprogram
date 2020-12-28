"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tracker = exports.sdk = void 0;

var _utils = require("../helper/utils");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getSDK() {
  var sdk = null,
      tracker = '';

  try {
    if (wx && (typeof wx === "undefined" ? "undefined" : _typeof(wx)) === 'object' && typeof wx.request === 'function') {
      sdk = (0, _utils.deepMixObject)({}, wx);
      tracker = 'wx';
      wx = sdk;
    }
  } catch (err) {
    console.warn('unsupport platform, Fail to start');
  }

  console.log('------get SDK-------');
  return {
    sdk: sdk,
    tracker: tracker
  };
}

var instance = getSDK();
var sdk = instance.sdk;
exports.sdk = sdk;
var tracker = instance.tracker;
exports.tracker = tracker;