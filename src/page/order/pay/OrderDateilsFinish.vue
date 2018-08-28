<template>
	<div class="dateils_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" :title="title" class="page-head"></x-header>
		<ul>
			<li class="order-title">
				<p>{{obj.statusName}}</p>
				<p>订单编号：{{obj.orderId}}</p>
				<p>下单时间：{{obj.createTime}}</p>
			</li>
			<li class="order-head" v-show="obj.orderStatus>=2&&obj.orderStatus!=5&&obj.orderStatus!=6">
				<div><span class="iconfont icon-daishouhuo-xian"></span></div>
				<div class="order-message">
					<p class="order-phone">快递公司：{{obj.mailName}}</p>
					<p class="order-address">快递单号：{{obj.mailNumber}}</p>
				</div>
				<div><!--<span class="iconfont icon-fangxiangyou"></span>--></div>
			</li>
			<li class="order-head">
				<div><span class="iconfont icon-dizhi"></span></div>
				<div class="order-message">
					<p class="order-phone">收货人：{{obj.contacts}}<span class="textC phone">15000946761</span></p>
					<p class="order-address tworow">收货地址：{{obj.proStr}}{{obj.cityStr}}{{obj.regionStr}}{{obj.orderAddress}}</p>
				</div>
				<div><!--<span class="iconfont icon-fangxiangyou"></span>--></div>
			</li>
			<li class="order-last-head">
				<img :src="obj.goodsVo.attachmentCover" :alt="obj.goodsVo.goodsName">
				<div class="order-shop-message">
					<p class="order-item-title"><span class="tworow title">{{obj.goodsVo.goodsName}}</span><span>￥{{obj.orderCost}}</span></p>
					<p class="textC">{{obj.goodsVo.shopName}}</p>
					<p class="order-price"><span>默认</span><span>X{{obj.num}}</span></p>
				</div>
			</li>
			<li>
				<group>
					<cell-form-preview :list="[{label:'商品总价',value:obj.orderCost},{label: '运费',value:(obj.orderActualMoney-obj.orderCost).toFixed(2)},{label: '实付款（在线支付）',value:obj.orderActualMoney}]"></cell-form-preview>
				</group>
			</li>
		</ul>
		<div class="foot">
			<x-button type="default" plain mini @click.native="comment('comment',obj.id)" v-show="obj.orderStatus===3">评论</x-button>
			<x-button type="default" plain mini @click.native="comment('cancel',obj.orderId)" v-show="obj.orderStatus===0">取消订单</x-button>
			<x-button type="default" plain mini @click.native="comment('delete',obj.orderId)" v-show="obj.orderStatus===4">删除订单</x-button>
			<x-button type="warn" plain mini @click.native="payment(obj.orderId, obj.orderActualMoney.toFixed(2))" v-show="obj.orderStatus===0">确认付款</x-button>
			<x-button type="primary" plain mini class="custom-primary-red" @click.native="comment('again',obj.goodsVo.id)" v-show="obj.orderStatus>=1">再次购买</x-button>
			<x-button type="warn" mini  @click.native="comment('signfor',obj.orderId)" v-show="obj.orderStatus===2">确认签收</x-button>
		</div>
	</div>
</template>

<script>

	import { XHeader, InlineXNumber, XButton, Spinner, CellFormPreview, Group, Cell } from 'vux'
	import { getStore, setStore } from '../../../config/mUtils'
	import { getOrderById, doOrderStatus } from '../../../service/getData'

	export default {
		components: {
			XHeader,
			InlineXNumber,
			XButton,
			Spinner,
			CellFormPreview, 
			Group, 
			Cell
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			  getOrderById(this.$route.query.id).then(resolved => {
					if(resolved.msgCode == '0000') {
						this.obj = resolved.data
	                    console.log(resolved.data)
					} else {
						this.$nextTick(()=>{
								this.$vux.toast.show({
									type: 'text',
									position: 'middle',
									text: resolved.msg
								})
							})
						
					}
				})
			setTimeout(()=>{
				this.$vux.loading.hide()
			},800)
		},
		methods: {
			comment(type,id){
				if(type === 'comment') {
					this.$router.push({
						name: 'Grade',
						query: {
							id: id
						}
					})
					console.log('评论')
				} else if(type === 'cancel') {
					//取消订单
					doOrderStatus(id, 5, getStore('userId')).then(resolved => {
						if(resolved.msgCode == '0000') {
							this.$router.push({
								name: 'Order'
							})
						} else {
							this.$nextTick(()=>{
								this.$vux.toast.show({
									type: 'text',
									position: 'middle',
									text: resolved.msg
								})
							})
						}
						console.log('取消订单')
					})

				} else if(type === 'delete') {
					//删除订单
					doOrderStatus(id, 6, getStore('userId')).then(resolved => {
						if(resolved.msgCode == '0000') {
							this.$router.push({
								name: 'Order'
							})
						} else {
							this.$nextTick(()=>{
								this.$vux.toast.show({
									type: 'text',
									position: 'middle',
									text: resolved.msg
								})
							})
						}
					})
					console.log('删除')
				} else if(type === 'again') {
					this.$router.push({
						name: 'Commodity',
						query: {
							id: id
						}
					});
					console.log('再次')
				} else if(type === 'signfor') {
					doOrderStatus(id, 3,  getStore('userId')).then(resolved => {
						if(resolved.msgCode == '0000') {
							this.$router.push({
								name: 'Order'
							})
						} else {
							this.$nextTick(()=>{
								this.$vux.toast.show({
									type: 'text',
									position: 'middle',
									text: resolved.msg
								})
							})
						}
					console.log(resolved)
					})
				}
			},
			payment(id, priceSum) {
				this.$router.push({
					name: 'PaymentListItem',
					query: {
						orderId: id,
						priceSum: priceSum
					}
				})
				console.log('确认')
			},
		},
		data() {
			return {
				title: '订单详情',
				obj:{goodsVo:{attachmentCover:'',goodsName:'',shopName:'',postagePrice:0}}
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #ffffff;
.vux-spinner-ios, .vux-spinner-ios-small{ stroke:@white; }
	.order-title{
		padding: 0.32rem 0.26666rem;
		background-color: @white;
		margin-bottom: 0.21333rem;
		margin-top:4px;
	}
	.order-head,.order-last-head {
		display: flex;
		justify-content: space-between;
		background-color: @white;
		margin-bottom: 0.21333rem;
		align-items: center;
		.iconfont {
			font-size: 0.64rem;
		}
		.order-message {
			margin-left: 0.37333rem;
			flex-grow: 1;
			text-align: left;
		}
		img {
			width: 2.16rem;
			min-width: 2.16rem;
			height: 2.16rem;
		}
		.order-price {
			display: flex;
			justify-content: space-between
		}
		.order-shop-message {
			margin-left: 0.26666rem;
			width:100%;
			.order-item-title{
				display: flex;
				justify-content: space-between;
			}
			.title{
				display: -webkit-inline-box;
				width:72%
			}
		}
	}
	.order-head{
		padding: 0.45333rem 0.26666rem 0.24rem;
		min-height: auto;
		.phone{
			float:right
		}
	}
	.order-last-head{
		margin-bottom: 0;
		padding: 0.45333rem 0.26666rem 0.24rem;
		min-height: 2.65333rem;
	}
	.order-shop-title {
		background-color: @white;
		padding: 0.42666rem 0.26666rem;
		border-bottom: 1px solid #ccc
	}
	
	.foot {
		position: fixed;
		bottom:0;
		left: 0;
		right:0;
		padding:0.26666rem;
		background-color: @white;
		text-align: right;
		button{
			margin-top:0;
		}
	}
	.custom-primary-red {
  border-radius: 5px!important;
  border-color: #CE3C39!important;
  color: #CE3C39!important;
  &:active {
    border-color: rgba(206, 60, 57, 0.6)!important;
    color: rgba(206, 60, 57, 0.6)!important;
    background-color: transparent;
  }
}
</style>