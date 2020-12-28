"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRequestCollection = startRequestCollection;
exports.trackXhr = trackXhr;
exports.trackDownload = trackDownload;

var _xhrProxy = require("../core/xhrProxy");

var _downloadProxy = require("../core/downloadProxy");

var _lifeCycle = require("../core/lifeCycle");

var _utils = require("../helper/utils");

var _resourceUtils = require("../rumEventsCollection/resource/resourceUtils");

var nextRequestIndex = 1;

function startRequestCollection(lifeCycle, configuration) {
  trackXhr(lifeCycle, configuration);
  trackDownload(lifeCycle, configuration);
}

function parseHeader(header) {
  // 大小写兼容
  if (!(0, _utils.isObject)(header)) return header;
  var res = {};
  Object.keys(header).forEach(function (key) {
    res[key.toLowerCase()] = header[key];
  });
  return res;
}

function getHeaderString(header) {
  if (!(0, _utils.isObject)(header)) return header;
  var headerStr = '';
  Object.keys(header).forEach(function (key) {
    headerStr += key + ':' + header[key] + ';';
  });
  return headerStr;
}

function trackXhr(lifeCycle, configuration) {
  var xhrProxy = (0, _xhrProxy.startXhrProxy)();
  xhrProxy.beforeSend(function (context) {
    if ((0, _resourceUtils.isAllowedRequestUrl)(configuration, context.url)) {
      context.requestIndex = getNextRequestIndex();
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.REQUEST_STARTED, {
        requestIndex: context.requestIndex
      });
    }
  });
  xhrProxy.onRequestComplete(function (context) {
    if ((0, _resourceUtils.isAllowedRequestUrl)(configuration, context.url)) {
      var header = parseHeader(context.header || {});
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.REQUEST_COMPLETED, {
        duration: context.duration,
        method: context.method,
        requestIndex: context.requestIndex,
        performance: context.profile,
        response: context.response,
        responseConnection: header['connection'],
        responseServer: header['server'],
        responseHeader: getHeaderString(header),
        responseContentType: header['content-type'],
        responseContentEncoding: header['content-encoding'],
        startTime: context.startTime,
        status: context.status,
        type: context.type,
        url: context.url
      });
    }
  });
  return xhrProxy;
}

function trackDownload(lifeCycle, configuration) {
  var dwonloadProxy = (0, _downloadProxy.startDownloadProxy)();
  dwonloadProxy.beforeSend(function (context) {
    if ((0, _resourceUtils.isAllowedRequestUrl)(configuration, context.url)) {
      context.requestIndex = getNextRequestIndex();
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.REQUEST_STARTED, {
        requestIndex: context.requestIndex
      });
    }
  });
  dwonloadProxy.onRequestComplete(function (context) {
    if ((0, _resourceUtils.isAllowedRequestUrl)(configuration, context.url)) {
      var header = parseHeader(context.header || {});
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.REQUEST_COMPLETED, {
        duration: context.duration,
        requestIndex: context.requestIndex,
        performance: context.profile,
        response: context.response,
        responseConnection: header['connection'],
        responseServer: header['server'],
        responseHeader: getHeaderString(header),
        responseContentType: header['content-type'],
        responseContentEncoding: header['content-encoding'],
        startTime: context.startTime,
        status: context.status,
        type: context.type,
        url: context.url
      });
    }
  });
  return dwonloadProxy;
}

function getNextRequestIndex() {
  var result = nextRequestIndex;
  nextRequestIndex += 1;
  return result;
}