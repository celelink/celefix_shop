<template>
	<div>
		<div v-title>{{ title }}</div>
		<div class="commodity-details">
			<!-- 头部返回和更多
			<div class="commodity-details-head">
				<span class="iconfont icon-fangxiangzuo"></span>
				<span class="iconfont icon-sangedian"></span>
			</div> -->
			<!-- <x-header :left-options="{backText: ''}" :title="title" :right-options="{showMore:true}" class="commodity-details-head"></x-header> -->
			<!-- 轮播图 -->
			<swiper :aspect-ratio="300/800" @on-index-change="onSwiperItemIndexChange" v-model="swiperItemIndex" height="6.53333rem">
				<swiper-item class="swiper-demo-img" v-for="(item, index) in list" :key="index">
					<img :src="item.attachmentUrl" class="imgStyle">
				</swiper-item>
			</swiper>
			<!-- 标题 -->
			<div class="commodity-details-describe">
				<div class="title iconfont" :class="details.inventory===0?'icon-yishouwan':''">{{details.goodsName}}</div>
				<div class="commodity-details-describe-body">
					<div>
					<span class="member-name">会员价</span><span class="member-money">{{details.price}}</span>	<!-- <span class="cost">{{details.price}}</span> -->
					</div>
					<span class="iconfont" :class="isCollection?'icon-shoucang-xian':'icon-shoucang-mian'" @click="Collection(1)"></span>
				</div>
				<div class="commodity-details-describe-freight">
					<div>
						<span class="express-name">快&nbsp;&nbsp;递</span><span class="express-money">{{postagePrice}}.00</span><span class="sales-volume">月销 {{details.volumeCount}}</span>
					</div>
					<p>上海</p>
				</div>
			</div>
			<!-- 规格 -->
			<group class="commodity-details-specifications" @click.native="isopen(1)">
				<cell title="选择套餐">
					<x-icon type="ios-arrow-forward" class="cell-x-icon" @click="console"></x-icon>
				</cell>
			</group>
			<div class="label">
				<p style="display:flex;align-item:cnetr">
					<badge></badge><span>正品保证</span></p>
				<p>
					<badge></badge>售后无忧</p>
				<p>
					<badge></badge>天天低价</p>
			</div>
			<div class="commodity-details-evaluate">
			<!-- 评论标题 -->
			<group class="commodity-details-evaluate-title">
					<cell :title="'评价（'+evaluateList.length+'）'">
						<!--<transition name="router-fade" mode="out-in">
							<router-link :to="{ name: 'Comment', query: { id:details.id }}">查看全部</router-link>
						</transition>
						<x-icon type="ios-arrow-forward" class="cell-x-icon" @click="console">654165</x-icon>-->
					</cell>
				</group>
			<!-- 评论滑动列表 -->
			<scroller lock-y :scrollbar-x="false" ref="scrollers">
					<div class="evaluate-list" :style="'width:'+width+'rem'">
						<div class="evaluate-list-item" v-for="(item,i) in evaluateList" :key="i" v-show="isevaluateList">
							<div>
								<span class="logo-position">
                <img class="evaluate-list-item-logo" :src="item.headPic" alt="">
                <span class="iconfont icon-wodehuiyuan"></span>
								</span>
								<span class="evaluate-list-item-nickname">{{item.createName}}</span>
							</div>
							<div class="evaluate-list-item-comment" slot="label">{{item.evaluateDesc}}</div>
							<p class="evaluate-list-item-specifications">{{item.spec}}</p>
						</div>
						<div v-show="!isevaluateList">暂无评价</div>
					</div>
				</scroller>
			</div>
			<!-- 店铺信息 -->
			<section class="evaluate-shop">
				<div class="evaluate-shop-item">
					<div class="evaluate-shop-item-title">
						<img class="evaluate-shop-item-logo" src="../../assets/logo.png" alt="">
						<div>
							<p>{{details.shopName}}</p>
						</div>
					</div>
					<div>
						<x-button type="primary" class="custom-primary-red" mini plain action-type="reset" @click.native="Collection(2)">{{isShop?'收藏':'已收藏'}}</x-button>
					</div>
				</div>
				<!--  <p class="evaluate-shop-button">进入店铺</p>-->
			</section>
			<!-- 商品详情介绍 -->
			<p class="describe">商品详情</p>

			<div class="describe-list" v-html="details.details">
			</div>
			<br>
			<br>
			<br>
			<div class="bottom-function">
				<div class="customer-service" @click="openWindow({path:'/customer'})">
					<span class="iconfont icon-kefu"></span>
					<p class="font-title">客服</p>
				</div>
				<!-- 购物车 -->
				<!-- <div class="cat" @click="openWindow({path:'/cart'})">
					<span class="iconfont icon-caigou-xian"><badge :text="count" class="dot"></badge></span>
					<p class="font-title">购物车</p>
				</div> -->
				<div class="shopping-cart" @click="isopen(1)">加入购物车</div>
				<div class="confirm-purchase" @click="isopen(2)">立即购买</div>
			</div>

			<div v-transfer-dom>
				<popup v-model="show" @on-hide="log('hide')" @on-show="log('show')">
					<div class="popup0">
						<div class="title">
							<img :src="this.details.attachmentCover" alt="">
							<div class="title-content">
								<p>{{price}}</p>
								<p>库存 {{maxValue}}</p>
								<!--<p>选择尺码 主要颜色</p>-->
							</div>
							<span class="iconfont icon-cha" @click="close"></span>
						</div>
						<div class="popup0-content">
							<checker v-model="selectSize" default-item-class="popup0-type-item" selected-item-class="popup0-type-item-selected" class="popup0-type-item-list">
								<checker-item class="popup0-type-item-selected" v-for="i in [1]" :key="i" :value="i">默认套餐</checker-item>
							</checker>
							<!--<p class="popup0-type-title">尺码</p>
							<checker v-model="selectSize" default-item-class="popup0-type-item" selected-item-class="popup0-type-item-selected" class="popup0-type-item-list">
								<checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">￥{{i*3}}</checker-item>
							</checker>
							<p class="popup0-type-title">颜色分类</p>
							<checker v-model="selectColor" default-item-class="popup0-type-item" selected-item-class="popup0-type-item-selected" class="popup0-type-item-list">
								<checker-item v-for="i in [1, 2, 3]" :key="i" :value="i">￥{{i*3}}</checker-item>
							</checker>-->
							<group class="content-num">
								<cell title="购买数量">
									<inline-x-number style="display:block" :min="1" :max="maxValue" width="70px" v-model="num"></inline-x-number>
								</cell>
							</group>
						</div>
						<div class="foot">
							<x-button class="join-cat" @click.native="joinCat">加入购物车</x-button>
							<x-button class="buy-now" @click.native="buyNow">立即购买</x-button>
						</div>
					</div>
				</popup>
			</div>
		</div>
	</div>

</template>

<script>
	import footGuide from '../../components/footer/footGuide.vue'
	import { getStore, setStore } from '../../config/mUtils'
	import { formalname } from '../../config/env.js'
	import { XHeader, Scroller, Swiper, SwiperItem, Group, Cell, Badge, XButton, Popup, TransferDom, XSwitch, InlineXNumber, Checker, CheckerItem } from 'vux'
	import { getGoodsById, getGoodsEv, doShopCart, countCart, doFootprint, doCollection, delCollection, share, postUserAction} from '../../service/getData'
	import wx from 'weixin-js-sdk'

	export default {
		directives: {
			TransferDom
		},
		components: {
			XHeader,
			footGuide,
			Scroller,
			Swiper,
			SwiperItem,
			Group,
			Cell,
			Badge,
			XButton,
			Popup,
			XSwitch,
			InlineXNumber,
			Checker,
			CheckerItem
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			setStore('refereeId',this.$route.query.refereeId)
			if(getStore('refereeId') != null && getStore('refereeId') != 'undefined'){
				//setStore('userId',0)
				postUserAction(1, getStore('refereeId'),window.location.href.split('&')[0]).then(resolved => {
					
				})
			}
			// if(getStore('openId') == null || getStore('openId') === 'undefined'){
			// 	this.$router.push({name:'Auth'})
			// }
			//接收路由带过来的参数
			this.goodsId = this.$route.query.id
			//商品详情
			getGoodsById(getStore('userId'), this.goodsId).then(resolved => {
				console.log(resolved)
				this.details = resolved.data;
				this.isCollection = resolved.data.isGoods;
				this.isShop = resolved.data.isShop;
				this.goodsName = this.details.goodsName;
				this.list = this.details.attachmentView;
				this.price = resolved.data.price;
				this.postagePrice = resolved.data.postagePrice;
				this.maxValue = resolved.data.inventory;
				this.$vux.loading.hide()
				// console.log(resolved);
			})
			//商品评价数据
			getGoodsEv(this.goodsId).then(resolved => {
				console.log(resolved);
				if(resolved.length===0)return
				this.width = resolved.length * (7.93333+0.26666)+0.53334
				this.evaluateList = resolved
				this.$nextTick(()=>{
					this.$refs.scrollers.reset()
					this.isevaluateList = true
				})
			})

			//我的购物车数量
			// countCart(formalname===1?1037:getStore('userId')).then(resolved => {
			// 	this.count = resolved.data
			// })

			//保存足迹
			// doFootprint(formalname===1?1037:getStore('userId'), this.goodsId).then(resolved => {

			// })
			//授权分享{待完善}
			//this.shareUrl = 'http://test.celelink.com/celelink_shop/commodity?id=100004#1037'
			// this.shareUrl = window.location.href.split('#')[0] + '&refereeId=' + getStore('userId')
			// //alert(this.shareUrl);
			// share(this.shareUrl).then(resolved => {
			// 	wx.config({
			// 		debug: false,
			// 		appId: resolved.data.appid,
			// 		timestamp: resolved.data.timestamp,
			// 		nonceStr: resolved.data.nonceStr,
			// 		signature: resolved.data.signature,
			// 		jsApiList: [
			// 			'onMenuShareTimeline',
			// 			'onMenuShareAppMessage',
			// 			'onMenuShareQQ',
			// 			'onMenuShareWeibo',
			// 			'onMenuShareQZone'
			// 		] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			// 	});
			// })

			// // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在 页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready 函数中。  
			// wx.ready(function() {
			// 	let _this = this
			// 	// 获取"分享到朋友圈"按钮点击状态及自定义分享内容接口  
			// 	wx.onMenuShareTimeline({
			// 		title: '一直淘商城', // 分享标题  
			// 		link: this.shareUrl,
			// 		imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
			// 		success: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '分享成功'
			// 				})
			// 			})
			// 		},
			// 		cancel: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '取消分享'
			// 				})
			// 			})
			// 		}
			// 	});
	
			// 	// 获取"分享给朋友"按钮点击状态及自定义分享内容接口  
			// 	wx.onMenuShareAppMessage({
			// 		title: '一直淘商城', // 分享标题  
			// 		desc: this.goodsName, // 分享描述  
			// 		link: this.shareUrl,
			// 		imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
			// 		type: 'link', // 分享类型,music、video或link，不填默认为link  
			// 		success: function(res) {
			// 			// 用户确认分享后执行的回调函数
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '分享成功'
			// 				})
			// 			})
			// 		},
			// 		cancel: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '取消分享'
			// 				})
			// 			})
						
			// 		}
			// 	});

			// 	//获取"分享到QQ"按钮点击状态及自定义分享内容接口  
			// 	wx.onMenuShareQQ({
			// 		title: '一直淘商城', // 分享标题  
			// 		desc: this.goodsName, // 分享描述  
			// 		link: this.shareUrl, // 分享链接  
			// 		imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
			// 		success: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '分享成功'
			// 				})
			// 			})
			// 		},
			// 		cancel: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '取消分享'
			// 				})
			// 			})
			// 		}
			// 	});

			// 	//获取"分享到腾讯微博"按钮点击状态及自定义分享内容接口  
			// 	wx.onMenuShareWeibo({
			// 		title: '一直淘商城', // 分享标题  
			// 		desc: this.goodsName, // 分享描述  
			// 		link: this.shareUrl, // 分享链接  
			// 		imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
			// 		success: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '分享成功'
			// 				})
			// 			})
			// 		},
			// 		cancel: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '取消分享'
			// 				})
			// 			})
			// 		}
			// 	});

			// 	//获取"分享到QQ空间"按钮点击状态及自定义分享内容接口  
			// 	wx.onMenuShareQZone({
			// 		title: '一直淘商城', // 分享标题  
			// 		desc: this.goodsName, // 分享描述  
			// 		link: this.shareUrl, // 分享链接  
			// 		imgUrl: 'https://celefix.oss-cn-hangzhou.aliyuncs.com/test/20171009172744770.jpg', // 分享图标  
			// 		success: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '分享成功'
			// 				})
			// 			})
			// 		},
			// 		cancel: function(res) {
			// 			_this.$nextTick(() => {
			// 				_this.$vux.toast.show({
			// 				type: 'text',
			// 				position: 'middle',
			// 				text: '取消分享'
			// 				})
			// 			})
			// 		}
			// 	});

			// }.bind(this));
		},
		methods: {
			onSwiperItemIndexChange() {},
			Collection(type) {
				if(type == 1) { //商品收藏
					if(this.isCollection) {
					this.isCollection = !this.isCollection;
						return this.$vux.toast.show({
									text: '收藏成功'
								})
						doCollection(formalname===1?1037:getStore('userId'), this.goodsId, 1).then(resolved => {
							if(resolved.msgCode == '0000') {
								this.collectionId = resolved.data
								this.$vux.toast.show({
									text: '收藏成功'
								})
							}
							//console.log(JSON.stringify(this.details));
						}, this)
					} else { //取消收藏
					this.isCollection = !this.isCollection;
					return this.$vux.toast.show({
									text: '取消成功'
								})
						delCollection(formalname===1?1037:getStore('userId'), this.goodsId, 1).then(resolved => {
							if(resolved.msgCode == '0000') {
								this.$vux.toast.show({
									text: '取消成功'
								})
							}
							//console.log(JSON.stringify(this.details));
						})
					}
				} else {
					if(this.isShop) {
					this.isShop = !this.isShop;
						return this.$vux.toast.show({
									text: '收藏成功'
								})
						doCollection(formalname===1?1037:getStore('userId'), this.details.shopId, 2).then(resolved => {
							if(resolved.msgCode == '0000') {
								this.$vux.toast.show({
									text: '收藏成功'
								})
							}
							//console.log(JSON.stringify(this.details));
						})
					} else { //取消收藏
					this.isShop = !this.isShop;
					return this.$vux.toast.show({
									text: '取消成功'
								})
						delCollection(formalname===1?1037:getStore('userId'), this.details.shopId, 2).then(resolved => {
							if(resolved.msgCode == '0000') {
								this.$vux.toast.show({
									text: '取消成功'
								})
							}
							//console.log(JSON.stringify(this.details));
						})
					}
				}
			},
			console() {console.log(1)},
			log(str) {
				console.log(str)
			},
			openWindow(path) {
				this.$router.push(path)
			},
			isopen(type) {
				if(this.maxValue === 0) {
					return this.$vux.toast.show({
						text: '库存不足',
						type: 'cancel'
					})
				}
				this.show = true
			},
			joinCat() {
				//加入购物车//getStore('userId')
				return this.$vux.toast.show({
							text: '酷币不足<br />无法加入',
							width:'3.2rem'
						})
				doShopCart(formalname===1?1037:getStore('userId'), this.goodsId, this.num).then(resolved => {
					if(resolved.msgCode == '0000') {
						this.$vux.toast.show({
							text: '加入成功'
						})
						//我的购物车数量
						countCart(formalname===1?1037:getStore('userId')).then(resolved => {
							this.count = resolved.data
						})
						this.show = false
					} else {
						this.$vux.toast.show({
							text: resolved.msg
						})
					}
				})

			},
			buyNow() {  // 立即购买
				return this.$vux.toast.show({
							text: '酷币不足'
						})
				this.$router.push({
					name: 'OrderDateils',
					query: { goodsId: this.goodsId }
				})
				setStore('listData',{
					maxValue: this.maxValue,
					num: this.num,
					price: this.price,
					goodsName: this.goodsName,
					goodsId: this.goodsId,
					cover: this.details.attachmentCover,
					postagePrice:this.postagePrice
					})
			},
			close() {
				this.show = false
			}
		},
		data() {
			return {
				title: '商品详情',
				swiperItemIndex: 0,
				show: false,
				showToast: false,
				isevaluateList:false,
				showToastText: '',
				list: [],
				details: {},
				goodsName: '',
				shareUrl: '',
				goodsId: 0,
				count: 0,
				num: 1,
				price: 0,
				maxValue: 0,
				selectSize: 0,
				selectColor: 0,
				collectionId: 0,
				postagePrice:0,
				width:30,
				evaluateList: [/*{
						'name': '36码很合脚36码很合脚3',
						'path': '',
						'classs': 'icon-fuzhuang'
					},{
						'name': '美妆',
						'path': '',
						'classs': 'icon-meizhuang'
				}*/],
				isCollection: true,
				isShop: true

			}
		}
	}
</script>

<style scoped lang="less">
	@import '~vux/src/styles/close.less';
	@white: #ffffff;
	.bg {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background-color: rgba(204, 204, 204, 0.59);
		z-index: 99999;
	}
	
	.commodity-details {
		.commodity-details-head {
			background-color: transparent;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999;
		}
		.imgStyle {
			width: 100%;
			height: 100%;
		}
		.commodity-details-describe {
			background-color: @white;
			padding: 0.4rem;
			position:relative;
			.icon-yishouwan{
				&:before{
					position:absolute;
					color:#ff0000;
					font-size:52px;
					z-index:9;
					top:-12%;
					left:0
				}
			}
			.title {
				display: -webkit-box;
				/** 对象作为伸缩盒子模型显示 **/
				-webkit-box-orient: vertical;
				/** 设置或检索伸缩盒对象的子元素的排列方式 **/
				-webkit-line-clamp: 2;
				/** 显示的行数 **/
				overflow: hidden;
				/** 隐藏超出的内容 **/
				padding-right: 0.4rem;
			}
			.commodity-details-describe-body {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 0.26666rem;
				[class^='member-'] {
					color: #ff0000;
					font-weight: bold
				}
				.member-money {
					margin-left: 0.69333rem;
				}
				.cost {
					font-weight: bold;
					color: #a1a1a1;
					margin-left: 0.4rem;
				}
				.iconfont {
					font-size: 26px;
					width: 26px;
					height: 33px;
					&.icon-shoucang-mian {
						color: #CE3C39
					}
				}
				.vux-x-icon {
					width: 0.65rem;
				}
			}
			.commodity-details-describe-freight {
				display: flex;
				justify-content: space-between;
				margin-top: 0.2rem;
				color: #a1a1a1;
				.express-name {
					// text-indent:14px;
				}
				.express-money {
					margin-left: 0.73333rem;
				}
				.sales-volume {
					margin-left: 1.36rem;
				}
			}
		}
		.commodity-details-specifications {
			margin-top: 0.24rem;
		}
		.label {
			min-height: 0.6666rem;
			line-height: 0.66666rem;
			padding: 0.13333rem;
			display: flex;
			justify-content: space-around;
			p {
				display: flex;
				align-items: center;
			}
		}
		.vertical-middle,
		.cell-x-icon {
			vertical-align: middle;
		}
		.commodity-details-evaluate {
			.weui-cell {
				padding-left: 0;
				padding-right: 0
			}
			.commodity-details-evaluate-title {
				padding: 0 0.4rem;
				background-color: @white
			}
			// 左右滚动分类
			.evaluate-list {
				overflow: hidden;
				position: relative;
				width: 50rem;
				background-color: @white;
				margin-bottom: 0.21333rem;
				padding: 0.37333rem 0.13334rem 0.53333rem 0.4rem;
				.evaluate-list-item {
					width: 7.93333rem;
					color: #19191a;
					background-color: #f2f1f0;
					display: inline-block;
					padding: 10px 0 8px;
					float: left;
					font-size: 0.26666rem;
					margin-right: 0.26666rem;
					.evaluate-list-item-logo {
						width: 1.86666rem;
						height: 1.86666rem;
						min-width: 1.86666rem;
						min-height: 1.86666rem;
						margin-left: 0.29333rem;
						border-radius: 50%;
					}
					.logo-position {
						position: relative;
						display: inline-block;
						overflow: hidden;
						vertical-align: middle;
					}
					.iconfont {
						position: absolute;
						font-size: 0.58666rem;
						bottom: 0;
						right: 0;
					}
					.evaluate-list-item-nickname {
						vertical-align: middle;
					}
					.evaluate-list-item-comment {
						margin: 0.29333rem 0.29333rem 0;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						padding-bottom: 0.37333rem;
						border-bottom: 1px solid #ccc;
					}
					.evaluate-list-item-specifications {
						text-align: right;
						padding-right: 0.42666rem;
						padding-top: 0.13333rem;
					}
				}
				.evaluate-list-item:first-child {
					margin-left: 0;
				}
			}
		}
		.evaluate-shop {
			padding: 0.45333rem 0.26666rem 0;
			background-color: @white;
			.evaluate-shop-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-bottom: 0.45333rem;
				.evaluate-shop-item-title {
					display: flex;
					align-items: center;
					.evaluate-shop-item-logo {
						width: 1.86666rem;
						height: 1.86666rem;
						min-width: 1.86666rem;
						min-height: 1.86666rem;
						margin-left: 5px;
						margin-right: 0.37333rem;
					}
				}
				.custom-primary-red {
					border-radius: 10px!important;
					border-color: #CE3C39!important;
					color: #CE3C39!important;
					&:active {
						border-color: rgba(206, 60, 57, 0.6)!important;
						color: rgba(206, 60, 57, 0.6)!important;
						background-color: transparent;
					}
				}
			}
		}
		.evaluate-shop-button {
			text-align: center;
			border-top: 1px solid #ccc;
			height: 1.74666rem;
			line-height: 1.74666rem;
		}
		.describe {
			height: 1.44rem;
			line-height: 1.44rem;
			text-align: center;
		}
		.describe-list {
			padding: 0 0.4rem;
			p {
				white-space: pre-line!important;
				a {
					img {
						width: 100%!important;
						height: 100%!important;
					}
				}
			}
			img {
				width: 100%!important;
				height: 100%!important;
			}
		}
	}
	
	.bottom-function {
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1.4rem;
		border-top: 1px solid #ccc;
		background-color: @white;
		.confirm-purchase,
		.shopping-cart {
			height: 100%;
			line-height: 1.4rem;
			min-width: 3rem;
			width: 100%;
			color: @white;
			text-align: center;
			min-width: 2.90666rem;
			background-color: #ff0000;
		}
		.shopping-cart {
			background-color: #ff6d00;
		}
		.customer-service,
		.cat {
			min-width: 2.13333rem;
			width: 100%;
			height: 1.4rem;
			text-align: center;
			display: flex;
			align-items: center;
			align-content: center;
			justify-content: center;
			flex-direction: column;
			.font-title {
				margin-top: -5px;
			}
		}
		.cat {
			border-left: 1px solid #ccc;
			.icon-caigou-xian {
				position: relative;
				.dot {
					position: absolute;
					top: 7px;
					left: 50%;
					transform: translate(0, -50%)
				}
			}
		}
	}
	
	.popup0 {
		height: 480px;
		background-color: @white;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			padding-bottom: 0.33333rem;
			.title-content {
				flex-shrink: 0;
				flex-basis: 4.5rem;
				padding-top: 0.48rem;
			}
			img {
				width: 3.01333rem;
				height: 3.01333rem;
				margin-left: 0.58666rem;
				margin-top: -1rem;
			}
			.icon-cha {
				font-size: 24px;
				margin-top: 0.213333rem;
				margin-right: 0.42666rem;
				align-self: flex-start
			}
		}
		.popup0-content {
			padding: 0 0.41rem;
			.popup0-type-title {
				border-top: 1px solid #e2e2e2;
				padding: 0.33333rem 0 0.4rem;
			}
			.popup0-type-item {
				padding: 5px 10px;
				background-color: #efeeef;
				text-align: center;
				border-radius: 3px;
				border: 1px solid #ccc;
				margin-right: 6px;
			}
			.popup0-type-item-selected {
				background: #ffffff url(../../assets/active.png) no-repeat right bottom;
				border-color: #ff4a00;
			}
			.popup0-type-item-list {
				padding-bottom: 0.33333rem;
			}
		}
		.weui-cell {
			padding-left: 0!important;
			padding-right: 0!important;
			padding-top: 0.4rem!important;
		}
		.foot {
			position: absolute;
			height: 1.30666rem;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
			.join-cat,
			.buy-now {
				width: 50%;
				margin-top: 0;
				color: @white;
				border-radius: 0;
				border: none;
				background-color: #ff6d00
			}
			.buy-now {
				background-color: #ff0000
			}
		}
	}
</style>