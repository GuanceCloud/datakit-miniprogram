/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/boot/buildEnv.js":
/*!******************************!*\
  !*** ./src/boot/buildEnv.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildEnv": () => (/* binding */ buildEnv)
/* harmony export */ });
const buildEnv = {
	sdkVersion: '<<< SDK_VERSION >>>',
	sdkName: 'df_miniapp_rum_sdk',
}


/***/ }),

/***/ "./src/boot/rum.entry.js":
/*!*******************************!*\
  !*** ./src/boot/rum.entry.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeRum": () => (/* binding */ makeRum),
/* harmony export */   "datafluxRum": () => (/* binding */ datafluxRum)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _rum__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rum */ "./src/boot/rum.js");


const makeRum = function (startRumImpl) {
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
			!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isPercentage)(userConfiguration.sampleRate)
		) {
			console.error('Sample Rate should be a number between 0 and 100')
			return false
		}
		return true
	}
}
const datafluxRum = makeRum(_rum__WEBPACK_IMPORTED_MODULE_1__.startRum)


/***/ }),

/***/ "./src/boot/rum.js":
/*!*************************!*\
  !*** ./src/boot/rum.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRum": () => (/* binding */ startRum)
/* harmony export */ });
/* harmony import */ var _buildEnv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buildEnv */ "./src/boot/buildEnv.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/configuration */ "./src/core/configuration.js");
/* harmony import */ var _rumEventsCollection_error_errorCollection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../rumEventsCollection/error/errorCollection */ "./src/rumEventsCollection/error/errorCollection.js");
/* harmony import */ var _rumEventsCollection_assembly__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rumEventsCollection/assembly */ "./src/rumEventsCollection/assembly.js");
/* harmony import */ var _rumEventsCollection_parentContexts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../rumEventsCollection/parentContexts */ "./src/rumEventsCollection/parentContexts.js");
/* harmony import */ var _rumEventsCollection_transport_batch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../rumEventsCollection/transport/batch */ "./src/rumEventsCollection/transport/batch.js");
/* harmony import */ var _rumEventsCollection_page_viewCollection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../rumEventsCollection/page/viewCollection */ "./src/rumEventsCollection/page/viewCollection.js");
/* harmony import */ var _rumEventsCollection_requestCollection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../rumEventsCollection/requestCollection */ "./src/rumEventsCollection/requestCollection.js");
/* harmony import */ var _rumEventsCollection_resource_resourceCollection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../rumEventsCollection/resource/resourceCollection */ "./src/rumEventsCollection/resource/resourceCollection.js");
/* harmony import */ var _rumEventsCollection_app_appCollection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../rumEventsCollection/app/appCollection */ "./src/rumEventsCollection/app/appCollection.js");
/* harmony import */ var _rumEventsCollection_performanceCollection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../rumEventsCollection/performanceCollection */ "./src/rumEventsCollection/performanceCollection.js");
/* harmony import */ var _rumEventsCollection_setDataCollection__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../rumEventsCollection/setDataCollection */ "./src/rumEventsCollection/setDataCollection.js");
/* harmony import */ var _rumEventsCollection_action_actionCollection__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../rumEventsCollection/action/actionCollection */ "./src/rumEventsCollection/action/actionCollection.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");
















const startRum = function (userConfiguration) {
	const configuration = (0,_core_configuration__WEBPACK_IMPORTED_MODULE_2__.commonInit)(userConfiguration, _buildEnv__WEBPACK_IMPORTED_MODULE_0__.buildEnv)
	const lifeCycle = new _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycle()
	var parentContexts = (0,_rumEventsCollection_parentContexts__WEBPACK_IMPORTED_MODULE_5__.startParentContexts)(lifeCycle)
	var batch = (0,_rumEventsCollection_transport_batch__WEBPACK_IMPORTED_MODULE_6__.startRumBatch)(configuration, lifeCycle)
	;(0,_rumEventsCollection_assembly__WEBPACK_IMPORTED_MODULE_4__.startRumAssembly)(
		userConfiguration.applicationId,
		configuration,
		lifeCycle,
		parentContexts,
	)
	;(0,_rumEventsCollection_app_appCollection__WEBPACK_IMPORTED_MODULE_10__.startAppCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_resource_resourceCollection__WEBPACK_IMPORTED_MODULE_9__.startResourceCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_page_viewCollection__WEBPACK_IMPORTED_MODULE_7__.startViewCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_error_errorCollection__WEBPACK_IMPORTED_MODULE_3__.startErrorCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_requestCollection__WEBPACK_IMPORTED_MODULE_8__.startRequestCollection)(lifeCycle, configuration)
	;(0,_rumEventsCollection_performanceCollection__WEBPACK_IMPORTED_MODULE_11__.startPagePerformanceObservable)(lifeCycle, configuration)
	;(0,_rumEventsCollection_setDataCollection__WEBPACK_IMPORTED_MODULE_12__.startSetDataColloction)(lifeCycle)
	;(0,_rumEventsCollection_action_actionCollection__WEBPACK_IMPORTED_MODULE_13__.startActionCollection)(lifeCycle, configuration)
}


/***/ }),

/***/ "./src/core/baseInfo.js":
/*!******************************!*\
  !*** ./src/core/baseInfo.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");



class BaseInfo {
	constructor() {
		this.sessionId = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.UUID)()
		this.getDeviceInfo()
		this.getNetWork()
	}
	getDeviceInfo() {
		try {
			const deviceInfo = _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getSystemInfoSync()
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
		var clienetId = _core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getStorageSync(_helper_enums__WEBPACK_IMPORTED_MODULE_2__.CLIENT_ID_TOKEN)
		if (!clienetId) {
			clienetId = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.UUID)()
			_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.setStorageSync(_helper_enums__WEBPACK_IMPORTED_MODULE_2__.CLIENT_ID_TOKEN, clienetId)
		}
		return clienetId
	}
	getNetWork() {
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.getNetworkType({
			success: (e) => {
				this.deviceInfo.network = e.networkType ? e.networkType : 'unknown'
			},
		})
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onNetworkStatusChange((e) => {
			this.deviceInfo.network = e.networkType ? e.networkType : 'unknown'
		})
	}
	getSessionId() {
		return this.sessionId
	}
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new BaseInfo());


/***/ }),

/***/ "./src/core/configuration.js":
/*!***********************************!*\
  !*** ./src/core/configuration.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_CONFIGURATION": () => (/* binding */ DEFAULT_CONFIGURATION),
/* harmony export */   "commonInit": () => (/* binding */ commonInit),
/* harmony export */   "isIntakeRequest": () => (/* binding */ isIntakeRequest)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");


var DEFAULT_CONFIGURATION = {
	sampleRate: 100,
	flushTimeout: 30 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_SECOND,
	maxErrorsByMinute: 3000,
	/**
	 * Logs intake limit
	 */
	maxBatchSize: 50,
	maxMessageSize: 256 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,

	/**
	 * beacon payload max queue size implementation is 64kb
	 * ensure that we leave room for logs, rum and potential other users
	 */
	batchBytesLimit: 16 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
	datakitUrl: '',
	/**
	 * arbitrary value, byte precision not needed
	 */
	requestErrorResponseLengthLimit: 32 * _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_KILO_BYTE,
	trackInteractions: false,
}

function getDatakitUrlUrl(url) {
	if (url && url.lastIndexOf('/') === url.length - 1)
		return url + 'v1/write/rum'
	return url + '/v1/write/rum'
}
function commonInit(userConfiguration, buildEnv) {
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
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(DEFAULT_CONFIGURATION, transportConfiguration)
}
const haveSameOrigin = function (url1, url2) {
	const parseUrl1 = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.urlParse)(url1).getParse()
	const parseUrl2 = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.urlParse)(url2).getParse()
	return parseUrl1.Origin === parseUrl2.Origin
}
function isIntakeRequest(url, configuration) {
	return haveSameOrigin(url, configuration.datakitUrl)
}


/***/ }),

/***/ "./src/core/dataMap.js":
/*!*****************************!*\
  !*** ./src/core/dataMap.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "commonTags": () => (/* binding */ commonTags),
/* harmony export */   "dataMap": () => (/* binding */ dataMap)
/* harmony export */ });
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");

// 需要用双引号将字符串类型的field value括起来， 这里有数组标示[string, path]
var commonTags = {
	sdk_name: '_dd.sdk_name',
	sdk_version: '_dd.sdk_version',
	app_id: 'application.id',
	env: '_dd.env',
	version: '_dd.version',
	userid: 'user.user_id',
	session_id: 'session.id',
	is_signin: 'user.is_signin',
	device: 'device.brand',
	model: 'device.model',
	device_uuid: 'device.device_uuid',
	os: 'device.os',
	os_version: 'device.os_version',
	os_version_major: 'device.os_version_major',
	screen_size: 'device.screen_size',
	network_type: 'device.network_type',
	platform: 'device.platform',
	platform_version: 'device.platform_version',
	app_framework_version: 'device.framework_version',
	view_id: 'page.id',
	view_name: 'page.route',
	view_referer: 'page.referer',
}
var dataMap = {
	view: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.VIEW,
		tags: {
			view_apdex_level: 'page.apdex_level',
			is_active: 'page.is_active',
		},
		fields: {
			page_fmp: 'page.fmp',
			first_paint_time: 'page.fpt',
			loading_time: 'page.loading_time',
			onload_to_onshow: 'page.onload2onshow',
			onshow_to_onready: 'page.onshow2onready',
			time_spent: 'page.time_spent',
			view_error_count: 'page.error.count',
			view_resource_count: 'page.error.count',
			view_long_task_count: 'page.long_task.count',
			view_action_count: 'page.action.count',
			view_setdata_count: 'page.setdata.count',
		},
	},
	resource: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.RESOURCE,
		tags: {
			resource_type: 'resource.type',
			resource_status: 'resource.status',
			resource_status_group: 'resource.status_group',
			resource_method: 'resource.method',
			resource_url: 'resource.url',
			resource_url_host: 'resource.url_host',
			resource_url_path: 'resource.url_path',
			resource_url_path_group: 'resource.url_path_group',
			resource_url_query: 'resource.url_query',
		},
		fields: {
			resource_size: 'resource.size',
			resource_load: 'resource.load',
			resource_dns: 'resource.dns',
			resource_tcp: 'resource.tcp',
			resource_ssl: 'resource.ssl',
			resource_ttfb: 'resource.ttfb',
			resource_trans: 'resource.trans',
			resource_first_byte: 'resource.firstbyte',
			duration: 'resource.duration',
		},
	},
	error: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.ERROR,
		tags: {
			error_source: 'error.source',
			error_type: 'error.type',
			resource_url: 'error.resource.url',
			resource_url_host: 'error.resource.url_host',
			resource_url_path: 'error.resource.url_path',
			resource_url_path_group: 'error.resource.url_path_group',
			resource_status: 'error.resource.status',
			resource_status_group: 'error.resource.status_group',
			resource_method: 'error.resource.method',
		},
		fields: {
			error_message: ['string', 'error.message'],
			error_stack: ['string', 'error.stack'],
		},
	},
	long_task: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.LONG_TASK,
		tags: {},
		fields: {
			duration: 'long_task.duration',
		},
	},
	action: {
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_0__.RumEventType.ACTION,
		tags: {
			action_id: 'action.id',
			action_name: 'action.target.name',
			action_type: 'action.type',
		},
		fields: {
			duration: 'action.loading_time',
		},
	},
}


/***/ }),

/***/ "./src/core/downloadProxy.js":
/*!***********************************!*\
  !*** ./src/core/downloadProxy.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startDownloadProxy": () => (/* binding */ startDownloadProxy),
/* harmony export */   "resetDownloadProxy": () => (/* binding */ resetDownloadProxy)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sdk */ "./src/core/sdk.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");



var downloadProxySingleton
var beforeSendCallbacks = []
var onRequestCompleteCallbacks = []
var originalDownloadRequest
function startDownloadProxy() {
	if (!downloadProxySingleton) {
		proxyDownload()
		downloadProxySingleton = {
			beforeSend: function (callback) {
				beforeSendCallbacks.push(callback)
			},
			onRequestComplete: function (callback) {
				onRequestCompleteCallbacks.push(callback)
			},
		}
	}
	return downloadProxySingleton
}

function resetDownloadProxy() {
	if (downloadProxySingleton) {
		downloadProxySingleton = undefined
		beforeSendCallbacks.splice(0, beforeSendCallbacks.length)
		onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length)
		_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile = originalDownloadRequest
	}
}

function proxyDownload() {
	originalDownloadRequest = _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile
	_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.downloadFile = function () {
		var _this = this
		var dataflux_xhr = {
			method: 'GET',
			startTime: 0,
			url: arguments[0].url,
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RequestType.DOWNLOAD,
			responseType: 'file',
		}
		dataflux_xhr.startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)()

		var originalSuccess = arguments[0].success

		arguments[0].success = function () {
			reportXhr(arguments[0])

			if (originalSuccess) {
				originalSuccess.apply(_this, arguments)
			}
		}
		var originalFail = arguments[0].fail
		arguments[0].fail = function () {
			reportXhr(arguments[0])
			if (originalFail) {
				originalFail.apply(_this, arguments)
			}
		}
		var hasBeenReported = false
		var reportXhr = function (res) {
			if (hasBeenReported) {
				return
			}
			hasBeenReported = true
			dataflux_xhr.duration = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - dataflux_xhr.startTime
			dataflux_xhr.response = JSON.stringify({
				filePath: res.filePath,
				tempFilePath: res.tempFilePath,
			})
			dataflux_xhr.header = res.header || {}
			dataflux_xhr.profile = res.profile
			dataflux_xhr.status = res.statusCode || res.status || 0
			onRequestCompleteCallbacks.forEach(function (callback) {
				callback(dataflux_xhr)
			})
		}
		beforeSendCallbacks.forEach(function (callback) {
			callback(dataflux_xhr)
		})
		return originalDownloadRequest.apply(this, arguments)
	}
}


/***/ }),

/***/ "./src/core/errorCollection.js":
/*!*************************************!*\
  !*** ./src/core/errorCollection.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startConsoleTracking": () => (/* binding */ startConsoleTracking),
/* harmony export */   "stopConsoleTracking": () => (/* binding */ stopConsoleTracking),
/* harmony export */   "filterErrors": () => (/* binding */ filterErrors),
/* harmony export */   "startRuntimeErrorTracking": () => (/* binding */ startRuntimeErrorTracking),
/* harmony export */   "stopRuntimeErrorTracking": () => (/* binding */ stopRuntimeErrorTracking),
/* harmony export */   "startAutomaticErrorCollection": () => (/* binding */ startAutomaticErrorCollection),
/* harmony export */   "trackNetworkError": () => (/* binding */ trackNetworkError)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _errorTools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./errorTools */ "./src/core/errorTools.js");
/* harmony import */ var _helper_tracekit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/tracekit */ "./src/helper/tracekit.js");
/* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./observable */ "./src/core/observable.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration */ "./src/core/configuration.js");
/* harmony import */ var _xhrProxy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./xhrProxy */ "./src/core/xhrProxy.js");
/* harmony import */ var _downloadProxy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./downloadProxy */ "./src/core/downloadProxy.js");








var originalConsoleError

function startConsoleTracking(errorObservable) {
	originalConsoleError = console.error
	console.error = function () {
		originalConsoleError.apply(console, arguments)
		var args = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.toArray)(arguments)
		var message = []
		args.concat(['console error:']).forEach(function (para) {
			message.push(formatConsoleParameters(para))
		})

		errorObservable.notify({
			message: message.join(' '),
			source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.CONSOLE,
			startTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)(),
		})
	}
}

function stopConsoleTracking() {
	console.error = originalConsoleError
}

function formatConsoleParameters(param) {
	if (typeof param === 'string') {
		return param
	}
	if (param instanceof Error) {
		return (0,_errorTools__WEBPACK_IMPORTED_MODULE_2__.toStackTraceString)((0,_helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.computeStackTrace)(param))
	}
	return JSON.stringify(param, undefined, 2)
}
function filterErrors(configuration, errorObservable) {
	var errorCount = 0
	var filteredErrorObservable = new _observable__WEBPACK_IMPORTED_MODULE_4__.Observable()
	errorObservable.subscribe(function (error) {
		if (errorCount < configuration.maxErrorsByMinute) {
			errorCount += 1
			filteredErrorObservable.notify(error)
		} else if (errorCount === configuration.maxErrorsByMinute) {
			errorCount += 1
			filteredErrorObservable.notify({
				message:
					'Reached max number of errors by minute: ' +
					configuration.maxErrorsByMinute,
				source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.AGENT,
				startTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)(),
			})
		}
	})
	setInterval(function () {
		errorCount = 0
	}, _helper_enums__WEBPACK_IMPORTED_MODULE_1__.ONE_MINUTE)
	return filteredErrorObservable
}
var traceKitReportHandler

function startRuntimeErrorTracking(errorObservable) {
	traceKitReportHandler = function (stackTrace, _, errorObject) {
		var error = (0,_errorTools__WEBPACK_IMPORTED_MODULE_2__.formatUnknownError)(stackTrace, errorObject, 'Uncaught')
		errorObservable.notify({
			message: error.message,
			stack: error.stack,
			type: error.type,
			source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.SOURCE,
			startTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)(),
		})
	}
	_helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.report.subscribe(traceKitReportHandler)
}

function stopRuntimeErrorTracking() {
	_helper_tracekit__WEBPACK_IMPORTED_MODULE_3__.report.unsubscribe(traceKitReportHandler)
}
var filteredErrorsObservable

function startAutomaticErrorCollection(configuration) {
	if (!filteredErrorsObservable) {
		var errorObservable = new _observable__WEBPACK_IMPORTED_MODULE_4__.Observable()
		trackNetworkError(configuration, errorObservable)
		startConsoleTracking(errorObservable)
		startRuntimeErrorTracking(errorObservable)
		filteredErrorsObservable = filterErrors(configuration, errorObservable)
	}
	return filteredErrorsObservable
}

function trackNetworkError(configuration, errorObservable) {
	(0,_xhrProxy__WEBPACK_IMPORTED_MODULE_6__.startXhrProxy)().onRequestComplete(function (context) {
		return handleCompleteRequest(context.type, context)
	})
	;(0,_downloadProxy__WEBPACK_IMPORTED_MODULE_7__.startDownloadProxy)().onRequestComplete(function (context) {
		return handleCompleteRequest(context.type, context)
	})

	function handleCompleteRequest(type, request) {
		if (
			!(0,_configuration__WEBPACK_IMPORTED_MODULE_5__.isIntakeRequest)(request.url, configuration) &&
			(isRejected(request) || isServerError(request))
		) {
			errorObservable.notify({
				message: format(type) + 'error' + request.method + ' ' + request.url,
				resource: {
					method: request.method,
					statusCode: request.status,
					url: request.url,
				},
				type: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.NETWORK,
				source: _errorTools__WEBPACK_IMPORTED_MODULE_2__.ErrorSource.NETWORK,
				stack:
					truncateResponse(request.response, configuration) || 'Failed to load',
				startTime: request.startTime,
			})
		}
	}

	return {
		stop: function () {
			(0,_xhrProxy__WEBPACK_IMPORTED_MODULE_6__.resetXhrProxy)()
			;(0,_downloadProxy__WEBPACK_IMPORTED_MODULE_7__.resetDownloadProxy)()
		},
	}
}
function isRejected(request) {
	return request.status === 0 && request.responseType !== 'opaque'
}

function isServerError(request) {
	return request.status >= 500
}

function truncateResponse(response, configuration) {
	if (
		response &&
		response.length > configuration.requestErrorResponseLengthLimit
	) {
		return (
			response.substring(0, configuration.requestErrorResponseLengthLimit) +
			'...'
		)
	}
	return response
}

function format(type) {
	if (_helper_enums__WEBPACK_IMPORTED_MODULE_1__.RequestType.XHR === type) {
		return 'XHR'
	}
	return _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RequestType.DOWNLOAD
}


/***/ }),

/***/ "./src/core/errorTools.js":
/*!********************************!*\
  !*** ./src/core/errorTools.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorSource": () => (/* binding */ ErrorSource),
/* harmony export */   "formatUnknownError": () => (/* binding */ formatUnknownError),
/* harmony export */   "toStackTraceString": () => (/* binding */ toStackTraceString)
/* harmony export */ });
var ErrorSource = {
	AGENT: 'agent',
	CONSOLE: 'console',
	NETWORK: 'network',
	SOURCE: 'source',
	LOGGER: 'logger',
}
function formatUnknownError(stackTrace, errorObject, nonErrorPrefix) {
	if (
		!stackTrace ||
		(stackTrace.message === undefined && !(errorObject instanceof Error))
	) {
		return {
			message: nonErrorPrefix + '' + JSON.stringify(errorObject),
			stack: 'No stack, consider using an instance of Error',
			type: stackTrace && stackTrace.name,
		}
	}
	return {
		message: stackTrace.message || 'Empty message',
		stack: toStackTraceString(stackTrace),
		type: stackTrace.name,
	}
}

function toStackTraceString(stack) {
	var result = stack.name || 'Error' + ': ' + stack.message
	stack.stack.forEach(function (frame) {
		var func = frame.func === '?' ? '<anonymous>' : frame.func
		var args =
			frame.args && frame.args.length > 0
				? '(' + frame.args.join(', ') + ')'
				: ''
		var line = frame.line ? ':' + frame.line : ''
		var column = frame.line && frame.column ? ':' + frame.column : ''
		result += '\n  at ' + func + args + ' @ ' + frame.url + line + column
	})
	return result
}


/***/ }),

/***/ "./src/core/lifeCycle.js":
/*!*******************************!*\
  !*** ./src/core/lifeCycle.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LifeCycle": () => (/* binding */ LifeCycle),
/* harmony export */   "LifeCycleEventType": () => (/* binding */ LifeCycleEventType)
/* harmony export */ });
class LifeCycle {
	constructor() {
		this.callbacks = {}
	}
	notify(eventType, data) {
		const eventCallbacks = this.callbacks[eventType]
		if (eventCallbacks) {
			eventCallbacks.forEach((callback) => callback(data))
		}
	}
	subscribe(eventType, callback) {
		if (!this.callbacks[eventType]) {
			this.callbacks[eventType] = []
		}
		this.callbacks[eventType].push(callback)
		return {
			unsubscribe: () => {
				this.callbacks[eventType] = this.callbacks[eventType].filter(
					(other) => callback !== other,
				)
			},
		}
	}
}

var LifeCycleEventType = {
	PERFORMANCE_ENTRY_COLLECTED: 'PERFORMANCE_ENTRY_COLLECTED',
	AUTO_ACTION_CREATED: 'AUTO_ACTION_CREATED',
	AUTO_ACTION_COMPLETED: 'AUTO_ACTION_COMPLETED',
	AUTO_ACTION_DISCARDED: 'AUTO_ACTION_DISCARDED',
	APP_HIDE: 'APP_HIDE',
	APP_UPDATE: 'APP_UPDATE',
	PAGE_SET_DATA_UPDATE: 'PAGE_SET_DATA_UPDATE',
	PAGE_ALIAS_ACTION: 'PAGE_ALIAS_ACTION',
	VIEW_CREATED: 'VIEW_CREATED',
	VIEW_UPDATED: 'VIEW_UPDATED',
	VIEW_ENDED: 'VIEW_ENDED',
	REQUEST_STARTED: 'REQUEST_STARTED',
	REQUEST_COMPLETED: 'REQUEST_COMPLETED',
	RAW_RUM_EVENT_COLLECTED: 'RAW_RUM_EVENT_COLLECTED',
	RUM_EVENT_COLLECTED: 'RUM_EVENT_COLLECTED',
}


/***/ }),

/***/ "./src/core/miniaTouch.js":
/*!********************************!*\
  !*** ./src/core/miniaTouch.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MinaTouch": () => (/* binding */ MinaTouch)
/* harmony export */ });
const DEFAULT_OPTIONS = {
	touchStart: function () {},
	touchMove: function () {},
	touchEnd: function () {},
	touchCancel: function () {},
	multipointStart: function () {},
	multipointEnd: function () {},
	tap: function () {},
	doubleTap: function () {},
	longTap: function () {},
	singleTap: function () {},
	rotate: function () {},
	pinch: function () {},
	pressMove: function () {},
	swipe: function () {},
}
function MinaTouch(_page, name, option = {}) {
	this.preV = { x: null, y: null }
	this.pinchStartLen = null
	this.scale = 1
	this.isDoubleTap = false

	this.delta = null
	this.last = null
	this.now = null
	this.tapTimeout = null
	this.singleTapTimeout = null
	this.longTapTimeout = null
	this.swipeTimeout = null
	this.x1 = this.x2 = this.y1 = this.y2 = null
	this.preTapPosition = { x: null, y: null }

	this.lastZoom = 1
	this.tempZoom = 1

	try {
		if (this._checkBeforeCreate(_page, name)) {
			this._name = name
			this._option = { ...DEFAULT_OPTIONS, ...option }
			_page[name] = this
			this._bindFunc(_page)
		}
	} catch (error) {
		console.error(error)
	}
}
MinaTouch.prototype = {
	_checkBeforeCreate: function (_page, name) {
		if (!_page || !name) {
			throw new Error('MinaTouch实例化时，必须传入page对象和引用名')
		}
		if (_page[name]) {
			throw new Error('MinaTouch实例化error： ' + name + ' 已经存在page中')
		}
		return true
	},
	_bindFunc: function (_page) {
		let funcNames = ['start', 'move', 'end', 'cancel']
		for (let funcName of funcNames) {
			_page[this._name + '.' + funcName] = this[funcName].bind(this)
		}
	},
	start: function (evt) {
		if (!evt.touches) return
		this.now = Date.now()
		this.x1 =
			evt.touches[0].pageX == null ? evt.touches[0].x : evt.touches[0].pageX
		this.y1 =
			evt.touches[0].pageY == null ? evt.touches[0].y : evt.touches[0].pageY
		this.delta = this.now - (this.last || this.now)
		this._option.touchStart(evt)
		if (this.preTapPosition.x !== null) {
			this.isDoubleTap =
				this.delta > 0 &&
				this.delta <= 250 &&
				Math.abs(this.preTapPosition.x - this.x1) < 30 &&
				Math.abs(this.preTapPosition.y - this.y1) < 30
		}
		this.preTapPosition.x = this.x1
		this.preTapPosition.y = this.y1
		this.last = this.now
		let preV = this.preV,
			len = evt.touches.length
		if (len > 1) {
			this._cancelLongTap()
			this._cancelSingleTap()
			let otx =
				evt.touches[1].pageX == null ? evt.touches[1].x : evt.touches[1].pageX
			let oty =
				evt.touches[1].pageY == null ? evt.touches[1].y : evt.touches[1].pageY
			let v = { x: otx - this.x1, y: oty - this.y1 }
			preV.x = v.x
			preV.y = v.y
			this.pinchStartLen = getLen(preV)
			this._option.multipointStart(evt)
		}
		this.longTapTimeout = setTimeout(
			function () {
				evt.type = 'longTap'
				this._option.longTap(evt)
			}.bind(this),
			750,
		)
	},
	move: function (evt) {
		if (!evt.touches) return
		let preV = this.preV,
			len = evt.touches.length,
			currentX =
				evt.touches[0].pageX == null ? evt.touches[0].x : evt.touches[0].pageX,
			currentY =
				evt.touches[0].pageY == null ? evt.touches[0].y : evt.touches[0].pageY
		this.isDoubleTap = false
		if (len > 1) {
			let otx =
				evt.touches[1].pageX == null ? evt.touches[1].x : evt.touches[1].pageX
			let oty =
				evt.touches[1].pageY == null ? evt.touches[1].y : evt.touches[1].pageY
			let v = { x: otx - currentX, y: oty - currentY }

			if (preV.x !== null) {
				if (this.pinchStartLen > 0) {
					evt.singleZoom = getLen(v) / this.pinchStartLen
					evt.zoom = evt.singleZoom * this.lastZoom
					this.tempZoom = evt.zoom
					evt.type = 'pinch'
					this._option.pinch(evt)
				}

				evt.angle = getRotateAngle(v, preV)
				evt.type = 'rotate'
				this._option.rotate(evt)
			}
			preV.x = v.x
			preV.y = v.y
		} else {
			if (this.x2 !== null) {
				evt.deltaX = currentX - this.x2
				evt.deltaY = currentY - this.y2
			} else {
				evt.deltaX = 0
				evt.deltaY = 0
			}
			this._option.pressMove(evt)
		}

		this._option.touchMove(evt)

		this._cancelLongTap()
		this.x2 = currentX
		this.y2 = currentY
		if (len > 1) {
			// evt.preventDefault();
		}
	},
	end: function (evt) {
		if (!evt.changedTouches) return
		this._cancelLongTap()
		let self = this
		evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2) //在结束钩子都加入方向判断，但触发swipe瞬时必须位移大于30
		if (evt.touches.length < 2) {
			this.lastZoom = this.tempZoom
			this._option.multipointEnd(evt)
		}
		this._option.touchEnd(evt)
		//swipe
		if (
			(this.x2 && Math.abs(this.x1 - this.x2) > 30) ||
			(this.y2 && Math.abs(this.y1 - this.y2) > 30)
		) {
			// evt.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2);
			this.swipeTimeout = setTimeout(function () {
				evt.type = 'swipe'
				self._option.swipe(evt)
			}, 0)
		} else {
			this.tapTimeout = setTimeout(function () {
				evt.type = 'tap'
				self._option.tap(evt)
				// trigger double tap immediately
				if (self.isDoubleTap) {
					evt.type = 'doubleTap'
					self._option.doubleTap(evt)
					clearTimeout(self.singleTapTimeout)
					self.isDoubleTap = false
				}
			}, 0)

			if (!self.isDoubleTap) {
				self.singleTapTimeout = setTimeout(function () {
					self._option.singleTap(evt)
				}, 250)
			}
		}

		this.preV.x = 0
		this.preV.y = 0
		this.scale = 1
		this.pinchStartLen = null
		this.x1 = this.x2 = this.y1 = this.y2 = null
	},
	cancel: function (evt) {
		clearTimeout(this.singleTapTimeout)
		clearTimeout(this.tapTimeout)
		clearTimeout(this.longTapTimeout)
		clearTimeout(this.swipeTimeout)
		this._option.touchCancel(evt)
	},
	_cancelLongTap: function () {
		clearTimeout(this.longTapTimeout)
	},

	_cancelSingleTap: function () {
		clearTimeout(this.singleTapTimeout)
	},

	_swipeDirection: function (x1, x2, y1, y2) {
		return Math.abs(x1 - x2) >= Math.abs(y1 - y2)
			? x1 - x2 > 0
				? 'Left'
				: 'Right'
			: y1 - y2 > 0
			? 'Up'
			: 'Down'
	},
	destroy: function () {
		if (this.singleTapTimeout) clearTimeout(this.singleTapTimeout)
		if (this.tapTimeout) clearTimeout(this.tapTimeout)
		if (this.longTapTimeout) clearTimeout(this.longTapTimeout)
		if (this.swipeTimeout) clearTimeout(this.swipeTimeout)

		this._option.rotate = null
		this._option.touchStart = null
		this._option.multipointStart = null
		this._option.multipointEnd = null
		this._option.pinch = null
		this._option.swipe = null
		this._option.tap = null
		this._option.doubleTap = null
		this._option.longTap = null
		this._option.singleTap = null
		this._option.pressMove = null
		this._option.touchMove = null
		this._option.touchEnd = null
		this._option.touchCancel = null

		this.preV = this.pinchStartLen = this.scale = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = null

		return null
	},
}

function getLen(v) {
	return Math.sqrt(v.x * v.x + v.y * v.y)
}

function dot(v1, v2) {
	return v1.x * v2.x + v1.y * v2.y
}

function getAngle(v1, v2) {
	let mr = getLen(v1) * getLen(v2)
	if (mr === 0) return 0
	let r = dot(v1, v2) / mr
	if (r > 1) r = 1
	return Math.acos(r)
}

function cross(v1, v2) {
	return v1.x * v2.y - v2.x * v1.y
}

function getRotateAngle(v1, v2) {
	let angle = getAngle(v1, v2)
	if (cross(v1, v2) > 0) {
		angle *= -1
	}

	return (angle * 180) / Math.PI
}


/***/ }),

/***/ "./src/core/observable.js":
/*!********************************!*\
  !*** ./src/core/observable.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
class Observable {
	constructor() {
		this.observers = []
	}
	subscribe(f) {
		this.observers.push(f)
	}
	notify(data) {
		this.observers.forEach(function (observer) {
			observer(data)
		})
	}
}


/***/ }),

/***/ "./src/core/sdk.js":
/*!*************************!*\
  !*** ./src/core/sdk.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sdk": () => (/* binding */ sdk),
/* harmony export */   "tracker": () => (/* binding */ tracker)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");


function getSDK() {
	var sdk = null,
		tracker = ''
	try {
		if (wx && typeof wx === 'object' && typeof wx.request === 'function') {
			sdk = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.deepMixObject)({}, wx)
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

const sdk = instance.sdk
const tracker = instance.tracker


/***/ }),

/***/ "./src/core/transport.js":
/*!*******************************!*\
  !*** ./src/core/transport.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HttpRequest": () => (/* binding */ HttpRequest),
/* harmony export */   "Batch": () => (/* binding */ Batch)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _dataMap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dataMap */ "./src/core/dataMap.js");




// https://en.wikipedia.org/wiki/UTF-8
var HAS_MULTI_BYTES_CHARACTERS = /[^\u0000-\u007F]/
function addBatchPrecision(url) {
	if (!url) return url
	return url + (url.indexOf('?') === -1 ? '?' : '&') + 'precision=ms'
}
var httpRequest = function (endpointUrl, bytesLimit) {
	this.endpointUrl = endpointUrl
	this.bytesLimit = bytesLimit
}
httpRequest.prototype = {
	send: function (data) {
		var url = addBatchPrecision(this.endpointUrl)
		_core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.request({
			method: 'POST',
			header: {
				'content-type': 'text/plain;charset=UTF-8',
			},
			url,
			data,
		})
	},
}

var HttpRequest = httpRequest

function batch(
	request,
	maxSize,
	bytesLimit,
	maxMessageSize,
	flushTimeout,
	lifeCycle,
) {
	this.request = request
	this.maxSize = maxSize
	this.bytesLimit = bytesLimit
	this.maxMessageSize = maxMessageSize
	this.flushTimeout = flushTimeout
	this.lifeCycle = lifeCycle
	this.flushOnVisibilityHidden()
	this.flushPeriodically()
}
batch.prototype = {
	pushOnlyBuffer: [],
	upsertBuffer: {},
	bufferBytesSize: 0,
	bufferMessageCount: 0,
	add: function (message) {
		this.addOrUpdate(message)
	},

	upsert: function (message, key) {
		this.addOrUpdate(message, key)
	},

	flush: function () {
		if (this.bufferMessageCount !== 0) {
			var messages = this.pushOnlyBuffer.concat((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.values)(this.upsertBuffer))
			this.request.send(messages.join('\n'), this.bufferBytesSize)
			this.pushOnlyBuffer = []
			this.upsertBuffer = {}
			this.bufferBytesSize = 0
			this.bufferMessageCount = 0
		}
	},

	processSendData: function (message) {
		// var data = safeJSONParse(message)
		if (!message || !message.type) return ''
		var rowStr = ''
		var hasFileds = false
		;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(_dataMap__WEBPACK_IMPORTED_MODULE_3__.dataMap, function (value, key) {
			if (value.type === message.type) {
				rowStr += key + ','
				var tagsStr = []
				var tags = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, _dataMap__WEBPACK_IMPORTED_MODULE_3__.commonTags, value.tags)
				;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(tags, function (value_path, _key) {
					var _value = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, value_path)
					if (_value || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_value)) {
						tagsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_value))
					}
				})
				if (message.tags.length) {
					// 自定义tag
					(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(message.tags, function (_value, _key) {
						if (_value || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_value)) {
							tagsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_value))
						}
					})
				}
				var fieldsStr = []
				;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(value.fields, function (_value, _key) {
					if (Array.isArray(_value) && _value.length === 2) {
						var type = _value[0],
							value_path = _value[1]
						var _valueData = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, value_path)
						if (_valueData || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_valueData)) {
							_valueData =
								type === 'string'
									? '"' +
									  String(_valueData)
											.replace(/[\\]*"/g, '"')
											.replace(/"/g, '\\"') +
									  '"'
									: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_valueData)
							fieldsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + _valueData)
						}
					} else if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isString)(_value)) {
						var _valueData = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.findByPath)(message, _value)
						if (_valueData || (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(_valueData)) {
							_valueData = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_valueData)
							fieldsStr.push((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRowData)(_key) + '=' + _valueData)
						}
					}
				})
				if (tagsStr.length) {
					rowStr += tagsStr.join(',')
				}
				if (fieldsStr.length) {
					rowStr += ' '
					rowStr += fieldsStr.join(',')
					hasFileds = true
				}
				rowStr = rowStr + ' ' + message.date
			}
		})
		return hasFileds ? rowStr : ''
	},
	sizeInBytes: function (candidate) {
		// Accurate byte size computations can degrade performances when there is a lot of events to process
		if (!HAS_MULTI_BYTES_CHARACTERS.test(candidate)) {
			return candidate.length
		}
		var total = 0,
			charCode
		// utf-8编码
		for (var i = 0, len = candidate.length; i < len; i++) {
			charCode = candidate.charCodeAt(i)
			if (charCode <= 0x007f) {
				total += 1
			} else if (charCode <= 0x07ff) {
				total += 2
			} else if (charCode <= 0xffff) {
				total += 3
			} else {
				total += 4
			}
		}
		return total
	},

	addOrUpdate: function (message, key) {
		var process = this.process(message)
		if (!process.processedMessage || process.processedMessage === '') return
		if (process.messageBytesSize >= this.maxMessageSize) {
			console.warn(
				'Discarded a message whose size was bigger than the maximum allowed size' +
					this.maxMessageSize +
					'KB.',
			)
			return
		}
		if (this.hasMessageFor(key)) {
			this.remove(key)
		}
		if (this.willReachedBytesLimitWith(process.messageBytesSize)) {
			this.flush()
		}
		this.push(process.processedMessage, process.messageBytesSize, key)
		if (this.isFull()) {
			this.flush()
		}
	},
	process: function (message) {
		var processedMessage = this.processSendData(message)
		var messageBytesSize = this.sizeInBytes(processedMessage)
		return {
			processedMessage: processedMessage,
			messageBytesSize: messageBytesSize,
		}
	},

	push: function (processedMessage, messageBytesSize, key) {
		if (this.bufferMessageCount > 0) {
			// \n separator at serialization
			this.bufferBytesSize += 1
		}
		if (key !== undefined) {
			this.upsertBuffer[key] = processedMessage
		} else {
			this.pushOnlyBuffer.push(processedMessage)
		}
		this.bufferBytesSize += messageBytesSize
		this.bufferMessageCount += 1
	},

	remove: function (key) {
		var removedMessage = this.upsertBuffer[key]
		delete this.upsertBuffer[key]
		var messageBytesSize = this.sizeInBytes(removedMessage)
		this.bufferBytesSize -= messageBytesSize
		this.bufferMessageCount -= 1
		if (this.bufferMessageCount > 0) {
			this.bufferBytesSize -= 1
		}
	},

	hasMessageFor: function (key) {
		return key !== undefined && this.upsertBuffer[key] !== undefined
	},

	willReachedBytesLimitWith: function (messageBytesSize) {
		// byte of the separator at the end of the message
		return this.bufferBytesSize + messageBytesSize + 1 >= this.bytesLimit
	},

	isFull: function () {
		return (
			this.bufferMessageCount === this.maxSize ||
			this.bufferBytesSize >= this.bytesLimit
		)
	},

	flushPeriodically: function () {
		var _this = this
		setTimeout(function () {
			_this.flush()
			_this.flushPeriodically()
		}, _this.flushTimeout)
	},

	flushOnVisibilityHidden: function () {
		var _this = this
		/**
		 * With sendBeacon, requests are guaranteed to be successfully sent during document unload
		 */
		// @ts-ignore this function is not always defined
		this.lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.APP_HIDE, function () {
			_this.flush()
		})
	},
}

var Batch = batch


/***/ }),

/***/ "./src/core/xhrProxy.js":
/*!******************************!*\
  !*** ./src/core/xhrProxy.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startXhrProxy": () => (/* binding */ startXhrProxy),
/* harmony export */   "resetXhrProxy": () => (/* binding */ resetXhrProxy)
/* harmony export */ });
/* harmony import */ var _sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sdk */ "./src/core/sdk.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");



var xhrProxySingleton
var beforeSendCallbacks = []
var onRequestCompleteCallbacks = []
var originalXhrRequest
function startXhrProxy() {
	if (!xhrProxySingleton) {
		proxyXhr()
		xhrProxySingleton = {
			beforeSend: function (callback) {
				beforeSendCallbacks.push(callback)
			},
			onRequestComplete: function (callback) {
				onRequestCompleteCallbacks.push(callback)
			},
		}
	}
	return xhrProxySingleton
}

function resetXhrProxy() {
	if (xhrProxySingleton) {
		xhrProxySingleton = undefined
		beforeSendCallbacks.splice(0, beforeSendCallbacks.length)
		onRequestCompleteCallbacks.splice(0, onRequestCompleteCallbacks.length)
		_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request = originalXhrRequest
	}
}

function proxyXhr() {
	originalXhrRequest = _sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request
	_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.request = function () {
		var _this = this
		var dataflux_xhr = {
			method: arguments[0].method || 'GET',
			startTime: 0,
			url: arguments[0].url,
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RequestType.XHR,
			responseType: arguments[0].responseType || 'text',
		}
		dataflux_xhr.startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)()

		var originalSuccess = arguments[0].success

		arguments[0].success = function () {
			reportXhr(arguments[0])

			if (originalSuccess) {
				originalSuccess.apply(_this, arguments)
			}
		}
		var originalFail = arguments[0].fail
		arguments[0].fail = function () {
			reportXhr(arguments[0])
			if (originalFail) {
				originalFail.apply(_this, arguments)
			}
		}
		var hasBeenReported = false
		var reportXhr = function (res) {
			if (hasBeenReported) {
				return
			}
			hasBeenReported = true
			dataflux_xhr.duration = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - dataflux_xhr.startTime
			dataflux_xhr.response = JSON.stringify(res.data)
			dataflux_xhr.header = res.header || {}
			dataflux_xhr.profile = res.profile
			dataflux_xhr.status = res.statusCode || res.status || 0
			onRequestCompleteCallbacks.forEach(function (callback) {
				callback(dataflux_xhr)
			})
		}
		beforeSendCallbacks.forEach(function (callback) {
			callback(dataflux_xhr)
		})
		return originalXhrRequest.apply(this, arguments)
	}
}


/***/ }),

/***/ "./src/helper/enums.js":
/*!*****************************!*\
  !*** ./src/helper/enums.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ONE_SECOND": () => (/* binding */ ONE_SECOND),
/* harmony export */   "ONE_MINUTE": () => (/* binding */ ONE_MINUTE),
/* harmony export */   "ONE_HOUR": () => (/* binding */ ONE_HOUR),
/* harmony export */   "ONE_KILO_BYTE": () => (/* binding */ ONE_KILO_BYTE),
/* harmony export */   "CLIENT_ID_TOKEN": () => (/* binding */ CLIENT_ID_TOKEN),
/* harmony export */   "RumEventType": () => (/* binding */ RumEventType),
/* harmony export */   "RequestType": () => (/* binding */ RequestType),
/* harmony export */   "ActionType": () => (/* binding */ ActionType),
/* harmony export */   "MpHook": () => (/* binding */ MpHook)
/* harmony export */ });
const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const ONE_HOUR = 60 * ONE_MINUTE
const ONE_KILO_BYTE = 1024
const CLIENT_ID_TOKEN = 'datafluxRum:client:id'
const RumEventType = {
	ACTION: 'action',
	ERROR: 'error',
	LONG_TASK: 'long_task',
	VIEW: 'view',
	RESOURCE: 'resource',
	APP: 'app',
	ACTION: 'action',
}

var RequestType = {
	XHR: 'network',
	DOWNLOAD: 'resource',
}

var ActionType = {
	tap: 'tap',
	longpress: 'longpress',
	longtap: 'longtap',
}
var MpHook = {
	data: 1,
	onLoad: 1,
	onShow: 1,
	onReady: 1,
	onPullDownRefresh: 1,
	onReachBottom: 1,
	onShareAppMessage: 1,
	onPageScroll: 1,
	onResize: 1,
	onTabItemTap: 1,
	onHide: 1,
	onUnload: 1,
}


/***/ }),

/***/ "./src/helper/tracekit.js":
/*!********************************!*\
  !*** ./src/helper/tracekit.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wrap": () => (/* binding */ wrap),
/* harmony export */   "report": () => (/* binding */ report),
/* harmony export */   "computeStackTrace": () => (/* binding */ computeStackTrace)
/* harmony export */ });
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");


const UNKNOWN_FUNCTION = '?'
function has(object, key) {
	return Object.prototype.hasOwnProperty.call(object, key)
}
function isUndefined(what) {
	return typeof what === 'undefined'
}
function wrap(func) {
	var _this = this
	function wrapped() {
		try {
			return func.apply(_this, arguments)
		} catch (e) {
			report(e)
			throw e
		}
	}
	return wrapped
}
/**
 * Cross-browser processing of unhandled exceptions
 *
 * Syntax:
 * ```js
 *   report.subscribe(function(stackInfo) { ... })
 *   report.unsubscribe(function(stackInfo) { ... })
 *   report(exception)
 *   try { ...code... } catch(ex) { report(ex); }
 * ```
 *
 * Supports:
 *   - Firefox: full stack trace with line numbers, plus column number
 *     on top frame; column number is not guaranteed
 *   - Opera: full stack trace with line and column numbers
 *   - Chrome: full stack trace with line and column numbers
 *   - Safari: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *   - IE: line and column number for the top frame only; some frames
 *     may be missing, and column number is not guaranteed
 *
 * In theory, TraceKit should work on all of the following versions:
 *   - IE5.5+ (only 8.0 tested)
 *   - Firefox 0.9+ (only 3.5+ tested)
 *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
 *     Exceptions Have Stacktrace to be enabled in opera:config)
 *   - Safari 3+ (only 4+ tested)
 *   - Chrome 1+ (only 5+ tested)
 *   - Konqueror 3.5+ (untested)
 *
 * Requires computeStackTrace.
 *
 * Tries to catch all unhandled exceptions and report them to the
 * subscribed handlers. Please note that report will rethrow the
 * exception. This is REQUIRED in order to get a useful stack trace in IE.
 * If the exception does not reach the top of the browser, you will only
 * get a stack trace from the point where report was called.
 *
 * Handlers receive a StackTrace object as described in the
 * computeStackTrace docs.
 *
 * @memberof TraceKit
 * @namespace
 */
var report = (function reportModuleWrapper() {
	var handlers = []

	/**
	 * Add a crash handler.
	 * @param {Function} handler
	 * @memberof report
	 */
	function subscribe(handler) {
		installGlobalHandler()
		installGlobalUnhandledRejectionHandler()
		installGlobalOnPageNotFoundHandler()
		installGlobalOnMemoryWarningHandler()
		handlers.push(handler)
	}

	/**
	 * Remove a crash handler.
	 * @param {Function} handler
	 * @memberof report
	 */
	function unsubscribe(handler) {
		for (var i = handlers.length - 1; i >= 0; i -= 1) {
			if (handlers[i] === handler) {
				handlers.splice(i, 1)
			}
		}
	}

	/**
	 * Dispatch stack information to all handlers.
	 * @param {StackTrace} stack
	 * @param {boolean} isWindowError Is this a top-level window error?
	 * @param {Error=} error The error that's being handled (if available, null otherwise)
	 * @memberof report
	 * @throws An exception if an error occurs while calling an handler.
	 */
	function notifyHandlers(stack, isWindowError, error) {
		var exception
		for (var i in handlers) {
			if (has(handlers, i)) {
				try {
					handlers[i](stack, isWindowError, error)
				} catch (inner) {
					exception = inner
				}
			}
		}

		if (exception) {
			throw exception
		}
	}

	var onErrorHandlerInstalled
	var onUnhandledRejectionHandlerInstalled
	var onPageNotFoundHandlerInstalled
	var onOnMemoryWarningHandlerInstalled
	/**
	 * Ensures all global unhandled exceptions are recorded.
	 * Supported by Gecko and IE.
	 * @param {Event|string} message Error message.
	 * @param {string=} url URL of script that generated the exception.
	 * @param {(number|string)=} lineNo The line number at which the error occurred.
	 * @param {(number|string)=} columnNo The column number at which the error occurred.
	 * @param {Error=} errorObj The actual Error object.
	 * @memberof report
	 */
	function traceKitWindowOnError(err) {
		const error = typeof err === 'string' ? new Error(err) : err
		var stack
		var name = ''
		var msg = ''
		stack = computeStackTrace(error)
		if (
			error &&
			error.message &&
			{}.toString.call(error.message) === '[object String]'
		) {
			const messages = error.message.split('\n')
			if (messages.length >= 3) {
				msg = messages[2]
				const groups = msg.match(ERROR_TYPES_RE)
				if (groups) {
					name = groups[1]
					msg = groups[2]
				}
			}
		}
		if (msg) {
			stack.message = msg
		}
		if (name) {
			stack.name = name
		}
		notifyHandlers(stack, true, error)
	}

	/**
	 * Ensures all unhandled rejections are recorded.
	 * @param {PromiseRejectionEvent} e event.
	 * @memberof report
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
	 */
	function traceKitWindowOnUnhandledRejection({ reason, promise }) {
		const error = typeof reason === 'string' ? new Error(reason) : reason
		var stack
		var name = ''
		var msg = ''
		stack = computeStackTrace(error)
		if (
			error &&
			error.message &&
			{}.toString.call(error.message) === '[object String]'
		) {
			const messages = error.message.split('\n')
			if (messages.length >= 3) {
				msg = messages[2]
				const groups = msg.match(ERROR_TYPES_RE)
				if (groups) {
					name = groups[1]
					msg = groups[2]
				}
			}
		}
		if (msg) {
			stack.message = msg
		}
		if (name) {
			stack.name = name
		}
		notifyHandlers(stack, true, error)
	}

	/**
	 * Install a global onerror handler
	 * @memberof report
	 */
	function installGlobalHandler() {
		if (onErrorHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onError) {
			return
		}
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onError(traceKitWindowOnError)
		onErrorHandlerInstalled = true
	}

	/**
	 * Install a global onunhandledrejection handler
	 * @memberof report
	 */
	function installGlobalUnhandledRejectionHandler() {
		if (onUnhandledRejectionHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection) {
			return
		}

		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection &&
			_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onUnhandledRejection(traceKitWindowOnUnhandledRejection)
		onUnhandledRejectionHandlerInstalled = true
	}
	function installGlobalOnPageNotFoundHandler() {
		if (onPageNotFoundHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onPageNotFound) {
			return
		}
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onPageNotFound((res) => {
			const url = res.path.split('?')[0]
			notifyHandlers(
				{
					message: JSON.stringify(res),
					type: 'pagenotfound',
					name: url + '页面无法找到',
				},
				true,
				{},
			)
		})
		onPageNotFoundHandlerInstalled = true
	}
	function installGlobalOnMemoryWarningHandler() {
		if (onOnMemoryWarningHandlerInstalled || !_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onMemoryWarning) {
			return
		}
		_core_sdk__WEBPACK_IMPORTED_MODULE_0__.sdk.onMemoryWarning(({ level = -1 }) => {
			let levelMessage = '没有获取到告警级别信息'

			switch (level) {
				case 5:
					levelMessage = 'TRIM_MEMORY_RUNNING_MODERATE'
					break
				case 10:
					levelMessage = 'TRIM_MEMORY_RUNNING_LOW'
					break
				case 15:
					levelMessage = 'TRIM_MEMORY_RUNNING_CRITICAL'
					break
				default:
					return
			}
			notifyHandlers(
				{
					message: levelMessage,
					type: 'memorywarning',
					name: '内存不足告警',
				},
				true,
				{},
			)
		})
		onOnMemoryWarningHandlerInstalled = true
	}
	/**
	 * Reports an unhandled Error.
	 * @param {Error} ex
	 * @memberof report
	 * @throws An exception if an incompvare stack trace is detected (old IE browsers).
	 */
	function doReport(ex) {}

	doReport.subscribe = subscribe
	doReport.unsubscribe = unsubscribe
	doReport.traceKitWindowOnError = traceKitWindowOnError

	return doReport
})()

/**
 * computeStackTrace: cross-browser stack traces in JavaScript
 *
 * Syntax:
 *   ```js
 *   s = computeStackTrace.ofCaller([depth])
 *   s = computeStackTrace(exception) // consider using report instead (see below)
 *   ```
 *
 * Supports:
 *   - Firefox:  full stack trace with line numbers and unreliable column
 *               number on top frame
 *   - Opera 10: full stack trace with line and column numbers
 *   - Opera 9-: full stack trace with line numbers
 *   - Chrome:   full stack trace with line and column numbers
 *   - Safari:   line and column number for the topmost stacktrace element
 *               only
 *   - IE:       no line numbers whatsoever
 *
 * Tries to guess names of anonymous functions by looking for assignments
 * in the source code. In IE and Safari, we have to guess source file names
 * by searching for function bodies inside all page scripts. This will not
 * work for scripts that are loaded cross-domain.
 * Here be dragons: some function names may be guessed incorrectly, and
 * duplicate functions may be mismatched.
 *
 * computeStackTrace should only be used for tracing purposes.
 * Logging of unhandled exceptions should be done with report,
 * which builds on top of computeStackTrace and provides better
 * IE support by utilizing the sdk.onError event to retrieve information
 * about the top of the stack.
 *
 * Note: In IE and Safari, no stack trace is recorded on the Error object,
 * so computeStackTrace instead walks its *own* chain of callers.
 * This means that:
 *  * in Safari, some methods may be missing from the stack trace;
 *  * in IE, the topmost function in the stack trace will always be the
 *    caller of computeStackTrace.
 *
 * This is okay for tracing (because you are likely to be calling
 * computeStackTrace from the function you want to be the topmost element
 * of the stack trace anyway), but not okay for logging unhandled
 * exceptions (because your catch block will likely be far away from the
 * inner function that actually caused the exception).
 *
 * Tracing example:
 *  ```js
 *     function trace(message) {
 *         var stackInfo = computeStackTrace.ofCaller();
 *         var data = message + "\n";
 *         for(var i in stackInfo.stack) {
 *             var item = stackInfo.stack[i];
 *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
 *         }
 *         if (window.console)
 *             console.info(data);
 *         else
 *             alert(data);
 *     }
 * ```
 * @memberof TraceKit
 * @namespace
 */
var computeStackTrace = (function computeStackTraceWrapper() {
	var debug = false

	// Contents of Exception in various browsers.
	//
	// SAFARI:
	// ex.message = Can't find variable: qq
	// ex.line = 59
	// ex.sourceId = 580238192
	// ex.sourceURL = http://...
	// ex.expressionBeginOffset = 96
	// ex.expressionCaretOffset = 98
	// ex.expressionEndOffset = 98
	// ex.name = ReferenceError
	//
	// FIREFOX:
	// ex.message = qq is not defined
	// ex.fileName = http://...
	// ex.lineNumber = 59
	// ex.columnNumber = 69
	// ex.stack = ...stack trace... (see the example below)
	// ex.name = ReferenceError
	//
	// CHROME:
	// ex.message = qq is not defined
	// ex.name = ReferenceError
	// ex.type = not_defined
	// ex.arguments = ['aa']
	// ex.stack = ...stack trace...
	//
	// INTERNET EXPLORER:
	// ex.message = ...
	// ex.name = ReferenceError
	//
	// OPERA:
	// ex.message = ...message... (see the example below)
	// ex.name = ReferenceError
	// ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
	// ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'

	/**
	 * Computes stack trace information from the stack property.
	 * Chrome and Gecko use this property.
	 * @param {Error} ex
	 * @return {?StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceFromStackProp(ex) {
		if (!ex.stack) {
			return
		}

		// tslint:disable-next-line max-line-length
		var chrome = /^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i
		// tslint:disable-next-line max-line-length
		var gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|\[native).*?|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i
		// tslint:disable-next-line max-line-length
		var winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i

		// Used to additionally parse URL/line/column from eval frames
		var isEval
		var geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i
		var chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/
		var lines = ex.stack.split('\n')
		var stack = []
		var submatch
		var parts
		var element

		for (var i = 0, j = lines.length; i < j; i += 1) {
			if (chrome.exec(lines[i])) {
				parts = chrome.exec(lines[i])
				var isNative = parts[2] && parts[2].indexOf('native') === 0 // start of line
				isEval = parts[2] && parts[2].indexOf('eval') === 0 // start of line
				submatch = chromeEval.exec(parts[2])
				if (isEval && submatch) {
					// throw out eval line/column and use top-most line/column number
					parts[2] = submatch[1] // url
					parts[3] = submatch[2] // line
					parts[4] = submatch[3] // column
				}
				element = {
					args: isNative ? [parts[2]] : [],
					column: parts[4] ? +parts[4] : undefined,
					func: parts[1] || UNKNOWN_FUNCTION,
					line: parts[3] ? +parts[3] : undefined,
					url: !isNative ? parts[2] : undefined,
				}
			} else if (winjs.exec(lines[i])) {
				parts = winjs.exec(lines[i])
				element = {
					args: [],
					column: parts[4] ? +parts[4] : undefined,
					func: parts[1] || UNKNOWN_FUNCTION,
					line: +parts[3],
					url: parts[2],
				}
			} else if (gecko.exec(lines[i])) {
				parts = gecko.exec(lines[i])
				isEval = parts[3] && parts[3].indexOf(' > eval') > -1
				submatch = geckoEval.exec(parts[3])
				if (isEval && submatch) {
					// throw out eval line/column and use top-most line number
					parts[3] = submatch[1]
					parts[4] = submatch[2]
					parts[5] = undefined // no column when eval
				} else if (i === 0 && !parts[5] && !isUndefined(ex.columnNumber)) {
					// FireFox uses this awesome columnNumber property for its top frame
					// Also note, Firefox's column number is 0-based and everything else expects 1-based,
					// so adding 1
					// NOTE: this hack doesn't work if top-most frame is eval
					stack[0].column = ex.columnNumber + 1
				}
				element = {
					args: parts[2] ? parts[2].split(',') : [],
					column: parts[5] ? +parts[5] : undefined,
					func: parts[1] || UNKNOWN_FUNCTION,
					line: parts[4] ? +parts[4] : undefined,
					url: parts[3],
				}
			} else {
				continue
			}

			if (!element.func && element.line) {
				element.func = UNKNOWN_FUNCTION
			}
			stack.push(element)
		}

		if (!stack.length) {
			return
		}

		return {
			stack,
			message: extractMessage(ex),
			name: ex.name,
		}
	}

	/**
	 * Computes stack trace information from the stacktrace property.
	 * Opera 10+ uses this property.
	 * @param {Error} ex
	 * @return {?StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceFromStacktraceProp(ex) {
		// Access and store the stacktrace property before doing ANYTHING
		// else to it because Opera is not very good at providing it
		// reliably in other circumstances.
		var stacktrace = ex.stacktrace
		if (!stacktrace) {
			return
		}

		var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i
		// tslint:disable-next-line max-line-length
		var opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i
		var lines = stacktrace.split('\n')
		var stack = []
		var parts

		for (var line = 0; line < lines.length; line += 2) {
			var element
			if (opera10Regex.exec(lines[line])) {
				parts = opera10Regex.exec(lines[line])
				element = {
					args: [],
					column: undefined,
					func: parts[3],
					line: +parts[1],
					url: parts[2],
				}
			} else if (opera11Regex.exec(lines[line])) {
				parts = opera11Regex.exec(lines[line])
				element = {
					args: parts[5] ? parts[5].split(',') : [],
					column: +parts[2],
					func: parts[3] || parts[4],
					line: +parts[1],
					url: parts[6],
				}
			}

			if (element) {
				if (!element.func && element.line) {
					element.func = UNKNOWN_FUNCTION
				}
				element.context = [lines[line + 1]]

				stack.push(element)
			}
		}

		if (!stack.length) {
			return
		}

		return {
			stack,
			message: extractMessage(ex),
			name: ex.name,
		}
	}

	/**
	 * NOT TESTED.
	 * Computes stack trace information from an error message that includes
	 * the stack trace.
	 * Opera 9 and earlier use this method if the option to show stack
	 * traces is turned on in opera:config.
	 * @param {Error} ex
	 * @return {?StackTrace} Stack information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceFromOperaMultiLineMessage(ex) {
		// TODO: Clean this function up
		// Opera includes a stack trace into the exception message. An example is:
		//
		// Statement on line 3: Undefined variable: undefinedFunc
		// Backtrace:
		//   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js:
		//   In function zzz
		//         undefinedFunc(a);
		//   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
		//   In function yyy
		//           zzz(x, y, z);
		//   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html:
		//   In function xxx
		//           yyy(a, a, a);
		//   Line 1 of function script
		//     try { xxx('hi'); return false; } catch(ex) { report(ex); }
		//   ...

		var lines = ex.message.split('\n')
		if (lines.length < 4) {
			return
		}

		var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i
		var lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i
		var lineRE3 = /^\s*Line (\d+) of function script\s*$/i
		var stack = []
		var scripts =
			window &&
			window.document &&
			window.document.getElementsByTagName('script')
		var inlineScriptBlocks = []
		var parts

		for (var s in scripts) {
			if (has(scripts, s) && !scripts[s].src) {
				inlineScriptBlocks.push(scripts[s])
			}
		}

		for (var line = 2; line < lines.length; line += 2) {
			var item
			if (lineRE1.exec(lines[line])) {
				parts = lineRE1.exec(lines[line])
				item = {
					args: [],
					column: undefined,
					func: parts[3],
					line: +parts[1],
					url: parts[2],
				}
			} else if (lineRE2.exec(lines[line])) {
				parts = lineRE2.exec(lines[line])
				item = {
					args: [],
					column: undefined, // TODO: Check to see if inline#1 (+parts[2]) points to the script number or column number.
					func: parts[4],
					line: +parts[1],
					url: parts[3],
				}
			} else if (lineRE3.exec(lines[line])) {
				parts = lineRE3.exec(lines[line])
				var url = window.location.href.replace(/#.*$/, '')
				item = {
					url,
					args: [],
					column: undefined,
					func: '',
					line: +parts[1],
				}
			}

			if (item) {
				if (!item.func) {
					item.func = UNKNOWN_FUNCTION
				}
				item.context = [lines[line + 1]]
				stack.push(item)
			}
		}
		if (!stack.length) {
			return // could not parse multiline exception message as Opera stack trace
		}

		return {
			stack,
			message: lines[0],
			name: ex.name,
		}
	}

	/**
	 * Adds information about the first frame to incompvare stack traces.
	 * Safari and IE require this to get compvare data on the first frame.
	 * @param {StackTrace} stackInfo Stack trace information from
	 * one of the compute* methods.
	 * @param {string=} url The URL of the script that caused an error.
	 * @param {(number|string)=} lineNo The line number of the script that
	 * caused an error.
	 * @param {string=} message The error generated by the browser, which
	 * hopefully contains the name of the object that caused the error.
	 * @return {boolean} Whether or not the stack information was
	 * augmented.
	 * @memberof computeStackTrace
	 */
	function augmentStackTraceWithInitialElement(
		stackInfo,
		url,
		lineNo,
		message,
	) {
		var initial = {
			url,
			line: lineNo ? +lineNo : undefined,
		}

		if (initial.url && initial.line) {
			stackInfo.incompvare = false

			var stack = stackInfo.stack
			if (stack.length > 0) {
				if (stack[0].url === initial.url) {
					if (stack[0].line === initial.line) {
						return false // already in stack trace
					}
					if (!stack[0].line && stack[0].func === initial.func) {
						stack[0].line = initial.line
						stack[0].context = initial.context
						return false
					}
				}
			}

			stack.unshift(initial)
			stackInfo.partial = true
			return true
		}
		stackInfo.incompvare = true

		return false
	}

	/**
	 * Computes stack trace information by walking the arguments.caller
	 * chain at the time the exception occurred. This will cause earlier
	 * frames to be missed but is the only way to get any stack trace in
	 * Safari and IE. The top frame is restored by
	 * {@link augmentStackTraceWithInitialElement}.
	 * @param {Error} ex
	 * @param {number} depth
	 * @return {StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceByWalkingCallerChain(ex, depth) {
		var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i
		var stack = []
		var funcs = {}
		var recursion = false
		var parts
		var item

		for (
			var curr = computeStackTraceByWalkingCallerChain.caller;
			curr && !recursion;
			curr = curr.caller
		) {
			if (curr === computeStackTrace || curr === report) {
				continue
			}

			item = {
				args: [],
				column: undefined,
				func: UNKNOWN_FUNCTION,
				line: undefined,
				url: undefined,
			}

			parts = functionName.exec(curr.toString())
			if (curr.name) {
				item.func = curr.name
			} else if (parts) {
				item.func = parts[1]
			}

			if (typeof item.func === 'undefined') {
				item.func = parts
					? parts.input.substring(0, parts.input.indexOf('{'))
					: undefined
			}

			if (funcs[curr + '']) {
				recursion = true
			} else {
				funcs[curr + ''] = true
			}

			stack.push(item)
		}

		if (depth) {
			stack.splice(0, depth)
		}

		var result = {
			stack,
			message: ex.message,
			name: ex.name,
		}
		augmentStackTraceWithInitialElement(
			result,
			ex.sourceURL || ex.fileName,
			ex.line || ex.lineNumber,
			ex.message || ex.description,
		)
		return result
	}

	/**
	 * Computes a stack trace for an exception.
	 * @param {Error} ex
	 * @param {(string|number)=} depth
	 * @memberof computeStackTrace
	 */
	function doComputeStackTrace(ex, depth) {
		var stack
		var normalizedDepth = depth === undefined ? 0 : +depth

		try {
			// This must be tried first because Opera 10 *destroys*
			// its stacktrace property if you try to access the stack
			// property first!!
			stack = computeStackTraceFromStacktraceProp(ex)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		try {
			stack = computeStackTraceFromStackProp(ex)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		try {
			stack = computeStackTraceFromOperaMultiLineMessage(ex)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		try {
			stack = computeStackTraceByWalkingCallerChain(ex, normalizedDepth + 1)
			if (stack) {
				return stack
			}
		} catch (e) {
			if (debug) {
				throw e
			}
		}

		return {
			message: extractMessage(ex),
			name: ex.name,
			stack: [],
		}
	}

	/**
	 * Logs a stacktrace starting from the previous call and working down.
	 * @param {(number|string)=} depth How many frames deep to trace.
	 * @return {StackTrace} Stack trace information.
	 * @memberof computeStackTrace
	 */
	function computeStackTraceOfCaller(depth) {
		var currentDepth = (depth === undefined ? 0 : +depth) + 1 // "+ 1" because "ofCaller" should drop one frame
		try {
			throw new Error()
		} catch (ex) {
			return computeStackTrace(ex, currentDepth + 1)
		}
	}

	doComputeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement
	doComputeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp
	doComputeStackTrace.ofCaller = computeStackTraceOfCaller

	return doComputeStackTrace
})()
var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/
function extractMessage(ex) {
	const message = ex && ex.message
	// console.log('message',message)
	if (!message) {
		return 'No error message'
	}
	if (message.error && typeof message.error.message === 'string') {
		return message.error.message
	}

	return message
}


/***/ }),

/***/ "./src/helper/utils.js":
/*!*****************************!*\
  !*** ./src/helper/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArguments": () => (/* binding */ isArguments),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "values": () => (/* binding */ values),
/* harmony export */   "round": () => (/* binding */ round),
/* harmony export */   "msToNs": () => (/* binding */ msToNs),
/* harmony export */   "isUndefined": () => (/* binding */ isUndefined),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isDate": () => (/* binding */ isDate),
/* harmony export */   "isBoolean": () => (/* binding */ isBoolean),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "areInOrder": () => (/* binding */ areInOrder),
/* harmony export */   "UUID": () => (/* binding */ UUID),
/* harmony export */   "jsonStringify": () => (/* binding */ jsonStringify),
/* harmony export */   "elapsed": () => (/* binding */ elapsed),
/* harmony export */   "getMethods": () => (/* binding */ getMethods),
/* harmony export */   "replaceNumberCharByPath": () => (/* binding */ replaceNumberCharByPath),
/* harmony export */   "getStatusGroup": () => (/* binding */ getStatusGroup),
/* harmony export */   "getQueryParamsFromUrl": () => (/* binding */ getQueryParamsFromUrl),
/* harmony export */   "isPercentage": () => (/* binding */ isPercentage),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "extend2Lev": () => (/* binding */ extend2Lev),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isEmptyObject": () => (/* binding */ isEmptyObject),
/* harmony export */   "isJSONString": () => (/* binding */ isJSONString),
/* harmony export */   "safeJSONParse": () => (/* binding */ safeJSONParse),
/* harmony export */   "now": () => (/* binding */ now),
/* harmony export */   "throttle": () => (/* binding */ throttle),
/* harmony export */   "noop": () => (/* binding */ noop),
/* harmony export */   "performDraw": () => (/* binding */ performDraw),
/* harmony export */   "findByPath": () => (/* binding */ findByPath),
/* harmony export */   "withSnakeCaseKeys": () => (/* binding */ withSnakeCaseKeys),
/* harmony export */   "deepSnakeCase": () => (/* binding */ deepSnakeCase),
/* harmony export */   "toSnakeCase": () => (/* binding */ toSnakeCase),
/* harmony export */   "escapeRowData": () => (/* binding */ escapeRowData),
/* harmony export */   "urlParse": () => (/* binding */ urlParse),
/* harmony export */   "getOwnObjectKeys": () => (/* binding */ getOwnObjectKeys),
/* harmony export */   "defineObject": () => (/* binding */ defineObject),
/* harmony export */   "deepMixObject": () => (/* binding */ deepMixObject)
/* harmony export */ });
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./src/helper/enums.js");

var ArrayProto = Array.prototype
var ObjProto = Object.prototype
var ObjProto = Object.prototype
var hasOwnProperty = ObjProto.hasOwnProperty
var slice = ArrayProto.slice
var toString = ObjProto.toString
var nativeForEach = ArrayProto.forEach
var breaker = false
var isArguments = function (obj) {
	return !!(obj && hasOwnProperty.call(obj, 'callee'))
}
var each = function (obj, iterator, context) {
	if (obj === null) return false
	if (nativeForEach && obj.forEach === nativeForEach) {
		obj.forEach(iterator, context)
	} else if (obj.length === +obj.length) {
		for (var i = 0, l = obj.length; i < l; i++) {
			if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) {
				return false
			}
		}
	} else {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				if (iterator.call(context, obj[key], key, obj) === breaker) {
					return false
				}
			}
		}
	}
}
var values = function (obj) {
	var results = []
	if (obj === null) {
		return results
	}
	each(obj, function (value) {
		results[results.length] = value
	})
	return results
}
function round(num, decimals) {
	return +num.toFixed(decimals)
}

function msToNs(duration) {
	if (typeof duration !== 'number') {
		return duration
	}
	return round(duration * 1e6, 0)
}
var isUndefined = function (obj) {
	return obj === void 0
}
var isString = function (obj) {
	return toString.call(obj) === '[object String]'
}
var isDate = function (obj) {
	return toString.call(obj) === '[object Date]'
}
var isBoolean = function (obj) {
	return toString.call(obj) === '[object Boolean]'
}
var isNumber = function (obj) {
	return toString.call(obj) === '[object Number]' && /[\d\.]+/.test(String(obj))
}

var toArray = function (iterable) {
	if (!iterable) return []
	if (iterable.toArray) {
		return iterable.toArray()
	}
	if (Array.isArray(iterable)) {
		return slice.call(iterable)
	}
	if (isArguments(iterable)) {
		return slice.call(iterable)
	}
	return values(iterable)
}
var areInOrder = function () {
	var numbers = toArray(arguments)
	for (var i = 1; i < numbers.length; i += 1) {
		if (numbers[i - 1] > numbers[i]) {
			return false
		}
	}
	return true
}
/**
 * UUID v4
 * from https://gist.github.com/jed/982883
 */
function UUID(placeholder) {
	return placeholder
		? // tslint:disable-next-line no-bitwise
		  (
				parseInt(placeholder, 10) ^
				((Math.random() * 16) >> (parseInt(placeholder, 10) / 4))
		  ).toString(16)
		: `${1e7}-${1e3}-${4e3}-${8e3}-${1e11}`.replace(/[018]/g, UUID)
}
function jsonStringify(value, replacer, space) {
	if (value === null || value === undefined) {
		return JSON.stringify(value)
	}
	var originalToJSON = [false, undefined]
	if (hasToJSON(value)) {
		// We need to add a flag and not rely on the truthiness of value.toJSON
		// because it can be set but undefined and that's actually significant.
		originalToJSON = [true, value.toJSON]
		delete value.toJSON
	}

	var originalProtoToJSON = [false, undefined]
	var prototype
	if (typeof value === 'object') {
		prototype = Object.getPrototypeOf(value)
		if (hasToJSON(prototype)) {
			originalProtoToJSON = [true, prototype.toJSON]
			delete prototype.toJSON
		}
	}

	var result
	try {
		result = JSON.stringify(value, undefined, space)
	} catch (e) {
		result = '<error: unable to serialize object>'
	} finally {
		if (originalToJSON[0]) {
			value.toJSON = originalToJSON[1]
		}
		if (originalProtoToJSON[0]) {
			prototype.toJSON = originalProtoToJSON[1]
		}
	}
	return result
}
function hasToJSON(value) {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.hasOwnProperty('toJSON')
	)
}
function elapsed(start, end) {
	return end - start
}
function getMethods(obj) {
	var funcs = []
	for (var key in obj) {
		if (typeof obj[key] === 'function' && !_enums__WEBPACK_IMPORTED_MODULE_0__.MpHook[key]) {
			funcs.push(key)
		}
	}
	return funcs
}
// 替换url包含数字的路由
function replaceNumberCharByPath(path) {
	if (path) {
		return path.replace(/\/([^\/]*)\d([^\/]*)/g, '/?')
	} else {
		return ''
	}
}
function getStatusGroup(status) {
	if (!status) return status
	return (
		String(status).substr(0, 1) + String(status).substr(1).replace(/\d*/g, 'x')
	)
}
var getQueryParamsFromUrl = function (url) {
	var result = {}
	var arr = url.split('?')
	var queryString = arr[1] || ''
	if (queryString) {
		result = getURLSearchParams('?' + queryString)
	}
	return result
}
function isPercentage(value) {
	return isNumber(value) && value >= 0 && value <= 100
}

var extend = function (obj) {
	slice.call(arguments, 1).forEach(function (source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				obj[prop] = source[prop]
			}
		}
	})
	return obj
}
var extend2Lev = function (obj) {
	slice.call(arguments, 1).forEach(function (source) {
		for (var prop in source) {
			if (source[prop] !== void 0) {
				if (isObject(source[prop]) && isObject(obj[prop])) {
					extend(obj[prop], source[prop])
				} else {
					obj[prop] = source[prop]
				}
			}
		}
	})
	return obj
}

var trim = function (str) {
	return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
}
var isObject = function (obj) {
	if (obj === null) return false
	return toString.call(obj) === '[object Object]'
}
var isEmptyObject = function (obj) {
	if (isObject(obj)) {
		for (var key in obj) {
			if (hasOwnProperty.call(obj, key)) {
				return false
			}
		}
		return true
	} else {
		return false
	}
}

var isJSONString = function (str) {
	try {
		JSON.parse(str)
	} catch (e) {
		return false
	}
	return true
}
var safeJSONParse = function (str) {
	var val = null
	try {
		val = JSON.parse(str)
	} catch (e) {
		return false
	}
	return val
}
var now =
	Date.now ||
	function () {
		return new Date().getTime()
	}
var throttle = function (func, wait, options) {
	var timeout, context, args, result
	var previous = 0
	if (!options) options = {}

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
		args = arguments
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		//下次触发 func 剩余的时间
		var remaining = wait - (now - previous)
		context = this
		// 如果没有剩余的时间了或者你改了系统时间
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			result = func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
		return result
	}
	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = null
	}
	return throttled
}
function noop() {}
/**
 * Return true if the draw is successful
 * @param threshold between 0 and 100
 */
function performDraw(threshold) {
	return threshold !== 0 && Math.random() * 100 <= threshold
}
function findByPath(source, path) {
	var pathArr = path.split('.')
	while (pathArr.length) {
		var key = pathArr.shift()
		if (source && key in source && hasOwnProperty.call(source, key)) {
			source = source[key]
		} else {
			return undefined
		}
	}
	return source
}
function withSnakeCaseKeys(candidate) {
	const result = {}
	Object.keys(candidate).forEach((key) => {
		result[toSnakeCase(key)] = deepSnakeCase(candidate[key])
	})
	return result
}

function deepSnakeCase(candidate) {
	if (Array.isArray(candidate)) {
		return candidate.map((value) => deepSnakeCase(value))
	}
	if (typeof candidate === 'object' && candidate !== null) {
		return withSnakeCaseKeys(candidate)
	}
	return candidate
}

function toSnakeCase(word) {
	return word
		.replace(/[A-Z]/g, function (uppercaseLetter, index) {
			return (index !== 0 ? '_' : '') + uppercaseLetter.toLowerCase()
		})
		.replace(/-/g, '_')
}

function escapeRowData(str) {
	if (!isString(str)) return str
	var reg = /[\s=,"]/g
	return String(str).replace(reg, function (word) {
		return '\\' + word
	})
}
var urlParse = function (para) {
	var URLParser = function (a) {
		this._fields = {
			Username: 4,
			Password: 5,
			Port: 7,
			Protocol: 2,
			Host: 6,
			Path: 8,
			URL: 0,
			QueryString: 9,
			Fragment: 10,
		}
		this._values = {}
		this._regex = null
		this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/

		if (typeof a != 'undefined') {
			this._parse(a)
		}
	}
	URLParser.prototype.setUrl = function (a) {
		this._parse(a)
	}
	URLParser.prototype._initValues = function () {
		for (var a in this._fields) {
			this._values[a] = ''
		}
	}
	URLParser.prototype.addQueryString = function (queryObj) {
		if (typeof queryObj !== 'object') {
			return false
		}
		var query = this._values.QueryString || ''
		for (var i in queryObj) {
			if (new RegExp(i + '[^&]+').test(query)) {
				query = query.replace(new RegExp(i + '[^&]+'), i + '=' + queryObj[i])
			} else {
				if (query.slice(-1) === '&') {
					query = query + i + '=' + queryObj[i]
				} else {
					if (query === '') {
						query = i + '=' + queryObj[i]
					} else {
						query = query + '&' + i + '=' + queryObj[i]
					}
				}
			}
		}
		this._values.QueryString = query
	}
	URLParser.prototype.getParse = function () {
		return this._values
	}
	URLParser.prototype.getUrl = function () {
		var url = ''
		url += this._values.Origin
		url += this._values.Port ? ':' + this._values.Port : ''
		url += this._values.Path
		url += this._values.QueryString ? '?' + this._values.QueryString : ''
		return url
	}
	URLParser.prototype._parse = function (a) {
		this._initValues()
		var b = this._regex.exec(a)
		if (!b) {
			throw 'DPURLParser::_parse -> Invalid URL'
		}
		for (var c in this._fields) {
			if (typeof b[this._fields[c]] != 'undefined') {
				this._values[c] = b[this._fields[c]]
			}
		}
		this._values['Hostname'] = this._values['Host'].replace(/:\d+$/, '')
		this._values['Origin'] =
			this._values['Protocol'] + '://' + this._values['Hostname']
	}
	return new URLParser(para)
}
const getOwnObjectKeys = function (obj, isEnumerable) {
	var keys = Object.keys(obj)
	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(obj)
		if (isEnumerable) {
			symbols = symbols.filter(function (t) {
				return Object.getOwnPropertyDescriptor(obj, t).enumerable
			})
		}
		keys.push.apply(keys, symbols)
	}
	return keys
}
const defineObject = function (obj, key, value) {
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value,
			enumerable: true,
			configurable: true,
			writable: true,
		})
	} else {
		obj[key] = value
	}
	return obj
}
const deepMixObject = function (targetObj) {
	for (var t = 1; t < arguments.length; t++) {
		var target = arguments[t] != null ? arguments[t] : {}
		if (t % 2) {
			getOwnObjectKeys(Object(target), true).forEach(function (t) {
				defineObject(targetObj, t, target[t])
			})
		} else {
			if (Object.getOwnPropertyDescriptors) {
				Object.defineProperties(
					targetObj,
					Object.getOwnPropertyDescriptors(target),
				)
			} else {
				getOwnObjectKeys(Object(target)).forEach(function (t) {
					Object.defineProperty(
						targetObj,
						t,
						Object.getOwnPropertyDescriptor(target, t),
					)
				})
			}
		}
	}
	return targetObj
}


/***/ }),

/***/ "./src/rumEventsCollection/action/actionCollection.js":
/*!************************************************************!*\
  !*** ./src/rumEventsCollection/action/actionCollection.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startActionCollection": () => (/* binding */ startActionCollection)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _trackActions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./trackActions */ "./src/rumEventsCollection/action/trackActions.js");





function startActionCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_COMPLETED,
		function (action) {
			lifeCycle.notify(
				_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
				processAction(action),
			)
		},
	)
	if (configuration.trackInteractions) {
		(0,_trackActions__WEBPACK_IMPORTED_MODULE_3__.trackActions)(lifeCycle)
	}
}

function processAction(action) {
	var autoActionProperties = {
		action: {
			error: {
				count: action.counts.errorCount,
			},
			id: action.id,
			loadingTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(action.duration),
			long_task: {
				count: action.counts.longTaskCount,
			},
			resource: {
				count: action.counts.resourceCount,
			},
		},
	}
	var actionEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(
		{
			action: {
				target: {
					name: action.name,
				},
				type: action.type,
			},
			date: action.startClocks,
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.ACTION,
		},
		autoActionProperties,
	)
	return {
		rawRumEvent: actionEvent,
		startTime: action.startClocks,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/action/trackActions.js":
/*!********************************************************!*\
  !*** ./src/rumEventsCollection/action/trackActions.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trackActions": () => (/* binding */ trackActions)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_miniaTouch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/miniaTouch */ "./src/core/miniaTouch.js");
/* harmony import */ var _trackEventCounts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../trackEventCounts */ "./src/rumEventsCollection/trackEventCounts.js");
/* harmony import */ var _trackPageActiveites__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../trackPageActiveites */ "./src/rumEventsCollection/trackPageActiveites.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");






function trackActions(lifeCycle) {
	var action = startActionManagement(lifeCycle)

	// New views trigger the discard of the current pending Action
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.VIEW_CREATED, function () {
		action.discardCurrent()
	})
	var originPage = Page
	Page = function (page) {
		const methods = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.getMethods)(page)
		methods.forEach((methodName) => {
			clickProxy(
				page,
				methodName,
				function (_action) {
					action.create(_action.type, _action.name)
				},
				lifeCycle,
			)
		})
		return originPage(page)
	}
	var originComponent = Component
	Component = function (component) {
		const methods = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.getMethods)(component)
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
function clickProxy(page, methodName, callback, lifeCycle) {
	var oirginMethod = page[methodName]

	page[methodName] = function () {
		const result = oirginMethod.apply(this, arguments)
		var action = {}
		if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(arguments[0])) {
			var currentTarget = arguments[0].currentTarget || {}
			var dataset = currentTarget.dataset || {}
			var actionType = arguments[0].type
			if (actionType && _helper_enums__WEBPACK_IMPORTED_MODULE_5__.ActionType[actionType]) {
				action.type = actionType
				action.name = dataset.name || dataset.content || dataset.type
				callback(action)
			} else if (methodName === 'onAddToFavorites') {
				action.type = 'click'
				action.name =
					'收藏 ' +
					'标题: ' +
					result.title +
					(result.query ? ' query: ' + result.query : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onShareAppMessage') {
				action.type = 'click'
				action.name =
					'转发 ' +
					'标题: ' +
					result.title +
					(result.path ? ' path: ' + result.path : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onShareTimeline') {
				action.type = 'click'
				action.name =
					'分享到朋友圈 ' +
					'标题: ' +
					result.title +
					(result.query ? ' query: ' + result.query : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			} else if (methodName === 'onTabItemTap') {
				var item = arguments.length && arguments[0]
				action.type = 'click'
				action.name =
					'tab ' +
					'名称: ' +
					item.text +
					(item.pagePath ? ' 跳转到: ' + item.pagePath : '')
				callback(action)
				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, true)
			}
		}
		return result
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
			currentIdlePageActivitySubscription = (0,_trackPageActiveites__WEBPACK_IMPORTED_MODULE_4__.waitIdlePageActivity)(
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
	this.id = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)()
	this.startClocks = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
	this.name = name
	this.type = type
	this.lifeCycle = lifeCycle
	this.eventCountsSubscription = (0,_trackEventCounts__WEBPACK_IMPORTED_MODULE_3__.trackEventCounts)(lifeCycle)
	this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_CREATED, {
		id: this.id,
		startClocks: this.startClocks,
	})
}
PendingAutoAction.prototype = {
	complete: function (endTime) {
		var eventCounts = this.eventCountsSubscription.eventCounts
		this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_COMPLETED, {
			counts: {
				errorCount: eventCounts.errorCount,
				longTaskCount: eventCounts.longTaskCount,
				resourceCount: eventCounts.resourceCount,
			},
			duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.elapsed)(this.startClocks, endTime),
			id: this.id,
			name: this.name,
			startClocks: this.startClocks,
			type: this.type,
		})
		this.eventCountsSubscription.stop()
	},
	discard: function () {
		this.lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.AUTO_ACTION_DISCARDED)
		this.eventCountsSubscription.stop()
	},
}


/***/ }),

/***/ "./src/rumEventsCollection/app/appCollection.js":
/*!******************************************************!*\
  !*** ./src/rumEventsCollection/app/appCollection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startAppCollection": () => (/* binding */ startAppCollection)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/rumEventsCollection/app/index.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");




function startAppCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, function (appinfo) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processAppUpdate(appinfo),
		)
	})

	return (0,_index__WEBPACK_IMPORTED_MODULE_0__.rewriteApp)(configuration, lifeCycle)
}

function processAppUpdate(appinfo) {
	var appEvent = {
		date: appinfo.startTime,
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.APP,
		app: {
			startupDuration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.startupDuration),
			scriptLoadDuration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.scriptLoadDuration),
			codeDownloadDuration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.codeDownloadDuration),
			startupType: appinfo.startupType,
			timeSpent: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.msToNs)(appinfo.duration),
		},
	}
	return {
		rawRumEvent: appEvent,
		startTime: appinfo.startTime,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/app/index.js":
/*!**********************************************!*\
  !*** ./src/rumEventsCollection/app/index.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "THROTTLE_VIEW_UPDATE_PERIOD": () => (/* binding */ THROTTLE_VIEW_UPDATE_PERIOD),
/* harmony export */   "startupTypes": () => (/* binding */ startupTypes),
/* harmony export */   "rewriteApp": () => (/* binding */ rewriteApp)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");



// 劫持原小程序App方法
var THROTTLE_VIEW_UPDATE_PERIOD = 3000
const startupTypes = {
	COLD: 'cold',
	HOT: 'hot',
}
function rewriteApp(configuration, lifeCycle) {
	const originApp = App
	var appInfo = {
		isStartUp: false, // 是否启动
	}
	var startTime
	App = function (app) {
		startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		// 合并方法，插入记录脚本
		;['onLaunch', 'onShow', 'onHide'].forEach((methodName) => {
			const userDefinedMethod = app[methodName] // 暂存用户定义的方法
			app[methodName] = function (options) {
				console.log(methodName, 'methodName app')
				if (methodName === 'onLaunch') {
					appInfo.isStartUp = true
					appInfo.isHide = false
					appInfo.startupType = startupTypes.COLD
				} else if (methodName === 'onShow') {
					if (appInfo.isStartUp && appInfo.isHide) {
						// 判断是热启动
						appInfo.startupType = startupTypes.HOT
						appUpdate()
					}
				} else if (methodName === 'onHide') {
					lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_HIDE)
					appInfo.isHide = true
				}
				return userDefinedMethod && userDefinedMethod.call(this, options)
			}
		})
		return originApp(app)
	}
	startPerformanceObservable(lifeCycle, function (data) {
		appInfo = {
			...appInfo,
			...data,
		}
		appUpdate()
	})
	var scheduleAppUpdate = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.throttle)(appUpdate, THROTTLE_VIEW_UPDATE_PERIOD, {
		leading: false,
	})
	function appUpdate() {
		lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.APP_UPDATE, {
			startupDuration: appInfo.startupDuration,
			scriptLoadDuration: appInfo.scriptLoadDuration,
			codeDownloadDuration: appInfo.codeDownloadDuration,
			startupType: appInfo.startupType,
			startTime,
			duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime,
		})
	}
}

function startPerformanceObservable(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			// 过滤掉其他页面监听，只保留首次启动
			var startupDuration, scriptLoadDuration, codeDownloadDuration
			const launchEntity = entitys.find(
				(entity) =>
					entity.entryType === 'navigation' &&
					entity.navigationType === 'appLaunch',
			)
			if (typeof launchEntity !== 'undefined') {
				startupDuration = launchEntity.duration
			}
			const scriptentity = entitys.find(
				(entity) =>
					entity.entryType === 'script' && entity.name === 'evaluateScript',
			)
			if (typeof scriptentity !== 'undefined') {
				scriptLoadDuration = scriptentity.duration
			}
			const firstEntity = entitys.find(
				(entity) =>
					entity.entryType === 'render' && entity.name === 'firstRender',
			)
			if (firstEntity && scriptentity && launchEntity) {
				if (
					!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.areInOrder)(firstEntity.duration, launchEntity.duration) ||
					!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.areInOrder)(scriptentity.duration, launchEntity.duration)
				) {
					return
				}
				codeDownloadDuration =
					launchEntity.duration - firstEntity.duration - scriptentity.duration
				// 资源下载时间暂时定为：首次启动时间-脚本加载时间-初次渲染时间
			}
			callback({
				startupDuration,
				scriptLoadDuration,
				codeDownloadDuration,
			})
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/assembly.js":
/*!*********************************************!*\
  !*** ./src/rumEventsCollection/assembly.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRumAssembly": () => (/* binding */ startRumAssembly)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/baseInfo */ "./src/core/baseInfo.js");



function isTracked(configuration) {
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.performDraw)(configuration.sampleRate)
}
function startRumAssembly(
	applicationId,
	configuration,
	lifeCycle,
	parentContexts,
) {
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var startTime = data.startTime
			var rawRumEvent = data.rawRumEvent
			var viewContext = parentContexts.findView(startTime)
			// console.log(
			// 	viewContext,
			// 	viewContext && viewContext.page && viewContext.page.route,
			// 	'viewContent====',
			// )
			if (rawRumEvent.type === 'view') {
				// console.log(
				// 	viewContext,
				// 	viewContext.page && viewContext.page.route,
				// 	'viewContextviewContext====',
				// )
			}

			var deviceContext = {
				device: _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__.default.deviceInfo,
			}
			if (
				isTracked(configuration) &&
				(viewContext || rawRumEvent.type === 'app')
			) {
				var actionContext = parentContexts.findAction(startTime)
				var rumContext = {
					_dd: {
						sdkName: configuration.sdkName,
						sdkVersion: configuration.sdkVersion,
						env: configuration.env,
						version: configuration.version,
					},
					tags: configuration.tags,
					application: {
						id: applicationId,
					},
					device: {},
					date: new Date().getTime(),
					session: {
						id: _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__.default.getSessionId(),
					},
					user: {
						user_id: configuration.user_id || _core_baseInfo__WEBPACK_IMPORTED_MODULE_2__.default.getClientID(),
						is_signin: configuration.user_id ? 'T' : 'F',
					},
				}

				var rumEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend2Lev)(
					rumContext,
					deviceContext,
					viewContext,
					actionContext,
					rawRumEvent,
				)

				var serverRumEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.withSnakeCaseKeys)(rumEvent)
				// if (
				// 	serverRumEvent.type === 'view' ||
				// 	serverRumEvent.type === 'action'
				// ) {
				// 	console.log(serverRumEvent, 'serverRumEvent')
				// }

				lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RUM_EVENT_COLLECTED, serverRumEvent)
			}
		},
	)
}


/***/ }),

/***/ "./src/rumEventsCollection/error/errorCollection.js":
/*!**********************************************************!*\
  !*** ./src/rumEventsCollection/error/errorCollection.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startErrorCollection": () => (/* binding */ startErrorCollection),
/* harmony export */   "doStartErrorCollection": () => (/* binding */ doStartErrorCollection)
/* harmony export */ });
/* harmony import */ var _core_errorCollection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/errorCollection */ "./src/core/errorCollection.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");




function startErrorCollection(lifeCycle, configuration) {
	return doStartErrorCollection(
		lifeCycle,
		configuration,
		(0,_core_errorCollection__WEBPACK_IMPORTED_MODULE_0__.startAutomaticErrorCollection)(configuration),
	)
}

function doStartErrorCollection(lifeCycle, configuration, observable) {
	observable.subscribe(function (error) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processError(error),
		)
	})
}

function processError(error) {
	var resource = error.resource
	if (resource) {
		var urlObj = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.urlParse)(error.resource.url).getParse()
		resource = {
			method: error.resource.method,
			status: error.resource.statusCode,
			statusGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.getStatusGroup)(error.resource.statusCode),
			url: error.resource.url,
			urlHost: urlObj.Host,
			urlPath: urlObj.Path,
			urlPathGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.replaceNumberCharByPath)(urlObj.Path),
		}
	}
	var rawRumEvent = {
		date: error.startTime,
		error: {
			message: error.message,
			resource: resource,
			source: error.source,
			stack: error.stack,
			type: error.type,
			starttime: error.startTime,
		},
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ERROR,
	}
	return {
		rawRumEvent: rawRumEvent,
		startTime: error.startTime,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/page/index.js":
/*!***********************************************!*\
  !*** ./src/rumEventsCollection/page/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "THROTTLE_VIEW_UPDATE_PERIOD": () => (/* binding */ THROTTLE_VIEW_UPDATE_PERIOD),
/* harmony export */   "rewritePage": () => (/* binding */ rewritePage)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _trackEventCounts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../trackEventCounts */ "./src/rumEventsCollection/trackEventCounts.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");



// 劫持原小程序App方法
var THROTTLE_VIEW_UPDATE_PERIOD = 3000

function rewritePage(configuration, lifeCycle) {
	const originPage = Page
	console.log(originPage, 'originPage=====')
	Page = function (page) {
		// 合并方法，插入记录脚本
		var currentView,
			startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		console
			.log(page, 'page======')
			[('onReady', 'onShow', 'onLoad', 'onUnload', 'onHide')].forEach(
				(methodName) => {
					const userDefinedMethod = page[methodName]
					page[methodName] = function () {
						console.log(methodName, 'methodName page')
						if (methodName === 'onShow' || methodName === 'onLoad') {
							if (typeof currentView === 'undefined') {
								const activePage = getActivePage()
								currentView = newView(
									lifeCycle,
									activePage && activePage.route,
									startTime,
								)
							}
						}

						currentView && currentView.setLoadEventEnd(methodName)

						if (
							(methodName === 'onUnload' ||
								methodName === 'onHide' ||
								methodName === 'onShow') &&
							currentView
						) {
							currentView.triggerUpdate()
							if (methodName === 'onUnload' || methodName === 'onHide') {
								currentView.end()
							}
						}
						return userDefinedMethod && userDefinedMethod.apply(this, arguments)
					}
				},
			)
		return originPage(page)
	}
}
function newView(lifeCycle, route, startTime) {
	if (typeof startTime === 'undefined') {
		startTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
	}
	var id = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.UUID)()
	var isActive = true
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
		userActionCount: 0,
	}
	var setdataCount = 0

	var documentVersion = 0
	var setdataDuration = 0
	var loadingDuration = 0
	var loadingTime
	var showTime
	var onload2onshowTime
	var onshow2onready
	var stayTime
	var fpt, fmp
	lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_CREATED, {
		id,
		startTime,
		route,
	})
	var scheduleViewUpdate = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.throttle)(
		triggerViewUpdate,
		THROTTLE_VIEW_UPDATE_PERIOD,
		{
			leading: false,
		},
	)
	var cancelScheduleViewUpdate = scheduleViewUpdate.cancel
	var _trackEventCounts = (0,_trackEventCounts__WEBPACK_IMPORTED_MODULE_1__.trackEventCounts)(
		lifeCycle,
		function (newEventCounts) {
			eventCounts = newEventCounts
			scheduleViewUpdate()
		},
	)
	var stopEventCountsTracking = _trackEventCounts.stop
	var _trackFptTime = trackFptTime(lifeCycle, function (duration) {
		fpt = duration
		scheduleViewUpdate()
	})
	var stopFptTracking = _trackFptTime.stop
	var _trackSetDataTime = trackSetDataTime(lifeCycle, function (duration) {
		if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
			setdataDuration += duration
			setdataCount++
			scheduleViewUpdate()
		}
	})
	var stopSetDataTracking = _trackSetDataTime.stop
	var _trackLoadingTime = trackLoadingTime(lifeCycle, function (duration) {
		if ((0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.isNumber)(duration)) {
			loadingDuration = duration
			scheduleViewUpdate()
		}
	})
	var stopLoadingTimeTracking = _trackLoadingTime.stop

	var setLoadEventEnd = function (type) {
		if (type === 'onLoad') {
			loadingTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		} else if (type === 'onShow') {
			showTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
			if (
				typeof onload2onshowTime === 'undefined' &&
				typeof loadingTime !== 'undefined'
			) {
				onload2onshowTime = showTime - loadingTime
			}
		} else if (type === 'onReady') {
			if (
				typeof onshow2onready === 'undefined' &&
				typeof showTime !== 'undefined'
			) {
				onshow2onready = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - showTime
			}
			if (typeof fmp === 'undefined') {
				fmp = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime // 从开发者角度看，小程序首屏渲染完成的标志是首页 Page.onReady 事件触发。
			}
		} else if (type === 'onHide' || type === 'onUnload') {
			if (typeof showTime !== 'undefined') {
				stayTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - showTime
			}
			isActive = false
		}
		triggerViewUpdate()
	}
	function triggerViewUpdate() {
		documentVersion += 1
		lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_UPDATED, {
			documentVersion: documentVersion,
			eventCounts: eventCounts,
			id: id,
			loadingTime: loadingDuration,
			stayTime,
			onload2onshowTime,
			onshow2onready,
			setdataDuration,
			setdataCount,
			fmp,
			fpt,
			startTime: startTime,
			route: route,
			duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() - startTime,
			isActive: isActive,
		})
	}
	return {
		scheduleUpdate: scheduleViewUpdate,
		setLoadEventEnd,
		triggerUpdate: function () {
			cancelScheduleViewUpdate()
			triggerViewUpdate()
		},
		end: function () {
			stopEventCountsTracking()
			stopFptTracking()
			cancelScheduleViewUpdate()
			stopSetDataTracking()
			stopLoadingTimeTracking()
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_ENDED, { endClocks: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() })
		},
	}
}
function trackFptTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			const firstRenderEntity = entitys.find(
				(entity) =>
					entity.entryType === 'render' && entity.name === 'firstRender',
			)

			if (typeof firstRenderEntity !== 'undefined') {
				callback(firstRenderEntity.duration)
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function trackLoadingTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
		function (entitys) {
			const navigationEnity = entitys.find(
				(entity) => entity.entryType === 'navigation',
			)
			if (typeof navigationEnity !== 'undefined') {
				callback(navigationEnity.duration)
			}
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function trackSetDataTime(lifeCycle, callback) {
	var subscribe = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.PAGE_SET_DATA_UPDATE,
		function (data) {
			if (!data) return
			callback(data.updateEndTimestamp - data.pendingStartTimestamp)
		},
	)
	return {
		stop: subscribe.unsubscribe,
	}
}
function getActivePage() {
	const curPages = getCurrentPages()
	if (curPages.length) {
		return curPages[curPages.length - 1]
	}
	return {}
}


/***/ }),

/***/ "./src/rumEventsCollection/page/viewCollection.js":
/*!********************************************************!*\
  !*** ./src/rumEventsCollection/page/viewCollection.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startViewCollection": () => (/* binding */ startViewCollection)
/* harmony export */ });
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ "./src/rumEventsCollection/page/index.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");




function startViewCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__.LifeCycleEventType.VIEW_UPDATED, function (view) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_3__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processViewUpdate(view),
		)
	})

	return (0,_index__WEBPACK_IMPORTED_MODULE_0__.rewritePage)(configuration, lifeCycle)
}
function processViewUpdate(view) {
	var apdexLevel
	if (view.fmp) {
		apdexLevel = parseInt(Number(view.fmp) / 1000)
		apdexLevel = apdexLevel > 9 ? 9 : apdexLevel
	}
	var viewEvent = {
		_dd: {
			documentVersion: view.documentVersion,
		},
		date: view.startTime,
		type: _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.VIEW,
		page: {
			action: {
				count: view.eventCounts.userActionCount,
			},
			error: {
				count: view.eventCounts.errorCount,
			},
			setdata: {
				count: view.setdataCount,
			},
			setdata_duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.setdataDuration),
			loadingTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.loadingTime),
			stayTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.stayTime),
			onload2onshow: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.onload2onshowTime),
			onshow2onready: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.onshow2onready),
			fpt: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.fpt),
			fmp: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.fmp),
			isActive: view.isActive,
			apdexLevel,
			// longTask: {
			//   count: view.eventCounts.longTaskCount
			// },
			resource: {
				count: view.eventCounts.resourceCount,
			},
			timeSpent: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(view.duration),
		},
	}
	return {
		rawRumEvent: viewEvent,
		startTime: view.startTime,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/parentContexts.js":
/*!***************************************************!*\
  !*** ./src/rumEventsCollection/parentContexts.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VIEW_CONTEXT_TIME_OUT_DELAY": () => (/* binding */ VIEW_CONTEXT_TIME_OUT_DELAY),
/* harmony export */   "CLEAR_OLD_CONTEXTS_INTERVAL": () => (/* binding */ CLEAR_OLD_CONTEXTS_INTERVAL),
/* harmony export */   "startParentContexts": () => (/* binding */ startParentContexts)
/* harmony export */ });
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");



var VIEW_CONTEXT_TIME_OUT_DELAY = 4 * _helper_enums__WEBPACK_IMPORTED_MODULE_0__.ONE_HOUR
var CLEAR_OLD_CONTEXTS_INTERVAL = _helper_enums__WEBPACK_IMPORTED_MODULE_0__.ONE_MINUTE

function startParentContexts(lifeCycle) {
	var currentView
	var currentAction
	var previousViews = []
	var previousActions = []
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_CREATED,
		function (currentContext) {
			currentView = currentContext
		},
	)

	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_UPDATED,
		function (currentContext) {
			// A view can be updated after its end.  We have to ensure that the view being updated is the
			// most recently created.
			if (currentView && currentView.id === currentContext.id) {
				currentView = currentContext
			}
		},
	)
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.VIEW_ENDED, function (data) {
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
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_CREATED,
		function (currentContext) {
			currentAction = currentContext
		},
	)

	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_COMPLETED,
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

	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.AUTO_ACTION_DISCARDED, function () {
		currentAction = undefined
	})
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.SESSION_RENEWED, function () {
		previousViews = []
		previousActions = []
		currentView = undefined
		currentAction = undefined
	})
	var clearOldContextsInterval = setInterval(function () {
		clearOldContexts(previousViews, VIEW_CONTEXT_TIME_OUT_DELAY)
	}, CLEAR_OLD_CONTEXTS_INTERVAL)

	function clearOldContexts(previousContexts, timeOutDelay) {
		var oldTimeThreshold = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.now)() - timeOutDelay
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
		;(0,_helper_utils__WEBPACK_IMPORTED_MODULE_1__.each)(previousContexts, function (previousContext) {
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


/***/ }),

/***/ "./src/rumEventsCollection/performanceCollection.js":
/*!**********************************************************!*\
  !*** ./src/rumEventsCollection/performanceCollection.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startPagePerformanceObservable": () => (/* binding */ startPagePerformanceObservable)
/* harmony export */ });
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/sdk */ "./src/core/sdk.js");


function startPagePerformanceObservable(lifeCycle, configuration) {
	if (!!_core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.getPerformance) {
		const performance = _core_sdk__WEBPACK_IMPORTED_MODULE_1__.sdk.getPerformance()
		const observer = performance.createObserver((entryList) => {
			lifeCycle.notify(
				_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PERFORMANCE_ENTRY_COLLECTED,
				entryList.getEntries(),
			)
		})
		observer.observe({ entryTypes: ['render', 'script', 'navigation'] })
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/requestCollection.js":
/*!******************************************************!*\
  !*** ./src/rumEventsCollection/requestCollection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRequestCollection": () => (/* binding */ startRequestCollection),
/* harmony export */   "trackXhr": () => (/* binding */ trackXhr),
/* harmony export */   "trackDownload": () => (/* binding */ trackDownload)
/* harmony export */ });
/* harmony import */ var _core_xhrProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/xhrProxy */ "./src/core/xhrProxy.js");
/* harmony import */ var _core_downloadProxy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/downloadProxy */ "./src/core/downloadProxy.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rumEventsCollection/resource/resourceUtils */ "./src/rumEventsCollection/resource/resourceUtils.js");





var nextRequestIndex = 1

function startRequestCollection(lifeCycle, configuration) {
	trackXhr(lifeCycle, configuration)
	trackDownload(lifeCycle, configuration)
}
function parseHeader(header) {
	// 大小写兼容
	if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.isObject)(header)) return header
	var res = {}
	Object.keys(header).forEach(function (key) {
		res[key.toLowerCase()] = header[key]
	})
	return res
}
function getHeaderString(header) {
	if (!(0,_helper_utils__WEBPACK_IMPORTED_MODULE_3__.isObject)(header)) return header
	var headerStr = ''
	Object.keys(header).forEach(function (key) {
		headerStr += key + ':' + header[key] + ';'
	})
	return headerStr
}
function trackXhr(lifeCycle, configuration) {
	var xhrProxy = (0,_core_xhrProxy__WEBPACK_IMPORTED_MODULE_0__.startXhrProxy)()
	xhrProxy.beforeSend(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			context.requestIndex = getNextRequestIndex()
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_STARTED, {
				requestIndex: context.requestIndex,
			})
		}
	})
	xhrProxy.onRequestComplete(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_COMPLETED, {
				duration: context.duration,
				method: context.method,
				requestIndex: context.requestIndex,
				performance: context.profile,
				response: context.response,
				startTime: context.startTime,
				status: context.status,
				type: context.type,
				url: context.url,
			})
		}
	})
	return xhrProxy
}
function trackDownload(lifeCycle, configuration) {
	var dwonloadProxy = (0,_core_downloadProxy__WEBPACK_IMPORTED_MODULE_1__.startDownloadProxy)()
	dwonloadProxy.beforeSend(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			context.requestIndex = getNextRequestIndex()
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_STARTED, {
				requestIndex: context.requestIndex,
			})
		}
	})
	dwonloadProxy.onRequestComplete(function (context) {
		if ((0,_rumEventsCollection_resource_resourceUtils__WEBPACK_IMPORTED_MODULE_4__.isAllowedRequestUrl)(configuration, context.url)) {
			lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.REQUEST_COMPLETED, {
				duration: context.duration,
				method: context.method,
				requestIndex: context.requestIndex,
				performance: context.profile,
				response: context.response,
				startTime: context.startTime,
				status: context.status,
				type: context.type,
				url: context.url,
			})
		}
	})
	return dwonloadProxy
}
function getNextRequestIndex() {
	var result = nextRequestIndex
	nextRequestIndex += 1
	return result
}


/***/ }),

/***/ "./src/rumEventsCollection/resource/resourceCollection.js":
/*!****************************************************************!*\
  !*** ./src/rumEventsCollection/resource/resourceCollection.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startResourceCollection": () => (/* binding */ startResourceCollection)
/* harmony export */ });
/* harmony import */ var _resourceUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resourceUtils */ "./src/rumEventsCollection/resource/resourceUtils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");




function startResourceCollection(lifeCycle, configuration) {
	lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_COMPLETED, function (request) {
		lifeCycle.notify(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
			processRequest(request),
		)
	})
}

function processRequest(request) {
	var type = request.type
	var timing = request.performance
	var correspondingTimingOverrides = timing
		? computePerformanceEntryMetrics(timing)
		: undefined
	var urlObj = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.urlParse)(request.url).getParse()
	var startTime = request.startTime
	var resourceEvent = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.extend2Lev)(
		{
			date: startTime,
			resource: {
				type: type,
				duration: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.msToNs)(request.duration),
				method: request.method,
				status: request.status,
				statusGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.getStatusGroup)(request.status),
				url: request.url,
				urlHost: urlObj.Host,
				urlPath: urlObj.Path,
				urlPathGroup: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.replaceNumberCharByPath)(urlObj.Path),
				urlQuery: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.jsonStringify)((0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.getQueryParamsFromUrl)(request.url)),
			},
			type: _helper_enums__WEBPACK_IMPORTED_MODULE_3__.RumEventType.RESOURCE,
		},
		correspondingTimingOverrides,
	)
	return { startTime: startTime, rawRumEvent: resourceEvent }
}
function computePerformanceEntryMetrics(timing) {
	return {
		resource: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_2__.extend2Lev)(
			{},
			{
				load: (0,_resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computePerformanceResourceDuration)(timing),
				size: (0,_resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computeSize)(timing),
			},
			(0,_resourceUtils__WEBPACK_IMPORTED_MODULE_0__.computePerformanceResourceDetails)(timing),
		),
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/resource/resourceUtils.js":
/*!***********************************************************!*\
  !*** ./src/rumEventsCollection/resource/resourceUtils.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "computePerformanceResourceDuration": () => (/* binding */ computePerformanceResourceDuration),
/* harmony export */   "computePerformanceResourceDetails": () => (/* binding */ computePerformanceResourceDetails),
/* harmony export */   "toValidEntry": () => (/* binding */ toValidEntry),
/* harmony export */   "computeSize": () => (/* binding */ computeSize),
/* harmony export */   "isAllowedRequestUrl": () => (/* binding */ isAllowedRequestUrl)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/configuration */ "./src/core/configuration.js");



function areInOrder() {
	var numbers = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.toArray)(arguments)
	for (var i = 1; i < numbers.length; i += 1) {
		if (numbers[i - 1] > numbers[i]) {
			return false
		}
	}
	return true
}

function computePerformanceResourceDuration(entry) {
	// Safari duration is always 0 on timings blocked by cross origin policies.
	if (entry.startTime < entry.responseEnd) {
		return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(entry.responseEnd - entry.startTime)
	}
}

//  interface PerformanceResourceDetails {
//   redirect?: PerformanceResourceDetailsElement
//   dns?: PerformanceResourceDetailsElement
//   connect?: PerformanceResourceDetailsElement
//   ssl?: PerformanceResourceDetailsElement
//   firstByte: PerformanceResourceDetailsElement
//   download: PerformanceResourceDetailsElement
//   fmp:
// }
// page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
// page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
// page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
// page_firstbyte	float		首包时间	responseStart - domainLookupStart
// page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
// page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
// page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
// page_tcp	float		tcp连接时间	connectEnd - connectStart
// page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
// page_ttfb	float		请求响应耗时	responseStart - requestStart
// page_trans	float		内容传输时间	responseEnd - responseStart
// page_dom	float		DOM解析耗时	domInteractive - responseEnd
// page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd

//  navigationStart：当前浏览器窗口的前一个网页关闭，发生unload事件时的Unix毫秒时间戳。如果没有前一个网页，则等于fetchStart属性。

// ·   unloadEventStart：如果前一个网页与当前网页属于同一个域名，则返回前一个网页的unload事件发生时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

// ·   unloadEventEnd：如果前一个网页与当前网页属于同一个域名，则返回前一个网页unload事件的回调函数结束时的Unix毫秒时间戳。如果没有前一个网页，或者之前的网页跳转不是在同一个域名内，则返回值为0。

// ·   redirectStart：返回第一个HTTP跳转开始时的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

// ·   redirectEnd：返回最后一个HTTP跳转结束时（即跳转回应的最后一个字节接受完成时）的Unix毫秒时间戳。如果没有跳转，或者不是同一个域名内部的跳转，则返回值为0。

// ·   fetchStart：返回浏览器准备使用HTTP请求读取文档时的Unix毫秒时间戳。该事件在网页查询本地缓存之前发生。

// ·   domainLookupStart：返回域名查询开始时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

// ·   domainLookupEnd：返回域名查询结束时的Unix毫秒时间戳。如果使用持久连接，或者信息是从本地缓存获取的，则返回值等同于fetchStart属性的值。

// ·   connectStart：返回HTTP请求开始向服务器发送时的Unix毫秒时间戳。如果使用持久连接（persistent connection），则返回值等同于fetchStart属性的值。

// ·   connectEnd：返回浏览器与服务器之间的连接建立时的Unix毫秒时间戳。如果建立的是持久连接，则返回值等同于fetchStart属性的值。连接建立指的是所有握手和认证过程全部结束。

// ·   secureConnectionStart：返回浏览器与服务器开始安全链接的握手时的Unix毫秒时间戳。如果当前网页不要求安全连接，则返回0。

// ·   requestStart：返回浏览器向服务器发出HTTP请求时（或开始读取本地缓存时）的Unix毫秒时间戳。

// ·   responseStart：返回浏览器从服务器收到（或从本地缓存读取）第一个字节时的Unix毫秒时间戳。

// ·   responseEnd：返回浏览器从服务器收到（或从本地缓存读取）最后一个字节时（如果在此之前HTTP连接已经关闭，则返回关闭时）的Unix毫秒时间戳。

// ·   domLoading：返回当前网页DOM结构开始解析时（即Document.readyState属性变为“loading”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

// ·   domInteractive：返回当前网页DOM结构结束解析、开始加载内嵌资源时（即Document.readyState属性变为“interactive”、相应的readystatechange事件触发时）的Unix毫秒时间戳。

// ·   domContentLoadedEventStart：返回当前网页DOMContentLoaded事件发生时（即DOM结构解析完毕、所有脚本开始运行时）的Unix毫秒时间戳。

// ·   domContentLoadedEventEnd：返回当前网页所有需要执行的脚本执行完成时的Unix毫秒时间戳。

// ·   domComplete：返回当前网页DOM结构生成时（即Document.readyState属性变为“complete”，以及相应的readystatechange事件发生时）的Unix毫秒时间戳。

// ·   loadEventStart：返回当前网页load事件的回调函数开始时的Unix毫秒时间戳。如果该事件还没有发生，返回0。

// ·   loadEventEnd：返回当前网页load事件的回调函数运行结束时的Unix毫秒时间戳。如果该事件还没有发生，返回0
function computePerformanceResourceDetails(entry) {
	var validEntry = toValidEntry(entry)

	if (!validEntry) {
		return undefined
	}

	var startTime = validEntry.startTime,
		fetchStart = validEntry.fetchStart,
		redirectStart = validEntry.redirectStart,
		redirectEnd = validEntry.redirectEnd,
		domainLookupStart =
			validEntry.domainLookupStart || validEntry.domainLookUpStart,
		domainLookupEnd = validEntry.domainLookupEnd || validEntry.domainLookUpEnd,
		connectStart = validEntry.connectStart,
		SSLconnectionStart = validEntry.SSLconnectionStart,
		SSLconnectionEnd = validEntry.SSLconnectionEnd,
		connectEnd = validEntry.connectEnd,
		requestStart = validEntry.requestStart,
		responseStart = validEntry.responseStart,
		responseEnd = validEntry.responseEnd
	var details = {
		firstbyte: formatTiming(startTime, domainLookupStart, responseStart),
		trans: formatTiming(startTime, responseStart, responseEnd),
		ttfb: formatTiming(startTime, requestStart, responseStart),
	}
	// Make sure a connection occurred
	if (connectEnd !== fetchStart) {
		details.tcp = formatTiming(startTime, connectStart, connectEnd)

		// Make sure a secure connection occurred
		if (areInOrder(connectStart, SSLconnectionStart, SSLconnectionEnd)) {
			details.ssl = formatTiming(
				startTime,
				SSLconnectionStart,
				SSLconnectionEnd,
			)
		}
	}

	// Make sure a domain lookup occurred
	if (domainLookupEnd !== fetchStart) {
		details.dns = formatTiming(startTime, domainLookupStart, domainLookupEnd)
	}

	if (hasRedirection(entry)) {
		details.redirect = formatTiming(startTime, redirectStart, redirectEnd)
	}

	return details
}

function toValidEntry(entry) {
	// Ensure timings are in the right order. On top of filtering out potential invalid
	// RumPerformanceResourceTiming, it will ignore entries from requests where timings cannot be
	// collected, for example cross origin requests without a "Timing-Allow-Origin" header allowing
	// it.
	// page_fmp	float		首屏时间(用于衡量用户什么时候看到页面的主要内容)，跟FCP的时长非常接近，这里我们就用FCP的时间作为首屏时间	firstPaintContentEnd - firstPaintContentStart
	// page_fpt	float		首次渲染时间，即白屏时间(从请求开始到浏览器开始解析第一批HTML文档字节的时间差。)	responseEnd - fetchStart
	// page_tti	float		首次可交互时间(浏览器完成所有HTML解析并且完成DOM构建，此时浏览器开始加载资源。)	domInteractive - fetchStart
	// page_firstbyte	float		首包时间	responseStart - domainLookupStart
	// page_dom_ready	float		DOM Ready时间(如果页面有同步执行的JS，则同步JS执行时间=ready-tti。)	domContentLoadEventEnd - fetchStart
	// page_load	float		页面完全加载时间(load=首次渲染时间+DOM解析耗时+同步JS执行+资源加载耗时。)	loadEventStart - fetchStart
	// page_dns	float		dns解析时间	domainLookupEnd - domainLookupStart
	// page_tcp	float		tcp连接时间	connectEnd - connectStart
	// page_ssl	float		ssl安全连接时间(仅适用于https)	connectEnd - secureConnectionStart
	// page_ttfb	float		请求响应耗时	responseStart - requestStart
	// page_trans	float		内容传输时间	responseEnd - responseStart
	// page_dom	float		DOM解析耗时	domInteractive - responseEnd
	// page_resource_load_time	float		资源加载时间	loadEventStart - domContentLoadedEventEnd
	if (
		!areInOrder(
			entry.startTime,
			entry.fetchStart,
			entry.domainLookupStart,
			entry.domainLookupEnd,
			entry.connectStart,
			entry.connectEnd,
			entry.requestStart,
			entry.responseStart,
			entry.responseEnd,
		)
	) {
		return undefined
	}

	if (!hasRedirection(entry)) {
		return entry
	}

	var redirectStart = entry.redirectStart
	var redirectEnd = entry.redirectEnd
	// Firefox doesn't provide redirect timings on cross origin requests.
	// Provide a default for those.
	if (redirectStart < entry.startTime) {
		redirectStart = entry.startTime
	}
	if (redirectEnd < entry.startTime) {
		redirectEnd = entry.fetchStart
	}

	// Make sure redirect timings are in order
	if (
		!areInOrder(entry.startTime, redirectStart, redirectEnd, entry.fetchStart)
	) {
		return undefined
	}
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.extend)({}, entry, {
		redirectEnd: redirectEnd,
		redirectStart: redirectStart,
	})
	// return {
	//   ...entry,
	//   redirectEnd,
	//   redirectStart
	// }
}

function hasRedirection(entry) {
	// The only time fetchStart is different than startTime is if a redirection occurred.
	return entry.fetchStart !== entry.startTime
}

function formatTiming(origin, start, end) {
	return (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.msToNs)(end - start)
}

function computeSize(entry) {
	// Make sure a request actually occurred
	if (entry.startTime < entry.responseStart) {
		return entry.receivedBytedCount
	}
	return undefined
}

function isAllowedRequestUrl(configuration, url) {
	return url && !(0,_core_configuration__WEBPACK_IMPORTED_MODULE_1__.isIntakeRequest)(url, configuration)
}


/***/ }),

/***/ "./src/rumEventsCollection/setDataCollection.js":
/*!******************************************************!*\
  !*** ./src/rumEventsCollection/setDataCollection.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startSetDataColloction": () => (/* binding */ startSetDataColloction)
/* harmony export */ });
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");


function startSetDataColloction(lifeCycle) {
	const originPage = Page
	const originComponent = Component
	Page = function (page) {
		const originPageOnLoad = page['onLoad']
		page['onLoad'] = function () {
			this.setUpdatePerformanceListener &&
				this.setUpdatePerformanceListener({ withDataPaths: true }, (res) => {
					lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, res)
				})
			return originPageOnLoad.apply(this, arguments)
		}
		return originPage(page)
	}
	Component = function (component) {
		const originComponentAttached = component['attached']
		component['attached'] = function () {
			this.setUpdatePerformanceListener &&
				this.setUpdatePerformanceListener({ withDataPaths: true }, (res) => {
					lifeCycle.notify(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, res)
				})
			return originComponentAttached.apply(this, arguments)
		}
		return originComponent(component)
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/trackEventCounts.js":
/*!*****************************************************!*\
  !*** ./src/rumEventsCollection/trackEventCounts.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trackEventCounts": () => (/* binding */ trackEventCounts)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper/enums */ "./src/helper/enums.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");




function trackEventCounts(lifeCycle, callback) {
	if (typeof callback === 'undefined') {
		callback = _helper_utils__WEBPACK_IMPORTED_MODULE_0__.noop
	}
	var eventCounts = {
		errorCount: 0,
		resourceCount: 0,
		longTaskCount: 0,
		userActionCount: 0,
	}

	var subscription = lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_2__.LifeCycleEventType.RAW_RUM_EVENT_COLLECTED,
		function (data) {
			var rawRumEvent = data.rawRumEvent
			switch (rawRumEvent.type) {
				case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ERROR:
					eventCounts.errorCount += 1
					callback(eventCounts)
					break
				case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.RESOURCE:
					eventCounts.resourceCount += 1
					callback(eventCounts)
					break
				case _helper_enums__WEBPACK_IMPORTED_MODULE_1__.RumEventType.ACTION:
					eventCounts.userActionCount += 1
					callback(eventCounts)
					break
			}
		},
	)

	return {
		stop: function () {
			subscription.unsubscribe()
		},
		eventCounts: eventCounts,
	}
}


/***/ }),

/***/ "./src/rumEventsCollection/trackPageActiveites.js":
/*!********************************************************!*\
  !*** ./src/rumEventsCollection/trackPageActiveites.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PAGE_ACTIVITY_VALIDATION_DELAY": () => (/* binding */ PAGE_ACTIVITY_VALIDATION_DELAY),
/* harmony export */   "PAGE_ACTIVITY_END_DELAY": () => (/* binding */ PAGE_ACTIVITY_END_DELAY),
/* harmony export */   "PAGE_ACTIVITY_MAX_DURATION": () => (/* binding */ PAGE_ACTIVITY_MAX_DURATION),
/* harmony export */   "waitIdlePageActivity": () => (/* binding */ waitIdlePageActivity),
/* harmony export */   "trackPageActivities": () => (/* binding */ trackPageActivities),
/* harmony export */   "waitPageActivitiesCompletion": () => (/* binding */ waitPageActivitiesCompletion)
/* harmony export */ });
/* harmony import */ var _helper_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helper/utils */ "./src/helper/utils.js");
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_observable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/observable */ "./src/core/observable.js");



// Delay to wait for a page activity to validate the tracking process
var PAGE_ACTIVITY_VALIDATION_DELAY = 100
// Delay to wait after a page activity to end the tracking process
var PAGE_ACTIVITY_END_DELAY = 100
// Maximum duration of the tracking process
var PAGE_ACTIVITY_MAX_DURATION = 10000

function waitIdlePageActivity(lifeCycle, completionCallback) {
	var _trackPageActivities = trackPageActivities(lifeCycle)
	var pageActivitiesObservable = _trackPageActivities.observable
	var stopPageActivitiesTracking = _trackPageActivities.stop
	var _waitPageActivitiesCompletion = waitPageActivitiesCompletion(
		pageActivitiesObservable,
		stopPageActivitiesTracking,
		completionCallback,
	)

	var stopWaitPageActivitiesCompletion = _waitPageActivitiesCompletion.stop
	function stop() {
		stopWaitPageActivitiesCompletion()
		stopPageActivitiesTracking()
	}

	return { stop: stop }
}

// Automatic action collection lifecycle overview:
//                      (Start new trackPageActivities)
//              .-------------------'--------------------.
//              v                                        v
//     [Wait for a page activity ]          [Wait for a maximum duration]
//     [timeout: VALIDATION_DELAY]          [  timeout: MAX_DURATION    ]
//          /                  \                           |
//         v                    v                          |
//  [No page activity]   [Page activity]                   |
//         |                   |,----------------------.   |
//         v                   v                       |   |
//     (Discard)     [Wait for a page activity]        |   |
//                   [   timeout: END_DELAY   ]        |   |
//                       /                \            |   |
//                      v                  v           |   |
//             [No page activity]    [Page activity]   |   |
//                      |                 |            |   |
//                      |                 '------------'   |
//                      '-----------. ,--------------------'
//                                   v
//                                 (End)
//
// Note: because MAX_DURATION > VALIDATION_DELAY, we are sure that if the process is still alive
// after MAX_DURATION, it has been validated.
function trackPageActivities(lifeCycle) {
	var observable = new _core_observable__WEBPACK_IMPORTED_MODULE_2__.Observable()
	var subscriptions = []
	var firstRequestIndex
	var pendingRequestsCount = 0

	subscriptions.push(
		lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_SET_DATA_UPDATE, function () {
			notifyPageActivity()
		}),
		lifeCycle.subscribe(_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.PAGE_ALIAS_ACTION, function () {
			notifyPageActivity()
		}),
	)

	subscriptions.push(
		lifeCycle.subscribe(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_STARTED,
			function (startEvent) {
				if (firstRequestIndex === undefined) {
					firstRequestIndex = startEvent.requestIndex
				}

				pendingRequestsCount += 1
				notifyPageActivity()
			},
		),
	)

	subscriptions.push(
		lifeCycle.subscribe(
			_core_lifeCycle__WEBPACK_IMPORTED_MODULE_1__.LifeCycleEventType.REQUEST_COMPLETED,
			function (request) {
				// If the request started before the tracking start, ignore it
				if (
					firstRequestIndex === undefined ||
					request.requestIndex < firstRequestIndex
				) {
					return
				}
				pendingRequestsCount -= 1
				notifyPageActivity()
			},
		),
	)

	function notifyPageActivity() {
		observable.notify({ isBusy: pendingRequestsCount > 0 })
	}

	return {
		observable: observable,
		stop: function () {
			(0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.each)(subscriptions, function (sub) {
				sub.unsubscribe()
			})
		},
	}
}

function waitPageActivitiesCompletion(
	pageActivitiesObservable,
	stopPageActivitiesTracking,
	completionCallback,
) {
	var idleTimeoutId
	var hasCompleted = false

	var validationTimeoutId = setTimeout(function () {
		complete({ hadActivity: false })
	}, PAGE_ACTIVITY_VALIDATION_DELAY)
	var maxDurationTimeoutId = setTimeout(function () {
		complete({ hadActivity: true, endTime: (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)() })
	}, PAGE_ACTIVITY_MAX_DURATION)
	pageActivitiesObservable.subscribe(function (data) {
		var isBusy = data.isBusy
		clearTimeout(validationTimeoutId)
		clearTimeout(idleTimeoutId)
		var lastChangeTime = (0,_helper_utils__WEBPACK_IMPORTED_MODULE_0__.now)()
		if (!isBusy) {
			idleTimeoutId = setTimeout(function () {
				complete({ hadActivity: true, endTime: lastChangeTime })
			}, PAGE_ACTIVITY_END_DELAY)
		}
	})

	function stop() {
		hasCompleted = true
		clearTimeout(validationTimeoutId)
		clearTimeout(idleTimeoutId)
		clearTimeout(maxDurationTimeoutId)
		stopPageActivitiesTracking()
	}

	function complete(params) {
		if (hasCompleted) {
			return
		}
		stop()
		completionCallback(params)
	}

	return { stop: stop }
}


/***/ }),

/***/ "./src/rumEventsCollection/transport/batch.js":
/*!****************************************************!*\
  !*** ./src/rumEventsCollection/transport/batch.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startRumBatch": () => (/* binding */ startRumBatch)
/* harmony export */ });
/* harmony import */ var _core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/lifeCycle */ "./src/core/lifeCycle.js");
/* harmony import */ var _core_transport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/transport */ "./src/core/transport.js");
/* harmony import */ var _helper_enums__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../helper/enums */ "./src/helper/enums.js");



function startRumBatch(configuration, lifeCycle) {
	var batch = makeRumBatch(configuration, lifeCycle)
	lifeCycle.subscribe(
		_core_lifeCycle__WEBPACK_IMPORTED_MODULE_0__.LifeCycleEventType.RUM_EVENT_COLLECTED,
		function (serverRumEvent) {
			if (serverRumEvent.type === _helper_enums__WEBPACK_IMPORTED_MODULE_2__.RumEventType.VIEW) {
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
		return new _core_transport__WEBPACK_IMPORTED_MODULE_1__.Batch(
			new _core_transport__WEBPACK_IMPORTED_MODULE_1__.HttpRequest(endpointUrl, configuration.batchBytesLimit),
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "datafluxRum": () => (/* reexport safe */ _boot_rum_entry__WEBPACK_IMPORTED_MODULE_0__.datafluxRum)
/* harmony export */ });
/* harmony import */ var _boot_rum_entry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boot/rum.entry */ "./src/boot/rum.entry.js");


})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2Jvb3QvYnVpbGRFbnYuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ib290L3J1bS5lbnRyeS5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2Jvb3QvcnVtLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvY29yZS9iYXNlSW5mby5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2NvcmUvY29uZmlndXJhdGlvbi5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2NvcmUvZGF0YU1hcC5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2NvcmUvZG93bmxvYWRQcm94eS5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2NvcmUvZXJyb3JDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvY29yZS9lcnJvclRvb2xzLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvY29yZS9saWZlQ3ljbGUuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9jb3JlL21pbmlhVG91Y2guanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9jb3JlL29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9jb3JlL3Nkay5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2NvcmUvdHJhbnNwb3J0LmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvY29yZS94aHJQcm94eS5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2hlbHBlci9lbnVtcy5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2hlbHBlci90cmFjZWtpdC5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL2hlbHBlci91dGlscy5qcyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwLy4vc3JjL3J1bUV2ZW50c0NvbGxlY3Rpb24vYWN0aW9uL2FjdGlvbkNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL2FjdGlvbi90cmFja0FjdGlvbnMuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL2FwcC9hcHBDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL2Fzc2VtYmx5LmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9lcnJvci9lcnJvckNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3BhZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3BhZ2Uvdmlld0NvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3BhcmVudENvbnRleHRzLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9wZXJmb3JtYW5jZUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3JlcXVlc3RDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXNvdXJjZS9yZXNvdXJjZUNvbGxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3Jlc291cmNlL3Jlc291cmNlVXRpbHMuanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC8uL3NyYy9ydW1FdmVudHNDb2xsZWN0aW9uL3NldERhdGFDb2xsZWN0aW9uLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi90cmFja0V2ZW50Q291bnRzLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi90cmFja1BhZ2VBY3RpdmVpdGVzLmpzIiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvcnVtRXZlbnRzQ29sbGVjdGlvbi90cmFuc3BvcnQvYmF0Y2guanMiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9AY2xvdWRjYXJlL3J1bS1taW5pYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vQGNsb3VkY2FyZS9ydW0tbWluaWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0BjbG91ZGNhcmUvcnVtLW1pbmlhcHAvLi9zcmMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSDhDO0FBQ2Q7QUFDekI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyREFBWTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLDRCQUE0QiwwQ0FBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUNOO0FBQ1E7QUFDSztBQUNpQztBQUNqQjtBQUNTO0FBQ0w7QUFDVTtBQUNDO0FBQ1c7QUFDZjtBQUNnQjtBQUNaO0FBQ0s7O0FBRXJEO0FBQzFCO0FBQ1AsdUJBQXVCLCtEQUFVLG9CQUFvQiwrQ0FBUTtBQUM3RCx1QkFBdUIsc0RBQVM7QUFDaEMsc0JBQXNCLHdGQUFtQjtBQUN6QyxhQUFhLG1GQUFhO0FBQzFCLENBQUMsZ0ZBQWdCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRGQUFrQjtBQUNuQixDQUFDLDBHQUF1QjtBQUN4QixDQUFDLDhGQUFtQjtBQUNwQixDQUFDLGlHQUFvQjtBQUNyQixDQUFDLCtGQUFzQjtBQUN2QixDQUFDLDRHQUE4QjtBQUMvQixDQUFDLGdHQUFzQjtBQUN2QixDQUFDLHFHQUFxQjtBQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNpQztBQUNLO0FBQ1c7QUFDakQ7QUFDQTtBQUNBLG1CQUFtQixtREFB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O0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEVBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3ZSTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ1orQzs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsNERBQWEsR0FBRztBQUN6QjtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsU0FB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QUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLO0FBQ3hDO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EseUNBQXlDLDBDQUFNO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7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O0FBQ2xCLE9BQU8sd0RBQVc7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7Ozs7Ozs7VUN0REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx3Q0FBd0MseUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7Ozs7QUNOOEMiLCJmaWxlIjoiZGF0YWZsdXgtcnVtLW1pbmlhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgYnVpbGRFbnYgPSB7XG5cdHNka1ZlcnNpb246ICc8PDwgU0RLX1ZFUlNJT04gPj4+Jyxcblx0c2RrTmFtZTogJ2RmX21pbmlhcHBfcnVtX3NkaycsXG59XG4iLCJpbXBvcnQgeyBpc1BlcmNlbnRhZ2UgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBzdGFydFJ1bSB9IGZyb20gJy4vcnVtJ1xuZXhwb3J0IGNvbnN0IG1ha2VSdW0gPSBmdW5jdGlvbiAoc3RhcnRSdW1JbXBsKSB7XG5cdHZhciBpc0FscmVhZHlJbml0aWFsaXplZCA9IGZhbHNlXG5cdHZhciBydW1HbG9iYWwgPSB7XG5cdFx0aW5pdDogZnVuY3Rpb24gKHVzZXJDb25maWd1cmF0aW9uKSB7XG5cdFx0XHRpZiAodHlwZW9mIHVzZXJDb25maWd1cmF0aW9uID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHR1c2VyQ29uZmlndXJhdGlvbiA9IHt9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWNhbkluaXRSdW0odXNlckNvbmZpZ3VyYXRpb24pKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0c3RhcnRSdW1JbXBsKHVzZXJDb25maWd1cmF0aW9uKVxuXG5cdFx0XHRpc0FscmVhZHlJbml0aWFsaXplZCA9IHRydWVcblx0XHR9LFxuXHR9XG5cdHJldHVybiBydW1HbG9iYWxcblx0ZnVuY3Rpb24gY2FuSW5pdFJ1bSh1c2VyQ29uZmlndXJhdGlvbikge1xuXHRcdGlmIChpc0FscmVhZHlJbml0aWFsaXplZCkge1xuXHRcdFx0Y29uc29sZS5lcnJvcignREFUQUZMVVhfUlVNIGlzIGFscmVhZHkgaW5pdGlhbGl6ZWQuJylcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblxuXHRcdGlmICghdXNlckNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25JZCkge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0J0FwcGxpY2F0aW9uIElEIGlzIG5vdCBjb25maWd1cmVkLCBubyBSVU0gZGF0YSB3aWxsIGJlIGNvbGxlY3RlZC4nLFxuXHRcdFx0KVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdGlmICghdXNlckNvbmZpZ3VyYXRpb24uZGF0YWtpdE9yaWdpbikge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcblx0XHRcdFx0J2RhdGFraXRPcmlnaW4gaXMgbm90IGNvbmZpZ3VyZWQsIG5vIFJVTSBkYXRhIHdpbGwgYmUgY29sbGVjdGVkLicsXG5cdFx0XHQpXG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdFx0aWYgKFxuXHRcdFx0dXNlckNvbmZpZ3VyYXRpb24uc2FtcGxlUmF0ZSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHQhaXNQZXJjZW50YWdlKHVzZXJDb25maWd1cmF0aW9uLnNhbXBsZVJhdGUpXG5cdFx0KSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKCdTYW1wbGUgUmF0ZSBzaG91bGQgYmUgYSBudW1iZXIgYmV0d2VlbiAwIGFuZCAxMDAnKVxuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH1cbn1cbmV4cG9ydCBjb25zdCBkYXRhZmx1eFJ1bSA9IG1ha2VSdW0oc3RhcnRSdW0pXG4iLCJpbXBvcnQgeyBidWlsZEVudiB9IGZyb20gJy4vYnVpbGRFbnYnXG5pbXBvcnQgeyBMaWZlQ3ljbGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IGNvbW1vbkluaXQgfSBmcm9tICcuLi9jb3JlL2NvbmZpZ3VyYXRpb24nXG5pbXBvcnQgeyBzdGFydEVycm9yQ29sbGVjdGlvbiB9IGZyb20gJy4uL3J1bUV2ZW50c0NvbGxlY3Rpb24vZXJyb3IvZXJyb3JDb2xsZWN0aW9uJ1xuaW1wb3J0IHsgc3RhcnRSdW1Bc3NlbWJseSB9IGZyb20gJy4uL3J1bUV2ZW50c0NvbGxlY3Rpb24vYXNzZW1ibHknXG5pbXBvcnQgeyBzdGFydFBhcmVudENvbnRleHRzIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9wYXJlbnRDb250ZXh0cydcbmltcG9ydCB7IHN0YXJ0UnVtQmF0Y2ggfSBmcm9tICcuLi9ydW1FdmVudHNDb2xsZWN0aW9uL3RyYW5zcG9ydC9iYXRjaCdcbmltcG9ydCB7IHN0YXJ0Vmlld0NvbGxlY3Rpb24gfSBmcm9tICcuLi9ydW1FdmVudHNDb2xsZWN0aW9uL3BhZ2Uvdmlld0NvbGxlY3Rpb24nXG5pbXBvcnQgeyBzdGFydFJlcXVlc3RDb2xsZWN0aW9uIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXF1ZXN0Q29sbGVjdGlvbidcbmltcG9ydCB7IHN0YXJ0UmVzb3VyY2VDb2xsZWN0aW9uIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXNvdXJjZS9yZXNvdXJjZUNvbGxlY3Rpb24nXG5pbXBvcnQgeyBzdGFydEFwcENvbGxlY3Rpb24gfSBmcm9tICcuLi9ydW1FdmVudHNDb2xsZWN0aW9uL2FwcC9hcHBDb2xsZWN0aW9uJ1xuaW1wb3J0IHsgc3RhcnRQYWdlUGVyZm9ybWFuY2VPYnNlcnZhYmxlIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9wZXJmb3JtYW5jZUNvbGxlY3Rpb24nXG5pbXBvcnQgeyBzdGFydFNldERhdGFDb2xsb2N0aW9uIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9zZXREYXRhQ29sbGVjdGlvbidcbmltcG9ydCB7IHN0YXJ0QWN0aW9uQ29sbGVjdGlvbiB9IGZyb20gJy4uL3J1bUV2ZW50c0NvbGxlY3Rpb24vYWN0aW9uL2FjdGlvbkNvbGxlY3Rpb24nXG5cbmltcG9ydCB7IHNkayB9IGZyb20gJy4uL2NvcmUvc2RrJ1xuZXhwb3J0IGNvbnN0IHN0YXJ0UnVtID0gZnVuY3Rpb24gKHVzZXJDb25maWd1cmF0aW9uKSB7XG5cdGNvbnN0IGNvbmZpZ3VyYXRpb24gPSBjb21tb25Jbml0KHVzZXJDb25maWd1cmF0aW9uLCBidWlsZEVudilcblx0Y29uc3QgbGlmZUN5Y2xlID0gbmV3IExpZmVDeWNsZSgpXG5cdHZhciBwYXJlbnRDb250ZXh0cyA9IHN0YXJ0UGFyZW50Q29udGV4dHMobGlmZUN5Y2xlKVxuXHR2YXIgYmF0Y2ggPSBzdGFydFJ1bUJhdGNoKGNvbmZpZ3VyYXRpb24sIGxpZmVDeWNsZSlcblx0c3RhcnRSdW1Bc3NlbWJseShcblx0XHR1c2VyQ29uZmlndXJhdGlvbi5hcHBsaWNhdGlvbklkLFxuXHRcdGNvbmZpZ3VyYXRpb24sXG5cdFx0bGlmZUN5Y2xlLFxuXHRcdHBhcmVudENvbnRleHRzLFxuXHQpXG5cdHN0YXJ0QXBwQ29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHN0YXJ0UmVzb3VyY2VDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbilcblx0c3RhcnRWaWV3Q29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHN0YXJ0RXJyb3JDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbilcblx0c3RhcnRSZXF1ZXN0Q29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHN0YXJ0UGFnZVBlcmZvcm1hbmNlT2JzZXJ2YWJsZShsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHN0YXJ0U2V0RGF0YUNvbGxvY3Rpb24obGlmZUN5Y2xlKVxuXHRzdGFydEFjdGlvbkNvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKVxufVxuIiwiaW1wb3J0IHsgc2RrIH0gZnJvbSAnLi4vY29yZS9zZGsnXG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgQ0xJRU5UX0lEX1RPS0VOIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xuY2xhc3MgQmFzZUluZm8ge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLnNlc3Npb25JZCA9IFVVSUQoKVxuXHRcdHRoaXMuZ2V0RGV2aWNlSW5mbygpXG5cdFx0dGhpcy5nZXROZXRXb3JrKClcblx0fVxuXHRnZXREZXZpY2VJbmZvKCkge1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBkZXZpY2VJbmZvID0gc2RrLmdldFN5c3RlbUluZm9TeW5jKClcblx0XHRcdHZhciBvc0luZm8gPSBkZXZpY2VJbmZvLnN5c3RlbS5zcGxpdCgnICcpXG5cdFx0XHR2YXIgb3NWZXJzaW9uID0gb3NJbmZvLmxlbmd0aCA+IDEgJiYgb3NJbmZvWzFdXG5cdFx0XHR2YXIgb3NWZXJzaW9uTWFqb3IgPVxuXHRcdFx0XHRvc1ZlcnNpb24uc3BsaXQoJy4nKS5sZW5ndGggJiYgb3NWZXJzaW9uLnNwbGl0KCcuJylbMF1cblx0XHRcdHZhciBkZXZpY2VVVWlkID0gJydcblx0XHRcdGlmIChkZXZpY2VJbmZvLmhvc3QpIHtcblx0XHRcdFx0ZGV2aWNlVVVpZCA9IGRldmljZUluZm8uaG9zdC5hcHBJZFxuXHRcdFx0fVxuXHRcdFx0dGhpcy5kZXZpY2VJbmZvID0ge1xuXHRcdFx0XHRzY3JlZW5TaXplOiBgJHtkZXZpY2VJbmZvLnNjcmVlbldpZHRofSoke2RldmljZUluZm8uc2NyZWVuSGVpZ2h0fSBgLFxuXHRcdFx0XHRwbGF0Zm9ybTogZGV2aWNlSW5mby5wbGF0Zm9ybSxcblx0XHRcdFx0cGxhdGZvcm1WZXJzaW9uOiBkZXZpY2VJbmZvLnZlcnNpb24sXG5cdFx0XHRcdG9zVmVyc2lvbjogb3NWZXJzaW9uLFxuXHRcdFx0XHRvc1ZlcnNpb25NYWpvcjogb3NWZXJzaW9uTWFqb3IsXG5cdFx0XHRcdG9zOiBvc0luZm8ubGVuZ3RoID4gMSAmJiBvc0luZm9bMF0sXG5cdFx0XHRcdGJyYW5kOiBkZXZpY2VJbmZvLmJyYW5kLFxuXHRcdFx0XHRtb2RlbDogZGV2aWNlSW5mby5tb2RlbCxcblx0XHRcdFx0ZnJhbWV3b3JrVmVyc2lvbjogZGV2aWNlSW5mby5TREtWZXJzaW9uLFxuXHRcdFx0XHRwaXhlbFJhdGlvOiBkZXZpY2VJbmZvLnBpeGVsUmF0aW8sXG5cdFx0XHRcdGRldmljZVV1aWQ6IGRldmljZVVVaWQsXG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge31cblx0fVxuXHRnZXRDbGllbnRJRCgpIHtcblx0XHR2YXIgY2xpZW5ldElkID0gc2RrLmdldFN0b3JhZ2VTeW5jKENMSUVOVF9JRF9UT0tFTilcblx0XHRpZiAoIWNsaWVuZXRJZCkge1xuXHRcdFx0Y2xpZW5ldElkID0gVVVJRCgpXG5cdFx0XHRzZGsuc2V0U3RvcmFnZVN5bmMoQ0xJRU5UX0lEX1RPS0VOLCBjbGllbmV0SWQpXG5cdFx0fVxuXHRcdHJldHVybiBjbGllbmV0SWRcblx0fVxuXHRnZXROZXRXb3JrKCkge1xuXHRcdHNkay5nZXROZXR3b3JrVHlwZSh7XG5cdFx0XHRzdWNjZXNzOiAoZSkgPT4ge1xuXHRcdFx0XHR0aGlzLmRldmljZUluZm8ubmV0d29yayA9IGUubmV0d29ya1R5cGUgPyBlLm5ldHdvcmtUeXBlIDogJ3Vua25vd24nXG5cdFx0XHR9LFxuXHRcdH0pXG5cdFx0c2RrLm9uTmV0d29ya1N0YXR1c0NoYW5nZSgoZSkgPT4ge1xuXHRcdFx0dGhpcy5kZXZpY2VJbmZvLm5ldHdvcmsgPSBlLm5ldHdvcmtUeXBlID8gZS5uZXR3b3JrVHlwZSA6ICd1bmtub3duJ1xuXHRcdH0pXG5cdH1cblx0Z2V0U2Vzc2lvbklkKCkge1xuXHRcdHJldHVybiB0aGlzLnNlc3Npb25JZFxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBCYXNlSW5mbygpXG4iLCJpbXBvcnQgeyBleHRlbmQyTGV2LCB1cmxQYXJzZSB9IGZyb20gJy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IE9ORV9LSUxPX0JZVEUsIE9ORV9TRUNPTkQgfSBmcm9tICcuLi9oZWxwZXIvZW51bXMnXG5leHBvcnQgdmFyIERFRkFVTFRfQ09ORklHVVJBVElPTiA9IHtcblx0c2FtcGxlUmF0ZTogMTAwLFxuXHRmbHVzaFRpbWVvdXQ6IDMwICogT05FX1NFQ09ORCxcblx0bWF4RXJyb3JzQnlNaW51dGU6IDMwMDAsXG5cdC8qKlxuXHQgKiBMb2dzIGludGFrZSBsaW1pdFxuXHQgKi9cblx0bWF4QmF0Y2hTaXplOiA1MCxcblx0bWF4TWVzc2FnZVNpemU6IDI1NiAqIE9ORV9LSUxPX0JZVEUsXG5cblx0LyoqXG5cdCAqIGJlYWNvbiBwYXlsb2FkIG1heCBxdWV1ZSBzaXplIGltcGxlbWVudGF0aW9uIGlzIDY0a2Jcblx0ICogZW5zdXJlIHRoYXQgd2UgbGVhdmUgcm9vbSBmb3IgbG9ncywgcnVtIGFuZCBwb3RlbnRpYWwgb3RoZXIgdXNlcnNcblx0ICovXG5cdGJhdGNoQnl0ZXNMaW1pdDogMTYgKiBPTkVfS0lMT19CWVRFLFxuXHRkYXRha2l0VXJsOiAnJyxcblx0LyoqXG5cdCAqIGFyYml0cmFyeSB2YWx1ZSwgYnl0ZSBwcmVjaXNpb24gbm90IG5lZWRlZFxuXHQgKi9cblx0cmVxdWVzdEVycm9yUmVzcG9uc2VMZW5ndGhMaW1pdDogMzIgKiBPTkVfS0lMT19CWVRFLFxuXHR0cmFja0ludGVyYWN0aW9uczogZmFsc2UsXG59XG5cbmZ1bmN0aW9uIGdldERhdGFraXRVcmxVcmwodXJsKSB7XG5cdGlmICh1cmwgJiYgdXJsLmxhc3RJbmRleE9mKCcvJykgPT09IHVybC5sZW5ndGggLSAxKVxuXHRcdHJldHVybiB1cmwgKyAndjEvd3JpdGUvcnVtJ1xuXHRyZXR1cm4gdXJsICsgJy92MS93cml0ZS9ydW0nXG59XG5leHBvcnQgZnVuY3Rpb24gY29tbW9uSW5pdCh1c2VyQ29uZmlndXJhdGlvbiwgYnVpbGRFbnYpIHtcblx0dmFyIHRyYW5zcG9ydENvbmZpZ3VyYXRpb24gPSB7XG5cdFx0YXBwbGljYXRpb25JZDogdXNlckNvbmZpZ3VyYXRpb24uYXBwbGljYXRpb25JZCxcblx0XHRlbnY6IHVzZXJDb25maWd1cmF0aW9uLmVudiB8fCAnJyxcblx0XHR2ZXJzaW9uOiB1c2VyQ29uZmlndXJhdGlvbi52ZXJzaW9uIHx8ICcnLFxuXHRcdHNka1ZlcnNpb246IGJ1aWxkRW52LnNka1ZlcnNpb24sXG5cdFx0c2RrTmFtZTogYnVpbGRFbnYuc2RrTmFtZSxcblx0XHRkYXRha2l0VXJsOiBnZXREYXRha2l0VXJsVXJsKFxuXHRcdFx0dXNlckNvbmZpZ3VyYXRpb24uZGF0YWtpdFVybCB8fCB1c2VyQ29uZmlndXJhdGlvbi5kYXRha2l0T3JpZ2luLFxuXHRcdCksXG5cdFx0dGFnczogdXNlckNvbmZpZ3VyYXRpb24udGFncyB8fCBbXSxcblx0fVxuXHRpZiAoJ3RyYWNrSW50ZXJhY3Rpb25zJyBpbiB1c2VyQ29uZmlndXJhdGlvbikge1xuXHRcdHRyYW5zcG9ydENvbmZpZ3VyYXRpb24udHJhY2tJbnRlcmFjdGlvbnMgPSAhIXVzZXJDb25maWd1cmF0aW9uLnRyYWNrSW50ZXJhY3Rpb25zXG5cdH1cblx0cmV0dXJuIGV4dGVuZDJMZXYoREVGQVVMVF9DT05GSUdVUkFUSU9OLCB0cmFuc3BvcnRDb25maWd1cmF0aW9uKVxufVxuY29uc3QgaGF2ZVNhbWVPcmlnaW4gPSBmdW5jdGlvbiAodXJsMSwgdXJsMikge1xuXHRjb25zdCBwYXJzZVVybDEgPSB1cmxQYXJzZSh1cmwxKS5nZXRQYXJzZSgpXG5cdGNvbnN0IHBhcnNlVXJsMiA9IHVybFBhcnNlKHVybDIpLmdldFBhcnNlKClcblx0cmV0dXJuIHBhcnNlVXJsMS5PcmlnaW4gPT09IHBhcnNlVXJsMi5PcmlnaW5cbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0ludGFrZVJlcXVlc3QodXJsLCBjb25maWd1cmF0aW9uKSB7XG5cdHJldHVybiBoYXZlU2FtZU9yaWdpbih1cmwsIGNvbmZpZ3VyYXRpb24uZGF0YWtpdFVybClcbn1cbiIsImltcG9ydCB7IFJ1bUV2ZW50VHlwZSB9IGZyb20gJy4uL2hlbHBlci9lbnVtcydcbi8vIOmcgOimgeeUqOWPjOW8leWPt+WwhuWtl+espuS4suexu+Wei+eahGZpZWxkIHZhbHVl5ous6LW35p2l77yMIOi/memHjOacieaVsOe7hOagh+ekultzdHJpbmcsIHBhdGhdXG5leHBvcnQgdmFyIGNvbW1vblRhZ3MgPSB7XG5cdHNka19uYW1lOiAnX2RkLnNka19uYW1lJyxcblx0c2RrX3ZlcnNpb246ICdfZGQuc2RrX3ZlcnNpb24nLFxuXHRhcHBfaWQ6ICdhcHBsaWNhdGlvbi5pZCcsXG5cdGVudjogJ19kZC5lbnYnLFxuXHR2ZXJzaW9uOiAnX2RkLnZlcnNpb24nLFxuXHR1c2VyaWQ6ICd1c2VyLnVzZXJfaWQnLFxuXHRzZXNzaW9uX2lkOiAnc2Vzc2lvbi5pZCcsXG5cdGlzX3NpZ25pbjogJ3VzZXIuaXNfc2lnbmluJyxcblx0ZGV2aWNlOiAnZGV2aWNlLmJyYW5kJyxcblx0bW9kZWw6ICdkZXZpY2UubW9kZWwnLFxuXHRkZXZpY2VfdXVpZDogJ2RldmljZS5kZXZpY2VfdXVpZCcsXG5cdG9zOiAnZGV2aWNlLm9zJyxcblx0b3NfdmVyc2lvbjogJ2RldmljZS5vc192ZXJzaW9uJyxcblx0b3NfdmVyc2lvbl9tYWpvcjogJ2RldmljZS5vc192ZXJzaW9uX21ham9yJyxcblx0c2NyZWVuX3NpemU6ICdkZXZpY2Uuc2NyZWVuX3NpemUnLFxuXHRuZXR3b3JrX3R5cGU6ICdkZXZpY2UubmV0d29ya190eXBlJyxcblx0cGxhdGZvcm06ICdkZXZpY2UucGxhdGZvcm0nLFxuXHRwbGF0Zm9ybV92ZXJzaW9uOiAnZGV2aWNlLnBsYXRmb3JtX3ZlcnNpb24nLFxuXHRhcHBfZnJhbWV3b3JrX3ZlcnNpb246ICdkZXZpY2UuZnJhbWV3b3JrX3ZlcnNpb24nLFxuXHR2aWV3X2lkOiAncGFnZS5pZCcsXG5cdHZpZXdfbmFtZTogJ3BhZ2Uucm91dGUnLFxuXHR2aWV3X3JlZmVyZXI6ICdwYWdlLnJlZmVyZXInLFxufVxuZXhwb3J0IHZhciBkYXRhTWFwID0ge1xuXHR2aWV3OiB7XG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLlZJRVcsXG5cdFx0dGFnczoge1xuXHRcdFx0dmlld19hcGRleF9sZXZlbDogJ3BhZ2UuYXBkZXhfbGV2ZWwnLFxuXHRcdFx0aXNfYWN0aXZlOiAncGFnZS5pc19hY3RpdmUnLFxuXHRcdH0sXG5cdFx0ZmllbGRzOiB7XG5cdFx0XHRwYWdlX2ZtcDogJ3BhZ2UuZm1wJyxcblx0XHRcdGZpcnN0X3BhaW50X3RpbWU6ICdwYWdlLmZwdCcsXG5cdFx0XHRsb2FkaW5nX3RpbWU6ICdwYWdlLmxvYWRpbmdfdGltZScsXG5cdFx0XHRvbmxvYWRfdG9fb25zaG93OiAncGFnZS5vbmxvYWQyb25zaG93Jyxcblx0XHRcdG9uc2hvd190b19vbnJlYWR5OiAncGFnZS5vbnNob3cyb25yZWFkeScsXG5cdFx0XHR0aW1lX3NwZW50OiAncGFnZS50aW1lX3NwZW50Jyxcblx0XHRcdHZpZXdfZXJyb3JfY291bnQ6ICdwYWdlLmVycm9yLmNvdW50Jyxcblx0XHRcdHZpZXdfcmVzb3VyY2VfY291bnQ6ICdwYWdlLmVycm9yLmNvdW50Jyxcblx0XHRcdHZpZXdfbG9uZ190YXNrX2NvdW50OiAncGFnZS5sb25nX3Rhc2suY291bnQnLFxuXHRcdFx0dmlld19hY3Rpb25fY291bnQ6ICdwYWdlLmFjdGlvbi5jb3VudCcsXG5cdFx0XHR2aWV3X3NldGRhdGFfY291bnQ6ICdwYWdlLnNldGRhdGEuY291bnQnLFxuXHRcdH0sXG5cdH0sXG5cdHJlc291cmNlOiB7XG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLlJFU09VUkNFLFxuXHRcdHRhZ3M6IHtcblx0XHRcdHJlc291cmNlX3R5cGU6ICdyZXNvdXJjZS50eXBlJyxcblx0XHRcdHJlc291cmNlX3N0YXR1czogJ3Jlc291cmNlLnN0YXR1cycsXG5cdFx0XHRyZXNvdXJjZV9zdGF0dXNfZ3JvdXA6ICdyZXNvdXJjZS5zdGF0dXNfZ3JvdXAnLFxuXHRcdFx0cmVzb3VyY2VfbWV0aG9kOiAncmVzb3VyY2UubWV0aG9kJyxcblx0XHRcdHJlc291cmNlX3VybDogJ3Jlc291cmNlLnVybCcsXG5cdFx0XHRyZXNvdXJjZV91cmxfaG9zdDogJ3Jlc291cmNlLnVybF9ob3N0Jyxcblx0XHRcdHJlc291cmNlX3VybF9wYXRoOiAncmVzb3VyY2UudXJsX3BhdGgnLFxuXHRcdFx0cmVzb3VyY2VfdXJsX3BhdGhfZ3JvdXA6ICdyZXNvdXJjZS51cmxfcGF0aF9ncm91cCcsXG5cdFx0XHRyZXNvdXJjZV91cmxfcXVlcnk6ICdyZXNvdXJjZS51cmxfcXVlcnknLFxuXHRcdH0sXG5cdFx0ZmllbGRzOiB7XG5cdFx0XHRyZXNvdXJjZV9zaXplOiAncmVzb3VyY2Uuc2l6ZScsXG5cdFx0XHRyZXNvdXJjZV9sb2FkOiAncmVzb3VyY2UubG9hZCcsXG5cdFx0XHRyZXNvdXJjZV9kbnM6ICdyZXNvdXJjZS5kbnMnLFxuXHRcdFx0cmVzb3VyY2VfdGNwOiAncmVzb3VyY2UudGNwJyxcblx0XHRcdHJlc291cmNlX3NzbDogJ3Jlc291cmNlLnNzbCcsXG5cdFx0XHRyZXNvdXJjZV90dGZiOiAncmVzb3VyY2UudHRmYicsXG5cdFx0XHRyZXNvdXJjZV90cmFuczogJ3Jlc291cmNlLnRyYW5zJyxcblx0XHRcdHJlc291cmNlX2ZpcnN0X2J5dGU6ICdyZXNvdXJjZS5maXJzdGJ5dGUnLFxuXHRcdFx0ZHVyYXRpb246ICdyZXNvdXJjZS5kdXJhdGlvbicsXG5cdFx0fSxcblx0fSxcblx0ZXJyb3I6IHtcblx0XHR0eXBlOiBSdW1FdmVudFR5cGUuRVJST1IsXG5cdFx0dGFnczoge1xuXHRcdFx0ZXJyb3Jfc291cmNlOiAnZXJyb3Iuc291cmNlJyxcblx0XHRcdGVycm9yX3R5cGU6ICdlcnJvci50eXBlJyxcblx0XHRcdHJlc291cmNlX3VybDogJ2Vycm9yLnJlc291cmNlLnVybCcsXG5cdFx0XHRyZXNvdXJjZV91cmxfaG9zdDogJ2Vycm9yLnJlc291cmNlLnVybF9ob3N0Jyxcblx0XHRcdHJlc291cmNlX3VybF9wYXRoOiAnZXJyb3IucmVzb3VyY2UudXJsX3BhdGgnLFxuXHRcdFx0cmVzb3VyY2VfdXJsX3BhdGhfZ3JvdXA6ICdlcnJvci5yZXNvdXJjZS51cmxfcGF0aF9ncm91cCcsXG5cdFx0XHRyZXNvdXJjZV9zdGF0dXM6ICdlcnJvci5yZXNvdXJjZS5zdGF0dXMnLFxuXHRcdFx0cmVzb3VyY2Vfc3RhdHVzX2dyb3VwOiAnZXJyb3IucmVzb3VyY2Uuc3RhdHVzX2dyb3VwJyxcblx0XHRcdHJlc291cmNlX21ldGhvZDogJ2Vycm9yLnJlc291cmNlLm1ldGhvZCcsXG5cdFx0fSxcblx0XHRmaWVsZHM6IHtcblx0XHRcdGVycm9yX21lc3NhZ2U6IFsnc3RyaW5nJywgJ2Vycm9yLm1lc3NhZ2UnXSxcblx0XHRcdGVycm9yX3N0YWNrOiBbJ3N0cmluZycsICdlcnJvci5zdGFjayddLFxuXHRcdH0sXG5cdH0sXG5cdGxvbmdfdGFzazoge1xuXHRcdHR5cGU6IFJ1bUV2ZW50VHlwZS5MT05HX1RBU0ssXG5cdFx0dGFnczoge30sXG5cdFx0ZmllbGRzOiB7XG5cdFx0XHRkdXJhdGlvbjogJ2xvbmdfdGFzay5kdXJhdGlvbicsXG5cdFx0fSxcblx0fSxcblx0YWN0aW9uOiB7XG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLkFDVElPTixcblx0XHR0YWdzOiB7XG5cdFx0XHRhY3Rpb25faWQ6ICdhY3Rpb24uaWQnLFxuXHRcdFx0YWN0aW9uX25hbWU6ICdhY3Rpb24udGFyZ2V0Lm5hbWUnLFxuXHRcdFx0YWN0aW9uX3R5cGU6ICdhY3Rpb24udHlwZScsXG5cdFx0fSxcblx0XHRmaWVsZHM6IHtcblx0XHRcdGR1cmF0aW9uOiAnYWN0aW9uLmxvYWRpbmdfdGltZScsXG5cdFx0fSxcblx0fSxcbn1cbiIsImltcG9ydCB7IHNkayB9IGZyb20gJy4vc2RrJ1xuaW1wb3J0IHsgbm93IH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgUmVxdWVzdFR5cGUgfSBmcm9tICcuLi9oZWxwZXIvZW51bXMnXG52YXIgZG93bmxvYWRQcm94eVNpbmdsZXRvblxudmFyIGJlZm9yZVNlbmRDYWxsYmFja3MgPSBbXVxudmFyIG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzID0gW11cbnZhciBvcmlnaW5hbERvd25sb2FkUmVxdWVzdFxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0RG93bmxvYWRQcm94eSgpIHtcblx0aWYgKCFkb3dubG9hZFByb3h5U2luZ2xldG9uKSB7XG5cdFx0cHJveHlEb3dubG9hZCgpXG5cdFx0ZG93bmxvYWRQcm94eVNpbmdsZXRvbiA9IHtcblx0XHRcdGJlZm9yZVNlbmQ6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRiZWZvcmVTZW5kQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spXG5cdFx0XHR9LFxuXHRcdFx0b25SZXF1ZXN0Q29tcGxldGU6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcy5wdXNoKGNhbGxiYWNrKVxuXHRcdFx0fSxcblx0XHR9XG5cdH1cblx0cmV0dXJuIGRvd25sb2FkUHJveHlTaW5nbGV0b25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0RG93bmxvYWRQcm94eSgpIHtcblx0aWYgKGRvd25sb2FkUHJveHlTaW5nbGV0b24pIHtcblx0XHRkb3dubG9hZFByb3h5U2luZ2xldG9uID0gdW5kZWZpbmVkXG5cdFx0YmVmb3JlU2VuZENhbGxiYWNrcy5zcGxpY2UoMCwgYmVmb3JlU2VuZENhbGxiYWNrcy5sZW5ndGgpXG5cdFx0b25SZXF1ZXN0Q29tcGxldGVDYWxsYmFja3Muc3BsaWNlKDAsIG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzLmxlbmd0aClcblx0XHRzZGsuZG93bmxvYWRGaWxlID0gb3JpZ2luYWxEb3dubG9hZFJlcXVlc3Rcblx0fVxufVxuXG5mdW5jdGlvbiBwcm94eURvd25sb2FkKCkge1xuXHRvcmlnaW5hbERvd25sb2FkUmVxdWVzdCA9IHNkay5kb3dubG9hZEZpbGVcblx0c2RrLmRvd25sb2FkRmlsZSA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzXG5cdFx0dmFyIGRhdGFmbHV4X3hociA9IHtcblx0XHRcdG1ldGhvZDogJ0dFVCcsXG5cdFx0XHRzdGFydFRpbWU6IDAsXG5cdFx0XHR1cmw6IGFyZ3VtZW50c1swXS51cmwsXG5cdFx0XHR0eXBlOiBSZXF1ZXN0VHlwZS5ET1dOTE9BRCxcblx0XHRcdHJlc3BvbnNlVHlwZTogJ2ZpbGUnLFxuXHRcdH1cblx0XHRkYXRhZmx1eF94aHIuc3RhcnRUaW1lID0gbm93KClcblxuXHRcdHZhciBvcmlnaW5hbFN1Y2Nlc3MgPSBhcmd1bWVudHNbMF0uc3VjY2Vzc1xuXG5cdFx0YXJndW1lbnRzWzBdLnN1Y2Nlc3MgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXBvcnRYaHIoYXJndW1lbnRzWzBdKVxuXG5cdFx0XHRpZiAob3JpZ2luYWxTdWNjZXNzKSB7XG5cdFx0XHRcdG9yaWdpbmFsU3VjY2Vzcy5hcHBseShfdGhpcywgYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgb3JpZ2luYWxGYWlsID0gYXJndW1lbnRzWzBdLmZhaWxcblx0XHRhcmd1bWVudHNbMF0uZmFpbCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlcG9ydFhocihhcmd1bWVudHNbMF0pXG5cdFx0XHRpZiAob3JpZ2luYWxGYWlsKSB7XG5cdFx0XHRcdG9yaWdpbmFsRmFpbC5hcHBseShfdGhpcywgYXJndW1lbnRzKVxuXHRcdFx0fVxuXHRcdH1cblx0XHR2YXIgaGFzQmVlblJlcG9ydGVkID0gZmFsc2Vcblx0XHR2YXIgcmVwb3J0WGhyID0gZnVuY3Rpb24gKHJlcykge1xuXHRcdFx0aWYgKGhhc0JlZW5SZXBvcnRlZCkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdGhhc0JlZW5SZXBvcnRlZCA9IHRydWVcblx0XHRcdGRhdGFmbHV4X3hoci5kdXJhdGlvbiA9IG5vdygpIC0gZGF0YWZsdXhfeGhyLnN0YXJ0VGltZVxuXHRcdFx0ZGF0YWZsdXhfeGhyLnJlc3BvbnNlID0gSlNPTi5zdHJpbmdpZnkoe1xuXHRcdFx0XHRmaWxlUGF0aDogcmVzLmZpbGVQYXRoLFxuXHRcdFx0XHR0ZW1wRmlsZVBhdGg6IHJlcy50ZW1wRmlsZVBhdGgsXG5cdFx0XHR9KVxuXHRcdFx0ZGF0YWZsdXhfeGhyLmhlYWRlciA9IHJlcy5oZWFkZXIgfHwge31cblx0XHRcdGRhdGFmbHV4X3hoci5wcm9maWxlID0gcmVzLnByb2ZpbGVcblx0XHRcdGRhdGFmbHV4X3hoci5zdGF0dXMgPSByZXMuc3RhdHVzQ29kZSB8fCByZXMuc3RhdHVzIHx8IDBcblx0XHRcdG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGRhdGFmbHV4X3hocilcblx0XHRcdH0pXG5cdFx0fVxuXHRcdGJlZm9yZVNlbmRDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGNhbGxiYWNrKGRhdGFmbHV4X3hocilcblx0XHR9KVxuXHRcdHJldHVybiBvcmlnaW5hbERvd25sb2FkUmVxdWVzdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdH1cbn1cbiIsImltcG9ydCB7IHRvQXJyYXksIG5vdyB9IGZyb20gJy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IE9ORV9NSU5VVEUsIFJlcXVlc3RUeXBlIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHtcblx0RXJyb3JTb3VyY2UsXG5cdGZvcm1hdFVua25vd25FcnJvcixcblx0dG9TdGFja1RyYWNlU3RyaW5nLFxufSBmcm9tICcuL2Vycm9yVG9vbHMnXG5pbXBvcnQgeyBjb21wdXRlU3RhY2tUcmFjZSwgcmVwb3J0IH0gZnJvbSAnLi4vaGVscGVyL3RyYWNla2l0J1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJy4vb2JzZXJ2YWJsZSdcbmltcG9ydCB7IGlzSW50YWtlUmVxdWVzdCB9IGZyb20gJy4vY29uZmlndXJhdGlvbidcbmltcG9ydCB7IHJlc2V0WGhyUHJveHksIHN0YXJ0WGhyUHJveHkgfSBmcm9tICcuL3hoclByb3h5J1xuaW1wb3J0IHsgcmVzZXREb3dubG9hZFByb3h5LCBzdGFydERvd25sb2FkUHJveHkgfSBmcm9tICcuL2Rvd25sb2FkUHJveHknXG52YXIgb3JpZ2luYWxDb25zb2xlRXJyb3JcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0Q29uc29sZVRyYWNraW5nKGVycm9yT2JzZXJ2YWJsZSkge1xuXHRvcmlnaW5hbENvbnNvbGVFcnJvciA9IGNvbnNvbGUuZXJyb3Jcblx0Y29uc29sZS5lcnJvciA9IGZ1bmN0aW9uICgpIHtcblx0XHRvcmlnaW5hbENvbnNvbGVFcnJvci5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpXG5cdFx0dmFyIGFyZ3MgPSB0b0FycmF5KGFyZ3VtZW50cylcblx0XHR2YXIgbWVzc2FnZSA9IFtdXG5cdFx0YXJncy5jb25jYXQoWydjb25zb2xlIGVycm9yOiddKS5mb3JFYWNoKGZ1bmN0aW9uIChwYXJhKSB7XG5cdFx0XHRtZXNzYWdlLnB1c2goZm9ybWF0Q29uc29sZVBhcmFtZXRlcnMocGFyYSkpXG5cdFx0fSlcblxuXHRcdGVycm9yT2JzZXJ2YWJsZS5ub3RpZnkoe1xuXHRcdFx0bWVzc2FnZTogbWVzc2FnZS5qb2luKCcgJyksXG5cdFx0XHRzb3VyY2U6IEVycm9yU291cmNlLkNPTlNPTEUsXG5cdFx0XHRzdGFydFRpbWU6IG5vdygpLFxuXHRcdH0pXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0b3BDb25zb2xlVHJhY2tpbmcoKSB7XG5cdGNvbnNvbGUuZXJyb3IgPSBvcmlnaW5hbENvbnNvbGVFcnJvclxufVxuXG5mdW5jdGlvbiBmb3JtYXRDb25zb2xlUGFyYW1ldGVycyhwYXJhbSkge1xuXHRpZiAodHlwZW9mIHBhcmFtID09PSAnc3RyaW5nJykge1xuXHRcdHJldHVybiBwYXJhbVxuXHR9XG5cdGlmIChwYXJhbSBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0cmV0dXJuIHRvU3RhY2tUcmFjZVN0cmluZyhjb21wdXRlU3RhY2tUcmFjZShwYXJhbSkpXG5cdH1cblx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHBhcmFtLCB1bmRlZmluZWQsIDIpXG59XG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyRXJyb3JzKGNvbmZpZ3VyYXRpb24sIGVycm9yT2JzZXJ2YWJsZSkge1xuXHR2YXIgZXJyb3JDb3VudCA9IDBcblx0dmFyIGZpbHRlcmVkRXJyb3JPYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKVxuXHRlcnJvck9ic2VydmFibGUuc3Vic2NyaWJlKGZ1bmN0aW9uIChlcnJvcikge1xuXHRcdGlmIChlcnJvckNvdW50IDwgY29uZmlndXJhdGlvbi5tYXhFcnJvcnNCeU1pbnV0ZSkge1xuXHRcdFx0ZXJyb3JDb3VudCArPSAxXG5cdFx0XHRmaWx0ZXJlZEVycm9yT2JzZXJ2YWJsZS5ub3RpZnkoZXJyb3IpXG5cdFx0fSBlbHNlIGlmIChlcnJvckNvdW50ID09PSBjb25maWd1cmF0aW9uLm1heEVycm9yc0J5TWludXRlKSB7XG5cdFx0XHRlcnJvckNvdW50ICs9IDFcblx0XHRcdGZpbHRlcmVkRXJyb3JPYnNlcnZhYmxlLm5vdGlmeSh7XG5cdFx0XHRcdG1lc3NhZ2U6XG5cdFx0XHRcdFx0J1JlYWNoZWQgbWF4IG51bWJlciBvZiBlcnJvcnMgYnkgbWludXRlOiAnICtcblx0XHRcdFx0XHRjb25maWd1cmF0aW9uLm1heEVycm9yc0J5TWludXRlLFxuXHRcdFx0XHRzb3VyY2U6IEVycm9yU291cmNlLkFHRU5ULFxuXHRcdFx0XHRzdGFydFRpbWU6IG5vdygpLFxuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG5cdHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcblx0XHRlcnJvckNvdW50ID0gMFxuXHR9LCBPTkVfTUlOVVRFKVxuXHRyZXR1cm4gZmlsdGVyZWRFcnJvck9ic2VydmFibGVcbn1cbnZhciB0cmFjZUtpdFJlcG9ydEhhbmRsZXJcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UnVudGltZUVycm9yVHJhY2tpbmcoZXJyb3JPYnNlcnZhYmxlKSB7XG5cdHRyYWNlS2l0UmVwb3J0SGFuZGxlciA9IGZ1bmN0aW9uIChzdGFja1RyYWNlLCBfLCBlcnJvck9iamVjdCkge1xuXHRcdHZhciBlcnJvciA9IGZvcm1hdFVua25vd25FcnJvcihzdGFja1RyYWNlLCBlcnJvck9iamVjdCwgJ1VuY2F1Z2h0Jylcblx0XHRlcnJvck9ic2VydmFibGUubm90aWZ5KHtcblx0XHRcdG1lc3NhZ2U6IGVycm9yLm1lc3NhZ2UsXG5cdFx0XHRzdGFjazogZXJyb3Iuc3RhY2ssXG5cdFx0XHR0eXBlOiBlcnJvci50eXBlLFxuXHRcdFx0c291cmNlOiBFcnJvclNvdXJjZS5TT1VSQ0UsXG5cdFx0XHRzdGFydFRpbWU6IG5vdygpLFxuXHRcdH0pXG5cdH1cblx0cmVwb3J0LnN1YnNjcmliZSh0cmFjZUtpdFJlcG9ydEhhbmRsZXIpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdG9wUnVudGltZUVycm9yVHJhY2tpbmcoKSB7XG5cdHJlcG9ydC51bnN1YnNjcmliZSh0cmFjZUtpdFJlcG9ydEhhbmRsZXIpXG59XG52YXIgZmlsdGVyZWRFcnJvcnNPYnNlcnZhYmxlXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydEF1dG9tYXRpY0Vycm9yQ29sbGVjdGlvbihjb25maWd1cmF0aW9uKSB7XG5cdGlmICghZmlsdGVyZWRFcnJvcnNPYnNlcnZhYmxlKSB7XG5cdFx0dmFyIGVycm9yT2JzZXJ2YWJsZSA9IG5ldyBPYnNlcnZhYmxlKClcblx0XHR0cmFja05ldHdvcmtFcnJvcihjb25maWd1cmF0aW9uLCBlcnJvck9ic2VydmFibGUpXG5cdFx0c3RhcnRDb25zb2xlVHJhY2tpbmcoZXJyb3JPYnNlcnZhYmxlKVxuXHRcdHN0YXJ0UnVudGltZUVycm9yVHJhY2tpbmcoZXJyb3JPYnNlcnZhYmxlKVxuXHRcdGZpbHRlcmVkRXJyb3JzT2JzZXJ2YWJsZSA9IGZpbHRlckVycm9ycyhjb25maWd1cmF0aW9uLCBlcnJvck9ic2VydmFibGUpXG5cdH1cblx0cmV0dXJuIGZpbHRlcmVkRXJyb3JzT2JzZXJ2YWJsZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tOZXR3b3JrRXJyb3IoY29uZmlndXJhdGlvbiwgZXJyb3JPYnNlcnZhYmxlKSB7XG5cdHN0YXJ0WGhyUHJveHkoKS5vblJlcXVlc3RDb21wbGV0ZShmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdHJldHVybiBoYW5kbGVDb21wbGV0ZVJlcXVlc3QoY29udGV4dC50eXBlLCBjb250ZXh0KVxuXHR9KVxuXHRzdGFydERvd25sb2FkUHJveHkoKS5vblJlcXVlc3RDb21wbGV0ZShmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdHJldHVybiBoYW5kbGVDb21wbGV0ZVJlcXVlc3QoY29udGV4dC50eXBlLCBjb250ZXh0KVxuXHR9KVxuXG5cdGZ1bmN0aW9uIGhhbmRsZUNvbXBsZXRlUmVxdWVzdCh0eXBlLCByZXF1ZXN0KSB7XG5cdFx0aWYgKFxuXHRcdFx0IWlzSW50YWtlUmVxdWVzdChyZXF1ZXN0LnVybCwgY29uZmlndXJhdGlvbikgJiZcblx0XHRcdChpc1JlamVjdGVkKHJlcXVlc3QpIHx8IGlzU2VydmVyRXJyb3IocmVxdWVzdCkpXG5cdFx0KSB7XG5cdFx0XHRlcnJvck9ic2VydmFibGUubm90aWZ5KHtcblx0XHRcdFx0bWVzc2FnZTogZm9ybWF0KHR5cGUpICsgJ2Vycm9yJyArIHJlcXVlc3QubWV0aG9kICsgJyAnICsgcmVxdWVzdC51cmwsXG5cdFx0XHRcdHJlc291cmNlOiB7XG5cdFx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0XHRzdGF0dXNDb2RlOiByZXF1ZXN0LnN0YXR1cyxcblx0XHRcdFx0XHR1cmw6IHJlcXVlc3QudXJsLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0eXBlOiBFcnJvclNvdXJjZS5ORVRXT1JLLFxuXHRcdFx0XHRzb3VyY2U6IEVycm9yU291cmNlLk5FVFdPUkssXG5cdFx0XHRcdHN0YWNrOlxuXHRcdFx0XHRcdHRydW5jYXRlUmVzcG9uc2UocmVxdWVzdC5yZXNwb25zZSwgY29uZmlndXJhdGlvbikgfHwgJ0ZhaWxlZCB0byBsb2FkJyxcblx0XHRcdFx0c3RhcnRUaW1lOiByZXF1ZXN0LnN0YXJ0VGltZSxcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNldFhoclByb3h5KClcblx0XHRcdHJlc2V0RG93bmxvYWRQcm94eSgpXG5cdFx0fSxcblx0fVxufVxuZnVuY3Rpb24gaXNSZWplY3RlZChyZXF1ZXN0KSB7XG5cdHJldHVybiByZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiByZXF1ZXN0LnJlc3BvbnNlVHlwZSAhPT0gJ29wYXF1ZSdcbn1cblxuZnVuY3Rpb24gaXNTZXJ2ZXJFcnJvcihyZXF1ZXN0KSB7XG5cdHJldHVybiByZXF1ZXN0LnN0YXR1cyA+PSA1MDBcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGVSZXNwb25zZShyZXNwb25zZSwgY29uZmlndXJhdGlvbikge1xuXHRpZiAoXG5cdFx0cmVzcG9uc2UgJiZcblx0XHRyZXNwb25zZS5sZW5ndGggPiBjb25maWd1cmF0aW9uLnJlcXVlc3RFcnJvclJlc3BvbnNlTGVuZ3RoTGltaXRcblx0KSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHJlc3BvbnNlLnN1YnN0cmluZygwLCBjb25maWd1cmF0aW9uLnJlcXVlc3RFcnJvclJlc3BvbnNlTGVuZ3RoTGltaXQpICtcblx0XHRcdCcuLi4nXG5cdFx0KVxuXHR9XG5cdHJldHVybiByZXNwb25zZVxufVxuXG5mdW5jdGlvbiBmb3JtYXQodHlwZSkge1xuXHRpZiAoUmVxdWVzdFR5cGUuWEhSID09PSB0eXBlKSB7XG5cdFx0cmV0dXJuICdYSFInXG5cdH1cblx0cmV0dXJuIFJlcXVlc3RUeXBlLkRPV05MT0FEXG59XG4iLCJleHBvcnQgdmFyIEVycm9yU291cmNlID0ge1xuXHRBR0VOVDogJ2FnZW50Jyxcblx0Q09OU09MRTogJ2NvbnNvbGUnLFxuXHRORVRXT1JLOiAnbmV0d29yaycsXG5cdFNPVVJDRTogJ3NvdXJjZScsXG5cdExPR0dFUjogJ2xvZ2dlcicsXG59XG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0VW5rbm93bkVycm9yKHN0YWNrVHJhY2UsIGVycm9yT2JqZWN0LCBub25FcnJvclByZWZpeCkge1xuXHRpZiAoXG5cdFx0IXN0YWNrVHJhY2UgfHxcblx0XHQoc3RhY2tUcmFjZS5tZXNzYWdlID09PSB1bmRlZmluZWQgJiYgIShlcnJvck9iamVjdCBpbnN0YW5jZW9mIEVycm9yKSlcblx0KSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdG1lc3NhZ2U6IG5vbkVycm9yUHJlZml4ICsgJycgKyBKU09OLnN0cmluZ2lmeShlcnJvck9iamVjdCksXG5cdFx0XHRzdGFjazogJ05vIHN0YWNrLCBjb25zaWRlciB1c2luZyBhbiBpbnN0YW5jZSBvZiBFcnJvcicsXG5cdFx0XHR0eXBlOiBzdGFja1RyYWNlICYmIHN0YWNrVHJhY2UubmFtZSxcblx0XHR9XG5cdH1cblx0cmV0dXJuIHtcblx0XHRtZXNzYWdlOiBzdGFja1RyYWNlLm1lc3NhZ2UgfHwgJ0VtcHR5IG1lc3NhZ2UnLFxuXHRcdHN0YWNrOiB0b1N0YWNrVHJhY2VTdHJpbmcoc3RhY2tUcmFjZSksXG5cdFx0dHlwZTogc3RhY2tUcmFjZS5uYW1lLFxuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b1N0YWNrVHJhY2VTdHJpbmcoc3RhY2spIHtcblx0dmFyIHJlc3VsdCA9IHN0YWNrLm5hbWUgfHwgJ0Vycm9yJyArICc6ICcgKyBzdGFjay5tZXNzYWdlXG5cdHN0YWNrLnN0YWNrLmZvckVhY2goZnVuY3Rpb24gKGZyYW1lKSB7XG5cdFx0dmFyIGZ1bmMgPSBmcmFtZS5mdW5jID09PSAnPycgPyAnPGFub255bW91cz4nIDogZnJhbWUuZnVuY1xuXHRcdHZhciBhcmdzID1cblx0XHRcdGZyYW1lLmFyZ3MgJiYgZnJhbWUuYXJncy5sZW5ndGggPiAwXG5cdFx0XHRcdD8gJygnICsgZnJhbWUuYXJncy5qb2luKCcsICcpICsgJyknXG5cdFx0XHRcdDogJydcblx0XHR2YXIgbGluZSA9IGZyYW1lLmxpbmUgPyAnOicgKyBmcmFtZS5saW5lIDogJydcblx0XHR2YXIgY29sdW1uID0gZnJhbWUubGluZSAmJiBmcmFtZS5jb2x1bW4gPyAnOicgKyBmcmFtZS5jb2x1bW4gOiAnJ1xuXHRcdHJlc3VsdCArPSAnXFxuICBhdCAnICsgZnVuYyArIGFyZ3MgKyAnIEAgJyArIGZyYW1lLnVybCArIGxpbmUgKyBjb2x1bW5cblx0fSlcblx0cmV0dXJuIHJlc3VsdFxufVxuIiwiZXhwb3J0IGNsYXNzIExpZmVDeWNsZSB7XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuY2FsbGJhY2tzID0ge31cblx0fVxuXHRub3RpZnkoZXZlbnRUeXBlLCBkYXRhKSB7XG5cdFx0Y29uc3QgZXZlbnRDYWxsYmFja3MgPSB0aGlzLmNhbGxiYWNrc1tldmVudFR5cGVdXG5cdFx0aWYgKGV2ZW50Q2FsbGJhY2tzKSB7XG5cdFx0XHRldmVudENhbGxiYWNrcy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soZGF0YSkpXG5cdFx0fVxuXHR9XG5cdHN1YnNjcmliZShldmVudFR5cGUsIGNhbGxiYWNrKSB7XG5cdFx0aWYgKCF0aGlzLmNhbGxiYWNrc1tldmVudFR5cGVdKSB7XG5cdFx0XHR0aGlzLmNhbGxiYWNrc1tldmVudFR5cGVdID0gW11cblx0XHR9XG5cdFx0dGhpcy5jYWxsYmFja3NbZXZlbnRUeXBlXS5wdXNoKGNhbGxiYWNrKVxuXHRcdHJldHVybiB7XG5cdFx0XHR1bnN1YnNjcmliZTogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmNhbGxiYWNrc1tldmVudFR5cGVdID0gdGhpcy5jYWxsYmFja3NbZXZlbnRUeXBlXS5maWx0ZXIoXG5cdFx0XHRcdFx0KG90aGVyKSA9PiBjYWxsYmFjayAhPT0gb3RoZXIsXG5cdFx0XHRcdClcblx0XHRcdH0sXG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCB2YXIgTGlmZUN5Y2xlRXZlbnRUeXBlID0ge1xuXHRQRVJGT1JNQU5DRV9FTlRSWV9DT0xMRUNURUQ6ICdQRVJGT1JNQU5DRV9FTlRSWV9DT0xMRUNURUQnLFxuXHRBVVRPX0FDVElPTl9DUkVBVEVEOiAnQVVUT19BQ1RJT05fQ1JFQVRFRCcsXG5cdEFVVE9fQUNUSU9OX0NPTVBMRVRFRDogJ0FVVE9fQUNUSU9OX0NPTVBMRVRFRCcsXG5cdEFVVE9fQUNUSU9OX0RJU0NBUkRFRDogJ0FVVE9fQUNUSU9OX0RJU0NBUkRFRCcsXG5cdEFQUF9ISURFOiAnQVBQX0hJREUnLFxuXHRBUFBfVVBEQVRFOiAnQVBQX1VQREFURScsXG5cdFBBR0VfU0VUX0RBVEFfVVBEQVRFOiAnUEFHRV9TRVRfREFUQV9VUERBVEUnLFxuXHRQQUdFX0FMSUFTX0FDVElPTjogJ1BBR0VfQUxJQVNfQUNUSU9OJyxcblx0VklFV19DUkVBVEVEOiAnVklFV19DUkVBVEVEJyxcblx0VklFV19VUERBVEVEOiAnVklFV19VUERBVEVEJyxcblx0VklFV19FTkRFRDogJ1ZJRVdfRU5ERUQnLFxuXHRSRVFVRVNUX1NUQVJURUQ6ICdSRVFVRVNUX1NUQVJURUQnLFxuXHRSRVFVRVNUX0NPTVBMRVRFRDogJ1JFUVVFU1RfQ09NUExFVEVEJyxcblx0UkFXX1JVTV9FVkVOVF9DT0xMRUNURUQ6ICdSQVdfUlVNX0VWRU5UX0NPTExFQ1RFRCcsXG5cdFJVTV9FVkVOVF9DT0xMRUNURUQ6ICdSVU1fRVZFTlRfQ09MTEVDVEVEJyxcbn1cbiIsImNvbnN0IERFRkFVTFRfT1BUSU9OUyA9IHtcblx0dG91Y2hTdGFydDogZnVuY3Rpb24gKCkge30sXG5cdHRvdWNoTW92ZTogZnVuY3Rpb24gKCkge30sXG5cdHRvdWNoRW5kOiBmdW5jdGlvbiAoKSB7fSxcblx0dG91Y2hDYW5jZWw6IGZ1bmN0aW9uICgpIHt9LFxuXHRtdWx0aXBvaW50U3RhcnQ6IGZ1bmN0aW9uICgpIHt9LFxuXHRtdWx0aXBvaW50RW5kOiBmdW5jdGlvbiAoKSB7fSxcblx0dGFwOiBmdW5jdGlvbiAoKSB7fSxcblx0ZG91YmxlVGFwOiBmdW5jdGlvbiAoKSB7fSxcblx0bG9uZ1RhcDogZnVuY3Rpb24gKCkge30sXG5cdHNpbmdsZVRhcDogZnVuY3Rpb24gKCkge30sXG5cdHJvdGF0ZTogZnVuY3Rpb24gKCkge30sXG5cdHBpbmNoOiBmdW5jdGlvbiAoKSB7fSxcblx0cHJlc3NNb3ZlOiBmdW5jdGlvbiAoKSB7fSxcblx0c3dpcGU6IGZ1bmN0aW9uICgpIHt9LFxufVxuZXhwb3J0IGZ1bmN0aW9uIE1pbmFUb3VjaChfcGFnZSwgbmFtZSwgb3B0aW9uID0ge30pIHtcblx0dGhpcy5wcmVWID0geyB4OiBudWxsLCB5OiBudWxsIH1cblx0dGhpcy5waW5jaFN0YXJ0TGVuID0gbnVsbFxuXHR0aGlzLnNjYWxlID0gMVxuXHR0aGlzLmlzRG91YmxlVGFwID0gZmFsc2VcblxuXHR0aGlzLmRlbHRhID0gbnVsbFxuXHR0aGlzLmxhc3QgPSBudWxsXG5cdHRoaXMubm93ID0gbnVsbFxuXHR0aGlzLnRhcFRpbWVvdXQgPSBudWxsXG5cdHRoaXMuc2luZ2xlVGFwVGltZW91dCA9IG51bGxcblx0dGhpcy5sb25nVGFwVGltZW91dCA9IG51bGxcblx0dGhpcy5zd2lwZVRpbWVvdXQgPSBudWxsXG5cdHRoaXMueDEgPSB0aGlzLngyID0gdGhpcy55MSA9IHRoaXMueTIgPSBudWxsXG5cdHRoaXMucHJlVGFwUG9zaXRpb24gPSB7IHg6IG51bGwsIHk6IG51bGwgfVxuXG5cdHRoaXMubGFzdFpvb20gPSAxXG5cdHRoaXMudGVtcFpvb20gPSAxXG5cblx0dHJ5IHtcblx0XHRpZiAodGhpcy5fY2hlY2tCZWZvcmVDcmVhdGUoX3BhZ2UsIG5hbWUpKSB7XG5cdFx0XHR0aGlzLl9uYW1lID0gbmFtZVxuXHRcdFx0dGhpcy5fb3B0aW9uID0geyAuLi5ERUZBVUxUX09QVElPTlMsIC4uLm9wdGlvbiB9XG5cdFx0XHRfcGFnZVtuYW1lXSA9IHRoaXNcblx0XHRcdHRoaXMuX2JpbmRGdW5jKF9wYWdlKVxuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRjb25zb2xlLmVycm9yKGVycm9yKVxuXHR9XG59XG5NaW5hVG91Y2gucHJvdG90eXBlID0ge1xuXHRfY2hlY2tCZWZvcmVDcmVhdGU6IGZ1bmN0aW9uIChfcGFnZSwgbmFtZSkge1xuXHRcdGlmICghX3BhZ2UgfHwgIW5hbWUpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignTWluYVRvdWNo5a6e5L6L5YyW5pe277yM5b+F6aG75Lyg5YWlcGFnZeWvueixoeWSjOW8leeUqOWQjScpXG5cdFx0fVxuXHRcdGlmIChfcGFnZVtuYW1lXSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdNaW5hVG91Y2jlrp7kvovljJZlcnJvcu+8miAnICsgbmFtZSArICcg5bey57uP5a2Y5ZyocGFnZeS4rScpXG5cdFx0fVxuXHRcdHJldHVybiB0cnVlXG5cdH0sXG5cdF9iaW5kRnVuYzogZnVuY3Rpb24gKF9wYWdlKSB7XG5cdFx0bGV0IGZ1bmNOYW1lcyA9IFsnc3RhcnQnLCAnbW92ZScsICdlbmQnLCAnY2FuY2VsJ11cblx0XHRmb3IgKGxldCBmdW5jTmFtZSBvZiBmdW5jTmFtZXMpIHtcblx0XHRcdF9wYWdlW3RoaXMuX25hbWUgKyAnLicgKyBmdW5jTmFtZV0gPSB0aGlzW2Z1bmNOYW1lXS5iaW5kKHRoaXMpXG5cdFx0fVxuXHR9LFxuXHRzdGFydDogZnVuY3Rpb24gKGV2dCkge1xuXHRcdGlmICghZXZ0LnRvdWNoZXMpIHJldHVyblxuXHRcdHRoaXMubm93ID0gRGF0ZS5ub3coKVxuXHRcdHRoaXMueDEgPVxuXHRcdFx0ZXZ0LnRvdWNoZXNbMF0ucGFnZVggPT0gbnVsbCA/IGV2dC50b3VjaGVzWzBdLnggOiBldnQudG91Y2hlc1swXS5wYWdlWFxuXHRcdHRoaXMueTEgPVxuXHRcdFx0ZXZ0LnRvdWNoZXNbMF0ucGFnZVkgPT0gbnVsbCA/IGV2dC50b3VjaGVzWzBdLnkgOiBldnQudG91Y2hlc1swXS5wYWdlWVxuXHRcdHRoaXMuZGVsdGEgPSB0aGlzLm5vdyAtICh0aGlzLmxhc3QgfHwgdGhpcy5ub3cpXG5cdFx0dGhpcy5fb3B0aW9uLnRvdWNoU3RhcnQoZXZ0KVxuXHRcdGlmICh0aGlzLnByZVRhcFBvc2l0aW9uLnggIT09IG51bGwpIHtcblx0XHRcdHRoaXMuaXNEb3VibGVUYXAgPVxuXHRcdFx0XHR0aGlzLmRlbHRhID4gMCAmJlxuXHRcdFx0XHR0aGlzLmRlbHRhIDw9IDI1MCAmJlxuXHRcdFx0XHRNYXRoLmFicyh0aGlzLnByZVRhcFBvc2l0aW9uLnggLSB0aGlzLngxKSA8IDMwICYmXG5cdFx0XHRcdE1hdGguYWJzKHRoaXMucHJlVGFwUG9zaXRpb24ueSAtIHRoaXMueTEpIDwgMzBcblx0XHR9XG5cdFx0dGhpcy5wcmVUYXBQb3NpdGlvbi54ID0gdGhpcy54MVxuXHRcdHRoaXMucHJlVGFwUG9zaXRpb24ueSA9IHRoaXMueTFcblx0XHR0aGlzLmxhc3QgPSB0aGlzLm5vd1xuXHRcdGxldCBwcmVWID0gdGhpcy5wcmVWLFxuXHRcdFx0bGVuID0gZXZ0LnRvdWNoZXMubGVuZ3RoXG5cdFx0aWYgKGxlbiA+IDEpIHtcblx0XHRcdHRoaXMuX2NhbmNlbExvbmdUYXAoKVxuXHRcdFx0dGhpcy5fY2FuY2VsU2luZ2xlVGFwKClcblx0XHRcdGxldCBvdHggPVxuXHRcdFx0XHRldnQudG91Y2hlc1sxXS5wYWdlWCA9PSBudWxsID8gZXZ0LnRvdWNoZXNbMV0ueCA6IGV2dC50b3VjaGVzWzFdLnBhZ2VYXG5cdFx0XHRsZXQgb3R5ID1cblx0XHRcdFx0ZXZ0LnRvdWNoZXNbMV0ucGFnZVkgPT0gbnVsbCA/IGV2dC50b3VjaGVzWzFdLnkgOiBldnQudG91Y2hlc1sxXS5wYWdlWVxuXHRcdFx0bGV0IHYgPSB7IHg6IG90eCAtIHRoaXMueDEsIHk6IG90eSAtIHRoaXMueTEgfVxuXHRcdFx0cHJlVi54ID0gdi54XG5cdFx0XHRwcmVWLnkgPSB2Lnlcblx0XHRcdHRoaXMucGluY2hTdGFydExlbiA9IGdldExlbihwcmVWKVxuXHRcdFx0dGhpcy5fb3B0aW9uLm11bHRpcG9pbnRTdGFydChldnQpXG5cdFx0fVxuXHRcdHRoaXMubG9uZ1RhcFRpbWVvdXQgPSBzZXRUaW1lb3V0KFxuXHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRldnQudHlwZSA9ICdsb25nVGFwJ1xuXHRcdFx0XHR0aGlzLl9vcHRpb24ubG9uZ1RhcChldnQpXG5cdFx0XHR9LmJpbmQodGhpcyksXG5cdFx0XHQ3NTAsXG5cdFx0KVxuXHR9LFxuXHRtb3ZlOiBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0aWYgKCFldnQudG91Y2hlcykgcmV0dXJuXG5cdFx0bGV0IHByZVYgPSB0aGlzLnByZVYsXG5cdFx0XHRsZW4gPSBldnQudG91Y2hlcy5sZW5ndGgsXG5cdFx0XHRjdXJyZW50WCA9XG5cdFx0XHRcdGV2dC50b3VjaGVzWzBdLnBhZ2VYID09IG51bGwgPyBldnQudG91Y2hlc1swXS54IDogZXZ0LnRvdWNoZXNbMF0ucGFnZVgsXG5cdFx0XHRjdXJyZW50WSA9XG5cdFx0XHRcdGV2dC50b3VjaGVzWzBdLnBhZ2VZID09IG51bGwgPyBldnQudG91Y2hlc1swXS55IDogZXZ0LnRvdWNoZXNbMF0ucGFnZVlcblx0XHR0aGlzLmlzRG91YmxlVGFwID0gZmFsc2Vcblx0XHRpZiAobGVuID4gMSkge1xuXHRcdFx0bGV0IG90eCA9XG5cdFx0XHRcdGV2dC50b3VjaGVzWzFdLnBhZ2VYID09IG51bGwgPyBldnQudG91Y2hlc1sxXS54IDogZXZ0LnRvdWNoZXNbMV0ucGFnZVhcblx0XHRcdGxldCBvdHkgPVxuXHRcdFx0XHRldnQudG91Y2hlc1sxXS5wYWdlWSA9PSBudWxsID8gZXZ0LnRvdWNoZXNbMV0ueSA6IGV2dC50b3VjaGVzWzFdLnBhZ2VZXG5cdFx0XHRsZXQgdiA9IHsgeDogb3R4IC0gY3VycmVudFgsIHk6IG90eSAtIGN1cnJlbnRZIH1cblxuXHRcdFx0aWYgKHByZVYueCAhPT0gbnVsbCkge1xuXHRcdFx0XHRpZiAodGhpcy5waW5jaFN0YXJ0TGVuID4gMCkge1xuXHRcdFx0XHRcdGV2dC5zaW5nbGVab29tID0gZ2V0TGVuKHYpIC8gdGhpcy5waW5jaFN0YXJ0TGVuXG5cdFx0XHRcdFx0ZXZ0Lnpvb20gPSBldnQuc2luZ2xlWm9vbSAqIHRoaXMubGFzdFpvb21cblx0XHRcdFx0XHR0aGlzLnRlbXBab29tID0gZXZ0Lnpvb21cblx0XHRcdFx0XHRldnQudHlwZSA9ICdwaW5jaCdcblx0XHRcdFx0XHR0aGlzLl9vcHRpb24ucGluY2goZXZ0KVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZXZ0LmFuZ2xlID0gZ2V0Um90YXRlQW5nbGUodiwgcHJlVilcblx0XHRcdFx0ZXZ0LnR5cGUgPSAncm90YXRlJ1xuXHRcdFx0XHR0aGlzLl9vcHRpb24ucm90YXRlKGV2dClcblx0XHRcdH1cblx0XHRcdHByZVYueCA9IHYueFxuXHRcdFx0cHJlVi55ID0gdi55XG5cdFx0fSBlbHNlIHtcblx0XHRcdGlmICh0aGlzLngyICE9PSBudWxsKSB7XG5cdFx0XHRcdGV2dC5kZWx0YVggPSBjdXJyZW50WCAtIHRoaXMueDJcblx0XHRcdFx0ZXZ0LmRlbHRhWSA9IGN1cnJlbnRZIC0gdGhpcy55MlxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZXZ0LmRlbHRhWCA9IDBcblx0XHRcdFx0ZXZ0LmRlbHRhWSA9IDBcblx0XHRcdH1cblx0XHRcdHRoaXMuX29wdGlvbi5wcmVzc01vdmUoZXZ0KVxuXHRcdH1cblxuXHRcdHRoaXMuX29wdGlvbi50b3VjaE1vdmUoZXZ0KVxuXG5cdFx0dGhpcy5fY2FuY2VsTG9uZ1RhcCgpXG5cdFx0dGhpcy54MiA9IGN1cnJlbnRYXG5cdFx0dGhpcy55MiA9IGN1cnJlbnRZXG5cdFx0aWYgKGxlbiA+IDEpIHtcblx0XHRcdC8vIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblx0fSxcblx0ZW5kOiBmdW5jdGlvbiAoZXZ0KSB7XG5cdFx0aWYgKCFldnQuY2hhbmdlZFRvdWNoZXMpIHJldHVyblxuXHRcdHRoaXMuX2NhbmNlbExvbmdUYXAoKVxuXHRcdGxldCBzZWxmID0gdGhpc1xuXHRcdGV2dC5kaXJlY3Rpb24gPSB0aGlzLl9zd2lwZURpcmVjdGlvbih0aGlzLngxLCB0aGlzLngyLCB0aGlzLnkxLCB0aGlzLnkyKSAvL+WcqOe7k+adn+mSqeWtkOmDveWKoOWFpeaWueWQkeWIpOaWre+8jOS9huinpuWPkXN3aXBl556s5pe25b+F6aG75L2N56e75aSn5LqOMzBcblx0XHRpZiAoZXZ0LnRvdWNoZXMubGVuZ3RoIDwgMikge1xuXHRcdFx0dGhpcy5sYXN0Wm9vbSA9IHRoaXMudGVtcFpvb21cblx0XHRcdHRoaXMuX29wdGlvbi5tdWx0aXBvaW50RW5kKGV2dClcblx0XHR9XG5cdFx0dGhpcy5fb3B0aW9uLnRvdWNoRW5kKGV2dClcblx0XHQvL3N3aXBlXG5cdFx0aWYgKFxuXHRcdFx0KHRoaXMueDIgJiYgTWF0aC5hYnModGhpcy54MSAtIHRoaXMueDIpID4gMzApIHx8XG5cdFx0XHQodGhpcy55MiAmJiBNYXRoLmFicyh0aGlzLnkxIC0gdGhpcy55MikgPiAzMClcblx0XHQpIHtcblx0XHRcdC8vIGV2dC5kaXJlY3Rpb24gPSB0aGlzLl9zd2lwZURpcmVjdGlvbih0aGlzLngxLCB0aGlzLngyLCB0aGlzLnkxLCB0aGlzLnkyKTtcblx0XHRcdHRoaXMuc3dpcGVUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGV2dC50eXBlID0gJ3N3aXBlJ1xuXHRcdFx0XHRzZWxmLl9vcHRpb24uc3dpcGUoZXZ0KVxuXHRcdFx0fSwgMClcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy50YXBUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGV2dC50eXBlID0gJ3RhcCdcblx0XHRcdFx0c2VsZi5fb3B0aW9uLnRhcChldnQpXG5cdFx0XHRcdC8vIHRyaWdnZXIgZG91YmxlIHRhcCBpbW1lZGlhdGVseVxuXHRcdFx0XHRpZiAoc2VsZi5pc0RvdWJsZVRhcCkge1xuXHRcdFx0XHRcdGV2dC50eXBlID0gJ2RvdWJsZVRhcCdcblx0XHRcdFx0XHRzZWxmLl9vcHRpb24uZG91YmxlVGFwKGV2dClcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQoc2VsZi5zaW5nbGVUYXBUaW1lb3V0KVxuXHRcdFx0XHRcdHNlbGYuaXNEb3VibGVUYXAgPSBmYWxzZVxuXHRcdFx0XHR9XG5cdFx0XHR9LCAwKVxuXG5cdFx0XHRpZiAoIXNlbGYuaXNEb3VibGVUYXApIHtcblx0XHRcdFx0c2VsZi5zaW5nbGVUYXBUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0c2VsZi5fb3B0aW9uLnNpbmdsZVRhcChldnQpXG5cdFx0XHRcdH0sIDI1MClcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnByZVYueCA9IDBcblx0XHR0aGlzLnByZVYueSA9IDBcblx0XHR0aGlzLnNjYWxlID0gMVxuXHRcdHRoaXMucGluY2hTdGFydExlbiA9IG51bGxcblx0XHR0aGlzLngxID0gdGhpcy54MiA9IHRoaXMueTEgPSB0aGlzLnkyID0gbnVsbFxuXHR9LFxuXHRjYW5jZWw6IGZ1bmN0aW9uIChldnQpIHtcblx0XHRjbGVhclRpbWVvdXQodGhpcy5zaW5nbGVUYXBUaW1lb3V0KVxuXHRcdGNsZWFyVGltZW91dCh0aGlzLnRhcFRpbWVvdXQpXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMubG9uZ1RhcFRpbWVvdXQpXG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMuc3dpcGVUaW1lb3V0KVxuXHRcdHRoaXMuX29wdGlvbi50b3VjaENhbmNlbChldnQpXG5cdH0sXG5cdF9jYW5jZWxMb25nVGFwOiBmdW5jdGlvbiAoKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KHRoaXMubG9uZ1RhcFRpbWVvdXQpXG5cdH0sXG5cblx0X2NhbmNlbFNpbmdsZVRhcDogZnVuY3Rpb24gKCkge1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLnNpbmdsZVRhcFRpbWVvdXQpXG5cdH0sXG5cblx0X3N3aXBlRGlyZWN0aW9uOiBmdW5jdGlvbiAoeDEsIHgyLCB5MSwgeTIpIHtcblx0XHRyZXR1cm4gTWF0aC5hYnMoeDEgLSB4MikgPj0gTWF0aC5hYnMoeTEgLSB5Milcblx0XHRcdD8geDEgLSB4MiA+IDBcblx0XHRcdFx0PyAnTGVmdCdcblx0XHRcdFx0OiAnUmlnaHQnXG5cdFx0XHQ6IHkxIC0geTIgPiAwXG5cdFx0XHQ/ICdVcCdcblx0XHRcdDogJ0Rvd24nXG5cdH0sXG5cdGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcblx0XHRpZiAodGhpcy5zaW5nbGVUYXBUaW1lb3V0KSBjbGVhclRpbWVvdXQodGhpcy5zaW5nbGVUYXBUaW1lb3V0KVxuXHRcdGlmICh0aGlzLnRhcFRpbWVvdXQpIGNsZWFyVGltZW91dCh0aGlzLnRhcFRpbWVvdXQpXG5cdFx0aWYgKHRoaXMubG9uZ1RhcFRpbWVvdXQpIGNsZWFyVGltZW91dCh0aGlzLmxvbmdUYXBUaW1lb3V0KVxuXHRcdGlmICh0aGlzLnN3aXBlVGltZW91dCkgY2xlYXJUaW1lb3V0KHRoaXMuc3dpcGVUaW1lb3V0KVxuXG5cdFx0dGhpcy5fb3B0aW9uLnJvdGF0ZSA9IG51bGxcblx0XHR0aGlzLl9vcHRpb24udG91Y2hTdGFydCA9IG51bGxcblx0XHR0aGlzLl9vcHRpb24ubXVsdGlwb2ludFN0YXJ0ID0gbnVsbFxuXHRcdHRoaXMuX29wdGlvbi5tdWx0aXBvaW50RW5kID0gbnVsbFxuXHRcdHRoaXMuX29wdGlvbi5waW5jaCA9IG51bGxcblx0XHR0aGlzLl9vcHRpb24uc3dpcGUgPSBudWxsXG5cdFx0dGhpcy5fb3B0aW9uLnRhcCA9IG51bGxcblx0XHR0aGlzLl9vcHRpb24uZG91YmxlVGFwID0gbnVsbFxuXHRcdHRoaXMuX29wdGlvbi5sb25nVGFwID0gbnVsbFxuXHRcdHRoaXMuX29wdGlvbi5zaW5nbGVUYXAgPSBudWxsXG5cdFx0dGhpcy5fb3B0aW9uLnByZXNzTW92ZSA9IG51bGxcblx0XHR0aGlzLl9vcHRpb24udG91Y2hNb3ZlID0gbnVsbFxuXHRcdHRoaXMuX29wdGlvbi50b3VjaEVuZCA9IG51bGxcblx0XHR0aGlzLl9vcHRpb24udG91Y2hDYW5jZWwgPSBudWxsXG5cblx0XHR0aGlzLnByZVYgPSB0aGlzLnBpbmNoU3RhcnRMZW4gPSB0aGlzLnNjYWxlID0gdGhpcy5pc0RvdWJsZVRhcCA9IHRoaXMuZGVsdGEgPSB0aGlzLmxhc3QgPSB0aGlzLm5vdyA9IHRoaXMudGFwVGltZW91dCA9IHRoaXMuc2luZ2xlVGFwVGltZW91dCA9IHRoaXMubG9uZ1RhcFRpbWVvdXQgPSB0aGlzLnN3aXBlVGltZW91dCA9IHRoaXMueDEgPSB0aGlzLngyID0gdGhpcy55MSA9IHRoaXMueTIgPSB0aGlzLnByZVRhcFBvc2l0aW9uID0gdGhpcy5yb3RhdGUgPSB0aGlzLnRvdWNoU3RhcnQgPSB0aGlzLm11bHRpcG9pbnRTdGFydCA9IHRoaXMubXVsdGlwb2ludEVuZCA9IHRoaXMucGluY2ggPSB0aGlzLnN3aXBlID0gdGhpcy50YXAgPSB0aGlzLmRvdWJsZVRhcCA9IHRoaXMubG9uZ1RhcCA9IHRoaXMuc2luZ2xlVGFwID0gdGhpcy5wcmVzc01vdmUgPSB0aGlzLnRvdWNoTW92ZSA9IHRoaXMudG91Y2hFbmQgPSB0aGlzLnRvdWNoQ2FuY2VsID0gbnVsbFxuXG5cdFx0cmV0dXJuIG51bGxcblx0fSxcbn1cblxuZnVuY3Rpb24gZ2V0TGVuKHYpIHtcblx0cmV0dXJuIE1hdGguc3FydCh2LnggKiB2LnggKyB2LnkgKiB2LnkpXG59XG5cbmZ1bmN0aW9uIGRvdCh2MSwgdjIpIHtcblx0cmV0dXJuIHYxLnggKiB2Mi54ICsgdjEueSAqIHYyLnlcbn1cblxuZnVuY3Rpb24gZ2V0QW5nbGUodjEsIHYyKSB7XG5cdGxldCBtciA9IGdldExlbih2MSkgKiBnZXRMZW4odjIpXG5cdGlmIChtciA9PT0gMCkgcmV0dXJuIDBcblx0bGV0IHIgPSBkb3QodjEsIHYyKSAvIG1yXG5cdGlmIChyID4gMSkgciA9IDFcblx0cmV0dXJuIE1hdGguYWNvcyhyKVxufVxuXG5mdW5jdGlvbiBjcm9zcyh2MSwgdjIpIHtcblx0cmV0dXJuIHYxLnggKiB2Mi55IC0gdjIueCAqIHYxLnlcbn1cblxuZnVuY3Rpb24gZ2V0Um90YXRlQW5nbGUodjEsIHYyKSB7XG5cdGxldCBhbmdsZSA9IGdldEFuZ2xlKHYxLCB2Milcblx0aWYgKGNyb3NzKHYxLCB2MikgPiAwKSB7XG5cdFx0YW5nbGUgKj0gLTFcblx0fVxuXG5cdHJldHVybiAoYW5nbGUgKiAxODApIC8gTWF0aC5QSVxufVxuIiwiZXhwb3J0IGNsYXNzIE9ic2VydmFibGUge1xuXHRjb25zdHJ1Y3RvcigpIHtcblx0XHR0aGlzLm9ic2VydmVycyA9IFtdXG5cdH1cblx0c3Vic2NyaWJlKGYpIHtcblx0XHR0aGlzLm9ic2VydmVycy5wdXNoKGYpXG5cdH1cblx0bm90aWZ5KGRhdGEpIHtcblx0XHR0aGlzLm9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChvYnNlcnZlcikge1xuXHRcdFx0b2JzZXJ2ZXIoZGF0YSlcblx0XHR9KVxuXHR9XG59XG4iLCJpbXBvcnQgeyBkZWVwTWl4T2JqZWN0IH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuXG5mdW5jdGlvbiBnZXRTREsoKSB7XG5cdHZhciBzZGsgPSBudWxsLFxuXHRcdHRyYWNrZXIgPSAnJ1xuXHR0cnkge1xuXHRcdGlmICh3eCAmJiB0eXBlb2Ygd3ggPT09ICdvYmplY3QnICYmIHR5cGVvZiB3eC5yZXF1ZXN0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRzZGsgPSBkZWVwTWl4T2JqZWN0KHt9LCB3eClcblx0XHRcdHRyYWNrZXIgPSAnd3gnXG5cdFx0XHR3eCA9IHNka1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0Y29uc29sZS53YXJuKCd1bnN1cHBvcnQgcGxhdGZvcm0sIEZhaWwgdG8gc3RhcnQnKVxuXHR9XG5cdGNvbnNvbGUubG9nKCctLS0tLS1nZXQgU0RLLS0tLS0tLScpXG5cdHJldHVybiB7IHNkaywgdHJhY2tlciB9XG59XG5jb25zdCBpbnN0YW5jZSA9IGdldFNESygpXG5cbmV4cG9ydCBjb25zdCBzZGsgPSBpbnN0YW5jZS5zZGtcbmV4cG9ydCBjb25zdCB0cmFja2VyID0gaW5zdGFuY2UudHJhY2tlclxuIiwiaW1wb3J0IHtcblx0ZmluZEJ5UGF0aCxcblx0ZXNjYXBlUm93RGF0YSxcblx0aXNOdW1iZXIsXG5cdGVhY2gsXG5cdGlzU3RyaW5nLFxuXHR2YWx1ZXMsXG5cdGV4dGVuZCxcbn0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgc2RrIH0gZnJvbSAnLi4vY29yZS9zZGsnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IGNvbW1vblRhZ3MsIGRhdGFNYXAgfSBmcm9tICcuL2RhdGFNYXAnXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9VVEYtOFxudmFyIEhBU19NVUxUSV9CWVRFU19DSEFSQUNURVJTID0gL1teXFx1MDAwMC1cXHUwMDdGXS9cbmZ1bmN0aW9uIGFkZEJhdGNoUHJlY2lzaW9uKHVybCkge1xuXHRpZiAoIXVybCkgcmV0dXJuIHVybFxuXHRyZXR1cm4gdXJsICsgKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArICdwcmVjaXNpb249bXMnXG59XG52YXIgaHR0cFJlcXVlc3QgPSBmdW5jdGlvbiAoZW5kcG9pbnRVcmwsIGJ5dGVzTGltaXQpIHtcblx0dGhpcy5lbmRwb2ludFVybCA9IGVuZHBvaW50VXJsXG5cdHRoaXMuYnl0ZXNMaW1pdCA9IGJ5dGVzTGltaXRcbn1cbmh0dHBSZXF1ZXN0LnByb3RvdHlwZSA9IHtcblx0c2VuZDogZnVuY3Rpb24gKGRhdGEpIHtcblx0XHR2YXIgdXJsID0gYWRkQmF0Y2hQcmVjaXNpb24odGhpcy5lbmRwb2ludFVybClcblx0XHRzZGsucmVxdWVzdCh7XG5cdFx0XHRtZXRob2Q6ICdQT1NUJyxcblx0XHRcdGhlYWRlcjoge1xuXHRcdFx0XHQnY29udGVudC10eXBlJzogJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcsXG5cdFx0XHR9LFxuXHRcdFx0dXJsLFxuXHRcdFx0ZGF0YSxcblx0XHR9KVxuXHR9LFxufVxuXG5leHBvcnQgdmFyIEh0dHBSZXF1ZXN0ID0gaHR0cFJlcXVlc3RcblxuZnVuY3Rpb24gYmF0Y2goXG5cdHJlcXVlc3QsXG5cdG1heFNpemUsXG5cdGJ5dGVzTGltaXQsXG5cdG1heE1lc3NhZ2VTaXplLFxuXHRmbHVzaFRpbWVvdXQsXG5cdGxpZmVDeWNsZSxcbikge1xuXHR0aGlzLnJlcXVlc3QgPSByZXF1ZXN0XG5cdHRoaXMubWF4U2l6ZSA9IG1heFNpemVcblx0dGhpcy5ieXRlc0xpbWl0ID0gYnl0ZXNMaW1pdFxuXHR0aGlzLm1heE1lc3NhZ2VTaXplID0gbWF4TWVzc2FnZVNpemVcblx0dGhpcy5mbHVzaFRpbWVvdXQgPSBmbHVzaFRpbWVvdXRcblx0dGhpcy5saWZlQ3ljbGUgPSBsaWZlQ3ljbGVcblx0dGhpcy5mbHVzaE9uVmlzaWJpbGl0eUhpZGRlbigpXG5cdHRoaXMuZmx1c2hQZXJpb2RpY2FsbHkoKVxufVxuYmF0Y2gucHJvdG90eXBlID0ge1xuXHRwdXNoT25seUJ1ZmZlcjogW10sXG5cdHVwc2VydEJ1ZmZlcjoge30sXG5cdGJ1ZmZlckJ5dGVzU2l6ZTogMCxcblx0YnVmZmVyTWVzc2FnZUNvdW50OiAwLFxuXHRhZGQ6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0dGhpcy5hZGRPclVwZGF0ZShtZXNzYWdlKVxuXHR9LFxuXG5cdHVwc2VydDogZnVuY3Rpb24gKG1lc3NhZ2UsIGtleSkge1xuXHRcdHRoaXMuYWRkT3JVcGRhdGUobWVzc2FnZSwga2V5KVxuXHR9LFxuXG5cdGZsdXNoOiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ICE9PSAwKSB7XG5cdFx0XHR2YXIgbWVzc2FnZXMgPSB0aGlzLnB1c2hPbmx5QnVmZmVyLmNvbmNhdCh2YWx1ZXModGhpcy51cHNlcnRCdWZmZXIpKVxuXHRcdFx0dGhpcy5yZXF1ZXN0LnNlbmQobWVzc2FnZXMuam9pbignXFxuJyksIHRoaXMuYnVmZmVyQnl0ZXNTaXplKVxuXHRcdFx0dGhpcy5wdXNoT25seUJ1ZmZlciA9IFtdXG5cdFx0XHR0aGlzLnVwc2VydEJ1ZmZlciA9IHt9XG5cdFx0XHR0aGlzLmJ1ZmZlckJ5dGVzU2l6ZSA9IDBcblx0XHRcdHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ID0gMFxuXHRcdH1cblx0fSxcblxuXHRwcm9jZXNzU2VuZERhdGE6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0Ly8gdmFyIGRhdGEgPSBzYWZlSlNPTlBhcnNlKG1lc3NhZ2UpXG5cdFx0aWYgKCFtZXNzYWdlIHx8ICFtZXNzYWdlLnR5cGUpIHJldHVybiAnJ1xuXHRcdHZhciByb3dTdHIgPSAnJ1xuXHRcdHZhciBoYXNGaWxlZHMgPSBmYWxzZVxuXHRcdGVhY2goZGF0YU1hcCwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcblx0XHRcdGlmICh2YWx1ZS50eXBlID09PSBtZXNzYWdlLnR5cGUpIHtcblx0XHRcdFx0cm93U3RyICs9IGtleSArICcsJ1xuXHRcdFx0XHR2YXIgdGFnc1N0ciA9IFtdXG5cdFx0XHRcdHZhciB0YWdzID0gZXh0ZW5kKHt9LCBjb21tb25UYWdzLCB2YWx1ZS50YWdzKVxuXHRcdFx0XHRlYWNoKHRhZ3MsIGZ1bmN0aW9uICh2YWx1ZV9wYXRoLCBfa2V5KSB7XG5cdFx0XHRcdFx0dmFyIF92YWx1ZSA9IGZpbmRCeVBhdGgobWVzc2FnZSwgdmFsdWVfcGF0aClcblx0XHRcdFx0XHRpZiAoX3ZhbHVlIHx8IGlzTnVtYmVyKF92YWx1ZSkpIHtcblx0XHRcdFx0XHRcdHRhZ3NTdHIucHVzaChlc2NhcGVSb3dEYXRhKF9rZXkpICsgJz0nICsgZXNjYXBlUm93RGF0YShfdmFsdWUpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0aWYgKG1lc3NhZ2UudGFncy5sZW5ndGgpIHtcblx0XHRcdFx0XHQvLyDoh6rlrprkuYl0YWdcblx0XHRcdFx0XHRlYWNoKG1lc3NhZ2UudGFncywgZnVuY3Rpb24gKF92YWx1ZSwgX2tleSkge1xuXHRcdFx0XHRcdFx0aWYgKF92YWx1ZSB8fCBpc051bWJlcihfdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdHRhZ3NTdHIucHVzaChlc2NhcGVSb3dEYXRhKF9rZXkpICsgJz0nICsgZXNjYXBlUm93RGF0YShfdmFsdWUpKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGZpZWxkc1N0ciA9IFtdXG5cdFx0XHRcdGVhY2godmFsdWUuZmllbGRzLCBmdW5jdGlvbiAoX3ZhbHVlLCBfa2V5KSB7XG5cdFx0XHRcdFx0aWYgKEFycmF5LmlzQXJyYXkoX3ZhbHVlKSAmJiBfdmFsdWUubGVuZ3RoID09PSAyKSB7XG5cdFx0XHRcdFx0XHR2YXIgdHlwZSA9IF92YWx1ZVswXSxcblx0XHRcdFx0XHRcdFx0dmFsdWVfcGF0aCA9IF92YWx1ZVsxXVxuXHRcdFx0XHRcdFx0dmFyIF92YWx1ZURhdGEgPSBmaW5kQnlQYXRoKG1lc3NhZ2UsIHZhbHVlX3BhdGgpXG5cdFx0XHRcdFx0XHRpZiAoX3ZhbHVlRGF0YSB8fCBpc051bWJlcihfdmFsdWVEYXRhKSkge1xuXHRcdFx0XHRcdFx0XHRfdmFsdWVEYXRhID1cblx0XHRcdFx0XHRcdFx0XHR0eXBlID09PSAnc3RyaW5nJ1xuXHRcdFx0XHRcdFx0XHRcdFx0PyAnXCInICtcblx0XHRcdFx0XHRcdFx0XHRcdCAgU3RyaW5nKF92YWx1ZURhdGEpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL1tcXFxcXSpcIi9nLCAnXCInKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgK1xuXHRcdFx0XHRcdFx0XHRcdFx0ICAnXCInXG5cdFx0XHRcdFx0XHRcdFx0XHQ6IGVzY2FwZVJvd0RhdGEoX3ZhbHVlRGF0YSlcblx0XHRcdFx0XHRcdFx0ZmllbGRzU3RyLnB1c2goZXNjYXBlUm93RGF0YShfa2V5KSArICc9JyArIF92YWx1ZURhdGEpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChpc1N0cmluZyhfdmFsdWUpKSB7XG5cdFx0XHRcdFx0XHR2YXIgX3ZhbHVlRGF0YSA9IGZpbmRCeVBhdGgobWVzc2FnZSwgX3ZhbHVlKVxuXHRcdFx0XHRcdFx0aWYgKF92YWx1ZURhdGEgfHwgaXNOdW1iZXIoX3ZhbHVlRGF0YSkpIHtcblx0XHRcdFx0XHRcdFx0X3ZhbHVlRGF0YSA9IGVzY2FwZVJvd0RhdGEoX3ZhbHVlRGF0YSlcblx0XHRcdFx0XHRcdFx0ZmllbGRzU3RyLnB1c2goZXNjYXBlUm93RGF0YShfa2V5KSArICc9JyArIF92YWx1ZURhdGEpXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHRpZiAodGFnc1N0ci5sZW5ndGgpIHtcblx0XHRcdFx0XHRyb3dTdHIgKz0gdGFnc1N0ci5qb2luKCcsJylcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZmllbGRzU3RyLmxlbmd0aCkge1xuXHRcdFx0XHRcdHJvd1N0ciArPSAnICdcblx0XHRcdFx0XHRyb3dTdHIgKz0gZmllbGRzU3RyLmpvaW4oJywnKVxuXHRcdFx0XHRcdGhhc0ZpbGVkcyA9IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHRyb3dTdHIgPSByb3dTdHIgKyAnICcgKyBtZXNzYWdlLmRhdGVcblx0XHRcdH1cblx0XHR9KVxuXHRcdHJldHVybiBoYXNGaWxlZHMgPyByb3dTdHIgOiAnJ1xuXHR9LFxuXHRzaXplSW5CeXRlczogZnVuY3Rpb24gKGNhbmRpZGF0ZSkge1xuXHRcdC8vIEFjY3VyYXRlIGJ5dGUgc2l6ZSBjb21wdXRhdGlvbnMgY2FuIGRlZ3JhZGUgcGVyZm9ybWFuY2VzIHdoZW4gdGhlcmUgaXMgYSBsb3Qgb2YgZXZlbnRzIHRvIHByb2Nlc3Ncblx0XHRpZiAoIUhBU19NVUxUSV9CWVRFU19DSEFSQUNURVJTLnRlc3QoY2FuZGlkYXRlKSkge1xuXHRcdFx0cmV0dXJuIGNhbmRpZGF0ZS5sZW5ndGhcblx0XHR9XG5cdFx0dmFyIHRvdGFsID0gMCxcblx0XHRcdGNoYXJDb2RlXG5cdFx0Ly8gdXRmLTjnvJbnoIFcblx0XHRmb3IgKHZhciBpID0gMCwgbGVuID0gY2FuZGlkYXRlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRjaGFyQ29kZSA9IGNhbmRpZGF0ZS5jaGFyQ29kZUF0KGkpXG5cdFx0XHRpZiAoY2hhckNvZGUgPD0gMHgwMDdmKSB7XG5cdFx0XHRcdHRvdGFsICs9IDFcblx0XHRcdH0gZWxzZSBpZiAoY2hhckNvZGUgPD0gMHgwN2ZmKSB7XG5cdFx0XHRcdHRvdGFsICs9IDJcblx0XHRcdH0gZWxzZSBpZiAoY2hhckNvZGUgPD0gMHhmZmZmKSB7XG5cdFx0XHRcdHRvdGFsICs9IDNcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRvdGFsICs9IDRcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIHRvdGFsXG5cdH0sXG5cblx0YWRkT3JVcGRhdGU6IGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0XHR2YXIgcHJvY2VzcyA9IHRoaXMucHJvY2VzcyhtZXNzYWdlKVxuXHRcdGlmICghcHJvY2Vzcy5wcm9jZXNzZWRNZXNzYWdlIHx8IHByb2Nlc3MucHJvY2Vzc2VkTWVzc2FnZSA9PT0gJycpIHJldHVyblxuXHRcdGlmIChwcm9jZXNzLm1lc3NhZ2VCeXRlc1NpemUgPj0gdGhpcy5tYXhNZXNzYWdlU2l6ZSkge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHQnRGlzY2FyZGVkIGEgbWVzc2FnZSB3aG9zZSBzaXplIHdhcyBiaWdnZXIgdGhhbiB0aGUgbWF4aW11bSBhbGxvd2VkIHNpemUnICtcblx0XHRcdFx0XHR0aGlzLm1heE1lc3NhZ2VTaXplICtcblx0XHRcdFx0XHQnS0IuJyxcblx0XHRcdClcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRpZiAodGhpcy5oYXNNZXNzYWdlRm9yKGtleSkpIHtcblx0XHRcdHRoaXMucmVtb3ZlKGtleSlcblx0XHR9XG5cdFx0aWYgKHRoaXMud2lsbFJlYWNoZWRCeXRlc0xpbWl0V2l0aChwcm9jZXNzLm1lc3NhZ2VCeXRlc1NpemUpKSB7XG5cdFx0XHR0aGlzLmZsdXNoKClcblx0XHR9XG5cdFx0dGhpcy5wdXNoKHByb2Nlc3MucHJvY2Vzc2VkTWVzc2FnZSwgcHJvY2Vzcy5tZXNzYWdlQnl0ZXNTaXplLCBrZXkpXG5cdFx0aWYgKHRoaXMuaXNGdWxsKCkpIHtcblx0XHRcdHRoaXMuZmx1c2goKVxuXHRcdH1cblx0fSxcblx0cHJvY2VzczogZnVuY3Rpb24gKG1lc3NhZ2UpIHtcblx0XHR2YXIgcHJvY2Vzc2VkTWVzc2FnZSA9IHRoaXMucHJvY2Vzc1NlbmREYXRhKG1lc3NhZ2UpXG5cdFx0dmFyIG1lc3NhZ2VCeXRlc1NpemUgPSB0aGlzLnNpemVJbkJ5dGVzKHByb2Nlc3NlZE1lc3NhZ2UpXG5cdFx0cmV0dXJuIHtcblx0XHRcdHByb2Nlc3NlZE1lc3NhZ2U6IHByb2Nlc3NlZE1lc3NhZ2UsXG5cdFx0XHRtZXNzYWdlQnl0ZXNTaXplOiBtZXNzYWdlQnl0ZXNTaXplLFxuXHRcdH1cblx0fSxcblxuXHRwdXNoOiBmdW5jdGlvbiAocHJvY2Vzc2VkTWVzc2FnZSwgbWVzc2FnZUJ5dGVzU2l6ZSwga2V5KSB7XG5cdFx0aWYgKHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ID4gMCkge1xuXHRcdFx0Ly8gXFxuIHNlcGFyYXRvciBhdCBzZXJpYWxpemF0aW9uXG5cdFx0XHR0aGlzLmJ1ZmZlckJ5dGVzU2l6ZSArPSAxXG5cdFx0fVxuXHRcdGlmIChrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhpcy51cHNlcnRCdWZmZXJba2V5XSA9IHByb2Nlc3NlZE1lc3NhZ2Vcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5wdXNoT25seUJ1ZmZlci5wdXNoKHByb2Nlc3NlZE1lc3NhZ2UpXG5cdFx0fVxuXHRcdHRoaXMuYnVmZmVyQnl0ZXNTaXplICs9IG1lc3NhZ2VCeXRlc1NpemVcblx0XHR0aGlzLmJ1ZmZlck1lc3NhZ2VDb3VudCArPSAxXG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0dmFyIHJlbW92ZWRNZXNzYWdlID0gdGhpcy51cHNlcnRCdWZmZXJba2V5XVxuXHRcdGRlbGV0ZSB0aGlzLnVwc2VydEJ1ZmZlcltrZXldXG5cdFx0dmFyIG1lc3NhZ2VCeXRlc1NpemUgPSB0aGlzLnNpemVJbkJ5dGVzKHJlbW92ZWRNZXNzYWdlKVxuXHRcdHRoaXMuYnVmZmVyQnl0ZXNTaXplIC09IG1lc3NhZ2VCeXRlc1NpemVcblx0XHR0aGlzLmJ1ZmZlck1lc3NhZ2VDb3VudCAtPSAxXG5cdFx0aWYgKHRoaXMuYnVmZmVyTWVzc2FnZUNvdW50ID4gMCkge1xuXHRcdFx0dGhpcy5idWZmZXJCeXRlc1NpemUgLT0gMVxuXHRcdH1cblx0fSxcblxuXHRoYXNNZXNzYWdlRm9yOiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmV0dXJuIGtleSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudXBzZXJ0QnVmZmVyW2tleV0gIT09IHVuZGVmaW5lZFxuXHR9LFxuXG5cdHdpbGxSZWFjaGVkQnl0ZXNMaW1pdFdpdGg6IGZ1bmN0aW9uIChtZXNzYWdlQnl0ZXNTaXplKSB7XG5cdFx0Ly8gYnl0ZSBvZiB0aGUgc2VwYXJhdG9yIGF0IHRoZSBlbmQgb2YgdGhlIG1lc3NhZ2Vcblx0XHRyZXR1cm4gdGhpcy5idWZmZXJCeXRlc1NpemUgKyBtZXNzYWdlQnl0ZXNTaXplICsgMSA+PSB0aGlzLmJ5dGVzTGltaXRcblx0fSxcblxuXHRpc0Z1bGw6IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gKFxuXHRcdFx0dGhpcy5idWZmZXJNZXNzYWdlQ291bnQgPT09IHRoaXMubWF4U2l6ZSB8fFxuXHRcdFx0dGhpcy5idWZmZXJCeXRlc1NpemUgPj0gdGhpcy5ieXRlc0xpbWl0XG5cdFx0KVxuXHR9LFxuXG5cdGZsdXNoUGVyaW9kaWNhbGx5OiBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIF90aGlzID0gdGhpc1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0X3RoaXMuZmx1c2goKVxuXHRcdFx0X3RoaXMuZmx1c2hQZXJpb2RpY2FsbHkoKVxuXHRcdH0sIF90aGlzLmZsdXNoVGltZW91dClcblx0fSxcblxuXHRmbHVzaE9uVmlzaWJpbGl0eUhpZGRlbjogZnVuY3Rpb24gKCkge1xuXHRcdHZhciBfdGhpcyA9IHRoaXNcblx0XHQvKipcblx0XHQgKiBXaXRoIHNlbmRCZWFjb24sIHJlcXVlc3RzIGFyZSBndWFyYW50ZWVkIHRvIGJlIHN1Y2Nlc3NmdWxseSBzZW50IGR1cmluZyBkb2N1bWVudCB1bmxvYWRcblx0XHQgKi9cblx0XHQvLyBAdHMtaWdub3JlIHRoaXMgZnVuY3Rpb24gaXMgbm90IGFsd2F5cyBkZWZpbmVkXG5cdFx0dGhpcy5saWZlQ3ljbGUuc3Vic2NyaWJlKExpZmVDeWNsZUV2ZW50VHlwZS5BUFBfSElERSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0X3RoaXMuZmx1c2goKVxuXHRcdH0pXG5cdH0sXG59XG5cbmV4cG9ydCB2YXIgQmF0Y2ggPSBiYXRjaFxuIiwiaW1wb3J0IHsgc2RrIH0gZnJvbSAnLi9zZGsnXG5pbXBvcnQgeyBub3cgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBSZXF1ZXN0VHlwZSB9IGZyb20gJy4uL2hlbHBlci9lbnVtcydcbnZhciB4aHJQcm94eVNpbmdsZXRvblxudmFyIGJlZm9yZVNlbmRDYWxsYmFja3MgPSBbXVxudmFyIG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzID0gW11cbnZhciBvcmlnaW5hbFhoclJlcXVlc3RcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFhoclByb3h5KCkge1xuXHRpZiAoIXhoclByb3h5U2luZ2xldG9uKSB7XG5cdFx0cHJveHlYaHIoKVxuXHRcdHhoclByb3h5U2luZ2xldG9uID0ge1xuXHRcdFx0YmVmb3JlU2VuZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRcdGJlZm9yZVNlbmRDYWxsYmFja3MucHVzaChjYWxsYmFjaylcblx0XHRcdH0sXG5cdFx0XHRvblJlcXVlc3RDb21wbGV0ZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRcdG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzLnB1c2goY2FsbGJhY2spXG5cdFx0XHR9LFxuXHRcdH1cblx0fVxuXHRyZXR1cm4geGhyUHJveHlTaW5nbGV0b25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0WGhyUHJveHkoKSB7XG5cdGlmICh4aHJQcm94eVNpbmdsZXRvbikge1xuXHRcdHhoclByb3h5U2luZ2xldG9uID0gdW5kZWZpbmVkXG5cdFx0YmVmb3JlU2VuZENhbGxiYWNrcy5zcGxpY2UoMCwgYmVmb3JlU2VuZENhbGxiYWNrcy5sZW5ndGgpXG5cdFx0b25SZXF1ZXN0Q29tcGxldGVDYWxsYmFja3Muc3BsaWNlKDAsIG9uUmVxdWVzdENvbXBsZXRlQ2FsbGJhY2tzLmxlbmd0aClcblx0XHRzZGsucmVxdWVzdCA9IG9yaWdpbmFsWGhyUmVxdWVzdFxuXHR9XG59XG5cbmZ1bmN0aW9uIHByb3h5WGhyKCkge1xuXHRvcmlnaW5hbFhoclJlcXVlc3QgPSBzZGsucmVxdWVzdFxuXHRzZGsucmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgX3RoaXMgPSB0aGlzXG5cdFx0dmFyIGRhdGFmbHV4X3hociA9IHtcblx0XHRcdG1ldGhvZDogYXJndW1lbnRzWzBdLm1ldGhvZCB8fCAnR0VUJyxcblx0XHRcdHN0YXJ0VGltZTogMCxcblx0XHRcdHVybDogYXJndW1lbnRzWzBdLnVybCxcblx0XHRcdHR5cGU6IFJlcXVlc3RUeXBlLlhIUixcblx0XHRcdHJlc3BvbnNlVHlwZTogYXJndW1lbnRzWzBdLnJlc3BvbnNlVHlwZSB8fCAndGV4dCcsXG5cdFx0fVxuXHRcdGRhdGFmbHV4X3hoci5zdGFydFRpbWUgPSBub3coKVxuXG5cdFx0dmFyIG9yaWdpbmFsU3VjY2VzcyA9IGFyZ3VtZW50c1swXS5zdWNjZXNzXG5cblx0XHRhcmd1bWVudHNbMF0uc3VjY2VzcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlcG9ydFhocihhcmd1bWVudHNbMF0pXG5cblx0XHRcdGlmIChvcmlnaW5hbFN1Y2Nlc3MpIHtcblx0XHRcdFx0b3JpZ2luYWxTdWNjZXNzLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBvcmlnaW5hbEZhaWwgPSBhcmd1bWVudHNbMF0uZmFpbFxuXHRcdGFyZ3VtZW50c1swXS5mYWlsID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0cmVwb3J0WGhyKGFyZ3VtZW50c1swXSlcblx0XHRcdGlmIChvcmlnaW5hbEZhaWwpIHtcblx0XHRcdFx0b3JpZ2luYWxGYWlsLmFwcGx5KF90aGlzLCBhcmd1bWVudHMpXG5cdFx0XHR9XG5cdFx0fVxuXHRcdHZhciBoYXNCZWVuUmVwb3J0ZWQgPSBmYWxzZVxuXHRcdHZhciByZXBvcnRYaHIgPSBmdW5jdGlvbiAocmVzKSB7XG5cdFx0XHRpZiAoaGFzQmVlblJlcG9ydGVkKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0aGFzQmVlblJlcG9ydGVkID0gdHJ1ZVxuXHRcdFx0ZGF0YWZsdXhfeGhyLmR1cmF0aW9uID0gbm93KCkgLSBkYXRhZmx1eF94aHIuc3RhcnRUaW1lXG5cdFx0XHRkYXRhZmx1eF94aHIucmVzcG9uc2UgPSBKU09OLnN0cmluZ2lmeShyZXMuZGF0YSlcblx0XHRcdGRhdGFmbHV4X3hoci5oZWFkZXIgPSByZXMuaGVhZGVyIHx8IHt9XG5cdFx0XHRkYXRhZmx1eF94aHIucHJvZmlsZSA9IHJlcy5wcm9maWxlXG5cdFx0XHRkYXRhZmx1eF94aHIuc3RhdHVzID0gcmVzLnN0YXR1c0NvZGUgfHwgcmVzLnN0YXR1cyB8fCAwXG5cdFx0XHRvblJlcXVlc3RDb21wbGV0ZUNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0XHRjYWxsYmFjayhkYXRhZmx1eF94aHIpXG5cdFx0XHR9KVxuXHRcdH1cblx0XHRiZWZvcmVTZW5kQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRjYWxsYmFjayhkYXRhZmx1eF94aHIpXG5cdFx0fSlcblx0XHRyZXR1cm4gb3JpZ2luYWxYaHJSZXF1ZXN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0fVxufVxuIiwiZXhwb3J0IGNvbnN0IE9ORV9TRUNPTkQgPSAxMDAwXG5leHBvcnQgY29uc3QgT05FX01JTlVURSA9IDYwICogT05FX1NFQ09ORFxuZXhwb3J0IGNvbnN0IE9ORV9IT1VSID0gNjAgKiBPTkVfTUlOVVRFXG5leHBvcnQgY29uc3QgT05FX0tJTE9fQllURSA9IDEwMjRcbmV4cG9ydCBjb25zdCBDTElFTlRfSURfVE9LRU4gPSAnZGF0YWZsdXhSdW06Y2xpZW50OmlkJ1xuZXhwb3J0IGNvbnN0IFJ1bUV2ZW50VHlwZSA9IHtcblx0QUNUSU9OOiAnYWN0aW9uJyxcblx0RVJST1I6ICdlcnJvcicsXG5cdExPTkdfVEFTSzogJ2xvbmdfdGFzaycsXG5cdFZJRVc6ICd2aWV3Jyxcblx0UkVTT1VSQ0U6ICdyZXNvdXJjZScsXG5cdEFQUDogJ2FwcCcsXG5cdEFDVElPTjogJ2FjdGlvbicsXG59XG5cbmV4cG9ydCB2YXIgUmVxdWVzdFR5cGUgPSB7XG5cdFhIUjogJ25ldHdvcmsnLFxuXHRET1dOTE9BRDogJ3Jlc291cmNlJyxcbn1cblxuZXhwb3J0IHZhciBBY3Rpb25UeXBlID0ge1xuXHR0YXA6ICd0YXAnLFxuXHRsb25ncHJlc3M6ICdsb25ncHJlc3MnLFxuXHRsb25ndGFwOiAnbG9uZ3RhcCcsXG59XG5leHBvcnQgdmFyIE1wSG9vayA9IHtcblx0ZGF0YTogMSxcblx0b25Mb2FkOiAxLFxuXHRvblNob3c6IDEsXG5cdG9uUmVhZHk6IDEsXG5cdG9uUHVsbERvd25SZWZyZXNoOiAxLFxuXHRvblJlYWNoQm90dG9tOiAxLFxuXHRvblNoYXJlQXBwTWVzc2FnZTogMSxcblx0b25QYWdlU2Nyb2xsOiAxLFxuXHRvblJlc2l6ZTogMSxcblx0b25UYWJJdGVtVGFwOiAxLFxuXHRvbkhpZGU6IDEsXG5cdG9uVW5sb2FkOiAxLFxufVxuIiwiaW1wb3J0IHsgc2RrIH0gZnJvbSAnLi4vY29yZS9zZGsnXG5cbmNvbnN0IFVOS05PV05fRlVOQ1RJT04gPSAnPydcbmZ1bmN0aW9uIGhhcyhvYmplY3QsIGtleSkge1xuXHRyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KVxufVxuZnVuY3Rpb24gaXNVbmRlZmluZWQod2hhdCkge1xuXHRyZXR1cm4gdHlwZW9mIHdoYXQgPT09ICd1bmRlZmluZWQnXG59XG5leHBvcnQgZnVuY3Rpb24gd3JhcChmdW5jKSB7XG5cdHZhciBfdGhpcyA9IHRoaXNcblx0ZnVuY3Rpb24gd3JhcHBlZCgpIHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIGZ1bmMuYXBwbHkoX3RoaXMsIGFyZ3VtZW50cylcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXBvcnQoZSlcblx0XHRcdHRocm93IGVcblx0XHR9XG5cdH1cblx0cmV0dXJuIHdyYXBwZWRcbn1cbi8qKlxuICogQ3Jvc3MtYnJvd3NlciBwcm9jZXNzaW5nIG9mIHVuaGFuZGxlZCBleGNlcHRpb25zXG4gKlxuICogU3ludGF4OlxuICogYGBganNcbiAqICAgcmVwb3J0LnN1YnNjcmliZShmdW5jdGlvbihzdGFja0luZm8pIHsgLi4uIH0pXG4gKiAgIHJlcG9ydC51bnN1YnNjcmliZShmdW5jdGlvbihzdGFja0luZm8pIHsgLi4uIH0pXG4gKiAgIHJlcG9ydChleGNlcHRpb24pXG4gKiAgIHRyeSB7IC4uLmNvZGUuLi4gfSBjYXRjaChleCkgeyByZXBvcnQoZXgpOyB9XG4gKiBgYGBcbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBudW1iZXJzLCBwbHVzIGNvbHVtbiBudW1iZXJcbiAqICAgICBvbiB0b3AgZnJhbWU7IGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBPcGVyYTogZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzXG4gKiAgIC0gQ2hyb21lOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6IGxpbmUgYW5kIGNvbHVtbiBudW1iZXIgZm9yIHRoZSB0b3AgZnJhbWUgb25seTsgc29tZSBmcmFtZXNcbiAqICAgICBtYXkgYmUgbWlzc2luZywgYW5kIGNvbHVtbiBudW1iZXIgaXMgbm90IGd1YXJhbnRlZWRcbiAqICAgLSBJRTogbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcCBmcmFtZSBvbmx5OyBzb21lIGZyYW1lc1xuICogICAgIG1heSBiZSBtaXNzaW5nLCBhbmQgY29sdW1uIG51bWJlciBpcyBub3QgZ3VhcmFudGVlZFxuICpcbiAqIEluIHRoZW9yeSwgVHJhY2VLaXQgc2hvdWxkIHdvcmsgb24gYWxsIG9mIHRoZSBmb2xsb3dpbmcgdmVyc2lvbnM6XG4gKiAgIC0gSUU1LjUrIChvbmx5IDguMCB0ZXN0ZWQpXG4gKiAgIC0gRmlyZWZveCAwLjkrIChvbmx5IDMuNSsgdGVzdGVkKVxuICogICAtIE9wZXJhIDcrIChvbmx5IDEwLjUwIHRlc3RlZDsgdmVyc2lvbnMgOSBhbmQgZWFybGllciBtYXkgcmVxdWlyZVxuICogICAgIEV4Y2VwdGlvbnMgSGF2ZSBTdGFja3RyYWNlIHRvIGJlIGVuYWJsZWQgaW4gb3BlcmE6Y29uZmlnKVxuICogICAtIFNhZmFyaSAzKyAob25seSA0KyB0ZXN0ZWQpXG4gKiAgIC0gQ2hyb21lIDErIChvbmx5IDUrIHRlc3RlZClcbiAqICAgLSBLb25xdWVyb3IgMy41KyAodW50ZXN0ZWQpXG4gKlxuICogUmVxdWlyZXMgY29tcHV0ZVN0YWNrVHJhY2UuXG4gKlxuICogVHJpZXMgdG8gY2F0Y2ggYWxsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFuZCByZXBvcnQgdGhlbSB0byB0aGVcbiAqIHN1YnNjcmliZWQgaGFuZGxlcnMuIFBsZWFzZSBub3RlIHRoYXQgcmVwb3J0IHdpbGwgcmV0aHJvdyB0aGVcbiAqIGV4Y2VwdGlvbi4gVGhpcyBpcyBSRVFVSVJFRCBpbiBvcmRlciB0byBnZXQgYSB1c2VmdWwgc3RhY2sgdHJhY2UgaW4gSUUuXG4gKiBJZiB0aGUgZXhjZXB0aW9uIGRvZXMgbm90IHJlYWNoIHRoZSB0b3Agb2YgdGhlIGJyb3dzZXIsIHlvdSB3aWxsIG9ubHlcbiAqIGdldCBhIHN0YWNrIHRyYWNlIGZyb20gdGhlIHBvaW50IHdoZXJlIHJlcG9ydCB3YXMgY2FsbGVkLlxuICpcbiAqIEhhbmRsZXJzIHJlY2VpdmUgYSBTdGFja1RyYWNlIG9iamVjdCBhcyBkZXNjcmliZWQgaW4gdGhlXG4gKiBjb21wdXRlU3RhY2tUcmFjZSBkb2NzLlxuICpcbiAqIEBtZW1iZXJvZiBUcmFjZUtpdFxuICogQG5hbWVzcGFjZVxuICovXG5leHBvcnQgdmFyIHJlcG9ydCA9IChmdW5jdGlvbiByZXBvcnRNb2R1bGVXcmFwcGVyKCkge1xuXHR2YXIgaGFuZGxlcnMgPSBbXVxuXG5cdC8qKlxuXHQgKiBBZGQgYSBjcmFzaCBoYW5kbGVyLlxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBoYW5kbGVyXG5cdCAqIEBtZW1iZXJvZiByZXBvcnRcblx0ICovXG5cdGZ1bmN0aW9uIHN1YnNjcmliZShoYW5kbGVyKSB7XG5cdFx0aW5zdGFsbEdsb2JhbEhhbmRsZXIoKVxuXHRcdGluc3RhbGxHbG9iYWxVbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKClcblx0XHRpbnN0YWxsR2xvYmFsT25QYWdlTm90Rm91bmRIYW5kbGVyKClcblx0XHRpbnN0YWxsR2xvYmFsT25NZW1vcnlXYXJuaW5nSGFuZGxlcigpXG5cdFx0aGFuZGxlcnMucHVzaChoYW5kbGVyKVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhIGNyYXNoIGhhbmRsZXIuXG5cdCAqIEBwYXJhbSB7RnVuY3Rpb259IGhhbmRsZXJcblx0ICogQG1lbWJlcm9mIHJlcG9ydFxuXHQgKi9cblx0ZnVuY3Rpb24gdW5zdWJzY3JpYmUoaGFuZGxlcikge1xuXHRcdGZvciAodmFyIGkgPSBoYW5kbGVycy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuXHRcdFx0aWYgKGhhbmRsZXJzW2ldID09PSBoYW5kbGVyKSB7XG5cdFx0XHRcdGhhbmRsZXJzLnNwbGljZShpLCAxKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBEaXNwYXRjaCBzdGFjayBpbmZvcm1hdGlvbiB0byBhbGwgaGFuZGxlcnMuXG5cdCAqIEBwYXJhbSB7U3RhY2tUcmFjZX0gc3RhY2tcblx0ICogQHBhcmFtIHtib29sZWFufSBpc1dpbmRvd0Vycm9yIElzIHRoaXMgYSB0b3AtbGV2ZWwgd2luZG93IGVycm9yP1xuXHQgKiBAcGFyYW0ge0Vycm9yPX0gZXJyb3IgVGhlIGVycm9yIHRoYXQncyBiZWluZyBoYW5kbGVkIChpZiBhdmFpbGFibGUsIG51bGwgb3RoZXJ3aXNlKVxuXHQgKiBAbWVtYmVyb2YgcmVwb3J0XG5cdCAqIEB0aHJvd3MgQW4gZXhjZXB0aW9uIGlmIGFuIGVycm9yIG9jY3VycyB3aGlsZSBjYWxsaW5nIGFuIGhhbmRsZXIuXG5cdCAqL1xuXHRmdW5jdGlvbiBub3RpZnlIYW5kbGVycyhzdGFjaywgaXNXaW5kb3dFcnJvciwgZXJyb3IpIHtcblx0XHR2YXIgZXhjZXB0aW9uXG5cdFx0Zm9yICh2YXIgaSBpbiBoYW5kbGVycykge1xuXHRcdFx0aWYgKGhhcyhoYW5kbGVycywgaSkpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRoYW5kbGVyc1tpXShzdGFjaywgaXNXaW5kb3dFcnJvciwgZXJyb3IpXG5cdFx0XHRcdH0gY2F0Y2ggKGlubmVyKSB7XG5cdFx0XHRcdFx0ZXhjZXB0aW9uID0gaW5uZXJcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChleGNlcHRpb24pIHtcblx0XHRcdHRocm93IGV4Y2VwdGlvblxuXHRcdH1cblx0fVxuXG5cdHZhciBvbkVycm9ySGFuZGxlckluc3RhbGxlZFxuXHR2YXIgb25VbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVySW5zdGFsbGVkXG5cdHZhciBvblBhZ2VOb3RGb3VuZEhhbmRsZXJJbnN0YWxsZWRcblx0dmFyIG9uT25NZW1vcnlXYXJuaW5nSGFuZGxlckluc3RhbGxlZFxuXHQvKipcblx0ICogRW5zdXJlcyBhbGwgZ2xvYmFsIHVuaGFuZGxlZCBleGNlcHRpb25zIGFyZSByZWNvcmRlZC5cblx0ICogU3VwcG9ydGVkIGJ5IEdlY2tvIGFuZCBJRS5cblx0ICogQHBhcmFtIHtFdmVudHxzdHJpbmd9IG1lc3NhZ2UgRXJyb3IgbWVzc2FnZS5cblx0ICogQHBhcmFtIHtzdHJpbmc9fSB1cmwgVVJMIG9mIHNjcmlwdCB0aGF0IGdlbmVyYXRlZCB0aGUgZXhjZXB0aW9uLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGxpbmVObyBUaGUgbGluZSBudW1iZXIgYXQgd2hpY2ggdGhlIGVycm9yIG9jY3VycmVkLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGNvbHVtbk5vIFRoZSBjb2x1bW4gbnVtYmVyIGF0IHdoaWNoIHRoZSBlcnJvciBvY2N1cnJlZC5cblx0ICogQHBhcmFtIHtFcnJvcj19IGVycm9yT2JqIFRoZSBhY3R1YWwgRXJyb3Igb2JqZWN0LlxuXHQgKiBAbWVtYmVyb2YgcmVwb3J0XG5cdCAqL1xuXHRmdW5jdGlvbiB0cmFjZUtpdFdpbmRvd09uRXJyb3IoZXJyKSB7XG5cdFx0Y29uc3QgZXJyb3IgPSB0eXBlb2YgZXJyID09PSAnc3RyaW5nJyA/IG5ldyBFcnJvcihlcnIpIDogZXJyXG5cdFx0dmFyIHN0YWNrXG5cdFx0dmFyIG5hbWUgPSAnJ1xuXHRcdHZhciBtc2cgPSAnJ1xuXHRcdHN0YWNrID0gY29tcHV0ZVN0YWNrVHJhY2UoZXJyb3IpXG5cdFx0aWYgKFxuXHRcdFx0ZXJyb3IgJiZcblx0XHRcdGVycm9yLm1lc3NhZ2UgJiZcblx0XHRcdHt9LnRvU3RyaW5nLmNhbGwoZXJyb3IubWVzc2FnZSkgPT09ICdbb2JqZWN0IFN0cmluZ10nXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBtZXNzYWdlcyA9IGVycm9yLm1lc3NhZ2Uuc3BsaXQoJ1xcbicpXG5cdFx0XHRpZiAobWVzc2FnZXMubGVuZ3RoID49IDMpIHtcblx0XHRcdFx0bXNnID0gbWVzc2FnZXNbMl1cblx0XHRcdFx0Y29uc3QgZ3JvdXBzID0gbXNnLm1hdGNoKEVSUk9SX1RZUEVTX1JFKVxuXHRcdFx0XHRpZiAoZ3JvdXBzKSB7XG5cdFx0XHRcdFx0bmFtZSA9IGdyb3Vwc1sxXVxuXHRcdFx0XHRcdG1zZyA9IGdyb3Vwc1syXVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmIChtc2cpIHtcblx0XHRcdHN0YWNrLm1lc3NhZ2UgPSBtc2dcblx0XHR9XG5cdFx0aWYgKG5hbWUpIHtcblx0XHRcdHN0YWNrLm5hbWUgPSBuYW1lXG5cdFx0fVxuXHRcdG5vdGlmeUhhbmRsZXJzKHN0YWNrLCB0cnVlLCBlcnJvcilcblx0fVxuXG5cdC8qKlxuXHQgKiBFbnN1cmVzIGFsbCB1bmhhbmRsZWQgcmVqZWN0aW9ucyBhcmUgcmVjb3JkZWQuXG5cdCAqIEBwYXJhbSB7UHJvbWlzZVJlamVjdGlvbkV2ZW50fSBlIGV2ZW50LlxuXHQgKiBAbWVtYmVyb2YgcmVwb3J0XG5cdCAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dpbmRvd0V2ZW50SGFuZGxlcnMvb251bmhhbmRsZWRyZWplY3Rpb25cblx0ICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvUHJvbWlzZVJlamVjdGlvbkV2ZW50XG5cdCAqL1xuXHRmdW5jdGlvbiB0cmFjZUtpdFdpbmRvd09uVW5oYW5kbGVkUmVqZWN0aW9uKHsgcmVhc29uLCBwcm9taXNlIH0pIHtcblx0XHRjb25zdCBlcnJvciA9IHR5cGVvZiByZWFzb24gPT09ICdzdHJpbmcnID8gbmV3IEVycm9yKHJlYXNvbikgOiByZWFzb25cblx0XHR2YXIgc3RhY2tcblx0XHR2YXIgbmFtZSA9ICcnXG5cdFx0dmFyIG1zZyA9ICcnXG5cdFx0c3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZShlcnJvcilcblx0XHRpZiAoXG5cdFx0XHRlcnJvciAmJlxuXHRcdFx0ZXJyb3IubWVzc2FnZSAmJlxuXHRcdFx0e30udG9TdHJpbmcuY2FsbChlcnJvci5tZXNzYWdlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSdcblx0XHQpIHtcblx0XHRcdGNvbnN0IG1lc3NhZ2VzID0gZXJyb3IubWVzc2FnZS5zcGxpdCgnXFxuJylcblx0XHRcdGlmIChtZXNzYWdlcy5sZW5ndGggPj0gMykge1xuXHRcdFx0XHRtc2cgPSBtZXNzYWdlc1syXVxuXHRcdFx0XHRjb25zdCBncm91cHMgPSBtc2cubWF0Y2goRVJST1JfVFlQRVNfUkUpXG5cdFx0XHRcdGlmIChncm91cHMpIHtcblx0XHRcdFx0XHRuYW1lID0gZ3JvdXBzWzFdXG5cdFx0XHRcdFx0bXNnID0gZ3JvdXBzWzJdXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKG1zZykge1xuXHRcdFx0c3RhY2subWVzc2FnZSA9IG1zZ1xuXHRcdH1cblx0XHRpZiAobmFtZSkge1xuXHRcdFx0c3RhY2submFtZSA9IG5hbWVcblx0XHR9XG5cdFx0bm90aWZ5SGFuZGxlcnMoc3RhY2ssIHRydWUsIGVycm9yKVxuXHR9XG5cblx0LyoqXG5cdCAqIEluc3RhbGwgYSBnbG9iYWwgb25lcnJvciBoYW5kbGVyXG5cdCAqIEBtZW1iZXJvZiByZXBvcnRcblx0ICovXG5cdGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxIYW5kbGVyKCkge1xuXHRcdGlmIChvbkVycm9ySGFuZGxlckluc3RhbGxlZCB8fCAhc2RrLm9uRXJyb3IpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRzZGsub25FcnJvcih0cmFjZUtpdFdpbmRvd09uRXJyb3IpXG5cdFx0b25FcnJvckhhbmRsZXJJbnN0YWxsZWQgPSB0cnVlXG5cdH1cblxuXHQvKipcblx0ICogSW5zdGFsbCBhIGdsb2JhbCBvbnVuaGFuZGxlZHJlamVjdGlvbiBoYW5kbGVyXG5cdCAqIEBtZW1iZXJvZiByZXBvcnRcblx0ICovXG5cdGZ1bmN0aW9uIGluc3RhbGxHbG9iYWxVbmhhbmRsZWRSZWplY3Rpb25IYW5kbGVyKCkge1xuXHRcdGlmIChvblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXJJbnN0YWxsZWQgfHwgIXNkay5vblVuaGFuZGxlZFJlamVjdGlvbikge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0c2RrLm9uVW5oYW5kbGVkUmVqZWN0aW9uICYmXG5cdFx0XHRzZGsub25VbmhhbmRsZWRSZWplY3Rpb24odHJhY2VLaXRXaW5kb3dPblVuaGFuZGxlZFJlamVjdGlvbilcblx0XHRvblVuaGFuZGxlZFJlamVjdGlvbkhhbmRsZXJJbnN0YWxsZWQgPSB0cnVlXG5cdH1cblx0ZnVuY3Rpb24gaW5zdGFsbEdsb2JhbE9uUGFnZU5vdEZvdW5kSGFuZGxlcigpIHtcblx0XHRpZiAob25QYWdlTm90Rm91bmRIYW5kbGVySW5zdGFsbGVkIHx8ICFzZGsub25QYWdlTm90Rm91bmQpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRzZGsub25QYWdlTm90Rm91bmQoKHJlcykgPT4ge1xuXHRcdFx0Y29uc3QgdXJsID0gcmVzLnBhdGguc3BsaXQoJz8nKVswXVxuXHRcdFx0bm90aWZ5SGFuZGxlcnMoXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRtZXNzYWdlOiBKU09OLnN0cmluZ2lmeShyZXMpLFxuXHRcdFx0XHRcdHR5cGU6ICdwYWdlbm90Zm91bmQnLFxuXHRcdFx0XHRcdG5hbWU6IHVybCArICfpobXpnaLml6Dms5Xmib7liLAnLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHR7fSxcblx0XHRcdClcblx0XHR9KVxuXHRcdG9uUGFnZU5vdEZvdW5kSGFuZGxlckluc3RhbGxlZCA9IHRydWVcblx0fVxuXHRmdW5jdGlvbiBpbnN0YWxsR2xvYmFsT25NZW1vcnlXYXJuaW5nSGFuZGxlcigpIHtcblx0XHRpZiAob25Pbk1lbW9yeVdhcm5pbmdIYW5kbGVySW5zdGFsbGVkIHx8ICFzZGsub25NZW1vcnlXYXJuaW5nKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0c2RrLm9uTWVtb3J5V2FybmluZygoeyBsZXZlbCA9IC0xIH0pID0+IHtcblx0XHRcdGxldCBsZXZlbE1lc3NhZ2UgPSAn5rKh5pyJ6I635Y+W5Yiw5ZGK6K2m57qn5Yir5L+h5oGvJ1xuXG5cdFx0XHRzd2l0Y2ggKGxldmVsKSB7XG5cdFx0XHRcdGNhc2UgNTpcblx0XHRcdFx0XHRsZXZlbE1lc3NhZ2UgPSAnVFJJTV9NRU1PUllfUlVOTklOR19NT0RFUkFURSdcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIDEwOlxuXHRcdFx0XHRcdGxldmVsTWVzc2FnZSA9ICdUUklNX01FTU9SWV9SVU5OSU5HX0xPVydcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIDE1OlxuXHRcdFx0XHRcdGxldmVsTWVzc2FnZSA9ICdUUklNX01FTU9SWV9SVU5OSU5HX0NSSVRJQ0FMJ1xuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRub3RpZnlIYW5kbGVycyhcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1lc3NhZ2U6IGxldmVsTWVzc2FnZSxcblx0XHRcdFx0XHR0eXBlOiAnbWVtb3J5d2FybmluZycsXG5cdFx0XHRcdFx0bmFtZTogJ+WGheWtmOS4jei2s+WRiuitpicsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdHt9LFxuXHRcdFx0KVxuXHRcdH0pXG5cdFx0b25Pbk1lbW9yeVdhcm5pbmdIYW5kbGVySW5zdGFsbGVkID0gdHJ1ZVxuXHR9XG5cdC8qKlxuXHQgKiBSZXBvcnRzIGFuIHVuaGFuZGxlZCBFcnJvci5cblx0ICogQHBhcmFtIHtFcnJvcn0gZXhcblx0ICogQG1lbWJlcm9mIHJlcG9ydFxuXHQgKiBAdGhyb3dzIEFuIGV4Y2VwdGlvbiBpZiBhbiBpbmNvbXB2YXJlIHN0YWNrIHRyYWNlIGlzIGRldGVjdGVkIChvbGQgSUUgYnJvd3NlcnMpLlxuXHQgKi9cblx0ZnVuY3Rpb24gZG9SZXBvcnQoZXgpIHt9XG5cblx0ZG9SZXBvcnQuc3Vic2NyaWJlID0gc3Vic2NyaWJlXG5cdGRvUmVwb3J0LnVuc3Vic2NyaWJlID0gdW5zdWJzY3JpYmVcblx0ZG9SZXBvcnQudHJhY2VLaXRXaW5kb3dPbkVycm9yID0gdHJhY2VLaXRXaW5kb3dPbkVycm9yXG5cblx0cmV0dXJuIGRvUmVwb3J0XG59KSgpXG5cbi8qKlxuICogY29tcHV0ZVN0YWNrVHJhY2U6IGNyb3NzLWJyb3dzZXIgc3RhY2sgdHJhY2VzIGluIEphdmFTY3JpcHRcbiAqXG4gKiBTeW50YXg6XG4gKiAgIGBgYGpzXG4gKiAgIHMgPSBjb21wdXRlU3RhY2tUcmFjZS5vZkNhbGxlcihbZGVwdGhdKVxuICogICBzID0gY29tcHV0ZVN0YWNrVHJhY2UoZXhjZXB0aW9uKSAvLyBjb25zaWRlciB1c2luZyByZXBvcnQgaW5zdGVhZCAoc2VlIGJlbG93KVxuICogICBgYGBcbiAqXG4gKiBTdXBwb3J0czpcbiAqICAgLSBGaXJlZm94OiAgZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgbnVtYmVycyBhbmQgdW5yZWxpYWJsZSBjb2x1bW5cbiAqICAgICAgICAgICAgICAgbnVtYmVyIG9uIHRvcCBmcmFtZVxuICogICAtIE9wZXJhIDEwOiBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBPcGVyYSA5LTogZnVsbCBzdGFjayB0cmFjZSB3aXRoIGxpbmUgbnVtYmVyc1xuICogICAtIENocm9tZTogICBmdWxsIHN0YWNrIHRyYWNlIHdpdGggbGluZSBhbmQgY29sdW1uIG51bWJlcnNcbiAqICAgLSBTYWZhcmk6ICAgbGluZSBhbmQgY29sdW1uIG51bWJlciBmb3IgdGhlIHRvcG1vc3Qgc3RhY2t0cmFjZSBlbGVtZW50XG4gKiAgICAgICAgICAgICAgIG9ubHlcbiAqICAgLSBJRTogICAgICAgbm8gbGluZSBudW1iZXJzIHdoYXRzb2V2ZXJcbiAqXG4gKiBUcmllcyB0byBndWVzcyBuYW1lcyBvZiBhbm9ueW1vdXMgZnVuY3Rpb25zIGJ5IGxvb2tpbmcgZm9yIGFzc2lnbm1lbnRzXG4gKiBpbiB0aGUgc291cmNlIGNvZGUuIEluIElFIGFuZCBTYWZhcmksIHdlIGhhdmUgdG8gZ3Vlc3Mgc291cmNlIGZpbGUgbmFtZXNcbiAqIGJ5IHNlYXJjaGluZyBmb3IgZnVuY3Rpb24gYm9kaWVzIGluc2lkZSBhbGwgcGFnZSBzY3JpcHRzLiBUaGlzIHdpbGwgbm90XG4gKiB3b3JrIGZvciBzY3JpcHRzIHRoYXQgYXJlIGxvYWRlZCBjcm9zcy1kb21haW4uXG4gKiBIZXJlIGJlIGRyYWdvbnM6IHNvbWUgZnVuY3Rpb24gbmFtZXMgbWF5IGJlIGd1ZXNzZWQgaW5jb3JyZWN0bHksIGFuZFxuICogZHVwbGljYXRlIGZ1bmN0aW9ucyBtYXkgYmUgbWlzbWF0Y2hlZC5cbiAqXG4gKiBjb21wdXRlU3RhY2tUcmFjZSBzaG91bGQgb25seSBiZSB1c2VkIGZvciB0cmFjaW5nIHB1cnBvc2VzLlxuICogTG9nZ2luZyBvZiB1bmhhbmRsZWQgZXhjZXB0aW9ucyBzaG91bGQgYmUgZG9uZSB3aXRoIHJlcG9ydCxcbiAqIHdoaWNoIGJ1aWxkcyBvbiB0b3Agb2YgY29tcHV0ZVN0YWNrVHJhY2UgYW5kIHByb3ZpZGVzIGJldHRlclxuICogSUUgc3VwcG9ydCBieSB1dGlsaXppbmcgdGhlIHNkay5vbkVycm9yIGV2ZW50IHRvIHJldHJpZXZlIGluZm9ybWF0aW9uXG4gKiBhYm91dCB0aGUgdG9wIG9mIHRoZSBzdGFjay5cbiAqXG4gKiBOb3RlOiBJbiBJRSBhbmQgU2FmYXJpLCBubyBzdGFjayB0cmFjZSBpcyByZWNvcmRlZCBvbiB0aGUgRXJyb3Igb2JqZWN0LFxuICogc28gY29tcHV0ZVN0YWNrVHJhY2UgaW5zdGVhZCB3YWxrcyBpdHMgKm93biogY2hhaW4gb2YgY2FsbGVycy5cbiAqIFRoaXMgbWVhbnMgdGhhdDpcbiAqICAqIGluIFNhZmFyaSwgc29tZSBtZXRob2RzIG1heSBiZSBtaXNzaW5nIGZyb20gdGhlIHN0YWNrIHRyYWNlO1xuICogICogaW4gSUUsIHRoZSB0b3Btb3N0IGZ1bmN0aW9uIGluIHRoZSBzdGFjayB0cmFjZSB3aWxsIGFsd2F5cyBiZSB0aGVcbiAqICAgIGNhbGxlciBvZiBjb21wdXRlU3RhY2tUcmFjZS5cbiAqXG4gKiBUaGlzIGlzIG9rYXkgZm9yIHRyYWNpbmcgKGJlY2F1c2UgeW91IGFyZSBsaWtlbHkgdG8gYmUgY2FsbGluZ1xuICogY29tcHV0ZVN0YWNrVHJhY2UgZnJvbSB0aGUgZnVuY3Rpb24geW91IHdhbnQgdG8gYmUgdGhlIHRvcG1vc3QgZWxlbWVudFxuICogb2YgdGhlIHN0YWNrIHRyYWNlIGFueXdheSksIGJ1dCBub3Qgb2theSBmb3IgbG9nZ2luZyB1bmhhbmRsZWRcbiAqIGV4Y2VwdGlvbnMgKGJlY2F1c2UgeW91ciBjYXRjaCBibG9jayB3aWxsIGxpa2VseSBiZSBmYXIgYXdheSBmcm9tIHRoZVxuICogaW5uZXIgZnVuY3Rpb24gdGhhdCBhY3R1YWxseSBjYXVzZWQgdGhlIGV4Y2VwdGlvbikuXG4gKlxuICogVHJhY2luZyBleGFtcGxlOlxuICogIGBgYGpzXG4gKiAgICAgZnVuY3Rpb24gdHJhY2UobWVzc2FnZSkge1xuICogICAgICAgICB2YXIgc3RhY2tJbmZvID0gY29tcHV0ZVN0YWNrVHJhY2Uub2ZDYWxsZXIoKTtcbiAqICAgICAgICAgdmFyIGRhdGEgPSBtZXNzYWdlICsgXCJcXG5cIjtcbiAqICAgICAgICAgZm9yKHZhciBpIGluIHN0YWNrSW5mby5zdGFjaykge1xuICogICAgICAgICAgICAgdmFyIGl0ZW0gPSBzdGFja0luZm8uc3RhY2tbaV07XG4gKiAgICAgICAgICAgICBkYXRhICs9IChpdGVtLmZ1bmMgfHwgJ1thbm9ueW1vdXNdJykgKyBcIigpIGluIFwiICsgaXRlbS51cmwgKyBcIjpcIiArIChpdGVtLmxpbmUgfHwgJzAnKSArIFwiXFxuXCI7XG4gKiAgICAgICAgIH1cbiAqICAgICAgICAgaWYgKHdpbmRvdy5jb25zb2xlKVxuICogICAgICAgICAgICAgY29uc29sZS5pbmZvKGRhdGEpO1xuICogICAgICAgICBlbHNlXG4gKiAgICAgICAgICAgICBhbGVydChkYXRhKTtcbiAqICAgICB9XG4gKiBgYGBcbiAqIEBtZW1iZXJvZiBUcmFjZUtpdFxuICogQG5hbWVzcGFjZVxuICovXG5leHBvcnQgdmFyIGNvbXB1dGVTdGFja1RyYWNlID0gKGZ1bmN0aW9uIGNvbXB1dGVTdGFja1RyYWNlV3JhcHBlcigpIHtcblx0dmFyIGRlYnVnID0gZmFsc2VcblxuXHQvLyBDb250ZW50cyBvZiBFeGNlcHRpb24gaW4gdmFyaW91cyBicm93c2Vycy5cblx0Ly9cblx0Ly8gU0FGQVJJOlxuXHQvLyBleC5tZXNzYWdlID0gQ2FuJ3QgZmluZCB2YXJpYWJsZTogcXFcblx0Ly8gZXgubGluZSA9IDU5XG5cdC8vIGV4LnNvdXJjZUlkID0gNTgwMjM4MTkyXG5cdC8vIGV4LnNvdXJjZVVSTCA9IGh0dHA6Ly8uLi5cblx0Ly8gZXguZXhwcmVzc2lvbkJlZ2luT2Zmc2V0ID0gOTZcblx0Ly8gZXguZXhwcmVzc2lvbkNhcmV0T2Zmc2V0ID0gOThcblx0Ly8gZXguZXhwcmVzc2lvbkVuZE9mZnNldCA9IDk4XG5cdC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuXHQvL1xuXHQvLyBGSVJFRk9YOlxuXHQvLyBleC5tZXNzYWdlID0gcXEgaXMgbm90IGRlZmluZWRcblx0Ly8gZXguZmlsZU5hbWUgPSBodHRwOi8vLi4uXG5cdC8vIGV4LmxpbmVOdW1iZXIgPSA1OVxuXHQvLyBleC5jb2x1bW5OdW1iZXIgPSA2OVxuXHQvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uIChzZWUgdGhlIGV4YW1wbGUgYmVsb3cpXG5cdC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuXHQvL1xuXHQvLyBDSFJPTUU6XG5cdC8vIGV4Lm1lc3NhZ2UgPSBxcSBpcyBub3QgZGVmaW5lZFxuXHQvLyBleC5uYW1lID0gUmVmZXJlbmNlRXJyb3Jcblx0Ly8gZXgudHlwZSA9IG5vdF9kZWZpbmVkXG5cdC8vIGV4LmFyZ3VtZW50cyA9IFsnYWEnXVxuXHQvLyBleC5zdGFjayA9IC4uLnN0YWNrIHRyYWNlLi4uXG5cdC8vXG5cdC8vIElOVEVSTkVUIEVYUExPUkVSOlxuXHQvLyBleC5tZXNzYWdlID0gLi4uXG5cdC8vIGV4Lm5hbWUgPSBSZWZlcmVuY2VFcnJvclxuXHQvL1xuXHQvLyBPUEVSQTpcblx0Ly8gZXgubWVzc2FnZSA9IC4uLm1lc3NhZ2UuLi4gKHNlZSB0aGUgZXhhbXBsZSBiZWxvdylcblx0Ly8gZXgubmFtZSA9IFJlZmVyZW5jZUVycm9yXG5cdC8vIGV4Lm9wZXJhI3NvdXJjZWxvYyA9IDExICAocHJldHR5IG11Y2ggdXNlbGVzcywgZHVwbGljYXRlcyB0aGUgaW5mbyBpbiBleC5tZXNzYWdlKVxuXHQvLyBleC5zdGFja3RyYWNlID0gbi9hOyBzZWUgJ29wZXJhOmNvbmZpZyNVc2VyUHJlZnN8RXhjZXB0aW9ucyBIYXZlIFN0YWNrdHJhY2UnXG5cblx0LyoqXG5cdCAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrIHByb3BlcnR5LlxuXHQgKiBDaHJvbWUgYW5kIEdlY2tvIHVzZSB0aGlzIHByb3BlcnR5LlxuXHQgKiBAcGFyYW0ge0Vycm9yfSBleFxuXHQgKiBAcmV0dXJuIHs/U3RhY2tUcmFjZX0gU3RhY2sgdHJhY2UgaW5mb3JtYXRpb24uXG5cdCAqIEBtZW1iZXJvZiBjb21wdXRlU3RhY2tUcmFjZVxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tU3RhY2tQcm9wKGV4KSB7XG5cdFx0aWYgKCFleC5zdGFjaykge1xuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuXHRcdHZhciBjaHJvbWUgPSAvXlxccyphdCAoLio/KSA/XFwoKCg/OmZpbGV8aHR0cHM/fGJsb2J8Y2hyb21lLWV4dGVuc2lvbnxuYXRpdmV8ZXZhbHx3ZWJwYWNrfDxhbm9ueW1vdXM+fFxcLykuKj8pKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFwpP1xccyokL2lcblx0XHQvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxpbmUtbGVuZ3RoXG5cdFx0dmFyIGdlY2tvID0gL15cXHMqKC4qPykoPzpcXCgoLio/KVxcKSk/KD86XnxAKSgoPzpmaWxlfGh0dHBzP3xibG9ifGNocm9tZXx3ZWJwYWNrfHJlc291cmNlfFxcW25hdGl2ZSkuKj98W15AXSpidW5kbGUpKD86OihcXGQrKSk/KD86OihcXGQrKSk/XFxzKiQvaVxuXHRcdC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZSBtYXgtbGluZS1sZW5ndGhcblx0XHR2YXIgd2luanMgPSAvXlxccyphdCAoPzooKD86XFxbb2JqZWN0IG9iamVjdFxcXSk/LispICk/XFwoPygoPzpmaWxlfG1zLWFwcHh8aHR0cHM/fHdlYnBhY2t8YmxvYik6Lio/KTooXFxkKykoPzo6KFxcZCspKT9cXCk/XFxzKiQvaVxuXG5cdFx0Ly8gVXNlZCB0byBhZGRpdGlvbmFsbHkgcGFyc2UgVVJML2xpbmUvY29sdW1uIGZyb20gZXZhbCBmcmFtZXNcblx0XHR2YXIgaXNFdmFsXG5cdFx0dmFyIGdlY2tvRXZhbCA9IC8oXFxTKykgbGluZSAoXFxkKykoPzogPiBldmFsIGxpbmUgXFxkKykqID4gZXZhbC9pXG5cdFx0dmFyIGNocm9tZUV2YWwgPSAvXFwoKFxcUyopKD86OihcXGQrKSkoPzo6KFxcZCspKVxcKS9cblx0XHR2YXIgbGluZXMgPSBleC5zdGFjay5zcGxpdCgnXFxuJylcblx0XHR2YXIgc3RhY2sgPSBbXVxuXHRcdHZhciBzdWJtYXRjaFxuXHRcdHZhciBwYXJ0c1xuXHRcdHZhciBlbGVtZW50XG5cblx0XHRmb3IgKHZhciBpID0gMCwgaiA9IGxpbmVzLmxlbmd0aDsgaSA8IGo7IGkgKz0gMSkge1xuXHRcdFx0aWYgKGNocm9tZS5leGVjKGxpbmVzW2ldKSkge1xuXHRcdFx0XHRwYXJ0cyA9IGNocm9tZS5leGVjKGxpbmVzW2ldKVxuXHRcdFx0XHR2YXIgaXNOYXRpdmUgPSBwYXJ0c1syXSAmJiBwYXJ0c1syXS5pbmRleE9mKCduYXRpdmUnKSA9PT0gMCAvLyBzdGFydCBvZiBsaW5lXG5cdFx0XHRcdGlzRXZhbCA9IHBhcnRzWzJdICYmIHBhcnRzWzJdLmluZGV4T2YoJ2V2YWwnKSA9PT0gMCAvLyBzdGFydCBvZiBsaW5lXG5cdFx0XHRcdHN1Ym1hdGNoID0gY2hyb21lRXZhbC5leGVjKHBhcnRzWzJdKVxuXHRcdFx0XHRpZiAoaXNFdmFsICYmIHN1Ym1hdGNoKSB7XG5cdFx0XHRcdFx0Ly8gdGhyb3cgb3V0IGV2YWwgbGluZS9jb2x1bW4gYW5kIHVzZSB0b3AtbW9zdCBsaW5lL2NvbHVtbiBudW1iZXJcblx0XHRcdFx0XHRwYXJ0c1syXSA9IHN1Ym1hdGNoWzFdIC8vIHVybFxuXHRcdFx0XHRcdHBhcnRzWzNdID0gc3VibWF0Y2hbMl0gLy8gbGluZVxuXHRcdFx0XHRcdHBhcnRzWzRdID0gc3VibWF0Y2hbM10gLy8gY29sdW1uXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbWVudCA9IHtcblx0XHRcdFx0XHRhcmdzOiBpc05hdGl2ZSA/IFtwYXJ0c1syXV0gOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdGZ1bmM6IHBhcnRzWzFdIHx8IFVOS05PV05fRlVOQ1RJT04sXG5cdFx0XHRcdFx0bGluZTogcGFydHNbM10gPyArcGFydHNbM10gOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0dXJsOiAhaXNOYXRpdmUgPyBwYXJ0c1syXSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmICh3aW5qcy5leGVjKGxpbmVzW2ldKSkge1xuXHRcdFx0XHRwYXJ0cyA9IHdpbmpzLmV4ZWMobGluZXNbaV0pXG5cdFx0XHRcdGVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0YXJnczogW10sXG5cdFx0XHRcdFx0Y29sdW1uOiBwYXJ0c1s0XSA/ICtwYXJ0c1s0XSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuXHRcdFx0XHRcdGxpbmU6ICtwYXJ0c1szXSxcblx0XHRcdFx0XHR1cmw6IHBhcnRzWzJdLFxuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKGdlY2tvLmV4ZWMobGluZXNbaV0pKSB7XG5cdFx0XHRcdHBhcnRzID0gZ2Vja28uZXhlYyhsaW5lc1tpXSlcblx0XHRcdFx0aXNFdmFsID0gcGFydHNbM10gJiYgcGFydHNbM10uaW5kZXhPZignID4gZXZhbCcpID4gLTFcblx0XHRcdFx0c3VibWF0Y2ggPSBnZWNrb0V2YWwuZXhlYyhwYXJ0c1szXSlcblx0XHRcdFx0aWYgKGlzRXZhbCAmJiBzdWJtYXRjaCkge1xuXHRcdFx0XHRcdC8vIHRocm93IG91dCBldmFsIGxpbmUvY29sdW1uIGFuZCB1c2UgdG9wLW1vc3QgbGluZSBudW1iZXJcblx0XHRcdFx0XHRwYXJ0c1szXSA9IHN1Ym1hdGNoWzFdXG5cdFx0XHRcdFx0cGFydHNbNF0gPSBzdWJtYXRjaFsyXVxuXHRcdFx0XHRcdHBhcnRzWzVdID0gdW5kZWZpbmVkIC8vIG5vIGNvbHVtbiB3aGVuIGV2YWxcblx0XHRcdFx0fSBlbHNlIGlmIChpID09PSAwICYmICFwYXJ0c1s1XSAmJiAhaXNVbmRlZmluZWQoZXguY29sdW1uTnVtYmVyKSkge1xuXHRcdFx0XHRcdC8vIEZpcmVGb3ggdXNlcyB0aGlzIGF3ZXNvbWUgY29sdW1uTnVtYmVyIHByb3BlcnR5IGZvciBpdHMgdG9wIGZyYW1lXG5cdFx0XHRcdFx0Ly8gQWxzbyBub3RlLCBGaXJlZm94J3MgY29sdW1uIG51bWJlciBpcyAwLWJhc2VkIGFuZCBldmVyeXRoaW5nIGVsc2UgZXhwZWN0cyAxLWJhc2VkLFxuXHRcdFx0XHRcdC8vIHNvIGFkZGluZyAxXG5cdFx0XHRcdFx0Ly8gTk9URTogdGhpcyBoYWNrIGRvZXNuJ3Qgd29yayBpZiB0b3AtbW9zdCBmcmFtZSBpcyBldmFsXG5cdFx0XHRcdFx0c3RhY2tbMF0uY29sdW1uID0gZXguY29sdW1uTnVtYmVyICsgMVxuXHRcdFx0XHR9XG5cdFx0XHRcdGVsZW1lbnQgPSB7XG5cdFx0XHRcdFx0YXJnczogcGFydHNbMl0gPyBwYXJ0c1syXS5zcGxpdCgnLCcpIDogW10sXG5cdFx0XHRcdFx0Y29sdW1uOiBwYXJ0c1s1XSA/ICtwYXJ0c1s1XSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1sxXSB8fCBVTktOT1dOX0ZVTkNUSU9OLFxuXHRcdFx0XHRcdGxpbmU6IHBhcnRzWzRdID8gK3BhcnRzWzRdIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRcdHVybDogcGFydHNbM10sXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cblx0XHRcdGlmICghZWxlbWVudC5mdW5jICYmIGVsZW1lbnQubGluZSkge1xuXHRcdFx0XHRlbGVtZW50LmZ1bmMgPSBVTktOT1dOX0ZVTkNUSU9OXG5cdFx0XHR9XG5cdFx0XHRzdGFjay5wdXNoKGVsZW1lbnQpXG5cdFx0fVxuXG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFjayxcblx0XHRcdG1lc3NhZ2U6IGV4dHJhY3RNZXNzYWdlKGV4KSxcblx0XHRcdG5hbWU6IGV4Lm5hbWUsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gdGhlIHN0YWNrdHJhY2UgcHJvcGVydHkuXG5cdCAqIE9wZXJhIDEwKyB1c2VzIHRoaXMgcHJvcGVydHkuXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGV4XG5cdCAqIEByZXR1cm4gez9TdGFja1RyYWNlfSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja3RyYWNlUHJvcChleCkge1xuXHRcdC8vIEFjY2VzcyBhbmQgc3RvcmUgdGhlIHN0YWNrdHJhY2UgcHJvcGVydHkgYmVmb3JlIGRvaW5nIEFOWVRISU5HXG5cdFx0Ly8gZWxzZSB0byBpdCBiZWNhdXNlIE9wZXJhIGlzIG5vdCB2ZXJ5IGdvb2QgYXQgcHJvdmlkaW5nIGl0XG5cdFx0Ly8gcmVsaWFibHkgaW4gb3RoZXIgY2lyY3Vtc3RhbmNlcy5cblx0XHR2YXIgc3RhY2t0cmFjZSA9IGV4LnN0YWNrdHJhY2Vcblx0XHRpZiAoIXN0YWNrdHJhY2UpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHZhciBvcGVyYTEwUmVnZXggPSAvIGxpbmUgKFxcZCspLipzY3JpcHQgKD86aW4gKT8oXFxTKykoPzo6IGluIGZ1bmN0aW9uIChcXFMrKSk/JC9pXG5cdFx0Ly8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG1heC1saW5lLWxlbmd0aFxuXHRcdHZhciBvcGVyYTExUmVnZXggPSAvIGxpbmUgKFxcZCspLCBjb2x1bW4gKFxcZCspXFxzKig/OmluICg/Ojxhbm9ueW1vdXMgZnVuY3Rpb246IChbXj5dKyk+fChbXlxcKV0rKSlcXCgoLiopXFwpKT8gaW4gKC4qKTpcXHMqJC9pXG5cdFx0dmFyIGxpbmVzID0gc3RhY2t0cmFjZS5zcGxpdCgnXFxuJylcblx0XHR2YXIgc3RhY2sgPSBbXVxuXHRcdHZhciBwYXJ0c1xuXG5cdFx0Zm9yICh2YXIgbGluZSA9IDA7IGxpbmUgPCBsaW5lcy5sZW5ndGg7IGxpbmUgKz0gMikge1xuXHRcdFx0dmFyIGVsZW1lbnRcblx0XHRcdGlmIChvcGVyYTEwUmVnZXguZXhlYyhsaW5lc1tsaW5lXSkpIHtcblx0XHRcdFx0cGFydHMgPSBvcGVyYTEwUmVnZXguZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0ZWxlbWVudCA9IHtcblx0XHRcdFx0XHRhcmdzOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1szXSxcblx0XHRcdFx0XHRsaW5lOiArcGFydHNbMV0sXG5cdFx0XHRcdFx0dXJsOiBwYXJ0c1syXSxcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChvcGVyYTExUmVnZXguZXhlYyhsaW5lc1tsaW5lXSkpIHtcblx0XHRcdFx0cGFydHMgPSBvcGVyYTExUmVnZXguZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0ZWxlbWVudCA9IHtcblx0XHRcdFx0XHRhcmdzOiBwYXJ0c1s1XSA/IHBhcnRzWzVdLnNwbGl0KCcsJykgOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46ICtwYXJ0c1syXSxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1szXSB8fCBwYXJ0c1s0XSxcblx0XHRcdFx0XHRsaW5lOiArcGFydHNbMV0sXG5cdFx0XHRcdFx0dXJsOiBwYXJ0c1s2XSxcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoZWxlbWVudCkge1xuXHRcdFx0XHRpZiAoIWVsZW1lbnQuZnVuYyAmJiBlbGVtZW50LmxpbmUpIHtcblx0XHRcdFx0XHRlbGVtZW50LmZ1bmMgPSBVTktOT1dOX0ZVTkNUSU9OXG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxlbWVudC5jb250ZXh0ID0gW2xpbmVzW2xpbmUgKyAxXV1cblxuXHRcdFx0XHRzdGFjay5wdXNoKGVsZW1lbnQpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRzdGFjayxcblx0XHRcdG1lc3NhZ2U6IGV4dHJhY3RNZXNzYWdlKGV4KSxcblx0XHRcdG5hbWU6IGV4Lm5hbWUsXG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIE5PVCBURVNURUQuXG5cdCAqIENvbXB1dGVzIHN0YWNrIHRyYWNlIGluZm9ybWF0aW9uIGZyb20gYW4gZXJyb3IgbWVzc2FnZSB0aGF0IGluY2x1ZGVzXG5cdCAqIHRoZSBzdGFjayB0cmFjZS5cblx0ICogT3BlcmEgOSBhbmQgZWFybGllciB1c2UgdGhpcyBtZXRob2QgaWYgdGhlIG9wdGlvbiB0byBzaG93IHN0YWNrXG5cdCAqIHRyYWNlcyBpcyB0dXJuZWQgb24gaW4gb3BlcmE6Y29uZmlnLlxuXHQgKiBAcGFyYW0ge0Vycm9yfSBleFxuXHQgKiBAcmV0dXJuIHs/U3RhY2tUcmFjZX0gU3RhY2sgaW5mb3JtYXRpb24uXG5cdCAqIEBtZW1iZXJvZiBjb21wdXRlU3RhY2tUcmFjZVxuXHQgKi9cblx0ZnVuY3Rpb24gY29tcHV0ZVN0YWNrVHJhY2VGcm9tT3BlcmFNdWx0aUxpbmVNZXNzYWdlKGV4KSB7XG5cdFx0Ly8gVE9ETzogQ2xlYW4gdGhpcyBmdW5jdGlvbiB1cFxuXHRcdC8vIE9wZXJhIGluY2x1ZGVzIGEgc3RhY2sgdHJhY2UgaW50byB0aGUgZXhjZXB0aW9uIG1lc3NhZ2UuIEFuIGV4YW1wbGUgaXM6XG5cdFx0Ly9cblx0XHQvLyBTdGF0ZW1lbnQgb24gbGluZSAzOiBVbmRlZmluZWQgdmFyaWFibGU6IHVuZGVmaW5lZEZ1bmNcblx0XHQvLyBCYWNrdHJhY2U6XG5cdFx0Ly8gICBMaW5lIDMgb2YgbGlua2VkIHNjcmlwdCBmaWxlOi8vbG9jYWxob3N0L1VzZXJzL2FuZHJleXZpdC9Qcm9qZWN0cy9UcmFjZUtpdC9qYXZhc2NyaXB0LWNsaWVudC9zYW1wbGUuanM6XG5cdFx0Ly8gICBJbiBmdW5jdGlvbiB6enpcblx0XHQvLyAgICAgICAgIHVuZGVmaW5lZEZ1bmMoYSk7XG5cdFx0Ly8gICBMaW5lIDcgb2YgaW5saW5lIzEgc2NyaXB0IGluIGZpbGU6Ly9sb2NhbGhvc3QvVXNlcnMvYW5kcmV5dml0L1Byb2plY3RzL1RyYWNlS2l0L2phdmFzY3JpcHQtY2xpZW50L3NhbXBsZS5odG1sOlxuXHRcdC8vICAgSW4gZnVuY3Rpb24geXl5XG5cdFx0Ly8gICAgICAgICAgIHp6eih4LCB5LCB6KTtcblx0XHQvLyAgIExpbmUgMyBvZiBpbmxpbmUjMSBzY3JpcHQgaW4gZmlsZTovL2xvY2FsaG9zdC9Vc2Vycy9hbmRyZXl2aXQvUHJvamVjdHMvVHJhY2VLaXQvamF2YXNjcmlwdC1jbGllbnQvc2FtcGxlLmh0bWw6XG5cdFx0Ly8gICBJbiBmdW5jdGlvbiB4eHhcblx0XHQvLyAgICAgICAgICAgeXl5KGEsIGEsIGEpO1xuXHRcdC8vICAgTGluZSAxIG9mIGZ1bmN0aW9uIHNjcmlwdFxuXHRcdC8vICAgICB0cnkgeyB4eHgoJ2hpJyk7IHJldHVybiBmYWxzZTsgfSBjYXRjaChleCkgeyByZXBvcnQoZXgpOyB9XG5cdFx0Ly8gICAuLi5cblxuXHRcdHZhciBsaW5lcyA9IGV4Lm1lc3NhZ2Uuc3BsaXQoJ1xcbicpXG5cdFx0aWYgKGxpbmVzLmxlbmd0aCA8IDQpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdHZhciBsaW5lUkUxID0gL15cXHMqTGluZSAoXFxkKykgb2YgbGlua2VkIHNjcmlwdCAoKD86ZmlsZXxodHRwcz98YmxvYilcXFMrKSg/OjogaW4gZnVuY3Rpb24gKFxcUyspKT9cXHMqJC9pXG5cdFx0dmFyIGxpbmVSRTIgPSAvXlxccypMaW5lIChcXGQrKSBvZiBpbmxpbmUjKFxcZCspIHNjcmlwdCBpbiAoKD86ZmlsZXxodHRwcz98YmxvYilcXFMrKSg/OjogaW4gZnVuY3Rpb24gKFxcUyspKT9cXHMqJC9pXG5cdFx0dmFyIGxpbmVSRTMgPSAvXlxccypMaW5lIChcXGQrKSBvZiBmdW5jdGlvbiBzY3JpcHRcXHMqJC9pXG5cdFx0dmFyIHN0YWNrID0gW11cblx0XHR2YXIgc2NyaXB0cyA9XG5cdFx0XHR3aW5kb3cgJiZcblx0XHRcdHdpbmRvdy5kb2N1bWVudCAmJlxuXHRcdFx0d2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVxuXHRcdHZhciBpbmxpbmVTY3JpcHRCbG9ja3MgPSBbXVxuXHRcdHZhciBwYXJ0c1xuXG5cdFx0Zm9yICh2YXIgcyBpbiBzY3JpcHRzKSB7XG5cdFx0XHRpZiAoaGFzKHNjcmlwdHMsIHMpICYmICFzY3JpcHRzW3NdLnNyYykge1xuXHRcdFx0XHRpbmxpbmVTY3JpcHRCbG9ja3MucHVzaChzY3JpcHRzW3NdKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAodmFyIGxpbmUgPSAyOyBsaW5lIDwgbGluZXMubGVuZ3RoOyBsaW5lICs9IDIpIHtcblx0XHRcdHZhciBpdGVtXG5cdFx0XHRpZiAobGluZVJFMS5leGVjKGxpbmVzW2xpbmVdKSkge1xuXHRcdFx0XHRwYXJ0cyA9IGxpbmVSRTEuZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHRhcmdzOiBbXSxcblx0XHRcdFx0XHRjb2x1bW46IHVuZGVmaW5lZCxcblx0XHRcdFx0XHRmdW5jOiBwYXJ0c1szXSxcblx0XHRcdFx0XHRsaW5lOiArcGFydHNbMV0sXG5cdFx0XHRcdFx0dXJsOiBwYXJ0c1syXSxcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIGlmIChsaW5lUkUyLmV4ZWMobGluZXNbbGluZV0pKSB7XG5cdFx0XHRcdHBhcnRzID0gbGluZVJFMi5leGVjKGxpbmVzW2xpbmVdKVxuXHRcdFx0XHRpdGVtID0ge1xuXHRcdFx0XHRcdGFyZ3M6IFtdLFxuXHRcdFx0XHRcdGNvbHVtbjogdW5kZWZpbmVkLCAvLyBUT0RPOiBDaGVjayB0byBzZWUgaWYgaW5saW5lIzEgKCtwYXJ0c1syXSkgcG9pbnRzIHRvIHRoZSBzY3JpcHQgbnVtYmVyIG9yIGNvbHVtbiBudW1iZXIuXG5cdFx0XHRcdFx0ZnVuYzogcGFydHNbNF0sXG5cdFx0XHRcdFx0bGluZTogK3BhcnRzWzFdLFxuXHRcdFx0XHRcdHVybDogcGFydHNbM10sXG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAobGluZVJFMy5leGVjKGxpbmVzW2xpbmVdKSkge1xuXHRcdFx0XHRwYXJ0cyA9IGxpbmVSRTMuZXhlYyhsaW5lc1tsaW5lXSlcblx0XHRcdFx0dmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmLnJlcGxhY2UoLyMuKiQvLCAnJylcblx0XHRcdFx0aXRlbSA9IHtcblx0XHRcdFx0XHR1cmwsXG5cdFx0XHRcdFx0YXJnczogW10sXG5cdFx0XHRcdFx0Y29sdW1uOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0ZnVuYzogJycsXG5cdFx0XHRcdFx0bGluZTogK3BhcnRzWzFdLFxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpdGVtKSB7XG5cdFx0XHRcdGlmICghaXRlbS5mdW5jKSB7XG5cdFx0XHRcdFx0aXRlbS5mdW5jID0gVU5LTk9XTl9GVU5DVElPTlxuXHRcdFx0XHR9XG5cdFx0XHRcdGl0ZW0uY29udGV4dCA9IFtsaW5lc1tsaW5lICsgMV1dXG5cdFx0XHRcdHN0YWNrLnB1c2goaXRlbSlcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCFzdGFjay5sZW5ndGgpIHtcblx0XHRcdHJldHVybiAvLyBjb3VsZCBub3QgcGFyc2UgbXVsdGlsaW5lIGV4Y2VwdGlvbiBtZXNzYWdlIGFzIE9wZXJhIHN0YWNrIHRyYWNlXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHN0YWNrLFxuXHRcdFx0bWVzc2FnZTogbGluZXNbMF0sXG5cdFx0XHRuYW1lOiBleC5uYW1lLFxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBBZGRzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBmaXJzdCBmcmFtZSB0byBpbmNvbXB2YXJlIHN0YWNrIHRyYWNlcy5cblx0ICogU2FmYXJpIGFuZCBJRSByZXF1aXJlIHRoaXMgdG8gZ2V0IGNvbXB2YXJlIGRhdGEgb24gdGhlIGZpcnN0IGZyYW1lLlxuXHQgKiBAcGFyYW0ge1N0YWNrVHJhY2V9IHN0YWNrSW5mbyBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbiBmcm9tXG5cdCAqIG9uZSBvZiB0aGUgY29tcHV0ZSogbWV0aG9kcy5cblx0ICogQHBhcmFtIHtzdHJpbmc9fSB1cmwgVGhlIFVSTCBvZiB0aGUgc2NyaXB0IHRoYXQgY2F1c2VkIGFuIGVycm9yLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGxpbmVObyBUaGUgbGluZSBudW1iZXIgb2YgdGhlIHNjcmlwdCB0aGF0XG5cdCAqIGNhdXNlZCBhbiBlcnJvci5cblx0ICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBlcnJvciBnZW5lcmF0ZWQgYnkgdGhlIGJyb3dzZXIsIHdoaWNoXG5cdCAqIGhvcGVmdWxseSBjb250YWlucyB0aGUgbmFtZSBvZiB0aGUgb2JqZWN0IHRoYXQgY2F1c2VkIHRoZSBlcnJvci5cblx0ICogQHJldHVybiB7Ym9vbGVhbn0gV2hldGhlciBvciBub3QgdGhlIHN0YWNrIGluZm9ybWF0aW9uIHdhc1xuXHQgKiBhdWdtZW50ZWQuXG5cdCAqIEBtZW1iZXJvZiBjb21wdXRlU3RhY2tUcmFjZVxuXHQgKi9cblx0ZnVuY3Rpb24gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnQoXG5cdFx0c3RhY2tJbmZvLFxuXHRcdHVybCxcblx0XHRsaW5lTm8sXG5cdFx0bWVzc2FnZSxcblx0KSB7XG5cdFx0dmFyIGluaXRpYWwgPSB7XG5cdFx0XHR1cmwsXG5cdFx0XHRsaW5lOiBsaW5lTm8gPyArbGluZU5vIDogdW5kZWZpbmVkLFxuXHRcdH1cblxuXHRcdGlmIChpbml0aWFsLnVybCAmJiBpbml0aWFsLmxpbmUpIHtcblx0XHRcdHN0YWNrSW5mby5pbmNvbXB2YXJlID0gZmFsc2VcblxuXHRcdFx0dmFyIHN0YWNrID0gc3RhY2tJbmZvLnN0YWNrXG5cdFx0XHRpZiAoc3RhY2subGVuZ3RoID4gMCkge1xuXHRcdFx0XHRpZiAoc3RhY2tbMF0udXJsID09PSBpbml0aWFsLnVybCkge1xuXHRcdFx0XHRcdGlmIChzdGFja1swXS5saW5lID09PSBpbml0aWFsLmxpbmUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZSAvLyBhbHJlYWR5IGluIHN0YWNrIHRyYWNlXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghc3RhY2tbMF0ubGluZSAmJiBzdGFja1swXS5mdW5jID09PSBpbml0aWFsLmZ1bmMpIHtcblx0XHRcdFx0XHRcdHN0YWNrWzBdLmxpbmUgPSBpbml0aWFsLmxpbmVcblx0XHRcdFx0XHRcdHN0YWNrWzBdLmNvbnRleHQgPSBpbml0aWFsLmNvbnRleHRcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRzdGFjay51bnNoaWZ0KGluaXRpYWwpXG5cdFx0XHRzdGFja0luZm8ucGFydGlhbCA9IHRydWVcblx0XHRcdHJldHVybiB0cnVlXG5cdFx0fVxuXHRcdHN0YWNrSW5mby5pbmNvbXB2YXJlID0gdHJ1ZVxuXG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblxuXHQvKipcblx0ICogQ29tcHV0ZXMgc3RhY2sgdHJhY2UgaW5mb3JtYXRpb24gYnkgd2Fsa2luZyB0aGUgYXJndW1lbnRzLmNhbGxlclxuXHQgKiBjaGFpbiBhdCB0aGUgdGltZSB0aGUgZXhjZXB0aW9uIG9jY3VycmVkLiBUaGlzIHdpbGwgY2F1c2UgZWFybGllclxuXHQgKiBmcmFtZXMgdG8gYmUgbWlzc2VkIGJ1dCBpcyB0aGUgb25seSB3YXkgdG8gZ2V0IGFueSBzdGFjayB0cmFjZSBpblxuXHQgKiBTYWZhcmkgYW5kIElFLiBUaGUgdG9wIGZyYW1lIGlzIHJlc3RvcmVkIGJ5XG5cdCAqIHtAbGluayBhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudH0uXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGV4XG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZXB0aFxuXHQgKiBAcmV0dXJuIHtTdGFja1RyYWNlfSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZUJ5V2Fsa2luZ0NhbGxlckNoYWluKGV4LCBkZXB0aCkge1xuXHRcdHZhciBmdW5jdGlvbk5hbWUgPSAvZnVuY3Rpb25cXHMrKFtfJGEtekEtWlxceEEwLVxcdUZGRkZdW18kYS16QS1aMC05XFx4QTAtXFx1RkZGRl0qKT9cXHMqXFwoL2lcblx0XHR2YXIgc3RhY2sgPSBbXVxuXHRcdHZhciBmdW5jcyA9IHt9XG5cdFx0dmFyIHJlY3Vyc2lvbiA9IGZhbHNlXG5cdFx0dmFyIHBhcnRzXG5cdFx0dmFyIGl0ZW1cblxuXHRcdGZvciAoXG5cdFx0XHR2YXIgY3VyciA9IGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4uY2FsbGVyO1xuXHRcdFx0Y3VyciAmJiAhcmVjdXJzaW9uO1xuXHRcdFx0Y3VyciA9IGN1cnIuY2FsbGVyXG5cdFx0KSB7XG5cdFx0XHRpZiAoY3VyciA9PT0gY29tcHV0ZVN0YWNrVHJhY2UgfHwgY3VyciA9PT0gcmVwb3J0KSB7XG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cblx0XHRcdGl0ZW0gPSB7XG5cdFx0XHRcdGFyZ3M6IFtdLFxuXHRcdFx0XHRjb2x1bW46IHVuZGVmaW5lZCxcblx0XHRcdFx0ZnVuYzogVU5LTk9XTl9GVU5DVElPTixcblx0XHRcdFx0bGluZTogdW5kZWZpbmVkLFxuXHRcdFx0XHR1cmw6IHVuZGVmaW5lZCxcblx0XHRcdH1cblxuXHRcdFx0cGFydHMgPSBmdW5jdGlvbk5hbWUuZXhlYyhjdXJyLnRvU3RyaW5nKCkpXG5cdFx0XHRpZiAoY3Vyci5uYW1lKSB7XG5cdFx0XHRcdGl0ZW0uZnVuYyA9IGN1cnIubmFtZVxuXHRcdFx0fSBlbHNlIGlmIChwYXJ0cykge1xuXHRcdFx0XHRpdGVtLmZ1bmMgPSBwYXJ0c1sxXVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAodHlwZW9mIGl0ZW0uZnVuYyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0aXRlbS5mdW5jID0gcGFydHNcblx0XHRcdFx0XHQ/IHBhcnRzLmlucHV0LnN1YnN0cmluZygwLCBwYXJ0cy5pbnB1dC5pbmRleE9mKCd7JykpXG5cdFx0XHRcdFx0OiB1bmRlZmluZWRcblx0XHRcdH1cblxuXHRcdFx0aWYgKGZ1bmNzW2N1cnIgKyAnJ10pIHtcblx0XHRcdFx0cmVjdXJzaW9uID0gdHJ1ZVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVuY3NbY3VyciArICcnXSA9IHRydWVcblx0XHRcdH1cblxuXHRcdFx0c3RhY2sucHVzaChpdGVtKVxuXHRcdH1cblxuXHRcdGlmIChkZXB0aCkge1xuXHRcdFx0c3RhY2suc3BsaWNlKDAsIGRlcHRoKVxuXHRcdH1cblxuXHRcdHZhciByZXN1bHQgPSB7XG5cdFx0XHRzdGFjayxcblx0XHRcdG1lc3NhZ2U6IGV4Lm1lc3NhZ2UsXG5cdFx0XHRuYW1lOiBleC5uYW1lLFxuXHRcdH1cblx0XHRhdWdtZW50U3RhY2tUcmFjZVdpdGhJbml0aWFsRWxlbWVudChcblx0XHRcdHJlc3VsdCxcblx0XHRcdGV4LnNvdXJjZVVSTCB8fCBleC5maWxlTmFtZSxcblx0XHRcdGV4LmxpbmUgfHwgZXgubGluZU51bWJlcixcblx0XHRcdGV4Lm1lc3NhZ2UgfHwgZXguZGVzY3JpcHRpb24sXG5cdFx0KVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXG5cdC8qKlxuXHQgKiBDb21wdXRlcyBhIHN0YWNrIHRyYWNlIGZvciBhbiBleGNlcHRpb24uXG5cdCAqIEBwYXJhbSB7RXJyb3J9IGV4XG5cdCAqIEBwYXJhbSB7KHN0cmluZ3xudW1iZXIpPX0gZGVwdGhcblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBkb0NvbXB1dGVTdGFja1RyYWNlKGV4LCBkZXB0aCkge1xuXHRcdHZhciBzdGFja1xuXHRcdHZhciBub3JtYWxpemVkRGVwdGggPSBkZXB0aCA9PT0gdW5kZWZpbmVkID8gMCA6ICtkZXB0aFxuXG5cdFx0dHJ5IHtcblx0XHRcdC8vIFRoaXMgbXVzdCBiZSB0cmllZCBmaXJzdCBiZWNhdXNlIE9wZXJhIDEwICpkZXN0cm95cypcblx0XHRcdC8vIGl0cyBzdGFja3RyYWNlIHByb3BlcnR5IGlmIHlvdSB0cnkgdG8gYWNjZXNzIHRoZSBzdGFja1xuXHRcdFx0Ly8gcHJvcGVydHkgZmlyc3QhIVxuXHRcdFx0c3RhY2sgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja3RyYWNlUHJvcChleClcblx0XHRcdGlmIChzdGFjaykge1xuXHRcdFx0XHRyZXR1cm4gc3RhY2tcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZGVidWcpIHtcblx0XHRcdFx0dGhyb3cgZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlRnJvbVN0YWNrUHJvcChleClcblx0XHRcdGlmIChzdGFjaykge1xuXHRcdFx0XHRyZXR1cm4gc3RhY2tcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZGVidWcpIHtcblx0XHRcdFx0dGhyb3cgZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlRnJvbU9wZXJhTXVsdGlMaW5lTWVzc2FnZShleClcblx0XHRcdGlmIChzdGFjaykge1xuXHRcdFx0XHRyZXR1cm4gc3RhY2tcblx0XHRcdH1cblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRpZiAoZGVidWcpIHtcblx0XHRcdFx0dGhyb3cgZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRzdGFjayA9IGNvbXB1dGVTdGFja1RyYWNlQnlXYWxraW5nQ2FsbGVyQ2hhaW4oZXgsIG5vcm1hbGl6ZWREZXB0aCArIDEpXG5cdFx0XHRpZiAoc3RhY2spIHtcblx0XHRcdFx0cmV0dXJuIHN0YWNrXG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0aWYgKGRlYnVnKSB7XG5cdFx0XHRcdHRocm93IGVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bWVzc2FnZTogZXh0cmFjdE1lc3NhZ2UoZXgpLFxuXHRcdFx0bmFtZTogZXgubmFtZSxcblx0XHRcdHN0YWNrOiBbXSxcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTG9ncyBhIHN0YWNrdHJhY2Ugc3RhcnRpbmcgZnJvbSB0aGUgcHJldmlvdXMgY2FsbCBhbmQgd29ya2luZyBkb3duLlxuXHQgKiBAcGFyYW0geyhudW1iZXJ8c3RyaW5nKT19IGRlcHRoIEhvdyBtYW55IGZyYW1lcyBkZWVwIHRvIHRyYWNlLlxuXHQgKiBAcmV0dXJuIHtTdGFja1RyYWNlfSBTdGFjayB0cmFjZSBpbmZvcm1hdGlvbi5cblx0ICogQG1lbWJlcm9mIGNvbXB1dGVTdGFja1RyYWNlXG5cdCAqL1xuXHRmdW5jdGlvbiBjb21wdXRlU3RhY2tUcmFjZU9mQ2FsbGVyKGRlcHRoKSB7XG5cdFx0dmFyIGN1cnJlbnREZXB0aCA9IChkZXB0aCA9PT0gdW5kZWZpbmVkID8gMCA6ICtkZXB0aCkgKyAxIC8vIFwiKyAxXCIgYmVjYXVzZSBcIm9mQ2FsbGVyXCIgc2hvdWxkIGRyb3Agb25lIGZyYW1lXG5cdFx0dHJ5IHtcblx0XHRcdHRocm93IG5ldyBFcnJvcigpXG5cdFx0fSBjYXRjaCAoZXgpIHtcblx0XHRcdHJldHVybiBjb21wdXRlU3RhY2tUcmFjZShleCwgY3VycmVudERlcHRoICsgMSlcblx0XHR9XG5cdH1cblxuXHRkb0NvbXB1dGVTdGFja1RyYWNlLmF1Z21lbnRTdGFja1RyYWNlV2l0aEluaXRpYWxFbGVtZW50ID0gYXVnbWVudFN0YWNrVHJhY2VXaXRoSW5pdGlhbEVsZW1lbnRcblx0ZG9Db21wdXRlU3RhY2tUcmFjZS5jb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3AgPSBjb21wdXRlU3RhY2tUcmFjZUZyb21TdGFja1Byb3Bcblx0ZG9Db21wdXRlU3RhY2tUcmFjZS5vZkNhbGxlciA9IGNvbXB1dGVTdGFja1RyYWNlT2ZDYWxsZXJcblxuXHRyZXR1cm4gZG9Db21wdXRlU3RhY2tUcmFjZVxufSkoKVxudmFyIEVSUk9SX1RZUEVTX1JFID0gL14oPzpbVXVdbmNhdWdodCAoPzpleGNlcHRpb246ICk/KT8oPzooKD86RXZhbHxJbnRlcm5hbHxSYW5nZXxSZWZlcmVuY2V8U3ludGF4fFR5cGV8VVJJfClFcnJvcik6ICk/KC4qKSQvXG5mdW5jdGlvbiBleHRyYWN0TWVzc2FnZShleCkge1xuXHRjb25zdCBtZXNzYWdlID0gZXggJiYgZXgubWVzc2FnZVxuXHQvLyBjb25zb2xlLmxvZygnbWVzc2FnZScsbWVzc2FnZSlcblx0aWYgKCFtZXNzYWdlKSB7XG5cdFx0cmV0dXJuICdObyBlcnJvciBtZXNzYWdlJ1xuXHR9XG5cdGlmIChtZXNzYWdlLmVycm9yICYmIHR5cGVvZiBtZXNzYWdlLmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG5cdFx0cmV0dXJuIG1lc3NhZ2UuZXJyb3IubWVzc2FnZVxuXHR9XG5cblx0cmV0dXJuIG1lc3NhZ2Vcbn1cbiIsImltcG9ydCB7IE1wSG9vayB9IGZyb20gJy4vZW51bXMnXG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZVxudmFyIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxudmFyIE9ialByb3RvID0gT2JqZWN0LnByb3RvdHlwZVxudmFyIGhhc093blByb3BlcnR5ID0gT2JqUHJvdG8uaGFzT3duUHJvcGVydHlcbnZhciBzbGljZSA9IEFycmF5UHJvdG8uc2xpY2VcbnZhciB0b1N0cmluZyA9IE9ialByb3RvLnRvU3RyaW5nXG52YXIgbmF0aXZlRm9yRWFjaCA9IEFycmF5UHJvdG8uZm9yRWFjaFxudmFyIGJyZWFrZXIgPSBmYWxzZVxuZXhwb3J0IHZhciBpc0FyZ3VtZW50cyA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuICEhKG9iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgJ2NhbGxlZScpKVxufVxuZXhwb3J0IHZhciBlYWNoID0gZnVuY3Rpb24gKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcblx0aWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdGlmIChuYXRpdmVGb3JFYWNoICYmIG9iai5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG5cdFx0b2JqLmZvckVhY2goaXRlcmF0b3IsIGNvbnRleHQpXG5cdH0gZWxzZSBpZiAob2JqLmxlbmd0aCA9PT0gK29iai5sZW5ndGgpIHtcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGlmIChpIGluIG9iaiAmJiBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKSA9PT0gYnJlYWtlcikge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG5cdFx0XHRcdGlmIChpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtrZXldLCBrZXksIG9iaikgPT09IGJyZWFrZXIpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuZXhwb3J0IHZhciB2YWx1ZXMgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHZhciByZXN1bHRzID0gW11cblx0aWYgKG9iaiA9PT0gbnVsbCkge1xuXHRcdHJldHVybiByZXN1bHRzXG5cdH1cblx0ZWFjaChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdHJlc3VsdHNbcmVzdWx0cy5sZW5ndGhdID0gdmFsdWVcblx0fSlcblx0cmV0dXJuIHJlc3VsdHNcbn1cbmV4cG9ydCBmdW5jdGlvbiByb3VuZChudW0sIGRlY2ltYWxzKSB7XG5cdHJldHVybiArbnVtLnRvRml4ZWQoZGVjaW1hbHMpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtc1RvTnMoZHVyYXRpb24pIHtcblx0aWYgKHR5cGVvZiBkdXJhdGlvbiAhPT0gJ251bWJlcicpIHtcblx0XHRyZXR1cm4gZHVyYXRpb25cblx0fVxuXHRyZXR1cm4gcm91bmQoZHVyYXRpb24gKiAxZTYsIDApXG59XG5leHBvcnQgdmFyIGlzVW5kZWZpbmVkID0gZnVuY3Rpb24gKG9iaikge1xuXHRyZXR1cm4gb2JqID09PSB2b2lkIDBcbn1cbmV4cG9ydCB2YXIgaXNTdHJpbmcgPSBmdW5jdGlvbiAob2JqKSB7XG5cdHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nXG59XG5leHBvcnQgdmFyIGlzRGF0ZSA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgRGF0ZV0nXG59XG5leHBvcnQgdmFyIGlzQm9vbGVhbiA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIHRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nXG59XG5leHBvcnQgdmFyIGlzTnVtYmVyID0gZnVuY3Rpb24gKG9iaikge1xuXHRyZXR1cm4gdG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiAvW1xcZFxcLl0rLy50ZXN0KFN0cmluZyhvYmopKVxufVxuXG5leHBvcnQgdmFyIHRvQXJyYXkgPSBmdW5jdGlvbiAoaXRlcmFibGUpIHtcblx0aWYgKCFpdGVyYWJsZSkgcmV0dXJuIFtdXG5cdGlmIChpdGVyYWJsZS50b0FycmF5KSB7XG5cdFx0cmV0dXJuIGl0ZXJhYmxlLnRvQXJyYXkoKVxuXHR9XG5cdGlmIChBcnJheS5pc0FycmF5KGl0ZXJhYmxlKSkge1xuXHRcdHJldHVybiBzbGljZS5jYWxsKGl0ZXJhYmxlKVxuXHR9XG5cdGlmIChpc0FyZ3VtZW50cyhpdGVyYWJsZSkpIHtcblx0XHRyZXR1cm4gc2xpY2UuY2FsbChpdGVyYWJsZSlcblx0fVxuXHRyZXR1cm4gdmFsdWVzKGl0ZXJhYmxlKVxufVxuZXhwb3J0IHZhciBhcmVJbk9yZGVyID0gZnVuY3Rpb24gKCkge1xuXHR2YXIgbnVtYmVycyA9IHRvQXJyYXkoYXJndW1lbnRzKVxuXHRmb3IgKHZhciBpID0gMTsgaSA8IG51bWJlcnMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRpZiAobnVtYmVyc1tpIC0gMV0gPiBudW1iZXJzW2ldKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHR9XG5cdH1cblx0cmV0dXJuIHRydWVcbn1cbi8qKlxuICogVVVJRCB2NFxuICogZnJvbSBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9qZWQvOTgyODgzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBVVUlEKHBsYWNlaG9sZGVyKSB7XG5cdHJldHVybiBwbGFjZWhvbGRlclxuXHRcdD8gLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2Vcblx0XHQgIChcblx0XHRcdFx0cGFyc2VJbnQocGxhY2Vob2xkZXIsIDEwKSBeXG5cdFx0XHRcdCgoTWF0aC5yYW5kb20oKSAqIDE2KSA+PiAocGFyc2VJbnQocGxhY2Vob2xkZXIsIDEwKSAvIDQpKVxuXHRcdCAgKS50b1N0cmluZygxNilcblx0XHQ6IGAkezFlN30tJHsxZTN9LSR7NGUzfS0kezhlM30tJHsxZTExfWAucmVwbGFjZSgvWzAxOF0vZywgVVVJRClcbn1cbmV4cG9ydCBmdW5jdGlvbiBqc29uU3RyaW5naWZ5KHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcblx0aWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG5cdH1cblx0dmFyIG9yaWdpbmFsVG9KU09OID0gW2ZhbHNlLCB1bmRlZmluZWRdXG5cdGlmIChoYXNUb0pTT04odmFsdWUpKSB7XG5cdFx0Ly8gV2UgbmVlZCB0byBhZGQgYSBmbGFnIGFuZCBub3QgcmVseSBvbiB0aGUgdHJ1dGhpbmVzcyBvZiB2YWx1ZS50b0pTT05cblx0XHQvLyBiZWNhdXNlIGl0IGNhbiBiZSBzZXQgYnV0IHVuZGVmaW5lZCBhbmQgdGhhdCdzIGFjdHVhbGx5IHNpZ25pZmljYW50LlxuXHRcdG9yaWdpbmFsVG9KU09OID0gW3RydWUsIHZhbHVlLnRvSlNPTl1cblx0XHRkZWxldGUgdmFsdWUudG9KU09OXG5cdH1cblxuXHR2YXIgb3JpZ2luYWxQcm90b1RvSlNPTiA9IFtmYWxzZSwgdW5kZWZpbmVkXVxuXHR2YXIgcHJvdG90eXBlXG5cdGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG5cdFx0cHJvdG90eXBlID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKVxuXHRcdGlmIChoYXNUb0pTT04ocHJvdG90eXBlKSkge1xuXHRcdFx0b3JpZ2luYWxQcm90b1RvSlNPTiA9IFt0cnVlLCBwcm90b3R5cGUudG9KU09OXVxuXHRcdFx0ZGVsZXRlIHByb3RvdHlwZS50b0pTT05cblx0XHR9XG5cdH1cblxuXHR2YXIgcmVzdWx0XG5cdHRyeSB7XG5cdFx0cmVzdWx0ID0gSlNPTi5zdHJpbmdpZnkodmFsdWUsIHVuZGVmaW5lZCwgc3BhY2UpXG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRyZXN1bHQgPSAnPGVycm9yOiB1bmFibGUgdG8gc2VyaWFsaXplIG9iamVjdD4nXG5cdH0gZmluYWxseSB7XG5cdFx0aWYgKG9yaWdpbmFsVG9KU09OWzBdKSB7XG5cdFx0XHR2YWx1ZS50b0pTT04gPSBvcmlnaW5hbFRvSlNPTlsxXVxuXHRcdH1cblx0XHRpZiAob3JpZ2luYWxQcm90b1RvSlNPTlswXSkge1xuXHRcdFx0cHJvdG90eXBlLnRvSlNPTiA9IG9yaWdpbmFsUHJvdG9Ub0pTT05bMV1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdFxufVxuZnVuY3Rpb24gaGFzVG9KU09OKHZhbHVlKSB7XG5cdHJldHVybiAoXG5cdFx0dHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJlxuXHRcdHZhbHVlICE9PSBudWxsICYmXG5cdFx0dmFsdWUuaGFzT3duUHJvcGVydHkoJ3RvSlNPTicpXG5cdClcbn1cbmV4cG9ydCBmdW5jdGlvbiBlbGFwc2VkKHN0YXJ0LCBlbmQpIHtcblx0cmV0dXJuIGVuZCAtIHN0YXJ0XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0TWV0aG9kcyhvYmopIHtcblx0dmFyIGZ1bmNzID0gW11cblx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdGlmICh0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicgJiYgIU1wSG9va1trZXldKSB7XG5cdFx0XHRmdW5jcy5wdXNoKGtleSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIGZ1bmNzXG59XG4vLyDmm7/mjaJ1cmzljIXlkKvmlbDlrZfnmoTot6/nlLFcbmV4cG9ydCBmdW5jdGlvbiByZXBsYWNlTnVtYmVyQ2hhckJ5UGF0aChwYXRoKSB7XG5cdGlmIChwYXRoKSB7XG5cdFx0cmV0dXJuIHBhdGgucmVwbGFjZSgvXFwvKFteXFwvXSopXFxkKFteXFwvXSopL2csICcvPycpXG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuICcnXG5cdH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdGF0dXNHcm91cChzdGF0dXMpIHtcblx0aWYgKCFzdGF0dXMpIHJldHVybiBzdGF0dXNcblx0cmV0dXJuIChcblx0XHRTdHJpbmcoc3RhdHVzKS5zdWJzdHIoMCwgMSkgKyBTdHJpbmcoc3RhdHVzKS5zdWJzdHIoMSkucmVwbGFjZSgvXFxkKi9nLCAneCcpXG5cdClcbn1cbmV4cG9ydCB2YXIgZ2V0UXVlcnlQYXJhbXNGcm9tVXJsID0gZnVuY3Rpb24gKHVybCkge1xuXHR2YXIgcmVzdWx0ID0ge31cblx0dmFyIGFyciA9IHVybC5zcGxpdCgnPycpXG5cdHZhciBxdWVyeVN0cmluZyA9IGFyclsxXSB8fCAnJ1xuXHRpZiAocXVlcnlTdHJpbmcpIHtcblx0XHRyZXN1bHQgPSBnZXRVUkxTZWFyY2hQYXJhbXMoJz8nICsgcXVlcnlTdHJpbmcpXG5cdH1cblx0cmV0dXJuIHJlc3VsdFxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGVyY2VudGFnZSh2YWx1ZSkge1xuXHRyZXR1cm4gaXNOdW1iZXIodmFsdWUpICYmIHZhbHVlID49IDAgJiYgdmFsdWUgPD0gMTAwXG59XG5cbmV4cG9ydCB2YXIgZXh0ZW5kID0gZnVuY3Rpb24gKG9iaikge1xuXHRzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG5cdFx0Zm9yICh2YXIgcHJvcCBpbiBzb3VyY2UpIHtcblx0XHRcdGlmIChzb3VyY2VbcHJvcF0gIT09IHZvaWQgMCkge1xuXHRcdFx0XHRvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF1cblx0XHRcdH1cblx0XHR9XG5cdH0pXG5cdHJldHVybiBvYmpcbn1cbmV4cG9ydCB2YXIgZXh0ZW5kMkxldiA9IGZ1bmN0aW9uIChvYmopIHtcblx0c2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLmZvckVhY2goZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdGZvciAodmFyIHByb3AgaW4gc291cmNlKSB7XG5cdFx0XHRpZiAoc291cmNlW3Byb3BdICE9PSB2b2lkIDApIHtcblx0XHRcdFx0aWYgKGlzT2JqZWN0KHNvdXJjZVtwcm9wXSkgJiYgaXNPYmplY3Qob2JqW3Byb3BdKSkge1xuXHRcdFx0XHRcdGV4dGVuZChvYmpbcHJvcF0sIHNvdXJjZVtwcm9wXSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcblx0cmV0dXJuIG9ialxufVxuXG5leHBvcnQgdmFyIHRyaW0gPSBmdW5jdGlvbiAoc3RyKSB7XG5cdHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKVxufVxuZXhwb3J0IHZhciBpc09iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0aWYgKG9iaiA9PT0gbnVsbCkgcmV0dXJuIGZhbHNlXG5cdHJldHVybiB0b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IE9iamVjdF0nXG59XG5leHBvcnQgdmFyIGlzRW1wdHlPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG5cdGlmIChpc09iamVjdChvYmopKSB7XG5cdFx0Zm9yICh2YXIga2V5IGluIG9iaikge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG59XG5cbmV4cG9ydCB2YXIgaXNKU09OU3RyaW5nID0gZnVuY3Rpb24gKHN0cikge1xuXHR0cnkge1xuXHRcdEpTT04ucGFyc2Uoc3RyKVxuXHR9IGNhdGNoIChlKSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0cmV0dXJuIHRydWVcbn1cbmV4cG9ydCB2YXIgc2FmZUpTT05QYXJzZSA9IGZ1bmN0aW9uIChzdHIpIHtcblx0dmFyIHZhbCA9IG51bGxcblx0dHJ5IHtcblx0XHR2YWwgPSBKU09OLnBhcnNlKHN0cilcblx0fSBjYXRjaCAoZSkge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdHJldHVybiB2YWxcbn1cbmV4cG9ydCB2YXIgbm93ID1cblx0RGF0ZS5ub3cgfHxcblx0ZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHR9XG5leHBvcnQgdmFyIHRocm90dGxlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcblx0dmFyIHRpbWVvdXQsIGNvbnRleHQsIGFyZ3MsIHJlc3VsdFxuXHR2YXIgcHJldmlvdXMgPSAwXG5cdGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9XG5cblx0dmFyIGxhdGVyID0gZnVuY3Rpb24gKCkge1xuXHRcdHByZXZpb3VzID0gb3B0aW9ucy5sZWFkaW5nID09PSBmYWxzZSA/IDAgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuXHRcdHRpbWVvdXQgPSBudWxsXG5cdFx0cmVzdWx0ID0gZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKVxuXHRcdGlmICghdGltZW91dCkgY29udGV4dCA9IGFyZ3MgPSBudWxsXG5cdH1cblxuXHR2YXIgdGhyb3R0bGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdGFyZ3MgPSBhcmd1bWVudHNcblx0XHR2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKClcblx0XHRpZiAoIXByZXZpb3VzICYmIG9wdGlvbnMubGVhZGluZyA9PT0gZmFsc2UpIHByZXZpb3VzID0gbm93XG5cdFx0Ly/kuIvmrKHop6blj5EgZnVuYyDliankvZnnmoTml7bpl7Rcblx0XHR2YXIgcmVtYWluaW5nID0gd2FpdCAtIChub3cgLSBwcmV2aW91cylcblx0XHRjb250ZXh0ID0gdGhpc1xuXHRcdC8vIOWmguaenOayoeacieWJqeS9meeahOaXtumXtOS6huaIluiAheS9oOaUueS6huezu+e7n+aXtumXtFxuXHRcdGlmIChyZW1haW5pbmcgPD0gMCB8fCByZW1haW5pbmcgPiB3YWl0KSB7XG5cdFx0XHRpZiAodGltZW91dCkge1xuXHRcdFx0XHRjbGVhclRpbWVvdXQodGltZW91dClcblx0XHRcdFx0dGltZW91dCA9IG51bGxcblx0XHRcdH1cblx0XHRcdHByZXZpb3VzID0gbm93XG5cdFx0XHRyZXN1bHQgPSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpXG5cdFx0XHRpZiAoIXRpbWVvdXQpIGNvbnRleHQgPSBhcmdzID0gbnVsbFxuXHRcdH0gZWxzZSBpZiAoIXRpbWVvdXQgJiYgb3B0aW9ucy50cmFpbGluZyAhPT0gZmFsc2UpIHtcblx0XHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCByZW1haW5pbmcpXG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHRcblx0fVxuXHR0aHJvdHRsZWQuY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KVxuXHRcdHByZXZpb3VzID0gMFxuXHRcdHRpbWVvdXQgPSBudWxsXG5cdH1cblx0cmV0dXJuIHRocm90dGxlZFxufVxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7fVxuLyoqXG4gKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgZHJhdyBpcyBzdWNjZXNzZnVsXG4gKiBAcGFyYW0gdGhyZXNob2xkIGJldHdlZW4gMCBhbmQgMTAwXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwZXJmb3JtRHJhdyh0aHJlc2hvbGQpIHtcblx0cmV0dXJuIHRocmVzaG9sZCAhPT0gMCAmJiBNYXRoLnJhbmRvbSgpICogMTAwIDw9IHRocmVzaG9sZFxufVxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRCeVBhdGgoc291cmNlLCBwYXRoKSB7XG5cdHZhciBwYXRoQXJyID0gcGF0aC5zcGxpdCgnLicpXG5cdHdoaWxlIChwYXRoQXJyLmxlbmd0aCkge1xuXHRcdHZhciBrZXkgPSBwYXRoQXJyLnNoaWZ0KClcblx0XHRpZiAoc291cmNlICYmIGtleSBpbiBzb3VyY2UgJiYgaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcblx0XHRcdHNvdXJjZSA9IHNvdXJjZVtrZXldXG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWRcblx0XHR9XG5cdH1cblx0cmV0dXJuIHNvdXJjZVxufVxuZXhwb3J0IGZ1bmN0aW9uIHdpdGhTbmFrZUNhc2VLZXlzKGNhbmRpZGF0ZSkge1xuXHRjb25zdCByZXN1bHQgPSB7fVxuXHRPYmplY3Qua2V5cyhjYW5kaWRhdGUpLmZvckVhY2goKGtleSkgPT4ge1xuXHRcdHJlc3VsdFt0b1NuYWtlQ2FzZShrZXkpXSA9IGRlZXBTbmFrZUNhc2UoY2FuZGlkYXRlW2tleV0pXG5cdH0pXG5cdHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBTbmFrZUNhc2UoY2FuZGlkYXRlKSB7XG5cdGlmIChBcnJheS5pc0FycmF5KGNhbmRpZGF0ZSkpIHtcblx0XHRyZXR1cm4gY2FuZGlkYXRlLm1hcCgodmFsdWUpID0+IGRlZXBTbmFrZUNhc2UodmFsdWUpKVxuXHR9XG5cdGlmICh0eXBlb2YgY2FuZGlkYXRlID09PSAnb2JqZWN0JyAmJiBjYW5kaWRhdGUgIT09IG51bGwpIHtcblx0XHRyZXR1cm4gd2l0aFNuYWtlQ2FzZUtleXMoY2FuZGlkYXRlKVxuXHR9XG5cdHJldHVybiBjYW5kaWRhdGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvU25ha2VDYXNlKHdvcmQpIHtcblx0cmV0dXJuIHdvcmRcblx0XHQucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24gKHVwcGVyY2FzZUxldHRlciwgaW5kZXgpIHtcblx0XHRcdHJldHVybiAoaW5kZXggIT09IDAgPyAnXycgOiAnJykgKyB1cHBlcmNhc2VMZXR0ZXIudG9Mb3dlckNhc2UoKVxuXHRcdH0pXG5cdFx0LnJlcGxhY2UoLy0vZywgJ18nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUm93RGF0YShzdHIpIHtcblx0aWYgKCFpc1N0cmluZyhzdHIpKSByZXR1cm4gc3RyXG5cdHZhciByZWcgPSAvW1xccz0sXCJdL2dcblx0cmV0dXJuIFN0cmluZyhzdHIpLnJlcGxhY2UocmVnLCBmdW5jdGlvbiAod29yZCkge1xuXHRcdHJldHVybiAnXFxcXCcgKyB3b3JkXG5cdH0pXG59XG5leHBvcnQgdmFyIHVybFBhcnNlID0gZnVuY3Rpb24gKHBhcmEpIHtcblx0dmFyIFVSTFBhcnNlciA9IGZ1bmN0aW9uIChhKSB7XG5cdFx0dGhpcy5fZmllbGRzID0ge1xuXHRcdFx0VXNlcm5hbWU6IDQsXG5cdFx0XHRQYXNzd29yZDogNSxcblx0XHRcdFBvcnQ6IDcsXG5cdFx0XHRQcm90b2NvbDogMixcblx0XHRcdEhvc3Q6IDYsXG5cdFx0XHRQYXRoOiA4LFxuXHRcdFx0VVJMOiAwLFxuXHRcdFx0UXVlcnlTdHJpbmc6IDksXG5cdFx0XHRGcmFnbWVudDogMTAsXG5cdFx0fVxuXHRcdHRoaXMuX3ZhbHVlcyA9IHt9XG5cdFx0dGhpcy5fcmVnZXggPSBudWxsXG5cdFx0dGhpcy5fcmVnZXggPSAvXigoXFx3Kyk6XFwvXFwvKT8oKFxcdyspOj8oXFx3Kyk/QCk/KFteXFwvXFw/Ol0rKTo/KFxcZCspPyhcXC8/W15cXD8jXSspP1xcPz8oW14jXSspPyM/KFxcdyopL1xuXG5cdFx0aWYgKHR5cGVvZiBhICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHR0aGlzLl9wYXJzZShhKVxuXHRcdH1cblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLnNldFVybCA9IGZ1bmN0aW9uIChhKSB7XG5cdFx0dGhpcy5fcGFyc2UoYSlcblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLl9pbml0VmFsdWVzID0gZnVuY3Rpb24gKCkge1xuXHRcdGZvciAodmFyIGEgaW4gdGhpcy5fZmllbGRzKSB7XG5cdFx0XHR0aGlzLl92YWx1ZXNbYV0gPSAnJ1xuXHRcdH1cblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLmFkZFF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24gKHF1ZXJ5T2JqKSB7XG5cdFx0aWYgKHR5cGVvZiBxdWVyeU9iaiAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZVxuXHRcdH1cblx0XHR2YXIgcXVlcnkgPSB0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgfHwgJydcblx0XHRmb3IgKHZhciBpIGluIHF1ZXJ5T2JqKSB7XG5cdFx0XHRpZiAobmV3IFJlZ0V4cChpICsgJ1teJl0rJykudGVzdChxdWVyeSkpIHtcblx0XHRcdFx0cXVlcnkgPSBxdWVyeS5yZXBsYWNlKG5ldyBSZWdFeHAoaSArICdbXiZdKycpLCBpICsgJz0nICsgcXVlcnlPYmpbaV0pXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpZiAocXVlcnkuc2xpY2UoLTEpID09PSAnJicpIHtcblx0XHRcdFx0XHRxdWVyeSA9IHF1ZXJ5ICsgaSArICc9JyArIHF1ZXJ5T2JqW2ldXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKHF1ZXJ5ID09PSAnJykge1xuXHRcdFx0XHRcdFx0cXVlcnkgPSBpICsgJz0nICsgcXVlcnlPYmpbaV1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cXVlcnkgPSBxdWVyeSArICcmJyArIGkgKyAnPScgKyBxdWVyeU9ialtpXVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgPSBxdWVyeVxuXHR9XG5cdFVSTFBhcnNlci5wcm90b3R5cGUuZ2V0UGFyc2UgPSBmdW5jdGlvbiAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlc1xuXHR9XG5cdFVSTFBhcnNlci5wcm90b3R5cGUuZ2V0VXJsID0gZnVuY3Rpb24gKCkge1xuXHRcdHZhciB1cmwgPSAnJ1xuXHRcdHVybCArPSB0aGlzLl92YWx1ZXMuT3JpZ2luXG5cdFx0dXJsICs9IHRoaXMuX3ZhbHVlcy5Qb3J0ID8gJzonICsgdGhpcy5fdmFsdWVzLlBvcnQgOiAnJ1xuXHRcdHVybCArPSB0aGlzLl92YWx1ZXMuUGF0aFxuXHRcdHVybCArPSB0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgPyAnPycgKyB0aGlzLl92YWx1ZXMuUXVlcnlTdHJpbmcgOiAnJ1xuXHRcdHJldHVybiB1cmxcblx0fVxuXHRVUkxQYXJzZXIucHJvdG90eXBlLl9wYXJzZSA9IGZ1bmN0aW9uIChhKSB7XG5cdFx0dGhpcy5faW5pdFZhbHVlcygpXG5cdFx0dmFyIGIgPSB0aGlzLl9yZWdleC5leGVjKGEpXG5cdFx0aWYgKCFiKSB7XG5cdFx0XHR0aHJvdyAnRFBVUkxQYXJzZXI6Ol9wYXJzZSAtPiBJbnZhbGlkIFVSTCdcblx0XHR9XG5cdFx0Zm9yICh2YXIgYyBpbiB0aGlzLl9maWVsZHMpIHtcblx0XHRcdGlmICh0eXBlb2YgYlt0aGlzLl9maWVsZHNbY11dICE9ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdHRoaXMuX3ZhbHVlc1tjXSA9IGJbdGhpcy5fZmllbGRzW2NdXVxuXHRcdFx0fVxuXHRcdH1cblx0XHR0aGlzLl92YWx1ZXNbJ0hvc3RuYW1lJ10gPSB0aGlzLl92YWx1ZXNbJ0hvc3QnXS5yZXBsYWNlKC86XFxkKyQvLCAnJylcblx0XHR0aGlzLl92YWx1ZXNbJ09yaWdpbiddID1cblx0XHRcdHRoaXMuX3ZhbHVlc1snUHJvdG9jb2wnXSArICc6Ly8nICsgdGhpcy5fdmFsdWVzWydIb3N0bmFtZSddXG5cdH1cblx0cmV0dXJuIG5ldyBVUkxQYXJzZXIocGFyYSlcbn1cbmV4cG9ydCBjb25zdCBnZXRPd25PYmplY3RLZXlzID0gZnVuY3Rpb24gKG9iaiwgaXNFbnVtZXJhYmxlKSB7XG5cdHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKVxuXHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuXHRcdHZhciBzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhvYmopXG5cdFx0aWYgKGlzRW51bWVyYWJsZSkge1xuXHRcdFx0c3ltYm9scyA9IHN5bWJvbHMuZmlsdGVyKGZ1bmN0aW9uICh0KSB7XG5cdFx0XHRcdHJldHVybiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgdCkuZW51bWVyYWJsZVxuXHRcdFx0fSlcblx0XHR9XG5cdFx0a2V5cy5wdXNoLmFwcGx5KGtleXMsIHN5bWJvbHMpXG5cdH1cblx0cmV0dXJuIGtleXNcbn1cbmV4cG9ydCBjb25zdCBkZWZpbmVPYmplY3QgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG5cdGlmIChrZXkgaW4gb2JqKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwga2V5LCB7XG5cdFx0XHR2YWx1ZSxcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHR3cml0YWJsZTogdHJ1ZSxcblx0XHR9KVxuXHR9IGVsc2Uge1xuXHRcdG9ialtrZXldID0gdmFsdWVcblx0fVxuXHRyZXR1cm4gb2JqXG59XG5leHBvcnQgY29uc3QgZGVlcE1peE9iamVjdCA9IGZ1bmN0aW9uICh0YXJnZXRPYmopIHtcblx0Zm9yICh2YXIgdCA9IDE7IHQgPCBhcmd1bWVudHMubGVuZ3RoOyB0KyspIHtcblx0XHR2YXIgdGFyZ2V0ID0gYXJndW1lbnRzW3RdICE9IG51bGwgPyBhcmd1bWVudHNbdF0gOiB7fVxuXHRcdGlmICh0ICUgMikge1xuXHRcdFx0Z2V0T3duT2JqZWN0S2V5cyhPYmplY3QodGFyZ2V0KSwgdHJ1ZSkuZm9yRWFjaChmdW5jdGlvbiAodCkge1xuXHRcdFx0XHRkZWZpbmVPYmplY3QodGFyZ2V0T2JqLCB0LCB0YXJnZXRbdF0pXG5cdFx0XHR9KVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcnMpIHtcblx0XHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnRpZXMoXG5cdFx0XHRcdFx0dGFyZ2V0T2JqLFxuXHRcdFx0XHRcdE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKHRhcmdldCksXG5cdFx0XHRcdClcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGdldE93bk9iamVjdEtleXMoT2JqZWN0KHRhcmdldCkpLmZvckVhY2goZnVuY3Rpb24gKHQpIHtcblx0XHRcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoXG5cdFx0XHRcdFx0XHR0YXJnZXRPYmosXG5cdFx0XHRcdFx0XHR0LFxuXHRcdFx0XHRcdFx0T2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHQpLFxuXHRcdFx0XHRcdClcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIHRhcmdldE9ialxufVxuIiwiaW1wb3J0IHsgbXNUb05zLCBleHRlbmQyTGV2IH0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQgeyBSdW1FdmVudFR5cGUgfSBmcm9tICcuLi8uLi9oZWxwZXIvZW51bXMnXG5pbXBvcnQgeyB0cmFja0FjdGlvbnMgfSBmcm9tICcuL3RyYWNrQWN0aW9ucydcblxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0QWN0aW9uQ29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pIHtcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuQVVUT19BQ1RJT05fQ09NUExFVEVELFxuXHRcdGZ1bmN0aW9uIChhY3Rpb24pIHtcblx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRcdExpZmVDeWNsZUV2ZW50VHlwZS5SQVdfUlVNX0VWRU5UX0NPTExFQ1RFRCxcblx0XHRcdFx0cHJvY2Vzc0FjdGlvbihhY3Rpb24pLFxuXHRcdFx0KVxuXHRcdH0sXG5cdClcblx0aWYgKGNvbmZpZ3VyYXRpb24udHJhY2tJbnRlcmFjdGlvbnMpIHtcblx0XHR0cmFja0FjdGlvbnMobGlmZUN5Y2xlKVxuXHR9XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NBY3Rpb24oYWN0aW9uKSB7XG5cdHZhciBhdXRvQWN0aW9uUHJvcGVydGllcyA9IHtcblx0XHRhY3Rpb246IHtcblx0XHRcdGVycm9yOiB7XG5cdFx0XHRcdGNvdW50OiBhY3Rpb24uY291bnRzLmVycm9yQ291bnQsXG5cdFx0XHR9LFxuXHRcdFx0aWQ6IGFjdGlvbi5pZCxcblx0XHRcdGxvYWRpbmdUaW1lOiBtc1RvTnMoYWN0aW9uLmR1cmF0aW9uKSxcblx0XHRcdGxvbmdfdGFzazoge1xuXHRcdFx0XHRjb3VudDogYWN0aW9uLmNvdW50cy5sb25nVGFza0NvdW50LFxuXHRcdFx0fSxcblx0XHRcdHJlc291cmNlOiB7XG5cdFx0XHRcdGNvdW50OiBhY3Rpb24uY291bnRzLnJlc291cmNlQ291bnQsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH1cblx0dmFyIGFjdGlvbkV2ZW50ID0gZXh0ZW5kMkxldihcblx0XHR7XG5cdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0dGFyZ2V0OiB7XG5cdFx0XHRcdFx0bmFtZTogYWN0aW9uLm5hbWUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHR5cGU6IGFjdGlvbi50eXBlLFxuXHRcdFx0fSxcblx0XHRcdGRhdGU6IGFjdGlvbi5zdGFydENsb2Nrcyxcblx0XHRcdHR5cGU6IFJ1bUV2ZW50VHlwZS5BQ1RJT04sXG5cdFx0fSxcblx0XHRhdXRvQWN0aW9uUHJvcGVydGllcyxcblx0KVxuXHRyZXR1cm4ge1xuXHRcdHJhd1J1bUV2ZW50OiBhY3Rpb25FdmVudCxcblx0XHRzdGFydFRpbWU6IGFjdGlvbi5zdGFydENsb2Nrcyxcblx0fVxufVxuIiwiaW1wb3J0IHsgZWxhcHNlZCwgbm93LCBVVUlELCBnZXRNZXRob2RzLCBpc09iamVjdCB9IGZyb20gJy4uLy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHsgTWluYVRvdWNoIH0gZnJvbSAnLi4vLi4vY29yZS9taW5pYVRvdWNoJ1xuaW1wb3J0IHsgdHJhY2tFdmVudENvdW50cyB9IGZyb20gJy4uL3RyYWNrRXZlbnRDb3VudHMnXG5pbXBvcnQgeyB3YWl0SWRsZVBhZ2VBY3Rpdml0eSB9IGZyb20gJy4uL3RyYWNrUGFnZUFjdGl2ZWl0ZXMnXG5pbXBvcnQgeyBBY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrQWN0aW9ucyhsaWZlQ3ljbGUpIHtcblx0dmFyIGFjdGlvbiA9IHN0YXJ0QWN0aW9uTWFuYWdlbWVudChsaWZlQ3ljbGUpXG5cblx0Ly8gTmV3IHZpZXdzIHRyaWdnZXIgdGhlIGRpc2NhcmQgb2YgdGhlIGN1cnJlbnQgcGVuZGluZyBBY3Rpb25cblx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuVklFV19DUkVBVEVELCBmdW5jdGlvbiAoKSB7XG5cdFx0YWN0aW9uLmRpc2NhcmRDdXJyZW50KClcblx0fSlcblx0dmFyIG9yaWdpblBhZ2UgPSBQYWdlXG5cdFBhZ2UgPSBmdW5jdGlvbiAocGFnZSkge1xuXHRcdGNvbnN0IG1ldGhvZHMgPSBnZXRNZXRob2RzKHBhZ2UpXG5cdFx0bWV0aG9kcy5mb3JFYWNoKChtZXRob2ROYW1lKSA9PiB7XG5cdFx0XHRjbGlja1Byb3h5KFxuXHRcdFx0XHRwYWdlLFxuXHRcdFx0XHRtZXRob2ROYW1lLFxuXHRcdFx0XHRmdW5jdGlvbiAoX2FjdGlvbikge1xuXHRcdFx0XHRcdGFjdGlvbi5jcmVhdGUoX2FjdGlvbi50eXBlLCBfYWN0aW9uLm5hbWUpXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxpZmVDeWNsZSxcblx0XHRcdClcblx0XHR9KVxuXHRcdHJldHVybiBvcmlnaW5QYWdlKHBhZ2UpXG5cdH1cblx0dmFyIG9yaWdpbkNvbXBvbmVudCA9IENvbXBvbmVudFxuXHRDb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0Y29uc3QgbWV0aG9kcyA9IGdldE1ldGhvZHMoY29tcG9uZW50KVxuXHRcdG1ldGhvZHMuZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuXHRcdFx0Y2xpY2tQcm94eShjb21wb25lbnQsIG1ldGhvZE5hbWUsIGZ1bmN0aW9uIChfYWN0aW9uKSB7XG5cdFx0XHRcdGFjdGlvbi5jcmVhdGUoX2FjdGlvbi50eXBlLCBfYWN0aW9uLm5hbWUpXG5cdFx0XHR9KVxuXHRcdH0pXG5cdFx0cmV0dXJuIG9yaWdpbkNvbXBvbmVudChjb21wb25lbnQpXG5cdH1cblx0cmV0dXJuIHtcblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRhY3Rpb24uZGlzY2FyZEN1cnJlbnQoKVxuXHRcdFx0Ly8gc3RvcExpc3RlbmVyKClcblx0XHR9LFxuXHR9XG59XG5mdW5jdGlvbiBjbGlja1Byb3h5KHBhZ2UsIG1ldGhvZE5hbWUsIGNhbGxiYWNrLCBsaWZlQ3ljbGUpIHtcblx0dmFyIG9pcmdpbk1ldGhvZCA9IHBhZ2VbbWV0aG9kTmFtZV1cblxuXHRwYWdlW21ldGhvZE5hbWVdID0gZnVuY3Rpb24gKCkge1xuXHRcdGNvbnN0IHJlc3VsdCA9IG9pcmdpbk1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdFx0dmFyIGFjdGlvbiA9IHt9XG5cdFx0aWYgKGlzT2JqZWN0KGFyZ3VtZW50c1swXSkpIHtcblx0XHRcdHZhciBjdXJyZW50VGFyZ2V0ID0gYXJndW1lbnRzWzBdLmN1cnJlbnRUYXJnZXQgfHwge31cblx0XHRcdHZhciBkYXRhc2V0ID0gY3VycmVudFRhcmdldC5kYXRhc2V0IHx8IHt9XG5cdFx0XHR2YXIgYWN0aW9uVHlwZSA9IGFyZ3VtZW50c1swXS50eXBlXG5cdFx0XHRpZiAoYWN0aW9uVHlwZSAmJiBBY3Rpb25UeXBlW2FjdGlvblR5cGVdKSB7XG5cdFx0XHRcdGFjdGlvbi50eXBlID0gYWN0aW9uVHlwZVxuXHRcdFx0XHRhY3Rpb24ubmFtZSA9IGRhdGFzZXQubmFtZSB8fCBkYXRhc2V0LmNvbnRlbnQgfHwgZGF0YXNldC50eXBlXG5cdFx0XHRcdGNhbGxiYWNrKGFjdGlvbilcblx0XHRcdH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ29uQWRkVG9GYXZvcml0ZXMnKSB7XG5cdFx0XHRcdGFjdGlvbi50eXBlID0gJ2NsaWNrJ1xuXHRcdFx0XHRhY3Rpb24ubmFtZSA9XG5cdFx0XHRcdFx0J+aUtuiXjyAnICtcblx0XHRcdFx0XHQn5qCH6aKYOiAnICtcblx0XHRcdFx0XHRyZXN1bHQudGl0bGUgK1xuXHRcdFx0XHRcdChyZXN1bHQucXVlcnkgPyAnIHF1ZXJ5OiAnICsgcmVzdWx0LnF1ZXJ5IDogJycpXG5cdFx0XHRcdGNhbGxiYWNrKGFjdGlvbilcblx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9BTElBU19BQ1RJT04sIHRydWUpXG5cdFx0XHR9IGVsc2UgaWYgKG1ldGhvZE5hbWUgPT09ICdvblNoYXJlQXBwTWVzc2FnZScpIHtcblx0XHRcdFx0YWN0aW9uLnR5cGUgPSAnY2xpY2snXG5cdFx0XHRcdGFjdGlvbi5uYW1lID1cblx0XHRcdFx0XHQn6L2s5Y+RICcgK1xuXHRcdFx0XHRcdCfmoIfpopg6ICcgK1xuXHRcdFx0XHRcdHJlc3VsdC50aXRsZSArXG5cdFx0XHRcdFx0KHJlc3VsdC5wYXRoID8gJyBwYXRoOiAnICsgcmVzdWx0LnBhdGggOiAnJylcblx0XHRcdFx0Y2FsbGJhY2soYWN0aW9uKVxuXHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5QQUdFX0FMSUFTX0FDVElPTiwgdHJ1ZSlcblx0XHRcdH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ29uU2hhcmVUaW1lbGluZScpIHtcblx0XHRcdFx0YWN0aW9uLnR5cGUgPSAnY2xpY2snXG5cdFx0XHRcdGFjdGlvbi5uYW1lID1cblx0XHRcdFx0XHQn5YiG5Lqr5Yiw5pyL5Y+L5ZyIICcgK1xuXHRcdFx0XHRcdCfmoIfpopg6ICcgK1xuXHRcdFx0XHRcdHJlc3VsdC50aXRsZSArXG5cdFx0XHRcdFx0KHJlc3VsdC5xdWVyeSA/ICcgcXVlcnk6ICcgKyByZXN1bHQucXVlcnkgOiAnJylcblx0XHRcdFx0Y2FsbGJhY2soYWN0aW9uKVxuXHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5QQUdFX0FMSUFTX0FDVElPTiwgdHJ1ZSlcblx0XHRcdH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ29uVGFiSXRlbVRhcCcpIHtcblx0XHRcdFx0dmFyIGl0ZW0gPSBhcmd1bWVudHMubGVuZ3RoICYmIGFyZ3VtZW50c1swXVxuXHRcdFx0XHRhY3Rpb24udHlwZSA9ICdjbGljaydcblx0XHRcdFx0YWN0aW9uLm5hbWUgPVxuXHRcdFx0XHRcdCd0YWIgJyArXG5cdFx0XHRcdFx0J+WQjeensDogJyArXG5cdFx0XHRcdFx0aXRlbS50ZXh0ICtcblx0XHRcdFx0XHQoaXRlbS5wYWdlUGF0aCA/ICcg6Lez6L2s5YiwOiAnICsgaXRlbS5wYWdlUGF0aCA6ICcnKVxuXHRcdFx0XHRjYWxsYmFjayhhY3Rpb24pXG5cdFx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlBBR0VfQUxJQVNfQUNUSU9OLCB0cnVlKVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0XG5cdH1cbn1cbmZ1bmN0aW9uIHN0YXJ0QWN0aW9uTWFuYWdlbWVudChsaWZlQ3ljbGUpIHtcblx0dmFyIGN1cnJlbnRBY3Rpb25cblx0dmFyIGN1cnJlbnRJZGxlUGFnZUFjdGl2aXR5U3Vic2NyaXB0aW9uXG5cblx0cmV0dXJuIHtcblx0XHRjcmVhdGU6IGZ1bmN0aW9uICh0eXBlLCBuYW1lKSB7XG5cdFx0XHRpZiAoY3VycmVudEFjdGlvbikge1xuXHRcdFx0XHQvLyBJZ25vcmUgYW55IG5ldyBhY3Rpb24gaWYgYW5vdGhlciBvbmUgaXMgYWxyZWFkeSBvY2N1cnJpbmcuXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0dmFyIHBlbmRpbmdBdXRvQWN0aW9uID0gbmV3IFBlbmRpbmdBdXRvQWN0aW9uKGxpZmVDeWNsZSwgdHlwZSwgbmFtZSlcblxuXHRcdFx0Y3VycmVudEFjdGlvbiA9IHBlbmRpbmdBdXRvQWN0aW9uXG5cdFx0XHRjdXJyZW50SWRsZVBhZ2VBY3Rpdml0eVN1YnNjcmlwdGlvbiA9IHdhaXRJZGxlUGFnZUFjdGl2aXR5KFxuXHRcdFx0XHRsaWZlQ3ljbGUsXG5cdFx0XHRcdGZ1bmN0aW9uIChwYXJhbXMpIHtcblx0XHRcdFx0XHRpZiAocGFyYW1zLmhhZEFjdGl2aXR5KSB7XG5cdFx0XHRcdFx0XHRwZW5kaW5nQXV0b0FjdGlvbi5jb21wbGV0ZShwYXJhbXMuZW5kVGltZSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cGVuZGluZ0F1dG9BY3Rpb24uZGlzY2FyZCgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGN1cnJlbnRBY3Rpb24gPSB1bmRlZmluZWRcblx0XHRcdFx0fSxcblx0XHRcdClcblx0XHR9LFxuXHRcdGRpc2NhcmRDdXJyZW50OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoY3VycmVudEFjdGlvbikge1xuXHRcdFx0XHRjdXJyZW50SWRsZVBhZ2VBY3Rpdml0eVN1YnNjcmlwdGlvbi5zdG9wKClcblx0XHRcdFx0Y3VycmVudEFjdGlvbi5kaXNjYXJkKClcblx0XHRcdFx0Y3VycmVudEFjdGlvbiA9IHVuZGVmaW5lZFxuXHRcdFx0fVxuXHRcdH0sXG5cdH1cbn1cbnZhciBQZW5kaW5nQXV0b0FjdGlvbiA9IGZ1bmN0aW9uIChsaWZlQ3ljbGUsIHR5cGUsIG5hbWUpIHtcblx0dGhpcy5pZCA9IFVVSUQoKVxuXHR0aGlzLnN0YXJ0Q2xvY2tzID0gbm93KClcblx0dGhpcy5uYW1lID0gbmFtZVxuXHR0aGlzLnR5cGUgPSB0eXBlXG5cdHRoaXMubGlmZUN5Y2xlID0gbGlmZUN5Y2xlXG5cdHRoaXMuZXZlbnRDb3VudHNTdWJzY3JpcHRpb24gPSB0cmFja0V2ZW50Q291bnRzKGxpZmVDeWNsZSlcblx0dGhpcy5saWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5BVVRPX0FDVElPTl9DUkVBVEVELCB7XG5cdFx0aWQ6IHRoaXMuaWQsXG5cdFx0c3RhcnRDbG9ja3M6IHRoaXMuc3RhcnRDbG9ja3MsXG5cdH0pXG59XG5QZW5kaW5nQXV0b0FjdGlvbi5wcm90b3R5cGUgPSB7XG5cdGNvbXBsZXRlOiBmdW5jdGlvbiAoZW5kVGltZSkge1xuXHRcdHZhciBldmVudENvdW50cyA9IHRoaXMuZXZlbnRDb3VudHNTdWJzY3JpcHRpb24uZXZlbnRDb3VudHNcblx0XHR0aGlzLmxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLkFVVE9fQUNUSU9OX0NPTVBMRVRFRCwge1xuXHRcdFx0Y291bnRzOiB7XG5cdFx0XHRcdGVycm9yQ291bnQ6IGV2ZW50Q291bnRzLmVycm9yQ291bnQsXG5cdFx0XHRcdGxvbmdUYXNrQ291bnQ6IGV2ZW50Q291bnRzLmxvbmdUYXNrQ291bnQsXG5cdFx0XHRcdHJlc291cmNlQ291bnQ6IGV2ZW50Q291bnRzLnJlc291cmNlQ291bnQsXG5cdFx0XHR9LFxuXHRcdFx0ZHVyYXRpb246IGVsYXBzZWQodGhpcy5zdGFydENsb2NrcywgZW5kVGltZSksXG5cdFx0XHRpZDogdGhpcy5pZCxcblx0XHRcdG5hbWU6IHRoaXMubmFtZSxcblx0XHRcdHN0YXJ0Q2xvY2tzOiB0aGlzLnN0YXJ0Q2xvY2tzLFxuXHRcdFx0dHlwZTogdGhpcy50eXBlLFxuXHRcdH0pXG5cdFx0dGhpcy5ldmVudENvdW50c1N1YnNjcmlwdGlvbi5zdG9wKClcblx0fSxcblx0ZGlzY2FyZDogZnVuY3Rpb24gKCkge1xuXHRcdHRoaXMubGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuQVVUT19BQ1RJT05fRElTQ0FSREVEKVxuXHRcdHRoaXMuZXZlbnRDb3VudHNTdWJzY3JpcHRpb24uc3RvcCgpXG5cdH0sXG59XG4iLCJpbXBvcnQgeyByZXdyaXRlQXBwIH0gZnJvbSAnLi9pbmRleCdcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHsgbXNUb05zIH0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0QXBwQ29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pIHtcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuQVBQX1VQREFURSwgZnVuY3Rpb24gKGFwcGluZm8pIHtcblx0XHRsaWZlQ3ljbGUubm90aWZ5KFxuXHRcdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJBV19SVU1fRVZFTlRfQ09MTEVDVEVELFxuXHRcdFx0cHJvY2Vzc0FwcFVwZGF0ZShhcHBpbmZvKSxcblx0XHQpXG5cdH0pXG5cblx0cmV0dXJuIHJld3JpdGVBcHAoY29uZmlndXJhdGlvbiwgbGlmZUN5Y2xlKVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzQXBwVXBkYXRlKGFwcGluZm8pIHtcblx0dmFyIGFwcEV2ZW50ID0ge1xuXHRcdGRhdGU6IGFwcGluZm8uc3RhcnRUaW1lLFxuXHRcdHR5cGU6IFJ1bUV2ZW50VHlwZS5BUFAsXG5cdFx0YXBwOiB7XG5cdFx0XHRzdGFydHVwRHVyYXRpb246IG1zVG9OcyhhcHBpbmZvLnN0YXJ0dXBEdXJhdGlvbiksXG5cdFx0XHRzY3JpcHRMb2FkRHVyYXRpb246IG1zVG9OcyhhcHBpbmZvLnNjcmlwdExvYWREdXJhdGlvbiksXG5cdFx0XHRjb2RlRG93bmxvYWREdXJhdGlvbjogbXNUb05zKGFwcGluZm8uY29kZURvd25sb2FkRHVyYXRpb24pLFxuXHRcdFx0c3RhcnR1cFR5cGU6IGFwcGluZm8uc3RhcnR1cFR5cGUsXG5cdFx0XHR0aW1lU3BlbnQ6IG1zVG9OcyhhcHBpbmZvLmR1cmF0aW9uKSxcblx0XHR9LFxuXHR9XG5cdHJldHVybiB7XG5cdFx0cmF3UnVtRXZlbnQ6IGFwcEV2ZW50LFxuXHRcdHN0YXJ0VGltZTogYXBwaW5mby5zdGFydFRpbWUsXG5cdH1cbn1cbiIsImltcG9ydCB7IHRocm90dGxlLCBub3csIGFyZUluT3JkZXIgfSBmcm9tICcuLi8uLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9jb3JlL2xpZmVDeWNsZSdcblxuLy8g5Yqr5oyB5Y6f5bCP56iL5bqPQXBw5pa55rOVXG5leHBvcnQgdmFyIFRIUk9UVExFX1ZJRVdfVVBEQVRFX1BFUklPRCA9IDMwMDBcbmV4cG9ydCBjb25zdCBzdGFydHVwVHlwZXMgPSB7XG5cdENPTEQ6ICdjb2xkJyxcblx0SE9UOiAnaG90Jyxcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXdyaXRlQXBwKGNvbmZpZ3VyYXRpb24sIGxpZmVDeWNsZSkge1xuXHRjb25zdCBvcmlnaW5BcHAgPSBBcHBcblx0dmFyIGFwcEluZm8gPSB7XG5cdFx0aXNTdGFydFVwOiBmYWxzZSwgLy8g5piv5ZCm5ZCv5YqoXG5cdH1cblx0dmFyIHN0YXJ0VGltZVxuXHRBcHAgPSBmdW5jdGlvbiAoYXBwKSB7XG5cdFx0c3RhcnRUaW1lID0gbm93KClcblx0XHQvLyDlkIjlubbmlrnms5XvvIzmj5LlhaXorrDlvZXohJrmnKxcblx0XHQ7WydvbkxhdW5jaCcsICdvblNob3cnLCAnb25IaWRlJ10uZm9yRWFjaCgobWV0aG9kTmFtZSkgPT4ge1xuXHRcdFx0Y29uc3QgdXNlckRlZmluZWRNZXRob2QgPSBhcHBbbWV0aG9kTmFtZV0gLy8g5pqC5a2Y55So5oi35a6a5LmJ55qE5pa55rOVXG5cdFx0XHRhcHBbbWV0aG9kTmFtZV0gPSBmdW5jdGlvbiAob3B0aW9ucykge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhtZXRob2ROYW1lLCAnbWV0aG9kTmFtZSBhcHAnKVxuXHRcdFx0XHRpZiAobWV0aG9kTmFtZSA9PT0gJ29uTGF1bmNoJykge1xuXHRcdFx0XHRcdGFwcEluZm8uaXNTdGFydFVwID0gdHJ1ZVxuXHRcdFx0XHRcdGFwcEluZm8uaXNIaWRlID0gZmFsc2Vcblx0XHRcdFx0XHRhcHBJbmZvLnN0YXJ0dXBUeXBlID0gc3RhcnR1cFR5cGVzLkNPTERcblx0XHRcdFx0fSBlbHNlIGlmIChtZXRob2ROYW1lID09PSAnb25TaG93Jykge1xuXHRcdFx0XHRcdGlmIChhcHBJbmZvLmlzU3RhcnRVcCAmJiBhcHBJbmZvLmlzSGlkZSkge1xuXHRcdFx0XHRcdFx0Ly8g5Yik5pat5piv54Ot5ZCv5YqoXG5cdFx0XHRcdFx0XHRhcHBJbmZvLnN0YXJ0dXBUeXBlID0gc3RhcnR1cFR5cGVzLkhPVFxuXHRcdFx0XHRcdFx0YXBwVXBkYXRlKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiAobWV0aG9kTmFtZSA9PT0gJ29uSGlkZScpIHtcblx0XHRcdFx0XHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5BUFBfSElERSlcblx0XHRcdFx0XHRhcHBJbmZvLmlzSGlkZSA9IHRydWVcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdXNlckRlZmluZWRNZXRob2QgJiYgdXNlckRlZmluZWRNZXRob2QuY2FsbCh0aGlzLCBvcHRpb25zKVxuXHRcdFx0fVxuXHRcdH0pXG5cdFx0cmV0dXJuIG9yaWdpbkFwcChhcHApXG5cdH1cblx0c3RhcnRQZXJmb3JtYW5jZU9ic2VydmFibGUobGlmZUN5Y2xlLCBmdW5jdGlvbiAoZGF0YSkge1xuXHRcdGFwcEluZm8gPSB7XG5cdFx0XHQuLi5hcHBJbmZvLFxuXHRcdFx0Li4uZGF0YSxcblx0XHR9XG5cdFx0YXBwVXBkYXRlKClcblx0fSlcblx0dmFyIHNjaGVkdWxlQXBwVXBkYXRlID0gdGhyb3R0bGUoYXBwVXBkYXRlLCBUSFJPVFRMRV9WSUVXX1VQREFURV9QRVJJT0QsIHtcblx0XHRsZWFkaW5nOiBmYWxzZSxcblx0fSlcblx0ZnVuY3Rpb24gYXBwVXBkYXRlKCkge1xuXHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLkFQUF9VUERBVEUsIHtcblx0XHRcdHN0YXJ0dXBEdXJhdGlvbjogYXBwSW5mby5zdGFydHVwRHVyYXRpb24sXG5cdFx0XHRzY3JpcHRMb2FkRHVyYXRpb246IGFwcEluZm8uc2NyaXB0TG9hZER1cmF0aW9uLFxuXHRcdFx0Y29kZURvd25sb2FkRHVyYXRpb246IGFwcEluZm8uY29kZURvd25sb2FkRHVyYXRpb24sXG5cdFx0XHRzdGFydHVwVHlwZTogYXBwSW5mby5zdGFydHVwVHlwZSxcblx0XHRcdHN0YXJ0VGltZSxcblx0XHRcdGR1cmF0aW9uOiBub3coKSAtIHN0YXJ0VGltZSxcblx0XHR9KVxuXHR9XG59XG5cbmZ1bmN0aW9uIHN0YXJ0UGVyZm9ybWFuY2VPYnNlcnZhYmxlKGxpZmVDeWNsZSwgY2FsbGJhY2spIHtcblx0dmFyIHN1YnNjcmliZSA9IGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlBFUkZPUk1BTkNFX0VOVFJZX0NPTExFQ1RFRCxcblx0XHRmdW5jdGlvbiAoZW50aXR5cykge1xuXHRcdFx0Ly8g6L+H5ruk5o6J5YW25LuW6aG16Z2i55uR5ZCs77yM5Y+q5L+d55WZ6aaW5qyh5ZCv5YqoXG5cdFx0XHR2YXIgc3RhcnR1cER1cmF0aW9uLCBzY3JpcHRMb2FkRHVyYXRpb24sIGNvZGVEb3dubG9hZER1cmF0aW9uXG5cdFx0XHRjb25zdCBsYXVuY2hFbnRpdHkgPSBlbnRpdHlzLmZpbmQoXG5cdFx0XHRcdChlbnRpdHkpID0+XG5cdFx0XHRcdFx0ZW50aXR5LmVudHJ5VHlwZSA9PT0gJ25hdmlnYXRpb24nICYmXG5cdFx0XHRcdFx0ZW50aXR5Lm5hdmlnYXRpb25UeXBlID09PSAnYXBwTGF1bmNoJyxcblx0XHRcdClcblx0XHRcdGlmICh0eXBlb2YgbGF1bmNoRW50aXR5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRzdGFydHVwRHVyYXRpb24gPSBsYXVuY2hFbnRpdHkuZHVyYXRpb25cblx0XHRcdH1cblx0XHRcdGNvbnN0IHNjcmlwdGVudGl0eSA9IGVudGl0eXMuZmluZChcblx0XHRcdFx0KGVudGl0eSkgPT5cblx0XHRcdFx0XHRlbnRpdHkuZW50cnlUeXBlID09PSAnc2NyaXB0JyAmJiBlbnRpdHkubmFtZSA9PT0gJ2V2YWx1YXRlU2NyaXB0Jyxcblx0XHRcdClcblx0XHRcdGlmICh0eXBlb2Ygc2NyaXB0ZW50aXR5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRzY3JpcHRMb2FkRHVyYXRpb24gPSBzY3JpcHRlbnRpdHkuZHVyYXRpb25cblx0XHRcdH1cblx0XHRcdGNvbnN0IGZpcnN0RW50aXR5ID0gZW50aXR5cy5maW5kKFxuXHRcdFx0XHQoZW50aXR5KSA9PlxuXHRcdFx0XHRcdGVudGl0eS5lbnRyeVR5cGUgPT09ICdyZW5kZXInICYmIGVudGl0eS5uYW1lID09PSAnZmlyc3RSZW5kZXInLFxuXHRcdFx0KVxuXHRcdFx0aWYgKGZpcnN0RW50aXR5ICYmIHNjcmlwdGVudGl0eSAmJiBsYXVuY2hFbnRpdHkpIHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdCFhcmVJbk9yZGVyKGZpcnN0RW50aXR5LmR1cmF0aW9uLCBsYXVuY2hFbnRpdHkuZHVyYXRpb24pIHx8XG5cdFx0XHRcdFx0IWFyZUluT3JkZXIoc2NyaXB0ZW50aXR5LmR1cmF0aW9uLCBsYXVuY2hFbnRpdHkuZHVyYXRpb24pXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdGNvZGVEb3dubG9hZER1cmF0aW9uID1cblx0XHRcdFx0XHRsYXVuY2hFbnRpdHkuZHVyYXRpb24gLSBmaXJzdEVudGl0eS5kdXJhdGlvbiAtIHNjcmlwdGVudGl0eS5kdXJhdGlvblxuXHRcdFx0XHQvLyDotYTmupDkuIvovb3ml7bpl7TmmoLml7blrprkuLrvvJrpppbmrKHlkK/liqjml7bpl7Qt6ISa5pys5Yqg6L295pe26Ze0LeWIneasoea4suafk+aXtumXtFxuXHRcdFx0fVxuXHRcdFx0Y2FsbGJhY2soe1xuXHRcdFx0XHRzdGFydHVwRHVyYXRpb24sXG5cdFx0XHRcdHNjcmlwdExvYWREdXJhdGlvbixcblx0XHRcdFx0Y29kZURvd25sb2FkRHVyYXRpb24sXG5cdFx0XHR9KVxuXHRcdH0sXG5cdClcblx0cmV0dXJuIHtcblx0XHRzdG9wOiBzdWJzY3JpYmUudW5zdWJzY3JpYmUsXG5cdH1cbn1cbiIsImltcG9ydCB7IGV4dGVuZDJMZXYsIHdpdGhTbmFrZUNhc2VLZXlzLCBwZXJmb3JtRHJhdyB9IGZyb20gJy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IGJhc2VJbmZvIGZyb20gJy4uL2NvcmUvYmFzZUluZm8nXG5mdW5jdGlvbiBpc1RyYWNrZWQoY29uZmlndXJhdGlvbikge1xuXHRyZXR1cm4gcGVyZm9ybURyYXcoY29uZmlndXJhdGlvbi5zYW1wbGVSYXRlKVxufVxuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UnVtQXNzZW1ibHkoXG5cdGFwcGxpY2F0aW9uSWQsXG5cdGNvbmZpZ3VyYXRpb24sXG5cdGxpZmVDeWNsZSxcblx0cGFyZW50Q29udGV4dHMsXG4pIHtcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0ZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdHZhciBzdGFydFRpbWUgPSBkYXRhLnN0YXJ0VGltZVxuXHRcdFx0dmFyIHJhd1J1bUV2ZW50ID0gZGF0YS5yYXdSdW1FdmVudFxuXHRcdFx0dmFyIHZpZXdDb250ZXh0ID0gcGFyZW50Q29udGV4dHMuZmluZFZpZXcoc3RhcnRUaW1lKVxuXHRcdFx0Ly8gY29uc29sZS5sb2coXG5cdFx0XHQvLyBcdHZpZXdDb250ZXh0LFxuXHRcdFx0Ly8gXHR2aWV3Q29udGV4dCAmJiB2aWV3Q29udGV4dC5wYWdlICYmIHZpZXdDb250ZXh0LnBhZ2Uucm91dGUsXG5cdFx0XHQvLyBcdCd2aWV3Q29udGVudD09PT0nLFxuXHRcdFx0Ly8gKVxuXHRcdFx0aWYgKHJhd1J1bUV2ZW50LnR5cGUgPT09ICd2aWV3Jykge1xuXHRcdFx0XHQvLyBjb25zb2xlLmxvZyhcblx0XHRcdFx0Ly8gXHR2aWV3Q29udGV4dCxcblx0XHRcdFx0Ly8gXHR2aWV3Q29udGV4dC5wYWdlICYmIHZpZXdDb250ZXh0LnBhZ2Uucm91dGUsXG5cdFx0XHRcdC8vIFx0J3ZpZXdDb250ZXh0dmlld0NvbnRleHQ9PT09Jyxcblx0XHRcdFx0Ly8gKVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgZGV2aWNlQ29udGV4dCA9IHtcblx0XHRcdFx0ZGV2aWNlOiBiYXNlSW5mby5kZXZpY2VJbmZvLFxuXHRcdFx0fVxuXHRcdFx0aWYgKFxuXHRcdFx0XHRpc1RyYWNrZWQoY29uZmlndXJhdGlvbikgJiZcblx0XHRcdFx0KHZpZXdDb250ZXh0IHx8IHJhd1J1bUV2ZW50LnR5cGUgPT09ICdhcHAnKVxuXHRcdFx0KSB7XG5cdFx0XHRcdHZhciBhY3Rpb25Db250ZXh0ID0gcGFyZW50Q29udGV4dHMuZmluZEFjdGlvbihzdGFydFRpbWUpXG5cdFx0XHRcdHZhciBydW1Db250ZXh0ID0ge1xuXHRcdFx0XHRcdF9kZDoge1xuXHRcdFx0XHRcdFx0c2RrTmFtZTogY29uZmlndXJhdGlvbi5zZGtOYW1lLFxuXHRcdFx0XHRcdFx0c2RrVmVyc2lvbjogY29uZmlndXJhdGlvbi5zZGtWZXJzaW9uLFxuXHRcdFx0XHRcdFx0ZW52OiBjb25maWd1cmF0aW9uLmVudixcblx0XHRcdFx0XHRcdHZlcnNpb246IGNvbmZpZ3VyYXRpb24udmVyc2lvbixcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHRhZ3M6IGNvbmZpZ3VyYXRpb24udGFncyxcblx0XHRcdFx0XHRhcHBsaWNhdGlvbjoge1xuXHRcdFx0XHRcdFx0aWQ6IGFwcGxpY2F0aW9uSWQsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRkZXZpY2U6IHt9LFxuXHRcdFx0XHRcdGRhdGU6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuXHRcdFx0XHRcdHNlc3Npb246IHtcblx0XHRcdFx0XHRcdGlkOiBiYXNlSW5mby5nZXRTZXNzaW9uSWQoKSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHVzZXI6IHtcblx0XHRcdFx0XHRcdHVzZXJfaWQ6IGNvbmZpZ3VyYXRpb24udXNlcl9pZCB8fCBiYXNlSW5mby5nZXRDbGllbnRJRCgpLFxuXHRcdFx0XHRcdFx0aXNfc2lnbmluOiBjb25maWd1cmF0aW9uLnVzZXJfaWQgPyAnVCcgOiAnRicsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBydW1FdmVudCA9IGV4dGVuZDJMZXYoXG5cdFx0XHRcdFx0cnVtQ29udGV4dCxcblx0XHRcdFx0XHRkZXZpY2VDb250ZXh0LFxuXHRcdFx0XHRcdHZpZXdDb250ZXh0LFxuXHRcdFx0XHRcdGFjdGlvbkNvbnRleHQsXG5cdFx0XHRcdFx0cmF3UnVtRXZlbnQsXG5cdFx0XHRcdClcblxuXHRcdFx0XHR2YXIgc2VydmVyUnVtRXZlbnQgPSB3aXRoU25ha2VDYXNlS2V5cyhydW1FdmVudClcblx0XHRcdFx0Ly8gaWYgKFxuXHRcdFx0XHQvLyBcdHNlcnZlclJ1bUV2ZW50LnR5cGUgPT09ICd2aWV3JyB8fFxuXHRcdFx0XHQvLyBcdHNlcnZlclJ1bUV2ZW50LnR5cGUgPT09ICdhY3Rpb24nXG5cdFx0XHRcdC8vICkge1xuXHRcdFx0XHQvLyBcdGNvbnNvbGUubG9nKHNlcnZlclJ1bUV2ZW50LCAnc2VydmVyUnVtRXZlbnQnKVxuXHRcdFx0XHQvLyB9XG5cblx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUlVNX0VWRU5UX0NPTExFQ1RFRCwgc2VydmVyUnVtRXZlbnQpXG5cdFx0XHR9XG5cdFx0fSxcblx0KVxufVxuIiwiaW1wb3J0IHsgc3RhcnRBdXRvbWF0aWNFcnJvckNvbGxlY3Rpb24gfSBmcm9tICcuLi8uLi9jb3JlL2Vycm9yQ29sbGVjdGlvbidcbmltcG9ydCB7IFJ1bUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2hlbHBlci9lbnVtcydcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uLy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHtcblx0dXJsUGFyc2UsXG5cdHJlcGxhY2VOdW1iZXJDaGFyQnlQYXRoLFxuXHRnZXRTdGF0dXNHcm91cCxcbn0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0RXJyb3JDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbikge1xuXHRyZXR1cm4gZG9TdGFydEVycm9yQ29sbGVjdGlvbihcblx0XHRsaWZlQ3ljbGUsXG5cdFx0Y29uZmlndXJhdGlvbixcblx0XHRzdGFydEF1dG9tYXRpY0Vycm9yQ29sbGVjdGlvbihjb25maWd1cmF0aW9uKSxcblx0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZG9TdGFydEVycm9yQ29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24sIG9ic2VydmFibGUpIHtcblx0b2JzZXJ2YWJsZS5zdWJzY3JpYmUoZnVuY3Rpb24gKGVycm9yKSB7XG5cdFx0bGlmZUN5Y2xlLm5vdGlmeShcblx0XHRcdExpZmVDeWNsZUV2ZW50VHlwZS5SQVdfUlVNX0VWRU5UX0NPTExFQ1RFRCxcblx0XHRcdHByb2Nlc3NFcnJvcihlcnJvciksXG5cdFx0KVxuXHR9KVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzRXJyb3IoZXJyb3IpIHtcblx0dmFyIHJlc291cmNlID0gZXJyb3IucmVzb3VyY2Vcblx0aWYgKHJlc291cmNlKSB7XG5cdFx0dmFyIHVybE9iaiA9IHVybFBhcnNlKGVycm9yLnJlc291cmNlLnVybCkuZ2V0UGFyc2UoKVxuXHRcdHJlc291cmNlID0ge1xuXHRcdFx0bWV0aG9kOiBlcnJvci5yZXNvdXJjZS5tZXRob2QsXG5cdFx0XHRzdGF0dXM6IGVycm9yLnJlc291cmNlLnN0YXR1c0NvZGUsXG5cdFx0XHRzdGF0dXNHcm91cDogZ2V0U3RhdHVzR3JvdXAoZXJyb3IucmVzb3VyY2Uuc3RhdHVzQ29kZSksXG5cdFx0XHR1cmw6IGVycm9yLnJlc291cmNlLnVybCxcblx0XHRcdHVybEhvc3Q6IHVybE9iai5Ib3N0LFxuXHRcdFx0dXJsUGF0aDogdXJsT2JqLlBhdGgsXG5cdFx0XHR1cmxQYXRoR3JvdXA6IHJlcGxhY2VOdW1iZXJDaGFyQnlQYXRoKHVybE9iai5QYXRoKSxcblx0XHR9XG5cdH1cblx0dmFyIHJhd1J1bUV2ZW50ID0ge1xuXHRcdGRhdGU6IGVycm9yLnN0YXJ0VGltZSxcblx0XHRlcnJvcjoge1xuXHRcdFx0bWVzc2FnZTogZXJyb3IubWVzc2FnZSxcblx0XHRcdHJlc291cmNlOiByZXNvdXJjZSxcblx0XHRcdHNvdXJjZTogZXJyb3Iuc291cmNlLFxuXHRcdFx0c3RhY2s6IGVycm9yLnN0YWNrLFxuXHRcdFx0dHlwZTogZXJyb3IudHlwZSxcblx0XHRcdHN0YXJ0dGltZTogZXJyb3Iuc3RhcnRUaW1lLFxuXHRcdH0sXG5cdFx0dHlwZTogUnVtRXZlbnRUeXBlLkVSUk9SLFxuXHR9XG5cdHJldHVybiB7XG5cdFx0cmF3UnVtRXZlbnQ6IHJhd1J1bUV2ZW50LFxuXHRcdHN0YXJ0VGltZTogZXJyb3Iuc3RhcnRUaW1lLFxuXHR9XG59XG4iLCJpbXBvcnQgeyBleHRlbmQsIG5vdywgdGhyb3R0bGUsIFVVSUQsIGlzTnVtYmVyIH0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgdHJhY2tFdmVudENvdW50cyB9IGZyb20gJy4uL3RyYWNrRXZlbnRDb3VudHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9jb3JlL2xpZmVDeWNsZSdcbi8vIOWKq+aMgeWOn+Wwj+eoi+W6j0FwcOaWueazlVxuZXhwb3J0IHZhciBUSFJPVFRMRV9WSUVXX1VQREFURV9QRVJJT0QgPSAzMDAwXG5cbmV4cG9ydCBmdW5jdGlvbiByZXdyaXRlUGFnZShjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUpIHtcblx0Y29uc3Qgb3JpZ2luUGFnZSA9IFBhZ2Vcblx0Y29uc29sZS5sb2cob3JpZ2luUGFnZSwgJ29yaWdpblBhZ2U9PT09PScpXG5cdFBhZ2UgPSBmdW5jdGlvbiAocGFnZSkge1xuXHRcdC8vIOWQiOW5tuaWueazle+8jOaPkuWFpeiusOW9leiEmuacrFxuXHRcdHZhciBjdXJyZW50Vmlldyxcblx0XHRcdHN0YXJ0VGltZSA9IG5vdygpXG5cdFx0Y29uc29sZVxuXHRcdFx0LmxvZyhwYWdlLCAncGFnZT09PT09PScpXG5cdFx0XHRbKCdvblJlYWR5JywgJ29uU2hvdycsICdvbkxvYWQnLCAnb25VbmxvYWQnLCAnb25IaWRlJyldLmZvckVhY2goXG5cdFx0XHRcdChtZXRob2ROYW1lKSA9PiB7XG5cdFx0XHRcdFx0Y29uc3QgdXNlckRlZmluZWRNZXRob2QgPSBwYWdlW21ldGhvZE5hbWVdXG5cdFx0XHRcdFx0cGFnZVttZXRob2ROYW1lXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGNvbnNvbGUubG9nKG1ldGhvZE5hbWUsICdtZXRob2ROYW1lIHBhZ2UnKVxuXHRcdFx0XHRcdFx0aWYgKG1ldGhvZE5hbWUgPT09ICdvblNob3cnIHx8IG1ldGhvZE5hbWUgPT09ICdvbkxvYWQnKSB7XG5cdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgY3VycmVudFZpZXcgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgYWN0aXZlUGFnZSA9IGdldEFjdGl2ZVBhZ2UoKVxuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRWaWV3ID0gbmV3Vmlldyhcblx0XHRcdFx0XHRcdFx0XHRcdGxpZmVDeWNsZSxcblx0XHRcdFx0XHRcdFx0XHRcdGFjdGl2ZVBhZ2UgJiYgYWN0aXZlUGFnZS5yb3V0ZSxcblx0XHRcdFx0XHRcdFx0XHRcdHN0YXJ0VGltZSxcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Y3VycmVudFZpZXcgJiYgY3VycmVudFZpZXcuc2V0TG9hZEV2ZW50RW5kKG1ldGhvZE5hbWUpXG5cblx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0KG1ldGhvZE5hbWUgPT09ICdvblVubG9hZCcgfHxcblx0XHRcdFx0XHRcdFx0XHRtZXRob2ROYW1lID09PSAnb25IaWRlJyB8fFxuXHRcdFx0XHRcdFx0XHRcdG1ldGhvZE5hbWUgPT09ICdvblNob3cnKSAmJlxuXHRcdFx0XHRcdFx0XHRjdXJyZW50Vmlld1xuXHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRWaWV3LnRyaWdnZXJVcGRhdGUoKVxuXHRcdFx0XHRcdFx0XHRpZiAobWV0aG9kTmFtZSA9PT0gJ29uVW5sb2FkJyB8fCBtZXRob2ROYW1lID09PSAnb25IaWRlJykge1xuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRWaWV3LmVuZCgpXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiB1c2VyRGVmaW5lZE1ldGhvZCAmJiB1c2VyRGVmaW5lZE1ldGhvZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9LFxuXHRcdFx0KVxuXHRcdHJldHVybiBvcmlnaW5QYWdlKHBhZ2UpXG5cdH1cbn1cbmZ1bmN0aW9uIG5ld1ZpZXcobGlmZUN5Y2xlLCByb3V0ZSwgc3RhcnRUaW1lKSB7XG5cdGlmICh0eXBlb2Ygc3RhcnRUaW1lID09PSAndW5kZWZpbmVkJykge1xuXHRcdHN0YXJ0VGltZSA9IG5vdygpXG5cdH1cblx0dmFyIGlkID0gVVVJRCgpXG5cdHZhciBpc0FjdGl2ZSA9IHRydWVcblx0dmFyIGV2ZW50Q291bnRzID0ge1xuXHRcdGVycm9yQ291bnQ6IDAsXG5cdFx0cmVzb3VyY2VDb3VudDogMCxcblx0XHR1c2VyQWN0aW9uQ291bnQ6IDAsXG5cdH1cblx0dmFyIHNldGRhdGFDb3VudCA9IDBcblxuXHR2YXIgZG9jdW1lbnRWZXJzaW9uID0gMFxuXHR2YXIgc2V0ZGF0YUR1cmF0aW9uID0gMFxuXHR2YXIgbG9hZGluZ0R1cmF0aW9uID0gMFxuXHR2YXIgbG9hZGluZ1RpbWVcblx0dmFyIHNob3dUaW1lXG5cdHZhciBvbmxvYWQyb25zaG93VGltZVxuXHR2YXIgb25zaG93Mm9ucmVhZHlcblx0dmFyIHN0YXlUaW1lXG5cdHZhciBmcHQsIGZtcFxuXHRsaWZlQ3ljbGUubm90aWZ5KExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX0NSRUFURUQsIHtcblx0XHRpZCxcblx0XHRzdGFydFRpbWUsXG5cdFx0cm91dGUsXG5cdH0pXG5cdHZhciBzY2hlZHVsZVZpZXdVcGRhdGUgPSB0aHJvdHRsZShcblx0XHR0cmlnZ2VyVmlld1VwZGF0ZSxcblx0XHRUSFJPVFRMRV9WSUVXX1VQREFURV9QRVJJT0QsXG5cdFx0e1xuXHRcdFx0bGVhZGluZzogZmFsc2UsXG5cdFx0fSxcblx0KVxuXHR2YXIgY2FuY2VsU2NoZWR1bGVWaWV3VXBkYXRlID0gc2NoZWR1bGVWaWV3VXBkYXRlLmNhbmNlbFxuXHR2YXIgX3RyYWNrRXZlbnRDb3VudHMgPSB0cmFja0V2ZW50Q291bnRzKFxuXHRcdGxpZmVDeWNsZSxcblx0XHRmdW5jdGlvbiAobmV3RXZlbnRDb3VudHMpIHtcblx0XHRcdGV2ZW50Q291bnRzID0gbmV3RXZlbnRDb3VudHNcblx0XHRcdHNjaGVkdWxlVmlld1VwZGF0ZSgpXG5cdFx0fSxcblx0KVxuXHR2YXIgc3RvcEV2ZW50Q291bnRzVHJhY2tpbmcgPSBfdHJhY2tFdmVudENvdW50cy5zdG9wXG5cdHZhciBfdHJhY2tGcHRUaW1lID0gdHJhY2tGcHRUaW1lKGxpZmVDeWNsZSwgZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG5cdFx0ZnB0ID0gZHVyYXRpb25cblx0XHRzY2hlZHVsZVZpZXdVcGRhdGUoKVxuXHR9KVxuXHR2YXIgc3RvcEZwdFRyYWNraW5nID0gX3RyYWNrRnB0VGltZS5zdG9wXG5cdHZhciBfdHJhY2tTZXREYXRhVGltZSA9IHRyYWNrU2V0RGF0YVRpbWUobGlmZUN5Y2xlLCBmdW5jdGlvbiAoZHVyYXRpb24pIHtcblx0XHRpZiAoaXNOdW1iZXIoZHVyYXRpb24pKSB7XG5cdFx0XHRzZXRkYXRhRHVyYXRpb24gKz0gZHVyYXRpb25cblx0XHRcdHNldGRhdGFDb3VudCsrXG5cdFx0XHRzY2hlZHVsZVZpZXdVcGRhdGUoKVxuXHRcdH1cblx0fSlcblx0dmFyIHN0b3BTZXREYXRhVHJhY2tpbmcgPSBfdHJhY2tTZXREYXRhVGltZS5zdG9wXG5cdHZhciBfdHJhY2tMb2FkaW5nVGltZSA9IHRyYWNrTG9hZGluZ1RpbWUobGlmZUN5Y2xlLCBmdW5jdGlvbiAoZHVyYXRpb24pIHtcblx0XHRpZiAoaXNOdW1iZXIoZHVyYXRpb24pKSB7XG5cdFx0XHRsb2FkaW5nRHVyYXRpb24gPSBkdXJhdGlvblxuXHRcdFx0c2NoZWR1bGVWaWV3VXBkYXRlKClcblx0XHR9XG5cdH0pXG5cdHZhciBzdG9wTG9hZGluZ1RpbWVUcmFja2luZyA9IF90cmFja0xvYWRpbmdUaW1lLnN0b3BcblxuXHR2YXIgc2V0TG9hZEV2ZW50RW5kID0gZnVuY3Rpb24gKHR5cGUpIHtcblx0XHRpZiAodHlwZSA9PT0gJ29uTG9hZCcpIHtcblx0XHRcdGxvYWRpbmdUaW1lID0gbm93KClcblx0XHR9IGVsc2UgaWYgKHR5cGUgPT09ICdvblNob3cnKSB7XG5cdFx0XHRzaG93VGltZSA9IG5vdygpXG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBvbmxvYWQyb25zaG93VGltZSA9PT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0dHlwZW9mIGxvYWRpbmdUaW1lICE9PSAndW5kZWZpbmVkJ1xuXHRcdFx0KSB7XG5cdFx0XHRcdG9ubG9hZDJvbnNob3dUaW1lID0gc2hvd1RpbWUgLSBsb2FkaW5nVGltZVxuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodHlwZSA9PT0gJ29uUmVhZHknKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdHR5cGVvZiBvbnNob3cyb25yZWFkeSA9PT0gJ3VuZGVmaW5lZCcgJiZcblx0XHRcdFx0dHlwZW9mIHNob3dUaW1lICE9PSAndW5kZWZpbmVkJ1xuXHRcdFx0KSB7XG5cdFx0XHRcdG9uc2hvdzJvbnJlYWR5ID0gbm93KCkgLSBzaG93VGltZVxuXHRcdFx0fVxuXHRcdFx0aWYgKHR5cGVvZiBmbXAgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRcdGZtcCA9IG5vdygpIC0gc3RhcnRUaW1lIC8vIOS7juW8gOWPkeiAheinkuW6pueci++8jOWwj+eoi+W6j+mmluWxj+a4suafk+WujOaIkOeahOagh+W/l+aYr+mmlumhtSBQYWdlLm9uUmVhZHkg5LqL5Lu26Kem5Y+R44CCXG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0eXBlID09PSAnb25IaWRlJyB8fCB0eXBlID09PSAnb25VbmxvYWQnKSB7XG5cdFx0XHRpZiAodHlwZW9mIHNob3dUaW1lICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRzdGF5VGltZSA9IG5vdygpIC0gc2hvd1RpbWVcblx0XHRcdH1cblx0XHRcdGlzQWN0aXZlID0gZmFsc2Vcblx0XHR9XG5cdFx0dHJpZ2dlclZpZXdVcGRhdGUoKVxuXHR9XG5cdGZ1bmN0aW9uIHRyaWdnZXJWaWV3VXBkYXRlKCkge1xuXHRcdGRvY3VtZW50VmVyc2lvbiArPSAxXG5cdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuVklFV19VUERBVEVELCB7XG5cdFx0XHRkb2N1bWVudFZlcnNpb246IGRvY3VtZW50VmVyc2lvbixcblx0XHRcdGV2ZW50Q291bnRzOiBldmVudENvdW50cyxcblx0XHRcdGlkOiBpZCxcblx0XHRcdGxvYWRpbmdUaW1lOiBsb2FkaW5nRHVyYXRpb24sXG5cdFx0XHRzdGF5VGltZSxcblx0XHRcdG9ubG9hZDJvbnNob3dUaW1lLFxuXHRcdFx0b25zaG93Mm9ucmVhZHksXG5cdFx0XHRzZXRkYXRhRHVyYXRpb24sXG5cdFx0XHRzZXRkYXRhQ291bnQsXG5cdFx0XHRmbXAsXG5cdFx0XHRmcHQsXG5cdFx0XHRzdGFydFRpbWU6IHN0YXJ0VGltZSxcblx0XHRcdHJvdXRlOiByb3V0ZSxcblx0XHRcdGR1cmF0aW9uOiBub3coKSAtIHN0YXJ0VGltZSxcblx0XHRcdGlzQWN0aXZlOiBpc0FjdGl2ZSxcblx0XHR9KVxuXHR9XG5cdHJldHVybiB7XG5cdFx0c2NoZWR1bGVVcGRhdGU6IHNjaGVkdWxlVmlld1VwZGF0ZSxcblx0XHRzZXRMb2FkRXZlbnRFbmQsXG5cdFx0dHJpZ2dlclVwZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y2FuY2VsU2NoZWR1bGVWaWV3VXBkYXRlKClcblx0XHRcdHRyaWdnZXJWaWV3VXBkYXRlKClcblx0XHR9LFxuXHRcdGVuZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0c3RvcEV2ZW50Q291bnRzVHJhY2tpbmcoKVxuXHRcdFx0c3RvcEZwdFRyYWNraW5nKClcblx0XHRcdGNhbmNlbFNjaGVkdWxlVmlld1VwZGF0ZSgpXG5cdFx0XHRzdG9wU2V0RGF0YVRyYWNraW5nKClcblx0XHRcdHN0b3BMb2FkaW5nVGltZVRyYWNraW5nKClcblx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlZJRVdfRU5ERUQsIHsgZW5kQ2xvY2tzOiBub3coKSB9KVxuXHRcdH0sXG5cdH1cbn1cbmZ1bmN0aW9uIHRyYWNrRnB0VGltZShsaWZlQ3ljbGUsIGNhbGxiYWNrKSB7XG5cdHZhciBzdWJzY3JpYmUgPSBsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5QRVJGT1JNQU5DRV9FTlRSWV9DT0xMRUNURUQsXG5cdFx0ZnVuY3Rpb24gKGVudGl0eXMpIHtcblx0XHRcdGNvbnN0IGZpcnN0UmVuZGVyRW50aXR5ID0gZW50aXR5cy5maW5kKFxuXHRcdFx0XHQoZW50aXR5KSA9PlxuXHRcdFx0XHRcdGVudGl0eS5lbnRyeVR5cGUgPT09ICdyZW5kZXInICYmIGVudGl0eS5uYW1lID09PSAnZmlyc3RSZW5kZXInLFxuXHRcdFx0KVxuXG5cdFx0XHRpZiAodHlwZW9mIGZpcnN0UmVuZGVyRW50aXR5ICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRjYWxsYmFjayhmaXJzdFJlbmRlckVudGl0eS5kdXJhdGlvbilcblx0XHRcdH1cblx0XHR9LFxuXHQpXG5cdHJldHVybiB7XG5cdFx0c3RvcDogc3Vic2NyaWJlLnVuc3Vic2NyaWJlLFxuXHR9XG59XG5mdW5jdGlvbiB0cmFja0xvYWRpbmdUaW1lKGxpZmVDeWNsZSwgY2FsbGJhY2spIHtcblx0dmFyIHN1YnNjcmliZSA9IGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlBFUkZPUk1BTkNFX0VOVFJZX0NPTExFQ1RFRCxcblx0XHRmdW5jdGlvbiAoZW50aXR5cykge1xuXHRcdFx0Y29uc3QgbmF2aWdhdGlvbkVuaXR5ID0gZW50aXR5cy5maW5kKFxuXHRcdFx0XHQoZW50aXR5KSA9PiBlbnRpdHkuZW50cnlUeXBlID09PSAnbmF2aWdhdGlvbicsXG5cdFx0XHQpXG5cdFx0XHRpZiAodHlwZW9mIG5hdmlnYXRpb25Fbml0eSAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0Y2FsbGJhY2sobmF2aWdhdGlvbkVuaXR5LmR1cmF0aW9uKVxuXHRcdFx0fVxuXHRcdH0sXG5cdClcblx0cmV0dXJuIHtcblx0XHRzdG9wOiBzdWJzY3JpYmUudW5zdWJzY3JpYmUsXG5cdH1cbn1cbmZ1bmN0aW9uIHRyYWNrU2V0RGF0YVRpbWUobGlmZUN5Y2xlLCBjYWxsYmFjaykge1xuXHR2YXIgc3Vic2NyaWJlID0gbGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9TRVRfREFUQV9VUERBVEUsXG5cdFx0ZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRcdGlmICghZGF0YSkgcmV0dXJuXG5cdFx0XHRjYWxsYmFjayhkYXRhLnVwZGF0ZUVuZFRpbWVzdGFtcCAtIGRhdGEucGVuZGluZ1N0YXJ0VGltZXN0YW1wKVxuXHRcdH0sXG5cdClcblx0cmV0dXJuIHtcblx0XHRzdG9wOiBzdWJzY3JpYmUudW5zdWJzY3JpYmUsXG5cdH1cbn1cbmZ1bmN0aW9uIGdldEFjdGl2ZVBhZ2UoKSB7XG5cdGNvbnN0IGN1clBhZ2VzID0gZ2V0Q3VycmVudFBhZ2VzKClcblx0aWYgKGN1clBhZ2VzLmxlbmd0aCkge1xuXHRcdHJldHVybiBjdXJQYWdlc1tjdXJQYWdlcy5sZW5ndGggLSAxXVxuXHR9XG5cdHJldHVybiB7fVxufVxuIiwiaW1wb3J0IHsgcmV3cml0ZVBhZ2UgfSBmcm9tICcuL2luZGV4J1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHsgbXNUb05zIH0gZnJvbSAnLi4vLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29yZS9saWZlQ3ljbGUnXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRWaWV3Q29sbGVjdGlvbihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pIHtcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuVklFV19VUERBVEVELCBmdW5jdGlvbiAodmlldykge1xuXHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0XHRwcm9jZXNzVmlld1VwZGF0ZSh2aWV3KSxcblx0XHQpXG5cdH0pXG5cblx0cmV0dXJuIHJld3JpdGVQYWdlKGNvbmZpZ3VyYXRpb24sIGxpZmVDeWNsZSlcbn1cbmZ1bmN0aW9uIHByb2Nlc3NWaWV3VXBkYXRlKHZpZXcpIHtcblx0dmFyIGFwZGV4TGV2ZWxcblx0aWYgKHZpZXcuZm1wKSB7XG5cdFx0YXBkZXhMZXZlbCA9IHBhcnNlSW50KE51bWJlcih2aWV3LmZtcCkgLyAxMDAwKVxuXHRcdGFwZGV4TGV2ZWwgPSBhcGRleExldmVsID4gOSA/IDkgOiBhcGRleExldmVsXG5cdH1cblx0dmFyIHZpZXdFdmVudCA9IHtcblx0XHRfZGQ6IHtcblx0XHRcdGRvY3VtZW50VmVyc2lvbjogdmlldy5kb2N1bWVudFZlcnNpb24sXG5cdFx0fSxcblx0XHRkYXRlOiB2aWV3LnN0YXJ0VGltZSxcblx0XHR0eXBlOiBSdW1FdmVudFR5cGUuVklFVyxcblx0XHRwYWdlOiB7XG5cdFx0XHRhY3Rpb246IHtcblx0XHRcdFx0Y291bnQ6IHZpZXcuZXZlbnRDb3VudHMudXNlckFjdGlvbkNvdW50LFxuXHRcdFx0fSxcblx0XHRcdGVycm9yOiB7XG5cdFx0XHRcdGNvdW50OiB2aWV3LmV2ZW50Q291bnRzLmVycm9yQ291bnQsXG5cdFx0XHR9LFxuXHRcdFx0c2V0ZGF0YToge1xuXHRcdFx0XHRjb3VudDogdmlldy5zZXRkYXRhQ291bnQsXG5cdFx0XHR9LFxuXHRcdFx0c2V0ZGF0YV9kdXJhdGlvbjogbXNUb05zKHZpZXcuc2V0ZGF0YUR1cmF0aW9uKSxcblx0XHRcdGxvYWRpbmdUaW1lOiBtc1RvTnModmlldy5sb2FkaW5nVGltZSksXG5cdFx0XHRzdGF5VGltZTogbXNUb05zKHZpZXcuc3RheVRpbWUpLFxuXHRcdFx0b25sb2FkMm9uc2hvdzogbXNUb05zKHZpZXcub25sb2FkMm9uc2hvd1RpbWUpLFxuXHRcdFx0b25zaG93Mm9ucmVhZHk6IG1zVG9Ocyh2aWV3Lm9uc2hvdzJvbnJlYWR5KSxcblx0XHRcdGZwdDogbXNUb05zKHZpZXcuZnB0KSxcblx0XHRcdGZtcDogbXNUb05zKHZpZXcuZm1wKSxcblx0XHRcdGlzQWN0aXZlOiB2aWV3LmlzQWN0aXZlLFxuXHRcdFx0YXBkZXhMZXZlbCxcblx0XHRcdC8vIGxvbmdUYXNrOiB7XG5cdFx0XHQvLyAgIGNvdW50OiB2aWV3LmV2ZW50Q291bnRzLmxvbmdUYXNrQ291bnRcblx0XHRcdC8vIH0sXG5cdFx0XHRyZXNvdXJjZToge1xuXHRcdFx0XHRjb3VudDogdmlldy5ldmVudENvdW50cy5yZXNvdXJjZUNvdW50LFxuXHRcdFx0fSxcblx0XHRcdHRpbWVTcGVudDogbXNUb05zKHZpZXcuZHVyYXRpb24pLFxuXHRcdH0sXG5cdH1cblx0cmV0dXJuIHtcblx0XHRyYXdSdW1FdmVudDogdmlld0V2ZW50LFxuXHRcdHN0YXJ0VGltZTogdmlldy5zdGFydFRpbWUsXG5cdH1cbn1cbiIsImltcG9ydCB7IE9ORV9NSU5VVEUsIE9ORV9IT1VSIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHsgZWFjaCwgbm93IH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5leHBvcnQgdmFyIFZJRVdfQ09OVEVYVF9USU1FX09VVF9ERUxBWSA9IDQgKiBPTkVfSE9VUlxuZXhwb3J0IHZhciBDTEVBUl9PTERfQ09OVEVYVFNfSU5URVJWQUwgPSBPTkVfTUlOVVRFXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFBhcmVudENvbnRleHRzKGxpZmVDeWNsZSkge1xuXHR2YXIgY3VycmVudFZpZXdcblx0dmFyIGN1cnJlbnRBY3Rpb25cblx0dmFyIHByZXZpb3VzVmlld3MgPSBbXVxuXHR2YXIgcHJldmlvdXNBY3Rpb25zID0gW11cblx0bGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuVklFV19DUkVBVEVELFxuXHRcdGZ1bmN0aW9uIChjdXJyZW50Q29udGV4dCkge1xuXHRcdFx0Y3VycmVudFZpZXcgPSBjdXJyZW50Q29udGV4dFxuXHRcdH0sXG5cdClcblxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5WSUVXX1VQREFURUQsXG5cdFx0ZnVuY3Rpb24gKGN1cnJlbnRDb250ZXh0KSB7XG5cdFx0XHQvLyBBIHZpZXcgY2FuIGJlIHVwZGF0ZWQgYWZ0ZXIgaXRzIGVuZC4gIFdlIGhhdmUgdG8gZW5zdXJlIHRoYXQgdGhlIHZpZXcgYmVpbmcgdXBkYXRlZCBpcyB0aGVcblx0XHRcdC8vIG1vc3QgcmVjZW50bHkgY3JlYXRlZC5cblx0XHRcdGlmIChjdXJyZW50VmlldyAmJiBjdXJyZW50Vmlldy5pZCA9PT0gY3VycmVudENvbnRleHQuaWQpIHtcblx0XHRcdFx0Y3VycmVudFZpZXcgPSBjdXJyZW50Q29udGV4dFxuXHRcdFx0fVxuXHRcdH0sXG5cdClcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuVklFV19FTkRFRCwgZnVuY3Rpb24gKGRhdGEpIHtcblx0XHRpZiAoY3VycmVudFZpZXcpIHtcblx0XHRcdHByZXZpb3VzVmlld3MudW5zaGlmdCh7XG5cdFx0XHRcdGVuZFRpbWU6IGRhdGEuZW5kQ2xvY2tzLFxuXHRcdFx0XHRjb250ZXh0OiBidWlsZEN1cnJlbnRWaWV3Q29udGV4dCgpLFxuXHRcdFx0XHRzdGFydFRpbWU6IGN1cnJlbnRWaWV3LnN0YXJ0VGltZSxcblx0XHRcdH0pXG5cdFx0XHRjdXJyZW50VmlldyA9IHVuZGVmaW5lZFxuXHRcdH1cblx0fSlcblx0bGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuQVVUT19BQ1RJT05fQ1JFQVRFRCxcblx0XHRmdW5jdGlvbiAoY3VycmVudENvbnRleHQpIHtcblx0XHRcdGN1cnJlbnRBY3Rpb24gPSBjdXJyZW50Q29udGV4dFxuXHRcdH0sXG5cdClcblxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdExpZmVDeWNsZUV2ZW50VHlwZS5BVVRPX0FDVElPTl9DT01QTEVURUQsXG5cdFx0ZnVuY3Rpb24gKGFjdGlvbikge1xuXHRcdFx0aWYgKGN1cnJlbnRBY3Rpb24pIHtcblx0XHRcdFx0cHJldmlvdXNBY3Rpb25zLnVuc2hpZnQoe1xuXHRcdFx0XHRcdGNvbnRleHQ6IGJ1aWxkQ3VycmVudEFjdGlvbkNvbnRleHQoKSxcblx0XHRcdFx0XHRlbmRUaW1lOiBjdXJyZW50QWN0aW9uLnN0YXJ0Q2xvY2tzICsgYWN0aW9uLmR1cmF0aW9uLFxuXHRcdFx0XHRcdHN0YXJ0VGltZTogY3VycmVudEFjdGlvbi5zdGFydENsb2Nrcyxcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHRcdGN1cnJlbnRBY3Rpb24gPSB1bmRlZmluZWRcblx0XHR9LFxuXHQpXG5cblx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuQVVUT19BQ1RJT05fRElTQ0FSREVELCBmdW5jdGlvbiAoKSB7XG5cdFx0Y3VycmVudEFjdGlvbiA9IHVuZGVmaW5lZFxuXHR9KVxuXHRsaWZlQ3ljbGUuc3Vic2NyaWJlKExpZmVDeWNsZUV2ZW50VHlwZS5TRVNTSU9OX1JFTkVXRUQsIGZ1bmN0aW9uICgpIHtcblx0XHRwcmV2aW91c1ZpZXdzID0gW11cblx0XHRwcmV2aW91c0FjdGlvbnMgPSBbXVxuXHRcdGN1cnJlbnRWaWV3ID0gdW5kZWZpbmVkXG5cdFx0Y3VycmVudEFjdGlvbiA9IHVuZGVmaW5lZFxuXHR9KVxuXHR2YXIgY2xlYXJPbGRDb250ZXh0c0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuXHRcdGNsZWFyT2xkQ29udGV4dHMocHJldmlvdXNWaWV3cywgVklFV19DT05URVhUX1RJTUVfT1VUX0RFTEFZKVxuXHR9LCBDTEVBUl9PTERfQ09OVEVYVFNfSU5URVJWQUwpXG5cblx0ZnVuY3Rpb24gY2xlYXJPbGRDb250ZXh0cyhwcmV2aW91c0NvbnRleHRzLCB0aW1lT3V0RGVsYXkpIHtcblx0XHR2YXIgb2xkVGltZVRocmVzaG9sZCA9IG5vdygpIC0gdGltZU91dERlbGF5XG5cdFx0d2hpbGUgKFxuXHRcdFx0cHJldmlvdXNDb250ZXh0cy5sZW5ndGggPiAwICYmXG5cdFx0XHRwcmV2aW91c0NvbnRleHRzW3ByZXZpb3VzQ29udGV4dHMubGVuZ3RoIC0gMV0uc3RhcnRUaW1lIDwgb2xkVGltZVRocmVzaG9sZFxuXHRcdCkge1xuXHRcdFx0cHJldmlvdXNDb250ZXh0cy5wb3AoKVxuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBidWlsZEN1cnJlbnRBY3Rpb25Db250ZXh0KCkge1xuXHRcdHJldHVybiB7IHVzZXJBY3Rpb246IHsgaWQ6IGN1cnJlbnRBY3Rpb24uaWQgfSB9XG5cdH1cblx0ZnVuY3Rpb24gYnVpbGRDdXJyZW50Vmlld0NvbnRleHQoKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2U6IHtcblx0XHRcdFx0aWQ6IGN1cnJlbnRWaWV3LmlkLFxuXHRcdFx0XHRyZWZlcmVyOlxuXHRcdFx0XHRcdChwcmV2aW91c1ZpZXdzLmxlbmd0aCAmJlxuXHRcdFx0XHRcdFx0cHJldmlvdXNWaWV3c1twcmV2aW91c1ZpZXdzLmxlbmd0aCAtIDFdLmNvbnRleHQucGFnZS5yb3V0ZSkgfHxcblx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdHJvdXRlOiBjdXJyZW50Vmlldy5yb3V0ZSxcblx0XHRcdH0sXG5cdFx0fVxuXHR9XG5cblx0ZnVuY3Rpb24gZmluZENvbnRleHQoXG5cdFx0YnVpbGRDb250ZXh0LFxuXHRcdHByZXZpb3VzQ29udGV4dHMsXG5cdFx0Y3VycmVudENvbnRleHQsXG5cdFx0c3RhcnRUaW1lLFxuXHQpIHtcblx0XHRpZiAoc3RhcnRUaW1lID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBjdXJyZW50Q29udGV4dCA/IGJ1aWxkQ29udGV4dCgpIDogdW5kZWZpbmVkXG5cdFx0fVxuXHRcdGlmIChjdXJyZW50Q29udGV4dCAmJiBzdGFydFRpbWUgPj0gY3VycmVudENvbnRleHQuc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gYnVpbGRDb250ZXh0KClcblx0XHR9XG5cdFx0dmFyIGZsYWcgPSB1bmRlZmluZWRcblx0XHRlYWNoKHByZXZpb3VzQ29udGV4dHMsIGZ1bmN0aW9uIChwcmV2aW91c0NvbnRleHQpIHtcblx0XHRcdGlmIChzdGFydFRpbWUgPiBwcmV2aW91c0NvbnRleHQuZW5kVGltZSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2Vcblx0XHRcdH1cblx0XHRcdGlmIChzdGFydFRpbWUgPj0gcHJldmlvdXNDb250ZXh0LnN0YXJ0VGltZSkge1xuXHRcdFx0XHRmbGFnID0gcHJldmlvdXNDb250ZXh0LmNvbnRleHRcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0fSlcblxuXHRcdHJldHVybiBmbGFnXG5cdH1cblxuXHR2YXIgcGFyZW50Q29udGV4dHMgPSB7XG5cdFx0ZmluZFZpZXc6IGZ1bmN0aW9uIChzdGFydFRpbWUpIHtcblx0XHRcdHJldHVybiBmaW5kQ29udGV4dChcblx0XHRcdFx0YnVpbGRDdXJyZW50Vmlld0NvbnRleHQsXG5cdFx0XHRcdHByZXZpb3VzVmlld3MsXG5cdFx0XHRcdGN1cnJlbnRWaWV3LFxuXHRcdFx0XHRzdGFydFRpbWUsXG5cdFx0XHQpXG5cdFx0fSxcblx0XHRmaW5kQWN0aW9uOiBmdW5jdGlvbiAoc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gZmluZENvbnRleHQoXG5cdFx0XHRcdGJ1aWxkQ3VycmVudEFjdGlvbkNvbnRleHQsXG5cdFx0XHRcdHByZXZpb3VzQWN0aW9ucyxcblx0XHRcdFx0Y3VycmVudEFjdGlvbixcblx0XHRcdFx0c3RhcnRUaW1lLFxuXHRcdFx0KVxuXHRcdH0sXG5cblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjbGVhckludGVydmFsKGNsZWFyT2xkQ29udGV4dHNJbnRlcnZhbClcblx0XHR9LFxuXHR9XG5cdHJldHVybiBwYXJlbnRDb250ZXh0c1xufVxuIiwiaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5pbXBvcnQgeyBzZGsgfSBmcm9tICcuLi9jb3JlL3NkaydcbmV4cG9ydCBmdW5jdGlvbiBzdGFydFBhZ2VQZXJmb3JtYW5jZU9ic2VydmFibGUobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdGlmICghIXNkay5nZXRQZXJmb3JtYW5jZSkge1xuXHRcdGNvbnN0IHBlcmZvcm1hbmNlID0gc2RrLmdldFBlcmZvcm1hbmNlKClcblx0XHRjb25zdCBvYnNlcnZlciA9IHBlcmZvcm1hbmNlLmNyZWF0ZU9ic2VydmVyKChlbnRyeUxpc3QpID0+IHtcblx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRcdExpZmVDeWNsZUV2ZW50VHlwZS5QRVJGT1JNQU5DRV9FTlRSWV9DT0xMRUNURUQsXG5cdFx0XHRcdGVudHJ5TGlzdC5nZXRFbnRyaWVzKCksXG5cdFx0XHQpXG5cdFx0fSlcblx0XHRvYnNlcnZlci5vYnNlcnZlKHsgZW50cnlUeXBlczogWydyZW5kZXInLCAnc2NyaXB0JywgJ25hdmlnYXRpb24nXSB9KVxuXHR9XG59XG4iLCJpbXBvcnQgeyBzdGFydFhoclByb3h5IH0gZnJvbSAnLi4vY29yZS94aHJQcm94eSdcbmltcG9ydCB7IHN0YXJ0RG93bmxvYWRQcm94eSB9IGZyb20gJy4uL2NvcmUvZG93bmxvYWRQcm94eSdcbmltcG9ydCB7IExpZmVDeWNsZUV2ZW50VHlwZSB9IGZyb20gJy4uL2NvcmUvbGlmZUN5Y2xlJ1xuaW1wb3J0IHsgaXNPYmplY3QgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBpc0FsbG93ZWRSZXF1ZXN0VXJsIH0gZnJvbSAnLi4vcnVtRXZlbnRzQ29sbGVjdGlvbi9yZXNvdXJjZS9yZXNvdXJjZVV0aWxzJ1xudmFyIG5leHRSZXF1ZXN0SW5kZXggPSAxXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFJlcXVlc3RDb2xsZWN0aW9uKGxpZmVDeWNsZSwgY29uZmlndXJhdGlvbikge1xuXHR0cmFja1hocihsaWZlQ3ljbGUsIGNvbmZpZ3VyYXRpb24pXG5cdHRyYWNrRG93bmxvYWQobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKVxufVxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoaGVhZGVyKSB7XG5cdC8vIOWkp+Wwj+WGmeWFvOWuuVxuXHRpZiAoIWlzT2JqZWN0KGhlYWRlcikpIHJldHVybiBoZWFkZXJcblx0dmFyIHJlcyA9IHt9XG5cdE9iamVjdC5rZXlzKGhlYWRlcikuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0cmVzW2tleS50b0xvd2VyQ2FzZSgpXSA9IGhlYWRlcltrZXldXG5cdH0pXG5cdHJldHVybiByZXNcbn1cbmZ1bmN0aW9uIGdldEhlYWRlclN0cmluZyhoZWFkZXIpIHtcblx0aWYgKCFpc09iamVjdChoZWFkZXIpKSByZXR1cm4gaGVhZGVyXG5cdHZhciBoZWFkZXJTdHIgPSAnJ1xuXHRPYmplY3Qua2V5cyhoZWFkZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGhlYWRlclN0ciArPSBrZXkgKyAnOicgKyBoZWFkZXJba2V5XSArICc7J1xuXHR9KVxuXHRyZXR1cm4gaGVhZGVyU3RyXG59XG5leHBvcnQgZnVuY3Rpb24gdHJhY2tYaHIobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdHZhciB4aHJQcm94eSA9IHN0YXJ0WGhyUHJveHkoKVxuXHR4aHJQcm94eS5iZWZvcmVTZW5kKGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0aWYgKGlzQWxsb3dlZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgY29udGV4dC51cmwpKSB7XG5cdFx0XHRjb250ZXh0LnJlcXVlc3RJbmRleCA9IGdldE5leHRSZXF1ZXN0SW5kZXgoKVxuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUkVRVUVTVF9TVEFSVEVELCB7XG5cdFx0XHRcdHJlcXVlc3RJbmRleDogY29udGV4dC5yZXF1ZXN0SW5kZXgsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0eGhyUHJveHkub25SZXF1ZXN0Q29tcGxldGUoZnVuY3Rpb24gKGNvbnRleHQpIHtcblx0XHRpZiAoaXNBbGxvd2VkUmVxdWVzdFVybChjb25maWd1cmF0aW9uLCBjb250ZXh0LnVybCkpIHtcblx0XHRcdGxpZmVDeWNsZS5ub3RpZnkoTGlmZUN5Y2xlRXZlbnRUeXBlLlJFUVVFU1RfQ09NUExFVEVELCB7XG5cdFx0XHRcdGR1cmF0aW9uOiBjb250ZXh0LmR1cmF0aW9uLFxuXHRcdFx0XHRtZXRob2Q6IGNvbnRleHQubWV0aG9kLFxuXHRcdFx0XHRyZXF1ZXN0SW5kZXg6IGNvbnRleHQucmVxdWVzdEluZGV4LFxuXHRcdFx0XHRwZXJmb3JtYW5jZTogY29udGV4dC5wcm9maWxlLFxuXHRcdFx0XHRyZXNwb25zZTogY29udGV4dC5yZXNwb25zZSxcblx0XHRcdFx0c3RhcnRUaW1lOiBjb250ZXh0LnN0YXJ0VGltZSxcblx0XHRcdFx0c3RhdHVzOiBjb250ZXh0LnN0YXR1cyxcblx0XHRcdFx0dHlwZTogY29udGV4dC50eXBlLFxuXHRcdFx0XHR1cmw6IGNvbnRleHQudXJsLFxuXHRcdFx0fSlcblx0XHR9XG5cdH0pXG5cdHJldHVybiB4aHJQcm94eVxufVxuZXhwb3J0IGZ1bmN0aW9uIHRyYWNrRG93bmxvYWQobGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdHZhciBkd29ubG9hZFByb3h5ID0gc3RhcnREb3dubG9hZFByb3h5KClcblx0ZHdvbmxvYWRQcm94eS5iZWZvcmVTZW5kKGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cdFx0aWYgKGlzQWxsb3dlZFJlcXVlc3RVcmwoY29uZmlndXJhdGlvbiwgY29udGV4dC51cmwpKSB7XG5cdFx0XHRjb250ZXh0LnJlcXVlc3RJbmRleCA9IGdldE5leHRSZXF1ZXN0SW5kZXgoKVxuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUkVRVUVTVF9TVEFSVEVELCB7XG5cdFx0XHRcdHJlcXVlc3RJbmRleDogY29udGV4dC5yZXF1ZXN0SW5kZXgsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0ZHdvbmxvYWRQcm94eS5vblJlcXVlc3RDb21wbGV0ZShmdW5jdGlvbiAoY29udGV4dCkge1xuXHRcdGlmIChpc0FsbG93ZWRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIGNvbnRleHQudXJsKSkge1xuXHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUkVRVUVTVF9DT01QTEVURUQsIHtcblx0XHRcdFx0ZHVyYXRpb246IGNvbnRleHQuZHVyYXRpb24sXG5cdFx0XHRcdG1ldGhvZDogY29udGV4dC5tZXRob2QsXG5cdFx0XHRcdHJlcXVlc3RJbmRleDogY29udGV4dC5yZXF1ZXN0SW5kZXgsXG5cdFx0XHRcdHBlcmZvcm1hbmNlOiBjb250ZXh0LnByb2ZpbGUsXG5cdFx0XHRcdHJlc3BvbnNlOiBjb250ZXh0LnJlc3BvbnNlLFxuXHRcdFx0XHRzdGFydFRpbWU6IGNvbnRleHQuc3RhcnRUaW1lLFxuXHRcdFx0XHRzdGF0dXM6IGNvbnRleHQuc3RhdHVzLFxuXHRcdFx0XHR0eXBlOiBjb250ZXh0LnR5cGUsXG5cdFx0XHRcdHVybDogY29udGV4dC51cmwsXG5cdFx0XHR9KVxuXHRcdH1cblx0fSlcblx0cmV0dXJuIGR3b25sb2FkUHJveHlcbn1cbmZ1bmN0aW9uIGdldE5leHRSZXF1ZXN0SW5kZXgoKSB7XG5cdHZhciByZXN1bHQgPSBuZXh0UmVxdWVzdEluZGV4XG5cdG5leHRSZXF1ZXN0SW5kZXggKz0gMVxuXHRyZXR1cm4gcmVzdWx0XG59XG4iLCJpbXBvcnQge1xuXHRjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZUR1cmF0aW9uLFxuXHRjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZURldGFpbHMsXG5cdGNvbXB1dGVTaXplLFxufSBmcm9tICcuL3Jlc291cmNlVXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7XG5cdG1zVG9Ocyxcblx0ZXh0ZW5kMkxldixcblx0dXJsUGFyc2UsXG5cdGdldFF1ZXJ5UGFyYW1zRnJvbVVybCxcblx0cmVwbGFjZU51bWJlckNoYXJCeVBhdGgsXG5cdGpzb25TdHJpbmdpZnksXG5cdGdldFN0YXR1c0dyb3VwLFxufSBmcm9tICcuLi8uLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBSdW1FdmVudFR5cGUgfSBmcm9tICcuLi8uLi9oZWxwZXIvZW51bXMnXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRSZXNvdXJjZUNvbGxlY3Rpb24obGlmZUN5Y2xlLCBjb25maWd1cmF0aW9uKSB7XG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoTGlmZUN5Y2xlRXZlbnRUeXBlLlJFUVVFU1RfQ09NUExFVEVELCBmdW5jdGlvbiAocmVxdWVzdCkge1xuXHRcdGxpZmVDeWNsZS5ub3RpZnkoXG5cdFx0XHRMaWZlQ3ljbGVFdmVudFR5cGUuUkFXX1JVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0XHRwcm9jZXNzUmVxdWVzdChyZXF1ZXN0KSxcblx0XHQpXG5cdH0pXG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NSZXF1ZXN0KHJlcXVlc3QpIHtcblx0dmFyIHR5cGUgPSByZXF1ZXN0LnR5cGVcblx0dmFyIHRpbWluZyA9IHJlcXVlc3QucGVyZm9ybWFuY2Vcblx0dmFyIGNvcnJlc3BvbmRpbmdUaW1pbmdPdmVycmlkZXMgPSB0aW1pbmdcblx0XHQ/IGNvbXB1dGVQZXJmb3JtYW5jZUVudHJ5TWV0cmljcyh0aW1pbmcpXG5cdFx0OiB1bmRlZmluZWRcblx0dmFyIHVybE9iaiA9IHVybFBhcnNlKHJlcXVlc3QudXJsKS5nZXRQYXJzZSgpXG5cdHZhciBzdGFydFRpbWUgPSByZXF1ZXN0LnN0YXJ0VGltZVxuXHR2YXIgcmVzb3VyY2VFdmVudCA9IGV4dGVuZDJMZXYoXG5cdFx0e1xuXHRcdFx0ZGF0ZTogc3RhcnRUaW1lLFxuXHRcdFx0cmVzb3VyY2U6IHtcblx0XHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdFx0ZHVyYXRpb246IG1zVG9OcyhyZXF1ZXN0LmR1cmF0aW9uKSxcblx0XHRcdFx0bWV0aG9kOiByZXF1ZXN0Lm1ldGhvZCxcblx0XHRcdFx0c3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcblx0XHRcdFx0c3RhdHVzR3JvdXA6IGdldFN0YXR1c0dyb3VwKHJlcXVlc3Quc3RhdHVzKSxcblx0XHRcdFx0dXJsOiByZXF1ZXN0LnVybCxcblx0XHRcdFx0dXJsSG9zdDogdXJsT2JqLkhvc3QsXG5cdFx0XHRcdHVybFBhdGg6IHVybE9iai5QYXRoLFxuXHRcdFx0XHR1cmxQYXRoR3JvdXA6IHJlcGxhY2VOdW1iZXJDaGFyQnlQYXRoKHVybE9iai5QYXRoKSxcblx0XHRcdFx0dXJsUXVlcnk6IGpzb25TdHJpbmdpZnkoZ2V0UXVlcnlQYXJhbXNGcm9tVXJsKHJlcXVlc3QudXJsKSksXG5cdFx0XHR9LFxuXHRcdFx0dHlwZTogUnVtRXZlbnRUeXBlLlJFU09VUkNFLFxuXHRcdH0sXG5cdFx0Y29ycmVzcG9uZGluZ1RpbWluZ092ZXJyaWRlcyxcblx0KVxuXHRyZXR1cm4geyBzdGFydFRpbWU6IHN0YXJ0VGltZSwgcmF3UnVtRXZlbnQ6IHJlc291cmNlRXZlbnQgfVxufVxuZnVuY3Rpb24gY29tcHV0ZVBlcmZvcm1hbmNlRW50cnlNZXRyaWNzKHRpbWluZykge1xuXHRyZXR1cm4ge1xuXHRcdHJlc291cmNlOiBleHRlbmQyTGV2KFxuXHRcdFx0e30sXG5cdFx0XHR7XG5cdFx0XHRcdGxvYWQ6IGNvbXB1dGVQZXJmb3JtYW5jZVJlc291cmNlRHVyYXRpb24odGltaW5nKSxcblx0XHRcdFx0c2l6ZTogY29tcHV0ZVNpemUodGltaW5nKSxcblx0XHRcdH0sXG5cdFx0XHRjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZURldGFpbHModGltaW5nKSxcblx0XHQpLFxuXHR9XG59XG4iLCJpbXBvcnQgeyBtc1RvTnMsIHRvQXJyYXksIGV4dGVuZCB9IGZyb20gJy4uLy4uL2hlbHBlci91dGlscydcbmltcG9ydCB7IGlzSW50YWtlUmVxdWVzdCB9IGZyb20gJy4uLy4uL2NvcmUvY29uZmlndXJhdGlvbidcblxuZnVuY3Rpb24gYXJlSW5PcmRlcigpIHtcblx0dmFyIG51bWJlcnMgPSB0b0FycmF5KGFyZ3VtZW50cylcblx0Zm9yICh2YXIgaSA9IDE7IGkgPCBudW1iZXJzLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0aWYgKG51bWJlcnNbaSAtIDFdID4gbnVtYmVyc1tpXSkge1xuXHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0fVxuXHR9XG5cdHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb21wdXRlUGVyZm9ybWFuY2VSZXNvdXJjZUR1cmF0aW9uKGVudHJ5KSB7XG5cdC8vIFNhZmFyaSBkdXJhdGlvbiBpcyBhbHdheXMgMCBvbiB0aW1pbmdzIGJsb2NrZWQgYnkgY3Jvc3Mgb3JpZ2luIHBvbGljaWVzLlxuXHRpZiAoZW50cnkuc3RhcnRUaW1lIDwgZW50cnkucmVzcG9uc2VFbmQpIHtcblx0XHRyZXR1cm4gbXNUb05zKGVudHJ5LnJlc3BvbnNlRW5kIC0gZW50cnkuc3RhcnRUaW1lKVxuXHR9XG59XG5cbi8vICBpbnRlcmZhY2UgUGVyZm9ybWFuY2VSZXNvdXJjZURldGFpbHMge1xuLy8gICByZWRpcmVjdD86IFBlcmZvcm1hbmNlUmVzb3VyY2VEZXRhaWxzRWxlbWVudFxuLy8gICBkbnM/OiBQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlsc0VsZW1lbnRcbi8vICAgY29ubmVjdD86IFBlcmZvcm1hbmNlUmVzb3VyY2VEZXRhaWxzRWxlbWVudFxuLy8gICBzc2w/OiBQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlsc0VsZW1lbnRcbi8vICAgZmlyc3RCeXRlOiBQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlsc0VsZW1lbnRcbi8vICAgZG93bmxvYWQ6IFBlcmZvcm1hbmNlUmVzb3VyY2VEZXRhaWxzRWxlbWVudFxuLy8gICBmbXA6XG4vLyB9XG4vLyBwYWdlX2ZtcFx0ZmxvYXRcdFx06aaW5bGP5pe26Ze0KOeUqOS6juihoemHj+eUqOaIt+S7gOS5iOaXtuWAmeeci+WIsOmhtemdoueahOS4u+imgeWGheWuuSnvvIzot59GQ1DnmoTml7bplb/pnZ7luLjmjqXov5HvvIzov5nph4zmiJHku6zlsLHnlKhGQ1DnmoTml7bpl7TkvZzkuLrpppblsY/ml7bpl7RcdGZpcnN0UGFpbnRDb250ZW50RW5kIC0gZmlyc3RQYWludENvbnRlbnRTdGFydFxuLy8gcGFnZV9mcHRcdGZsb2F0XHRcdOmmluasoea4suafk+aXtumXtO+8jOWNs+eZveWxj+aXtumXtCjku47or7fmsYLlvIDlp4vliLDmtY/op4jlmajlvIDlp4vop6PmnpDnrKzkuIDmiblIVE1M5paH5qGj5a2X6IqC55qE5pe26Ze05beu44CCKVx0cmVzcG9uc2VFbmQgLSBmZXRjaFN0YXJ0XG4vLyBwYWdlX3R0aVx0ZmxvYXRcdFx06aaW5qyh5Y+v5Lqk5LqS5pe26Ze0KOa1j+iniOWZqOWujOaIkOaJgOaciUhUTUzop6PmnpDlubbkuJTlrozmiJBET03mnoTlu7rvvIzmraTml7bmtY/op4jlmajlvIDlp4vliqDovb3otYTmupDjgIIpXHRkb21JbnRlcmFjdGl2ZSAtIGZldGNoU3RhcnRcbi8vIHBhZ2VfZmlyc3RieXRlXHRmbG9hdFx0XHTpppbljIXml7bpl7RcdHJlc3BvbnNlU3RhcnQgLSBkb21haW5Mb29rdXBTdGFydFxuLy8gcGFnZV9kb21fcmVhZHlcdGZsb2F0XHRcdERPTSBSZWFkeeaXtumXtCjlpoLmnpzpobXpnaLmnInlkIzmraXmiafooYznmoRKU++8jOWImeWQjOatpUpT5omn6KGM5pe26Ze0PXJlYWR5LXR0aeOAgilcdGRvbUNvbnRlbnRMb2FkRXZlbnRFbmQgLSBmZXRjaFN0YXJ0XG4vLyBwYWdlX2xvYWRcdGZsb2F0XHRcdOmhtemdouWujOWFqOWKoOi9veaXtumXtChsb2FkPemmluasoea4suafk+aXtumXtCtET03op6PmnpDogJfml7Yr5ZCM5q2lSlPmiafooYwr6LWE5rqQ5Yqg6L296ICX5pe244CCKVx0bG9hZEV2ZW50U3RhcnQgLSBmZXRjaFN0YXJ0XG4vLyBwYWdlX2Ruc1x0ZmxvYXRcdFx0ZG5z6Kej5p6Q5pe26Ze0XHRkb21haW5Mb29rdXBFbmQgLSBkb21haW5Mb29rdXBTdGFydFxuLy8gcGFnZV90Y3BcdGZsb2F0XHRcdHRjcOi/nuaOpeaXtumXtFx0Y29ubmVjdEVuZCAtIGNvbm5lY3RTdGFydFxuLy8gcGFnZV9zc2xcdGZsb2F0XHRcdHNzbOWuieWFqOi/nuaOpeaXtumXtCjku4XpgILnlKjkuo5odHRwcylcdGNvbm5lY3RFbmQgLSBzZWN1cmVDb25uZWN0aW9uU3RhcnRcbi8vIHBhZ2VfdHRmYlx0ZmxvYXRcdFx06K+35rGC5ZON5bqU6ICX5pe2XHRyZXNwb25zZVN0YXJ0IC0gcmVxdWVzdFN0YXJ0XG4vLyBwYWdlX3RyYW5zXHRmbG9hdFx0XHTlhoXlrrnkvKDovpPml7bpl7RcdHJlc3BvbnNlRW5kIC0gcmVzcG9uc2VTdGFydFxuLy8gcGFnZV9kb21cdGZsb2F0XHRcdERPTeino+aekOiAl+aXtlx0ZG9tSW50ZXJhY3RpdmUgLSByZXNwb25zZUVuZFxuLy8gcGFnZV9yZXNvdXJjZV9sb2FkX3RpbWVcdGZsb2F0XHRcdOi1hOa6kOWKoOi9veaXtumXtFx0bG9hZEV2ZW50U3RhcnQgLSBkb21Db250ZW50TG9hZGVkRXZlbnRFbmRcblxuLy8gIG5hdmlnYXRpb25TdGFydO+8muW9k+WJjea1j+iniOWZqOeql+WPo+eahOWJjeS4gOS4que9kemhteWFs+mXre+8jOWPkeeUn3VubG9hZOS6i+S7tuaXtueahFVuaXjmr6vnp5Lml7bpl7TmiLPjgILlpoLmnpzmsqHmnInliY3kuIDkuKrnvZHpobXvvIzliJnnrYnkuo5mZXRjaFN0YXJ05bGe5oCn44CCXG5cbi8vIMK3ICAgdW5sb2FkRXZlbnRTdGFydO+8muWmguaenOWJjeS4gOS4que9kemhteS4juW9k+WJjee9kemhteWxnuS6juWQjOS4gOS4quWfn+WQje+8jOWImei/lOWbnuWJjeS4gOS4que9kemhteeahHVubG9hZOS6i+S7tuWPkeeUn+aXtueahFVuaXjmr6vnp5Lml7bpl7TmiLPjgILlpoLmnpzmsqHmnInliY3kuIDkuKrnvZHpobXvvIzmiJbogIXkuYvliY3nmoTnvZHpobXot7PovazkuI3mmK/lnKjlkIzkuIDkuKrln5/lkI3lhoXvvIzliJnov5Tlm57lgLzkuLow44CCXG5cbi8vIMK3ICAgdW5sb2FkRXZlbnRFbmTvvJrlpoLmnpzliY3kuIDkuKrnvZHpobXkuI7lvZPliY3nvZHpobXlsZ7kuo7lkIzkuIDkuKrln5/lkI3vvIzliJnov5Tlm57liY3kuIDkuKrnvZHpobV1bmxvYWTkuovku7bnmoTlm57osIPlh73mlbDnu5PmnZ/ml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5rKh5pyJ5YmN5LiA5Liq572R6aG177yM5oiW6ICF5LmL5YmN55qE572R6aG16Lez6L2s5LiN5piv5Zyo5ZCM5LiA5Liq5Z+f5ZCN5YaF77yM5YiZ6L+U5Zue5YC85Li6MOOAglxuXG4vLyDCtyAgIHJlZGlyZWN0U3RhcnTvvJrov5Tlm57nrKzkuIDkuKpIVFRQ6Lez6L2s5byA5aeL5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAguWmguaenOayoeaciei3s+i9rO+8jOaIluiAheS4jeaYr+WQjOS4gOS4quWfn+WQjeWGhemDqOeahOi3s+i9rO+8jOWImei/lOWbnuWAvOS4ujDjgIJcblxuLy8gwrcgICByZWRpcmVjdEVuZO+8mui/lOWbnuacgOWQjuS4gOS4qkhUVFDot7Povaznu5PmnZ/ml7bvvIjljbPot7Povazlm57lupTnmoTmnIDlkI7kuIDkuKrlrZfoioLmjqXlj5flrozmiJDml7bvvInnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5rKh5pyJ6Lez6L2s77yM5oiW6ICF5LiN5piv5ZCM5LiA5Liq5Z+f5ZCN5YaF6YOo55qE6Lez6L2s77yM5YiZ6L+U5Zue5YC85Li6MOOAglxuXG4vLyDCtyAgIGZldGNoU3RhcnTvvJrov5Tlm57mtY/op4jlmajlh4blpIfkvb/nlKhIVFRQ6K+35rGC6K+75Y+W5paH5qGj5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAguivpeS6i+S7tuWcqOe9kemhteafpeivouacrOWcsOe8k+WtmOS5i+WJjeWPkeeUn+OAglxuXG4vLyDCtyAgIGRvbWFpbkxvb2t1cFN0YXJ077ya6L+U5Zue5Z+f5ZCN5p+l6K+i5byA5aeL5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAguWmguaenOS9v+eUqOaMgeS5hei/nuaOpe+8jOaIluiAheS/oeaBr+aYr+S7juacrOWcsOe8k+WtmOiOt+WPlueahO+8jOWImei/lOWbnuWAvOetieWQjOS6jmZldGNoU3RhcnTlsZ7mgKfnmoTlgLzjgIJcblxuLy8gwrcgICBkb21haW5Mb29rdXBFbmTvvJrov5Tlm57ln5/lkI3mn6Xor6Lnu5PmnZ/ml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5L2/55So5oyB5LmF6L+e5o6l77yM5oiW6ICF5L+h5oGv5piv5LuO5pys5Zyw57yT5a2Y6I635Y+W55qE77yM5YiZ6L+U5Zue5YC8562J5ZCM5LqOZmV0Y2hTdGFydOWxnuaAp+eahOWAvOOAglxuXG4vLyDCtyAgIGNvbm5lY3RTdGFydO+8mui/lOWbnkhUVFDor7fmsYLlvIDlp4vlkJHmnI3liqHlmajlj5HpgIHml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5L2/55So5oyB5LmF6L+e5o6l77yIcGVyc2lzdGVudCBjb25uZWN0aW9u77yJ77yM5YiZ6L+U5Zue5YC8562J5ZCM5LqOZmV0Y2hTdGFydOWxnuaAp+eahOWAvOOAglxuXG4vLyDCtyAgIGNvbm5lY3RFbmTvvJrov5Tlm57mtY/op4jlmajkuI7mnI3liqHlmajkuYvpl7TnmoTov57mjqXlu7rnq4vml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c5bu656uL55qE5piv5oyB5LmF6L+e5o6l77yM5YiZ6L+U5Zue5YC8562J5ZCM5LqOZmV0Y2hTdGFydOWxnuaAp+eahOWAvOOAgui/nuaOpeW7uueri+aMh+eahOaYr+aJgOacieaPoeaJi+WSjOiupOivgei/h+eoi+WFqOmDqOe7k+adn+OAglxuXG4vLyDCtyAgIHNlY3VyZUNvbm5lY3Rpb25TdGFydO+8mui/lOWbnua1j+iniOWZqOS4juacjeWKoeWZqOW8gOWni+WuieWFqOmTvuaOpeeahOaPoeaJi+aXtueahFVuaXjmr6vnp5Lml7bpl7TmiLPjgILlpoLmnpzlvZPliY3nvZHpobXkuI3opoHmsYLlronlhajov57mjqXvvIzliJnov5Tlm54w44CCXG5cbi8vIMK3ICAgcmVxdWVzdFN0YXJ077ya6L+U5Zue5rWP6KeI5Zmo5ZCR5pyN5Yqh5Zmo5Y+R5Ye6SFRUUOivt+axguaXtu+8iOaIluW8gOWni+ivu+WPluacrOWcsOe8k+WtmOaXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICByZXNwb25zZVN0YXJ077ya6L+U5Zue5rWP6KeI5Zmo5LuO5pyN5Yqh5Zmo5pS25Yiw77yI5oiW5LuO5pys5Zyw57yT5a2Y6K+75Y+W77yJ56ys5LiA5Liq5a2X6IqC5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAglxuXG4vLyDCtyAgIHJlc3BvbnNlRW5k77ya6L+U5Zue5rWP6KeI5Zmo5LuO5pyN5Yqh5Zmo5pS25Yiw77yI5oiW5LuO5pys5Zyw57yT5a2Y6K+75Y+W77yJ5pyA5ZCO5LiA5Liq5a2X6IqC5pe277yI5aaC5p6c5Zyo5q2k5LmL5YmNSFRUUOi/nuaOpeW3sue7j+WFs+mXre+8jOWImei/lOWbnuWFs+mXreaXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICBkb21Mb2FkaW5n77ya6L+U5Zue5b2T5YmN572R6aG1RE9N57uT5p6E5byA5aeL6Kej5p6Q5pe277yI5Y2zRG9jdW1lbnQucmVhZHlTdGF0ZeWxnuaAp+WPmOS4uuKAnGxvYWRpbmfigJ3jgIHnm7jlupTnmoRyZWFkeXN0YXRlY2hhbmdl5LqL5Lu26Kem5Y+R5pe277yJ55qEVW5peOavq+enkuaXtumXtOaIs+OAglxuXG4vLyDCtyAgIGRvbUludGVyYWN0aXZl77ya6L+U5Zue5b2T5YmN572R6aG1RE9N57uT5p6E57uT5p2f6Kej5p6Q44CB5byA5aeL5Yqg6L295YaF5bWM6LWE5rqQ5pe277yI5Y2zRG9jdW1lbnQucmVhZHlTdGF0ZeWxnuaAp+WPmOS4uuKAnGludGVyYWN0aXZl4oCd44CB55u45bqU55qEcmVhZHlzdGF0ZWNoYW5nZeS6i+S7tuinpuWPkeaXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICBkb21Db250ZW50TG9hZGVkRXZlbnRTdGFydO+8mui/lOWbnuW9k+WJjee9kemhtURPTUNvbnRlbnRMb2FkZWTkuovku7blj5HnlJ/ml7bvvIjljbNET03nu5PmnoTop6PmnpDlrozmr5XjgIHmiYDmnInohJrmnKzlvIDlp4vov5DooYzml7bvvInnmoRVbml45q+r56eS5pe26Ze05oiz44CCXG5cbi8vIMK3ICAgZG9tQ29udGVudExvYWRlZEV2ZW50RW5k77ya6L+U5Zue5b2T5YmN572R6aG15omA5pyJ6ZyA6KaB5omn6KGM55qE6ISa5pys5omn6KGM5a6M5oiQ5pe255qEVW5peOavq+enkuaXtumXtOaIs+OAglxuXG4vLyDCtyAgIGRvbUNvbXBsZXRl77ya6L+U5Zue5b2T5YmN572R6aG1RE9N57uT5p6E55Sf5oiQ5pe277yI5Y2zRG9jdW1lbnQucmVhZHlTdGF0ZeWxnuaAp+WPmOS4uuKAnGNvbXBsZXRl4oCd77yM5Lul5Y+K55u45bqU55qEcmVhZHlzdGF0ZWNoYW5nZeS6i+S7tuWPkeeUn+aXtu+8ieeahFVuaXjmr6vnp5Lml7bpl7TmiLPjgIJcblxuLy8gwrcgICBsb2FkRXZlbnRTdGFydO+8mui/lOWbnuW9k+WJjee9kemhtWxvYWTkuovku7bnmoTlm57osIPlh73mlbDlvIDlp4vml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c6K+l5LqL5Lu26L+Y5rKh5pyJ5Y+R55Sf77yM6L+U5ZueMOOAglxuXG4vLyDCtyAgIGxvYWRFdmVudEVuZO+8mui/lOWbnuW9k+WJjee9kemhtWxvYWTkuovku7bnmoTlm57osIPlh73mlbDov5DooYznu5PmnZ/ml7bnmoRVbml45q+r56eS5pe26Ze05oiz44CC5aaC5p6c6K+l5LqL5Lu26L+Y5rKh5pyJ5Y+R55Sf77yM6L+U5ZueMFxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVQZXJmb3JtYW5jZVJlc291cmNlRGV0YWlscyhlbnRyeSkge1xuXHR2YXIgdmFsaWRFbnRyeSA9IHRvVmFsaWRFbnRyeShlbnRyeSlcblxuXHRpZiAoIXZhbGlkRW50cnkpIHtcblx0XHRyZXR1cm4gdW5kZWZpbmVkXG5cdH1cblxuXHR2YXIgc3RhcnRUaW1lID0gdmFsaWRFbnRyeS5zdGFydFRpbWUsXG5cdFx0ZmV0Y2hTdGFydCA9IHZhbGlkRW50cnkuZmV0Y2hTdGFydCxcblx0XHRyZWRpcmVjdFN0YXJ0ID0gdmFsaWRFbnRyeS5yZWRpcmVjdFN0YXJ0LFxuXHRcdHJlZGlyZWN0RW5kID0gdmFsaWRFbnRyeS5yZWRpcmVjdEVuZCxcblx0XHRkb21haW5Mb29rdXBTdGFydCA9XG5cdFx0XHR2YWxpZEVudHJ5LmRvbWFpbkxvb2t1cFN0YXJ0IHx8IHZhbGlkRW50cnkuZG9tYWluTG9va1VwU3RhcnQsXG5cdFx0ZG9tYWluTG9va3VwRW5kID0gdmFsaWRFbnRyeS5kb21haW5Mb29rdXBFbmQgfHwgdmFsaWRFbnRyeS5kb21haW5Mb29rVXBFbmQsXG5cdFx0Y29ubmVjdFN0YXJ0ID0gdmFsaWRFbnRyeS5jb25uZWN0U3RhcnQsXG5cdFx0U1NMY29ubmVjdGlvblN0YXJ0ID0gdmFsaWRFbnRyeS5TU0xjb25uZWN0aW9uU3RhcnQsXG5cdFx0U1NMY29ubmVjdGlvbkVuZCA9IHZhbGlkRW50cnkuU1NMY29ubmVjdGlvbkVuZCxcblx0XHRjb25uZWN0RW5kID0gdmFsaWRFbnRyeS5jb25uZWN0RW5kLFxuXHRcdHJlcXVlc3RTdGFydCA9IHZhbGlkRW50cnkucmVxdWVzdFN0YXJ0LFxuXHRcdHJlc3BvbnNlU3RhcnQgPSB2YWxpZEVudHJ5LnJlc3BvbnNlU3RhcnQsXG5cdFx0cmVzcG9uc2VFbmQgPSB2YWxpZEVudHJ5LnJlc3BvbnNlRW5kXG5cdHZhciBkZXRhaWxzID0ge1xuXHRcdGZpcnN0Ynl0ZTogZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgZG9tYWluTG9va3VwU3RhcnQsIHJlc3BvbnNlU3RhcnQpLFxuXHRcdHRyYW5zOiBmb3JtYXRUaW1pbmcoc3RhcnRUaW1lLCByZXNwb25zZVN0YXJ0LCByZXNwb25zZUVuZCksXG5cdFx0dHRmYjogZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgcmVxdWVzdFN0YXJ0LCByZXNwb25zZVN0YXJ0KSxcblx0fVxuXHQvLyBNYWtlIHN1cmUgYSBjb25uZWN0aW9uIG9jY3VycmVkXG5cdGlmIChjb25uZWN0RW5kICE9PSBmZXRjaFN0YXJ0KSB7XG5cdFx0ZGV0YWlscy50Y3AgPSBmb3JtYXRUaW1pbmcoc3RhcnRUaW1lLCBjb25uZWN0U3RhcnQsIGNvbm5lY3RFbmQpXG5cblx0XHQvLyBNYWtlIHN1cmUgYSBzZWN1cmUgY29ubmVjdGlvbiBvY2N1cnJlZFxuXHRcdGlmIChhcmVJbk9yZGVyKGNvbm5lY3RTdGFydCwgU1NMY29ubmVjdGlvblN0YXJ0LCBTU0xjb25uZWN0aW9uRW5kKSkge1xuXHRcdFx0ZGV0YWlscy5zc2wgPSBmb3JtYXRUaW1pbmcoXG5cdFx0XHRcdHN0YXJ0VGltZSxcblx0XHRcdFx0U1NMY29ubmVjdGlvblN0YXJ0LFxuXHRcdFx0XHRTU0xjb25uZWN0aW9uRW5kLFxuXHRcdFx0KVxuXHRcdH1cblx0fVxuXG5cdC8vIE1ha2Ugc3VyZSBhIGRvbWFpbiBsb29rdXAgb2NjdXJyZWRcblx0aWYgKGRvbWFpbkxvb2t1cEVuZCAhPT0gZmV0Y2hTdGFydCkge1xuXHRcdGRldGFpbHMuZG5zID0gZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgZG9tYWluTG9va3VwU3RhcnQsIGRvbWFpbkxvb2t1cEVuZClcblx0fVxuXG5cdGlmIChoYXNSZWRpcmVjdGlvbihlbnRyeSkpIHtcblx0XHRkZXRhaWxzLnJlZGlyZWN0ID0gZm9ybWF0VGltaW5nKHN0YXJ0VGltZSwgcmVkaXJlY3RTdGFydCwgcmVkaXJlY3RFbmQpXG5cdH1cblxuXHRyZXR1cm4gZGV0YWlsc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9WYWxpZEVudHJ5KGVudHJ5KSB7XG5cdC8vIEVuc3VyZSB0aW1pbmdzIGFyZSBpbiB0aGUgcmlnaHQgb3JkZXIuIE9uIHRvcCBvZiBmaWx0ZXJpbmcgb3V0IHBvdGVudGlhbCBpbnZhbGlkXG5cdC8vIFJ1bVBlcmZvcm1hbmNlUmVzb3VyY2VUaW1pbmcsIGl0IHdpbGwgaWdub3JlIGVudHJpZXMgZnJvbSByZXF1ZXN0cyB3aGVyZSB0aW1pbmdzIGNhbm5vdCBiZVxuXHQvLyBjb2xsZWN0ZWQsIGZvciBleGFtcGxlIGNyb3NzIG9yaWdpbiByZXF1ZXN0cyB3aXRob3V0IGEgXCJUaW1pbmctQWxsb3ctT3JpZ2luXCIgaGVhZGVyIGFsbG93aW5nXG5cdC8vIGl0LlxuXHQvLyBwYWdlX2ZtcFx0ZmxvYXRcdFx06aaW5bGP5pe26Ze0KOeUqOS6juihoemHj+eUqOaIt+S7gOS5iOaXtuWAmeeci+WIsOmhtemdoueahOS4u+imgeWGheWuuSnvvIzot59GQ1DnmoTml7bplb/pnZ7luLjmjqXov5HvvIzov5nph4zmiJHku6zlsLHnlKhGQ1DnmoTml7bpl7TkvZzkuLrpppblsY/ml7bpl7RcdGZpcnN0UGFpbnRDb250ZW50RW5kIC0gZmlyc3RQYWludENvbnRlbnRTdGFydFxuXHQvLyBwYWdlX2ZwdFx0ZmxvYXRcdFx06aaW5qyh5riy5p+T5pe26Ze077yM5Y2z55m95bGP5pe26Ze0KOS7juivt+axguW8gOWni+WIsOa1j+iniOWZqOW8gOWni+ino+aekOesrOS4gOaJuUhUTUzmlofmoaPlrZfoioLnmoTml7bpl7Tlt67jgIIpXHRyZXNwb25zZUVuZCAtIGZldGNoU3RhcnRcblx0Ly8gcGFnZV90dGlcdGZsb2F0XHRcdOmmluasoeWPr+S6pOS6kuaXtumXtCjmtY/op4jlmajlrozmiJDmiYDmnIlIVE1M6Kej5p6Q5bm25LiU5a6M5oiQRE9N5p6E5bu677yM5q2k5pe25rWP6KeI5Zmo5byA5aeL5Yqg6L296LWE5rqQ44CCKVx0ZG9tSW50ZXJhY3RpdmUgLSBmZXRjaFN0YXJ0XG5cdC8vIHBhZ2VfZmlyc3RieXRlXHRmbG9hdFx0XHTpppbljIXml7bpl7RcdHJlc3BvbnNlU3RhcnQgLSBkb21haW5Mb29rdXBTdGFydFxuXHQvLyBwYWdlX2RvbV9yZWFkeVx0ZmxvYXRcdFx0RE9NIFJlYWR55pe26Ze0KOWmguaenOmhtemdouacieWQjOatpeaJp+ihjOeahEpT77yM5YiZ5ZCM5q2lSlPmiafooYzml7bpl7Q9cmVhZHktdHRp44CCKVx0ZG9tQ29udGVudExvYWRFdmVudEVuZCAtIGZldGNoU3RhcnRcblx0Ly8gcGFnZV9sb2FkXHRmbG9hdFx0XHTpobXpnaLlrozlhajliqDovb3ml7bpl7QobG9hZD3pppbmrKHmuLLmn5Pml7bpl7QrRE9N6Kej5p6Q6ICX5pe2K+WQjOatpUpT5omn6KGMK+i1hOa6kOWKoOi9veiAl+aXtuOAgilcdGxvYWRFdmVudFN0YXJ0IC0gZmV0Y2hTdGFydFxuXHQvLyBwYWdlX2Ruc1x0ZmxvYXRcdFx0ZG5z6Kej5p6Q5pe26Ze0XHRkb21haW5Mb29rdXBFbmQgLSBkb21haW5Mb29rdXBTdGFydFxuXHQvLyBwYWdlX3RjcFx0ZmxvYXRcdFx0dGNw6L+e5o6l5pe26Ze0XHRjb25uZWN0RW5kIC0gY29ubmVjdFN0YXJ0XG5cdC8vIHBhZ2Vfc3NsXHRmbG9hdFx0XHRzc2zlronlhajov57mjqXml7bpl7Qo5LuF6YCC55So5LqOaHR0cHMpXHRjb25uZWN0RW5kIC0gc2VjdXJlQ29ubmVjdGlvblN0YXJ0XG5cdC8vIHBhZ2VfdHRmYlx0ZmxvYXRcdFx06K+35rGC5ZON5bqU6ICX5pe2XHRyZXNwb25zZVN0YXJ0IC0gcmVxdWVzdFN0YXJ0XG5cdC8vIHBhZ2VfdHJhbnNcdGZsb2F0XHRcdOWGheWuueS8oOi+k+aXtumXtFx0cmVzcG9uc2VFbmQgLSByZXNwb25zZVN0YXJ0XG5cdC8vIHBhZ2VfZG9tXHRmbG9hdFx0XHRET03op6PmnpDogJfml7ZcdGRvbUludGVyYWN0aXZlIC0gcmVzcG9uc2VFbmRcblx0Ly8gcGFnZV9yZXNvdXJjZV9sb2FkX3RpbWVcdGZsb2F0XHRcdOi1hOa6kOWKoOi9veaXtumXtFx0bG9hZEV2ZW50U3RhcnQgLSBkb21Db250ZW50TG9hZGVkRXZlbnRFbmRcblx0aWYgKFxuXHRcdCFhcmVJbk9yZGVyKFxuXHRcdFx0ZW50cnkuc3RhcnRUaW1lLFxuXHRcdFx0ZW50cnkuZmV0Y2hTdGFydCxcblx0XHRcdGVudHJ5LmRvbWFpbkxvb2t1cFN0YXJ0LFxuXHRcdFx0ZW50cnkuZG9tYWluTG9va3VwRW5kLFxuXHRcdFx0ZW50cnkuY29ubmVjdFN0YXJ0LFxuXHRcdFx0ZW50cnkuY29ubmVjdEVuZCxcblx0XHRcdGVudHJ5LnJlcXVlc3RTdGFydCxcblx0XHRcdGVudHJ5LnJlc3BvbnNlU3RhcnQsXG5cdFx0XHRlbnRyeS5yZXNwb25zZUVuZCxcblx0XHQpXG5cdCkge1xuXHRcdHJldHVybiB1bmRlZmluZWRcblx0fVxuXG5cdGlmICghaGFzUmVkaXJlY3Rpb24oZW50cnkpKSB7XG5cdFx0cmV0dXJuIGVudHJ5XG5cdH1cblxuXHR2YXIgcmVkaXJlY3RTdGFydCA9IGVudHJ5LnJlZGlyZWN0U3RhcnRcblx0dmFyIHJlZGlyZWN0RW5kID0gZW50cnkucmVkaXJlY3RFbmRcblx0Ly8gRmlyZWZveCBkb2Vzbid0IHByb3ZpZGUgcmVkaXJlY3QgdGltaW5ncyBvbiBjcm9zcyBvcmlnaW4gcmVxdWVzdHMuXG5cdC8vIFByb3ZpZGUgYSBkZWZhdWx0IGZvciB0aG9zZS5cblx0aWYgKHJlZGlyZWN0U3RhcnQgPCBlbnRyeS5zdGFydFRpbWUpIHtcblx0XHRyZWRpcmVjdFN0YXJ0ID0gZW50cnkuc3RhcnRUaW1lXG5cdH1cblx0aWYgKHJlZGlyZWN0RW5kIDwgZW50cnkuc3RhcnRUaW1lKSB7XG5cdFx0cmVkaXJlY3RFbmQgPSBlbnRyeS5mZXRjaFN0YXJ0XG5cdH1cblxuXHQvLyBNYWtlIHN1cmUgcmVkaXJlY3QgdGltaW5ncyBhcmUgaW4gb3JkZXJcblx0aWYgKFxuXHRcdCFhcmVJbk9yZGVyKGVudHJ5LnN0YXJ0VGltZSwgcmVkaXJlY3RTdGFydCwgcmVkaXJlY3RFbmQsIGVudHJ5LmZldGNoU3RhcnQpXG5cdCkge1xuXHRcdHJldHVybiB1bmRlZmluZWRcblx0fVxuXHRyZXR1cm4gZXh0ZW5kKHt9LCBlbnRyeSwge1xuXHRcdHJlZGlyZWN0RW5kOiByZWRpcmVjdEVuZCxcblx0XHRyZWRpcmVjdFN0YXJ0OiByZWRpcmVjdFN0YXJ0LFxuXHR9KVxuXHQvLyByZXR1cm4ge1xuXHQvLyAgIC4uLmVudHJ5LFxuXHQvLyAgIHJlZGlyZWN0RW5kLFxuXHQvLyAgIHJlZGlyZWN0U3RhcnRcblx0Ly8gfVxufVxuXG5mdW5jdGlvbiBoYXNSZWRpcmVjdGlvbihlbnRyeSkge1xuXHQvLyBUaGUgb25seSB0aW1lIGZldGNoU3RhcnQgaXMgZGlmZmVyZW50IHRoYW4gc3RhcnRUaW1lIGlzIGlmIGEgcmVkaXJlY3Rpb24gb2NjdXJyZWQuXG5cdHJldHVybiBlbnRyeS5mZXRjaFN0YXJ0ICE9PSBlbnRyeS5zdGFydFRpbWVcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltaW5nKG9yaWdpbiwgc3RhcnQsIGVuZCkge1xuXHRyZXR1cm4gbXNUb05zKGVuZCAtIHN0YXJ0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcHV0ZVNpemUoZW50cnkpIHtcblx0Ly8gTWFrZSBzdXJlIGEgcmVxdWVzdCBhY3R1YWxseSBvY2N1cnJlZFxuXHRpZiAoZW50cnkuc3RhcnRUaW1lIDwgZW50cnkucmVzcG9uc2VTdGFydCkge1xuXHRcdHJldHVybiBlbnRyeS5yZWNlaXZlZEJ5dGVkQ291bnRcblx0fVxuXHRyZXR1cm4gdW5kZWZpbmVkXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FsbG93ZWRSZXF1ZXN0VXJsKGNvbmZpZ3VyYXRpb24sIHVybCkge1xuXHRyZXR1cm4gdXJsICYmICFpc0ludGFrZVJlcXVlc3QodXJsLCBjb25maWd1cmF0aW9uKVxufVxuIiwiaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFNldERhdGFDb2xsb2N0aW9uKGxpZmVDeWNsZSkge1xuXHRjb25zdCBvcmlnaW5QYWdlID0gUGFnZVxuXHRjb25zdCBvcmlnaW5Db21wb25lbnQgPSBDb21wb25lbnRcblx0UGFnZSA9IGZ1bmN0aW9uIChwYWdlKSB7XG5cdFx0Y29uc3Qgb3JpZ2luUGFnZU9uTG9hZCA9IHBhZ2VbJ29uTG9hZCddXG5cdFx0cGFnZVsnb25Mb2FkJ10gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnNldFVwZGF0ZVBlcmZvcm1hbmNlTGlzdGVuZXIgJiZcblx0XHRcdFx0dGhpcy5zZXRVcGRhdGVQZXJmb3JtYW5jZUxpc3RlbmVyKHsgd2l0aERhdGFQYXRoczogdHJ1ZSB9LCAocmVzKSA9PiB7XG5cdFx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9TRVRfREFUQV9VUERBVEUsIHJlcylcblx0XHRcdFx0fSlcblx0XHRcdHJldHVybiBvcmlnaW5QYWdlT25Mb2FkLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcblx0XHR9XG5cdFx0cmV0dXJuIG9yaWdpblBhZ2UocGFnZSlcblx0fVxuXHRDb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50KSB7XG5cdFx0Y29uc3Qgb3JpZ2luQ29tcG9uZW50QXR0YWNoZWQgPSBjb21wb25lbnRbJ2F0dGFjaGVkJ11cblx0XHRjb21wb25lbnRbJ2F0dGFjaGVkJ10gPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aGlzLnNldFVwZGF0ZVBlcmZvcm1hbmNlTGlzdGVuZXIgJiZcblx0XHRcdFx0dGhpcy5zZXRVcGRhdGVQZXJmb3JtYW5jZUxpc3RlbmVyKHsgd2l0aERhdGFQYXRoczogdHJ1ZSB9LCAocmVzKSA9PiB7XG5cdFx0XHRcdFx0bGlmZUN5Y2xlLm5vdGlmeShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9TRVRfREFUQV9VUERBVEUsIHJlcylcblx0XHRcdFx0fSlcblx0XHRcdHJldHVybiBvcmlnaW5Db21wb25lbnRBdHRhY2hlZC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG5cdFx0fVxuXHRcdHJldHVybiBvcmlnaW5Db21wb25lbnQoY29tcG9uZW50KVxuXHR9XG59XG4iLCJpbXBvcnQgeyBub29wIH0gZnJvbSAnLi4vaGVscGVyL3V0aWxzJ1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vaGVscGVyL2VudW1zJ1xuaW1wb3J0IHsgTGlmZUN5Y2xlRXZlbnRUeXBlIH0gZnJvbSAnLi4vY29yZS9saWZlQ3ljbGUnXG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFja0V2ZW50Q291bnRzKGxpZmVDeWNsZSwgY2FsbGJhY2spIHtcblx0aWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRjYWxsYmFjayA9IG5vb3Bcblx0fVxuXHR2YXIgZXZlbnRDb3VudHMgPSB7XG5cdFx0ZXJyb3JDb3VudDogMCxcblx0XHRyZXNvdXJjZUNvdW50OiAwLFxuXHRcdGxvbmdUYXNrQ291bnQ6IDAsXG5cdFx0dXNlckFjdGlvbkNvdW50OiAwLFxuXHR9XG5cblx0dmFyIHN1YnNjcmlwdGlvbiA9IGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJBV19SVU1fRVZFTlRfQ09MTEVDVEVELFxuXHRcdGZ1bmN0aW9uIChkYXRhKSB7XG5cdFx0XHR2YXIgcmF3UnVtRXZlbnQgPSBkYXRhLnJhd1J1bUV2ZW50XG5cdFx0XHRzd2l0Y2ggKHJhd1J1bUV2ZW50LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBSdW1FdmVudFR5cGUuRVJST1I6XG5cdFx0XHRcdFx0ZXZlbnRDb3VudHMuZXJyb3JDb3VudCArPSAxXG5cdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnRDb3VudHMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBSdW1FdmVudFR5cGUuUkVTT1VSQ0U6XG5cdFx0XHRcdFx0ZXZlbnRDb3VudHMucmVzb3VyY2VDb3VudCArPSAxXG5cdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnRDb3VudHMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBSdW1FdmVudFR5cGUuQUNUSU9OOlxuXHRcdFx0XHRcdGV2ZW50Q291bnRzLnVzZXJBY3Rpb25Db3VudCArPSAxXG5cdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnRDb3VudHMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdH1cblx0XHR9LFxuXHQpXG5cblx0cmV0dXJuIHtcblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKVxuXHRcdH0sXG5cdFx0ZXZlbnRDb3VudHM6IGV2ZW50Q291bnRzLFxuXHR9XG59XG4iLCJpbXBvcnQgeyBlYWNoLCBub3cgfSBmcm9tICcuLi9oZWxwZXIvdXRpbHMnXG5pbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9jb3JlL29ic2VydmFibGUnXG4vLyBEZWxheSB0byB3YWl0IGZvciBhIHBhZ2UgYWN0aXZpdHkgdG8gdmFsaWRhdGUgdGhlIHRyYWNraW5nIHByb2Nlc3NcbmV4cG9ydCB2YXIgUEFHRV9BQ1RJVklUWV9WQUxJREFUSU9OX0RFTEFZID0gMTAwXG4vLyBEZWxheSB0byB3YWl0IGFmdGVyIGEgcGFnZSBhY3Rpdml0eSB0byBlbmQgdGhlIHRyYWNraW5nIHByb2Nlc3NcbmV4cG9ydCB2YXIgUEFHRV9BQ1RJVklUWV9FTkRfREVMQVkgPSAxMDBcbi8vIE1heGltdW0gZHVyYXRpb24gb2YgdGhlIHRyYWNraW5nIHByb2Nlc3NcbmV4cG9ydCB2YXIgUEFHRV9BQ1RJVklUWV9NQVhfRFVSQVRJT04gPSAxMDAwMFxuXG5leHBvcnQgZnVuY3Rpb24gd2FpdElkbGVQYWdlQWN0aXZpdHkobGlmZUN5Y2xlLCBjb21wbGV0aW9uQ2FsbGJhY2spIHtcblx0dmFyIF90cmFja1BhZ2VBY3Rpdml0aWVzID0gdHJhY2tQYWdlQWN0aXZpdGllcyhsaWZlQ3ljbGUpXG5cdHZhciBwYWdlQWN0aXZpdGllc09ic2VydmFibGUgPSBfdHJhY2tQYWdlQWN0aXZpdGllcy5vYnNlcnZhYmxlXG5cdHZhciBzdG9wUGFnZUFjdGl2aXRpZXNUcmFja2luZyA9IF90cmFja1BhZ2VBY3Rpdml0aWVzLnN0b3Bcblx0dmFyIF93YWl0UGFnZUFjdGl2aXRpZXNDb21wbGV0aW9uID0gd2FpdFBhZ2VBY3Rpdml0aWVzQ29tcGxldGlvbihcblx0XHRwYWdlQWN0aXZpdGllc09ic2VydmFibGUsXG5cdFx0c3RvcFBhZ2VBY3Rpdml0aWVzVHJhY2tpbmcsXG5cdFx0Y29tcGxldGlvbkNhbGxiYWNrLFxuXHQpXG5cblx0dmFyIHN0b3BXYWl0UGFnZUFjdGl2aXRpZXNDb21wbGV0aW9uID0gX3dhaXRQYWdlQWN0aXZpdGllc0NvbXBsZXRpb24uc3RvcFxuXHRmdW5jdGlvbiBzdG9wKCkge1xuXHRcdHN0b3BXYWl0UGFnZUFjdGl2aXRpZXNDb21wbGV0aW9uKClcblx0XHRzdG9wUGFnZUFjdGl2aXRpZXNUcmFja2luZygpXG5cdH1cblxuXHRyZXR1cm4geyBzdG9wOiBzdG9wIH1cbn1cblxuLy8gQXV0b21hdGljIGFjdGlvbiBjb2xsZWN0aW9uIGxpZmVjeWNsZSBvdmVydmlldzpcbi8vICAgICAgICAgICAgICAgICAgICAgIChTdGFydCBuZXcgdHJhY2tQYWdlQWN0aXZpdGllcylcbi8vICAgICAgICAgICAgICAuLS0tLS0tLS0tLS0tLS0tLS0tLSctLS0tLS0tLS0tLS0tLS0tLS0tLS5cbi8vICAgICAgICAgICAgICB2ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZcbi8vICAgICBbV2FpdCBmb3IgYSBwYWdlIGFjdGl2aXR5IF0gICAgICAgICAgW1dhaXQgZm9yIGEgbWF4aW11bSBkdXJhdGlvbl1cbi8vICAgICBbdGltZW91dDogVkFMSURBVElPTl9ERUxBWV0gICAgICAgICAgWyAgdGltZW91dDogTUFYX0RVUkFUSU9OICAgIF1cbi8vICAgICAgICAgIC8gICAgICAgICAgICAgICAgICBcXCAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbi8vICAgICAgICAgdiAgICAgICAgICAgICAgICAgICAgdiAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuLy8gIFtObyBwYWdlIGFjdGl2aXR5XSAgIFtQYWdlIGFjdGl2aXR5XSAgICAgICAgICAgICAgICAgICB8XG4vLyAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgfCwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLiAgIHxcbi8vICAgICAgICAgdiAgICAgICAgICAgICAgICAgICB2ICAgICAgICAgICAgICAgICAgICAgICB8ICAgfFxuLy8gICAgIChEaXNjYXJkKSAgICAgW1dhaXQgZm9yIGEgcGFnZSBhY3Rpdml0eV0gICAgICAgIHwgICB8XG4vLyAgICAgICAgICAgICAgICAgICBbICAgdGltZW91dDogRU5EX0RFTEFZICAgXSAgICAgICAgfCAgIHxcbi8vICAgICAgICAgICAgICAgICAgICAgICAvICAgICAgICAgICAgICAgIFxcICAgICAgICAgICAgfCAgIHxcbi8vICAgICAgICAgICAgICAgICAgICAgIHYgICAgICAgICAgICAgICAgICB2ICAgICAgICAgICB8ICAgfFxuLy8gICAgICAgICAgICAgW05vIHBhZ2UgYWN0aXZpdHldICAgIFtQYWdlIGFjdGl2aXR5XSAgIHwgICB8XG4vLyAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgfCAgIHxcbi8vICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICctLS0tLS0tLS0tLS0nICAgfFxuLy8gICAgICAgICAgICAgICAgICAgICAgJy0tLS0tLS0tLS0tLiAsLS0tLS0tLS0tLS0tLS0tLS0tLS0nXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoRW5kKVxuLy9cbi8vIE5vdGU6IGJlY2F1c2UgTUFYX0RVUkFUSU9OID4gVkFMSURBVElPTl9ERUxBWSwgd2UgYXJlIHN1cmUgdGhhdCBpZiB0aGUgcHJvY2VzcyBpcyBzdGlsbCBhbGl2ZVxuLy8gYWZ0ZXIgTUFYX0RVUkFUSU9OLCBpdCBoYXMgYmVlbiB2YWxpZGF0ZWQuXG5leHBvcnQgZnVuY3Rpb24gdHJhY2tQYWdlQWN0aXZpdGllcyhsaWZlQ3ljbGUpIHtcblx0dmFyIG9ic2VydmFibGUgPSBuZXcgT2JzZXJ2YWJsZSgpXG5cdHZhciBzdWJzY3JpcHRpb25zID0gW11cblx0dmFyIGZpcnN0UmVxdWVzdEluZGV4XG5cdHZhciBwZW5kaW5nUmVxdWVzdHNDb3VudCA9IDBcblxuXHRzdWJzY3JpcHRpb25zLnB1c2goXG5cdFx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9TRVRfREFUQV9VUERBVEUsIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5vdGlmeVBhZ2VBY3Rpdml0eSgpXG5cdFx0fSksXG5cdFx0bGlmZUN5Y2xlLnN1YnNjcmliZShMaWZlQ3ljbGVFdmVudFR5cGUuUEFHRV9BTElBU19BQ1RJT04sIGZ1bmN0aW9uICgpIHtcblx0XHRcdG5vdGlmeVBhZ2VBY3Rpdml0eSgpXG5cdFx0fSksXG5cdClcblxuXHRzdWJzY3JpcHRpb25zLnB1c2goXG5cdFx0bGlmZUN5Y2xlLnN1YnNjcmliZShcblx0XHRcdExpZmVDeWNsZUV2ZW50VHlwZS5SRVFVRVNUX1NUQVJURUQsXG5cdFx0XHRmdW5jdGlvbiAoc3RhcnRFdmVudCkge1xuXHRcdFx0XHRpZiAoZmlyc3RSZXF1ZXN0SW5kZXggPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdGZpcnN0UmVxdWVzdEluZGV4ID0gc3RhcnRFdmVudC5yZXF1ZXN0SW5kZXhcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBlbmRpbmdSZXF1ZXN0c0NvdW50ICs9IDFcblx0XHRcdFx0bm90aWZ5UGFnZUFjdGl2aXR5KClcblx0XHRcdH0sXG5cdFx0KSxcblx0KVxuXG5cdHN1YnNjcmlwdGlvbnMucHVzaChcblx0XHRsaWZlQ3ljbGUuc3Vic2NyaWJlKFxuXHRcdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJFUVVFU1RfQ09NUExFVEVELFxuXHRcdFx0ZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRcdFx0Ly8gSWYgdGhlIHJlcXVlc3Qgc3RhcnRlZCBiZWZvcmUgdGhlIHRyYWNraW5nIHN0YXJ0LCBpZ25vcmUgaXRcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGZpcnN0UmVxdWVzdEluZGV4ID09PSB1bmRlZmluZWQgfHxcblx0XHRcdFx0XHRyZXF1ZXN0LnJlcXVlc3RJbmRleCA8IGZpcnN0UmVxdWVzdEluZGV4XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdHBlbmRpbmdSZXF1ZXN0c0NvdW50IC09IDFcblx0XHRcdFx0bm90aWZ5UGFnZUFjdGl2aXR5KClcblx0XHRcdH0sXG5cdFx0KSxcblx0KVxuXG5cdGZ1bmN0aW9uIG5vdGlmeVBhZ2VBY3Rpdml0eSgpIHtcblx0XHRvYnNlcnZhYmxlLm5vdGlmeSh7IGlzQnVzeTogcGVuZGluZ1JlcXVlc3RzQ291bnQgPiAwIH0pXG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG9ic2VydmFibGU6IG9ic2VydmFibGUsXG5cdFx0c3RvcDogZnVuY3Rpb24gKCkge1xuXHRcdFx0ZWFjaChzdWJzY3JpcHRpb25zLCBmdW5jdGlvbiAoc3ViKSB7XG5cdFx0XHRcdHN1Yi51bnN1YnNjcmliZSgpXG5cdFx0XHR9KVxuXHRcdH0sXG5cdH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdhaXRQYWdlQWN0aXZpdGllc0NvbXBsZXRpb24oXG5cdHBhZ2VBY3Rpdml0aWVzT2JzZXJ2YWJsZSxcblx0c3RvcFBhZ2VBY3Rpdml0aWVzVHJhY2tpbmcsXG5cdGNvbXBsZXRpb25DYWxsYmFjayxcbikge1xuXHR2YXIgaWRsZVRpbWVvdXRJZFxuXHR2YXIgaGFzQ29tcGxldGVkID0gZmFsc2VcblxuXHR2YXIgdmFsaWRhdGlvblRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdGNvbXBsZXRlKHsgaGFkQWN0aXZpdHk6IGZhbHNlIH0pXG5cdH0sIFBBR0VfQUNUSVZJVFlfVkFMSURBVElPTl9ERUxBWSlcblx0dmFyIG1heER1cmF0aW9uVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0Y29tcGxldGUoeyBoYWRBY3Rpdml0eTogdHJ1ZSwgZW5kVGltZTogbm93KCkgfSlcblx0fSwgUEFHRV9BQ1RJVklUWV9NQVhfRFVSQVRJT04pXG5cdHBhZ2VBY3Rpdml0aWVzT2JzZXJ2YWJsZS5zdWJzY3JpYmUoZnVuY3Rpb24gKGRhdGEpIHtcblx0XHR2YXIgaXNCdXN5ID0gZGF0YS5pc0J1c3lcblx0XHRjbGVhclRpbWVvdXQodmFsaWRhdGlvblRpbWVvdXRJZClcblx0XHRjbGVhclRpbWVvdXQoaWRsZVRpbWVvdXRJZClcblx0XHR2YXIgbGFzdENoYW5nZVRpbWUgPSBub3coKVxuXHRcdGlmICghaXNCdXN5KSB7XG5cdFx0XHRpZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdGNvbXBsZXRlKHsgaGFkQWN0aXZpdHk6IHRydWUsIGVuZFRpbWU6IGxhc3RDaGFuZ2VUaW1lIH0pXG5cdFx0XHR9LCBQQUdFX0FDVElWSVRZX0VORF9ERUxBWSlcblx0XHR9XG5cdH0pXG5cblx0ZnVuY3Rpb24gc3RvcCgpIHtcblx0XHRoYXNDb21wbGV0ZWQgPSB0cnVlXG5cdFx0Y2xlYXJUaW1lb3V0KHZhbGlkYXRpb25UaW1lb3V0SWQpXG5cdFx0Y2xlYXJUaW1lb3V0KGlkbGVUaW1lb3V0SWQpXG5cdFx0Y2xlYXJUaW1lb3V0KG1heER1cmF0aW9uVGltZW91dElkKVxuXHRcdHN0b3BQYWdlQWN0aXZpdGllc1RyYWNraW5nKClcblx0fVxuXG5cdGZ1bmN0aW9uIGNvbXBsZXRlKHBhcmFtcykge1xuXHRcdGlmIChoYXNDb21wbGV0ZWQpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRzdG9wKClcblx0XHRjb21wbGV0aW9uQ2FsbGJhY2socGFyYW1zKVxuXHR9XG5cblx0cmV0dXJuIHsgc3RvcDogc3RvcCB9XG59XG4iLCJpbXBvcnQgeyBMaWZlQ3ljbGVFdmVudFR5cGUgfSBmcm9tICcuLi8uLi9jb3JlL2xpZmVDeWNsZSdcbmltcG9ydCB7IEJhdGNoLCBIdHRwUmVxdWVzdCB9IGZyb20gJy4uLy4uL2NvcmUvdHJhbnNwb3J0J1xuaW1wb3J0IHsgUnVtRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vaGVscGVyL2VudW1zJ1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UnVtQmF0Y2goY29uZmlndXJhdGlvbiwgbGlmZUN5Y2xlKSB7XG5cdHZhciBiYXRjaCA9IG1ha2VSdW1CYXRjaChjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUpXG5cdGxpZmVDeWNsZS5zdWJzY3JpYmUoXG5cdFx0TGlmZUN5Y2xlRXZlbnRUeXBlLlJVTV9FVkVOVF9DT0xMRUNURUQsXG5cdFx0ZnVuY3Rpb24gKHNlcnZlclJ1bUV2ZW50KSB7XG5cdFx0XHRpZiAoc2VydmVyUnVtRXZlbnQudHlwZSA9PT0gUnVtRXZlbnRUeXBlLlZJRVcpIHtcblx0XHRcdFx0YmF0Y2gudXBzZXJ0KHNlcnZlclJ1bUV2ZW50LCBzZXJ2ZXJSdW1FdmVudC5wYWdlLmlkKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YmF0Y2guYWRkKHNlcnZlclJ1bUV2ZW50KVxuXHRcdFx0fVxuXHRcdH0sXG5cdClcblx0cmV0dXJuIHtcblx0XHRzdG9wOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRiYXRjaC5zdG9wKClcblx0XHR9LFxuXHR9XG59XG5cbmZ1bmN0aW9uIG1ha2VSdW1CYXRjaChjb25maWd1cmF0aW9uLCBsaWZlQ3ljbGUpIHtcblx0dmFyIHByaW1hcnlCYXRjaCA9IGNyZWF0ZVJ1bUJhdGNoKGNvbmZpZ3VyYXRpb24uZGF0YWtpdFVybCwgbGlmZUN5Y2xlKVxuXG5cdGZ1bmN0aW9uIGNyZWF0ZVJ1bUJhdGNoKGVuZHBvaW50VXJsLCBsaWZlQ3ljbGUpIHtcblx0XHRyZXR1cm4gbmV3IEJhdGNoKFxuXHRcdFx0bmV3IEh0dHBSZXF1ZXN0KGVuZHBvaW50VXJsLCBjb25maWd1cmF0aW9uLmJhdGNoQnl0ZXNMaW1pdCksXG5cdFx0XHRjb25maWd1cmF0aW9uLm1heEJhdGNoU2l6ZSxcblx0XHRcdGNvbmZpZ3VyYXRpb24uYmF0Y2hCeXRlc0xpbWl0LFxuXHRcdFx0Y29uZmlndXJhdGlvbi5tYXhNZXNzYWdlU2l6ZSxcblx0XHRcdGNvbmZpZ3VyYXRpb24uZmx1c2hUaW1lb3V0LFxuXHRcdFx0bGlmZUN5Y2xlLFxuXHRcdClcblx0fVxuXG5cdHZhciBzdG9wcGVkID0gZmFsc2Vcblx0cmV0dXJuIHtcblx0XHRhZGQ6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG5cdFx0XHRpZiAoc3RvcHBlZCkge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdHByaW1hcnlCYXRjaC5hZGQobWVzc2FnZSlcblx0XHR9LFxuXHRcdHN0b3A6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHN0b3BwZWQgPSB0cnVlXG5cdFx0fSxcblx0XHR1cHNlcnQ6IGZ1bmN0aW9uIChtZXNzYWdlLCBrZXkpIHtcblx0XHRcdGlmIChzdG9wcGVkKSB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0cHJpbWFyeUJhdGNoLnVwc2VydChtZXNzYWdlLCBrZXkpXG5cdFx0fSxcblx0fVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJleHBvcnQgeyBkYXRhZmx1eFJ1bSB9IGZyb20gJy4vYm9vdC9ydW0uZW50cnknXG4iXSwic291cmNlUm9vdCI6IiJ9