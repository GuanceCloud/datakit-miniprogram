"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startErrorCollection = startErrorCollection;
exports.doStartErrorCollection = doStartErrorCollection;

var _errorCollection = require("../../core/errorCollection");

var _enums = require("../../helper/enums");

var _lifeCycle = require("../../core/lifeCycle");

var _utils = require("../../helper/utils");

function startErrorCollection(lifeCycle, configuration) {
  return doStartErrorCollection(lifeCycle, configuration, (0, _errorCollection.startAutomaticErrorCollection)(configuration));
}

function doStartErrorCollection(lifeCycle, configuration, observable) {
  observable.subscribe(function (error) {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processError(error));
  });
}

function processError(error) {
  var resource = error.resource;

  if (resource) {
    var urlObj = (0, _utils.urlParse)(error.resource.url).getParse();
    resource = {
      method: error.resource.method,
      status: error.resource.statusCode,
      statusGroup: (0, _utils.getStatusGroup)(error.resource.statusCode),
      url: error.resource.url,
      urlHost: urlObj.Host,
      urlPath: urlObj.Path,
      urlPathGroup: (0, _utils.replaceNumberCharByPath)(urlObj.Path)
    };
  }

  var rawRumEvent = {
    date: error.startTime,
    error: {
      message: error.message,
      resource: resource,
      source: error.source,
      stack: error.stack,
      type: error.type,
      starttime: error.startTime
    },
    type: _enums.RumEventType.ERROR
  };
  return {
    rawRumEvent: rawRumEvent,
    startTime: error.startTime
  };
}