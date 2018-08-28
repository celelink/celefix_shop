<template>
  <div>
    <div v-title>{{ title }}</div>
    <!-- 头部 -->
    <!--<header>
      <flexbox>
        <flexbox-item :span="1"></flexbox-item>
        <flexbox-item :span="10"><div class="flex-demo">{{title}}</div></flexbox-item>
        <flexbox-item :span="1"><div class="iconfont icon-sousuo-xian"></div></flexbox-item>
      </flexbox>
    </header>-->
    <!-- 左侧菜单分类 -->
    <div class="classify">
      <div class="menu-categories">
        <scroller lock-x height="-90" :bounce="true" width="1rem" @on-scroll-bottom="onScrollBottom" :scroll-bottom-offst="200">
          <div>
            <div class="menu-item" v-for="(i,index) in menuItem" :key="index" @click="openMenu(index)" :class="{active:index==isactive}" :data-id="i.id"><span>{{i.typeName}}</span></div>
            <div class="menu-item" v-show="menuItem.length==0"><span>暂无分类</span></div>
          </div>
        </scroller>
      </div>
      <!-- 右侧菜单分类 -->
      <div class="right-menu">
        <scroller lock-x :bounce="true" height="-100" width="1rem" @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offst="200">
          <div class="menu-categories-content">
            <div class="menu-categories-content-item" v-for="(item,index) in classVoList" :key="index" :data-id="item.id" @click="openClassifyDetails(item.id,item.classificationName)">
              <!-- <img :src="item.iconUrl" :alt="item.classificationName"> -->
              <img src="../../assets/personallogo.png" :alt="item.classificationName" v-if="item.imgUrl==null">
              <img :src="item.imgUrl" :alt="item.classificationName" v-else >
              <div>{{item.classificationName}}</div>
            </div>
            <div class="menu-categories-content-item" v-show="classVoList.length==0">暂无内容</div>
          </div>
        </scroller>
      </div>
    </div>
    <!-- 底部导航 -->
    <foot-guide></foot-guide>
  </div>

</template>

<script>
import footGuide from '../../components/footer/footGuide.vue'
import { Scroller, Flexbox, FlexboxItem } from 'vux'
import { getClassfiyList } from '../../service/getData'

export default {
  components: {
    Scroller,
    footGuide,
    Flexbox,
    FlexboxItem
  },
  mounted () {
    this.$vux.loading.show({
      text: '加载中...'
    })
    getClassfiyList().then(resolved =>{
      try { 
        this.$vux.loading.hide()
        this.menuItem = resolved.data
        this.classVoList = this.menuItem[0].classVoList
      } catch (error) {
        this.$vux.toast.show({
          text:'暂无分类',
          type:'text',
          position:'top'
        })        
      }
      //console.log(this.menuItem)
    })
  },
  methods: {
    openMenu (index) {
      this.isactive = index
      this.classVoList = this.menuItem[index].classVoList
      // this.$refs.scrollerBottom.reset({top: 0})
    },
    openClassifyDetails(id,name){
      this.$router.push({name:'ClassifyList',query:{pageIndex:1,id:id,name:name}})
    },
    onScrollBottom () {
      if (this.onFetching) {
        // do nothing
      } else {
        this.onFetching = true
        setTimeout(() => {
          this.bottomCount += 10
          this.$nextTick(() => {
            // this.$refs.scrollerBottom.reset()
          })
          this.onFetching = false
        }, 2000)
      }
    }
  },
  data () {
    return {
      title: '分类',
      menuItem: [],
      isactive: 0,
      classVoList:[]
    }
  }
}
</script>

<style scoped lang="less">
// 头部样式
header{
  height:1.17333rem;
  line-height: 1.17333rem;
  background-color:#fff;
  border-bottom: 1px solid #ccc;
  .flex-demo{
    text-align: center
  }
}
.classify{
  display: flex;
  justify-content: space-between;
  .menu-categories{
    width:2.4rem;
    position: relative;
    .menu-item{
      text-align: center;
      border-bottom: 1px solid #d4d3d2;
      height:1.38666rem;
      line-height: 1.38666rem;
      background-color:#f7f7f7;
    }
    .active{
      background-color: #fff;
    }
    .active:after{
      position: absolute;
      width:0.10666rem;
      height: 1.38rem;
      left:0;
      content: '';
      background-color: #262626;
    }
  }
  .right-menu{
    background-color: #fff;
    padding-bottom: 20px;
    flex-grow: 1
  }
  .menu-categories-content{
    width:7.6rem;
    display: flex;
    justify-content: start;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start;
    padding-bottom: 0.36666rem;
    .menu-categories-content-item{
      width:2.53333rem;
      height:3.2rem;
      text-align: center;
      padding:0.4rem 0.29333rem 0;
      img{
        width: 2rem;
        height: 2.2rem;
        min-height: 2.2rem;
      }
    }
  }
}
</style>
