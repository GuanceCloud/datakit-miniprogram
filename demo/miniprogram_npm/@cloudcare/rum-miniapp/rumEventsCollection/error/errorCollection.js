"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startErrorCollection = startErrorCollection;
exports.doStartErrorCollection = doStartErrorCollection;

var _errorCollection = require("../../core/errorCollection");

var _enums = require("../../helper/enums");

var _lifeCycle = require("../../core/lifeCycle");

function startErrorCollection(lifeCycle, configuration) {
  return doStartErrorCollection(lifeCycle, configuration, (0, _errorCollection.startAutomaticErrorCollection)(configuration));
}

function doStartErrorCollection(lifeCycle, configuration, observable) {
  observable.subscribe(function (error) {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processError(error));
  });
}

function processError(error) {
  var rawRumEvent = {
    date: error.startTime,
    error: {
      message: error.message,
      resource: error.resource,
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