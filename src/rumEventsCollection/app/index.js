import { now, areInOrder, UUID } from '../../helper/utils'
import { LifeCycleEventType } from '../../core/lifeCycle'

// 劫持原小程序App方法
export var THROTTLE_VIEW_UPDATE_PERIOD = 3000
export const startupTypes = {
	COLD: 'cold',
	HOT: 'hot',
}
export function rewriteApp(configuration, lifeCycle) {
	const originApp = App
	var appInfo = {
		isStartUp: false, // 是否启动
	}
	var startTime
	App = function (app) {
		startTime = now()
		// 合并方法，插入记录脚本
		;['onLaunch', 'onShow', 'onHide'].forEach((methodName) => {
			const userDefinedMethod = app[methodName] // 暂存用户定义的方法
			app[methodName] = function (options) {
				console.log(methodName, 'methodName app')
				if (methodName === 'onLaunch') {
					appInfo.isStartUp = true
					appInfo.isHide = false
					appInfo.startupType = startupTypes.COLD
				} else if (methodName === 'onShow') {
					if (appInfo.isStartUp && appInfo.isHide) {
						// 判断是热启动
						appInfo.startupType = startupTypes.HOT
						// appUpdate()
					}
				} else if (methodName === 'onHide') {
					lifeCycle.notify(LifeCycleEventType.APP_HIDE)
					appInfo.isHide = true
				}
				return userDefinedMethod && userDefinedMethod.call(this, options)
			}
		})
		return originApp(app)
	}

	startPerformanceObservable(lifeCycle)
}

function startPerformanceObservable(lifeCycle) {
	var subscribe = lifeCycle.subscribe(
		LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			// 过滤掉其他页面监听，只保留首次启动
			var codeDownloadDuration
			const launchEntity = entitys.find(
				(entity) =>
					entity.entryType === 'navigation' &&
					entity.navigationType === 'appLaunch',
			)
			if (typeof launchEntity !== 'undefined') {
				lifeCycle.notify(LifeCycleEventType.APP_UPDATE, {
					startTime: launchEntity.startTime,
					name: '启动',
					type: 'launch',
					id: UUID(),
					duration: launchEntity.duration,
				})
			}
			const scriptentity = entitys.find(
				(entity) =>
					entity.entryType === 'script' && entity.name === 'evaluateScript',
			)
			if (typeof scriptentity !== 'undefined') {
				lifeCycle.notify(LifeCycleEventType.APP_UPDATE, {
					startTime: scriptentity.startTime,
					name: '脚本注入',
					type: 'script_insert',
					id: UUID(),
					duration: scriptentity.duration,
				})
			}
			const firstEntity = entitys.find(
				(entity) =>
					entity.entryType === 'render' && entity.name === 'firstRender',
			)
			if (firstEntity && scriptentity && launchEntity) {
				if (
					!areInOrder(firstEntity.duration, launchEntity.duration) ||
					!areInOrder(scriptentity.duration, launchEntity.duration)
				) {
					return
				}
				codeDownloadDuration =
					launchEntity.duration - firstEntity.duration - scriptentity.duration
				// 资源下载耗时
				lifeCycle.notify(LifeCycleEventType.APP_UPDATE, {
					startTime: launchEntity.startTime,
					name: '小程序包下载',
					type: 'package_download',
					id: UUID(),
					duration: codeDownloadDuration,
				})
				// 资源下载时间暂时定为：首次启动时间-脚本加载时间-初次渲染时间
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
