"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commonInit = commonInit;
exports.isIntakeRequest = isIntakeRequest;
exports.DEFAULT_CONFIGURATION = void 0;

var _utils = require("../helper/utils");

var _enums = require("../helper/enums");

var TRIM_REGIX = /^\s+|\s+$/g;
var DEFAULT_CONFIGURATION = {
  sampleRate: 100,
  flushTimeout: 30 * _enums.ONE_SECOND,
  maxErrorsByMinute: 3000,

  /**
   * Logs intake limit
   */
  maxBatchSize: 50,
  maxMessageSize: 256 * _enums.ONE_KILO_BYTE,

  /**
   * beacon payload max queue size implementation is 64kb
   * ensure that we leave room for logs, rum and potential other users
   */
  batchBytesLimit: 16 * _enums.ONE_KILO_BYTE,
  datakitUrl: '',

  /**
   * arbitrary value, byte precision not needed
   */
  requestErrorResponseLengthLimit: 32 * _enums.ONE_KILO_BYTE,
  trackInteractions: false
};
exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;

function trim(str) {
  return str.replace(TRIM_REGIX, '');
}

function getDatakitUrlUrl(url) {
  if (url && url.lastIndexOf('/') === url.length - 1) return trim(url) + 'v1/write/rum';
  return trim(url) + '/v1/write/rum';
}

function commonInit(userConfiguration, buildEnv) {
  var transportConfiguration = {
    applicationId: userConfiguration.applicationId,
    env: userConfiguration.env || '',
    version: userConfiguration.version || '',
    sdkVersion: buildEnv.sdkVersion,
    sdkName: buildEnv.sdkName,
    datakitUrl: getDatakitUrlUrl(userConfiguration.datakitUrl || userConfiguration.datakitOrigin),
    tags: userConfiguration.tags || []
  };

  if ('trackInteractions' in userConfiguration) {
    transportConfiguration.trackInteractions = !!userConfiguration.trackInteractions;
  }

  return (0, _utils.extend2Lev)(DEFAULT_CONFIGURATION, transportConfiguration);
}

var haveSameOrigin = function haveSameOrigin(url1, url2) {
  var parseUrl1 = (0, _utils.urlParse)(url1).getParse();
  var parseUrl2 = (0, _utils.urlParse)(url2).getParse();
  return parseUrl1.Origin === parseUrl2.Origin;
};

function isIntakeRequest(url, configuration) {
  return haveSameOrigin(url, configuration.datakitUrl);
}