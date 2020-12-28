import { noop } from '../helper/utils'
import { RumEventType } from '../helper/enums'
import { LifeCycleEventType } from '../core/lifeCycle'

export function trackEventCounts(lifeCycle, callback) {
	if (typeof callback === 'undefined') {
		callback = noop
	}
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
	}

	var subscription = lifeCycle.subscribe(
		LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var rawRumEvent = data.rawRumEvent
			switch (rawRumEvent.type) {
				case RumEventType.ERROR:
					eventCounts.errorCount += 1
					callback(eventCounts)
					break
				case RumEventType.RESOURCE:
					eventCounts.resourceCount += 1
					callback(eventCounts)
					break
			}
		},
	)

	return {
		stop: function () {
			subscription.unsubscribe()
		},
		eventCounts: eventCounts,
	}
}
