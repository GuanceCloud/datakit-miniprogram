// //app.js
// const { datafluxRum } = require('./miniprogram/dataflux-rum-miniapp')
// // 初始化 Sentry
const { datafluxRum } = require('@cloudcare/rum-miniapp')

datafluxRum.init({
	// datakitOrigin: 'http://10.100.64.249:9529',
	// applicationId: 'appid_f79b4b96645c11eb9eaa7a259b00813d',
	datakitOrigin: 'http://172.16.2.201:31845',
	applicationId: 'appid_6cb4c98eba9143c88c83e544407b1c74',
	env: 'prod',
	version: '1.0.0',
	trackInteractions: true,
})
// const { datafluxRum } = require('@cloudcare/rum-miniapp')
// // // 初始化 Sentry
// datafluxRum.init({
// 	datakitOrigin: 'http://10.100.64.161:9529/',// 必填，Datakit域名地址 需要在微信小程序管理后台加上域名白名单
// 	applicationId: 'appid_14eae490469e11eba9eb920038d3be75', // 必填，dataflux 平台生成的应用ID
// 	env: 'testing', // 选填，小程序的环境
//   version: '1.0.0', // 选填，小程序版本
// })
// wx.request({
// 	url: 'url',
// })
// var UNKNOWN_FUNCTION = '?'
// function computeStackTraceFromStackProp(ex) {
// 	if (!ex.stack) {
// 		return
// 	}

// 	// tslint:disable-next-line max-line-length
// 	var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
// 	// tslint:disable-next-line max-line-length
// 	var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i
// 	// tslint:disable-next-line max-line-length
// 	var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i

// 	// Used to additionally parse URL/line/column from eval frames
// 	var isEval
// 	var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
// 	var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/
// 	var lines = ex.stack.split('\n')
// 	var stack = []
// 	var submatch
// 	var parts
// 	var element

// 	for (var i = 0, j = lines.length; i < j; i += 1) {
// 		if (chrome.exec(lines[i])) {
// 			parts = chrome.exec(lines[i])
// 			var isNative = parts[2] && parts[2].indexOf('native') === 0 // start of line
// 			isEval = parts[2] && parts[2].indexOf('eval') === 0 // start of line
// 			submatch = chromeEval.exec(parts[2])
// 			if (isEval && submatch) {
// 				// throw out eval line/column and use top-most line/column number
// 				parts[2] = submatch[1] // url
// 				parts[3] = submatch[2] // line
// 				parts[4] = submatch[3] // column
// 			}
// 			element = {
// 				args: isNative ? [parts[2]] : [],
// 				column: parts[4] ? +parts[4] : undefined,
// 				func: parts[1] || UNKNOWN_FUNCTION,
// 				line: parts[3] ? +parts[3] : undefined,
// 				url: !isNative ? parts[2] : undefined,
// 			}
// 		} else if (winjs.exec(lines[i])) {
// 			parts = winjs.exec(lines[i])
// 			element = {
// 				args: [],
// 				column: parts[4] ? +parts[4] : undefined,
// 				func: parts[1] || UNKNOWN_FUNCTION,
// 				line: +parts[3],
// 				url: parts[2],
// 			}
// 		} else if (gecko.exec(lines[i])) {
// 			parts = gecko.exec(lines[i])
// 			isEval = parts[3] && parts[3].indexOf(' > eval') > -1
// 			submatch = geckoEval.exec(parts[3])
// 			if (isEval && submatch) {
// 				// throw out eval line/column and use top-most line number
// 				parts[3] = submatch[1]
// 				parts[4] = submatch[2]
// 				parts[5] = undefined // no column when eval
// 			} else if (i === 0 && !parts[5] && !ex.columnNumber) {
// 				// FireFox uses this awesome columnNumber property for its top frame
// 				// Also note, Firefox's column number is 0-based and everything else expects 1-based,
// 				// so adding 1
// 				// NOTE: this hack doesn't work if top-most frame is eval
// 				stack[0].column = ex.columnNumber + 1
// 			}
// 			element = {
// 				args: parts[2] ? parts[2].split(',') : [],
// 				column: parts[5] ? +parts[5] : undefined,
// 				func: parts[1] || UNKNOWN_FUNCTION,
// 				line: parts[4] ? +parts[4] : undefined,
// 				url: parts[3],
// 			}
// 		} else {
// 			continue
// 		}

// 		if (!element.func && element.line) {
// 			element.func = UNKNOWN_FUNCTION
// 		}
// 		stack.push(element)
// 	}

// 	if (!stack.length) {
// 		return
// 	}

// 	return {
// 		stack,
// 		message: ex.message,
// 		name: ex.name,
// 	}
// }
// wx.onError((err) => {
// 	var error = new Error(err)
// 	var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
// 	console.log(error.message,'message')
// 	console.log(error.message.split('\n')[2].match(ERROR_TYPES_RE))
// })
App({
	// onError: function(t) {
	// 	var error = new Error(t)
	// 	var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
	// 	console.log(Object.getOwnPropertyDescriptors(error),'error')
	// 	var groups = error.message.match(ERROR_TYPES_RE)
	// 	console.log(groups,error.message,'arguments')
	// },
	onLaunch: function () {
		// 展示本地存储能力
		var logs = wx.getStorageSync('logs') || []
		logs.unshift(Date.now())
		wx.setStorageSync('logs', logs)

		// 登录
		wx.login({
			success: (res) => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			},
		})
		// 获取用户信息
		wx.getSetting({
			success: (res) => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: (res) => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						},
					})
				}
			},
		})
	},
	globalData: {
		userInfo: null,
	},
})
