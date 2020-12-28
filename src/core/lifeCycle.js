export class LifeCycle {
	constructor() {
		this.callbacks = {}
	}
	notify(eventType, data) {
		const eventCallbacks = this.callbacks[eventType]
		if (eventCallbacks) {
			eventCallbacks.forEach((callback) => callback(data))
		}
	}
	subscribe(eventType, callback) {
		if (!this.callbacks[eventType]) {
			this.callbacks[eventType] = []
		}
		this.callbacks[eventType].push(callback)
		return {
			unsubscribe: () => {
				this.callbacks[eventType] = this.callbacks[eventType].filter(
					(other) => callback !== other,
				)
			},
		}
	}
}

export var LifeCycleEventType = {
	PERFORMANCE_ENTRY_COLLECTED: 'PERFORMANCE_ENTRY_COLLECTED',
	APP_HIDE: 'APP_HIDE',
	APP_UPDATE: 'APP_UPDATE',
	VIEW_CREATED: 'VIEW_CREATED',
	VIEW_UPDATED: 'VIEW_UPDATED',
	REQUEST_STARTED: 'REQUEST_STARTED',
	REQUEST_COMPLETED: 'REQUEST_COMPLETED',
	RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
	RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED',
}
