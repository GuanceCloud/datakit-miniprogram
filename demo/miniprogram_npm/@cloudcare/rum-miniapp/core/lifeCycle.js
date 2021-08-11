"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LifeCycleEventType = exports.LifeCycle = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LifeCycle = /*#__PURE__*/function () {
  function LifeCycle() {
    _classCallCheck(this, LifeCycle);

    this.callbacks = {};
  }

  _createClass(LifeCycle, [{
    key: "notify",
    value: function notify(eventType, data) {
      var eventCallbacks = this.callbacks[eventType];

      if (eventCallbacks) {
        eventCallbacks.forEach(function (callback) {
          return callback(data);
        });
      }
    }
  }, {
    key: "subscribe",
    value: function subscribe(eventType, callback) {
      var _this = this;

      if (!this.callbacks[eventType]) {
        this.callbacks[eventType] = [];
      }

      this.callbacks[eventType].push(callback);
      return {
        unsubscribe: function unsubscribe() {
          _this.callbacks[eventType] = _this.callbacks[eventType].filter(function (other) {
            return callback !== other;
          });
        }
      };
    }
  }]);

  return LifeCycle;
}();

exports.LifeCycle = LifeCycle;
var LifeCycleEventType = {
  PERFORMANCE_ENTRY_COLLECTED: 'PERFORMANCE_ENTRY_COLLECTED',
  AUTO_ACTION_CREATED: 'AUTO_ACTION_CREATED',
  AUTO_ACTION_COMPLETED: 'AUTO_ACTION_COMPLETED',
  AUTO_ACTION_DISCARDED: 'AUTO_ACTION_DISCARDED',
  APP_HIDE: 'APP_HIDE',
  APP_UPDATE: 'APP_UPDATE',
  PAGE_SET_DATA_UPDATE: 'PAGE_SET_DATA_UPDATE',
  PAGE_ALIAS_ACTION: 'PAGE_ALIAS_ACTION',
  VIEW_CREATED: 'VIEW_CREATED',
  VIEW_UPDATED: 'VIEW_UPDATED',
  VIEW_ENDED: 'VIEW_ENDED',
  REQUEST_STARTED: 'REQUEST_STARTED',
  REQUEST_COMPLETED: 'REQUEST_COMPLETED',
  RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
  RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED'
};
exports.LifeCycleEventType = LifeCycleEventType;