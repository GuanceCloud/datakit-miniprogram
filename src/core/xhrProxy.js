import { sdk } from './sdk'
import { now } from '../helper/utils'
import { RequestType } from '../helper/enums'
var xhrProxySingleton
var beforeSendCallbacks = []
var onRequestCompleteCallbacks = []
var originalXhrRequest
export function startXhrProxy() {
	if (!xhrProxySingleton) {
		proxyXhr()
		xhrProxySingleton = {
			beforeSend: function (callback) {
				beforeSendCallbacks.push(callback)
			},
			onRequestComplete: function (callback) {
				onRequestCompleteCallbacks.push(callback)
			},
		}
	}
	return xhrProxySingleton
}

export function resetXhrProxy() {
	if (xhrProxySingleton) {
		xhrProxySingleton = undefined
		beforeSendCallbacks.splice(0, beforeSendCallbacks.length)
		onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length)
		sdk.request = originalXhrRequest
	}
}

function proxyXhr() {
	originalXhrRequest = sdk.request
	sdk.request = function () {
		var dataflux_xhr = {
			method: arguments[0].method || 'GET',
			startTime: 0,
			url: arguments[0].url,
			type: RequestType.XHR,
			responseType: arguments[0].responseType || 'text',
		}
		dataflux_xhr.startTime = now()

		var originalSuccess = arguments[0].success

		arguments[0].success = function () {
			reportXhr(arguments[0])

			if (originalSuccess) {
				originalSuccess.apply(_this, arguments)
			}
		}
		var originalFail = arguments[0].fail
		arguments[0].fail = function () {
			reportXhr(arguments[0])
			if (originalFail) {
				originalFail.apply(_this, arguments)
			}
		}
		var hasBeenReported = false
		var reportXhr = function (res) {
			if (hasBeenReported) {
				return
			}
			hasBeenReported = true
			dataflux_xhr.duration = now() - dataflux_xhr.startTime
			dataflux_xhr.response = JSON.stringify(res.data)
			dataflux_xhr.header = res.header || {}
			dataflux_xhr.profile = res.profile
			dataflux_xhr.status = res.statusCode || res.status || 0
			onRequestCompleteCallbacks.forEach(function (callback) {
				callback(dataflux_xhr)
			})
		}
		beforeSendCallbacks.forEach(function (callback) {
			callback(dataflux_xhr)
		})
		return originalXhrRequest.apply(this, arguments)
	}
}
