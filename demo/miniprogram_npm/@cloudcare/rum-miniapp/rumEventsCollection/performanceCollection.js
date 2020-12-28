"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startPagePerformanceObservable = startPagePerformanceObservable;

var _lifeCycle = require("../core/lifeCycle");

var _sdk = require("../core/sdk");

function startPagePerformanceObservable(lifeCycle, configuration) {
  if (!!_sdk.sdk.getPerformance) {
    var performance = _sdk.sdk.getPerformance();

    var observer = performance.createObserver(function (entryList) {
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED, entryList.getEntries());
    });
    observer.observe({
      entryTypes: ['render', 'script', 'navigation']
    });
  }
}