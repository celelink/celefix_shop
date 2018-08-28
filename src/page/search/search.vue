<template>
	<div class="search_page">
		<div v-title>{{ title }}</div>
		<!-- 搜索 -->
		<flexbox class="search-box">
			<flexbox-item :span="1">
				<div class="flex-demo"><span class="iconfont icon-fangxiangzuo" @click="$router.back()"></span></div>
			</flexbox-item>
			<flexbox-item :span="10">
				<div class="flex-seach">
					<search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="ralvtive" auto-scroll-to-top top="0" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="onSubmit" ref="search"></search>
				</div>
			</flexbox-item>
			<flexbox-item :span="1">
				<div class="flex-demo"></div>
			</flexbox-item>
		</flexbox>
		<section class="search-history-content" v-show="!issearch">
			<div v-show="isHistory" class="search-history">
				<p class="search-history-title"><span>最近搜索</span><span class="iconfont icon-delete" @click="del"></span></p>
				<ul>
					<li v-show="isshow" v-for="(item,i) in historyData" :key="i" @click="hotSubmit(item)">{{item}}</li>
				</ul>
			</div>
			<div>
			<p class="search-history-title"><span>热门搜索</span><span class="iconfont" :class="isshow?'icon-yanjing':'icon-yincang'" @click="see"></span></p>
				<ul>
					<li v-show="isshow" v-for="(item,i) in hot" :key="i" @click="hotSubmit(item.hotName)">{{item.hotName}}</li>
				</ul>
				<p v-show="!isshow" class="search-tip-text">当前热门搜索已隐藏</p>
			</div>
		</section>
		<section  v-show="issearch" class="search-content">
			<!-- <scroller lock-x scrollbar-y use-pullup use-pulldown @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller" class="scroller" :pulldown-config="pulldown" :pullup-config="pullup" v-show="iscontent"> -->
				<div class="list-box">
						<div v-for="(item,i) in goodList" class="list-item" :key="i" @click="openDetail(item.id)">
							<span class="loading">加载中</span>
							<x-img :src="item.attachmentCover" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
							<div class="list-box-item-title">{{item.goodsName}}</div>
							<div class="list-box-item-price">￥{{item.price}}</div>
						</div>
						<divider v-show="goodList.length===0">暂无搜索结果</divider>
				</div>
			<!-- </scroller> -->
		</section>
	</div>

</template>

<script>
	import { Flexbox, FlexboxItem, Search, XImg, Scroller, Divider } from 'vux'
	import { getStore, setStore } from '../../config/mUtils'
	import { getHot, getSearch } from '../../service/getData'
	const list = () => ['最新', '销量']

	export default {
		components: {
			Flexbox,
			FlexboxItem,
			Search,
			XImg,
			Scroller,
			Divider
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			this.historyData = JSON.parse(getStore('historyData')) || []
			if(this.historyData.length===0){
				this.isHistory=false
			}
			//热搜
			getHot().then(resolved => {
				//console.log(JSON.stringify(resolved))
				this.hot = resolved
			})
			this.$vux.loading.hide()
			var screenHeight = screen.height;
			// document.getElementsByClassName("scroller")[0].style.height = screenHeight - 55 + "px";
		},
		methods: {
			del() {
				this.isHistory = false
				setStore('historyData',[])
			},
			see() {
				this.isshow = !this.isshow
			},
			setFocus() {
				this.$refs.search.setFocus()
			},
			hotSubmit(name){
				this.value = name
				this.setFocus()
			},
			resultClick(item) {
				// window.alert('you click the result item: ' + JSON.stringify(item))
				console.log(item.title)
				this.value = item.title
			},
			getResult(val) {
				var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
				if(pattern.test(this.value)){
					this.search=false
					return this.$vux.toast.show({
						text:'搜索内容不能为特殊字符',
						type:'warn',
						width:'14em'
					})
				}else{
					this.search = true
				}
				this.results = val ? getResult(this.value) : []
			},
			onSubmit() {
				//搜索 pageIndex/标题
				// if(this.value==='')
				if(this.search===false)
				return
				getSearch(1,this.value.trim()).then(resolved => {
					console.log(JSON.stringify(resolved))
					this.goodList = resolved.data
					this.iscontent = true
				})
				this.$refs.search.setBlur()
				this.historyData.forEach(function(element) {
					if(this.historyData.indexOf(this.value) === -1){
					　this.historyData.push(this.value);
						setStore('historyData',JSON.stringify(this.historyData))
    　　  }
				}, this);
				if(this.historyData.length===0){
					this.historyData.push(this.value);
					setStore('historyData',JSON.stringify(this.historyData))
				}
				// this.historyData.push(this.value)
				// Array.from(new Set(this.historyData))
				// setStore('historyData',JSON.stringify(Array.from(new Set(this.historyData))))
			},
			onFocus() {
				const height = screen.height;
				this.issearch = true
				document.getElementsByClassName('vux-search_show')[0].style.height = 0 + 'px';
			},
			onCancel() {
				if(this.historyData.length!=0){
					this.isHistory = true
					this.historyData = JSON.parse(getStore('historyData') || "[]")
				}
				this.issearch = false
				this.goodList = []
			},
			openDetail(index) {
				console.log(index)
				this.$router.push({
					name: 'Commodity',
					query: {
						id: index
					}
				});
			},
			loadMore() { //加载更多
				setTimeout(() => {
						this.$nextTick(() => {
							this.$refs.scroller.reset()
							this.$vux.loading.hide()
						})
					this.$refs.scroller.donePullup()
				}, 2000)
			},
			refresh() { //数据刷新
				setTimeout(() => {
					this.$nextTick(() => {
						this.$vux.loading.hide()
						this.$nextTick(() => {
							this.$refs.scroller.reset()
							this.$vux.loading.hide()
							this.$refs.scroller.donePulldown()
							this.pullupEnabled && this.$refs.scroller.enablePullup()
						})
					})
				}, 2000)
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
		},
		data() {
			return {
				title: '搜索',
				results: [],
				hot:[],
				goodList:[],
				value: '',
				historyData:[],
				status: {
					pullupStatus: 'default',
					pulldownStatus: 'default'
				},
				isHistory: true,
				isshow: true,
				issearch:false,
				search:true,
				iscontent:false,
				pulldown:{
					content: '下拉刷新',
					height: 60,
					autoRefresh: false,
					downContent: '下拉刷新',
					upContent: '下拉刷新',
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
					loadingContent: '加载中...',
					clsPrefix: 'xs-plugin-pullup-'
				}
			}
		}
	}

	function getResult(val) {
		// let rs = []
		// for(let i = 0; i < 10; i++) {
		// 	rs.push({
		// 		title: `${val}${i + 1} `,
		// 		other: i
		// 	})
		// }
		// return rs
	}
</script>

<style scoped lang="less">
@white:#fff;
	.search_page {
		.flex-demo {
			text-align: center;
		}
		.weui-cells {
			.vux-search_show {
				max-height: 500px;
			}
		}
		.search-history-content {
			padding: 0.74666rem 0.34666rem 0;
			.search-history-title {
				overflow: hidden;
				padding: 10px 0;
				span:first-child {
					float: left;
				}
				span:last-child {
					float: right;
				}
			}
			ul {
				display: flex;
				flex-wrap: wrap
			}
			ul>li {
				padding: 3px 7px;
				border-radius: 5px;
				margin-bottom: 5px;
				margin-right: 5px;
				border: 1px solid #ccc
			}
		}
		.search-tip-text {
			text-align: center;
			color: #ccc
		}
		.search-content{
			position: absolute;
			top: 0;
			left: 0;
			width:100%;
			z-index: 9;
			margin-top: 55px
		}
	}
	.vux-divider:after, .vux-divider:before{
		top:0
	}
</style>