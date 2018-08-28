<template>
	<div class="inviation_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" :title="title" class="page-head">
			<a slot="right" class="iconfont icon-fenxiang1" @click="share"></a>
		</x-header>
		<div class="inviation-content">
			<img src="../../assets/yaoqinglibao.png" alt="" v-show="!isshare">
			<div id='code'></div>
			<qrcode :value="value" :fg-color="fgColor" v-show="isshare" type="img"></qrcode>
			<!-- <canvas id="canvas"></canvas> -->
			<p class="inviation-text">{{!isshare?'分享立得壹只桃现金积分兑换':'请长按保存图片分享给您的朋友'}}</p>
			<x-button plain type="warn" class="foot" @click.native="share">立即邀请</x-button>
		</div>
	</div>

</template>

<script>
	import { XHeader, XButton, Qrcode } from 'vux'
	import { getStore, setStore } from '../../config/mUtils'

	export default {
		components: {
			XHeader,
			XButton,
			Qrcode
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			this.$vux.loading.hide()
			if(getStore('isshare')){
				this.share()
			}
		},
		methods: {
			share() {
				var userId =  getStore('userId')
				this.value = 'http://test.celelink.com/celelink_shop/auth?id=' + userId
				this.fgColor = '#000000'
				this.isshare = true
				setStore('isshare',true)
			}
		},
		data() {
			return {
				title: '邀请有奖',
				isshare:false,
				value:'',
				fgColor:''
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #fff;
	.inviation_page {
		.inviation-title {
			margin-bottom: 0.13333rem;
			background-color: @white;
		}
		.inviation-content {
			text-align: center;
			padding: 1.41333rem 1.45333rem 0;
			.inviation-text {
				margin: 0.61333rem 0 2.08rem;
			}
		}
	}
</style>