 <template>
    <div class="ClassifyList_page">
        <div v-title>{{ title }}</div>
        <!-- <x-header :left-options="{backText: ''}" :title="title" class="page-head"></x-header> -->
        <section v-show="!isempty">
          <scroller lock-x scrollbar-y use-pullup use-pulldown height="550px" @on-pullup-loading="loadMore" @on-pulldown-loading="refresh" v-model="status" ref="scroller">
            <div class="ClassifyList-list">
              <div v-for="(item,i) in list" class="list-item" :key="i" @click="openDetail(item.id)">
                <span class="loading">加载中</span>
                <x-img :src="item.attachmentCover" :webp-src="`${item.attachmentCover}?type=webp`" @on-success="success" @on-error="error" class="ximg-demo" error-class="ximg-error" :offset="-100" container="#vux_view_box_body"></x-img>
                <div class="list-box-item-title">{{item.goodsName}}</div>
                <div>￥{{item.price}}</div>
              </div>

              <load-more tip="正在加载" v-show="status.pullupStatus === 'loading'"></load-more>
              <load-more tip="暂无数据" :show-loading="false" v-show="status.pullupStatus === 'disabled'" background-color="transparent"></load-more>
            </div>
            <!--上拉样式布局-->
            <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: relative; width: 100%; height: 40px; line-height:41px; bottom: -12px; text-align: center;">
              <span v-show="status.pullupStatus === 'default'"></span>
              <span class="pullup-arrow" v-show="status.pullupStatus === 'down' || status.pullupStatus === 'up'" :class="{'rotate': status.pullupStatus === 'up'}">释放加载更多</span>
            </div>
          </scroller>
        </section>
        <section v-show="isempty">
          <load-more tip="暂无数据" :show-loading="false" background-color="transparent"></load-more>
        </section>
    </div>
</template>

<script>
import { XHeader, Scroller, LoadMore, XImg } from 'vux'
import { getGoodsList } from '../../service/getData'

export default {	

    data(){
        return{
            title: '',
            id:'',
            n: 1,
            isempty:false,
            status: {
              pullupStatus: 'default',
              pulldownStatus: 'default'
            },
            list: []
        }
    },
    components: {
        XHeader,
        Scroller,
        LoadMore,
        XImg
    },
    mounted(){
      this.title = this.$route.query.name
      this.id = this.$route.query.id
      //访问量
			getGoodsList(1, this.id).then(resolved => {
        console.log(resolved.data)
        this.$vux.loading.hide()
        if(resolved.data.length!=0){
          this.list = resolved.data
          this.isempty = false
        }else{
          this.isempty = true
        }
			},this)
    },
    methods: {
      success(src, ele) {
				const span = ele.parentNode.querySelector('span')
				ele.parentNode.removeChild(span)
			},
			error(src, ele, msg) {
				console.log('error load', msg, src)
				const span = ele.parentNode.querySelector('span')
				span.innerText = '加载失败'
			},
			openDetail(index) {
				console.log(index)
				this.$router.push({
					name: 'Commodity',
					query: {
						id: index
					}
				});
			},
      loadMore () {//加载更多
        setTimeout(() => {
          this.n += 1
          this.$nextTick(() => {
            this.$refs.scroller.donePullup()
            //访问量
            getGoodsList(this.n, this.id).then(resolved => {
              console.log(resolved.data)
              if(resolved.data.length==0){
                this.$refs.scroller.disablePullup()
              }else{
                this.list = resolved.data
                this.$vux.loading.hide()
                console.log(this.list[0].attachmentCover)
              }
            })
          })
        }, 2000)
      },
      refresh () {//数据刷新
        setTimeout(() => {
          this.n = 1
          this.$nextTick(() => {
            //访问量
            getGoodsList(this.n, this.id).then(resolved => {
              this.list = resolved.data
              this.$vux.loading.hide()
              console.log(this.list[0].attachmentCover)
            })
            setTimeout(() => {
              this.$refs.scroller.donePulldown()
              this.pullupEnabled && this.$refs.scroller.enablePullup()
            }, 10)
          })
        }, 2000)
      },
      changePullupStatus (enabled) {//是否禁用上拉加载更多
        if (enabled) {
          this.$refs.scroller.enablePullup()
          this.pullupEnabled = true
        } else {
          this.$refs.scroller.disablePullup()
          this.pullupEnabled = false
        }
      }
    }
}
</script>
  
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@white:#ffffff;
.ClassifyList_page{
  .ClassifyList-title{
      background-color: @white;
      color:#000!important;
      font-size: 16px!important;
  }
  .rotate {
    display: inline-block;
    transform: rotate(-180deg);
  }
  .pullup-arrow {
    transition: all linear 0.2s;
    color: #666;
  }
  // 商品列表
	.ClassifyList-list {
		display: flex;
		justify-content: space-between;
    flex-wrap: wrap;
    .list-box-item-title{
      text-overflow: ellipsis;
			display: -webkit-box;
			/** 对象作为伸缩盒子模型显示 **/
			-webkit-box-orient: vertical;
			/** 设置或检索伸缩盒对象的子元素的排列方式 **/
			-webkit-line-clamp: 2;
			/** 显示的行数 **/
			overflow: hidden;
			/** 隐藏超出的内容 **/
    }
    .list-item {
      position: relative;
      width: 4.96rem;
      height: 6.2rem;
      padding-bottom: 0.4rem;
      margin-bottom: 0.05333rem;
      background-color: @white;
      .loading {
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -85%);
        width: 2.4rem;
        height: 2.4rem;
        line-height: 2.4rem;
        border-radius: 50%;
        background-color: rgba(103, 102, 102, 0.3);
        color: @white;
      }
      img {
        width: 100%;
        height: 4.24rem;
      }
    }
  }
}
</style>
