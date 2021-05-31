import { sdk } from '../core/sdk'
import { UUID } from '../helper/utils'
import { CLIENT_ID_TOKEN } from '../helper/enums'
class BaseInfo {
	constructor() {
		this.sessionId = UUID()
		this.getDeviceInfo()
		this.getNetWork()
	}
	getDeviceInfo() {
		try {
			const deviceInfo = sdk.getSystemInfoSync()
			var osInfo = deviceInfo.system.split(' ')
			var osVersion = osInfo.length > 1 && osInfo[1]
			var osVersionMajor =
				osVersion.split('.').length && osVersion.split('.')[0]
			var deviceUUid = ''
			if (deviceInfo.host) {
				deviceUUid = deviceInfo.host.appId
			}
			this.deviceInfo = {
				screenSize: `${deviceInfo.screenWidth}*${deviceInfo.screenHeight} `,
				platform: deviceInfo.platform,
				platformVersion: deviceInfo.version,
				osVersion: osVersion,
				osVersionMajor: osVersionMajor,
				os: osInfo.length > 1 && osInfo[0],
				brand: deviceInfo.brand,
				model: deviceInfo.model,
				frameworkVersion: deviceInfo.SDKVersion,
				pixelRatio: deviceInfo.pixelRatio,
				deviceUuid: deviceUUid,
			}
		} catch (e) {}
	}
	getClientID() {
		var clienetId = sdk.getStorageSync(CLIENT_ID_TOKEN)
		if (!clienetId) {
			clienetId = UUID()
			sdk.setStorageSync(CLIENT_ID_TOKEN, clienetId)
		}
		return clienetId
	}
	getNetWork() {
		sdk.getNetworkType({
			success: (e) => {
				this.deviceInfo.network = e.networkType ? e.networkType : 'unknown'
			},
		})
		sdk.onNetworkStatusChange((e) => {
			this.deviceInfo.network = e.networkType ? e.networkType : 'unknown'
		})
	}
	getSessionId() {
		return this.sessionId
	}
}

export default new BaseInfo()
