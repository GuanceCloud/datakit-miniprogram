import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const { datafluxRum } = require('./miniprogram/dataflux-rum-miniapp')
// // 初始化 Sentry
datafluxRum.init({
	// datakitOrigin: 'http://10.100.64.249:9529',
	// applicationId: 'appid_f79b4b96645c11eb9eaa7a259b00813d',
	datakitOrigin: 'http://172.16.2.201:31845',
	applicationId: 'appid_6cb4c98eba9143c88c83e544407b1c74',
	env: 'prod',
	version: '1.0.0',
	trackInteractions: true,
})

const app = new Vue({
	...App,
})
app.$mount()
