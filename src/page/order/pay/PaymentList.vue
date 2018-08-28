 <template>
    <div class="paymentlist_page">
        <div v-title>{{ title }}</div>
        <x-header :left-options="{backText: ''}" :title="title" @on-click-more="showMenus" class="paymentlist-title"></x-header>
        <section class="paymentlist-list">
        <ul>
          <li class="paymentlist-list-item" v-for="(item,index) in paylist" :key="index">
            <div>
              <img :src="item.imgSrc" alt="">
              <div  class="paymentlist-list-item-content">
                <p>{{item.name}}</p>
                <p>{{item.des}}</p>
              </div>
            </div>
            <div class="check">
              <checker v-model="radiobox" type="radio" default-item-class="default-item" selected-item-class="iconfont icon-xuanzhong">
                <checker-item :value="index"></checker-item>
              </checker>
            </div>
          </li> 
        </ul>
            <flexbox class="payfoot">
              <flexbox-item :span="1/2">
                <div>合计 <font class="paymoney">￥ 655</font></div> 
              </flexbox-item>
              <flexbox-item :span="1/2">
                <x-button class="new-add-button" @click.native="pay">付款</x-button>
              </flexbox-item>
            </flexbox>
        </section>
    </div>
</template>

<script>
import { XHeader, XButton, Checker, CheckerItem, Flexbox, FlexboxItem } from 'vux'
import eventBus from '../../service/eventbus';
import { setStore } from '../../../config/mUtils'
export default {
    data(){
        return{
            title: '确认下单',
            isempty:false,
            radiobox:0,
            paylist:[
              {imgSrc:'../../../../static/weixin.png', name:'银联支付', des:'推荐使用银联支付'},
              {imgSrc:'../../../../static/union.png', name:'微信支付', des:'微信用户推荐使用'}
            ]
        }
    },
    created(){

    },
    components: {
        XHeader,
        XButton,
        Checker, 
        CheckerItem,
        Flexbox,
        FlexboxItem
    },
    props:[],
    methods: {
      showMenus () {
          
      },
      pay () {
        console.log(this.radiobox) // 付款类型
        this.$router.push({name:'PaymentListItem'})
      },
      change(index){
        console.log(this.radioListValue)
      }
    }
}
</script>
  
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
@white:#ffffff;
.paymentlist_page{
    .paymentlist-title{
        background-color: @white;
        color:#000!important;
        font-size: 16px!important;
    }
    
    .paymentlist-list-item{
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding:0.4rem 0.34666rem;
      background-color: @white;
      margin-top: 2px;
      img{
        width:1.30333rem;
        height:1.30666rem;
        min-width: 1.30666rem;
        min-height:1.30666rem;
        vertical-align: middle;
        margin-right:0.64rem;
      }
      .paymentlist-list-item-content{
        vertical-align: middle;
        display: inline-block;
      }
    }
    .payfoot{
      position: fixed;
      left: 0;
      right: 0;
      bottom:0;
      text-align: center;
      background-color: @white;
      .paymoney{
        color: #ff0000;
        font-weight: bold;
      }
      .new-add-button{
        background-color: #ff0000;
        color:@white;
        border-radius: 0!important;

      }
    }
    .default-item{
      border: 1px solid #ccc;
      width:23px;
      height:23px;
      position: relative;
      border-radius:50%;
    }
    .checkbox-item{
      display: flex;
      padding-left:0.32rem;
    }
    .icon-xuanzhong{
      background: #fff;
      border:none;
      font-size: 30px;
      &:before{
        position: absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        color:#E64340;
      }
    }
}
</style>
