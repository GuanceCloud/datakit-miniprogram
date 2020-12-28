"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatUnknownError = formatUnknownError;
exports.toStackTraceString = toStackTraceString;
exports.ErrorSource = void 0;
var ErrorSource = {
  AGENT: 'agent',
  CONSOLE: 'console',
  NETWORK: 'network',
  SOURCE: 'source',
  LOGGER: 'logger'
};
exports.ErrorSource = ErrorSource;

function formatUnknownError(stackTrace, errorObject, nonErrorPrefix) {
  if (!stackTrace || stackTrace.message === undefined && !(errorObject instanceof Error)) {
    return {
      message: nonErrorPrefix + '' + JSON.stringify(errorObject),
      stack: 'No stack, consider using an instance of Error',
      type: stackTrace && stackTrace.name
    };
  }

  return {
    message: stackTrace.message || 'Empty message',
    stack: toStackTraceString(stackTrace),
    type: stackTrace.name
  };
}

function toStackTraceString(stack) {
  var result = stack.name || 'Error' + ': ' + stack.message;
  stack.stack.forEach(function (frame) {
    var func = frame.func === '?' ? '<anonymous>' : frame.func;
    var args = frame.args && frame.args.length > 0 ? '(' + frame.args.join(', ') + ')' : '';
    var line = frame.line ? ':' + frame.line : '';
    var column = frame.line && frame.column ? ':' + frame.column : '';
    result += '\n  at ' + func + args + ' @ ' + frame.url + line + column;
  });
  return result;
}