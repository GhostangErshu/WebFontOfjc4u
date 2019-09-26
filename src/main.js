// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import VueCookies from 'vue-cookies'
import crypto from 'crypto'
import VueParticles from 'vue-particles'  

//导入公共js
import publicMethods from "@/public/index"

import 'element-ui/lib/theme-chalk/index.css'

// 设置浏览器标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

Vue.prototype.$crypto = crypto
//将公共js挂载在Vue实例上
Vue.prototype.$public = publicMethods

Vue.prototype.$access_data

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueCookies)
Vue.use(VueParticles)
  
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
