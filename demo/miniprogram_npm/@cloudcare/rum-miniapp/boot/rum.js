"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRum = void 0;

var _buildEnv = require("./buildEnv");

var _lifeCycle = require("../core/lifeCycle");

var _configuration = require("../core/configuration");

var _errorCollection = require("../rumEventsCollection/error/errorCollection");

var _assembly = require("../rumEventsCollection/assembly");

var _parentContexts = require("../rumEventsCollection/parentContexts");

var _batch = require("../rumEventsCollection/transport/batch");

var _viewCollection = require("../rumEventsCollection/page/viewCollection");

var _requestCollection = require("../rumEventsCollection/requestCollection");

var _resourceCollection = require("../rumEventsCollection/resource/resourceCollection");

var _appCollection = require("../rumEventsCollection/app/appCollection");

var _performanceCollection = require("../rumEventsCollection/performanceCollection");

var _sdk = require("../core/sdk");

var startRum = function startRum(userConfiguration) {
  var configuration = (0, _configuration.commonInit)(userConfiguration, _buildEnv.buildEnv);
  var lifeCycle = new _lifeCycle.LifeCycle();
  var parentContexts = (0, _parentContexts.startParentContexts)(lifeCycle);
  var batch = (0, _batch.startRumBatch)(configuration, lifeCycle);
  (0, _assembly.startRumAssembly)(userConfiguration.applicationId, configuration, lifeCycle, parentContexts);
  (0, _appCollection.startAppCollection)(lifeCycle, configuration);
  (0, _resourceCollection.startResourceCollection)(lifeCycle, configuration);
  (0, _viewCollection.startViewCollection)(lifeCycle, configuration);
  (0, _errorCollection.startErrorCollection)(lifeCycle, configuration);
  (0, _requestCollection.startRequestCollection)(lifeCycle, configuration);
  (0, _performanceCollection.startPagePerformanceObservable)(lifeCycle, configuration);
};

exports.startRum = startRum;