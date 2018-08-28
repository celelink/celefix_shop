<template>
	<div class="auth-content">
		<div v-title>{{ title }}</div>
	</div>
</template>

<script>
	import { getStore, setStore } from '../../config/mUtils'
	import { getCode } from '../../service/getData'

	export default {
		components: {
		},
		data() {
			return {
				title: '授权'
			}
		},
		mounted() {
			setStore('refereeId',this.$route.query.id)
						
			//alert(getStore('openId')!= undefined)
			//if(getStore('openId') === 'undefined' || getStore('userId') === 'undefined' || getStore('openId') == null) {
				//授权
				getCode().then(resolved => {
					location.href = resolved.data
				})
				/*this.$ajax.get('http://test.celelink.com/one_mall/backend/h5/weixin/getCode').then(resolveds => {
					location.href = resolveds.data
				}, this);*/
			//} else {
			//	this.$router.push({
			//		name: 'Home'
			//	})
			//}
		}
	}
</script>
<style lang="less" scoped>

</style>