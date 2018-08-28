<template>
	<div class="home">
		<div v-title>{{ title }}</div>
		<!-- 搜索 -->
		<flexbox class="search-box">
			<flexbox-item :span="1">
				<div class="flex-demo"></div>
			</flexbox-item>
			<flexbox-item :span="10" class="flex-seach-box">
				<div class="flex-seach" @click="openWindow()">
					<span class="iconfont icon-sousuo-xian"></span>&nbsp;&nbsp;搜索
				</div>
			</flexbox-item>
			<flexbox-item :span="1">
				<div class="flex-demo"></div>
			</flexbox-item>
		</flexbox>
		<!-- 轮播图 -->
		<swiper :aspect-ratio="300/800" v-model="swiperItemIndex" height="5.01333rem">
			<swiper-item class="swiper-demo-img" v-for="(item, index) in demo_list" :key="index">
				<img :src="item.adUrl">
			</swiper-item>
		</swiper>
		<!-- 左右滚动分类 -->
		<scroller :lock-y="true" ref="scroller">
			<div class="box1">
				<div class="box1-item" v-for="(item,i) in homeMenu" :key="i" :data-id="item.classificationTypeId" @click="openClassifyDetails(item.id,item.classificationName)">
					<span slot="icon" class="iconfont" :class="item.iconUrl===''?'icon-meizhuang':item.iconUrl"></span>
					<div slot="label">{{item.classificationName}}</div>
				</div>
			</div>
		</scroller>
		<!-- 图片分类 -->
		<!-- <div class="photo-categories">
			<div class="new-categories"><img src="../../assets/2017.png" alt=""></div>
			<div class="right-categories">
				<div class="boutique-categories"><img src="../../assets/2017.png" alt=""></div>
				<div class="smile-categories">
					<div class="life-categories"><img src="../../assets/2017.png" alt=""></div>
					<div class="beauty-categories"><img src="../../assets/2017.png" alt=""></div>
				</div>
			</div>
		</div> -->
		<!-- 商品分类 -->
		<div>
			<tab :line-width="1" active-color='#fc378c' custom-bar-width="2.13333rem" v-model="index">
				<tab-item class="vux-center" v-for="(item, index) in list2" @click.native="options(index)" :key="index">{{item}}</tab-item>
			</tab>
			<scroller lock-y ref="scrollerLeft">
				<div class="goods">
					<div class="goods-item" v-for="(item,i) in home3" :key="i" @click="openDetail(item.id)">
						<img slot="icon" class="goods-img" :src="item.attachmentCover" alt="">
						<div slot="label" class="goods-content">{{item.goodsName}}</div>
						<div class="goods-money">
							<span class="actual">{{item.price}}</span>
							<span class="Discount">{{item.price}}</span>
						</div>
					</div>
				</div>
			</scroller>
		</div>
		<!-- 每日精选 -->
		<p class="line">每日精选</p>
		<div class="list-box">
			<div v-for="(item,i) in list" class="list-item" :key="i" @click="openDetail(item.id)">
				<span class="loading">加载中</span>
				<x-img :src="item.attachmentCover" :webp-src="`${item.attachmentCover}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
				<div class="list-box-item-title">{{item.goodsName}}</div>
				<div class="list-box-item-price">￥{{item.price}}</div>
			</div>
		</div>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		<foot-guide></foot-guide>
	</div>

</template>

<script>
	import footGuide from '../../components/footer/footGuide.vue'
	import { Swiper, SwiperItem, Flexbox, FlexboxItem, Scroller, Tab, TabItem, XTable, XImg, LoadMore } from 'vux'
	import { getADList, getGoodsTypeList, getClassList } from '../../service/getData'

	const list = () => ['最新', '销量']

	export default {
		components: {
			Swiper,
			SwiperItem,
			Flexbox,
			FlexboxItem,
			footGuide,
			Scroller,
			Tab,
			TabItem,
			XTable,
			XImg,
			LoadMore
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			//轮播图
			getADList(5).then(resolved => {
				console.log(resolved)
				this.$nextTick(()=>{
					console.log(typeof(resolved)==='number')
					if(typeof(resolved)==='number'){
						return this.demo_list = []
					}
					this.demo_list = resolved
					this.$vux.loading.hide()
				//console.log(this.demo_list[0])
				})
			})
			//分类
			getClassList().then(resolved => {
				document.getElementsByClassName('box1')[0].style.width = typeof(resolved)==='number'?1:resolved.length * 2.05333 + 'rem'
				console.log(resolved)
				this.$nextTick(()=>{
					this.homeMenu = resolved
					this.$vux.loading.hide()
					this.$refs.scroller.reset()
				})
			})

			//销量
			getGoodsTypeList(10, 0).then(resolved => {
				document.getElementsByClassName('goods')[0].style.width = resolved.data.length * 3.63333 + 'rem'
				console.log(resolved.data)
				this.$nextTick(()=>{
					this.home1 = resolved.data
					this.home3 = resolved.data
					this.$vux.loading.hide()
					this.$refs.scrollerLeft.reset()
				})
				// console.log(this.home1[0])
			})
			//新品
			getGoodsTypeList(10, 1).then(resolved => {
				this.$nextTick(()=>{
					this.home2 = resolved.data
					this.$vux.loading.hide()
					// console.log(this.home2[0])
				})
			})
			//访问量
			getGoodsTypeList(10, 2).then(resolved => {
				this.$nextTick(()=>{
					this.list = resolved.data
					this.$vux.loading.hide()
					// console.log(this.list[0].attachmentCover)
				})
			})
		},
		methods: {
			openClassifyDetails(id, name) {
				this.$router.push({
					name: 'ClassifyList',
					query: {
						pageIndex: 1,
						id: id,
						name: name
					}
				})
			},
			options(index) {
				document.getElementsByClassName('goods')[0].style.width = this.home3.length * 3.63333 + 'rem'
				index == 1 ? this.home3 = this.home2 : this.home3 = this.home1
				this.$nextTick(()=>{
					this.$refs.scrollerLeft.reset({
						left: 0
					})
				})
			},
			openWindow() {
				this.$router.push({
					name: 'Search'
				})
			},
			success(src, ele) {
				const span = ele.parentNode.querySelector('span')
				ele.parentNode.removeChild(span)
			},
			error(src, ele, msg) {
				console.log('error load', msg, src)
				const span = ele.parentNode.querySelector('span')
				span.innerText = '加载失败'
			},
			onScrollBottom() {
				if(this.onFetching) {
					// do nothing
				} else {
					this.onFetching = true
					setTimeout(() => {
						this.list = this.list.push(this.list)
						this.$nextTick(() => {
							this.$refs.scrollerBottom.reset()
						})
						this.onFetching = false
					}, 2000)
				}
			},
			openDetail(index) {
				console.log(index)
				this.$router.push({
					name: 'Commodity',
					query: {
						id: index
					}
				});
			}
		},
		data() {
			return {
				title: '首页',
				list1: list(),
				list2: list(),
				isshow:false,
				text: 'Processing',
				show: false,
				option: 0,
				index: 0,
				demo_list: [],
				swiperItemIndex: 0,
				homeMenu: [],
				home1: [],
				home2: [],
				home3: [],
				results: [],
				value: '',
				list: [
					'https://o5omsejde.qnssl.com/demo/test1.jpg',
					'https://o5omsejde.qnssl.com/demo/test2.jpg',
					'https://o5omsejde.qnssl.com/demo/test0.jpg',
					'https://o5omsejde.qnssl.com/demo/test4.jpg',
					'https://o5omsejde.qnssl.com/demo/test5.jpg',
					'https://o5omsejde.qnssl.com/demo/test6.jpg',
					'https://o5omsejde.qnssl.com/demo/test7.jpg',
					'https://o5omsejde.qnssl.com/demo/test8.jpg'
				]
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #ffffff;
	@goodsWidth: 33rem; //商品增加宽度需要增加
	@box1Width: 22.8rem; //分类增加宽度需要增加
	.home {
		background-color: #f7f7f7;
		padding-bottom: 2.5rem;
		.flex-seach-box {
			padding: 0.15rem 0;
			.flex-seach {
				//搜索样式
				height: 0.8rem;
				background-color: #e7e7e6;
				border-radius: 30px;
				text-align: center;
				color: #ccc;
				line-height: 0.8rem;
			}
		}
		// 轮播图样式
		.swiper-demo-img img {
			width: 100%;
			height: 100%
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
	}
	
	// 左右滚动分类
	.box1 {
		overflow: hidden;
		position: relative;
		width: @box1Width;
		margin: 0.10666rem 0 0.21333rem;
		.box1-item {
			width: 2.05333rem;
			color: #19191a;
			background-color: @white;
			display: inline-block;
			padding: 10px 0 8px;
			float: left;
			text-align: center;
			line-height: 0.5rem;
			font-size: 0.26666rem;
			.iconfont {
				font-size: 0.58666rem
			}
		}
		.box1-item:first-child {
			margin-left: 0;
		}
	}
	
	// 图片分类
	.photo-categories {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.21333rem;
		.new-categories {
			width: 4.4rem;
			height: 6.05333rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.boutique-categories {
			width: 5.38666rem;
			height: 3.01333rem;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.right-categories {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.smile-categories {
				display: flex;
				justify-content: space-between;
				margin-top: 0.18666rem;
				.life-categories,
				.beauty-categories {
					width: 2.58666rem;
					height: 2.82666rem;
					img {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
	}
	
	// 商品分类
	.goods {
		height: 5.81333rem;
		background-color: @white;
		margin-top: 0.08rem;
		width: @goodsWidth; //商品增加宽度需要增加
		.goods-item {
			width: 3.63333rem;
			color: #19191a;
			background-color: @white;
			display: inline-block;
			padding: 0.72rem 0.33333rem 0.66666rem;
			float: left;
			text-align: center;
			line-height: 0.5rem;
			font-size: 0.26666rem;
		}
		.goods-img {
			width: 2.48rem;
			height: 2.48rem;
			min-width: 2.48rem;
			min-height: 2.48rem;
			border-radius: 50%;
		}
		.goods-content {
			text-align: left;
			font-size: 14PX;
			text-overflow: ellipsis;
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;
			/** 显示的行数 **/
			overflow: hidden;
			/** 隐藏超出的内容 **/
		}
		.goods-money {
			display: flex;
			font-family: 'Helvetica neva';
			justify-content: space-between;
			.actual {
				font-weight: bold;
			}
			.Discount {
				font-weight: bold;
				text-decoration: line-through;
				color: #e7e7e6;
			}
		}
	}
	
	// 商品列表
	.list-box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.list-box-item-title {
			text-overflow: ellipsis;
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;
			/** 显示的行数 **/
			overflow: hidden;
			/** 隐藏超出的内容 **/
		}
		.list-item {
			position: relative;
			width: 4.96rem;
			height: 6.7rem;
			padding-bottom: 0.3rem;
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
			.list-box-item-title {
				padding: 0 14px;
			}
			.list-box-item-price {
				padding: 0 14px;
				position: absolute;
				bottom: 0.3rem;
			}
		}
	}
	
	.title {
		line-height: 100px;
		text-align: center;
		color: @white;
	}
	
	.animated {
		animation-duration: 1s;
		animation-fill-mode: both;
	}
	
	.vux-indicator.custom-bottom {
		bottom: 30px;
	}

</style>