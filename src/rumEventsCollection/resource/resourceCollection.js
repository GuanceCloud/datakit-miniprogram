import {
	computePerformanceResourceDuration,
	computePerformanceResourceDetails,
	computeSize,
} from './resourceUtils'
import { LifeCycleEventType } from '../../core/lifeCycle'
import { msToNs, extend2Lev, urlParse } from '../../helper/utils'
import { RumEventType } from '../../helper/enums'
export function startResourceCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(LifeCycleEventType.REQUEST_COMPLETED, function (request) {
		lifeCycle.notify(
			LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processRequest(request),
		)
	})
}
function getStatusGroup(status) {
	if (!status) return status
	return (
		String(status).substr(0, 1) + String(status).substr(1).replace(/\d*/g, 'x')
	)
}
function processRequest(request) {
	var type = request.type

	var timing = request.performance
	var correspondingTimingOverrides = timing
		? computePerformanceEntryMetricsV2(timing)
		: undefined
	var urlObj = urlParse(request.url).getParse()
	var startTime = request.startTime
	var resourceEvent = extend2Lev(
		{
			date: startTime,
			resource: {
				type: type,
				load: msToNs(request.duration),
				method: request.method,
				status: request.status,
				statusGroup: getStatusGroup(request.status),
				url: request.url,
				urlHost: urlObj.Host,
				urlPath: urlObj.Path,
				responseHeader: request.responseHeader,
				responseConnection: request.responseConnection,
				responseServer: request.responseServer,
				responseContentType: request.responseContentType,
				responseContentEncoding: request.responseContentEncoding,
			},
			type: RumEventType.RESOURCE,
		},
		correspondingTimingOverrides,
	)
	return { startTime: startTime, rawRumEvent: resourceEvent }
}
function computePerformanceEntryMetricsV2(timing) {
	return {
		resource: extend2Lev(
			{},
			{
				load: computePerformanceResourceDuration(timing),
				size: computeSize(timing),
			},
			computePerformanceResourceDetails(timing),
		),
	}
}
