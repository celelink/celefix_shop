<template>
	<div class="address_page">
		<div v-title>{{ this.$route.query.type=='edit'?'编辑地址':'新建地址' }}</div>
		<x-header :left-options="{backText: ''}" :title="this.$route.query.type=='edit'?'编辑地址':'新建地址'" class="page-head">
			<a slot="right" @click="done">完成</a>
		</x-header>
		<section class="address-empty">
			<group class="address-item">
				<x-input title="收货人" v-model="nameValue" placeholder="请输入收货人" ref="name" :required="true"></x-input>
			</group>
			<group class="address-item phone">
				<x-input title="电话号码" v-model="phoneValue" is-type="china-mobile" :max="13" ref="phone" :required="true"></x-input>
				<!-- <span class="iconfont icon-xinzeng"></span> -->
			</group>
			<!-- 省市 -->
			<group class="address-item">
				<x-address :title="locationCity" v-model="valueCity" :list="addressData" :placeholder="locationCityText" @on-shadow-change="cityChange">
					<template slot="title" scope="props">
						<span style="vertical-align:middle;">{{locationCity}}</span>
					</template>
				</x-address>
			</group>
			<!-- 街道 -->
			<!-- <group class="address-item">
				<x-address :title="locationStreet" @on-hide="logStreetHide" v-model="valueStreet" :list="cityStreet" :placeholder="locationStreet">
					<template slot="title" scope="props">
						<span style="vertical-align:middle;">{{locationStreet}}</span>
					</template>
				</x-address>
			</group> -->
			<group class="address-item">
				<x-textarea :placeholder="placeholder" :show-counter="false" :rows="3" v-model="areaValue" autosize></x-textarea>
			</group>
			<group class="address-item">
				<x-switch :title="defaultTitle" v-model="defaultValue"></x-switch>
			</group>
		</section>
	</div>
</template>

<script>
	import { XHeader, XButton, Group, XInput, Cell, XAddress, XTextarea, XSwitch } from 'vux'
	import { setStore, getStore } from '../../config/mUtils'
	import { cityData3 } from '../../config/cityDate'
	import { getUserAddress, saveAddress } from '../../service/getData'

	export default {
		data() {
			return {
				id:0,
				nameValue: '',
				phoneValue: '',
				areaValue: '',
				proId:0, 
				cityId:0,
				regionId:0,
				valueCity: [],
				valueStreet: [],
				seachCity: '东城区',
				defaultValue: false,
				defaultTitle: '设为默认',
				locationCity: '所在地区',
				locationCityText:'',
				locationStreet: '所在街道',
				placeholder: '请填写详细地址，不少于5个字',
				addressData: [],
				cityStreet: []
			}
		},
		components: {
			XHeader,
			XButton,
			Group,
			XInput,
			Cell,
			XAddress,
			cityData3,
			XTextarea,
			XSwitch
		},
		mounted() {
			this.$vux.loading.show({
				text:'加载中...'
			})
			if(this.$route.query.type==='edit') {
				this.id = this.$route.query.id
				getUserAddress(this.id,getStore('token')).then(resolved => {
					if(resolved.msgCode == '0000') {
						this.nameValue = resolved.data.name
						this.phoneValue = resolved.data.mobile
						this.areaValue = resolved.data.address
						this.proId = resolved.data.proId
						this.cityId = resolved.data.cityId
						this.regionId = resolved.data.regionId
						this.defaultValue = resolved.data.isDefault
						this.locationCityText = resolved.data.proStr +' '+  resolved.data.cityStr +' '+ resolved.data.regionStr
						this.$nextTick(()=>{
							this.$vux.loading.hide()
						})
						// cityData3.forEach((ele)=>{
						// 	if(((resolved.data.proId || resolved.data.cityId || resolved.data.regionId)==null) || ((resolved.data.proId || resolved.data.cityId || resolved.data.regionId)==0)){
						// 		return this.locationCityText = '北京 北京市 东城区'
						// 	}
						// 	if(ele.value==resolved.data.proId){
						// 		this.locationCityText += ele.name + ' '
						// 	}
						// 	if(ele.parent==resolved.data.cityId || ele.parent==resolved.data.regionId){
						// 		this.locationCityText += ele.name + ' '
						// 	}
						// })
					} else {
						this.$nextTick(()=>{
							this.$vux.loading.hide()
							this.$vux.toast.show({
								text: resolved.msg
							})
						})
					}
				})
			}else{
				this.$nextTick(()=>{
					this.$vux.loading.hide()
				})
			}
			this.addressData = cityData3
		},
		methods: {
			done() {
				if(!this.$refs.name.valid){
					this.$nextTick(()=>{
						return this.$vux.toast.show({
							text:this.$refs.phone.errors.format || '请输入收货人',
							width:'10em',
							type:'warn'
						})
					})
				}else if(!this.$refs.phone.valid){
					this.$nextTick(()=>{
						return this.$vux.toast.show({
							text:this.$refs.phone.errors.format || '请输入手机号码',
							width:'auto',
							type:'warn'
						})
					})
				}else  if(this.areaValue==''){
					this.$nextTick(()=>{
						return this.$vux.toast.show({
							text:'请输入收货地址',
							width:'10em',
							type:'warn'
						})
					})
				}else{
					//保存地址
					saveAddress(this.id, this.nameValue, this.phoneValue, this.proId, this.cityId, this.regionId, this.areaValue, this.defaultValue,getStore('token')).then(resolved => {
						if(resolved.msgCode == '0000') {
							this.$vux.toast.show({
								text: '操作成功'
							})
							setTimeout(()=>{
								this.$router.back()
							},1000)
						} else {
							this.$nextTick(()=>{
								this.$vux.toast.show({
									text:resolved.msg
								})
							})
						}
					})
				}
			},
			cityChange(ids, names) {
				this.seachCity = names[2]
				this.proId = ids[0]
				this.cityId = ids[1]
				this.regionId = ids[2]
				// console.log(ids[0]+' '+ids[1]+' '+ids[2])
				// console.log(names[0]+' '+names[1]+' '+names[2])
				// this.locationCityText = names[0]+' '+names[1]+' '+names[2]
			},
			// 街道事件
			// logCityHide() {
			// 	this.$ajax.get('http://restapi.amap.com/v3/config/district?key=3389cf7006ccb589a7a15589f350ece2&keywords=' + this.seachCity + '&subdistrict=4&extensions=base').then(resolved => {
			// 		var stc = (resolved.data.districts[0].districts)
			// 		console.log(resolved.data)
			// 		stc.forEach(function(ele) {
			// 			var stc = JSON.stringify(ele).replace(/adcode/g, 'value')
			// 			var str = JSON.parse(stc)
			// 			this.cityStreet.push(str)
			// 		}, this);
			// 	})
			// },
			// logStreetHide(str) {
			// 	this.$ajax.get('http://restapi.amap.com/v3/config/district?key=3389cf7006ccb589a7a15589f350ece2&keywords='+this.seachCity+'&subdistrict=1&extensions=base').then(resolved =>{
			// 	    var stc = (resolved.data.districts[0].districts)
			// 	    this.cityStreet = stc
			// 	})
			// },
		}
	}
</script>

<style lang="less" scoped>
	@import '~vux/src/styles/1px.less';
	@white: #ffffff;
	.address_page {
		.phone {
			.weui-cell {
				align-items: center;
			}
		}
		.vux-header-title {
			color: #000!important
		}
		.address-item {
			margin-top: 1px;
			background-color: @white;
			position: relative;
			.iconfont {
				font-size: 24px;
				position: absolute;
				top: 50%;
				right: 10px;
				transform: translate(0, -50%)
			}
		}
	}
</style>