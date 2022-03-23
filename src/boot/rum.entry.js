import { isPercentage, extend2Lev, createContextManager } from '../helper/utils'
import { startRum } from './rum'

export const makeRum = function (startRumImpl) {
	var isAlreadyInitialized = false
	var globalContextManager = createContextManager()
  var user = {}
	function clonedCommonContext() {
    return extend2Lev(
      {},
      {
        context: globalContextManager.get(),
        user: user
      }
    )
  }
	var rumGlobal = {
		init: function (userConfiguration) {
			if (typeof userConfiguration === 'undefined') {
				userConfiguration = {}
			}
			if (!canInitRum(userConfiguration)) {
				return
			}
			startRumImpl(userConfiguration, function () {
        return {
          user: user,
          context: globalContextManager.get()
        }
      })
			isAlreadyInitialized = true
		},
		addRumGlobalContext: globalContextManager.add,
    removeRumGlobalContext: globalContextManager.remove,
    getRumGlobalContext: globalContextManager.get,
    setRumGlobalContext: globalContextManager.set,
		setUser: function (newUser) {
      var sanitizedUser = sanitizeUser(newUser)
      if (sanitizedUser) {
        user = sanitizedUser
      } else {
        console.error('Unsupported user:', newUser)
      }
    },
    removeUser: function () {
      user = {}
    }
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
	function sanitizeUser(newUser) {
    if (typeof newUser !== 'object' || !newUser) {
      return
    }
    var result = extend2Lev({}, newUser)
    if ('id' in result) {
      result.id = String(result.id)
    }
    if ('name' in result) {
      result.name = String(result.name)
    }
    if ('email' in result) {
      result.email = String(result.email)
    }
    return result
  }
}
export const datafluxRum = makeRum(startRum)
