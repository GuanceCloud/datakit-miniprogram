<template>
	<view >
			<image src="/static/logo1.png"></image>
			<button v-on:click="t18090"> 18090</button>
			<button v-on:click="t5001"> 5001</button>
			<button v-on:click="t500"> 响应500</button>
			<button v-on:click="t400"> 响应400</button>
			<button v-on:click="t300"> 响应300</button>
			<button v-on:click="nofunc"> 函数不存在</button>
			<button v-on:click="argserror"> 参数错误</button>
			<button v-on:click="conlog"> 控制台打印日志</button>
			<button v-on:click="goto"> 切换页面</button>
			<button v-on:click="long" ref="backcolor" >{{longtext}} </button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				longtext:"长任务"
			}
		},
		onLoad() {

		},
		methods: {
			t18090:function(){
			uni.request({
				url: "http://172.16.5.9:18090/test/jk",
				method: "POST",
				dataType: "json",
				data:{
					time: "2s"
				},
				header:{
					"content-type": "application/json",
				},
				success: (res) => {
					console.log(res.data);
				}
			});
			},
			t5001:function(){
			uni.request({
				url: "http://172.16.5.9:5001",
				method: "GET",
				// dataType: "json",
				success: (res) => {
					console.log(res.data);
				}
			});
			},
			t500:function(){
			uni.request({
				url: "http://172.16.5.9:18090/test/jk",
				method: "GET",
				data:{
					time: "2s",
					status_code: 500
				},
				success: (res) => {
					console.log(res.data);
				}
			});
			},
			t400:function(){
			uni.request({
				url: "http://172.16.5.9:18090/test/jk",
				method: "GET",
				data:{
					time: "2s",
					status_code: 400
				},
				success: (res) => {
					console.log(res.data);
				}
			});
			},
			t300:function(){
			uni.request({
				url: "http://172.16.5.9:18090/test/jk",
				method: "GET",
				data:{
					time: "1s",
					status_code: 300
				},
				success: (res) => {
					console.log(res.data);
				}
			});
			},
			conlog:function(){
				console.log("test，你好狗子")
			},
			argserror(){
				var result=55+parseInt(ee)+toString(pp)
				console.log(result)
			},
			goto(){
				console.log("test")
				wx.navigateTo({
					url:"../home/home"
				})
			},
			long(){
				var now=performance.now()+500
				while (performance.now()<now){
				}
				// this.$data.longtext="dd"
			},
			
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
