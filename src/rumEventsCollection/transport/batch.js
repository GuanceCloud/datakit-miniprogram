import { LifeCycleEventType } from '../../core/lifeCycle'
import { Batch, HttpRequest } from '../../core/transport'
import { RumEventType } from '../../helper/enums'
export function startRumBatch(configuration, lifeCycle) {
	var batch = makeRumBatch(configuration, lifeCycle)
	lifeCycle.subscribe(
		LifeCycleEventType.RUM_EVENT_COLLECTED,
		function (serverRumEvent) {
			if (serverRumEvent.type === RumEventType.VIEW) {
				batch.upsert(serverRumEvent, serverRumEvent.page.id)
			} else {
				batch.add(serverRumEvent)
			}
		},
	)
	return {
		stop: function () {
			batch.stop()
		},
	}
}

function makeRumBatch(configuration, lifeCycle) {
	var primaryBatch = createRumBatch(configuration.datakitUrl, lifeCycle)

	function createRumBatch(endpointUrl, lifeCycle) {
		return new Batch(
			new HttpRequest(endpointUrl, configuration.batchBytesLimit),
			configuration.maxBatchSize,
			configuration.batchBytesLimit,
			configuration.maxMessageSize,
			configuration.flushTimeout,
			lifeCycle,
		)
	}

	var stopped = false
	return {
		add: function (message) {
			if (stopped) {
				return
			}
			primaryBatch.add(message)
		},
		stop: function () {
			stopped = true
		},
		upsert: function (message, key) {
			if (stopped) {
				return
			}
			primaryBatch.upsert(message, key)
		},
	}
}
