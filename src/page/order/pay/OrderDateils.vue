<template>
	<div class="dateils">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" @on-click-more="showMenus = true" class="page-head">{{ title }}</x-header>
		<ul>
			<li class="order-head">
				<div><span class="iconfont" :class="isempty?'icon-dizhi':'icon-dizhi-xian'"></span></div>
				<div class="order-message" @click="openWindow({name:'Address'})" v-if="isempty">
					<p class="order-phone">{{address.name}} {{address.mobile}}</p>
					<p class="order-address">{{address.address}}</p>
				</div>
				<div class="order-message" @click="openWindow({name:'Address'})" v-else>
					<p>请选择收货地址</p>
				</div>
				<div><span class="iconfont icon-fangxiangyou"></span></div>
			</li>
			</ul>
			<ul v-for="(item,index) in list" :key="index" v-show="!isshow">
			<!--<li class="order-shop-title">卡帕迪专卖店</li>-->
			<li class="order-head">
				<img :src="item.goods.attachmentCover" :alt="item.goods.goodsName">
				<div class="order-shop-message">
					<p class="tworow">{{item.goods.goodsName}}</p>
					<!-- <p>36码 黑色</p> -->
					<p class="order-price"><span>￥{{item.goods.price}}</span><span class="goodsNumber">X{{ item.goodsNumber }}</span></p>
				</div>
			</li>
			<li>
				<group class="content-num">
					<cell title="购买数量">
						<inline-x-number style="display:block" :min="0" :max="item.goods.inventory<item.goodsNumber?item.goodsNumber:item.goods.inventory" width="70px" :value="item.goodsNumber" ref="inlineNum" :title="item.goods.price+''" @on-change="change(index)"></inline-x-number>
					</cell>
				</group>
				<!-- <group class="content-num">
					<cell title="配送方式">
						<span>圆通快递</span>
					</cell>
				</group> -->
				<group class="content-num">
					<cell title="运费" :value="item.goods.postagePrice" ref="postagePrice">
						<span>{{item.goods.postagePrice===0?'包邮':item.goods.postagePrice.toFixed(2)}}</span>
					</cell>
				</group>
			</li>
			<li>
				<group>
					<x-textarea :title="('卖家留言')" :max="200" placeholder="选填：对本次交易的说明" :show-counter="false" :rows="4" :cols="30" :value="textAreaVal" @on-change="inputText" ref="text"></x-textarea>
				</group>
			</li>
		</ul>
		<!-- 直接购买路劲 -->
		<ul v-show="isshow">
			<!--<li class="order-shop-title">卡帕迪专卖店</li>-->
			<li class="order-head">
				<img :src="listData.cover" alt="">
				<div class="order-shop-message">
					<p class="tworow">{{listData.goodsName}}</p>
					<!-- <p>36码 黑色</p> -->
					<p class="order-price"><span>￥{{listData.price}}</span><span>X{{ listData.num }}</span></p>
				</div>
			</li>
			<li>
				<group class="content-num">
					<cell title="购买数量">
						<inline-x-number style="display:block" :min="1" :max="listData.maxValue" width="70px" v-model="valueNum" @on-change="onchange"></inline-x-number>
					</cell>
				</group>
				<group class="content-num">
					<cell title="运费">
						<span>￥{{listData.postagePrice===0?'包邮':parseFloat(listData.postagePrice).toFixed(2)}}</span>
					</cell>
				</group>
			</li>
			<li>
				<group>
					<x-textarea :title="('卖家留言')" :max="200" placeholder="选填：对本次交易的说明" :show-counter="false" :rows="4" :cols="30" v-model="textAreaVal"></x-textarea>
				</group>
			</li>
		</ul>
		<div class="foot">
			<x-button class="button" @click.native="joinCat">合计：￥{{isshow?currentValue:currentValue2}}</x-button>
			<x-button class="button submit" :class="isDisabled?'active':''" :disabled="isDisabled" @click.native="buyNows" :text="submitText" :show-loading="isDisabled"></x-button>
		</div>
		<confirm v-model="show" title="温馨提示" @on-confirm="onConfirm">
      <p style="text-align:center;">{{dataText}}</p>
    </confirm>
		<!-- 底部导航 -->
	</div>

</template>
<script>

	import { XHeader, Group, Cell, InlineXNumber, XTextarea, XButton, Confirm } from 'vux'
	import { getStore, setStore, removeStore } from '../../../config/mUtils'
	import eventBus from '../../service/eventbus'
	import { getCumUserDefaultAddress, doOrder, doOrderData} from '../../../service/getData'
	export default {
		components: {
			XHeader,
			Group,
			Cell,
			InlineXNumber,
			XTextarea,
			XButton,
			Confirm
		},
		mounted() {
			this.$vux.loading.show({
				text: '加载中...'
			})
			if(this.$route.query.istype!='cart'){
				this.listData = JSON.parse(getStore('listData'))
				this.valueNum = this.listData.num
				this.isshow = true
			}
			//获取默认地址getStore('token')
			if(getStore('address')===null){
				getCumUserDefaultAddress(getStore('token')).then(resolved => {
					if(null != resolved.data) {
						this.isempty = true
						this.address = resolved.data
					}
					this.$vux.loading.hide()
				})
			}else{
				this.address = JSON.parse(getStore('address'))
				this.isempty = true
				this.$vux.loading.hide()
			}
			if(this.$route.query.istype==='cart' && typeof this.$route.query.istype!='undefined'){
				this.list = JSON.parse(getStore('arrList'))
				console.log(this.list)
			}
			// if(getStore('ischange')) {
			// 	//根据地址列表页传参数
			// 	eventBus.$on('address', function(data) {
			// 		//接收传递过来的地址参数
			// 		console.log(data)
			// 		this.address = data
			// 		//重置状态
			// 		setStore('ischange', false)
			// 	}.bind(this));
			// }
			this.$nextTick(() => {
				var inputStyle = document.getElementsByClassName('vux-number-input')
				for (var i = 0; i < inputStyle.length; i++) {
					var element = inputStyle[i];
					element.removeAttribute('type')
					element.removeAttribute('readonly')
				}
			})
		},
		filters:{
			filNum:function(val,val2){
				return 111
			}
		},
		methods: {
			openWindow(path) {
				this.$router.push(path)
			},
			openMenu(index) {
				this.isactive = index
				this.menuItemNum = index
				this.$refs.scrollerBottom.reset({
					top: 0
				})
			},
			inputText(index){
				
			},
			change(index){
				let num = 0
				console.log(this.$refs.inlineNum)
				this.$refs.inlineNum.forEach((ele,i)=>{
					num+=ele.currentValue * parseFloat(ele.title) + this.$refs.postagePrice[i].value
					this.currentValue2 = num.toFixed(2)
					if(i===index){
						this.list[index].goodsNumber = ele.currentValue
						setStore('arrList',this.list)
					}
				})
			},
			onchange(){
				this.listData.num = this.valueNum
				setStore('listData',this.listData)
			},
			onConfirm(){
				let arr = this.dataObj.valueNums.split('#')
				arr.splice(this.dataObj.valueNums.split('#').length-1,1)
				let str = ''
				this.list.forEach((ele,index)=>{
					if(ele.goods.id===this.insufficient.id){
						this.list[index].goods.inventory = this.insufficient.inventory
						this.list[index].goodsNumber = this.insufficient.inventory
						arr[index] = this.insufficient.inventory
						setStore('arrList',this.list)
						arr.forEach((element)=>{
							str+=element+'#'
							return this.dataObj.valueNums = str
						})
					}
				})
			},
			buyNows() { //下单
				if(!this.isempty){
					return this.$vux.toast.show({
						text:'请选择地址',
						type:'text',
						position:'top'
					})
				}
				this.isDisabled = true
				this.submitText = '提交中' 
				if(this.list.length > 0){
					let textAreaValText = ''
					this.$refs.text.forEach((ele,i)=>{
						if(ele.currentValue == ''){
							textAreaValText += '无#'
							this.textAreaVals =textAreaValText
						}else{
							this.textAreaVals += ele.currentValue +'#'
						}
					})
					let obj = {'express':'','valueNums':'','priceSums':'','goodsIds':''}
					this.list.forEach((ele)=>{
						obj.express  += ele.goodsNumber +'#'
						obj.valueNums += ele.goodsNumber +'#'
						obj.priceSums += ele.goods.price * ele.goodsNumber  +'#'
						obj.goodsIds += ele.goods.id +'#'
						this.dataObj = obj
					})
					//批量下单｛已完善｝token, 用户ID, 商品ID拼接， 数量拼接，单个商品的金额拼接，地址ID，留言拼接，总金额 # 号隔开
					doOrderData(getStore('token'),getStore('userId'), this.dataObj.goodsIds, this.dataObj.valueNums,this.dataObj.priceSums, this.address.id, this.textAreaVals, this.currentValue2).then(resolved => {
						if(resolved.msgCode == '0000') {
							this.$router.push({name: 'PaymentListItem',query: { orderId: resolved.data,priceSum: this.currentValue2}})
						} else {
							this.dataText = resolved.msg
							this.insufficient = resolved.data
							this.show = true
						}
						this.submitText = '提交订单'
						this.isDisabled = false
					}).catch(res=>{
						console.log(res)
					})
				}else{//单个下单
					console.log('biliang')
					doOrder(getStore('token'),getStore('userId'), this.listData.goodsId, this.listData.num,this.listData.price, this.address.id, this.textAreaVal, this.remarks2, this.remarks3).then(resolved => {
						console.log(resolved)
						if(resolved.msgCode == '0000') {
							this.$router.push({name: 'PaymentListItem',query: { orderId: resolved.data,priceSum: this.currentValue}})
						} else {
							this.$nextTick(()=>{
								this.$vux.toast.show({
									type:'text',
									text:resolved.msg,
									position:'middle'
								})
							})
						}
						this.submitText = '提交订单'
						this.isDisabled = false
					}).catch(res=>{
						console.log(res)
					})
				}
			}
		},
    computed:{
			currentValue: {
				// 动态计算currentValue的值
				get:function() {
					return (this.listData.price * this.listData.num + this.listData.postagePrice).toFixed(2)
				},
				set:function(val) {
						this.$emit('input', val);
				}
			}
		},
		// watch:{
		// 	list:{
		// 		handler:function(){
		// 			this.list.forEach((ele)=>{
		// 				this.express  += ele.goodsNumber +'#'
		// 				this.valueNums += ele.goodsNumber +'#'
		// 				this.priceSums += ele.goods.price * ele.goodsNumber  +'#'
		// 				this.goodsIds += ele.goods.id +'#'
		// 			})
		// 		}
		// 	}
		// },
		data() {
			return {
				title: '确认下单',
				submitText:'提交订单',
				isempty: false,
				show:false,
				isshow:false,
				listData:{},
				dataObj:{},
				insufficient:{},
				dataText:'',
				maxValue: 10,
				goodsIds:'',
				inventory:0,
				valueNum: 0,
				valueNums: '',
				priceSums: '',
				express:0,
				currentValue2:0,
				isDisabled:false,
				list:[],
				address: {},
				remarks2:'',
				remarks3:'默认',
				textAreaVal: '',
				textAreaVals:''
			}
		}
	}
</script>

<style scoped lang="less">
	@white: #ffffff;
.vux-spinner-ios, .vux-spinner-ios-small{ stroke:@white; }
	.order-head {
		display: flex;
		justify-content: space-between;
		padding: 0.48rem 0.26666rem;
		background-color: @white;
		align-items: center;
		min-height: 2.65333rem;
		.iconfont {
			font-size: 0.64rem;
		}
		.order-message {
			margin-left: 0.37333rem;
			margin-right: 0.6rem;
			width: 8rem;
			text-align: left;
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;
			/** 显示的行数 **/
			overflow: hidden;
			/** 隐藏超出的内容 **/
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
		}
	}
	
	.order--shop-title {
		background-color: @white;
		padding: 0.42666rem 0.26666rem;
		border-bottom: 1px solid #ccc
	}
	.dateils{
		padding-bottom:60px;
		ul{
			margin-top: 0.21333rem;
		}
	}
	.foot {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: @white;
		.button {
			width: 50%;
			text-align: center;
			padding: 0.08rem 0;
			margin-top: 0;
			background-color: @white;
		}
		.submit {
			background-color: #ff0000;
			color: @white;
		}
		.loading{
			position: absolute;
			left: 55%;
			z-index: 9999;
		}
		.active{
			background-color: rgba(255, 0, 0, 0.49);
		}
	}
</style>