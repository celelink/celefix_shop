<template>
  <div class="sign_page">
    <div v-title>{{ title }}</div>
    <x-header :left-options="{backText: ''}" :title="title" @on-click-more="showMenus" class="page-head"><!--<a slot="right">完成</a>--></x-header>
    <section>
      <div class="user-message">
        <img src="../../assets/user1.png" alt="">
        <div>
          <p>您已连续签到</p>
          <p class="center"><span class="signDay">55</span> 天</p>
        </div>
      </div>
      <p class="center">您击败了<span class="overstep">30</span>%的用户，要加油哦</p>
    </section>
    <div class="day-swiper-box">
      <ul class="sign-day">
        <li class="issign" :style="dayData-2<=0?'visibility: hidden':''"><svg class="icon" style="width: 0.5rem; height: 0.5rem;vertical-align: middle;fill: #ff0000;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2876"><path d="M512 63.6C264.4 63.6 63.6 264.4 63.6 512S264.4 960.4 512 960.4 960.4 759.6 960.4 512 759.6 63.6 512 63.6m281.3 301L458.9 699c-5.5 5.5-12.8 8.3-19.9 8.1-7.2 0-14.4-2.7-19.9-8.1L230.7 510.8c-10.9-10.9-10.9-28.7 0-39.7 10.9-10.9 28.7-10.9 39.7 0l168.5 168.5L753.6 325c10.9-10.9 28.7-10.9 39.7 0 10.9 11 10.9 28.7 0 39.6" p-id="2877"></path></svg>{{dayData-2}}</li>
        <li class="issign" :style="dayData-1<=0?'visibility: hidden':''"><svg class="icon" style="width: 0.5rem; height: 0.5rem;vertical-align: middle;fill: #ff0000;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2876"><path d="M512 63.6C264.4 63.6 63.6 264.4 63.6 512S264.4 960.4 512 960.4 960.4 759.6 960.4 512 759.6 63.6 512 63.6m281.3 301L458.9 699c-5.5 5.5-12.8 8.3-19.9 8.1-7.2 0-14.4-2.7-19.9-8.1L230.7 510.8c-10.9-10.9-10.9-28.7 0-39.7 10.9-10.9 28.7-10.9 39.7 0l168.5 168.5L753.6 325c10.9-10.9 28.7-10.9 39.7 0 10.9 11 10.9 28.7 0 39.6" p-id="2877"></path></svg>{{dayData-1}}</li>
        <li class="sign-day-center nosign"><!-- issign -->
          <svg class="icon" style="width: 0.5rem; height: 0.5rem;vertical-align: middle;fill: #ff0000;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2876"><path d="M512 63.6C264.4 63.6 63.6 264.4 63.6 512S264.4 960.4 512 960.4 960.4 759.6 960.4 512 759.6 63.6 512 63.6m281.3 301L458.9 699c-5.5 5.5-12.8 8.3-19.9 8.1-7.2 0-14.4-2.7-19.9-8.1L230.7 510.8c-10.9-10.9-10.9-28.7 0-39.7 10.9-10.9 28.7-10.9 39.7 0l168.5 168.5L753.6 325c10.9-10.9 28.7-10.9 39.7 0 10.9 11 10.9 28.7 0 39.6" p-id="2877"></path></svg>
          <p>第{{dayData}}天</p>
          <p>+{{dayData*10}}积分</p>
        </li>
        <li :style="dayData+1>=31?'visibility: hidden':''"><svg class="icon" style="width: 0.5rem; height: 0.5rem;vertical-align: middle;fill: #ff0000;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2876"><path d="M512 63.6C264.4 63.6 63.6 264.4 63.6 512S264.4 960.4 512 960.4 960.4 759.6 960.4 512 759.6 63.6 512 63.6m281.3 301L458.9 699c-5.5 5.5-12.8 8.3-19.9 8.1-7.2 0-14.4-2.7-19.9-8.1L230.7 510.8c-10.9-10.9-10.9-28.7 0-39.7 10.9-10.9 28.7-10.9 39.7 0l168.5 168.5L753.6 325c10.9-10.9 28.7-10.9 39.7 0 10.9 11 10.9 28.7 0 39.6" p-id="2877"></path></svg>{{dayData+1}}</li>
        <li :style="dayData+2>=31?'visibility: hidden':''"><svg class="icon" style="width: 0.5rem; height: 0.5rem;vertical-align: middle;fill: #ff0000;overflow: hidden;" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2876"><path d="M512 63.6C264.4 63.6 63.6 264.4 63.6 512S264.4 960.4 512 960.4 960.4 759.6 960.4 512 759.6 63.6 512 63.6m281.3 301L458.9 699c-5.5 5.5-12.8 8.3-19.9 8.1-7.2 0-14.4-2.7-19.9-8.1L230.7 510.8c-10.9-10.9-10.9-28.7 0-39.7 10.9-10.9 28.7-10.9 39.7 0l168.5 168.5L753.6 325c10.9-10.9 28.7-10.9 39.7 0 10.9 11 10.9 28.7 0 39.6" p-id="2877"></path></svg>{{dayData+2}}</li>
      </ul>
      <swiper :show-dots="false" @on-index-change="dayDataChange" class="daySwiper" ref="swiper">
        <swiper-item v-for="i in dataNum" :key="i">{{i}}</swiper-item>
      </swiper>
    </div>
    
    <div class="center sign-foot">
      <p>今日奖励50积分</p>
      <button class="sign-btn issign" @click="signBtn">签到</button>
    </div>
  </div>

</template>

<script>
import { XHeader,Swiper, SwiperItem, dateFormat } from 'vux'

export default {
  components: {
    XHeader,
    Swiper,
    SwiperItem,
    dateFormat
  },
  mounted () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    this.$vux.loading.hide()
    console.log(this.$refs.swiper.current)
    this.dayData = dateFormat(new Date(), 'DD') * 1
  },
  methods: {
    showMenus (index) {
      
    },
    signBtn(){

    },
    dayDataChange(index){
      this.dayData++
      console.log(index)
    }
  },
  data () {
    return {
      title: '每日签到',
      dayData:1,
      dataNum:31
    }
  }
}
</script>

<style scoped lang="less">
@white:#fff;
.sign_page{
  section{
    background-color: #fff;
    margin-bottom: 1.66666rem;
    padding-top:0.69333rem;
    padding-bottom: 0.69333rem;
    margin-top:4px;
    .user-message{
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom:0.32rem;
      img{
        width:1.33333rem;
        height:1.33333rem;
        margin-right:0.32rem;
      }
      .signDay{
        font-weight: bold;
        color:#ff0000
      }
    }
    .overstep{
      font-weight: bold;
      color:#fd6526
    }
  }
  .day-swiper-box{
    position: relative;
    height:3.0rem;
    overflow: hidden;
    .sign-day{
      position: absolute;
      display: flex;
      justify-content: space-around;
      align-items: center;
      width:100%;
      overflow: hidden;
      li{
        width:1.44rem;
        height:1.44rem;
        line-height: 1.44rem;
        text-align: center;
        background-color: #eae8e7;
        border-radius: 50%;
        flex-shrink:0;
        .icon{
          display: none;
          position:absolute;
          bottom:0;
          right:0;
        }
      }
      .issign{
        background-color: #f5c6c4;
        position: relative;
        .icon{
          display: block;
        }
      }
      .sign-day-center{
        width:2.50666rem;
        height:2.50666rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 0.7rem;
        &.issign{
          background-color: #ff0000;
          color:#ffffff;
        }
        .icon{
          bottom:0.1rem;
          right:0.1rem;
          fill: #fd6526!important;
        }
        &.nosign{
          background-color: #ffffff;
          color:#ff0000;
          box-sizing: border-box;
          border: 5px solid #ff0000;
        }
      }
    }
    .daySwiper{
      position: absolute;
      left: 0;
      right:0;
      opacity: 0;
    }
  }
  .sign-foot{
    margin-top:2.72rem;
    .sign-btn{
      margin-top:0.24rem;
      background-color: #ff0000;
      color:#fff;
      padding:10px 70px;
      border-radius: 30px;
      &.issign{
        background-color: #ccc;
      }
    }
  }
}
</style>
