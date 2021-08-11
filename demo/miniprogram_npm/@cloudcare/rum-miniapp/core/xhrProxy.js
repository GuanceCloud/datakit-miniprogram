"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startXhrProxy = startXhrProxy;
exports.resetXhrProxy = resetXhrProxy;

var _sdk = require("./sdk");

var _utils = require("../helper/utils");

var _enums = require("../helper/enums");

var xhrProxySingleton;
var beforeSendCallbacks = [];
var onRequestCompleteCallbacks = [];
var originalXhrRequest;

function startXhrProxy() {
  if (!xhrProxySingleton) {
    proxyXhr();
    xhrProxySingleton = {
      beforeSend: function beforeSend(callback) {
        beforeSendCallbacks.push(callback);
      },
      onRequestComplete: function onRequestComplete(callback) {
        onRequestCompleteCallbacks.push(callback);
      }
    };
  }

  return xhrProxySingleton;
}

function resetXhrProxy() {
  if (xhrProxySingleton) {
    xhrProxySingleton = undefined;
    beforeSendCallbacks.splice(0, beforeSendCallbacks.length);
    onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length);
    _sdk.sdk.request = originalXhrRequest;
  }
}

function proxyXhr() {
  originalXhrRequest = _sdk.sdk.request;

  _sdk.sdk.request = function () {
    var _this = this;

    var dataflux_xhr = {
      method: arguments[0].method || 'GET',
      startTime: 0,
      url: arguments[0].url,
      type: _enums.RequestType.XHR,
      responseType: arguments[0].responseType || 'text'
    };
    dataflux_xhr.startTime = (0, _utils.now)();
    var originalSuccess = arguments[0].success;

    arguments[0].success = function () {
      reportXhr(arguments[0]);

      if (originalSuccess) {
        originalSuccess.apply(_this, arguments);
      }
    };

    var originalFail = arguments[0].fail;

    arguments[0].fail = function () {
      reportXhr(arguments[0]);

      if (originalFail) {
        originalFail.apply(_this, arguments);
      }
    };

    var hasBeenReported = false;

    var reportXhr = function reportXhr(res) {
      if (hasBeenReported) {
        return;
      }

      hasBeenReported = true;
      dataflux_xhr.duration = (0, _utils.now)() - dataflux_xhr.startTime;
      dataflux_xhr.response = JSON.stringify(res.data);
      dataflux_xhr.header = res.header || {};
      dataflux_xhr.profile = res.profile;
      dataflux_xhr.status = res.statusCode || res.status || 0;
      onRequestCompleteCallbacks.forEach(function (callback) {
        callback(dataflux_xhr);
      });
    };

    beforeSendCallbacks.forEach(function (callback) {
      callback(dataflux_xhr);
    });
    return originalXhrRequest.apply(this, arguments);
  };
}