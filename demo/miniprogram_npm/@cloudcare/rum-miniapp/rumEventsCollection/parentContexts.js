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
  var currentAction;
  var previousViews = [];
  var previousActions = [];
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_CREATED, function (currentContext) {
    currentView = currentContext;
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_UPDATED, function (currentContext) {
    // A view can be updated after its end.  We have to ensure that the view being updated is the
    // most recently created.
    if (currentView && currentView.id === currentContext.id) {
      currentView = currentContext;
    }
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.VIEW_ENDED, function (data) {
    if (currentView) {
      previousViews.unshift({
        endTime: data.endClocks,
        context: buildCurrentViewContext(),
        startTime: currentView.startTime
      });
      currentView = undefined;
    }
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.AUTO_ACTION_CREATED, function (currentContext) {
    currentAction = currentContext;
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.AUTO_ACTION_COMPLETED, function (action) {
    if (currentAction) {
      previousActions.unshift({
        context: buildCurrentActionContext(),
        endTime: currentAction.startClocks + action.duration,
        startTime: currentAction.startClocks
      });
    }

    currentAction = undefined;
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.AUTO_ACTION_DISCARDED, function () {
    currentAction = undefined;
  });
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.SESSION_RENEWED, function () {
    previousViews = [];
    previousActions = [];
    currentView = undefined;
    currentAction = undefined;
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

  function buildCurrentActionContext() {
    return {
      userAction: {
        id: currentAction.id
      }
    };
  }

  function buildCurrentViewContext() {
    return {
      page: {
        id: currentView.id,
        referer: previousViews.length && previousViews[previousViews.length - 1].context.page.route || undefined,
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
    (0, _utils.each)(previousContexts, function (previousContext) {
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
    findAction: function findAction(startTime) {
      return findContext(buildCurrentActionContext, previousActions, currentAction, startTime);
    },
    stop: function stop() {
      clearInterval(clearOldContextsInterval);
    }
  };
  return parentContexts;
}