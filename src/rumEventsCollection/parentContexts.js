import { ONE_MINUTE, ONE_HOUR } from '../helper/enums'
import { now } from '../helper/utils'
import { LifeCycleEventType } from '../core/lifeCycle'
export var VIEW_CONTEXT_TIME_OUT_DELAY = 4 * ONE_HOUR
export var CLEAR_OLD_CONTEXTS_INTERVAL = ONE_MINUTE

export function startParentContexts(lifeCycle) {
	var currentView
	var currentAction
	var previousViews = []
	var previousActions = []
	lifeCycle.subscribe(
		LifeCycleEventType.VIEW_CREATED,
		function (currentContext) {
			currentView = currentContext
		},
	)

	lifeCycle.subscribe(
		LifeCycleEventType.VIEW_UPDATED,
		function (currentContext) {
			// A view can be updated after its end.  We have to ensure that the view being updated is the
			// most recently created.
			if (currentView && currentView.id === currentContext.id) {
				currentView = currentContext
			}
		},
	)
	lifeCycle.subscribe(LifeCycleEventType.VIEW_ENDED, function (data) {
		if (currentView) {
			previousViews.unshift({
				endTime: data.endClocks,
				context: buildCurrentViewContext(),
				startTime: currentView.startTime,
			})
			currentView = undefined
		}
	})
	lifeCycle.subscribe(
		LifeCycleEventType.AUTO_ACTION_CREATED,
		function (currentContext) {
			currentAction = currentContext
		},
	)

	lifeCycle.subscribe(
		LifeCycleEventType.AUTO_ACTION_COMPLETED,
		function (action) {
			if (currentAction) {
				previousActions.unshift({
					context: buildCurrentActionContext(),
					endTime: currentAction.startClocks + action.duration,
					startTime: currentAction.startClocks,
				})
			}
			currentAction = undefined
		},
	)

	lifeCycle.subscribe(LifeCycleEventType.AUTO_ACTION_DISCARDED, function () {
		currentAction = undefined
	})
	lifeCycle.subscribe(LifeCycleEventType.SESSION_RENEWED, function () {
		previousViews = []
		previousActions = []
		currentView = undefined
		currentAction = undefined
	})
	var clearOldContextsInterval = setInterval(function () {
		clearOldContexts(previousViews, VIEW_CONTEXT_TIME_OUT_DELAY)
	}, CLEAR_OLD_CONTEXTS_INTERVAL)

	function clearOldContexts(previousContexts, timeOutDelay) {
		var oldTimeThreshold = now() - timeOutDelay
		while (
			previousContexts.length > 0 &&
			previousContexts[previousContexts.length - 1].startTime < oldTimeThreshold
		) {
			previousContexts.pop()
		}
	}
	function buildCurrentActionContext() {
		return { userAction: { id: currentAction.id } }
	}
	function buildCurrentViewContext() {
		return {
			page: {
				id: currentView.id,
				referer:
					(previousViews.length &&
						previousViews[previousViews.length - 1].context.page.route) ||
					undefined,
				route: currentView.route,
			},
		}
	}

	function findContext(
		buildContext,
		previousContexts,
		currentContext,
		startTime,
	) {
		if (startTime === undefined) {
			return currentContext ? buildContext() : undefined
		}
		if (currentContext && startTime >= currentContext.startTime) {
			return buildContext()
		}
		var flag = undefined
		previousContexts.forEach(function (previousContext) {
			if (startTime > previousContext.endTime) {
				return false
			}
			if (startTime >= previousContext.startTime) {
				flag = previousContext.context
				return false
			}
		})
		return flag
	}

	var parentContexts = {
		findView: function (startTime) {
			return findContext(
				buildCurrentViewContext,
				previousViews,
				currentView,
				startTime,
			)
		},
		findAction: function (startTime) {
			return findContext(
				buildCurrentActionContext,
				previousActions,
				currentAction,
				startTime,
			)
		},

		stop: function () {
			clearInterval(clearOldContextsInterval)
		},
	}
	return parentContexts
}
