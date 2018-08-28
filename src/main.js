import Vue from 'vue'
import App from './App'
import router from './router/router'
import { LoadingPlugin, ToastPlugin } from 'vux'
import Promise from 'es6-promise'
import axios from 'axios'
import 'whatwg-fetch'

Promise.polyfill()
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin, axios)
Vue.prototype.HOST = '/one_mall/backend/h5'
Vue.config.productionTip = false

Vue.prototype.$ajax = axios

// 优化点击延时
const FastClick = require('fastclick')
FastClick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app-box',
  router,
  template: '<App/>',
  components: { App }
})
