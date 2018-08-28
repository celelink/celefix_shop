<template>
	<div class="paymentlist_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" :title="title" class="paymentlist-title"></x-header>
		<section class="paymentlist-list">
			<p class="paynum">壹只桃-订单编号：{{this.$route.query.orderId}}</p>
			<p class="paymoney">￥{{this.$route.query.priceSum}}</p>
			<cell title="收款方" class="white">
				<div slot="value">
					<span style="color: #000">{{payee}}</span>
				</div>
			</cell>
			<div class="pay-foot">
				<x-button class="pay-ok" @click.native="payMoneyOk">立即支付</x-button>
			</div>
		</section>
	</div>
</template>

<script>
	import { XHeader, XButton, Cell } from 'vux'
	import eventBus from '../../service/eventbus';
	import { getStore, setStore, removeStore } from '../../../config/mUtils'
	import { getCumUserDefaultAddress, pay, doOrderStatus } from '../../../service/getData'
	import wx from 'weixin-js-sdk'
	export default {
		data() {
			return {
				title: '支付确认',
				isempty: false,
				ischeck: false,
				orderId: 0,
				payee: '默秀（上海）展示服务有限公司',
				paylist: [
					//            {imgSrc:'../../../../static/weixin.png', name:'银联支付', des:'推荐使用银联支付'},
					{
						imgSrc: './static/union.png',
						name: '微信支付',
						des: '微信用户推荐使用'
					}
				]
			}
		},
		mounted() {
			this.orderId = this.$route.query.orderId
			setStore('orderId', this.orderId);
			this.type = this.$route.query.type
		},

		created() {

		},
		components: {
			XHeader,
			XButton,
			Cell
		},
		methods: {
			payMoneyOk() {
				if(this.orderId === 'undefined' || getStore('openId') === 'undefined') {
					this.$router.push({
						name: 'Auth'
					})
				}
				pay(this.$route.query.orderId, getStore('openId')).then(resolved => {
					if(resolved.msgCode == '0000') {
						if(typeof WeixinJSBridge == "undefined") {
							if(document.addEventListener) {
								document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
							} else if(document.attachEvent) {
								document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
								document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
							}
						} else {
							onBridgeReady(resolved.data);
						}

						removeStore('address')
						removeStore('arrList')
					} else {
						this.$nextTick(() => {
							this.$vux.toast.show({
								type: 'text',
								position: 'middle',
								text: resolved.msg
							})
						})
					}
				})
				console.log('开始支付了')
			}
		}
	}

	function onBridgeReady(param) {
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": param.appId, //公众号名称，由商户传入
				"timeStamp": param.timeStamp, //时间戳，自1970年以来的秒数
				"nonceStr": param.nonceStr, //随机串
				"package": param.package,
				"signType": param.signType, //微信签名方式:
				"paySign": param.paySign //微信签名
			},
			function(res) {
				//alert(getStore('orderId')+"<<<<>>>>")
				if(res.err_msg == "get_brand_wcpay_request:ok") {
					//支付成功，待发货
					doOrderStatus(getStore('orderId'), 1, getStore('userId')).then(resolved => {
						//alert(JSON.stringify(resolved))
						if(resolved.msgCode == '0000') {
							location.href = 'http://test.celelink.com/celelink_shop/order?type=2'
							//this.$router.push({name: 'Order'})
							//this.$router.push({name: 'OrderDateilsFinish',query: { id: resolved.data}})
						} else {
							this.$nextTick(() => {
								this.$vux.toast.show({
									type: 'text',
									position: 'middle',
									text: resolved.msg
								})
							})
						}
					})
					this.$nextTick(() => {
						this.$vux.toast.show({
							type: 'text',
							position: 'middle',
							text: resolved.msg
						})
					})
				}
			}
		);
	}
</script>

<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	@white: #ffffff;
	.paymentlist_page {
		p {
			text-align: center;
		}
		.paynum {
			padding: 0.56rem 0 0.45333rem;
		}
		.paymoney {
			color: #ff0000;
			font-weight: bold;
			font-size: 28px;
		}
		.paymentlist-title {
			background-color: @white;
			color: #000!important;
			font-size: 16px!important;
		}
		.pay-foot {
			padding: 0 1.2666rem;
			.pay-ok {
				margin-top: 1.22666rem;
				background-color: #ff0000;
				color: @white
			}
		}
	}
</style>