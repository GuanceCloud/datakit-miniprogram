import { elapsed, now, UUID, getMethods, isObject } from '../../helper/utils'
import { LifeCycleEventType } from '../../core/lifeCycle'
import { MinaTouch } from '../../core/miniaTouch'
import { trackEventCounts } from '../trackEventCounts'
import { waitIdlePageActivity } from '../trackPageActiveites'
import { ActionType } from '../../helper/enums'
export function trackActions(lifeCycle) {
	var action = startActionManagement(lifeCycle)

	// New views trigger the discard of the current pending Action
	lifeCycle.subscribe(LifeCycleEventType.VIEW_CREATED, function () {
		action.discardCurrent()
	})
	var originPage = Page
	Page = function (page) {
		const methods = getMethods(page)
		methods.forEach((methodName) => {
			clickProxy(page, methodName, function (_action) {
				action.create(_action.type, _action.name)
			})
		})
		return originPage(page)
	}
	var originComponent = Component
	Component = function (component) {
		const methods = getMethods(component)
		methods.forEach((methodName) => {
			clickProxy(component, methodName, function (_action) {
				action.create(_action.type, _action.name)
			})
		})
		return originComponent(component)
	}
	return {
		stop: function () {
			action.discardCurrent()
			// stopListener()
		},
	}
}
function clickProxy(page, methodName, callback) {
	var oirginMethod = page[methodName]
	page[methodName] = function () {
		var action = {}
		if (isObject(arguments[0])) {
			var currentTarget = arguments[0].currentTarget || {}
			var dataset = currentTarget.dataset || {}
			var actionType = arguments[0].type
			if (actionType && ActionType[actionType]) {
				action.type = actionType
				action.name = dataset.name || dataset.content || dataset.type
				callback(action)
			}
		}
		return oirginMethod.apply(this, arguments)
	}
}
function startActionManagement(lifeCycle) {
	var currentAction
	var currentIdlePageActivitySubscription

	return {
		create: function (type, name) {
			if (currentAction) {
				// Ignore any new action if another one is already occurring.
				return
			}
			var pendingAutoAction = new PendingAutoAction(lifeCycle, type, name)

			currentAction = pendingAutoAction
			currentIdlePageActivitySubscription = waitIdlePageActivity(
				lifeCycle,
				function (params) {
					if (params.hadActivity) {
						pendingAutoAction.complete(params.endTime)
					} else {
						pendingAutoAction.discard()
					}
					currentAction = undefined
				},
			)
		},
		discardCurrent: function () {
			if (currentAction) {
				currentIdlePageActivitySubscription.stop()
				currentAction.discard()
				currentAction = undefined
			}
		},
	}
}
var PendingAutoAction = function (lifeCycle, type, name) {
	this.id = UUID()
	this.startClocks = now()
	this.name = name
	this.type = type
	this.lifeCycle = lifeCycle
	this.eventCountsSubscription = trackEventCounts(lifeCycle)
	this.lifeCycle.notify(LifeCycleEventType.AUTO_ACTION_CREATED, {
		id: this.id,
		startClocks: this.startClocks,
	})
}
PendingAutoAction.prototype = {
	complete: function (endTime) {
		var eventCounts = this.eventCountsSubscription.eventCounts
		this.lifeCycle.notify(LifeCycleEventType.AUTO_ACTION_COMPLETED, {
			counts: {
				errorCount: eventCounts.errorCount,
				longTaskCount: eventCounts.longTaskCount,
				resourceCount: eventCounts.resourceCount,
			},
			duration: elapsed(this.startClocks, endTime),
			id: this.id,
			name: this.name,
			startClocks: this.startClocks,
			type: this.type,
		})
		this.eventCountsSubscription.stop()
	},
	discard: function () {
		this.lifeCycle.notify(LifeCycleEventType.AUTO_ACTION_DISCARDED)
		this.eventCountsSubscription.stop()
	},
}
