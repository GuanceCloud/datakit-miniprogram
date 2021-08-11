"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MpHook = exports.ActionType = exports.RequestType = exports.RumEventType = exports.CLIENT_ID_TOKEN = exports.ONE_KILO_BYTE = exports.ONE_HOUR = exports.ONE_MINUTE = exports.ONE_SECOND = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ONE_SECOND = 1000;
exports.ONE_SECOND = ONE_SECOND;
var ONE_MINUTE = 60 * ONE_SECOND;
exports.ONE_MINUTE = ONE_MINUTE;
var ONE_HOUR = 60 * ONE_MINUTE;
exports.ONE_HOUR = ONE_HOUR;
var ONE_KILO_BYTE = 1024;
exports.ONE_KILO_BYTE = ONE_KILO_BYTE;
var CLIENT_ID_TOKEN = 'datafluxRum:client:id';
exports.CLIENT_ID_TOKEN = CLIENT_ID_TOKEN;

var RumEventType = _defineProperty({
  ACTION: 'action',
  ERROR: 'error',
  LONG_TASK: 'long_task',
  VIEW: 'view',
  RESOURCE: 'resource',
  APP: 'app'
}, "ACTION", 'action');

exports.RumEventType = RumEventType;
var RequestType = {
  XHR: 'network',
  DOWNLOAD: 'resource'
};
exports.RequestType = RequestType;
var ActionType = {
  tap: 'tap',
  longpress: 'longpress',
  longtap: 'longtap'
};
exports.ActionType = ActionType;
var MpHook = {
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
  onUnload: 1
};
exports.MpHook = MpHook;