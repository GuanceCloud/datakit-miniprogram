import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const { datafluxRum } = require('./miniprogram/dataflux-rum-uniapp')
// // 初始化 Sentry
datafluxRum.init(Vue, {
	datakitOrigin: 'http://172.16.2.201:31845',
	applicationId: 'appid_6cb4c98eba9143c88c83e544407b1c74',
	env: 'prod',
	version: '1.0.0',
	trackInteractions: true,
	allowedTracingOrigins: ['http://testing-ft2x-api.cloudcare.cn'],
	traceType: 'zipkin'
})
datafluxRum.setUser({
	id: '1234',
	name: 'John Doe',
	email: 'john@doe.com',
})
datafluxRum && datafluxRum.addRumGlobalContext('isvip', 'xxxx');                     
datafluxRum.addRumGlobalContext('activity', {
    hasPaid: true,
    amount: 23.42
});
const app = new Vue({
	...App,
})
app.$mount()
