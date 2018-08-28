<template>
	<div class="address_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" :title="title" class="page-head">
			<!-- <a slot="right" v-if="isempty==false">完成</a> -->
		</x-header>
		<section class="address-empty" v-if="isempty">
			<img src="../../assets/address-empty.png" alt="地址为空">
			<p class="address-empty-title">您暂无收货地址</p>
			<x-button class="primary-button" @click.native="add">新增地址</x-button>
		</section>
		<section class="address-list" v-else>
			<group>
				<cell-box v-for="(item,i) in list" :key="i">
					<div class="address-list-body">
						<div @click="isSelected(item.id, item.name, item.mobile, (item.proStr+item.cityStr+item.regionStr+item.address))">
							<!--{{item.proId | capitalize(1)}}{{item.cityId | capitalize(2)}}{{item.regionId | capitalize(3)}}-->
							<div class="address-list-top"><span class="address-name">{{item.name}}</span><span class="address-phone">{{item.mobile}}</span></div>
							<div class="address-content">{{item.proStr}} {{item.cityStr}} {{item.regionStr}} {{item.address}}</div>
						</div>
						<div class="address-list-bottom">
							<div>
								<checker v-model="radiobox" type="radio" default-item-class="default-item" selected-item-class="iconfont icon-xuanzhong">
									<checker-item :value="item.id" @on-item-click="onItemClick(item.id,radiobox===item.id?false:true)"></checker-item>
								</checker>
							</div>
							<div class="check-text">{{radiobox===item.id?'默认地址':'设为默认'}}</div>
							<div class="address-edit">
								<p @click="del(item.id)"><span class="iconfont icon-delete"></span>删除</p>
								<p @click="edit(item.id)"><span class="iconfont icon-redact"></span>编辑</p>
							</div>
						</div>
					</div>
				</cell-box>
			</group>
			<div v-transfer-dom>
      <confirm v-model="show" title="温馨提示" @on-cancel="onCancel" @on-confirm="onConfirm">
        <p style="text-align:center;">您确定删除吗？</p>
      </confirm>
    </div>
			<x-button class="new-add-button" @click.native="add">添加新地址</x-button>
		</section>
	</div>
</template>

<script>
	import { XHeader, XButton, Group, Cell, CellBox, Toast, CheckIcon, Checker, CheckerItem, Confirm, TransferDomDirective as TransferDom } from 'vux'
	import eventBus from '../service/eventbus';
	import { setStore, getStore } from '../../config/mUtils'
	import { cityData3 } from '../../config/cityDate'
	import { getUserAddressList, saveAddress, defaultAddress, delAddress} from '../../service/getData'
	export default {
		directives: {
			TransferDom
		},
		data() {
			return {
				title: '地址管理',
				isempty: false,
				ischeck: false,
				list: [],
				radiobox:'',
				id:0,
				show:false
			}
		},
		created() {

		},
		components: {
			Toast,
			XHeader,
			XButton,
			Group,
			Cell,
			CellBox,
			CheckIcon,
			Checker, 
			CheckerItem,
			Confirm 
		},
		props: [],
		filters: {
			// capitalize: function (value,type) {
			// 	if (!value) return ''
			// 	cityData3.forEach((ele)=>{
			// 		if((ele.value==value && type===1) || (ele.value==value && type===2) || (ele.value==value && type===3)){
			// 			return value = ele.name
			// 		}
			// 	})
			// 	return value
			// }
			addres: function(address, proStr, cityStr, regionStr){
				return proStr+cityStr+regionStr+address
			}
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			//userId,type
			getUserAddressList(getStore('token')).then(resolved => {
				if(resolved.msgCode == '0000') {
					if(resolved.data.length == 0) {
						this.isempty = true
					}
					this.list = resolved.data
					resolved.data.forEach((ele)=>{
						if(ele.isDefault)
						this.radiobox = ele.id
					})
					this.$nextTick(() => {
						this.$vux.loading.hide()
					})
					console.log(JSON.stringify(resolved.data))
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
			setTimeout(()=>{
				this.$nextTick(() => {
					this.$vux.loading.hide()
				})
			},5000)
		},
		methods: {
			onCancel() {
				console.log(11)
			},
			onConfirm(){
				this.$vux.toast.show({
					text: '删除成功'
				})
				delAddress(this.id, getStore('token')).then(resolved => {
					if(resolved.msgCode == '0000') {
						this.list.forEach(function(element,index) {
							if(this.id===element.id){
								this.list.splice(index,1)
							}
						}, this);
						console.log('删除成功'+this.id)
					} else {
						this.$nextTick(() => {
							this.$vux.toast.show({
								text: resolved.msg,
								type:'cancel'
							})
						})
					}
				})
			},
			//默认地址
			onItemClick(id,status){
				console.log(status)
				defaultAddress(id,status,getStore('token')).then(resolved => {
					console.log(JSON.stringify(resolved))
				if(resolved.msgCode == '0000') {
					console.log('成功'+id)
				} else {
					this.$nextTick(() => {
						this.$vux.toast.show({
							text: resolved.msg,
							type:'cancel'
						})
					})
				}
			})
				console.log('发送设置默认请求操作'+id)
			},
			//添加
			add() {
				this.$router.push({
					name: 'AddressAdd',
					query: {
						type: 'add'
					}
				})
			},
			//删除
			del(id){
				if(this.radiobox==id){
					return this.$vux.toast.show({
						text: '默认地址不可删除',
						type:'cancel',
						width:'11em'
					})
				}
				this.id = id
				this.show=true
			},
			//编辑
			edit(id){
				this.$router.push({name:'AddressAdd', query: { id: id, type: 'edit' }})
			},
			isSelected(id, name, mobile, address) {
				if(this.$route.query.type!=='list'){
					//传递一个map给上一页
					eventBus.$emit('address', {id:id, name:name, mobile:mobile, address:address});
					setStore('ischange', true)
					setStore('address', {id:id, name:name, mobile:mobile, address:address})
					//调用router回退页面
					this.$router.go(-1);
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	@white: #ffffff;
	.address_page {
		padding-bottom:42px;
		.address-empty {
			text-align: center;
			.primary-button {
				background-color: #ff0000;
				color: @white;
				width: 4.61333rem;
				border-radius: 10px;
				margin-top: 2.05333rem;
			}
			img {
				margin-top: 3.46666rem;
				margin-bottom: 0.72rem;
				width: 4.2666rem;
				height: 3.6rem;
			}
			.address-empty-title {
				font-size: 0.42666rem;
				color: #9b9b9b;
			}
		}
		.vux-header-title {
			color: #000!important
		}
		.address-list {
			.new-add-button {
				background-color: #ff0000;
				color: @white;
				position: fixed;
				bottom: 0;
				left: 0;
				right: 0;
				border-radius: 0!important
			}
			.address-list-top{
				display: flex;
				justify-content: space-between;
			}
			.address-list-body{
				flex-grow: 1
			}
			.address-list-bottom{
				display: flex;
				justify-content: space-between;
				padding-top:10px;
				margin-top: 10px;
				border-top:1px solid rgba(226, 225, 225, 0.77);
				.check-text{
					flex-grow: 1;
					margin-left:5px
				}
				.address-edit {
					align-self: flex-end;
					color: #cccccc;
					text-align: right;
					p{
						display: inline-block;
						color:#505050;
						&:first-child{
							margin-right:5px
						}
					}
				}
			}
		}
		.weui-cell {
			margin-top: 6px;
			background-color: @white
		}
		.weui-cell:before {
			display: none!important
		}
		.default-item{
			border: 1px solid #ccc;
			width:20px;
			height:20px;
			position: relative;
			border-radius:50%;
			display: block;
		}
		.checkbox-item{
			display: flex;
			padding-left:0.32rem;
		}
		.icon-xuanzhong{
			background: #fff;
			border:none;
			font-size: 25px;
			&:before{
				position: absolute;
				top:50%;
				left:50%;
				transform:translate(-50%,-50%);
				color:#E64340;
			}
		}
	}
</style>