# 微信小程序DataFlux RUM 数据采集SDK
通过引入sdk文件，监控小程序性能指标，错误log，以及资源请求情况数据，上报到DataFlux 平台datakit

## 使用方法
### npm 引入(可参考微信官方[npm引入方式](https://developers.weixin.qq.com/miniprogram/dev/devtools/npm.html))
```javascript
const { datafluxRum } = require('@cloudcare/rum-miniapp')
// 初始化 Rum
datafluxRum.init({
	datakitOrigin: 'https://datakit.xxx.com/',// 必填，Datakit域名地址 需要在微信小程序管理后台加上域名白名单
	applicationId: 'appid_xxxxxxx', // 必填，dataflux 平台生成的应用ID
	env: 'testing', // 选填，小程序的环境
    version: '1.0.0' // 选填，小程序版本
})
```
### CDN 下载文件本地方式引入([下载地址](https://static.dataflux.cn/js-sdk/dataflux-rum-miniapp.js))

```javascript
const { datafluxRum } = require('./lib/dataflux-rum-miniapp.js')
// 初始化 Rum
datafluxRum.init({
	datakitOrigin: 'https://datakit.xxx.com/',// 必填，Datakit域名地址 需要在微信小程序管理后台加上域名白名单
	applicationId: 'appid_xxxxxxx', // 必填，dataflux 平台生成的应用ID
	env: 'testing', // 选填，小程序的环境
    version: '1.0.0' // 选填，小程序版本
})
```

## 配置

### 初始化参数

| 参数            | 类型   | 是否必须 | 默认值 | 描述                                                                                                         |
| --------------- | ------ | -------- | ------ | ------------------------------------------------------------------------------------------------------------ |
| `applicationId` | String | 是       |        | 从 dataflux 创建的应用 ID                                                                                    |
| `datakitOrigin` | String | 是       |        | datakit 数据上报 Origin;`注意：需要在小程序管理后台加上request白名单`                                        |
| `env`           | String | 否       |        | 小程序 应用当前环境， 如 prod：线上环境；gray：灰度环境；pre：预发布环境 common：日常环境；local：本地环境； |
| `version`       | String | 否       |        | 小程序 应用的版本号                                                                                          |
| `sampleRate`    | Number | 否       | `100`  | 指标数据收集百分比: `100`表示全收集，`0`表示不收集                                                           |


## 注意事项

1. `datakitOrigin` 所对应的datakit域名必须在小程序管理后台加上request白名单
2. 因为目前微信小程序请求资源API`wx.request`、`wx.downloadFile`返回数据中`profile`字段目前ios系统不支持返回，所以会导致收集的资源信息中和timing相关的数据收集不全。目前暂无解决方案，[request](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html), [downloadFile](https://developers.weixin.qq.com/miniprogram/dev/api/network/download/wx.downloadFile.html) ;[API支持情况](https://developers.weixin.qq.com/community/develop/doc/000ecaa8b580c80601cac8e6f56000?highLine=%2520request%2520profile)