<template>
  <div class="member_page">
    <div v-title>{{ title }}</div>
    <x-header :left-options="{backText: ''}" :title="title" class="page-head"></x-header>
    <div class="member-head">
      <p class="center textWhite">壹只桃会员</p>
      <p class="center textWhite integral">积分 30</p>
      <div class="sign" @click="openRouter({name:'SignDateils'})"><span class="iconfont icon-qiandao-xian"></span>已签到999天</div>
      <div class="member-grade">
        <div class="member-grade-item">
          <img src="../../assets/member-icon-1.png" alt="">
          <p class="center designation">钢铁</p>
        </div>
        <div class="member-grade-item">
          <img src="../../assets/member-icon-2.png" alt="">
          <p class="center designation">钢铁</p>
        </div>
        <p class="member-grade-line"></p>
        <p class="member-grade-line active" :style="'width:'+(6.75+integral/100)+'%'"></p>
      </div>
      <p class="center des">还差{{integral}}积分，即可升级青铜哦</p>
    </div>
    <div class="member-content">
      <p class="member-content-title"><span class="dot"></span><span>会员权益</span><span class="dot"></span></p>
      <img src="../../assets/01.png" alt="">
      <p>VIP专属邮费：首重￥30/500g，续重￥5/100g</p>
      <img src="../../assets/02.png" alt="">
      <p class="privilege">购物即可返现商品总额3%的收益，上不封顶</p>
      <img src="../../assets/03.png" alt="">
      <p>海量优惠券免费送，美元送你￥100元金券礼包</p>
      <img src="../../assets/04.png" alt="">
      <p>全程专项享一对一服务，全天无风服务</p>
      <x-button class="open-member" @click.native="openRouter({name:'PaymentList'})">升级会员立享优惠</x-button>
      <p class="protocol">开通即视为同意《壹只桃会员-用户协议》</p>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton } from 'vux'

export default {
  components: {
    XHeader,
    XButton
  },
  data () {
    return {
      title: '会员中心',
      integral:1000-30,
    }
  },
  mounted () {
    
  },
  methods:{
    openRouter(path){
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less" scoped>
.member_page{
  .member-head{
    min-height: 5.18666rem;
    background: url('../../assets/personalbg.png') no-repeat;
    background-size: 100% 100%;
    padding:0.32rem 0 0.42666rem;
    .integral{
      margin-top:0.32rem;
    }
    .sign{
      top:3.86666rem;
    }
    .member-grade{
      display: flex;
      align-items: center;
      position: relative;
      margin-top:0.56rem;
      text-align: center;
      .member-grade-item{
        width:1.06666rem;
        min-width:1.06666rem;
        height:1.06666rem;
        min-height:1.06666rem;
        margin-right: 1.94666rem;
        position: relative;
        left:50%;
        transform: translateX(-50%);
        z-index: 5;
        img{
          width:100%;
          height:100%
        }
        .designation{
          text-align: center;
          margin-top:0;
        }
        &:first-child{
          width:1.44rem;
          min-width:1.44rem;
          height:1.44rem;
          min-height:1.44rem;
        }
      }
      .member-grade-line{
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        left:50%;
        right:0;
        height:4px;
        margin-top:0;
        background-color: #bcbcbc;
        &.active{
          background-color: #D96B00;
        }
      }
    }
    .des{
      color:#ccc;
      padding-top: 1rem;
    }
  }
  .member-content{
    text-align: center;
    background-color:#fff;
    padding-top:0.72rem;
    padding-bottom:0.21333rem;
    .member-content-title{
      position: relative;
      .dot{
        width:8px;
        height: 8px;
        border-radius: 50%;
        background-color: #ccc;
        display: inline-flex;
        margin:0 8px;
      }
    }
    .open-member{
      background-color: #ff0000;
      color:#fff;
      margin-top:1.01333rem;
      width:70%;
    }
    .protocol{
      margin-top:0.34666rem;
    }
  }
}
</style>
