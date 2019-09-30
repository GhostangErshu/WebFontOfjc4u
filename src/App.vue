<template>
  <div id="app">
    <span v-if="isLogin">
      <Logo class="logo"></Logo>
      <ul class="nav-ul">
        <router-link tag="li" to="/home">首页</router-link>
        <router-link tag="li" to="/download">资源下载</router-link>
        <router-link tag="li" to="/information">通知信息</router-link>
        <router-link tag="li" to="/blog">学长课堂</router-link>
        <router-link tag="li" to="/about">关于</router-link>

        <!-- 这是一个浮动事件触发的模块 -->
        <span v-if="checkUserLogin()">
          <el-popover
            placement="top-start"
            width="300"
            title="个人信息"
            trigger="click"
            class="popover"
          >
            <li class="user-info user-text">用户名：{{userinfo.name}}</li>
            <br />
            <li class="user-info user-text">最近登录时间：{{ipinfo.time}}</li>
            <br />
            <li class="user-info user-text">最近登录地点：{{ipinfo.location}}</li>
            <br />
            <li class="user-info user-text">总登录次数：{{numOfLogin}}</li>
            <br />
            <li class="userinfo user-space" @click="goSpace">个人中心</li>
            <li class="user-info user-logout" @click="logout">注销</li>
            <br />
            <li class="user-info user-img" slot="reference">
              <img :src="userinfo.head" alt="刷新" style="font-size:0.7em" />
            </li>
          </el-popover>
        </span>
      </ul>
    </span>
    <router-view />
    <span v-if="isLogin">
      <div class="uptotop">
        <a href="#">
          <i class="el-icon-arrow-up"></i>
        </a>
      </div>
      <footer>
        <p class="ICP">
          Copyright © 2018-2019 JC4U. All rights reserved.
          <a
            href="http://www.beian.miit.gov.cn/"
            target="_blank"
          >蜀ICP备19029332号</a>
        </p>
      </footer>
    </span>
  </div>
</template>

<script>
import Logo from "@/components/logo";

export default {
  name: "App",
  components: {
    Logo
  },
  data() {
    return {
      isLogin: false,
      userinfo: { head: "http://iph.href.lu/80x80?text=未登录" },
      ipinfo: {},
      userid: "",
      numOfLogin: 0
    };
  },
  methods: {
    checkStaus() {
      this.isLogin = this.$public.checkStaus();
    },
    //通过id获取用户信息
    async getUserInfoById() {
      let temp = await this.$public.getUserInfoById(this.userid);
      this.userinfo = temp.content;
    },
    //通过id获取用户登录信息
    async getUserIpInfoById() {
      let temp = await this.$public.getUserIpInfoById(this.userid);
      this.ipinfo = temp.content;
    },
    //获取登录次数
    async getNumOfLoginById() {
      //调用公共js中的API方法
      let temp = await this.$public.getNumOfLoginById(this.userid);
      this.numOfLogin = temp.content;
    },
    getUserId() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("userid"))
        this.userid = this.$cookies.get("userid");
    },
    //注销登录
    logout() {
      this.$confirm("确认注销登录吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => this.$public.logout())
        .catch(r => console.log(r));
    },
    goSpace() {
      this.$router.push("/mine");
    },
    checkUserLogin() {
      //判断cookies是否还存在
      if (this.$cookies.isKey("access-token"))
        if (this.$cookies.get("access-token").length > 10) return true;
      return false;
    }
  },
  beforeUpdate() {
    this.checkStaus();
  },
  updated() {},
  created() {
    this.getUserId();
    this.checkStaus();
  },
  mounted() {
    this.getUserInfoById();
    this.getUserIpInfoById();
    this.getNumOfLoginById();
  }
};
</script>

<style>
@import "css/reset.css";

@font-face {
  font-family: jc4uFont;
  src: url("assets/Monaco.ttf");
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav-ul {
  background-color: #282b2d;
  height: 70px;
}

.nav-ul li {
  color: white;
  display: inline-block;
  font-size: 18px;
  font-family: "等线";
  line-height: 65px;
  width: 100px;
  font-weight: bold;
  transition: all 0.5s;
}

.nav-ul li:hover {
  /* 过渡动画 */
  color: #c09725;
  cursor: pointer;
}

footer {
  background-color: #282b2d;
  height: auto;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
}
.ICP a {
  text-decoration: none;
  color: #fff;
}

.logo {
  position: relative;
  left: 6vw;
  line-height: 70px;
  display: inline-block;
  float: left;
}

.uptotop {
  font-size: 40px;
  position: fixed;
  bottom: 50px;
  right: 50px;
}
.router-link-active {
  background-color: #555349;
  border-bottom: 5px rgb(231, 164, 38) solid;
}

/*这里是设置个人信息的css样式*/
.user-info {
  position: absolute;
  font-size: 0.8em;
  letter-spacing: 1px;
}

.user-img {
  right: 1vw;
}
.user-img img {
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: relative;
  top: 15px;
}
.user-text {
  display: inline-block;
  margin: 1px 0;
}
.user-logout {
  display: inline-block;
  margin-top: 10px;
  font-size: 1em;
  color: #000;
}
.user-logout:hover {
  font-weight: bold;
  color: red;
  text-decoration: underline;
  cursor: pointer;
}
.popover {
  padding: 10px;
}
.user-space {
  display: inline-block;
  margin-top: 10px;
  font-size: 1em;
  color: #000;
}

.user-space:hover {
  font-weight: bold;
  color: rebeccapurple;
  text-decoration: underline;
  cursor: pointer;
}
</style>
