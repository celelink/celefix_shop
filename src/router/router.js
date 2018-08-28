import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const home = r => require.ensure([], () => r(require('@/page/home/Home')), 'home')
const search = r => require.ensure([], () => r(require('@/page/search/Search')), 'search')
const commodity = r => require.ensure([], () => r(require('@/page/commodity/Commodity')), 'commodity')
const comment = r => require.ensure([], () => r(require('@/page/commodity/comment/Comment')), 'comment')
const grade = r => require.ensure([], () => r(require('@/page/commodity/comment/Grade')), 'grade')
const login = r => require.ensure([], () => r(require('@/page/login/Login')), 'login')
const auth = r => require.ensure([], () => r(require('@/page/login/Auth')), 'auth')
const authData = r => require.ensure([], () => r(require('@/page/login/AuthData')), 'authData')
const classify = r => require.ensure([], () => r(require('@/page/classify/Classify')), 'classify')
const classifyList = r => require.ensure([], () => r(require('@/page/classify/ClassifyList')), 'classifyList')
const cart = r => require.ensure([], () => r(require('@/page/order/Cart')), 'cart')
const order = r => require.ensure([], () => r(require('@/page/order/Order')), 'order')
const orderclassify = r => require.ensure([], () => r(require('@/page/order/OrderClassify')), 'orderclassify')
const orderdateils = r => require.ensure([], () => r(require('@/page/order/pay/OrderDateils')), 'orderdateils')
const orderdateilsfinish = r => require.ensure([], () => r(require('@/page/order/pay/OrderDateilsFinish')), 'orderdateilsfinish')
const paymentList = r => require.ensure([], () => r(require('@/page/order/pay/PaymentList')), 'paymentList')
const paymentListItem = r => require.ensure([], () => r(require('@/page/order/pay/PaymentListItem')), 'paymentListItem')
const address = r => require.ensure([], () => r(require('@/page/address/Address')), 'address')
const addressAdd = r => require.ensure([], () => r(require('@/page/address/AddressAdd')), 'addressAdd')
const personal = r => require.ensure([], () => r(require('@/page/personal/Personal')), 'personal')
const customer = r => require.ensure([], () => r(require('@/page/personal/Customer')), 'customer')
const collection = r => require.ensure([], () => r(require('@/page/personal/Collection')), 'collection')
const personaldateils = r => require.ensure([], () => r(require('@/page/personal/PersonalDateils')), 'personaldateils')
const footprintList = r => require.ensure([], () => r(require('@/page/personal/FootprintList')), 'footprintList')
const footprintListDefault = r => require.ensure([], () => r(require('@/page/personal/FootprintListDefault')), 'footprintListDefault')
const invitation = r => require.ensure([], () => r(require('@/page/personal/Invitation')), 'invitation')
const about = r => require.ensure([], () => r(require('@/page/personal/About')), 'about')
const appsetting = r => require.ensure([], () => r(require('@/page/personal/AppSetting')), 'appsetting')
const signdateils = r => require.ensure([], () => r(require('@/page/personal/SignDateils')), 'signdateils')
const editpassword = r => require.ensure([], () => r(require('@/page/personal/EditPassWord')), 'editpassword')
const binding = r => require.ensure([], () => r(require('@/page/personal/Binding')), 'binding')
const message = r => require.ensure([], () => r(require('@/page/personal/Message')), 'message')
const messagedateils = r => require.ensure([], () => r(require('@/page/personal/MessageDateils')), 'messagedateils')
const member = r => require.ensure([], () => r(require('@/page/personal/Member')), 'member')

export default new Router({
  mode: 'history',
  base: '/toolcool_shop/',
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/',
    name: 'Home',
    component: home
  }, {
    path: '/login',
    name: 'Login',
    component: login
  }, {
    path: '/search',
    name: 'Search',
    component: search
  }, {
    path: '/auth',
    name: 'Auth',
    component: auth
  }, {
    path: '/authData',
    name: 'AuthData',
    component: authData
  }, {
    path: '/commodity',
    name: 'Commodity',
    component: commodity
  }, {
    path: '/comment',
    name: 'Comment',
    component: comment
  }, {
    path: '/grade',
    name: 'Grade',
    component: grade
  }, {
    path: '/classify',
    name: 'Classify',
    component: classify
  }, {
    path: '/ClassifyList',
    name: 'ClassifyList',
    component: classifyList
  }, {
    path: '/cart',
    name: 'Cart',
    component: cart
  }, {
    path: '/order',
    name: 'Order',
    component: order
  }, {
    path: '/orderclassify',
    name: 'OrderClassify',
    component: orderclassify
  }, {
    path: '/orderdateils',
    name: 'OrderDateils',
    component: orderdateils
  }, {
    path: '/orderdateilsfinish',
    name: 'OrderDateilsFinish',
    component: orderdateilsfinish
  }, {
    path: '/paymentList',
    name: 'PaymentList',
    component: paymentList
  }, {
    path: '/paymentListItem',
    name: 'PaymentListItem',
    component: paymentListItem
  }, {
    path: '/address',
    name: 'Address',
    component: address
  }, {
    path: '/addressAdd',
    name: 'AddressAdd',
    component: addressAdd
  }, {
    path: '/personal',
    name: 'Personal',
    component: personal
  }, {
    path: '/personaldateils',
    name: 'PersonalDateils',
    component: personaldateils
  }, {
    path: '/footprintList',
    name: 'FootprintList',
    component: footprintList
  }, {
    path: '/footprintListDefault',
    name: 'FootprintListDefault',
    component: footprintListDefault
  }, {
    path: '/invitation',
    name: 'Invitation',
    component: invitation
  }, {
    path: '/customer',
    name: 'Customer',
    component: customer
  }, {
    path: '/collection',
    name: 'Collection',
    component: collection
  }, {
    path: '/about',
    name: 'About',
    component: about
  }, {
    path: '/appsetting',
    name: 'AppSetting',
    component: appsetting
  }, {
    path: '/signdateils',
    name: 'SignDateils',
    component: signdateils
  }, {
    path: '/message',
    name: 'Message',
    component: message
  }, {
    path: '/messagedateils',
    name: 'MessageDateils',
    component: messagedateils
  }, {
    path: '/member',
    name: 'Member',
    component: member
  }, {
    path: '/editpassword',
    name: 'EditPassWord',
    component: editpassword
  }, {
    path: '/binding',
    name: 'Binding',
    component: binding
  }]
})

Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
})
