import { isPercentage } from '../helper/utils'
import { startRum } from './rum'
export const makeRum = function (startRumImpl) {
	var isAlreadyInitialized = false
	var rumGlobal = {
		init: function (userConfiguration) {
			if (typeof userConfiguration === 'undefined') {
				userConfiguration = {}
			}
			if (!canInitRum(userConfiguration)) {
				return
			}
			startRumImpl(userConfiguration)

			isAlreadyInitialized = true
		},
	}
	return rumGlobal
	function canInitRum(userConfiguration) {
		if (isAlreadyInitialized) {
			console.error('DATAFLUX_RUM is already initialized.')
			return false
		}

		if (!userConfiguration.applicationId) {
			console.error(
				'Application ID is not configured, no RUM data will be collected.',
			)
			return false
		}
		if (!userConfiguration.datakitOrigin) {
			console.error(
				'datakitOrigin is not configured, no RUM data will be collected.',
			)
			return false
		}
		if (
			userConfiguration.sampleRate !== undefined &&
			!isPercentage(userConfiguration.sampleRate)
		) {
			console.error('Sample Rate should be a number between 0 and 100')
			return false
		}
		return true
	}
}
export const datafluxRum = makeRum(startRum)
