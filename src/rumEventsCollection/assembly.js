import { extend2Lev, withSnakeCaseKeys, performDraw, isEmptyObject } from '../helper/utils'
import { LifeCycleEventType } from '../core/lifeCycle'
import { RumEventType } from '../helper/enums'
import baseInfo from '../core/baseInfo'
function isTracked(configuration) {
	return performDraw(configuration.sampleRate)
}
var SessionType = {
	SYNTHETICS: 'synthetics',
	USER: 'user',
}
export function startRumAssembly(
	applicationId,
	configuration,
	lifeCycle,
	parentContexts,
	getCommonContext
) {
	lifeCycle.subscribe(
		LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var startTime = data.startTime
			var rawRumEvent = data.rawRumEvent
			var viewContext = parentContexts.findView(startTime)
			var savedCommonContext = data.savedGlobalContext
      var customerContext = data.customerContext
			var deviceContext = {
				device: baseInfo.deviceInfo,
			}
			if (
				isTracked(configuration) &&
				(viewContext || rawRumEvent.type === RumEventType.APP)
			) {
				var actionContext = parentContexts.findAction(startTime)
				var commonContext = savedCommonContext || getCommonContext()
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
					session: {
						id: baseInfo.getSessionId(),
						type: SessionType.USER,
					},
					user: {
						id: configuration.user_id || baseInfo.getClientID(),
						is_signin: configuration.user_id ? 'T' : 'F',
					},
				}

				var rumEvent = extend2Lev(
					rumContext,
					deviceContext,
					viewContext,
					actionContext,
					rawRumEvent,
				)

				var serverRumEvent = withSnakeCaseKeys(rumEvent)
				var context = extend2Lev(commonContext.context, customerContext)
        if (!isEmptyObject(context)) {
          serverRumEvent.tags = context
        }
				if (!isEmptyObject(commonContext.user)) {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          serverRumEvent.user = extend2Lev(
            {
              id: baseInfo.getClientID(),
              is_signin: 'T'
            },
            commonContext.user
          )
        }
				lifeCycle.notify(LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent)
			}
		},
	)
}
