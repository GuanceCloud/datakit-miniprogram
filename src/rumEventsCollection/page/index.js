import { now, throttle, UUID } from '../../helper/utils'
import { trackEventCounts } from '../trackEventCounts'
import { LifeCycleEventType } from '../../core/lifeCycle'
// 劫持原小程序App方法
export var THROTTLE_VIEW_UPDATE_PERIOD = 3000

export function rewritePage(configuration, lifeCycle) {
	const originPage = Page

	Page = function (page) {
		// 合并方法，插入记录脚本
		var currentView,
			startTime = now()
		;['onUnload', 'onShow', 'onHide', 'onReady', 'onLoad'].forEach(
			(methodName) => {
				const userDefinedMethod = page[methodName] // 暂存用户定义的方法
				page[methodName] = function (options) {
					if (methodName === 'onShow' || methodName === 'onLoad') {
						if (typeof currentView === 'undefined') {
							const activePage = getActivePage()
							currentView = newView(
								lifeCycle,
								activePage && activePage.route,
								startTime,
							)
						}
					}
					currentView && currentView.setLoadEventEnd(methodName)
					if (
						(methodName === 'onUnload' ||
							methodName === 'onHide' ||
							methodName === 'onShow') &&
						currentView
					) {
						currentView.triggerUpdate()
						if (methodName === 'onUnload') {
							currentView.end()
						}
					}
					return userDefinedMethod && userDefinedMethod.call(this, options)
				}
			},
		)
		return originPage(page)
	}
}
function newView(lifeCycle, route, startTime) {
	if (typeof startTime === 'undefined') {
		startTime = now()
	}
	var id = UUID()
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
	}
	var documentVersion = 0
	var loadingTime
	var showTime
	var onload2onshowTime
	var onshow2onready
	var stayTime
	var fpt, fmp
	lifeCycle.notify(LifeCycleEventType.VIEW_CREATED, {
		id,
		startTime,
		route,
	})
	var scheduleViewUpdate = throttle(
		triggerViewUpdate,
		THROTTLE_VIEW_UPDATE_PERIOD,
		{
			leading: false,
		},
	)
	var cancelScheduleViewUpdate = scheduleViewUpdate.cancel
	var _trackEventCounts = trackEventCounts(
		lifeCycle,
		function (newEventCounts) {
			eventCounts = newEventCounts
			scheduleViewUpdate()
		},
	)
	var stopEventCountsTracking = _trackEventCounts.stop
	var _trackFptTime = trackFptTime(lifeCycle, function (duration) {
		fpt = duration
		scheduleViewUpdate()
	})
	var stopFptTracking = _trackFptTime.stop
	var setLoadEventEnd = function (type) {
		console.log(type, 'type')
		if (type === 'onLoad') {
			loadingTime = now()
		} else if (type === 'onShow') {
			showTime = now()
			if (
				typeof onload2onshowTime === 'undefined' &&
				typeof loadingTime !== 'undefined'
			) {
				onload2onshowTime = showTime - loadingTime
			}
		} else if (type === 'onReady') {
			if (
				typeof onshow2onready === 'undefined' &&
				typeof showTime !== 'undefined'
			) {
				onshow2onready = now() - showTime
			}
			if (typeof fmp === 'undefined') {
				fmp = now() - startTime // 从开发者角度看，小程序首屏渲染完成的标志是首页 Page.onReady 事件触发。
			}
		} else if (type === 'onHide' || type === 'onUnload') {
			if (typeof showTime !== 'undefined') {
				stayTime = now() - showTime
			}
		}
		scheduleViewUpdate()
	}
	function triggerViewUpdate() {
		documentVersion += 1
		lifeCycle.notify(LifeCycleEventType.VIEW_UPDATED, {
			documentVersion: documentVersion,
			eventCounts: eventCounts,
			id: id,
			loadingTime: loadingTime,
			stayTime,
			onload2onshowTime,
			onshow2onready,
			fmp,
			fpt,
			startTime: startTime,
			route: route,
			duration: now() - startTime,
		})
	}
	return {
		scheduleUpdate: scheduleViewUpdate,
		setLoadEventEnd,
		triggerUpdate: function () {
			// cancel any pending view updates execution
			cancelScheduleViewUpdate()
			triggerViewUpdate()
		},
		end: function () {
			stopEventCountsTracking()
			stopFptTracking()
			cancelScheduleViewUpdate()
		},
	}
}
function trackFptTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			const firstRenderEntity = entitys.find(
				(entity) =>
					entity.entryType === 'render' && entity.name === 'firstRender',
			)
			if (typeof firstRenderEntity !== 'undefined') {
				callback(firstRenderEntity.duration)
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function getActivePage() {
	const curPages = getCurrentPages()
	if (curPages.length) {
		return curPages[curPages.length - 1]
	}
	return {}
}
