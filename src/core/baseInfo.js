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
		const deviceInfo = sdk.getSystemInfoSync()
		var osInfo = deviceInfo.system.split(' ')
		this.deviceInfo = {
			screenSize: `${deviceInfo.screenWidth}*${deviceInfo.screenHeight} `,
			platform: deviceInfo.platform,
			platformVersion: deviceInfo.version,
			osVersion: osInfo.length > 1 && osInfo[1],
			os: osInfo.length > 1 && osInfo[0],
			brand: deviceInfo.brand,
			model: deviceInfo.model,
			frameworkVersion: deviceInfo.SDKVersion,
			pixelRatio: deviceInfo.pixelRatio,
		}
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
