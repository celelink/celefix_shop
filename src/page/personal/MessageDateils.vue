<template>
  <div class="message_dateils_page" id="message-dateils-sticky">
    <div v-title>{{this.$route.query.title}}</div>
    <div>
      <sticky ref="sticky" scroll-box="message-dateils-sticky" :check-sticky-support="true">
        <x-header :right-options="{showMore: true}" :left-options="{backText: ''}" class="page-head" :title="data.title"></x-header>
      </sticky>
      <div class="message-dateils">
        <span class="message-dateils-day">{{data.createTime}}</span>
      </div>
      <div class="message-dateils-content">{{data.content}}</div>
     <!-- <div class="message-dateils-list">
        <img src="../../assets/user1.png" alt="">
        <div>
          <p class="tworow">寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人寒舍伊人</p>
          <p class="message-dateils-content">￥586</p>
          <x-button plain mini class="good-link">发送宝贝连接</x-button>
        </div>
      </div>-->
    </div>
   <!-- <div class="message-dateils-foot">
      <button class="message-dateils-sound iconfont icon-yuyin"></button>
      <input type="text">
      <button class="message-dateils-look iconfont icon-biaoqing"></button>
      <button class="message-dateils-add iconfont icon-xinzeng"></button>
    </div>-->
  </div>
</template>

<script>
import { XHeader, Sticky, XButton } from 'vux'
import { setStore, getStore } from '../../config/mUtils'
import { doTiding } from '../../service/getData'
export default {
  components: {
   XHeader,
   Sticky,
   XButton
  },
  data () {
    return {
      title: '',
      type:0,
      data:{}
    }
  },
  mounted () {
    	doTiding(this.$route.query.id).then(resolved => {
				if(resolved.msgCode == '0000') {
          this.data = resolved.data
				} else {
          this.$vux.toast.show({
            type:'text',
            text:resolved.msg,
            position:'bottom'
          })
				}
			})
  },
  methods:{
    openRouter(path){
      this.$router.push(path)
    }
  }
}
</script>
<style lang="less" scoped>
.message-dateils{
  text-align: center;
  margin:0.37333rem 0;
  .message-dateils-day{
    padding:5px 10px;
    background-color: rgba(204, 204, 204, 0.54);
    border-radius: 3px;
    color:#fff
  }
}
.message-dateils-content{
  padding:0 10px;
}
.message-dateils-list{
  display: flex;
  align-items: center;
  background-color: #fff;
  padding:0.18666rem 0.8rem 0.32rem 0.26666rem;
  img{
    width:2.5rem;
    height:2.5rem;
    min-width:2.5rem;
    min-height:2.5rem;
  }
  .message-dateils-content{
    font-weight:bold;
    color:#ff0000;
    margin-top:0.42666rem;
    margin-bottom:0.58666rem;
  }
  .good-link{
    color:#ff0000;
    border-color:#ff0000;
    margin-left: 25%;
  }
}
.message-dateils-foot{
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom:0;
  background-color: #fff;
  padding:5px 0;
  input{
    border:1px solid #ccc;
    border-radius: 5px;
    padding:8px 10px;
  }
  button{
    background-color: transparent;
    padding: 0 0.3rem;
    &.iconfont{
      font-size: 25px
    }
  }
}
</style>
