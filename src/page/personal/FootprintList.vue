<template>
	<div class="footprintlist_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" :title="title" class="page-head">
			<a slot="right" @click="showMenus" v-show="isempty===false">{{isedit?'完成':'编辑'}}</a>
		</x-header>
		<div class="footprintlist-content">
			<section v-show="isempty" class="footprintlist-empty">
				<img src="../../assets/wuzuji.png" alt="">
				<p>没有发现任何熊迹~</p>
			</section>
			<section v-show="!isempty && !isedit">
				<ul>
					<li class="footprintlist-list-item" v-for="(item,i) in list" :key="i" @click="openDetail(item.goods.id)">
						<p class="footprintlist-list-item-title">{{item.createTime}}</p>
						<div class="footprintlist-list-item-content">
							
							<div>
								<img :src="item.goods.attachmentCover" alt="">
							</div>
							<div>
								<p class="tworow">{{item.goods.goodsName}}</p>
							</div>
						</div>
					</li>
				</ul>
			</section>
			<section v-show="isedit">
				<ul class="footprintlist-list">
					<li class="footprintlist-list-item" v-for="(item,i) in list" :key="i">
						<p class="footprintlist-list-item-title">{{item.createTime}}</p>
						<checker v-model="checkbox" type="checkbox" default-item-class="default-item" selected-item-class="iconfont icon-xuanzhong" class="list-check">
							<checker-item :value="item.id" @on-item-click="onItemClick"></checker-item>
						</checker>
						<div class="footprintlist-list-item-content" @click="openDetail(item.goods.id)" :class="isedit?'active':''">
							<div>
								<img :src="item.goods.attachmentCover" alt="">
							</div>
							<div>
								<p class="tworow">{{item.goods.goodsName}}</p>
							</div>
						</div>
					</li>
				</ul>
				<section class="del-btn">
					<div class="check">
						<checker v-model="checkboxAll" type="checkbox" default-item-class="default-item" selected-item-class="iconfont icon-xuanzhong" class="checkbox-item">
							<checker-item value="all" @on-item-click="onItemClick('all')"></checker-item><span>全选</span>
						</checker>
					</div>
					<x-button plain mini type="primary" class="custom-primary-red" @click.native="del">删除</x-button>
				</section>
			</section>
		</div>
	</div>

</template>

<script>
	import { XHeader, XButton, Checker, CheckerItem } from 'vux'
	import { getStore, setStore } from '../../config/mUtils'
	import { getFootprintList, delFoot} from '../../service/getData.js'
	import { formalname } from '../../config/env.js'

	export default {
		components: {
			XHeader,
			XButton,
			Checker, 
			CheckerItem
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			//足迹列表userId pageIndex
			getFootprintList(formalname===1?1037:getStore('userId'), 1).then(resolved => {
				console.log(resolved.data)
				this.list = resolved.data;

			})
			this.$vux.loading.hide()
		},
		methods: {
			openDetail(index) {
				console.log(index)
				this.$router.push({
					name: 'Commodity',
					query: {
						id: index
					}
				});
			},
			showMenus(index) {
				console.log('更多')
				this.isedit=!this.isedit
			},
			del() {
				//删除足迹
				// this.ids = this.ids.substring(0, this.ids.lastIndexOf('#'))
				delFoot(formalname===1?1037:getStore('userId'), this.ids).then(resolved => {
					this.ids.split('#').forEach((ele)=>{
						this.list.forEach((element,index)=>{
							if(element.id==ele){
								this.list.splice(index,1)
								this.$nextTick(()=>{
									this.$vux.toast.show({
										text:'删除成功'
									})
								})
							}
						})
					})
				})
			
			},
			//已解决
			onItemClick (value) {
				if(value==='all'){
					if(this.ischeck){
						this.ischeck=false
						this.checkbox = []
						this.allVal = 0
					}else{
						this.checkbox = []
						this.ischeck=true;
						this.list.forEach(function(element) {
							this.checkbox.push(element.id)
							this.ids += element.id+'#'
						}, this);
					}
				}
			},
		},
		watch:{
			checkbox(){
				let idNum = ''
				this.checkbox.forEach((ele)=>{
					idNum += ele+'#'
					return this.ids = idNum
				})
			}
		},
		data() {
			return {
				title: '我的足迹',
				list: [],
				ids:'',
				isempty: false,
				isedit: false,
				ischeck: false,
				checkbox: [],
				checkboxAll:[],
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #fff;
	.footprintlist_page {
		.footprintlist-title {
			margin-bottom: 0.13333rem;
			background-color: @white;
		}
		.footprintlist-content {
			.footprintlist-empty {
				padding: 1.41333rem 1.45333rem 0;
				text-align: center;
				img {
					width: 5.06666rem;
					margin-top: 2.5333rem;
					margin-bottom: 1.17333rem;
				}
			}
			.footprintlist-list{
				margin-bottom:55px;
			}
		}
		.footprintlist-list-item{
			position: relative;
			.list-check{
				position: absolute;
				top:50%;
				left: 0.32rem;
			}
			.active{
				padding-left:0.9rem;
			}
		}
		.footprintlist-list-item-title {
			height: 0.85333rem;
			line-height: 0.85333rem;
			padding-left: 0.2666rem;
		}
		.footprintlist-list-item-content {
			display: flex;
			align-items: center;
			background-color: @white;
			padding: 0.34666rem 1rem 0.54rem 0.32rem;
			img {
				width: 2.05333rem;
				height: 2.05333rem;
				margin: 0 10px;
			}
		}
		.del-btn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			text-align: center;
			background-color: @white;
			padding: 0.2rem 0;
			border-top: 1px solid #ccc;
			display: flex;
			align-items: center;
			.check {
				display: flex;
				align-items: center;
				margin-left: 0.26666rem;
			}
		}
		.custom-primary-red {
			border-radius: 99px!important;
			border-color: #CE3C39!important;
			color: #CE3C39!important;
			padding: 0.1rem 0;
			width: 50%;
			&:active {
				border-color: rgba(206, 60, 57, 0.6)!important;
				color: rgba(206, 60, 57, 0.6)!important;
				background-color: transparent;
			}
		}
	}
</style>