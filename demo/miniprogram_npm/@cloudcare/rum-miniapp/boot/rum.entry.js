"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.datafluxRum = exports.makeRum = void 0;

var _utils = require("../helper/utils");

var _rum = require("./rum");

var makeRum = function makeRum(startRumImpl) {
  var isAlreadyInitialized = false;
  var rumGlobal = {
    init: function init(userConfiguration) {
      if (typeof userConfiguration === 'undefined') {
        userConfiguration = {};
      }

      if (!canInitRum(userConfiguration)) {
        return;
      }

      startRumImpl(userConfiguration);
      isAlreadyInitialized = true;
    }
  };
  return rumGlobal;

  function canInitRum(userConfiguration) {
    if (isAlreadyInitialized) {
      console.error('DATAFLUX_RUM is already initialized.');
      return false;
    }

    if (!userConfiguration.applicationId) {
      console.error('Application ID is not configured, no RUM data will be collected.');
      return false;
    }

    if (!userConfiguration.datakitOrigin) {
      console.error('datakitOrigin is not configured, no RUM data will be collected.');
      return false;
    }

    if (userConfiguration.sampleRate !== undefined && !(0, _utils.isPercentage)(userConfiguration.sampleRate)) {
      console.error('Sample Rate should be a number between 0 and 100');
      return false;
    }

    return true;
  }
};

exports.makeRum = makeRum;
var datafluxRum = makeRum(_rum.startRum);
exports.datafluxRum = datafluxRum;