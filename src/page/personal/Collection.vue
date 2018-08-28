<template>
	<div class="collection_page">
		<div v-title>{{ title }}</div>
		<!-- 头部 -->
		<x-header :right-options="{showMore: false}" :left-options="{backText: ''}" class="page-head" title="我的收藏"></x-header>
		<section v-show="isempty">
			<div class="collection-empty">
				<img src="../../assets/zanwushoucang.png" alt="收藏为空图片">
				<load-more tip="暂无收藏" :show-loading="false" style="background-color:transparent"></load-more>
			</div>
		</section>
		<section v-show="!isempty">
			<scroller lock-x scrollbar-y use-pullup use-pulldown :height="scrollerHeight" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
				<div class="collection-list">
					<ul class="collection-list-box">
						<li v-for="(item,i) in orderList" :key="i"  class="collection-list-item">
							<div class="content" @click="comment(item.goodsVo.id)">
								<div class="item-left">
									<img :src="item.goodsVo.attachmentCover" alt="">
									<div class="item-left-body">
										<div>
											<!-- <p class="title tworow">{{item.goodsVo.shopName}}</p> -->
											<p class="title tworow">{{item.goodsVo.goodsName}}</p>
										</div>
									</div>
								</div>
								<div class="item-right">
									<!--<p>￥{{item.goodsVo.price}}<br><span class="textDec">￥{{item.num}}</span></p>-->
								</div>
							</div>
							<div class="foot">
								<x-button type="default" plain mini @click.native="cart(item.goodsVo.id,1,i)">取消收藏</x-button>
								<x-button type="primary" plain mini class="custom-primary-red" @click.native="comment(item.goodsVo.id)">立即购买</x-button>
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
	import { getCollection, delCollection } from '../../service/getData'

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
			getCollection(getStore('userId'),1).then(resolved => {
					if(resolved.msgCode === '0000' && resolved.data.length!=0) {
						this.orderList = resolved.data
						this.isempty = false
	          console.log(resolved.data)
					}
				})
			
			console.log(window.screen.height)
			this.scrollerHeight = window.screen.height - 50 + 'px'
			this.$vux.loading.show({
				text: '加载中...'
			})
			setTimeout(() => {
				this.$vux.loading.hide()
			}, 800)
			this.title = this.$route.query.name
			this.type = this.$route.query.type
		},
		methods: {
			showMenus() {

			},
			loadMore() { //加载更多
				setTimeout(() => {
					this.n += 1
					this.$nextTick(() => {
						this.$refs.scroller.donePullup()
						//访问量
						console.log(this.n)
					})
				}, 2000)
			},
			refresh() { //数据刷新
				setTimeout(() => {
					this.n = 1
					this.$nextTick(() => {
						//访问量
						this.$vux.loading.hide()
						console.log(this.n)
						setTimeout(() => {
							this.$refs.scroller.donePulldown()
							this.pullupEnabled && this.$refs.scroller.enablePullup()
						}, 10)
					})
				}, 2000)
			},
			cart(goodId, type, index){
				//取消收藏//getStore('userId')
				delCollection(getStore('userId'), goodId, type).then(resolved => {
							if(resolved.msgCode == '0000') {
								this.$vux.toast.show({
									text: '取消成功'
								})
								this.orderList.splice(index,1)
							}
							//console.log(JSON.stringify(this.details));
						})
			},
			comment(id) {
				this.$router.push({
					name: 'Commodity',
					query: {
						id: id
					}
				});
			}
		},
		data() {
			return {
				title: '我的收藏',
				isempty: true,
				type: 0,
				scrollerHeight: '550px',
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
				orderList: [],
				index: 0
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #ffffff;
	.collection_page {
		.page-head {
			margin-bottom: 2px;
		}
		.collection-tab {
			margin-bottom: 0.13333rem;
		}
		.collection-empty {
			text-align: center;
			img {
				width: 2.96rem;
				height: 2.66666rem;
				min-width: 2.96rem;
				min-height: 2.66666rem;
				margin-top: 2.6666rem;
				margin-bottom: 0.84rem;
			}
			.weui-loadmore__tips {
				background-color: transparent!important
			}
		}
		.collection-list {
			min-height: 2.7rem;
			.collection-list-box {
				.collection-list-item {
					overflow: hidden;
					background-color: @white;
					position: relative;
					padding: 0.26666rem 0.26666rem 0.4rem;
					margin-bottom: 4px;
					.head {
						display: flex;
						justify-content: space-between;
					}
					.content {
						display: flex;
						margin-top: 0.4rem;
						margin-bottom: 0.37333rem;
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
								margin-left: 0.26666rem;
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
					.total {
						text-align: right;
					}
					.foot {
						text-align: right;
						button {
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