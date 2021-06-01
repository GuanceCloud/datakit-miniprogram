export const ONE_SECOND = 1000
export const ONE_MINUTE = 60 * ONE_SECOND
export const ONE_HOUR = 60 * ONE_MINUTE
export const ONE_KILO_BYTE = 1024
export const CLIENT_ID_TOKEN = 'datafluxRum:client:id'
export const RumEventType = {
	ACTION: 'action',
	ERROR: 'error',
	LONG_TASK: 'long_task',
	VIEW: 'view',
	RESOURCE: 'resource',
	APP: 'app',
	ACTION: 'action',
}

export var RequestType = {
	XHR: 'network',
	DOWNLOAD: 'resource',
}

export var ActionType = {
	tap: 'tap',
	longpress: 'longpress',
	longtap: 'longtap',
}
export var MpHook = {
	data: 1,
	onLoad: 1,
	onShow: 1,
	onReady: 1,
	onPullDownRefresh: 1,
	onReachBottom: 1,
	onShareAppMessage: 1,
	onPageScroll: 1,
	onResize: 1,
	onTabItemTap: 1,
	onHide: 1,
	onUnload: 1,
}
