<template>
  <div class="auth-content">
    <div v-title>{{ title }}</div>
    
    </div>
</template>

<script>
import { getStore, setStore,removeStore } from '../../config/mUtils'
import { loginAPIUser } from '../../service/getData'

export default {
  components: {
   
  },
  data () {
    return {
      title: '授权',
      userName:'',
      nickname:'',
      headPic:'',
      refereeId:0,
      gender:0
    }
  },
  mounted() {
			this.$vux.loading.show({
				text: '授权中...'
			})
			this.userName = this.$route.query.remark1
			this.nickname = decodeURIComponent(this.$route.query.name)
			this.headPic = this.$route.query.headPic
			this.gender = this.$route.query.gender
			this.refereeId = getStore('refereeId')
			setStore('nickname',this.nickname)
			setStore('headPic',this.headPic)
			if(getStore('refereeId') ==='undefined'){
				this.refereeId = 0;
			}
			
			//授权登陆
			loginAPIUser(this.userName, this.nickname, this.headPic, this.gender,this.refereeId).then(resolved => {
				setStore('token',resolved.data.token)
				setStore('userId',resolved.data.id)
				setStore('openId',this.userName)
				this.$router.push({name:'Home'})
				removeStore('refereeId');
				this.$vux.loading.hide()
			})
	
		}
}
</script>
<style lang="less" scoped>

</style>
