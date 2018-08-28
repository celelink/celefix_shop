<template>
  <div id='foot_guide'>
    <group>
      <cell is-link title="Simple" link="/component/tabbar-simple"></cell>
      <cell is-link title="Switch icons" link="/component/tabbar-icon"></cell>
    </group>
    <tabbar>
      <tabbar-item selected link="/">
        <img slot="icon" src="../../assets/a1.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <!-- <tabbar-item link="/">
        <img slot="icon" src="../../assets/a2.png">
        <span slot="label">分类</span>
      </tabbar-item>
      <tabbar-item link="/">
        <img slot="icon" src="../../assets/a2.png">
        <span slot="label">发现</span>
      </tabbar-item> -->
      <tabbar-item link="/component/shop">
        <img slot="icon" src="../../assets/a3.png">
        <span slot="label">购物车</span>
      </tabbar-item>
      <tabbar-item link="/component/shop">
        <img slot="icon" src="../../assets/a4.png">
        <span slot="label">我的</span>
      </tabbar-item>
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
  }
}
</script>
