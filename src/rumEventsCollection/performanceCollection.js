import { LifeCycleEventType } from '../core/lifeCycle'
import { sdk } from '../core/sdk'
export function startPagePerformanceObservable(lifeCycle, configuration) {
	if (!!sdk.getPerformance) {
		const performance = sdk.getPerformance()
		const observer = performance.createObserver((entryList) => {
			lifeCycle.notify(
				LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
				entryList.getEntries(),
			)
		})
		observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
	}
}
