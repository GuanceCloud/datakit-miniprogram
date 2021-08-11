"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEventCounts = trackEventCounts;

var _utils = require("../helper/utils");

var _enums = require("../helper/enums");

var _lifeCycle = require("../core/lifeCycle");

function trackEventCounts(lifeCycle, callback) {
  if (typeof callback === 'undefined') {
    callback = _utils.noop;
  }

  var eventCounts = {
    errorCount: 0,
    resourceCount: 0,
    longTaskCount: 0,
    userActionCount: 0
  };
  var subscription = lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, function (data) {
    var rawRumEvent = data.rawRumEvent;

    switch (rawRumEvent.type) {
      case _enums.RumEventType.ERROR:
        eventCounts.errorCount += 1;
        callback(eventCounts);
        break;

      case _enums.RumEventType.RESOURCE:
        eventCounts.resourceCount += 1;
        callback(eventCounts);
        break;

      case _enums.RumEventType.ACTION:
        eventCounts.userActionCount += 1;
        callback(eventCounts);
        break;
    }
  });
  return {
    stop: function stop() {
      subscription.unsubscribe();
    },
    eventCounts: eventCounts
  };
}