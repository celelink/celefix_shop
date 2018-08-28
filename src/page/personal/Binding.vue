<template>
  <div class="edit_password_page">
    <div v-title>{{ title }}</div>
    <x-header :left-options="{backText: ''}" class="page-head" :title="title"></x-header>
    <div class="edit-password-content">
      <group>
        <x-input class="weui-vcode" placeholder="请输入手机号码" type="tel" :required="true" :max="11" mask="9" is-type="china-mobile" ref="mobile" v-model="mobileVal"></x-input>
      </group>
      <group>
        <x-input class="weui-vcode" placeholder="请输入验证码" :show-clear="false"  v-model="codeVal">
          <x-button mini slot="right" type="primary" @click.native="sendCode" :disabled="codeDisabled">
            {{!codeDisabled?'发送验证码':'再次发送'}}
            <countdown v-model="time" :start="isstart" @on-finish="finish" v-show="codeDisabled"></countdown>
          </x-button>
        </x-input>
      </group>
      <group>
        <!-- <x-input class="weui-vcode" placeholder="请输入新的密码" v-model="passWordVal"></x-input> -->
      </group>
      <group class="weui-cells-form-foot">
        <x-button type="warn" class="submit-btn" @click.native="submit" :disabled="subDisabled">确认</x-button>
      </group>
    </div>
  </div>
</template>

<script>
import { XHeader, XInput, Group, XButton, Countdown } from 'vux'
import { phoneGetCode, updatePhone } from '../../service/getData'
import { getStore } from '../../config/mUtils'

export default {
  components: {
   XHeader,
   XInput,
   Group,
   XButton,
   Countdown
  },
  data () {
    return {
      title:'绑定手机号码',
      sendText:'发送验证码',
      time:60,
      mobileVal:'',
      codeVal:'',
      passWordVal:'',
      dataCode:'',
      isstart:false,
      codeDisabled:false,
      subDisabled:false
    }
  },
  mounted () {
    
  },
  methods:{
    finish(){
      this.codeDisabled = false
      this.isstart = false
    },
    sendCode(){
      if(!this.$refs.mobile.valid){
        console.log(this.$refs.mobile)
        this.$nextTick(()=>{
          this.$vux.toast.show({
            text:this.$refs.mobile.errors.format || '请输入手机号码',
            width:'10em',
            type:'warn'
          })
        })
      }else{
        this.time = 60
        this.isstart = true
        this.codeDisabled = true
        phoneGetCode(this.mobileVal).then((res)=>{
          if(res.msgCode==='0000'){
            console.log(res)
            this.dataCode = res.data
            this.$nextTick(()=>{
              this.$vux.toast.show({
                text:'发送成功'
              })
            })
          }
        }).catch(()=>{

        })
      }
    },
    submit(){
        console.log(this.codeVal)
        console.log(this.dataCode)
      this.subDisabled = true
      if(!this.$refs.mobile.valid){
        return this.$nextTick(()=>{
          this.subDisabled = false
          this.$vux.toast.show({
            text:this.$refs.mobile.errors.format || '请输入手机号码',
            width:'10em',
            type:'warn'
          })
        })
      }else if(this.codeVal==='' || this.codeVal!=this.dataCode){
        return this.$nextTick(()=>{
          this.subDisabled = false
          this.$vux.toast.show({
            text:this.codeVal===''?'请输入验证码':'' || this.codeVal!=this.dataCode?'验证码错误':'',
            width:'10em',
            type:'warn'
          })
        })
      }else{
        updatePhone(getStore('token'), this.mobileVal).then((res)=>{
          console.log(res)
          if(res.msgCode==='0000'){
            this.$nextTick(()=>{
              this.$vux.toast.show({
                text:'绑定成功'
              })
            })
          this.subDisabled = false
          }else{
            this.$nextTick(()=>{
              this.$vux.toast.show({
                text:'系统繁忙',
                type:'cancel'
              })
            })
          this.subDisabled = false
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit-password-content{
    font-size: 18px!important;
    position: absolute;
    top:46px;
    left:0;
    bottom:0;
    width:100%;
    margin-top: 4px;
    padding:0.45333rem 0;
    background-color: #fff;
  }
  input{
    font-size: 18px;
  }
  .weui-btn{
    border-radius: 30px!important;
    background-color: #ff0000;
    font-size: 16px;
  }
  .weui-cells-form-foot{
    padding:10px 15px;
    .submit-btn{
      border-radius: 30px;
      font-size: 16px;
      background-color: #ff0000
    }
  }
  .edit_password_page{
    .weui-btn_disabled.weui-btn_primary{
      background-color: #ff8888
    }
  }
</style>
