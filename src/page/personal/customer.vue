<template>
  <div class="customer_page">
    <div v-title>{{ title }}</div>
    <!-- <x-header :left-options="{backText: ''}" :title="title" class="page-head"><a slot="right">完成</a></x-header> -->
    <ul>
      <li>
        <div class="customer-item" @click="tel">
          <img src="../../assets/lianxikefu.png" alt="">
          <div>
            <p>{{translateName}}</p>
            <p>{{translatePhone}}</p>
          </div>
        </div>
      </li>
      <li>
        <div class="customer-item">
          <img src="../../assets/weixinkefu.png" alt="">
          <div>
            <p>{{weixinName}}</p>
            <p>长按复制微信公众号：{{weixin}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>

</template>

<script>
import { XHeader } from 'vux'
import { getAbout } from '../../service/getData'

export default {
  components: {
    XHeader
  },
  mounted () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    getAbout(4).then((res)=>{
      this.translateName = res.data.copyright
      this.translatePhone = res.data.edition
      this.$nextTick(()=>{
        this.$vux.loading.hide()
      })
    })
    getAbout(5).then((res)=>{
      this.weixinName = res.data.copyright
      this.weixin = res.data.edition
      this.$nextTick(()=>{
        this.$vux.loading.hide()
      })
    })
  },
  methods: {
    tel (index) {
      window.location.href = 'tel:'+this.translatePhone;
    }
  },
  data () {
    return {
      title: '联系客服',
      translateName:'',
      translatePhone:'',
      weixinName:'',
      weixin:''
    }
  }
}
</script>

<style scoped lang="less">
@white:#fff;
.customer_page{
  .customer-title{
    margin-bottom:0.13333rem;
    background-color: @white;
  }
  ul>li:first-child{
    margin-top:2px;
  }
  .customer-item{
    display: flex;
    align-items: center;
    background-color: @white;
    padding:0.37333rem;
    margin-bottom:2px;
    img{
      width:1.5333rem;
      height:1.5333rem;
      margin-right:0.48rem;
    }
  }
}
</style>
