"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRumAssembly = startRumAssembly;

var _utils = require("../helper/utils");

var _lifeCycle = require("../core/lifeCycle");

var _enums = require("../helper/enums");

var _baseInfo = _interopRequireDefault(require("../core/baseInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function isTracked(configuration) {
  return (0, _utils.performDraw)(configuration.sampleRate);
}

var SessionType = {
  SYNTHETICS: 'synthetics',
  USER: 'user'
};

function startRumAssembly(applicationId, configuration, lifeCycle, parentContexts) {
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED, function (data) {
    var startTime = data.startTime;
    var rawRumEvent = data.rawRumEvent;
    var viewContext = parentContexts.findView(startTime);
    var deviceContext = {
      device: _baseInfo["default"].deviceInfo
    };

    if (isTracked(configuration) && (viewContext || rawRumEvent.type === _enums.RumEventType.APP)) {
      var actionContext = parentContexts.findAction(startTime);
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
        session: {
          id: _baseInfo["default"].getSessionId(),
          type: SessionType.USER
        },
        user: {
          user_id: configuration.user_id || _baseInfo["default"].getClientID(),
          is_signin: configuration.user_id ? 'T' : 'F'
        }
      };
      var rumEvent = (0, _utils.extend2Lev)(rumContext, deviceContext, viewContext, actionContext, rawRumEvent);
      var serverRumEvent = (0, _utils.withSnakeCaseKeys)(rumEvent); // if (
      // 	serverRumEvent.type === 'view' ||
      // 	serverRumEvent.type === 'action'
      // ) {
      // 	console.log(serverRumEvent, 'serverRumEvent')
      // }

      lifeCycle.notify(_lifeCycle.LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent);
    }
  });
}