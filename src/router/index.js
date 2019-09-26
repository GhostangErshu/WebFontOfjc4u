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
import Login from "@/pages/Login.vue"
import about from "@/pages/about.vue"
import blog from "@/pages/blog.vue"
import blogEditor from "@/pages/blogEditor.vue"
import blogResult from "@/pages/blogResult.vue"
import axios from 'axios'
import cookies from 'vue-cookies'
import qs from 'qs'

import publicMethod from '@/public/index'

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
      path: '/detailsOfScore',
      name: 'detailsOfScore',
      component: detailsOfScore
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
      path:'/blogResult/:id',
      name:'blogResult',
      component:blogResult
    },
    {
      path: '*',
      name: '404',
      component: Notfound
    }
  ]
})



router.beforeEach((to, from, next) => {
  //初始状态未登录
  let isLogin = false;
  //先判断有没有cookies,如果没有对应的cookies就不进行操作
  if (cookies.isKey("access-token")) {
    let accessToken = cookies.get("access-token");
    //在这里和后台进行交互，判断token是否过期了
    axios.post(publicMethod.tokenCheckUrl, qs.stringify({
      token: accessToken
    })).then(function (res) {
      if (res.data) {
        //如果token有效
        isLogin = true;
      } else {
        //如果token无效
        isLogin = false;
        cookies.remove("access-token");
        cookies.remove("userid");
      }
      var whitePaper = ['login'];
      //再根据isLogin的值进行相应的操作
      if (whitePaper.indexOf(to.name)==-1) {
        if (!isLogin) {
          next('login')
        } else next();
      } else {
        if (!isLogin) {
          next();
        } else {
          next("home");
        }
      }
    }).catch(err => alert("服务器未就绪，请稍后重试！"))
  } else {
    cookies.set("access-token", "");
    next('login');
  }
})

export default router;
