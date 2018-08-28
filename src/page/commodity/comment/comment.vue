 <template>
    <div class="comment_page">
        <div v-title>{{ title }}</div>
        <x-header :left-options="{backText: ''}" :title="title" class="page-head"></x-header>
        <section class="comment-list" v-show="!isempty">
          <ul class="comment-label-title">
            <li class="label-all-bg">全部({{evaluateList.length}})</li>
            <li class="label-bg">好评(111)</li>
            <li class="label-bg">中评(111)</li>
            <li class="label-cha-bg">差评(111)</li>
            <li class="label-bg">有图(111)</li>
          </ul>
          <ul class="comment-label-list">
            <li class="comment-label-list-item" v-for="(item,index) in evaluateList" :key="index">
              <p class="comment-label-list-item-title"><img src="../../../assets/00004.png" alt="" class="center"><span class="center">壹只桃会员</span></p>
              <p class="comment-label-list-item-content">{{item.evaluateDesc}}</p>
              <!-- <ul class="img-list">
                <li><img src="../../../assets/miaosu.png" alt=""></li>
                <li><img src="../../../assets/miaosu.png" alt=""></li>
                <li><img src="../../../assets/miaosu.png" alt=""></li>
                <li><img src="../../../assets/miaosu.png" alt=""></li>
              </ul> -->
              <div class="comment-label-list-item-foot"><p class="textC">2017-09-24</p><p>尺码：36 颜色：黑色</p></div>
            </li>
          </ul>
        </section>
        <section class="comment-list-empty" v-show="isempty">
          <img src="../../../assets/pingjia.png" alt="">
         <divider>暂无更多评价</divider>
        </section>
    </div>
</template>

<script>
import { XHeader, XButton, Cell, Divider  } from 'vux'
import { getGoodsEv } from '../../../service/getData'

export default {
    data(){
        return{
            title: '评价',
            isempty:true,
            evaluateList:[]
        }
    },
    components: {
        XHeader,
        XButton,
        Cell,
        Divider 
    },
    mounted(){
      this.$vux.loading.show()
      getGoodsEv(this.$route.query.id).then(resolved => {
        console.log(resolved)
        this.isempty=false
				this.evaluateList = resolved
				this.$nextTick(()=>{
          this.$vux.loading.hide()
				})
			})
    },
    methods: {
    }
}
</script>
  
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@white:#ffffff;
.comment_page{
  .comment-title{
      background-color: @white;
      color:#000!important;
      font-size: 16px!important;
  }
  .comment-label-title{
    display: flex;
    flex-wrap: wrap;
    min-width:81px;
    padding:0.26666rem;
    background-color: @white;
    margin-top:5px;
    li{
      padding:3px 6px;
      margin-bottom:5px;
      margin-right:5px;
      background-color: rgba(204, 204, 204, 0.6);
      border-radius: 6px;
    }
    .label-all-bg{
      color:@white;
      background-color: #ff0000;
    }
    .label-bg{
      background-color: #ffc7c6;
    }
    .label-cha-bg{
      background-color:rgba(204, 204, 204, 0.24)
    }
  }
  .comment-label-list{
    margin-top: 4px;
    .comment-label-list-item{
      background-color: @white;
      margin-bottom:4px;
      .comment-label-list-item-title{
        padding-left:0.32rem;
        img{
          width:1rem;
          min-width: 1rem;
          height: 1rem;
          min-height:1rem;
          border-radius: 50%;
        }
      }
      .comment-label-list-item-content{
        padding:0.32rem 0.45333rem 0.32rem;
      }
      .comment-label-list-item-foot{
        display: flex;
        justify-content: space-between;
        padding:0 0.45333rem;
      }
      .img-list{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding:0 0.34666rem;
        li{
          width:2.96rem;
          height:3.70666rem;
          min-width:2.96rem;
          min-height:3.70666rem;
          margin-bottom:0.21333rem;
          img{
            width:100%;
            height:100%;
          }
        }
      }
    }
    .center{
      vertical-align: middle;
    }
  }
  .comment-list-empty{
    text-align: center;
    img{
      width:3.46666rem;
      height:3.46666rem;
      margin-top:3.29333rem;
      margin-bottom:1.04rem;
    }
  }
}
</style>
