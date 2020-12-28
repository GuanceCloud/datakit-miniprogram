"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startViewCollection = startViewCollection;

var _index = require("./index");

var _enums = require("../../helper/enums");

var _utils = require("../../helper/utils");

var _lifeCycle = require("../../core/lifeCycle");

function startViewCollection(lifeCycle, configuration) {
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_UPDATED, function (view) {
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, processViewUpdate(view));
  });
  return (0, _index.rewritePage)(configuration, lifeCycle);
}

function processViewUpdate(view) {
  var apdexLevel;

  if (view.fmp) {
    apdexLevel = parseInt(Number(view.fmp) / 1000);
    apdexLevel = apdexLevel > 9 ? 9 : apdexLevel;
  }

  var viewEvent = {
    _dd: {
      documentVersion: view.documentVersion
    },
    date: view.startTime,
    type: _enums.RumEventType.VIEW,
    page: {
      // action: {
      //   count: view.eventCounts.userActionCount
      // },
      error: {
        count: view.eventCounts.errorCount
      },
      // firstInputDelay: msToNs(view.timings.firstInputDelay),
      loadingTime: (0, _utils.msToNs)(view.loadingTime),
      stayTime: (0, _utils.msToNs)(view.stayTime),
      onload2onshow: (0, _utils.msToNs)(view.onload2onshowTime),
      onshow2onready: (0, _utils.msToNs)(view.onshow2onready),
      fpt: (0, _utils.msToNs)(view.fpt),
      fmp: (0, _utils.msToNs)(view.fmp),
      apdexLevel: apdexLevel,
      // longTask: {
      //   count: view.eventCounts.longTaskCount
      // },
      // resource: {
      //   count: view.eventCounts.resourceCount
      // },
      timeSpent: (0, _utils.msToNs)(view.duration)
    }
  };
  return {
    rawRumEvent: viewEvent,
    startTime: view.startTime
  };
}