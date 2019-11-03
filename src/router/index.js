import Vue from 'vue'
import Router from 'vue-router'
import Home from "@/pages/Home"
import Download from "@/pages/Download"
import Information from "@/pages/Information"
import Mine from "@/pages/Mine"
import Notfound from "@/pages/404"
import detailsOfInfo from "@/pages/detailsOfInfo.vue"
import detailsOfDownload from "@/pages/detailsOfDownload.vue"
import detailsOfScore from "@/pages/detailsOfScore.vue"
import detailsOfVideo from "@/pages/detailsOfVideo.vue"
import detailsOfHomeWork from "@/pages/detailOfHomeWork.vue"
import Login from "@/pages/Login.vue"
import about from "@/pages/about.vue"
import blog from "@/pages/blog.vue"
import blogEditor from "@/pages/blogEditor.vue"
import blogResult from "@/pages/blogResult.vue"
import axios from 'axios'
import cookies from 'vue-cookies'
import qs from 'qs'

import publicMethod from '@/api/index'

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
Vue.use(blog)
Vue.use(blogEditor)
Vue.use(blogResult)
Vue.use(detailsOfScore)
Vue.use(detailsOfVideo)
Vue.use(detailsOfHomeWork)

const router = new Router({
  routes: [{
      path: '/',
      redirect: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/download',
      name: 'download',
      component: Download
    },
    {
      path: '/information',
      name: 'information',
      component: Information
    },
    {
      path: '/mine',
      name: 'mine',
      component: Mine
    },
    {
      path: '/info-detail/*',
      name: 'detailsOfInfo',
      component: detailsOfInfo
    },
    {
      path: '/src-detail/*',
      name: 'detailsOfDownload',
      component: detailsOfDownload
    },
    {
      path: '/video-detail/*',
      name: 'detailsOfVideo',
      component: detailsOfVideo
    },
    {
      path: '/score-detail',
      name: 'detailsOfScore',
      component: detailsOfScore
    },
    {
      path: '/detail-homework',
      name: 'DetailOfHomeWork',
      component: detailsOfHomeWork 
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/blog',
      name: 'blog',
      component: blog
    },
    {
      path: '/blogEditor/:id',
      name: 'blogEditor',
      component: blogEditor
    },
    {
      path: '/blogResult/:id',
      name: 'blogResult',
      component: blogResult
    },
    {
      path: '/403',
      name: '403',
      component: ()=>import("../pages/phone403.vue") 
    },
    {
      path: '*',
      name: '404',
      component: Notfound
    }
  ]
})



router.beforeEach((to, from, next) => {
  //禁止手机访问
  if(publicMethod.isPhone()){
    if(to.name!="403"){
      next("/403");
      return;
    } else {
      next();
      return;
    };
  }
  if (to.name.indexOf("home") == -1 && to.name.indexOf("login") == -1) {
    if (cookies.isKey("access-token")) {
      let accessToken = cookies.get("access-token");
      axios.post(publicMethod.tokenCheckUrl, qs.stringify({
        token: accessToken
      })).then(function (res) {
        if (res.data.status) {
          //如果token有效
          next()
        } else {
          //如果token无效
          cookies.remove("access-token");
          cookies.remove("userid");
          next("login")
        }
      }).catch(err => console.log(err))
    } else next("login")
  } else {
    next();
  }
})

export default router;
