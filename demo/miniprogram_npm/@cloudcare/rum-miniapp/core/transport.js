"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Batch = exports.HttpRequest = void 0;

var _utils = require("../helper/utils");

var _sdk = require("../core/sdk");

var _lifeCycle = require("../core/lifeCycle");

var _dataMap = require("./dataMap");

// https://en.wikipedia.org/wiki/UTF-8
var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/;

function addBatchPrecision(url) {
  if (!url) return url;
  return url + (url.indexOf('?') === -1 ? '?' : '&') + 'precision=ms';
}

var httpRequest = function httpRequest(endpointUrl, bytesLimit) {
  this.endpointUrl = endpointUrl;
  this.bytesLimit = bytesLimit;
};

httpRequest.prototype = {
  send: function send(data) {
    var url = addBatchPrecision(this.endpointUrl);

    _sdk.sdk.request({
      method: 'POST',
      header: {
        'content-type': 'text/plain;charset=UTF-8'
      },
      url: url,
      data: data
    });
  }
};
var HttpRequest = httpRequest;
exports.HttpRequest = HttpRequest;

function batch(request, maxSize, bytesLimit, maxMessageSize, flushTimeout, lifeCycle) {
  this.request = request;
  this.maxSize = maxSize;
  this.bytesLimit = bytesLimit;
  this.maxMessageSize = maxMessageSize;
  this.flushTimeout = flushTimeout;
  this.lifeCycle = lifeCycle;
  this.flushOnVisibilityHidden();
  this.flushPeriodically();
}

batch.prototype = {
  pushOnlyBuffer: [],
  upsertBuffer: {},
  bufferBytesSize: 0,
  bufferMessageCount: 0,
  add: function add(message) {
    this.addOrUpdate(message);
  },
  upsert: function upsert(message, key) {
    this.addOrUpdate(message, key);
  },
  flush: function flush() {
    if (this.bufferMessageCount !== 0) {
      var messages = this.pushOnlyBuffer.concat((0, _utils.values)(this.upsertBuffer));
      this.request.send(messages.join('\n'), this.bufferBytesSize);
      this.pushOnlyBuffer = [];
      this.upsertBuffer = {};
      this.bufferBytesSize = 0;
      this.bufferMessageCount = 0;
    }
  },
  processSendData: function processSendData(message) {
    // var data = safeJSONParse(message)
    if (!message || !message.type) return '';
    var rowStr = '';
    var hasFileds = false;
    (0, _utils.each)(_dataMap.dataMap, function (value, key) {
      if (value.type === message.type) {
        // 做一下别名处理
        if (value.alias_key) {
          rowStr += value.alias_key + ',';
        } else {
          rowStr += key + ',';
        }

        var tagsStr = [];
        var tags = (0, _utils.extend)({}, _dataMap.commonTags, value.tags);
        (0, _utils.each)(tags, function (value_path, _key) {
          var _value = (0, _utils.findByPath)(message, value_path);

          if (_value || (0, _utils.isNumber)(_value)) {
            tagsStr.push((0, _utils.escapeRowData)(_key) + '=' + (0, _utils.escapeRowData)(_value));
          }
        });

        if (message.tags.length) {
          // 自定义tag
          (0, _utils.each)(message.tags, function (_value, _key) {
            if (_value || (0, _utils.isNumber)(_value)) {
              tagsStr.push((0, _utils.escapeRowData)(_key) + '=' + (0, _utils.escapeRowData)(_value));
            }
          });
        }

        var fieldsStr = [];
        (0, _utils.each)(value.fields, function (_value, _key) {
          if (Array.isArray(_value) && _value.length === 2) {
            var type = _value[0],
                value_path = _value[1];

            var _valueData = (0, _utils.findByPath)(message, value_path);

            if (_valueData || (0, _utils.isNumber)(_valueData)) {
              _valueData = type === 'string' ? '"' + String(_valueData).replace(/[\\]*"/g, '"').replace(/"/g, '\\"') + '"' : (0, _utils.escapeRowData)(_valueData);
              fieldsStr.push((0, _utils.escapeRowData)(_key) + '=' + _valueData);
            }
          } else if ((0, _utils.isString)(_value)) {
            var _valueData = (0, _utils.findByPath)(message, _value);

            if (_valueData || (0, _utils.isNumber)(_valueData)) {
              _valueData = (0, _utils.escapeRowData)(_valueData);
              fieldsStr.push((0, _utils.escapeRowData)(_key) + '=' + _valueData);
            }
          }
        });

        if (tagsStr.length) {
          rowStr += tagsStr.join(',');
        }

        if (fieldsStr.length) {
          rowStr += ' ';
          rowStr += fieldsStr.join(',');
          hasFileds = true;
        }

        rowStr = rowStr + ' ' + message.date;
      }
    });
    return hasFileds ? rowStr : '';
  },
  sizeInBytes: function sizeInBytes(candidate) {
    // Accurate byte size computations can degrade performances when there is a lot of events to process
    if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
      return candidate.length;
    }

    var total = 0,
        charCode; // utf-8编码

    for (var i = 0, len = candidate.length; i < len; i++) {
      charCode = candidate.charCodeAt(i);

      if (charCode <= 0x007f) {
        total += 1;
      } else if (charCode <= 0x07ff) {
        total += 2;
      } else if (charCode <= 0xffff) {
        total += 3;
      } else {
        total += 4;
      }
    }

    return total;
  },
  addOrUpdate: function addOrUpdate(message, key) {
    var process = this.process(message);
    if (!process.processedMessage || process.processedMessage === '') return;

    if (process.messageBytesSize >= this.maxMessageSize) {
      console.warn('Discarded a message whose size was bigger than the maximum allowed size' + this.maxMessageSize + 'KB.');
      return;
    }

    if (this.hasMessageFor(key)) {
      this.remove(key);
    }

    if (this.willReachedBytesLimitWith(process.messageBytesSize)) {
      this.flush();
    }

    this.push(process.processedMessage, process.messageBytesSize, key);

    if (this.isFull()) {
      this.flush();
    }
  },
  process: function process(message) {
    var processedMessage = this.processSendData(message);
    var messageBytesSize = this.sizeInBytes(processedMessage);
    return {
      processedMessage: processedMessage,
      messageBytesSize: messageBytesSize
    };
  },
  push: function push(processedMessage, messageBytesSize, key) {
    if (this.bufferMessageCount > 0) {
      // \n separator at serialization
      this.bufferBytesSize += 1;
    }

    if (key !== undefined) {
      this.upsertBuffer[key] = processedMessage;
    } else {
      this.pushOnlyBuffer.push(processedMessage);
    }

    this.bufferBytesSize += messageBytesSize;
    this.bufferMessageCount += 1;
  },
  remove: function remove(key) {
    var removedMessage = this.upsertBuffer[key];
    delete this.upsertBuffer[key];
    var messageBytesSize = this.sizeInBytes(removedMessage);
    this.bufferBytesSize -= messageBytesSize;
    this.bufferMessageCount -= 1;

    if (this.bufferMessageCount > 0) {
      this.bufferBytesSize -= 1;
    }
  },
  hasMessageFor: function hasMessageFor(key) {
    return key !== undefined && this.upsertBuffer[key] !== undefined;
  },
  willReachedBytesLimitWith: function willReachedBytesLimitWith(messageBytesSize) {
    // byte of the separator at the end of the message
    return this.bufferBytesSize + messageBytesSize + 1 >= this.bytesLimit;
  },
  isFull: function isFull() {
    return this.bufferMessageCount === this.maxSize || this.bufferBytesSize >= this.bytesLimit;
  },
  flushPeriodically: function flushPeriodically() {
    var _this = this;

    setTimeout(function () {
      _this.flush();

      _this.flushPeriodically();
    }, _this.flushTimeout);
  },
  flushOnVisibilityHidden: function flushOnVisibilityHidden() {
    var _this = this;
    /**
     * With sendBeacon, requests are guaranteed to be successfully sent during document unload
     */
    // @ts-ignore this function is not always defined


    this.lifeCycle.subscribe(_lifeCycle.LifeCycleEventType.APP_HIDE, function () {
      _this.flush();
    });
  }
};
var Batch = batch;
exports.Batch = Batch;