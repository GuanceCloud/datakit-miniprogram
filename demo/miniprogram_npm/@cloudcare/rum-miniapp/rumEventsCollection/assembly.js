"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRumAssembly = startRumAssembly;

var _utils = require("../helper/utils");

var _lifeCycle = require("../core/lifeCycle");

var _baseInfo = _interopRequireDefault(require("../core/baseInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isTracked(configuration) {
  return (0, _utils.performDraw)(configuration.sampleRate);
}

function startRumAssembly(applicationId, configuration, lifeCycle, parentContexts) {
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, function (data) {
    var startTime = data.startTime;
    var rawRumEvent = data.rawRumEvent;
    var viewContext = parentContexts.findViewV2(startTime);
    var deviceContext = {
      device: _baseInfo["default"].deviceInfo
    };

    if (isTracked(configuration) && (viewContext || rawRumEvent.type === 'app')) {
      var rumContext = {
        _dd: {
          sdkName: configuration.sdkName,
          sdkVersion: configuration.sdkVersion,
          env: configuration.env,
          version: configuration.version
        },
        tags: configuration.tags,
        application: {
          id: applicationId
        },
        device: {},
        date: new Date().getTime(),
        user: {
          originId: _baseInfo["default"].getSessionId(),
          user_id: configuration.user_id || _baseInfo["default"].getClientID(),
          is_signin: configuration.user_id ? 'T' : 'F'
        }
      };
      var rumEvent = (0, _utils.extend2Lev)(rumContext, deviceContext, viewContext, rawRumEvent);
      var serverRumEvent = (0, _utils.withSnakeCaseKeys)(rumEvent);
      lifeCycle.notify(_lifeCycle.LifeCycleEventType.RUM_EVENT_COLLECTED, {
        rumEvent: rumEvent,
        serverRumEvent: serverRumEvent
      });
    }
  });
}