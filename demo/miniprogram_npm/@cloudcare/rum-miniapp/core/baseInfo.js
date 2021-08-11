"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sdk = require("../core/sdk");

var _utils = require("../helper/utils");

var _enums = require("../helper/enums");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseInfo = /*#__PURE__*/function () {
  function BaseInfo() {
    _classCallCheck(this, BaseInfo);

    this.sessionId = (0, _utils.UUID)();
    this.getDeviceInfo();
    this.getNetWork();
  }

  _createClass(BaseInfo, [{
    key: "getDeviceInfo",
    value: function getDeviceInfo() {
      try {
        var deviceInfo = _sdk.sdk.getSystemInfoSync();

        var osInfo = deviceInfo.system.split(' ');
        var osVersion = osInfo.length > 1 && osInfo[1];
        var osVersionMajor = osVersion.split('.').length && osVersion.split('.')[0];
        var deviceUUid = '';

        if (deviceInfo.host) {
          deviceUUid = deviceInfo.host.appId;
        }

        this.deviceInfo = {
          screenSize: "".concat(deviceInfo.screenWidth, "*").concat(deviceInfo.screenHeight, " "),
          platform: deviceInfo.platform,
          platformVersion: deviceInfo.version,
          osVersion: osVersion,
          osVersionMajor: osVersionMajor,
          os: osInfo.length > 1 && osInfo[0],
          brand: deviceInfo.brand,
          model: deviceInfo.model,
          frameworkVersion: deviceInfo.SDKVersion,
          pixelRatio: deviceInfo.pixelRatio,
          deviceUuid: deviceUUid
        };
      } catch (e) {}
    }
  }, {
    key: "getClientID",
    value: function getClientID() {
      var clienetId = _sdk.sdk.getStorageSync(_enums.CLIENT_ID_TOKEN);

      if (!clienetId) {
        clienetId = (0, _utils.UUID)();

        _sdk.sdk.setStorageSync(_enums.CLIENT_ID_TOKEN, clienetId);
      }

      return clienetId;
    }
  }, {
    key: "getNetWork",
    value: function getNetWork() {
      var _this = this;

      _sdk.sdk.getNetworkType({
        success: function success(e) {
          _this.deviceInfo.network = e.networkType ? e.networkType : 'unknown';
        }
      });

      _sdk.sdk.onNetworkStatusChange(function (e) {
        _this.deviceInfo.network = e.networkType ? e.networkType : 'unknown';
      });
    }
  }, {
    key: "getSessionId",
    value: function getSessionId() {
      return this.sessionId;
    }
  }]);

  return BaseInfo;
}();

var _default = new BaseInfo();

exports["default"] = _default;