"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewritePage = rewritePage;
exports.THROTTLE_VIEW_UPDATE_PERIOD = void 0;

var _utils = require("../../helper/utils");

var _trackEventCounts2 = require("../trackEventCounts");

var _lifeCycle = require("../../core/lifeCycle");

// 劫持原小程序App方法
var THROTTLE_VIEW_UPDATE_PERIOD = 3000;
exports.THROTTLE_VIEW_UPDATE_PERIOD = THROTTLE_VIEW_UPDATE_PERIOD;

function rewritePage(configuration, lifeCycle) {
  var originPage = Page;

  Page = function Page(page) {
    // 合并方法，插入记录脚本
    var currentView,
        startTime = (0, _utils.now)();
    ['onUnload', 'onShow', 'onHide', 'onReady', 'onLoad'].forEach(function (methodName) {
      var userDefinedMethod = page[methodName]; // 暂存用户定义的方法

      page[methodName] = function (options) {
        if (methodName === 'onShow' || methodName === 'onLoad') {
          if (typeof currentView === 'undefined') {
            var activePage = getActivePage();
            currentView = newView(lifeCycle, activePage && activePage.route, startTime);
          }
        }

        currentView && currentView.setLoadEventEnd(methodName);

        if ((methodName === 'onUnload' || methodName === 'onHide' || methodName === 'onShow') && currentView) {
          currentView.triggerUpdate();

          if (methodName === 'onUnload') {
            currentView.end();
          }
        }

        return userDefinedMethod && userDefinedMethod.call(this, options);
      };
    });
    return originPage(page);
  };
}

function newView(lifeCycle, route, startTime) {
  if (typeof startTime === 'undefined') {
    startTime = (0, _utils.now)();
  }

  var id = (0, _utils.UUID)();
  var eventCounts = {
    errorCount: 0,
    resourceCount: 0
  };
  var documentVersion = 0;
  var loadingTime;
  var showTime;
  var onload2onshowTime;
  var onshow2onready;
  var stayTime;
  var fpt, fmp;
  lifeCycle.notify(_lifeCycle.LifeCycleEventType.VIEW_CREATED, {
    id: id,
    startTime: startTime,
    route: route
  });
  var scheduleViewUpdate = (0, _utils.throttle)(triggerViewUpdate, THROTTLE_VIEW_UPDATE_PERIOD, {
    leading: false
  });
  var cancelScheduleViewUpdate = scheduleViewUpdate.cancel;

  var _trackEventCounts = (0, _trackEventCounts2.trackEventCounts)(lifeCycle, function (newEventCounts) {
    eventCounts = newEventCounts;
    scheduleViewUpdate();
  });

  var stopEventCountsTracking = _trackEventCounts.stop;

  var _trackFptTime = trackFptTime(lifeCycle, function (duration) {
    fpt = duration;
    scheduleViewUpdate();
  });

  var stopFptTracking = _trackFptTime.stop;

  var setLoadEventEnd = function setLoadEventEnd(type) {
    console.log(type, 'type');

    if (type === 'onLoad') {
      loadingTime = (0, _utils.now)();
    } else if (type === 'onShow') {
      showTime = (0, _utils.now)();

      if (typeof onload2onshowTime === 'undefined' && typeof loadingTime !== 'undefined') {
        onload2onshowTime = showTime - loadingTime;
      }
    } else if (type === 'onReady') {
      if (typeof onshow2onready === 'undefined' && typeof showTime !== 'undefined') {
        onshow2onready = (0, _utils.now)() - showTime;
      }

      if (typeof fmp === 'undefined') {
        fmp = (0, _utils.now)() - startTime; // 从开发者角度看，小程序首屏渲染完成的标志是首页 Page.onReady 事件触发。
      }
    } else if (type === 'onHide' || type === 'onUnload') {
      if (typeof showTime !== 'undefined') {
        stayTime = (0, _utils.now)() - showTime;
      }
    }

    scheduleViewUpdate();
  };

  function triggerViewUpdate() {
    documentVersion += 1;
    lifeCycle.notify(_lifeCycle.LifeCycleEventType.VIEW_UPDATED, {
      documentVersion: documentVersion,
      eventCounts: eventCounts,
      id: id,
      loadingTime: loadingTime,
      stayTime: stayTime,
      onload2onshowTime: onload2onshowTime,
      onshow2onready: onshow2onready,
      fmp: fmp,
      fpt: fpt,
      startTime: startTime,
      route: route,
      duration: (0, _utils.now)() - startTime
    });
  }

  return {
    scheduleUpdate: scheduleViewUpdate,
    setLoadEventEnd: setLoadEventEnd,
    triggerUpdate: function triggerUpdate() {
      // cancel any pending view updates execution
      cancelScheduleViewUpdate();
      triggerViewUpdate();
    },
    end: function end() {
      stopEventCountsTracking();
      stopFptTracking();
      cancelScheduleViewUpdate();
    }
  };
}

function trackFptTime(lifeCycle, callback) {
  var subscribe = lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED, function (entitys) {
    var firstRenderEntity = entitys.find(function (entity) {
      return entity.entryType === 'render' && entity.name === 'firstRender';
    });

    if (typeof firstRenderEntity !== 'undefined') {
      callback(firstRenderEntity.duration);
    }
  });
  return {
    stop: subscribe.unsubscribe
  };
}

function getActivePage() {
  var curPages = getCurrentPages();

  if (curPages.length) {
    return curPages[curPages.length - 1];
  }

  return {};
}