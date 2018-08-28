<template>
	<div class="setting_page">
		<div v-title>{{ title }}</div>
		<x-header :left-options="{backText: ''}" class="page-head" :title="title"></x-header>
		<group>
			<cell title="头像">
				<img :src="userimg" alt="">
			</cell>
		</group>
		<group>
			<cell title="昵称" :value="nickname"></cell>
		</group>
		<group>
			<cell title="性别" :value="sexVal"></cell>
		</group>
		<group>
			<cell title="手机号" :value="phone" :link="{name:'Binding'}"></cell>
		</group>
		<!--<group class="list-box">
			<cell primary="content" title="修改密码" is-link :link="{name:'EditPassWord'}"></cell>
		</group>-->
		<x-button type="warn" class="quit-btn">退出登录</x-button>
	</div>
</template>

<script>
	import { XHeader, XButton, Group, Cell, XInput } from 'vux'
	import { getStore, setStore } from '../../config/mUtils'
	import { getUserInfo } from '../../service/getData.js'

	export default {
		components: {
			XHeader,
			XButton,
			Group,
			Cell,
			XInput
		},
		data() {
			return {
				title: '设置',
				nickname: '一直淘',
				sexVal: '男',
				userimg: '',
				phone: ''

			}
		},
		mounted() {
			//个人信息
			getUserInfo(getStore('token')).then(resolved => {
				console.log(resolved.data)
				this.nickname = resolved.data.nickname
				this.point = resolved.data.point
				this.phone = resolved.data.phone
				this.userimg = resolved.data.headPic
				if(resolved.data.gender == 2) {
					this.sexVal = '女'
				}
				this.$vux.loading.hide()
			})
		}
	}
</script>
<style lang="less" scoped>
	img {
		width: 1.6rem;
		height: 1.6rem;
	}
	
	.quit-btn {
		margin-top: 1.54666rem;
	}
</style>