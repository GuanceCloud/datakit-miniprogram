import { deepMixObject } from '../helper/utils'

function getSDK() {
	var sdk = null,
		tracker = ''
	try {
		if (wx && typeof wx === 'object' && typeof wx.request === 'function') {
			sdk = deepMixObject({}, wx)
			tracker = 'wx'
			wx = sdk
		}
	} catch (err) {
		console.warn('unsupport platform, Fail to start')
	}
	console.log('------get SDK-------')
	return { sdk, tracker }
}
const instance = getSDK()

export const sdk = instance.sdk
export const tracker = instance.tracker
