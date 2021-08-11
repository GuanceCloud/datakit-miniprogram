"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startAppCollection = startAppCollection;

var _index = require("./index");

var _lifeCycle = require("../../core/lifeCycle");

var _enums = require("../../helper/enums");

var _utils = require("../../helper/utils");

function startAppCollection(lifeCycle, configuration) {
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.APP_UPDATE, function (appinfo) {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processAppUpdate(appinfo));
  });
  return (0, _index.rewriteApp)(configuration, lifeCycle);
}

function processAppUpdate(appinfo) {
  var appEvent = {
    date: appinfo.startTime,
    type: _enums.RumEventType.APP,
    app: {
      type: appinfo.type,
      name: appinfo.name,
      id: appinfo.id,
      duration: (0, _utils.msToNs)(appinfo.duration)
    }
  };
  console.log(appEvent, 'appEvent====');
  return {
    rawRumEvent: appEvent,
    startTime: appinfo.startTime
  };
}