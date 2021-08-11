"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewriteApp = rewriteApp;
exports.startupTypes = exports.THROTTLE_VIEW_UPDATE_PERIOD = void 0;

var _utils = require("../../helper/utils");

var _lifeCycle = require("../../core/lifeCycle");

// 劫持原小程序App方法
var THROTTLE_VIEW_UPDATE_PERIOD = 3000;
exports.THROTTLE_VIEW_UPDATE_PERIOD = THROTTLE_VIEW_UPDATE_PERIOD;
var startupTypes = {
  COLD: 'cold',
  HOT: 'hot'
};
exports.startupTypes = startupTypes;

function rewriteApp(configuration, lifeCycle) {
  var originApp = App;
  var appInfo = {
    isStartUp: false // 是否启动

  };
  var startTime;

  App = function App(app) {
    startTime = (0, _utils.now)() // 合并方法，插入记录脚本
    ;
    ['onLaunch', 'onShow', 'onHide'].forEach(function (methodName) {
      var userDefinedMethod = app[methodName]; // 暂存用户定义的方法

      app[methodName] = function (options) {
        console.log(methodName, 'methodName app');

        if (methodName === 'onLaunch') {
          appInfo.isStartUp = true;
          appInfo.isHide = false;
          appInfo.startupType = startupTypes.COLD;
        } else if (methodName === 'onShow') {
          if (appInfo.isStartUp && appInfo.isHide) {
            // 判断是热启动
            appInfo.startupType = startupTypes.HOT; // appUpdate()
          }
        } else if (methodName === 'onHide') {
          lifeCycle.notify(_lifeCycle.LifeCycleEventType.APP_HIDE);
          appInfo.isHide = true;
        }

        return userDefinedMethod && userDefinedMethod.call(this, options);
      };
    });
    return originApp(app);
  };

  startPerformanceObservable(lifeCycle);
}

function startPerformanceObservable(lifeCycle) {
  var subscribe = lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED, function (entitys) {
    // 过滤掉其他页面监听，只保留首次启动
    var codeDownloadDuration;
    var launchEntity = entitys.find(function (entity) {
      return entity.entryType === 'navigation' && entity.navigationType === 'appLaunch';
    });

    if (typeof launchEntity !== 'undefined') {
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.APP_UPDATE, {
        startTime: launchEntity.startTime,
        name: '启动',
        type: 'launch',
        id: (0, _utils.UUID)(),
        duration: launchEntity.duration
      });
    }

    var scriptentity = entitys.find(function (entity) {
      return entity.entryType === 'script' && entity.name === 'evaluateScript';
    });

    if (typeof scriptentity !== 'undefined') {
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.APP_UPDATE, {
        startTime: scriptentity.startTime,
        name: '脚本注入',
        type: 'script_insert',
        id: (0, _utils.UUID)(),
        duration: scriptentity.duration
      });
    }

    var firstEntity = entitys.find(function (entity) {
      return entity.entryType === 'render' && entity.name === 'firstRender';
    });

    if (firstEntity && scriptentity && launchEntity) {
      if (!(0, _utils.areInOrder)(firstEntity.duration, launchEntity.duration) || !(0, _utils.areInOrder)(scriptentity.duration, launchEntity.duration)) {
        return;
      }

      codeDownloadDuration = launchEntity.duration - firstEntity.duration - scriptentity.duration; // 资源下载耗时

      lifeCycle.notify(_lifeCycle.LifeCycleEventType.APP_UPDATE, {
        startTime: launchEntity.startTime,
        name: '小程序包下载',
        type: 'package_download',
        id: (0, _utils.UUID)(),
        duration: codeDownloadDuration
      }); // 资源下载时间暂时定为：首次启动时间-脚本加载时间-初次渲染时间
    }
  });
  return {
    stop: subscribe.unsubscribe
  };
}