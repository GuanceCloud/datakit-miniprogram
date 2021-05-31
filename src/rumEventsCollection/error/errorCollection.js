import { startAutomaticErrorCollection } from '../../core/errorCollection'
import { RumEventType } from '../../helper/enums'
import { LifeCycleEventType } from '../../core/lifeCycle'
import {
	urlParse,
	replaceNumberCharByPath,
	getStatusGroup,
} from '../../helper/utils'
export function startErrorCollection(lifeCycle, configuration) {
	return doStartErrorCollection(
		lifeCycle,
		configuration,
		startAutomaticErrorCollection(configuration),
	)
}

export function doStartErrorCollection(lifeCycle, configuration, observable) {
	observable.subscribe(function (error) {
		lifeCycle.notify(
			LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processError(error),
		)
	})
}

function processError(error) {
	var resource = error.resource
	if (resource) {
		var urlObj = urlParse(error.resource.url).getParse()
		resource = {
			method: error.resource.method,
			status: error.resource.statusCode,
			statusGroup: getStatusGroup(error.resource.statusCode),
			url: error.resource.url,
			urlHost: urlObj.Host,
			urlPath: urlObj.Path,
			urlPathGroup: replaceNumberCharByPath(urlObj.Path),
		}
	}
	var rawRumEvent = {
		date: error.startTime,
		error: {
			message: error.message,
			resource: resource,
			source: error.source,
			stack: error.stack,
			type: error.type,
			starttime: error.startTime,
		},
		type: RumEventType.ERROR,
	}
	return {
		rawRumEvent: rawRumEvent,
		startTime: error.startTime,
	}
}
