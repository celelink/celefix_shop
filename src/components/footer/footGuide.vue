<template>
  <div id='foot_guide'>
    <tabbar>
      <tabbar-item :selected="$route.name.indexOf('Home') !== -1 ? true : false" @on-item-click="openWindow('/')" v-model="swiperItemIndex">
        <span slot="icon" class="iconfont" :class="$route.name.indexOf('Home') !== -1 ?'icon-shouye-mian':'icon-shouye-xian'"></span>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name.indexOf('Classify') !== -1 ? true : false" @on-item-click="openWindow('/classify')" v-model="swiperItemIndex">
        <span slot="icon" class="iconfont" :class="$route.name.indexOf('Classify') !== -1 ?'icon-fenlei-mian':'icon-fenlei-xian'"></span>
        <span slot="label">分类</span>
      </tabbar-item>
      <!-- <tabbar-item :selected="$route.name.indexOf('Cart') !== -1 ? true : false" @on-item-click="openWindow('/cart')" v-model="swiperItemIndex">
        <span slot="icon" class="iconfont" :class="$route.name.indexOf('Cart') !== -1 ?'icon-caigou-mian':'icon-caigou-xian'"></span>
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item :selected="$route.name.indexOf('Personal') !== -1 ? true : false" @on-item-click="openWindow('/personal')" v-model="swiperItemIndex">
        <span slot="icon" class="iconfont" :class="$route.name.indexOf('Personal') !== -1 ?'icon-wode-mian':'icon-wode-xian'"></span>
        <span slot="label">我的</span>
      </tabbar-item> -->
    </tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, Group, Cell } from 'vux'

export default {
  components: {
    Tabbar,
    TabbarItem,
    Group,
    Cell
  },
  mounted(){

  },
  methods: {
    openWindow (path) {
      this.$vux.loading.show({
        text: '加载中...'
      })
      this.$router.push({path})
    }
  },
  watch: {

  },
  data () {
    return {
      swiperItemIndex: 0
    }
  }
}
</script>
<style lang="less" scoped>
  .iconfont{
    font-size: 27px;
  }
  .weui-tabbar{
    background-color: #fff;
  }
</style>

