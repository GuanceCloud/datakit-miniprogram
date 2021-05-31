import { extend, now, throttle, UUID, isNumber } from '../../helper/utils'
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
		;['onReady', 'onShow', 'onLoad', 'onUnload', 'onHide'].forEach(
			(methodName) => {
				const userDefinedMethod = page[methodName]
				if (typeof userDefinedMethod !== 'function') return
				page[methodName] = function () {
					// console.log(
					// 	this.setUpdatePerformanceListener,
					// 	'setUpdatePerformanceListenersetUpdatePerformanceListener',
					// )
					console.log(methodName, 'methodName')
					if (methodName === 'onShow' || methodName === 'onLoad') {
						if (typeof currentView === 'undefined') {
							const activePage = getActivePage()
							console.log(currentView, 'currenetView')
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
						if (methodName === 'onUnload' || methodName === 'onHide') {
							currentView.end()
						}
					}
					return userDefinedMethod && userDefinedMethod.apply(this, arguments)
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
	var isActive = true
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
		userActionCount: 0,
	}
	var setdataCount = 0

	var documentVersion = 0
	var setdataDuration = 0
	var loadingDuration = 0
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
	var _trackSetDataTime = trackSetDataTime(lifeCycle, function (duration) {
		if (isNumber(duration)) {
			setdataDuration += duration
			setdataCount++
			scheduleViewUpdate()
		}
	})
	var stopSetDataTracking = _trackSetDataTime.stop
	var _trackLoadingTime = trackLoadingTime(lifeCycle, function (duration) {
		if (isNumber(duration)) {
			loadingDuration = duration
			scheduleViewUpdate()
		}
	})
	var stopLoadingTimeTracking = _trackLoadingTime.stop
	var updatesetDataTime = function (duration) {
		if (isNumber(duration)) {
			setdataDuration += duration
			setdataCount++
			scheduleViewUpdate()
		}
	}
	var setLoadEventEnd = function (type) {
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
			isActive = false
		}
		scheduleViewUpdate()
	}
	function triggerViewUpdate() {
		documentVersion += 1
		lifeCycle.notify(LifeCycleEventType.VIEW_UPDATED, {
			documentVersion: documentVersion,
			eventCounts: eventCounts,
			id: id,
			loadingTime: loadingDuration,
			stayTime,
			onload2onshowTime,
			onshow2onready,
			setdataDuration,
			setdataCount,
			fmp,
			fpt,
			startTime: startTime,
			route: route,
			duration: now() - startTime,
			isActive: isActive,
		})
	}
	return {
		scheduleUpdate: scheduleViewUpdate,
		setLoadEventEnd,
		updatesetDataTime,
		triggerUpdate: function () {
			// cancel any pending view updates execution
			cancelScheduleViewUpdate()
			triggerViewUpdate()
		},
		end: function () {
			stopEventCountsTracking()
			stopFptTracking()
			cancelScheduleViewUpdate()
			stopSetDataTracking()
			stopLoadingTimeTracking()
			lifeCycle.notify(LifeCycleEventType.VIEW_ENDED, { endClocks: now() })
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
function trackLoadingTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			const navigationEnity = entitys.find(
				(entity) => entity.entryType === 'navigation',
			)
			if (typeof navigationEnity !== 'undefined') {
				callback(navigationEnity.duration)
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function trackSetDataTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		LifeCycleEventType.PAGE_SET_DATA_UPDATE,
		function (data) {
			if (!data) return
			callback(data.updateEndTimestamp - data.pendingStartTimestamp)
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
