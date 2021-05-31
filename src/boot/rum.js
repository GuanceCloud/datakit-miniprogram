import { buildEnv } from './buildEnv'
import { LifeCycle } from '../core/lifeCycle'
import { commonInit } from '../core/configuration'
import { startErrorCollection } from '../rumEventsCollection/error/errorCollection'
import { startRumAssembly } from '../rumEventsCollection/assembly'
import { startParentContexts } from '../rumEventsCollection/parentContexts'
import { startRumBatch } from '../rumEventsCollection/transport/batch'
import { startViewCollection } from '../rumEventsCollection/page/viewCollection'
import { startRequestCollection } from '../rumEventsCollection/requestCollection'
import { startResourceCollection } from '../rumEventsCollection/resource/resourceCollection'
import { startAppCollection } from '../rumEventsCollection/app/appCollection'
import { startPagePerformanceObservable } from '../rumEventsCollection/performanceCollection'
import { startSetDataColloction } from '../rumEventsCollection/setDataCollection'
import { startActionCollection } from '../rumEventsCollection/action/actionCollection'

import { sdk } from '../core/sdk'
export const startRum = function (userConfiguration) {
	const configuration = commonInit(userConfiguration, buildEnv)
	const lifeCycle = new LifeCycle()
	var parentContexts = startParentContexts(lifeCycle)
	var batch = startRumBatch(configuration, lifeCycle)
	startRumAssembly(
		userConfiguration.applicationId,
		configuration,
		lifeCycle,
		parentContexts,
	)
	startAppCollection(lifeCycle, configuration)
	startResourceCollection(lifeCycle, configuration)
	startViewCollection(lifeCycle, configuration)
	startErrorCollection(lifeCycle, configuration)
	startRequestCollection(lifeCycle, configuration)
	startPagePerformanceObservable(lifeCycle, configuration)
	startSetDataColloction(lifeCycle)
	startActionCollection(lifeCycle, configuration)
}
