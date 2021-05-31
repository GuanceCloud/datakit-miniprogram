import { msToNs, extend2Lev } from '../../helper/utils'
import { LifeCycleEventType } from '../../core/lifeCycle'
import { RumEventType } from '../../helper/enums'
import { trackActions } from './trackActions'

export function startActionCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(
		LifeCycleEventType.AUTO_ACTION_COMPLETED,
		function (action) {
			lifeCycle.notify(
				LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
				processAction(action),
			)
		},
	)
	if (configuration.trackInteractions) {
		trackActions(lifeCycle)
	}
}

function processAction(action) {
	var autoActionProperties = {
		action: {
			error: {
				count: action.counts.errorCount,
			},
			id: action.id,
			loadingTime: msToNs(action.duration),
			long_task: {
				count: action.counts.longTaskCount,
			},
			resource: {
				count: action.counts.resourceCount,
			},
		},
	}
	var actionEvent = extend2Lev(
		{
			action: {
				target: {
					name: action.name,
				},
				type: action.type,
			},
			date: action.startClocks,
			type: RumEventType.ACTION,
		},
		autoActionProperties,
	)
	return {
		rawRumEvent: actionEvent,
		startTime: action.startClocks,
	}
}
