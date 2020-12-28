"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function () {
  'use strict';

  var e = {
    129: function _(e, t, r) {
      function n(e, t) {
        var r = Object.keys(e);

        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t && (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })), r.push.apply(r, n);
        }

        return r;
      }

      function o(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2 ? n(Object(r), !0).forEach(function (t) {
            l(e, t, r[t]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n(Object(r)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
          });
        }

        return e;
      }

      function l(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = r, e;
      }

      r.r(t), r.d(t, {
        "default": function _default() {
          return I;
        }
      });
      var a = {
        REPORT_FLAG_SCRIPT: 1,
        REPORT_FLAG_RESOURCE: 2,
        REPORT_FLAG_XHR: 4,
        REPORT_FLAG_PERFORMACE: 8,
        MESSAGE_TYPE_SCRIPT: 256,
        MESSAGE_TYPE_CONSOLE_LOG: 257,
        MESSAGE_TYPE_CONSOLE_WARN: 258,
        MESSAGE_TYPE_CONSOLE_ERROR: 259,
        MESSAGE_TYPE_RESOURCE: 512,
        MESSAGE_TYPE_RESOURCE_LOAD_ERROR: 513,
        MESSAGE_TYPE_RESOURCE_CROSS_ORIGIN: 514,
        MESSAGE_TYPE_RESOURCE_TIMING: 515,
        MESSAGE_TYPE_XHR: 768,
        MESSAGE_TYPE_XHR_ERROR: 769,
        MESSAGE_TYPE_XHR_TIMEOUT: 770,
        MESSAGE_TYPE_XHR_TIMING: 771,
        MESSAGE_TYPE_XHR_CROSS_ORIGIN: 772,
        MESSAGE_TYPE_PAGEVIEW: 1024,
        MESSAGE_TYPE_PAGEVIEW_SHOW: 1025,
        MESSAGE_TYPE_PAGEVIEW_HIDE: 1026,
        MESSAGE_TYPE_PERFORMANCE: 1280,
        MESSAGE_TYPE_PERFORMANCE_FPS: 1281,
        VENDOR_LIST: []
      },
          i = (o(o({}, a), {}, {
        DATA_SEND_INTERVAL_MS: 5e3,
        END_POINT: 'https://collecter.frontjs.com/',
        CDN_PATH: 'https://static.frontjs.com/dist/current/frontjs.web.min.js',
        VERSION: '1.1.0-rc4',
        VENDOR_LIST: ['www.google-analytics.com', 'www.googletagmanager.com', 'retcode.alicdn.com', 'arms-retcode.aliyuncs.com', 'hm.baidu.com', 'zz.bdstatic.com']
      }), o(o({}, a), {}, {
        DATA_SEND_INTERVAL_MS: 5e3,
        END_POINT: 'https://collecter.frontjs.com/',
        CDN_PATH: 'frontjs.mp.min.js',
        VERSION: '1.1.0-rc1'
      }));

      function c() {
        return new Date().getTime();
      }

      function s(e) {
        var t = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'],
            r = (e || c()).toString(16);

        for (r = '0' + r; r.length < 16;) {
          r = 'f' + r;
        }

        for (; r.length < 32;) {
          r += t[Math.floor(16 * Math.random())];
        }

        return r;
      }

      function u(e, t) {
        if (t) for (var r = function r(_r) {
          var n = e.match(t[_r][0]);
          if (n) return {
            v: t[_r][1].replace(/\$(\d+)/g, function () {
              return n[arguments[1]] || '$' + arguments[1];
            })
          };
        }, n = 0; n < t.length; n++) {
          var o = r(n);
          if ('object' == _typeof(o)) return o.v;
        }
        return e;
      }

      o(o({}, a), {}, {
        DATA_SEND_INTERVAL_MS: 5e3,
        END_POINT: 'https://collecter.frontjs.com/',
        CDN_PATH: 'frontjs.cocos.min.js',
        VERSION: '1.0.0-rc2'
      });
      var f = {
        getUserAgent: function getUserAgent() {
          return 'N/A';
        },
        getViewPortSize: function getViewPortSize(e) {
          return {
            w: e.global.deviceInfo.windowWidth,
            h: e.global.deviceInfo.windowHeight,
            r: e.global.deviceInfo.pixelRatio
          };
        },
        getClientID: function getClientID(e) {
          return e.realm.polyfill_getStorageSync('frontjs:client:id') || e.realm.polyfill_setStorageSync('frontjs:client:id', s()), e.realm.polyfill_getStorageSync('frontjs:client:id');
        },
        getSessionID: function getSessionID(e) {
          return e.global.SESSIONID || (e.global.SESSIONID = s()), e.global.SESSIONID;
        },
        polyfill: function polyfill(e) {
          return 'my' === e.tracker ? (e.polyfill_setStorageSync = function (t, r) {
            return e.setStorageSync({
              key: t,
              data: r
            });
          }, e.polyfill_getStorageSync = function (t) {
            return e.getStorageSync({
              key: t
            }).data;
          }) : ('tt' === e.tracker || 'wx' === e.tracker) && (e.polyfill_setStorageSync = e.setStorageSync, e.polyfill_getStorageSync = e.getStorageSync), e;
        }
      };

      function E(e) {
        if ('string' == typeof e && e.match(/^\/(.*)\/(i|g|m|u|y)*$/)) try {
          return new Function('return ' + e)();
        } catch (e) {}
        return null;
      }

      function g(e) {
        var t = [];

        if (e && e.length) {
          for (var r = 0; r < e.length; r++) {
            if (null === e[r]) t.push('null');else if (void 0 === e[r]) t.push('undefined');else if (e[r] instanceof Array && 'string' == typeof e[r].toString()) t.push('[' + e[r].toString() + ']');else if ('object' == _typeof(e[r])) {
              var n = [];

              for (var o in e[r]) {
                var l = '';
                if (l += o + ': ', null === e[r][o]) l += 'null';else if (void 0 === e[r][o]) l += 'undefined';else switch (_typeof(e[r][o])) {
                  case 'object':
                    e[r][o] instanceof Array && 'string' == typeof e[r][o].toString() ? l += '[' + e[r][o].toString() + ']' : 'function' == typeof e[r][o].valueOf && 'string' == typeof e[r][o].valueOf() ? l += e[r][o].valueOf() : 'function' == typeof e[r][o].toString && 'string' == typeof e[r][o].toString() ? l += e[r][o].toString() : l += '[object]';
                    break;

                  case 'function':
                    l += '[function]';
                    break;

                  default:
                    l += e[r][o].toString();
                }
                n.push(l);
              }

              t.push('{' + n.join(', ') + '}');
            } else 'function' == typeof e[r].valueOf && 'string' == typeof e[r].valueOf() ? t.push(e[r].valueOf()) : 'function' == typeof e[r].toString && 'string' == typeof e[r].toString() ? t.push(e[r].toString()) : t.push('[object]');
          }

          return t.join(', ');
        }

        return '[object]';
      }

      function p(e) {
        return 'string' == typeof e && (e = e.toLowerCase()), {
          unknown: 0,
          none: 1,
          notreachable: 1,
          wifi: 3,
          '2g': 4,
          '3g': 5,
          '4g': 6,
          '5g': 7
        }[e] || 0;
      }

      var d = {
        token: function token(e) {
          return e && e.match(/^\w{32}$/) ? 0 : 1;
        },
        behaviour: function behaviour(e) {
          return e <= (a.REPORT_FLAG_SCRIPT | a.REPORT_FLAG_RESOURCE | a.REPORT_FLAG_XHR | a.REPORT_FLAG_PERFORMACE) ? 0 : 1;
        },
        stringOrRegExpList: function stringOrRegExpList(e) {
          e = e || [];

          for (var t = 0; t < e.length; t++) {
            if ('string' == typeof e[t]) ;else if (!e[t].test) return 'Value: ' + e[t];
          }

          return 0;
        },
        routeList: function routeList(e) {
          e = e || [];

          for (var t = 0; t < e.length; t++) {
            if ('string' != typeof e[t][0] || 'string' != typeof e[t][1]) return 'Pair: ' + e[t].join(',');
          }

          return 0;
        },
        stringValueObject: function stringValueObject(e) {
          for (var t in e = e || {}) {
            if ('object' == _typeof(e[t]) || 'function' == typeof e[t] || 'string' != typeof t) return t;
          }

          return 0;
        }
      },
          S = function S(e, t) {
        t = t || '';
        var r = {
          1001: 'Invalid token',
          1002: 'Invalid behaviour settings',
          1003: 'Invalid origin settings',
          1004: 'Invalid exclude settings',
          1005: 'Invalid user data',
          1006: 'Invalid history API type',
          1007: 'Invalid route mapping settings',
          4e3: 'Bad configuration! Fail to start!',
          4001: 'FrontJS is already defined, Fail to start!',
          4002: 'FrontJS start in unsupport paltform, Fail to start!'
        };
        r[e] && console.warn(['Error(frontjs):', r[e], '(CODE' + e + ')', 'See https://www.frontjs.com/doc/view/errcode/#' + encodeURIComponent(t)].join(' '));
      };

      var y = [];
      var b = {
        stack: y,
        push: function push(e) {
          return y.push(e);
        },
        current: function current() {
          return y[y.length - 1] || '';
        },
        referer: function referer() {
          return y[y.length - 2] || '';
        }
      };

      function _(e, t, r, n, o) {
        var l = {
          type: t,
          data: r
        };
        if (l.currentURL = e.global.history.current(), l.refererURL = e.global.history.referer(), l.currentRoute = u(l.currentURL, e.routeMapping), l.refererRoute = u(l.refererURL, e.routeMapping), l.viewPort = e.global.env.getViewPortSize(e), l.userAgent = e.global.env.getUserAgent(e), l.clientID = e.global.env.getClientID(e), l.sessionID = e.global.env.getSessionID(e), r.message === e.global["const"].MESSAGE_TYPE_PAGEVIEW ? l.messageID = e.global.PVID : l.messageID = s(o), l.token = e.token, l.version = e.global["const"].VERSION, l.userData = e.userData, e.device && (l.deviceData = e.device), n) for (var a in l.data.detail = l.data.detail || {}, n) {
          l.data.detail[a] = n[a];
        }
        return l;
      }

      function v(e, t, r, n, o, l, a) {
        var i, c;
        return i = l = l && l.stack ? l.stack.toString() : '', c = new RegExp('((?!\n).)*' + a.replace(/(\.|\\|\/|\||\+|\$|\^)/g, '\\$1') + '.*\n', 'g'), {
          message: e,
          detail: {
            err: t,
            file: r,
            line: n,
            column: o,
            trace: l = i.replace(c, '')
          }
        };
      }

      function R(e, t, r, n) {
        return {
          message: e,
          detail: {
            requestURL: t,
            responseData: r,
            timing: n
          }
        };
      }

      function P(e, t, r, n) {
        return {
          message: e,
          detail: {
            tagname: t,
            resourceURL: r,
            timing: n
          }
        };
      }

      function O(e, t) {
        return {
          message: e,
          detail: t
        };
      }

      function h(e, t) {
        if ('string' == typeof e && t) {
          e = e || '';

          for (var r = 0; r < t.length; r++) {
            if ('' !== t[r] && e.match(t[r])) return !0;
          }
        }

        return !1;
      }

      function m(e, t) {
        var r = Object.keys(e);

        if (Object.getOwnPropertySymbols) {
          var n = Object.getOwnPropertySymbols(e);
          t && (n = n.filter(function (t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })), r.push.apply(r, n);
        }

        return r;
      }

      function T(e) {
        for (var t = 1; t < arguments.length; t++) {
          var r = null != arguments[t] ? arguments[t] : {};
          t % 2 ? m(Object(r), !0).forEach(function (t) {
            A(e, t, r[t]);
          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m(Object(r)).forEach(function (t) {
            Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
          });
        }

        return e;
      }

      function A(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : e[t] = r, e;
      }

      function I(e) {
        var t = null,
            r = null;

        try {
          tt && 'object' == (typeof tt === "undefined" ? "undefined" : _typeof(tt)) && 'function' == typeof tt.request && (t = T({}, tt), r = 'tt');
        } catch (e) {
          try {
            wx && 'object' == (typeof wx === "undefined" ? "undefined" : _typeof(wx)) && 'function' == typeof wx.request && (t = T({}, wx), r = 'wx');
          } catch (e) {
            try {
              my && 'object' == (typeof my === "undefined" ? "undefined" : _typeof(my)) && 'function' == typeof my.request && (t = T({}, my), r = 'my');
            } catch (e) {}
          }
        }

        if (!t) return S(4002), !1;
        if (t.tracker) return S(4001), t.tracker;
        t.tracker = r;

        var n = function (e) {
          var t = {},
              r = !0;

          if (d.token(e.token) ? (S(1001), r &= !1) : t.token = e.token.toString(), d.behaviour(e.behaviour) ? (S(1002), r &= !1) : (t.behaviour = parseInt(e.behaviour), t.behaviour || (t.behaviour = i.REPORT_FLAG_SCRIPT | i.REPORT_FLAG_RESOURCE | i.REPORT_FLAG_XHR | i.REPORT_FLAG_PERFORMACE)), d.stringOrRegExpList(e.exclude)) {
            var n = d.stringOrRegExpList(e.exclude);
            S(1004, n), r &= !1;
          } else t.exclude = function (e) {
            e = e || [];

            for (var t = [], r = 0; r < e.length; r++) {
              'string' == typeof e[r] && (E(e[r]) ? t.push(E(e[r])) : t.push(e[r]));
            }

            return t;
          }(e.exclude), t.exclude.push(i.CDN_PATH), t.exclude.push(i.END_POINT);

          if (d.stringValueObject(e.userData)) {
            var o = d.KVArrayChecker(e.userData);
            S(1005, o), r &= !1;
          } else t.userData = function (e) {
            var t = {};

            for (var r in e) {
              t[r] = e[r];
            }

            return t;
          }(e.userData);

          return !!r && t;
        }(e);

        if (!n) return S(4e3), !1;
        n.global = {}, n.exports = {}, n.global.PVID = null, n.global.PVTS = null, n.global.SESSIONID = null, n.global.RT_PTR = 0, n.global["const"] = i, n.global.env = f, n.global.history = b, n.realm = n.global.env.polyfill(t);

        var o = function (e) {
          return function (t) {
            if (!t.message) return !0;
            var r = v(e.global["const"].MESSAGE_TYPE_SCRIPT, t.message, t.filename, t.lineno, t.colno, t.error, e.global["const"].CDN_PATH);
            !h(t.filename, e.exclude) && e.behaviour & e.global["const"].REPORT_FLAG_SCRIPT && e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_SCRIPT, r), !1);
          };
        }(n),
            l = function (e) {
          return function (t) {
            if (!t.url || h(t.url, e.exclude) || !(e.behaviour & e.global["const"].REPORT_FLAG_RESOURCE)) return !0;
            if ('downloadFile.load' === t.type) if (t.ok) {
              var r = P(e.global["const"].MESSAGE_TYPE_RESOURCE_TIMING, 'API.downloadFile', t.url, t.cost);
              e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_RESOURCE, r), !1);
            } else {
              var n = P(e.global["const"].MESSAGE_TYPE_RESOURCE_LOAD_ERROR, 'API.downloadFile', t.url, t.cost);
              e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_RESOURCE, n), !1);
            }
          };
        }(n),
            a = function (e) {
          return function (t) {
            if (!t.url || h(t.url, e.exclude) || !(e.behaviour & e.global["const"].REPORT_FLAG_XHR)) return !0;
            if ('request.load' === t.type) if (t.ok) {
              var r = R(e.global["const"].MESSAGE_TYPE_XHR_TIMING, t.url, {
                status: t.status
              }, t.cost);
              e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_XHR, r), !1);
            } else {
              var n = R(e.global["const"].MESSAGE_TYPE_XHR_ERROR, t.url, {
                status: t.status
              }, t.cost);
              e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_XHR, n), !1);
            }
          };
        }(n),
            y = function (e) {
          return function (t) {
            var r = null;
            if ('console.log' === t.type) r = e.global["const"].MESSAGE_TYPE_CONSOLE_LOG, t.type += ' API';else if ('console.warn' === t.type) r = e.global["const"].MESSAGE_TYPE_CONSOLE_WARN, t.type += ' API';else {
              if ('console.error' !== t.type) return !0;
              r = e.global["const"].MESSAGE_TYPE_CONSOLE_ERROR, t.type += ' API';
            }
            var n = v(r, t.error.message, t.type, t.error.lineno, t.error.colno, t.error, e.global["const"].CDN_PATH);
            e.behaviour & e.global["const"].REPORT_FLAG_SCRIPT && e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_SCRIPT, n), !1);
          };
        }(n),
            m = function (e) {
          return function (t) {
            var r = e.global.PVTS,
                n = (e.global.PVID, {
              view: 0
            });

            if ('unload' === t.type) {
              n.view = c() - r;
              var o = O(e.global["const"].MESSAGE_TYPE_PAGEVIEW, n);
              e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_PAGEVIEW, o), !0);
            }

            if ('load' === t.type) {
              var l = getCurrentPages(),
                  a = l.length > 0 ? l[l.length - 1].route : '';
              e.global.history.push(a), e.global.PVTS = c(), e.global.PVID = s(e.global.PVTS);
              var i = O(e.global["const"].MESSAGE_TYPE_PAGEVIEW, n);
              e.global.sender(_(e, e.global["const"].MESSAGE_TYPE_PAGEVIEW, i), !1), e.API.dispatchEvent({
                type: 'enterpage',
                url: e.global.history.current(),
                referer: e.global.history.referer(),
                route: u(e.global.history.current(), e.routeMapping),
                refererRoute: u(e.global.history.referer(), e.routeMapping)
              });
            }
          };
        }(n),
            A = function (e) {
          var t = function t() {
            var t = e.global["const"].END_POINT + 'apiv1/app/status?token=' + e.token,
                r = e.global["const"].END_POINT + 'api/c/pull',
                n = e.global["const"].END_POINT + 'api/c/push',
                o = {
              'content-type': 'application/json'
            };
            e.realm.request({
              url: t,
              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: function success(t) {
                if (200 !== t.statusCode) return !1;
                var l = parseInt(t.data),
                    a = {
                  u: e.global.env.getClientID(e),
                  ua: 'FrontJSWechatSDK',
                  pt: 'web',
                  uav: e.global["const"].VERSION,
                  ms: l
                };
                e.realm.request({
                  url: r,
                  method: 'POST',
                  header: o,
                  data: JSON.stringify(a),
                  success: function success(t) {
                    if (200 !== t.statusCode) return !1;
                    var r = t.data;
                    if (!r.data || !r.data.c) return !1;
                    e.realm.setClipboardData({
                      data: r.data.c,
                      complete: function complete(t) {
                        e.realm.hideToast();
                        var l = 2;
                        t.errMsg && t.errMsg.search(/ok/) && (l = 1);
                        var a = {
                          id: r['request-id'],
                          r: l
                        };
                        e.realm.request({
                          url: n,
                          method: 'POST',
                          header: o,
                          data: JSON.stringify(a)
                        });
                      }
                    });
                  }
                });
              }
            });
          };

          return function (r) {
            if ('App.show' === r.type) 'my' !== e.realm.tracker && e.realm.getClipboardData({
              success: function success(t) {
                e.realm.setStorageSync('frontjs:cb:content', t.data);
              }
            });else if ('App.hide' === r.type) {
              var n = e.realm.getStorageSync('frontjs:cb:content');
              'my' !== e.realm.tracker && e.realm.getClipboardData({
                success: function success(e) {
                  ;
                  e.data && n !== e.data || t();
                },
                fail: function fail(e) {
                  t();
                }
              });
            }
          };
        }(n);

        n.handler = {
          errorHandler: o,
          downloadFileEventHandler: l,
          requestEventHandler: a,
          consoleEventHandler: y,
          historyEventHandler: m
        }, n.global.PVTS = c(), n.global.PVID = s(n.global.PVTS), n.global.deviceInfo = n.realm.getSystemInfoSync(), n.device = {
          brand: n.global.deviceInfo.brand,
          model: n.global.deviceInfo.model,
          osType: n.global.deviceInfo.platform,
          osversion: n.global.deviceInfo.system,
          appversion: n.global.deviceInfo.version,
          deviceID: n.global.env.getClientID(n),
          network: null
        }, n.realm.getNetworkType({
          success: function success(e) {
            n.device.network = p(e.networkType);
          }
        }), n.realm.onNetworkStatusChange(function (e) {
          n.device.network = p(e.networkType);
        });
        var I = App;

        App = function (e, t) {
          return function () {
            var r = arguments[0].onError,
                n = arguments[0].onShow,
                o = arguments[0].onHide;
            arguments[0].onError = function () {
              t.errorHandler && t.errorHandler(arguments[0]), r && r.apply(this, [].slice.call(arguments));
            }, arguments[0].onShow = function () {
              t.showHandler && t.showHandler({
                type: 'App.show'
              }), n && n.apply(this, [].slice.call(arguments));
            }, arguments[0].onHide = function () {
              t.hideHandler && t.hideHandler({
                type: 'App.hide'
              }), o && o.apply(this, [].slice.call(arguments));
            }, arguments[0].FrontJS = t.exports, e.apply(null, [].slice.call(arguments));
          };
        }(I, {
          errorHandler: o,
          showHandler: A,
          hideHandler: A,
          exports: n.exports
        });

        var w = Page;

        Page = function (e, t) {
          return function () {
            var r = arguments[0].onShow,
                n = arguments[0].onHide;
            arguments[0].onShow = function () {
              t.historyEventHandler && t.historyEventHandler({
                type: 'load'
              }), r && r.apply(this, [].slice.call(arguments));
            }, arguments[0].onHide = function () {
              t.historyEventHandler && t.historyEventHandler({
                type: 'unload'
              }), n && n.apply(this, [].slice.call(arguments));
            }, e.apply(null, [].slice.call(arguments));
          };
        }(w, {
          historyEventHandler: m
        });

        var D,
            G,
            j,
            C,
            M,
            N,
            L = null;

        if ('function' == typeof n.realm.request && (L = n.realm.request, n.realm.request = function (e, t) {
          return function () {
            var r = arguments[0].success,
                n = arguments[0].fail,
                o = arguments[0].url,
                l = c(),
                a = 0;
            arguments[0].success = function () {
              ;
              a = c(), t({
                type: 'request.load',
                ok: !0,
                url: o,
                status: arguments[0].statusCode || arguments[0].status || 0,
                cost: {
                  send: a - l,
                  load: 0,
                  total: a - l
                }
              }), r && r.apply(this, [].slice.call(arguments));
            }, arguments[0].fail = function () {
              ;
              a = c(), t({
                type: 'request.load',
                ok: !1,
                url: o,
                status: 0,
                cost: {
                  send: a - l,
                  load: 0,
                  total: a - l
                }
              }), n && n.apply(this, [].slice.call(arguments));
            }, e.apply(null, [].slice.call(arguments));
          };
        }(L, a)), n.global.sender = function (e, t) {
          var r = [],
              n = null;

          function o() {
            n = setTimeout(function () {
              l(null, !0), clearTimeout(n), o();
            }, e.global["const"].DATA_SEND_INTERVAL_MS);
          }

          function l(n, l) {
            n && r.push(n), l && r.length && (t({
              url: e.global["const"].END_POINT,
              data: r,
              method: 'POST'
            }), r = [], o());
          }

          return o(), l;
        }(n, L), 'function' == typeof n.realm.downloadFile) {
          var H = n.realm.downloadFile;

          n.realm.downloadFile = function (e, t) {
            return function () {
              var r = arguments[0].success,
                  n = arguments[0].fail,
                  o = arguments[0].url,
                  l = c(),
                  a = 0;
              arguments[0].success = function () {
                ;
                a = c(), t({
                  type: 'downloadFile.load',
                  ok: !0,
                  url: o,
                  cost: {
                    send: 0,
                    load: a - l,
                    total: a - l
                  }
                }), r && r.apply(this, [].slice.call(arguments));
              }, arguments[0].fail = function () {
                ;
                a = c(), t({
                  type: 'downloadFile.load',
                  ok: !1,
                  url: o,
                  cost: {
                    send: 0,
                    load: a - l,
                    total: a - l
                  }
                }), n && n.apply(this, [].slice.call(arguments));
              }, e.apply(null, [].slice.call(arguments));
            };
          }(H, l);
        }

        'wx' === n.realm.tracker ? wx = n.realm : 'tt' === n.realm.tracker ? tt = n.realm : 'my' === n.realm.tracker && (my = n.realm), console && (D = console, G = y, j = D.log, C = D.warn, M = D.error, (N = D).log = function () {
          var e = [].slice.call(arguments);
          if (!e.length) return !0;
          G({
            type: 'console.log',
            error: new Error(g(e).substr(0, 1e3))
          }), j.apply(D, e);
        }, N.warn = function () {
          var e = [].slice.call(arguments);
          if (!e.length) return !0;
          G({
            type: 'console.warn',
            error: new Error(g(e).substr(0, 1e3))
          }), C.apply(D, e);
        }, N.error = function () {
          var e = [].slice.call(arguments);
          if (!e.length) return !0;
          1 === e.length && 'object' == _typeof(e[0]) && e[0].message && e[0].stack ? G({
            type: 'console.error',
            error: e[0]
          }) : G({
            type: 'console.error',
            error: new Error(g(e).substr(0, 1e3))
          }), M.apply(D, e);
        }), n.API = function (e) {
          var t = [];

          function r(t) {
            return t.message || (t = new Error(t)), t.error = t, t.filename = t.filename ? t.filename : '', t.filename += ' via FrontJS try - catch API', t.lineno = t.lineno ? t.lineno : 0, t.colno = t.colno ? t.colno : 0, e.handler.errorHandler(t), null;
          }

          return {
            "try": function _try() {
              var e = arguments[0],
                  t = arguments[1];

              try {
                return e.apply(t, [].slice.call(arguments, 2));
              } catch (e) {
                return r(e);
              }
            },
            "catch": r,
            addEventListener: function addEventListener(e, r) {
              t[e] = t[e] ? t[e] : [];

              for (var n = 0; n < t[e].length; n++) {
                if (r === t[e]) return r;
              }

              return t[e].push(r), r;
            },
            removeEventListener: function removeEventListener(e, r) {
              t[e] = t[e] ? t[e] : [];

              for (var n = [], o = 0; o < t[e].length; o++) {
                r !== t[e][o] && n.push(t[e][o]);
              }

              return t[e] = n, r;
            },
            dispatchEvent: function dispatchEvent(e) {
              var r = e.type;

              if ('string' == typeof r) {
                t[r] = t[r] ? t[r] : [];

                for (var n = 0; n < t[r].length; n++) {
                  'function' == typeof t[r][n] && setTimeout(function (n) {
                    return function () {
                      t[r][n](e);
                    };
                  }(n), 0);
                }
              }
            },
            composedTry: function composedTry(e, t) {
              return function () {
                try {
                  return e.apply(t, [].slice.call(arguments));
                } catch (e) {
                  return r(e);
                }
              };
            },
            addUserData: function addUserData(t, r) {
              return 'string' == typeof r || 'number' == typeof r || 'boolean' == typeof r || null === r ? (e.userData[t] = r, !0) : (S(1005, t), !1);
            },
            removeUserData: function removeUserData(t) {
              return delete e.userData[t], !0;
            }
          };
        }(n), n.exports.C = {
          SCRIPT: n.global["const"].REPORT_FLAG_SCRIPT,
          RESOURCE: n.global["const"].REPORT_FLAG_RESOURCE,
          XHR: n.global["const"].REPORT_FLAG_XHR,
          PERFOMACE: n.global["const"].REPORT_FLAG_PERFORMACE
        }, n.exports.V = n.global["const"].VERSION, n.exports["try"] = n.API["try"], n.exports["catch"] = n.API["catch"], n.exports.addEventListener = n.API.addEventListener, n.exports.removeEventListener = n.API.removeEventListener, n.exports.composedTry = n.API.composedTry, n.exports.addUserData = n.API.addUserData, n.exports.removeUserData = n.API.removeUserData;
      }
    }
  },
      t = {};

  function r(n) {
    if (t[n]) return t[n].exports;
    var o = t[n] = {
      exports: {}
    };
    return e[n](o, o.exports, r), o.exports;
  }

  return r.d = function (e, t) {
    for (var n in t) {
      r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, {
        enumerable: !0,
        get: t[n]
      });
    }
  }, r.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }, r.r = function (e) {
    'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: 'Module'
    }), Object.defineProperty(e, '__esModule', {
      value: !0
    });
  }, r(129);
}();