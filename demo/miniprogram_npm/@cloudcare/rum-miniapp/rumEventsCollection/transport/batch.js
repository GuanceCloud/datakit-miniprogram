"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startRumBatch = startRumBatch;

var _lifeCycle = require("../../core/lifeCycle");

var _transport = require("../../core/transport");

var _enums = require("../../helper/enums");

function startRumBatch(configuration, lifeCycle) {
  var batch = makeRumBatch(configuration, lifeCycle);
  lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.RUM_EVENT_COLLECTED, function (data) {
    var rumEvent = data.rumEvent;
    var serverRumEvent = data.serverRumEvent;

    if (rumEvent.type === _enums.RumEventType.VIEW) {
      batch.upsert(serverRumEvent, rumEvent.page.id);
    } else {
      batch.add(serverRumEvent);
    }
  });
  return {
    stop: function stop() {
      batch.stop();
    }
  };
}

function makeRumBatch(configuration, lifeCycle) {
  var primaryBatch = createRumBatch(configuration.datakitUrl, lifeCycle);

  function createRumBatch(endpointUrl, lifeCycle) {
    return new _transport.Batch(new _transport.HttpRequest(endpointUrl, configuration.batchBytesLimit), configuration.maxBatchSize, configuration.batchBytesLimit, configuration.maxMessageSize, configuration.flushTimeout, lifeCycle);
  }

  var stopped = false;
  return {
    add: function add(message) {
      if (stopped) {
        return;
      }

      primaryBatch.add(message);
    },
    stop: function stop() {
      stopped = true;
    },
    upsert: function upsert(message, key) {
      if (stopped) {
        return;
      }

      primaryBatch.upsert(message, key);
    }
  };
}