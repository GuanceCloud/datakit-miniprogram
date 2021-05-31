import { startXhrProxy } from '../core/xhrProxy'
import { startDownloadProxy } from '../core/downloadProxy'
import { LifeCycleEventType } from '../core/lifeCycle'
import { isObject } from '../helper/utils'
import { isAllowedRequestUrl } from '../rumEventsCollection/resource/resourceUtils'
var nextRequestIndex = 1

export function startRequestCollection(lifeCycle, configuration) {
	trackXhr(lifeCycle, configuration)
	trackDownload(lifeCycle, configuration)
}
function parseHeader(header) {
	// 大小写兼容
	if (!isObject(header)) return header
	var res = {}
	Object.keys(header).forEach(function (key) {
		res[key.toLowerCase()] = header[key]
	})
	return res
}
function getHeaderString(header) {
	if (!isObject(header)) return header
	var headerStr = ''
	Object.keys(header).forEach(function (key) {
		headerStr += key + ':' + header[key] + ';'
	})
	return headerStr
}
export function trackXhr(lifeCycle, configuration) {
	var xhrProxy = startXhrProxy()
	xhrProxy.beforeSend(function (context) {
		if (isAllowedRequestUrl(configuration, context.url)) {
			context.requestIndex = getNextRequestIndex()
			lifeCycle.notify(LifeCycleEventType.REQUEST_STARTED, {
				requestIndex: context.requestIndex,
			})
		}
	})
	xhrProxy.onRequestComplete(function (context) {
		if (isAllowedRequestUrl(configuration, context.url)) {
			lifeCycle.notify(LifeCycleEventType.REQUEST_COMPLETED, {
				duration: context.duration,
				method: context.method,
				requestIndex: context.requestIndex,
				performance: context.profile,
				response: context.response,
				startTime: context.startTime,
				status: context.status,
				type: context.type,
				url: context.url,
			})
		}
	})
	return xhrProxy
}
export function trackDownload(lifeCycle, configuration) {
	var dwonloadProxy = startDownloadProxy()
	dwonloadProxy.beforeSend(function (context) {
		if (isAllowedRequestUrl(configuration, context.url)) {
			context.requestIndex = getNextRequestIndex()
			lifeCycle.notify(LifeCycleEventType.REQUEST_STARTED, {
				requestIndex: context.requestIndex,
			})
		}
	})
	dwonloadProxy.onRequestComplete(function (context) {
		if (isAllowedRequestUrl(configuration, context.url)) {
			lifeCycle.notify(LifeCycleEventType.REQUEST_COMPLETED, {
				duration: context.duration,
				method: context.method,
				requestIndex: context.requestIndex,
				performance: context.profile,
				response: context.response,
				startTime: context.startTime,
				status: context.status,
				type: context.type,
				url: context.url,
			})
		}
	})
	return dwonloadProxy
}
function getNextRequestIndex() {
	var result = nextRequestIndex
	nextRequestIndex += 1
	return result
}
