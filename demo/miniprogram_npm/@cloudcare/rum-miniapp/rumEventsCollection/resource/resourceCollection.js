"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startResourceCollection = startResourceCollection;

var _resourceUtils = require("./resourceUtils");

var _lifeCycle = require("../../core/lifeCycle");

var _utils = require("../../helper/utils");

var _enums = require("../../helper/enums");

function startResourceCollection(lifeCycle, configuration) {
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.REQUEST_COMPLETED, function (request) {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processRequest(request));
  });
}

function processRequest(request) {
  var type = request.type;
  var timing = request.performance;
  var correspondingTimingOverrides = timing ? computePerformanceEntryMetrics(timing) : undefined;
  var urlObj = (0, _utils.urlParse)(request.url).getParse();
  var startTime = request.startTime;
  var resourceEvent = (0, _utils.extend2Lev)({
    date: startTime,
    resource: {
      type: type,
      duration: (0, _utils.msToNs)(request.duration),
      method: request.method,
      status: request.status,
      statusGroup: (0, _utils.getStatusGroup)(request.status),
      url: request.url,
      urlHost: urlObj.Host,
      urlPath: urlObj.Path,
      urlPathGroup: (0, _utils.replaceNumberCharByPath)(urlObj.Path),
      urlQuery: (0, _utils.jsonStringify)((0, _utils.getQueryParamsFromUrl)(request.url))
    },
    type: _enums.RumEventType.RESOURCE
  }, correspondingTimingOverrides);
  return {
    startTime: startTime,
    rawRumEvent: resourceEvent
  };
}

function computePerformanceEntryMetrics(timing) {
  return {
    resource: (0, _utils.extend2Lev)({}, {
      load: (0, _resourceUtils.computePerformanceResourceDuration)(timing),
      size: (0, _resourceUtils.computeSize)(timing)
    }, (0, _resourceUtils.computePerformanceResourceDetails)(timing))
  };
}