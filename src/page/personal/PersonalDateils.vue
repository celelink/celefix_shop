<template>
  <div class="personal">
    <div v-title>{{ title }}</div>
    <div class="center">
      <flexbox :gutter="0" wrap="wrap" justify="space-between" align="center" class="setting">
        <flexbox-item :span="1/11">
          <span class="iconfont icon-shezhi-xian"></span>
        </flexbox-item>
        <flexbox-item :span="1/11">
          <span class="iconfont icon-xiaoxi-xian"></span>
        </flexbox-item>
      </flexbox>
      <img src="../../assets/personal.png">
      <div class="sign"><span class="iconfont icon-qiandao-xian"></span>已签到999天</div>
      <P class="nickname">{{nickname}}</P>
      <flexbox :gutter="0" wrap="wrap" justify="space-around" align="center" class="level">
        <flexbox-item :span="1/3">
          等级 LV.0
        </flexbox-item>
        <flexbox-item :span="1/3">
          积分 {{point}}
        </flexbox-item>
      </flexbox>
    </div >
    <grid :rows="3" class="tools">
      <grid-item label="Grid" v-for="(item,index) in toolsPath" :link="{ path: item.path }" :label="item.name" :key="index">
        <span slot="icon" class="iconfont" :class="item.class"></span>
      </grid-item>
    </grid>
    <group class="order">
      <cell title="我的订单" value="查看全部订单" primary="content" is-link :link="{name:'Order'}">
        <span class="iconfont" slot="icon" style="margin-right:5px;"></span>
      </cell>
    </group>
    <grid :rows="4" class="state">
      <grid-item label="Grid" v-for="(item,index) in statePath" :link="{ name: item.path,query:{type:item.type} }" :label="item.name" :key="index">
        <span slot="icon" class="iconfont" :class="item.class"></span>
      </grid-item> 
    </grid>
    <group class="list-box">
      <cell primary="content" v-for="(item,index) in listPath" :title="item.name" is-link :key="index" :link="{ name: item.path,query:{name:item.name}}">
        <span slot="icon" class="iconfont" :class="item.class"></span>
      </cell>
    </group>
    <br>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from '../../components/footer/footGuide.vue'    
import { getUserInfo } from '../../service/getData.js'
import { Blur, Card, Group, Grid, GridItem, Cell, Flexbox, FlexboxItem } from 'vux'

export default {
  name: 'personal',
  data () {
    return {
      title: '我的',
      nickname:'',
      point:0,
      userimg: '',
      toolsPath: [
        {name: '我的收藏', path: '', class: 'icon-shoucang-xian'},
        {name: '购物车', path: 'Cart', class: 'icon-caigou-xian'},
        {name: '个人中心', path: '', class: 'icon-huiyuan'}
      ],
      statePath: [
        {name: '待付款', path: 'OrderClassify', class: 'icon-daifukuanBG-xian', type:1},
        {name: '待发货', path: 'OrderClassify', class: 'icon-daifahuo-xian', type:2},
        {name: '待收货', path: 'OrderClassify', class: 'icon-daishouhuo-xian', type:3},
        {name: '待评价', path: 'OrderClassify', class: 'icon-daipingjia-xian', type:4}
      ],
      listPath: [
        {name: '我的足迹', path: 'FootprintList', class: 'icon-zuji-xian'},
        {name: '地址管理', path: 'Address', class: 'icon-dizhi-xian'},
        {name: '邀请有奖', path: 'Invitation', class: 'icon-yaoqingyoujiang-xian'},
        {name: '联系客服', path: 'Customer', class: 'icon-lianxikefu-xian'},
        {name: '关于我们', path: 'About', class: 'icon-guanyuwomen-xian'}
      ],
      texts:null
    }
  },
  components: {
    Blur,
    Card,
    Group,
    Grid,
    GridItem,
    Cell,
    footGuide,
    Flexbox,
    FlexboxItem
  },
  methods: {
    submitForm () {

    }
  },
  mounted () {
    getUserInfo("B888FC549D8FC720C7B46ADAC8CE5515").then(resolved=>{
      console.log(resolved.data)
      this.nickname = resolved.data.nickname
      this.point = resolved.data.point
    })
  }
}
</script>
<style scoped lang="less">
    /*加载外部的阿里巴巴字体图标库样式*/
@import '~vux/src/styles/1px.less';
.personal{
  padding-bottom:2.5rem;
}
.tools .weui-grid{
  color:#ffffff!important;
  background: #35587f;
  .weui-grid__label{
    font-size: 0.26666rem;
  }
}
.weui-grid{
  background:#ffffff;
  color:#000;
  font-size: 24px;
  padding:0.1rem;
}
.weui-grid:after,.weui-grid:before{
  display: none
}
.center {
  padding: 0.08rem 0 0.29333rem;
  text-align: center;
  background:url(../../assets/personalbg.png) no-repeat;
  background-size: 100% 100%;
  margin-bottom:-1px;
  img {
    width: 2.18666rem;
    height:2.18666rem;
    border-radius: 50%;
    border: 1px solid #ececec;
  }
  .sign{
    position:absolute;
    top:2.60666rem;
    left:-0.53333rem;
    min-width:2.8rem;
    height:0.77381rem;
    padding:0 0.15555rem 0 0.66666rem;
    color:#fff;
    line-height: 0.70333rem;
    border:1px solid #fff;
    box-sizing: border-box;
    border-radius: 40px;
    span{
      vertical-align: middle;
    }
  }
}

.order{
  margin:0.10666rem 0 0.32rem;

}
.state{
  margin-bottom: 0.32rem;
}
.vux-no-group-title{
  margin-top:0
}

.card-demo-flex > div {
  flex: 1;
  text-align: center;
  font-size: 14px;
  background:#35587f;
}
.setting{
  .vux-flexbox-item{
    text-align: center;
    color:#ffffff;
  }
}
.level{
  .vux-flexbox-item{
    text-align: center;
    color:#ffffff;
  }
}
.iconfont{
  font-size:25px;
}
.weui-cell {
    padding: 0.13333rem 0.34666rem;
}
</style>
