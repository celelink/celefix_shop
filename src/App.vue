<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
    <router-view></router-view>
    </transition>
		<transition name="fade">
			<aside id="black-top" class="iconfont icon-fanhuidingbu" @click="backTop" v-show="isshow" :class="isshow?'black-top-show':''"></aside>
		</transition>
  </div>
</template>

<script>
import './config/flexible.debug.js'
import { getAbout } from './service/getData.js'
import { animate } from './config/mUtils.js'

export default {
  name: 'app',
  components: {
  },
  mounted(){
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
    })  
  },
  methods:{
    onScroll () {
      let scrolled = document.documentElement.scrollTop || document.body.scrollTop
　　　 // 586、1063分别为第二个和第三个锚点对应的距离
      scrolled >= 500?this.isshow = true:this.isshow = false
    },
    backTop() {
      animate(document.body, {
        scrollTop: '0'
      }, 400, 'ease-out');
    },
  },
  watch:{
    '$route' (to, from) {
      if(to.path=='/authData' && from.path=='/'){
        this.$router.push({name:'Home'})
      }else if((to.path=='/orderdateils' || to.path=='/order' || to.path=='/order') && from.path=='/paymentListItem'){
        this.$router.push({name:'Order',query:{type:1}})
      }else if(to.path=='/orderdateils' && from.path=='/order'){
        this.$router.push({name:'Personal'})
      }
    }
  },
  created () {
    (function(){
      // getAbout(3).then(res =>{
      //   // console.log(res.data.edition)
      //   //创建一个style元素   获取head元素
      //   var style = document.createElement('link'),
      //   head = document.head || document.getElementsByTagName('head')[0];
      //   style.type = 'text/css'; //这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
      //   style.href = res.data.edition;
      //   style.rel  = 'stylesheet';
      //   head.appendChild(style); //把创建的style元素插入到head中  
      //   })
    })()
  },
  data(){
    return{
      isshow:false
    }
  }
}
</script>

<style lang="less">
@import url('https://at.alicdn.com/t/font_412452_vk4cins49eunb3xr.css');
@import './style/common.scss';
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';

// 返回顶部的显示和隐藏过渡动画
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}

.router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0.5;
}

#black-top{
  position: fixed;
  bottom:2rem;
  right:0;
  text-align: center;
  color: #000000;
  font-size: 32px
}
	
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
</style>
