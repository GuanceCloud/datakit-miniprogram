const path = require('path')
module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: 'dataflux-rum-miniapp.js',
		path: path.resolve(__dirname, './demo/miniprogram'),
		libraryTarget: 'commonjs2',
	},

	watchOptions: {
		ignored: /node_modules|demo/, //忽略不用监听变更的目录
		aggregateTimeout: 300, // 文件发生改变后多长时间后再重新编译（Add a delay before rebuilding once the first file changed ）
		poll: 1000, //每秒询问的文件变更的次数
	},
	plugins: [],
	devtool: 'source-map',
}
