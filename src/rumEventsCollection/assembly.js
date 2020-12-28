import { extend2Lev, withSnakeCaseKeys, performDraw } from '../helper/utils'
import { LifeCycleEventType } from '../core/lifeCycle'
import baseInfo from '../core/baseInfo'
function isTracked(configuration) {
	return performDraw(configuration.sampleRate)
}
export function startRumAssembly(
	applicationId,
	configuration,
	lifeCycle,
	parentContexts,
) {
	lifeCycle.subscribe(
		LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var startTime = data.startTime
			var rawRumEvent = data.rawRumEvent
			var viewContext = parentContexts.findViewV2(startTime)

			var deviceContext = {
				device: baseInfo.deviceInfo,
			}
			if (
				isTracked(configuration) &&
				(viewContext || rawRumEvent.type === 'app')
			) {
				var rumContext = {
					_dd: {
						sdkName: configuration.sdkName,
						sdkVersion: configuration.sdkVersion,
						env: configuration.env,
						version: configuration.version,
					},
					tags: configuration.tags,
					application: {
						id: applicationId,
					},
					device: {},
					date: new Date().getTime(),
					user: {
						originId: baseInfo.getSessionId(),
						user_id: configuration.user_id || baseInfo.getClientID(),
						is_signin: configuration.user_id ? 'T' : 'F',
					},
				}

				var rumEvent = extend2Lev(
					rumContext,
					deviceContext,
					viewContext,
					rawRumEvent,
				)

				var serverRumEvent = withSnakeCaseKeys(rumEvent)
				lifeCycle.notify(LifeCycleEventType.RUM_EVENT_COLLECTED, {
					rumEvent: rumEvent,
					serverRumEvent: serverRumEvent,
				})
			}
		},
	)
}
