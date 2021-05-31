import { LifeCycleEventType } from '../core/lifeCycle'

export function startSetDataColloction(lifeCycle) {
	const originPage = Page
	const originComponent = Component
	Page = function (page) {
		const originPageOnLoad = page['onLoad']
		page['onLoad'] = function () {
			this.setUpdatePerformanceListener &&
				this.setUpdatePerformanceListener({ withDataPaths: true }, (res) => {
					lifeCycle.notify(LifeCycleEventType.PAGE_SET_DATA_UPDATE, res)
				})
			return originPageOnLoad.apply(this, arguments)
		}
		return originPage(page)
	}
	Component = function (component) {
		const originComponentAttached = component['attached']
		component['attached'] = function () {
			this.setUpdatePerformanceListener &&
				this.setUpdatePerformanceListener({ withDataPaths: true }, (res) => {
					lifeCycle.notify(LifeCycleEventType.PAGE_SET_DATA_UPDATE, res)
				})
			return originComponentAttached.apply(this, arguments)
		}
		return originComponent(component)
	}
}
