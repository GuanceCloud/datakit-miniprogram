"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RequestType = exports.RumEventType = exports.CLIENT_ID_TOKEN = exports.ONE_KILO_BYTE = exports.ONE_HOUR = exports.ONE_MINUTE = exports.ONE_SECOND = void 0;
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
var RumEventType = {
  ACTION: 'action',
  ERROR: 'error',
  LONG_TASK: 'long_task',
  VIEW: 'view',
  RESOURCE: 'resource',
  APP: 'app'
};
exports.RumEventType = RumEventType;
var RequestType = {
  XHR: 'network',
  DOWNLOAD: 'resource'
};
exports.RequestType = RequestType;