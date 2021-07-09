import { extend2Lev, urlParse } from '../helper/utils'
import { ONE_KILO_BYTE, ONE_SECOND } from '../helper/enums'
var TRIM_REGIX = /^\s+|\s+$/g
export var DEFAULT_CONFIGURATION = {
	sampleRate: 100,
	flushTimeout: 30 * ONE_SECOND,
	maxErrorsByMinute: 3000,
	/**
	 * Logs intake limit
	 */
	maxBatchSize: 50,
	maxMessageSize: 256 * ONE_KILO_BYTE,

	/**
	 * beacon payload max queue size implementation is 64kb
	 * ensure that we leave room for logs, rum and potential other users
	 */
	batchBytesLimit: 16 * ONE_KILO_BYTE,
	datakitUrl: '',
	/**
	 * arbitrary value, byte precision not needed
	 */
	requestErrorResponseLengthLimit: 32 * ONE_KILO_BYTE,
	trackInteractions: false,
}
function trim(str) {
	return str.replace(TRIM_REGIX, '')
}
function getDatakitUrlUrl(url) {
	if (url && url.lastIndexOf('/') === url.length - 1)
		return trim(url) + 'v1/write/rum'
	return trim(url) + '/v1/write/rum'
}
export function commonInit(userConfiguration, buildEnv) {
	var transportConfiguration = {
		applicationId: userConfiguration.applicationId,
		env: userConfiguration.env || '',
		version: userConfiguration.version || '',
		sdkVersion: buildEnv.sdkVersion,
		sdkName: buildEnv.sdkName,
		datakitUrl: getDatakitUrlUrl(
			userConfiguration.datakitUrl || userConfiguration.datakitOrigin,
		),
		tags: userConfiguration.tags || [],
	}
	if ('trackInteractions' in userConfiguration) {
		transportConfiguration.trackInteractions = !!userConfiguration.trackInteractions
	}
	return extend2Lev(DEFAULT_CONFIGURATION, transportConfiguration)
}
const haveSameOrigin = function (url1, url2) {
	const parseUrl1 = urlParse(url1).getParse()
	const parseUrl2 = urlParse(url2).getParse()
	return parseUrl1.Origin === parseUrl2.Origin
}
export function isIntakeRequest(url, configuration) {
	return haveSameOrigin(url, configuration.datakitUrl)
}
