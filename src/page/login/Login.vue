<template>
  <div class="login-content" ref="nana">
    <div v-title>{{ title }}</div>
    <div class="logo">
      <img :src="loginSrc" alt="登录LOGO" class="login-logo">
    </div>
    <group class="transparent">
      <x-input name="mobile" placeholder="用户名" placeholder-align="center" type="text">
        <span slot="label" class="iconfont icon-xingmingyonghumingnicheng"></span>
      </x-input>
      <x-input name="password" placeholder="密码" placeholder-align="center" :show-clear="false" type="password">
        <span slot="label" class="iconfont icon-mimasuo"></span>
        <span slot="right" class="iconfont icon-yanjing"></span>
      </x-input>
    </group>
    <group>
      <x-button @click.native="showLoading" type="keep">登录</x-button>
    </group>
    <router-link to="/" class="to_forget" v-if="!loginWay">忘记密码</router-link>
    <div class="register-content">
     <router-link to="/forget" class="register" v-if="!loginWay">注册</router-link>
    </div>
    <p class="line"><span class="line-left"></span>第三方直接登录<span class="line-right"></span></p>
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="1/5"><div class="flex-demo iconfont icon-qq"></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo iconfont icon-wechat-copy"></div></flexbox-item>
      <flexbox-item :span="1/5"><div class="flex-demo iconfont icon-zhifubao"></div></flexbox-item>
    </flexbox>
    </div>
</template>

<script>
import { Group, XInput, XButton, Blur, Divider, Flexbox, FlexboxItem } from 'vux'
import {localapi, proapi, imgBaseUrl} from '../../config/env'
import {mobileCode, checkExsis, sendLogin, getcaptchas, accountLogin} from '../../service/getData'

export default {
  components: {
    Group,
    XInput,
    XButton,
    Blur,
    Divider,
    Flexbox, 
    FlexboxItem
  },
  data () {
    return {
      title: '欢迎登录',
      loginSrc:require('../../assets/logo.png'),
      loginWay: false, //登录方式，默认短信登录
      showPassword: false, // 是否显示密码
      phoneNumber: null, //电话号码
      mobileCode: null, //短信验证码
      validate_token: null, //获取短信时返回的验证值，登录时需要
      computedTime: 0, //倒数记时
      userInfo: null, //获取到的用户信息
      userAccount: null, //用户名
      passWord: null, //密码
      captchaCodeImg: null, //验证码地址
      codeNumber: null, //验证码
      showAlert: false, //显示提示组件
      alertText: null //提示的内容
    }
  },
  created: function() {
    // document.body.setAttribute("class","bodylogin");
  },
  methods: {
    showLoading () {
      this.$vux.loading.show({
        text: 'Loading'
      })
      var url = 'http://celelink.com:8088/cum/backend/api/address/getUserAddress'
      this.$ajax({
        type:'post',
        url:url,
        'userName':'xuwen',
        'password':'123'
      })
      .then(function (data) {
        console.log(data.request)
      })
      setTimeout(() => {
        this.$vux.loading.hide()
      }, 20000)
    }
  },
  mounted () {
    let w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    this.$refs.nana.style.height = h +'px';
    this.$refs.nana.style.width = w +'px';
  }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
.login-content{
  background: url(../../assets/loginbg.png) no-repeat fixed;
  background-size: 100%;
  padding:0 0.93333rem;
  .logo{
    text-align: center;
    padding-top: 2.34666rem;
    margin-bottom: 1.86666rem;
    .login-logo{
      width: 4.56rem;
      margin: 0 auto;
    }
  }
  .transparent{
    background: transparent
  }
  .line{
    position: relative;
    margin:0.90666rem 0 0.37333rem;
    text-align: center;
    color:#fff;
    .line-left,.line-right{
      display: inline-block;
      margin-bottom: 0.10rem;
      background:#fff;
      height: 1px;
      width:1.97333rem;
    }
    .line-right{
      margin-left:0.22666rem;
    }
    .line-left{
      margin-right:0.22666rem
    }
  }
  .vux-x-input{
    border:1px solid #fff;
    border-radius:40px;
    box-sizing: border-box;
    margin-bottom: 0.4rem;
    padding: 0.16rem 1rem;
    input{
      color: #fff;
    }
  }
  .weui-btn_keep{
    background: #008fd0;
    border-radius: 40px;
    line-height: 1.22333rem;
  }
  .to_forget{
    float: right;
    color:white;
    margin-right:0.4rem;
    margin-top: 0.4rem;
    font-size: 0.34666rem;
  }
  .register-content{
    clear: both;
    margin-top:1.26666rem;
    font-size: 0.45333rem;
    color:#fff;
    text-align: center;
    .register{
      color:#fff;
    }
  }
  .flex-demo {
    text-align: center;
    color: #fff;
    width:1.28rem;
    height:1.28rem;
    line-height: 1.28rem;
    margin:0 auto;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    background-clip: padding-box;
  }
  .flex-demo.iconfont{
    font-size: 0.65rem
  }
  .vux-flexbox{
    justify-content: center;
  }
}

</style>
