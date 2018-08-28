<template>
	<div class="order_page" id="order-syicky">
		<div v-title>{{ title }}</div>
		<!-- 头部 -->
		<x-header :right-options="{showMore: false}" :left-options="{backText: ''}" @on-click-more="showMenus = true" class="page-head">{{ title }}</x-header>
		<sticky ref="sticky" scroll-box="app" :check-sticky-support="true">
			<tab :line-width="1" active-color='#fc378c' custom-bar-width="2rem" v-model="index" class="order-tab">
				<tab-item class="order-tab-item" v-for="(item, index) in list" @click.native="options(item,index)" :key="index">{{item}}</tab-item>
			</tab>
		</sticky>
		<section v-show="isempty">
			<div class="order-empty">
				 <img :src="'./static/order-empty-'+indexNum+'.png'" alt=""> 
				<load-more :tip="'暂无'+list[indexNum]+'订单'" :show-loading="false" style="background-color:transparent"></load-more>
			</div>
		</section>
		<section v-show="!isempty">
			<scroller lock-x scrollbar-y use-pullup use-pulldown height="550px" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller" class="scroller" :pulldown-config="pulldown" :pullup-config="pullup">
				<div class="order-list">
					<ul class="order-list-box">
						<li v-for="(item,i) in orderList" :key="i" class="order-list-item">
							<div class="head">
								<p>订单编号: {{item.orderId}}</p>
								<p>{{item.statusName}}</p>
							</div>
							<div class="content" @click="openDateils(item.id)">
								<div class="item-left">
									<img :src="item.goodsVo.attachmentCover" alt="">
									<div class="item-left-body">
										<div>
											<p class="title tworow">{{item.goodsVo.goodsName}}</p>
											<p>{{item.goodsVo.shopName}}</p>
										</div>
										<!-- <p class="specifications">默认</p> -->
									</div>
								</div>
								<div class="item-right">
									<p>￥{{item.orderCost}}</p>
									<p class="order-num"> X {{item.num}} </p>
								</div>
							</div>
							<div class="total">共一件商品 实付：￥{{item.orderActualMoney}}</div>
							<div class="foot">
								<x-button type="default" plain mini @click.native="operation('comment',item.id, i)" v-show="item.orderStatus===3" :disabled="isdisabled">评价</x-button>
								<x-button type="default" plain mini @click.native="operation('cancel',item.orderId, i)" v-show="item.orderStatus===0" :disabled="isdisabled">取消订单</x-button>
								<x-button type="default" plain mini @click.native="operation('delete',item.orderId, i)" v-show="item.orderStatus===5 || item.orderStatus===4" :disabled="isdisabled">删除订单</x-button>
								<x-button type="primary" plain mini class="custom-primary-red" @click.native="operation('again',item.goodsVo.id, i)" v-show="item.orderStatus>0" :disabled="isdisabled">再次购买</x-button>
								<x-button type="warn" plain mini @click.native="payment(item.orderId,item.orderActualMoney)" v-show="item.orderStatus===0" :disabled="isdisabled">确认付款</x-button>
								<x-button type="warn" mini  @click.native="operation('signfor',item.orderId,i)" v-show="item.orderStatus===2"  :disabled="isdisabled">确认签收</x-button>
							</div>
						</li>
					</ul>
					<load-more tip="正在加载" v-show="status.pullupStatus === 'loading'"></load-more>
					<load-more tip="暂无数据" :show-loading="false" v-show="status.pullupStatus === 'disabled'" background-color="transparent"></load-more>
				</div>
			</scroller>
		</section>
		<confirm v-model="show" title="温馨提示" @on-confirm="onConfirm" @on-cancel="onCancel">
      <p style="text-align:center;">您确定签收吗？</p>
    </confirm>
	</div>

</template>

<script>
	import { Sticky, XHeader, Scroller, LoadMore, Tab, TabItem, Divider, XButton, Flexbox, FlexboxItem, Confirm } from 'vux'
	import { setStore, getStore } from '../../config/mUtils'
	import { getOrderList, doOrderStatus } from '../../service/getData'

	export default {
		components: {
			Sticky,
			XHeader,
			Scroller,
			LoadMore,
			Tab,
			TabItem,
			Divider,
			XButton,
			Flexbox,
			FlexboxItem,
			Confirm
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			//userId,pageIndex,type
			//type = -1 "全部" 0 "待付款" 1 "待发货" 2 "待签收" 3 "待评价"; 4 "已完成"; 5 "已取消"; 6 "已删除";
			getOrderList(getStore('userId'), this.pageIndex, this.$route.query.type*1-1).then(resolved => {
				if(resolved.msgCode == '0000') {
					resolved.data.length === 0 ? this.isempty = true : this.isempty = false;
					var screenHeight = screen.height;
					document.getElementsByClassName("scroller")[0].style.height = screenHeight - 130 + "px";
					this.$nextTick(() => {
						this.$refs.scroller.reset()
						this.$vux.loading.hide()
					})
					this.orderList = resolved.data
					this.indexNum = this.$route.query.type*1
					console.log(resolved.data)
					this.$nextTick(() => {
						this.$refs.scroller.reset()
					})
				} else {
					this.$nextTick(() => {
						this.$vux.loading.hide()
						this.$vux.toast.show({
							text: resolved.msg,
							type:'cancel'
						})
					})
				}
			})
			setTimeout(() => {
				this.$vux.loading.hide()
			}, 5000)
		},
		methods: {
			showMenus() {},
			options(name, index) {
				this.pageIndex = 1
				this.$nextTick(() => {
					this.$vux.loading.show({
						text: '加载中...'
					})
					this.$refs.scroller.reset({
						top: 0
					})
				})
				this.indexNum = index
				this.indexName = name
				this.orderList = this.lists[index]
				getOrderList(getStore('userId'), this.pageIndex, index - 1).then(resolved => {
					this.orderList = resolved.data
					this.$nextTick(() => {
						this.$refs.scroller.reset()
						this.$vux.loading.hide()
					})
					resolved.data.length === 0 ? this.isempty = true : this.isempty = false;
					if(resolved.data.length === 0 || resolved.data.length < 10) {
						this.pullupEnabled = false
						return this.$refs.scroller.disablePullup()
					}else{
						this.$refs.scroller.enablePullup()
						this.pullupEnabled = true
					}
				})
			},
			loadMore() { //加载更多
				setTimeout(() => {
					this.pageIndex += 1
					this.$nextTick(() => {
						getOrderList(getStore('userId'), this.pageIndex, this.indexNum - 1).then(resolved => {
							this.orderList = this.orderList.concat(resolved.data)
							this.$nextTick(() => {
								this.$refs.scroller.reset()
							})
							if(resolved.data.length === 0 || resolved.data.length < 10) {
								this.$vux.toast.show({
									text: '没有更多数据'
								})
								this.pullupEnabled = false
								this.$refs.scroller.disablePullup()
							}
						})
						this.$refs.scroller.donePullup()
					})
				}, 2000)
			},
			refresh() { //数据刷新
				setTimeout(() => {
					this.pageIndex = 1
					this.$nextTick(() => {
						setTimeout(() => {
							getOrderList(getStore('userId'), this.pageIndex, this.indexNum - 1).then(resolved => {
								if(resolved.data.length === 0) {
									this.isempty = true
									this.pullupEnabled = false
									this.status.pullupStatus= 'disabled'
								}else if(resolved.data.length < 10){
									this.isempty = false
									this.pullupEnabled = false
									this.status.pullupStatus= 'disabled'
								}else{
									this.status.pullupStatus= 'default'
									this.isempty = false
									this.pullupEnabled = true
									this.orderList = resolved.data
									this.$nextTick(()=>{
										this.$refs.scroller.reset()
										this.$refs.scroller.enablePullup()
										this.$vux.loading.hide()
									})
								}
							})
							this.$refs.scroller.donePulldown()
						}, 10)
					})
				}, 2000)
			},
			openDateils(i) {
				console.log(i)
				this.$router.push({
					name: 'OrderDateilsFinish',
					query: {
						id: i
					}
				})
			},
			onCancel(){
				this.isdisabled = false
			},
			onConfirm(){
				console.log(this.myid)
				doOrderStatus(this.myid, 3, getStore('userId')).then(resolved => {
					if(resolved.msgCode === '0000') {
						this.$nextTick(()=>{
							this.orderList[index].orderStatus = 3
							this.$vux.toast.show({
								position: 'middle',
								text: '签收成功'
							})
						})
					} else {
						this.$nextTick(()=>{
							this.isdisabled = false
							this.$vux.toast.show({
								type: 'text',
								position: 'middle',
								text: resolved.msg
							})
						})
					}
				})
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
			operation(type, id, index) {
				this.isdisabled = true
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
							this.$nextTick(() => {
								this.orderList[index].orderStatus = 5
								this.$vux.toast.show({
									text:'取消成功',
									type:'text',
								})
								this.isdisabled = false
							})
						} else {
							this.$vux.toast.show({
								text:resolved.msg
							})
							this.isdisabled = false
						}
					})

				} else if(type === 'delete') {
					//删除订单
					doOrderStatus(id, 6, getStore('userId')).then(resolved => {
						if(resolved.msgCode == '0000') {
							this.orderList.splice(index,1)
							this.$nextTick(() => {
								this.$refs.scroller.reset()
								this.$vux.toast.show({
									text:'删除成功',
									type:'text',
								})
								this.isdisabled = false
							})
						} else {
							this.$nextTick(() => {
							this.$vux.toast.show({
								text:resolved.msg,
								type:'text',
							})
							this.isdisabled = false
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
					this.isdisabled = false
					console.log('再次')
				} else if(type === 'signfor') {
					this.show = true
					 this.myid = id
				}
			}
		},
		watch:{
			idr(val){
				this.myidr = val
				console.log(val)
			}
		},
		data() {
			return {
				title: '我的订单',
				isempty: true,
				show:false,
				myid:0,
				isdisabled:false,
				indexNum: 0,
				indexName: '全部',
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
				list: ['全部', '待付款', '待发货', '待收货', '待评价'],
				lists: [],
				orderList: [],
				pageIndex: 1,
				index: this.$route.query.type*1,
				pulldown:{
					content: '下拉刷新',
					height: 60,
					autoRefresh: false,
					downContent: '下拉刷新',
					upContent: '释放刷新',
					loadingContent: '加载中...',
					clsPrefix: 'xs-plugin-pulldown-'
				},
				pullup:{
					content: '上拉加载更多',
					pullUpHeight: 60,
					height: 40,
					autoRefresh: false,
					downContent: '释放加载更多',
					upContent: '上拉加载更多',
					loadingContent: '',
					clsPrefix: 'xs-plugin-pullup-'
				}
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #ffffff;
	.order_page {
		.order-tab {
			margin-bottom: 0.13333rem;
			margin-top: 4px;
		}
		.order-empty {
			text-align: center;
			img {
				width: 2.96rem;
				// height:2.66666rem;
				min-width: 2.96rem;
				min-height: 2.66666rem;
				margin-top: 2.6666rem;
				margin-bottom: 0.84rem;
			}
		}
		.order-head {
			background-color: @white;
			margin-bottom: 2px;
		}
		.order-list {
			min-height: 2.7rem;
			.order-list-box {
				.order-list-item {
					overflow: hidden;
					background-color: @white;
					position: relative;
					padding: 0.32rem 0.26666rem;
					margin-bottom: 4px;
					.head {
						display: flex;
						justify-content: space-between;
					}
					.content {
						display: flex;
						margin-top: 0.4rem;
						margin-bottom: 0.72rem;
						justify-content: space-between;
						.item-left {
							display: flex;
							img {
								width: 2.24rem;
								height: 2.24rem;
							}
							.item-left-body {
								display: flex;
								flex-shrink: 1;
								flex-direction: column;
								justify-content: space-between;
								margin-left: 0.26666rem;
							}
						}
						.item-right {
							display: flex;
							justify-content: space-between;
							flex-direction: column;
							overflow: hidden;
							flex-shrink: 0;
							p {
								text-align: right;
								max-width: 83px;
								text-overflow: ellipsis;
    						overflow: hidden;
							}
							.discount {
								text-decoration: line-through;
							}
						}
					}
					.total {
						text-align: right;
					}
					.foot {
						text-align: right;
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