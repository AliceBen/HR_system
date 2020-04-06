// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入全局样式
import './assets/css/global.css'
import './plugins/element'
// 导入字体图标
import './assets/fonts/iconfont.css'

import axios from 'axios'

//设置请求的根路径
// config > index.js 内已经设置过代理，解决跨域问题
axios.defaults.baseURL = '/api'
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
