<template>
	<div class="cart_page">
		<div v-title>{{ title }}</div>
		<!-- 头部 -->
		<!-- <x-header :left-options="{backText: ''}" @on-click-more="showMenus = true" class="page-head">{{ title }}</x-header> -->
		<section v-if="isempty">
			<div class="shop-empty">
				<img src="../../assets/shop-empty.png" alt="">
				<p>空空如也~</p>
				<flexbox class="empty-btn">
					<flexbox-item class="empty-btn-left">
						<x-button plain mini type="default" @click.native="openWindow('Home')">马上抢购</x-button>
					</flexbox-item>
					<flexbox-item class="empty-btn-right">
						<x-button plain mini type="default" @click.native="openWindow('Collection')">查看收藏</x-button>
					</flexbox-item>
				</flexbox>
			</div>
			<!--<p class="line">你可能还想买</p>
			<div class="list-box">
				<div v-for="(src,i) in list" class="list-item" :key="i">
					<span class="loading">加载中</span>
					<x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
					<div>测试商品</div>
					<div>￥9999</div>
				</div>
			</div>-->
		</section>
		<section v-else>
			<!-- <div class="order-list-item" v-for="(item,i) in list" :key="i">
				<nav>
					<div class="order-list-item-hd">
						<div>
							<check-icon :value.sync="ischeck"></check-icon>
							<img class="order-list-item-hd-logo" :src="item.goods.attachmentCover" alt="">
							<p class="shop-title">{{item.goods.shopName}}</p>
						</div>
						<span class="iconfont icon-delete"></span>
					</div>
				</nav>
				<section>
					<div class="order-list-item-bd">
						<div class="item-left">
							<img :src="item.goods.attachmentCover" alt="">
							<div class="item-left-body">
								<p class="tworow">{{item.goods.goodsName}}</p>
								<p class="order-num">X {{item.goodsNumber}} </p>
							</div>
						</div>
						<div class="item-right">
							<p>￥{{item.goods.price}}</p>
							<p class="textDec">￥{{item.goods.price}}</p>
							<p class="specifications">36码/黑</p>
						</div>
					</div>
				</section>
			</div> -->
			<div class="order-list-item" v-for="(item,i) in list" :key="i">
				<section>
					<div class=""></div>
					<div class="order-list-item-bd">
						<!-- <check-icon :value.sync="check"></check-icon> -->
						<checker v-model="checkbox" type="checkbox" default-item-class="default-item" selected-item-class="iconfont icon-xuanzhong">
							<checker-item :value="item.id" @on-item-click="onItemClick"></checker-item>
						</checker>
						<div class="item-left">
							<img :src="item.goods.attachmentCover" alt="">
							<div class="item-left-body">
								<p class="tworow">{{item.goods.goodsName}}</p>
								<group class="order-num">
									<cell>
										<x-number :fillable="true" style="display:block" :min="1" :max="item.goods.inventory < item.goodsNumber ? item.goodsNumber : item.goods.inventory" width="70px" :value="item.goodsNumber" ref="inlineNum" @on-change="change(item.id,item.goods.id,i,item.goods.inventory,item.goodsNumber)"></x-number>
									</cell>
								</group>
							</div>
							<div class="item-right">
								<div>
									<p>￥{{item.goods.price}}</p>
									<p class="textDec">￥{{item.goods.price}}</p>
								</div>
								<p class="iconfont icon-delete" @click="del(item.goods.id,i)"></p>
								<!-- <p class="specifications">默认</p> -->
							</div>
						</div>
					</div>
				</section>
			</div>
			<flexbox class="foot">
				<p class="foot-left">
					<checker v-model="checkboxAll" type="checkbox" default-item-class="default-item" selected-item-class="iconfont icon-xuanzhong" class="checkbox-item">
						<checker-item value="1" @on-item-click="onItemClick"></checker-item><span>全选</span>
					</checker>
				</p>
				<p>
					合计：<span class="foot-format-text">{{allVal}}</span>
				</p>
				<p>
					<x-button type="warn" class="btn" @click.native="pay">结算({{checkbox.length}})</x-button>
				</p>
			</flexbox>
		</section>
		<foot-guide></foot-guide>
	</div>

</template>

<script>
	import footGuide from '../../components/footer/footGuide.vue'
	import { XHeader, XButton, Flexbox, FlexboxItem, XImg, CheckIcon, Checker, CheckerItem, Group, Cell, XNumber } from 'vux'
	import { getShopCartList, delCart, doShopCart } from '../../service/getData'
	import { getStore, setStore } from '../../config/mUtils.js'
	import { formalname } from '../../config/env.js'

	export default {
		components: {
			XHeader,
			footGuide,
			XButton,
			Flexbox,
			FlexboxItem,
			XImg,
			CheckIcon,
			Checker,
			CheckerItem,
			Group,
			Cell,
			XNumber
		},
		mounted() {
			var that = this.$vux.loading;
			//我的购物车//getStore('userId')
			getShopCartList(formalname===1?1037:getStore('userId')).then(resolved => {
				// console.log(JSON.stringify(resolved))
				if(resolved.msgCode != '0000') {
					that.show({
						text: resolved.msg
					})
				}
				setTimeout(() => {
					that.hide();
				}, 1000)

				if(resolved.data.length == 0 || typeof resolved.data == undefined) {
					this.isempty = true
				}
				this.list = resolved.data
				// console.log(this.list)
			})
		},
		methods: {
			success(src, ele) {
				console.log('success load', src)
				const span = ele.parentNode.querySelector('span')
				ele.parentNode.removeChild(span)
			},
			error(src, ele, msg) {
				console.log('error load', msg, src)
				const span = ele.parentNode.querySelector('span')
				span.innerText = '加载失败'
			},
			change(listId, id, index, inventory, val) {
				let num = 0
				this.$refs.inlineNum.forEach((ele, i) => {
					num += ele.currentValue * parseFloat(ele.title)
					this.currentValue2 = num.toFixed(2)
					if(i === index) {
						this.list[index].goodsNumber = ele.currentValue
						// console.log(ele.currentValue)
					}
				})
				if(this.list[index].goodsNumber != val) {
					var goodNum = this.list[index].goodsNumber - val
					//加入购物车//getStore('userId')
					doShopCart(formalname===1?1037:getStore('userId'), id, goodNum).then(resolved => {
						if(resolved.msgCode == '0000') {

						} else {
							this.$vux.toast.show({
								text: resolved.msg
							})
						}
					})
					this.upData()
					console.log(this.list[index].goodsNumber + "<<<<<>>>>>" + val)
				}

			},
			 openWindow(path){
			      this.$router.push({name:path})
			},
			pay() {
				if(this.checkbox.length === 0 || this.allVal === 'NaN') {
					return this.$vux.toast.show({
						text: '您还没有选择商品哦',
						type: 'text',
						position: 'bottom',
						width: '5rem'
					})
				}
				for(var i = 0; i < this.list.length; i++) {
					for(var j = 0; j < this.checkbox.length; j++) {
						if(this.checkbox[j] == this.list[i].id) {
							this.checkList.push(this.list[i]);
						}
					}
				}
				setStore('arrList', this.checkList)
				this.$router.push({
					name: 'OrderDateils',
					query: {
						istype: 'cart'
					}
				})
				console.log(this.allVal)
			},
			onItemClick(value) {
				if(value === '1') {
					if(this.ischeck) {
						this.ischeck = false
						this.checkbox = []
						this.allVal = 0
					} else {
						this.checkbox = []
						this.ischeck = true;
						this.list.forEach(function(element) {
							this.checkbox.push(element.id)
						}, this);
					}
				} else {
					if(this.checkbox.length === this.list.length) {
						this.checkboxAll.push('1')
						this.ischeck = true
					} else {
						this.checkboxAll = []
						this.ischeck = false
					}
				}
			},
			del(id, index) {
				//我的购物车//getStore('userId')
				console.log(id)
				delCart(formalname===1?1037:getStore('userId'), id).then(resolved => {
					console.log(JSON.stringify(resolved))
					if(resolved.msgCode == '0000') {
						this.$vux.toast.show({
							text: '删除成功'
						})
						this.list.splice(index, 1)
					} else {
						this.$vux.toast.show({
							text: resolved.msg
						})
					}
				})
			},
			upData() {
				let newVal = 0
				if(this.checkbox.length != 0) {
					this.checkbox.forEach((element) => {
						this.list.map((val, index, input) => {
							if(val.id === element) {
								newVal += val.goods.price * val.goodsNumber
								return this.allVal = newVal.toFixed(2)
							}
						})
					}, this)
				} else {
					return this.allVal = 0
				}
			}
		},
		filters: {
			// formatVal(val){
			// 	console.log(val)
			// 	if(val>99999999)
			// 		return '￥ ' + parseFloat(val/10000000).toPrecision(2) +'万'
			// 	else
			// 		return '￥ ' + val
			// }
		},
		watch: {
			list() {
				this.list.forEach((ele) => {
					return this.str += JSON.stringify(ele)
					console.log(str)
				})
			},
			checkbox() {
				this.upData()
			}
		},
		data() {
			return {
				title: '购物车',
				isempty: false,
				ischeck: false,
				allVal: 0,
				str: '',
				checkbox: [],
				checkboxAll: [],
				checkList: [],
				list: [{
					'id': 0,
					"goods": {
						"attachmentCover": ""
					}
				}]
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #ffffff;
	.cart_page {
		padding-bottom: 100px
	}
	
	.page-head {
		margin-bottom: 0.13333rem;
	}
	
	.shop-empty {
		text-align: center;
		background-color: @white;
		padding-bottom: 0.34666rem;
		.vux-flexbox-item {
			text-align: center;
		}
		.empty-btn {
			margin-top: 0.42666rem;
			.empty-btn-left {
				width: 3.4rem;
				height: 0.90666rem;
			}
		}
		img {
			width: 4rem;
			height: 3.6rem;
		}
	}
	
	.line {
		text-align: center;
		position: relative;
		margin: 0.32rem 0 0.05333rem;
		background-color: @white;
		height: 1.73333rem;
		line-height: 1.73333rem;
	}
	
	.line:after,
	.line:before {
		position: absolute;
		content: '';
		top: 50%;
		height: 1px;
		background-color: #000;
		width: 0.69333rem;
	}
	
	.line:after {
		left: 50%;
		transform: translate(-2rem, 0)
	}
	
	.line:before {
		right: 50%;
		transform: translate(2rem, 0)
	}
	
	// 商品列表
	.list-box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.list-item {
			position: relative;
			width: 4.96rem;
			height: 6.2rem;
			padding-bottom: 0.4rem;
			margin-bottom: 0.05333rem;
			background-color: @white;
			.loading {
				text-align: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -85%);
				width: 2.4rem;
				height: 2.4rem;
				line-height: 2.4rem;
				border-radius: 50%;
				background-color: rgba(103, 102, 102, 0.3);
				color: @white;
			}
			img {
				width: 100%;
				height: 4.24rem;
			}
		}
	}
	
	.order-list-item {
		padding: 0.32rem;
		background-color: @white;
		margin-bottom: 0.13333rem;
		.order-list-item-bd {
			display: flex;
			position: relative;
			align-items: center;
			min-height: 2.7rem;
			padding: 0.2rem 0;
			.item-left {
				display: flex;
				flex-grow: 1;
				margin-left: 5px;
				.weui-cell {
					padding: 0;
					flex-direction: row-reverse;
				}
				img {
					width: 2.24rem;
					height: 2.24rem;
					min-width: 2.24rem;
					min-height: 2.24rem;
				}
				.item-left-body {
					flex-grow: 1;
					margin-left: 5px;
					.order-num {
						margin-top: 10px;
					}
				}
				.item-left-body,
				.item-right {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.iconfont {
					text-align: right;
				}
			}
		}
	}
	
	.order-list-item-hd {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: @white;
		border-bottom: 1px solid #ccc;
		.shop-title {
			display: inline-flex;
			white-space: nowrap;
			overflow: hidden;
			/** 隐藏超出的内容 **/
			text-overflow: ellipsis;
		}
		.order-list-item-hd-logo {
			width: 42px;
			height: 42px;
			margin-left: -2px;
			vertical-align: middle;
		}
	}
	
	.foot {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 56px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: @white;
		.foot-head {
			display: flex;
		}
		.btn {
			border-radius: 0;
		}
		.foot-left {
			display: flex;
			align-items: center;
		}
		.foot-format-text {
			color: #ff0000;
			font-weight: bold;
		}
	}
</style>