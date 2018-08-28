<template>
  <div class="about">
    <div v-title>{{ title }}</div>
    <x-header :left-options="{backText: ''}" class="page-head" :title="title"></x-header>
      <img src="../../assets/personallogo.png" alt="">
      <p class="version">yizhitao：1.0.0</p>
      <p>微信订阅号：yizhitao</p>
      <p>微信服务号：yizhitao8888</p>
      <p>{{copyright}}：{{phone}}</p>
      <p>{{abstract}}</p>
      <p>{{copyrightText}}</p>
  </div>
</template>

<script>
import { XHeader } from 'vux'
import { getAbout } from '../../service/getData'

export default {
  components: {
   XHeader
  },
  data () {
    return {
      title:'关于我们',
      phone:'',
      copyright:'',
      abstract:'',
      copyrightText:''
    }
  },
  mounted () {
    getAbout(1).then((res)=>{
      this.copyrightText = res.data.copyright
      this.abstract = res.data.edition
    })
    getAbout(4).then((res)=>{
      this.copyright = res.data.copyright
      this.phone = res.data.edition
    })
  }
}
</script>
<style lang="scss" scoped>
  .about{
    text-align: center;
    img{
      width:2.50666rem;
      height:2.50666rem;
      margin-top:1.28rem;
      margin-bottom:0.34666em;
    }
    .version{
      margin-bottom:0.92rem;
    }
    p{
      margin-bottom:0.45333rem;
    }
  }
</style>
