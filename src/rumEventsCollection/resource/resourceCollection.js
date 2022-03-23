import {
	computePerformanceResourceDuration,
	computePerformanceResourceDetails,
	computeSize,
} from './resourceUtils'
import { LifeCycleEventType } from '../../core/lifeCycle'
import {
	msToNs,
	extend2Lev,
	urlParse,
	getQueryParamsFromUrl,
	replaceNumberCharByPath,
	jsonStringify,
	getStatusGroup,
	UUID
} from '../../helper/utils'
import { RumEventType } from '../../helper/enums'
export function startResourceCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(LifeCycleEventType.REQUEST_COMPLETED, function (request) {
		lifeCycle.notify(
			LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processRequest(request),
		)
	})
}

function processRequest(request) {
	var type = request.type
	var timing = request.performance
	var correspondingTimingOverrides = timing
		? computePerformanceEntryMetrics(timing)
		: undefined
	var tracingInfo = computeRequestTracingInfo(request)
	var urlObj = urlParse(request.url).getParse()
	var startTime = request.startTime
	var resourceEvent = extend2Lev(
		{
			date: startTime,
			resource: {
				type: type,
				duration: msToNs(request.duration),
				method: request.method,
				status: request.status,
				statusGroup: getStatusGroup(request.status),
				url: request.url,
				urlHost: urlObj.Host,
				urlPath: urlObj.Path,
				urlPathGroup: replaceNumberCharByPath(urlObj.Path),
				urlQuery: jsonStringify(getQueryParamsFromUrl(request.url)),
			},
			type: RumEventType.RESOURCE,
		},
		tracingInfo,
		correspondingTimingOverrides,
	)
	return { startTime: startTime, rawRumEvent: resourceEvent }
}
function computeRequestTracingInfo(request) {
  var hasBeenTraced = request.traceId && request.spanId
  if (!hasBeenTraced) {
    return undefined
  }
  return {
    _dd: {
      spanId: request.spanId,
      traceId: request.traceId
    },
    resource: { id: UUID() }
  }
}
function computePerformanceEntryMetrics(timing) {
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
