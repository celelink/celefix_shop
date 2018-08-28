<template>
	<div class="order_page">
		<div v-title>{{ title }}</div>
		<!-- 头部 -->
		<x-header :right-options="{showMore: true}" :left-options="{backText: ''}" @on-click-more="showMenus = true" class="page-head">{{ title }}</x-header>
		<section v-show="isempty">
			<div class="order-empty">
				<img :src="'./static/order-empty-'+indexNum+'.png'" alt="">
				<load-more :tip="'暂无'+indexName+'订单'" :show-loading="false" style="background-color:transparent"></load-more>
			</div>
		</section>
		<section v-show="!isempty">
			<scroller lock-x scrollbar-y use-pullup use-pulldown height="550px" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller" class="scroller">
				<div class="order-list">
					<ul class="order-list-box">
						<li v-for="(item,i) in orderList" :key="i" class="order-list-item">
							<div class="head">
								<p>订单编号: {{item.orderId}}</p>
								<p>{{item.statusName}}</p>
							</div>
							<div class="content">
								<div class="item-left">
									<img :src="item.goodsVo.attachmentCover" alt="">
									<div class="item-left-body">
										<div>
											<p class="title tworow">{{item.goodsVo.goodsName}}</p>
											<p>{{item.goodsVo.shopName}}</p>
										</div>
										<p class="specifications">默认</p>
									</div>
								</div>
								<div class="item-right">
									<p>￥{{item.orderCost}}</p>
									<p class="order-num">X {{item.num}} </p>
								</div>
							</div>
								<div class="total">共一件商品 实付：￥{{item.orderActualMoney}}</div>
							<div class="foot">
								<x-button type="default" plain mini @click.native="comment" v-if="type==4">评论</x-button>
								<x-button type="default" plain mini @click.native="comment">删除</x-button>
								<x-button type="primary" plain mini class="custom-primary-red" @click.native="comment" v-if="type===4">再次购买</x-button>
								<x-button type="warn" plain mini @click.native="comment" v-if="type==1">确认付款</x-button>
							</div>
						</li>
					</ul>
					<load-more tip="正在加载" v-show="status.pullupStatus === 'loading'"></load-more>
					<load-more tip="暂无数据" :show-loading="false" v-show="status.pullupStatus === 'disabled'" background-color="transparent"></load-more>
				</div>
				<!--上拉样式布局-->
				<div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: relative; width: 100%; height: 40px; line-height:41px; bottom: -12px; text-align: center;">
					<span v-show="status.pullupStatus === 'default'"></span>
					<span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">释放加载更多</span>
				</div>
			</scroller>
		</section>
	</div>

</template>

<script>
import { XHeader, Scroller, LoadMore, Divider, XButton, Flexbox, FlexboxItem } from 'vux'
import { getStore, setStore } from '../../config/mUtils'
import { getOrderList } from '../../service/getData'

export default {
	components: {
		XHeader,
		Scroller, 
		LoadMore,
		Divider,
		XButton,
		Flexbox, 
		FlexboxItem
	},
	mounted() {
		this.$vux.loading.show({
			text: '加载中...'
		})
		//type = -1 "全部" 0 "待付款" 1 "待发货" 2 "待签收" 3 "待评价"; 4 "已完成"; 5 "已取消"; 6 "已删除";
		getOrderList(getStore('userId'),this.pageIndex,this.$route.query.type).then(resolved => {
			if(resolved.msgCode == '0000') {
				resolved.data.length === 0?this.isempty = true:this.isempty = false;
				var screenHeight = screen.height;
				document.getElementsByClassName("scroller")[0].style.height = screenHeight-100 + "px";
				this.$nextTick(() => {
					this.$refs.scroller.reset()
					this.$vux.loading.hide()
				})
				this.orderList = resolved.data 
				console.log(resolved.data)
				this.$nextTick(() => {
					this.$refs.scroller.reset()
				})
				console.log(resolved.data)
			} else {
				alert(resolved.msg);
			}
		})
		setTimeout(()=>{
			this.$vux.loading.hide()
		},800)
		this.title = this.$route.query.name
		this.type = this.$route.query.type
	},
	methods: {
		showMenus(){

		},
		options(name,index) {
			this.indexNum = index
			this.indexName = name
			this.orderList = this.lists[index]
			console.log(index)
			// this.$refs.scrollerLeft.reset({
			// 	left: 0
			// })
		},
		loadMore () {//加载更多
			setTimeout(() => {
				this.pageIndex += 1
				this.$nextTick(() => {
					this.$refs.scroller.donePullup()
					console.log(this.pageIndex)
				})
			}, 2000)
		},
		refresh () {//数据刷新
			setTimeout(() => {
				this.pageIndex = 1
				this.$nextTick(() => {
						this.$vux.loading.hide()
						console.log(this.pageIndex)
					setTimeout(() => {
						this.$refs.scroller.donePulldown()
						this.pullupEnabled && this.$refs.scroller.enablePullup()
					}, 10)
				})
			}, 2000)
		},
	},
	data() {
		return {
			title: '我的订单',
			isempty:false,
			indexNum:0,
			indexName:'全部',
			type:0,
			status: {
				pullupStatus: 'default',
				pulldownStatus: 'default'
			},
			list:['全部','待付款','待发货','待收货', '待评价'],
			lists:[],
			orderList:[],
			index:0,
			pageIndex:1
		}
	}
}
</script>

<style scoped lang="less">
@white: #ffffff;
.order_page{
	.order-tab{
		margin-bottom:0.13333rem;
	}
	.order-empty{
		text-align: center;
		img{
			width:2.96rem;
			height:2.66666rem;
			min-width:2.96rem;
			min-height:2.66666rem;
			margin-top:2.6666rem;
			margin-bottom:0.84rem;
		}
		.weui-loadmore__tips{
			background-color: transparent!important
		}
	}
	.order-head{
		background-color:@white;
		margin-bottom: 2px;
	}
	.order-list{
		min-height: 2.7rem;
		margin-top:4px;
		.order-list-box{
			.order-list-item{
				overflow: hidden;
				background-color:@white;
				position: relative;
				padding:0.32rem 0.26666rem;
				margin-bottom: 4px;
				.head{
					display: flex;
					justify-content: space-between;	
				}
				.content{
					display: flex;
					margin-top:0.4rem;
					margin-bottom:0.72rem;
					justify-content: space-between;
					.item-left {
						width: 7.6rem;
						display: flex;
						img {
							width: 2.24rem;
							height: 2.24rem;
						}
						.item-left-body {
							width: 5.36rem;
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							margin-left:0.26666rem;
						}
					}
					.item-right {
						display: flex;
						justify-content: space-between;
						flex-direction: column;
						p {
							text-align: right;
						}
						.discount {
							text-decoration: line-through;
						}
					}
				}
				.total{
					text-align: right;
				}
				.foot{
					text-align: right;
					button{
						margin-top: 0.32rem!important;
					}
				}
			}
		}
	}
	.rotate {
		display: inline-block;
		transform: rotate(-180deg);
	}
	.pullup-arrow {
		transition: all linear 0.2s;
		color: #666;
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