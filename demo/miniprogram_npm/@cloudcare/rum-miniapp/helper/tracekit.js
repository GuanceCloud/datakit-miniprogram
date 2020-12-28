"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrap = wrap;
exports.computeStackTrace = exports.report = void 0;

var _sdk = require("../core/sdk");

var UNKNOWN_FUNCTION = '?';

function has(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function isUndefined(what) {
  return typeof what === 'undefined';
}

function wrap(func) {
  var _this = this;

  function wrapped() {
    try {
      return func.apply(_this, arguments);
    } catch (e) {
      report(e);
      throw e;
    }
  }

  return wrapped;
}
/**
 * Cross-browser processing of unhandled exceptions
 *
 * Syntax:
 * ```js
 *   report.subscribe(function(stackInfo) { ... })
 *   report.unsubscribe(function(stackInfo) { ... })
 *   report(exception)
 *   try { ...code... } catch(ex) { report(ex); }
 * ```
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *     on top frame; column number is not guaranteed
 *   - Opera: full stack trace with line and column numbers
 *   - Chrome: full stack trace with line and column numbers
 *   - Safari: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *   - IE: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where report was called.
 *
 * Handlers receive a StackTrace object as described in the
 * computeStackTrace docs.
 *
 * @memberof TraceKit
 * @namespace
 */


var report = function reportModuleWrapper() {
  var handlers = [];
  /**
   * Add a crash handler.
   * @param {Function} handler
   * @memberof report
   */

  function subscribe(handler) {
    installGlobalHandler();
    installGlobalUnhandledRejectionHandler();
    installGlobalOnPageNotFoundHandler();
    installGlobalOnMemoryWarningHandler();
    handlers.push(handler);
  }
  /**
   * Remove a crash handler.
   * @param {Function} handler
   * @memberof report
   */


  function unsubscribe(handler) {
    for (var i = handlers.length - 1; i >= 0; i -= 1) {
      if (handlers[i] === handler) {
        handlers.splice(i, 1);
      }
    }
  }
  /**
   * Dispatch stack information to all handlers.
   * @param {StackTrace} stack
   * @param {boolean} isWindowError Is this a top-level window error?
   * @param {Error=} error The error that's being handled (if available, null otherwise)
   * @memberof report
   * @throws An exception if an error occurs while calling an handler.
   */


  function notifyHandlers(stack, isWindowError, error) {
    var exception;

    for (var i in handlers) {
      if (has(handlers, i)) {
        try {
          handlers[i](stack, isWindowError, error);
        } catch (inner) {
          exception = inner;
        }
      }
    }

    if (exception) {
      throw exception;
    }
  }

  var onErrorHandlerInstalled;
  var onUnhandledRejectionHandlerInstalled;
  var onPageNotFoundHandlerInstalled;
  var onOnMemoryWarningHandlerInstalled;
  /**
   * Ensures all global unhandled exceptions are recorded.
   * Supported by Gecko and IE.
   * @param {Event|string} message Error message.
   * @param {string=} url URL of script that generated the exception.
   * @param {(number|string)=} lineNo The line number at which the error occurred.
   * @param {(number|string)=} columnNo The column number at which the error occurred.
   * @param {Error=} errorObj The actual Error object.
   * @memberof report
   */

  function traceKitWindowOnError(err) {
    var error = typeof err === 'string' ? new Error(err) : err;
    var stack;
    var name = '';
    var msg = '';
    stack = computeStackTrace(error);

    if (error && error.message && {}.toString.call(error.message) === '[object String]') {
      var messages = error.message.split('\n');

      if (messages.length >= 3) {
        msg = messages[2];
        var groups = msg.match(ERROR_TYPES_RE);

        if (groups) {
          name = groups[1];
          msg = groups[2];
        }
      }
    }

    if (msg) {
      stack.message = msg;
    }

    if (name) {
      stack.name = name;
    }

    notifyHandlers(stack, true, error);
  }
  /**
   * Ensures all unhandled rejections are recorded.
   * @param {PromiseRejectionEvent} e event.
   * @memberof report
   * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
   * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
   */


  function traceKitWindowOnUnhandledRejection(_ref) {
    var reason = _ref.reason,
        promise = _ref.promise;
    var error = typeof reason === 'string' ? new Error(reason) : reason;
    var stack;
    var name = '';
    var msg = '';
    stack = computeStackTrace(error);

    if (error && error.message && {}.toString.call(error.message) === '[object String]') {
      var messages = error.message.split('\n');

      if (messages.length >= 3) {
        msg = messages[2];
        var groups = msg.match(ERROR_TYPES_RE);

        if (groups) {
          name = groups[1];
          msg = groups[2];
        }
      }
    }

    if (msg) {
      stack.message = msg;
    }

    if (name) {
      stack.name = name;
    }

    notifyHandlers(stack, true, error);
  }
  /**
   * Install a global onerror handler
   * @memberof report
   */


  function installGlobalHandler() {
    if (onErrorHandlerInstalled || !_sdk.sdk.onError) {
      return;
    }

    _sdk.sdk.onError(traceKitWindowOnError);

    onErrorHandlerInstalled = true;
  }
  /**
   * Install a global onunhandledrejection handler
   * @memberof report
   */


  function installGlobalUnhandledRejectionHandler() {
    if (onUnhandledRejectionHandlerInstalled || !_sdk.sdk.onUnhandledRejection) {
      return;
    }

    _sdk.sdk.onUnhandledRejection && _sdk.sdk.onUnhandledRejection(traceKitWindowOnUnhandledRejection);
    onUnhandledRejectionHandlerInstalled = true;
  }

  function installGlobalOnPageNotFoundHandler() {
    if (onPageNotFoundHandlerInstalled || !_sdk.sdk.onPageNotFound) {
      return;
    }

    _sdk.sdk.onPageNotFound(function (res) {
      var url = res.path.split('?')[0];
      notifyHandlers({
        message: JSON.stringify(res),
        type: 'pagenotfound',
        name: url + '页面无法找到'
      }, true, {});
    });

    onPageNotFoundHandlerInstalled = true;
  }

  function installGlobalOnMemoryWarningHandler() {
    if (onOnMemoryWarningHandlerInstalled || !_sdk.sdk.onMemoryWarning) {
      return;
    }

    _sdk.sdk.onMemoryWarning(function (_ref2) {
      var _ref2$level = _ref2.level,
          level = _ref2$level === void 0 ? -1 : _ref2$level;
      var levelMessage = '没有获取到告警级别信息';

      switch (level) {
        case 5:
          levelMessage = 'TRIM_MEMORY_RUNNING_MODERATE';
          break;

        case 10:
          levelMessage = 'TRIM_MEMORY_RUNNING_LOW';
          break;

        case 15:
          levelMessage = 'TRIM_MEMORY_RUNNING_CRITICAL';
          break;

        default:
          return;
      }

      notifyHandlers({
        message: levelMessage,
        type: 'memorywarning',
        name: '内存不足告警'
      }, true, {});
    });

    onOnMemoryWarningHandlerInstalled = true;
  }
  /**
   * Reports an unhandled Error.
   * @param {Error} ex
   * @memberof report
   * @throws An exception if an incompvare stack trace is detected (old IE browsers).
   */


  function doReport(ex) {}

  doReport.subscribe = subscribe;
  doReport.unsubscribe = unsubscribe;
  doReport.traceKitWindowOnError = traceKitWindowOnError;
  return doReport;
}();
/**
 * computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   ```js
 *   s = computeStackTrace.ofCaller([depth])
 *   s = computeStackTrace(exception) // consider using report instead (see below)
 *   ```
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with report,
 * which builds on top of computeStackTrace and provides better
 * IE support by utilizing the sdk.onError event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 * Tracing example:
 *  ```js
 *     function trace(message) {
 *         var stackInfo = computeStackTrace.ofCaller();
 *         var data = message + "\n";
 *         for(var i in stackInfo.stack) {
 *             var item = stackInfo.stack[i];
 *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
 *         }
 *         if (window.console)
 *             console.info(data);
 *         else
 *             alert(data);
 *     }
 * ```
 * @memberof TraceKit
 * @namespace
 */


exports.report = report;

var computeStackTrace = function computeStackTraceWrapper() {
  var debug = false; // Contents of Exception in various browsers.
  //
  // SAFARI:
  // ex.message = Can't find variable: qq
  // ex.line = 59
  // ex.sourceId = 580238192
  // ex.sourceURL = http://...
  // ex.expressionBeginOffset = 96
  // ex.expressionCaretOffset = 98
  // ex.expressionEndOffset = 98
  // ex.name = ReferenceError
  //
  // FIREFOX:
  // ex.message = qq is not defined
  // ex.fileName = http://...
  // ex.lineNumber = 59
  // ex.columnNumber = 69
  // ex.stack = ...stack trace... (see the example below)
  // ex.name = ReferenceError
  //
  // CHROME:
  // ex.message = qq is not defined
  // ex.name = ReferenceError
  // ex.type = not_defined
  // ex.arguments = ['aa']
  // ex.stack = ...stack trace...
  //
  // INTERNET EXPLORER:
  // ex.message = ...
  // ex.name = ReferenceError
  //
  // OPERA:
  // ex.message = ...message... (see the example below)
  // ex.name = ReferenceError
  // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
  // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

  /**
   * Computes stack trace information from the stack property.
   * Chrome and Gecko use this property.
   * @param {Error} ex
   * @return {?StackTrace} Stack trace information.
   * @memberof computeStackTrace
   */

  function computeStackTraceFromStackProp(ex) {
    if (!ex.stack) {
      return;
    } // tslint:disable-next-line max-line-length


    var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i; // tslint:disable-next-line max-line-length

    var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i; // tslint:disable-next-line max-line-length

    var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i; // Used to additionally parse URL/line/column from eval frames

    var isEval;
    var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i;
    var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/;
    var lines = ex.stack.split('\n');
    var stack = [];
    var submatch;
    var parts;
    var element;

    for (var i = 0, j = lines.length; i < j; i += 1) {
      if (chrome.exec(lines[i])) {
        parts = chrome.exec(lines[i]);
        var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line

        isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line

        submatch = chromeEval.exec(parts[2]);

        if (isEval && submatch) {
          // throw out eval line/column and use top-most line/column number
          parts[2] = submatch[1]; // url

          parts[3] = submatch[2]; // line

          parts[4] = submatch[3]; // column
        }

        element = {
          args: isNative ? [parts[2]] : [],
          column: parts[4] ? +parts[4] : undefined,
          func: parts[1] || UNKNOWN_FUNCTION,
          line: parts[3] ? +parts[3] : undefined,
          url: !isNative ? parts[2] : undefined
        };
      } else if (winjs.exec(lines[i])) {
        parts = winjs.exec(lines[i]);
        element = {
          args: [],
          column: parts[4] ? +parts[4] : undefined,
          func: parts[1] || UNKNOWN_FUNCTION,
          line: +parts[3],
          url: parts[2]
        };
      } else if (gecko.exec(lines[i])) {
        parts = gecko.exec(lines[i]);
        isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
        submatch = geckoEval.exec(parts[3]);

        if (isEval && submatch) {
          // throw out eval line/column and use top-most line number
          parts[3] = submatch[1];
          parts[4] = submatch[2];
          parts[5] = undefined; // no column when eval
        } else if (i === 0 && !parts[5] && !isUndefined(ex.columnNumber)) {
          // FireFox uses this awesome columnNumber property for its top frame
          // Also note, Firefox's column number is 0-based and everything else expects 1-based,
          // so adding 1
          // NOTE: this hack doesn't work if top-most frame is eval
          stack[0].column = ex.columnNumber + 1;
        }

        element = {
          args: parts[2] ? parts[2].split(',') : [],
          column: parts[5] ? +parts[5] : undefined,
          func: parts[1] || UNKNOWN_FUNCTION,
          line: parts[4] ? +parts[4] : undefined,
          url: parts[3]
        };
      } else {
        continue;
      }

      if (!element.func && element.line) {
        element.func = UNKNOWN_FUNCTION;
      }

      stack.push(element);
    }

    if (!stack.length) {
      return;
    }

    return {
      stack: stack,
      message: extractMessage(ex),
      name: ex.name
    };
  }
  /**
   * Computes stack trace information from the stacktrace property.
   * Opera 10+ uses this property.
   * @param {Error} ex
   * @return {?StackTrace} Stack trace information.
   * @memberof computeStackTrace
   */


  function computeStackTraceFromStacktraceProp(ex) {
    // Access and store the stacktrace property before doing ANYTHING
    // else to it because Opera is not very good at providing it
    // reliably in other circumstances.
    var stacktrace = ex.stacktrace;

    if (!stacktrace) {
      return;
    }

    var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i; // tslint:disable-next-line max-line-length

    var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i;
    var lines = stacktrace.split('\n');
    var stack = [];
    var parts;

    for (var line = 0; line < lines.length; line += 2) {
      var element;

      if (opera10Regex.exec(lines[line])) {
        parts = opera10Regex.exec(lines[line]);
        element = {
          args: [],
          column: undefined,
          func: parts[3],
          line: +parts[1],
          url: parts[2]
        };
      } else if (opera11Regex.exec(lines[line])) {
        parts = opera11Regex.exec(lines[line]);
        element = {
          args: parts[5] ? parts[5].split(',') : [],
          column: +parts[2],
          func: parts[3] || parts[4],
          line: +parts[1],
          url: parts[6]
        };
      }

      if (element) {
        if (!element.func && element.line) {
          element.func = UNKNOWN_FUNCTION;
        }

        element.context = [lines[line + 1]];
        stack.push(element);
      }
    }

    if (!stack.length) {
      return;
    }

    return {
      stack: stack,
      message: extractMessage(ex),
      name: ex.name
    };
  }
  /**
   * NOT TESTED.
   * Computes stack trace information from an error message that includes
   * the stack trace.
   * Opera 9 and earlier use this method if the option to show stack
   * traces is turned on in opera:config.
   * @param {Error} ex
   * @return {?StackTrace} Stack information.
   * @memberof computeStackTrace
   */


  function computeStackTraceFromOperaMultiLineMessage(ex) {
    // TODO: Clean this function up
    // Opera includes a stack trace into the exception message. An example is:
    //
    // Statement on line 3: Undefined variable: undefinedFunc
    // Backtrace:
    //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js:
    //   In function zzz
    //         undefinedFunc(a);
    //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
    //   In function yyy
    //           zzz(x, y, z);
    //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
    //   In function xxx
    //           yyy(a, a, a);
    //   Line 1 of function script
    //     try { xxx('hi'); return false; } catch(ex) { report(ex); }
    //   ...
    var lines = ex.message.split('\n');

    if (lines.length < 4) {
      return;
    }

    var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
    var lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i;
    var lineRE3 = /^\s*Line (\d+) of function script\s*$/i;
    var stack = [];
    var scripts = window && window.document && window.document.getElementsByTagName('script');
    var inlineScriptBlocks = [];
    var parts;

    for (var s in scripts) {
      if (has(scripts, s) && !scripts[s].src) {
        inlineScriptBlocks.push(scripts[s]);
      }
    }

    for (var line = 2; line < lines.length; line += 2) {
      var item;

      if (lineRE1.exec(lines[line])) {
        parts = lineRE1.exec(lines[line]);
        item = {
          args: [],
          column: undefined,
          func: parts[3],
          line: +parts[1],
          url: parts[2]
        };
      } else if (lineRE2.exec(lines[line])) {
        parts = lineRE2.exec(lines[line]);
        item = {
          args: [],
          column: undefined,
          // TODO: Check to see if inline#1 (+parts[2]) points to the script number or column number.
          func: parts[4],
          line: +parts[1],
          url: parts[3]
        };
      } else if (lineRE3.exec(lines[line])) {
        parts = lineRE3.exec(lines[line]);
        var url = window.location.href.replace(/#.*$/, '');
        item = {
          url: url,
          args: [],
          column: undefined,
          func: '',
          line: +parts[1]
        };
      }

      if (item) {
        if (!item.func) {
          item.func = UNKNOWN_FUNCTION;
        }

        item.context = [lines[line + 1]];
        stack.push(item);
      }
    }

    if (!stack.length) {
      return; // could not parse multiline exception message as Opera stack trace
    }

    return {
      stack: stack,
      message: lines[0],
      name: ex.name
    };
  }
  /**
   * Adds information about the first frame to incompvare stack traces.
   * Safari and IE require this to get compvare data on the first frame.
   * @param {StackTrace} stackInfo Stack trace information from
   * one of the compute* methods.
   * @param {string=} url The URL of the script that caused an error.
   * @param {(number|string)=} lineNo The line number of the script that
   * caused an error.
   * @param {string=} message The error generated by the browser, which
   * hopefully contains the name of the object that caused the error.
   * @return {boolean} Whether or not the stack information was
   * augmented.
   * @memberof computeStackTrace
   */


  function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
    var initial = {
      url: url,
      line: lineNo ? +lineNo : undefined
    };

    if (initial.url && initial.line) {
      stackInfo.incompvare = false;
      var stack = stackInfo.stack;

      if (stack.length > 0) {
        if (stack[0].url === initial.url) {
          if (stack[0].line === initial.line) {
            return false; // already in stack trace
          }

          if (!stack[0].line && stack[0].func === initial.func) {
            stack[0].line = initial.line;
            stack[0].context = initial.context;
            return false;
          }
        }
      }

      stack.unshift(initial);
      stackInfo.partial = true;
      return true;
    }

    stackInfo.incompvare = true;
    return false;
  }
  /**
   * Computes stack trace information by walking the arguments.caller
   * chain at the time the exception occurred. This will cause earlier
   * frames to be missed but is the only way to get any stack trace in
   * Safari and IE. The top frame is restored by
   * {@link augmentStackTraceWithInitialElement}.
   * @param {Error} ex
   * @param {number} depth
   * @return {StackTrace} Stack trace information.
   * @memberof computeStackTrace
   */


  function computeStackTraceByWalkingCallerChain(ex, depth) {
    var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i;
    var stack = [];
    var funcs = {};
    var recursion = false;
    var parts;
    var item;

    for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
      if (curr === computeStackTrace || curr === report) {
        continue;
      }

      item = {
        args: [],
        column: undefined,
        func: UNKNOWN_FUNCTION,
        line: undefined,
        url: undefined
      };
      parts = functionName.exec(curr.toString());

      if (curr.name) {
        item.func = curr.name;
      } else if (parts) {
        item.func = parts[1];
      }

      if (typeof item.func === 'undefined') {
        item.func = parts ? parts.input.substring(0, parts.input.indexOf('{')) : undefined;
      }

      if (funcs[curr + '']) {
        recursion = true;
      } else {
        funcs[curr + ''] = true;
      }

      stack.push(item);
    }

    if (depth) {
      stack.splice(0, depth);
    }

    var result = {
      stack: stack,
      message: ex.message,
      name: ex.name
    };
    augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
    return result;
  }
  /**
   * Computes a stack trace for an exception.
   * @param {Error} ex
   * @param {(string|number)=} depth
   * @memberof computeStackTrace
   */


  function doComputeStackTrace(ex, depth) {
    var stack;
    var normalizedDepth = depth === undefined ? 0 : +depth;

    try {
      // This must be tried first because Opera 10 *destroys*
      // its stacktrace property if you try to access the stack
      // property first!!
      stack = computeStackTraceFromStacktraceProp(ex);

      if (stack) {
        return stack;
      }
    } catch (e) {
      if (debug) {
        throw e;
      }
    }

    try {
      stack = computeStackTraceFromStackProp(ex);

      if (stack) {
        return stack;
      }
    } catch (e) {
      if (debug) {
        throw e;
      }
    }

    try {
      stack = computeStackTraceFromOperaMultiLineMessage(ex);

      if (stack) {
        return stack;
      }
    } catch (e) {
      if (debug) {
        throw e;
      }
    }

    try {
      stack = computeStackTraceByWalkingCallerChain(ex, normalizedDepth + 1);

      if (stack) {
        return stack;
      }
    } catch (e) {
      if (debug) {
        throw e;
      }
    }

    return {
      message: extractMessage(ex),
      name: ex.name,
      stack: []
    };
  }
  /**
   * Logs a stacktrace starting from the previous call and working down.
   * @param {(number|string)=} depth How many frames deep to trace.
   * @return {StackTrace} Stack trace information.
   * @memberof computeStackTrace
   */


  function computeStackTraceOfCaller(depth) {
    var currentDepth = (depth === undefined ? 0 : +depth) + 1; // "+ 1" because "ofCaller" should drop one frame

    try {
      throw new Error();
    } catch (ex) {
      return computeStackTrace(ex, currentDepth + 1);
    }
  }

  doComputeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
  doComputeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
  doComputeStackTrace.ofCaller = computeStackTraceOfCaller;
  return doComputeStackTrace;
}();

exports.computeStackTrace = computeStackTrace;
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

function extractMessage(ex) {
  var message = ex && ex.message; // console.log('message',message)

  if (!message) {
    return 'No error message';
  }

  if (message.error && typeof message.error.message === 'string') {
    return message.error.message;
  }

  return message;
}