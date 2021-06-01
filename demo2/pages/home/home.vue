<template>
	<view>
		<button @click="back">回到主页</button>
	</view>
</template>

<script>
	export default {
		onLoad(){
			
		},
		methods:{
			back:function(){
				wx.navigateBack()
			}
		}
	}
</script>

<style>
</style>
