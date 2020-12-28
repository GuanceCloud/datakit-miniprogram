import { rewritePage } from './index'
import { RumEventType } from '../../helper/enums'
import { msToNs } from '../../helper/utils'
import { LifeCycleEventType } from '../../core/lifeCycle'
export function startViewCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(LifeCycleEventType.VIEW_UPDATED, function (view) {
		lifeCycle.notify(
			LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processViewUpdate(view),
		)
	})

	return rewritePage(configuration, lifeCycle)
}
function processViewUpdate(view) {
	var apdexLevel
	if (view.fmp) {
		apdexLevel = parseInt(Number(view.fmp) / 1000)
		apdexLevel = apdexLevel > 9 ? 9 : apdexLevel
	}
	var viewEvent = {
		_dd: {
			documentVersion: view.documentVersion,
		},
		date: view.startTime,
		type: RumEventType.VIEW,
		page: {
			// action: {
			//   count: view.eventCounts.userActionCount
			// },

			error: {
				count: view.eventCounts.errorCount,
			},
			// firstInputDelay: msToNs(view.timings.firstInputDelay),
			loadingTime: msToNs(view.loadingTime),
			stayTime: msToNs(view.stayTime),
			onload2onshow: msToNs(view.onload2onshowTime),
			onshow2onready: msToNs(view.onshow2onready),
			fpt: msToNs(view.fpt),
			fmp: msToNs(view.fmp),
			apdexLevel,
			// longTask: {
			//   count: view.eventCounts.longTaskCount
			// },
			// resource: {
			//   count: view.eventCounts.resourceCount
			// },
			timeSpent: msToNs(view.duration),
		},
	}
	return {
		rawRumEvent: viewEvent,
		startTime: view.startTime,
	}
}
