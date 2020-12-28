import { startAutomaticErrorCollection } from '../../core/errorCollection'
import { RumEventType } from '../../helper/enums'
import { LifeCycleEventType } from '../../core/lifeCycle'

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
	var rawRumEvent = {
		date: error.startTime,
		error: {
			message: error.message,
			resource: error.resource,
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
