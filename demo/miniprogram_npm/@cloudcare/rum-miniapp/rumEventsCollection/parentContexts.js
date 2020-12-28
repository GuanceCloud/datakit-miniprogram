"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startParentContexts = startParentContexts;
exports.CLEAR_OLD_CONTEXTS_INTERVAL = exports.VIEW_CONTEXT_TIME_OUT_DELAY = void 0;

var _enums = require("../helper/enums");

var _utils = require("../helper/utils");

var _lifeCycle = require("../core/lifeCycle");

var VIEW_CONTEXT_TIME_OUT_DELAY = 4 * _enums.ONE_HOUR;
exports.VIEW_CONTEXT_TIME_OUT_DELAY = VIEW_CONTEXT_TIME_OUT_DELAY;
var CLEAR_OLD_CONTEXTS_INTERVAL = _enums.ONE_MINUTE;
exports.CLEAR_OLD_CONTEXTS_INTERVAL = CLEAR_OLD_CONTEXTS_INTERVAL;

function startParentContexts(lifeCycle) {
  var currentView;
  var previousViews = [];
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_CREATED, function (currentContext) {
    if (currentView) {
      previousViews.unshift({
        context: buildCurrentViewContext(),
        endTime: currentContext.startTime,
        startTime: currentView.startTime
      });
    }

    currentView = currentContext;
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_UPDATED, function (currentContext) {
    // A view can be updated after its end.  We have to ensure that the view being updated is the
    // most recently created.
    if (currentView.id === currentContext.id) {
      currentView = currentContext;
    }
  });
  var clearOldContextsInterval = setInterval(function () {
    clearOldContexts(previousViews, VIEW_CONTEXT_TIME_OUT_DELAY);
  }, CLEAR_OLD_CONTEXTS_INTERVAL);

  function clearOldContexts(previousContexts, timeOutDelay) {
    var oldTimeThreshold = (0, _utils.now)() - timeOutDelay;

    while (previousContexts.length > 0 && previousContexts[previousContexts.length - 1].startTime < oldTimeThreshold) {
      previousContexts.pop();
    }
  }

  function buildCurrentViewContext() {
    return {
      page: {
        id: currentView.id,
        referrer: previousViews.length && previousViews[previousViews.length - 1].context.page.route,
        route: currentView.route
      }
    };
  }

  function findContext(buildContext, previousContexts, currentContext, startTime) {
    if (startTime === undefined) {
      return currentContext ? buildContext() : undefined;
    }

    if (currentContext && startTime >= currentContext.startTime) {
      return buildContext();
    }

    var flag = undefined;
    previousContexts.forEach(function (previousContext) {
      if (startTime > previousContext.endTime) {
        return false;
      }

      if (startTime >= previousContext.startTime) {
        flag = previousContext.context;
        return false;
      }
    });
    return flag;
  }

  var parentContexts = {
    findView: function findView(startTime) {
      return findContext(buildCurrentViewContext, previousViews, currentView, startTime);
    },
    findViewV2: function findViewV2(startTime) {
      var viewContext = parentContexts.findView(startTime);

      if (!viewContext) {
        return;
      }

      return {
        page: viewContext.page
      };
    },
    stop: function stop() {
      clearInterval(clearOldContextsInterval);
    }
  };
  return parentContexts;
}