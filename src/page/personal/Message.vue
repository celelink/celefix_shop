<template>
  <div class="message_page" id="message-sticky">
    <div v-title>{{ title }}</div>
    <div>
      <sticky ref="sticky" scroll-box="message-sticky" :check-sticky-support="true">
        <x-header :left-options="{backText: ''}" class="page-head" :title="title"></x-header>
      </sticky>
      <swipeout class="vux-1px-tb message-list">
        <swipeout-item transition-mode="follow" v-for="(item,i) in list" :key="i">
          <div slot="right-menu">
            <swipeout-button type="warn" @click.native="onButtonClick(item.id,i)">删除</swipeout-button>
          </div>
          <div slot="content" class="message-list-item" :class="{'vux-1px-b': i !== 3, 'vux-1px-t': i === 1}" style="padding:12px;"  @click="openRouter({name:'MessageDateils',query:{id: item.id}})">
            <p class="iconfont" :class="item.status?'icon-xinfengyi':'icon-xinfengwei'"></p>
            <div>
              <p><span class="title">{{item.title}}</span><span class="time">{{item.createTime}}</span></p>
              <p class="message-content">{{item.content}}</p>
            </div>
          </div>
        </swipeout-item>
      </swipeout>
      <divider v-show="isempty">暂无消息</divider>
    </div>
    <confirm v-model="show" title="温馨提示" @on-confirm="onConfirm">
      <p style="text-align:center;">您确定删除吗？</p>
    </confirm>
  </div>
</template>

<script>
import { XHeader, Sticky, Divider, Swipeout, SwipeoutItem, SwipeoutButton,Confirm } from 'vux'
import { setStore, getStore } from '../../config/mUtils'
import { getTiding, delTidingById } from '../../service/getData'
export default {
  components: {
   XHeader,
   Sticky,
   Divider,
   Swipeout, 
   SwipeoutItem,
   SwipeoutButton,
   Confirm
  },
  data () {
    return {
      title: '我的消息',
      isempty:true,
      isread:false,
      show:false,
      list:[],
      type:0,
      index:0,
      id:0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$vux.loading.show()
    })
    //userId,type
    getTiding(getStore('userId')).then(resolved => {
      if(resolved.msgCode == '0000') {
        if(resolved.data.length === 0) {
          this.isempty = true
        }
        this.list = resolved.data
        console.log(JSON.stringify(resolved.data))
        this.$nextTick(() => {
          this.isempty = false
					this.$vux.loading.hide()
				})
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
    },
    onConfirm(){
      delTidingById(this.id).then((res)=>{
        if(res.msgCode==='0000'){
          this.list.splice(this.index,1)
          this.$vux.toast.show({
            text:'删除成功',
            type:'text',
            position:'bottom'
          })
        }
      })
    },
    onButtonClick(id,index){
      console.log(id)
      this.id = id
      this.index = index
      this.show = true
    }
  }
}
</script>
<style lang="less" scoped>
.message-list{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  .message-list-item{
    background-color: #fff;
    display: flex;
    padding:0.34666rem 0.34666rem 0.34666rem 0;
    border-top: 1px solid rgba(230, 230, 230, 0.75);
    img{
      width:1.50666rem;
      height: 1.50666rem;
      min-width:1.50666rem;
      min-height: 1.50666rem;
      margin-right:0.32rem;
    }
    .iconfont{
      font-size: 28px;
      margin-right:5px;
    }
    .message-content{
      color:#969696;
    }
    .message-content,.title{
      display: -webkit-box;
      /** 对象作为伸缩盒子模型显示 **/
      -webkit-box-orient: vertical;
      /** 设置或检索伸缩盒对象的子元素的排列方式 **/
      -webkit-line-clamp: 1;
      /** 显示的行数 **/
      overflow: hidden;
      /** 隐藏超出的内容 **/
    }
    .time{
        flex-shrink: 0;
        margin-left: 5px;
    }
    div{
      width:100%;
      p{
        display: flex;
        justify-content: space-between;
      }
    }
    &:first-child{
      border-top: none;
    }
  }
}
</style>
