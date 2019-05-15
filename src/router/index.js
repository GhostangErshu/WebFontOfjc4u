import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/Home"
import Download from "@/pages/Download"
import Information from "@/pages/Information"
import Mine from "@/pages/Mine"
import Notfound from "@/pages/404"
import detailsOfInfo from "@/pages/detailsOfInfo.vue"
import detailsOfDownload from "@/pages/detailsOfDownload.vue"
import Login from "@/pages/Login.vue"
import about from "@/pages/about.vue"

Vue.use(Router)
Vue.use(Home)
Vue.use(Download)
Vue.use(Information)
Vue.use(Mine)
Vue.use(Notfound)
Vue.use(detailsOfInfo)
Vue.use(detailsOfDownload)
Vue.use(Login)
Vue.use(about)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/download',
      name: 'Download',
      component: Download
    },
    {
      path: '/information',
      name: 'Information',
      component: Information
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },
    {
      path: '/detailsOfInfo',
      name: 'detailsOfInfo',
      component: detailsOfInfo
    },
    {
      path: '/detailsOfDownload',
      name: 'detailsOfDownload',
      component: detailsOfDownload
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path:'*',
      name:404,
      component:Notfound
    }
  ]
})
