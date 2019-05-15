<template>
  <div id="app">
    <Logo class="logo"></Logo>
    <ul class="nav-ul">
      <router-link tag="li" to="/home">首页</router-link>
      <router-link tag="li" to="/download">下载</router-link>
      <router-link tag="li" to="/information">信息</router-link>
      <router-link tag="li" to="/mine">个人中心</router-link>
      <router-link tag="li" to="/login">登录</router-link>
      <router-link tag="li" to="/about">关于</router-link>
      <li class="nav-headimg"><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556729361862&di=fd31842f21f2b6d13a232d5ee67ca66f&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201810%2F01%2F20181001190318_wutsz.jpg" alt=""></li>
    </ul>
    <router-view/>
    <div class="uptotop">
      <a href="#">
        <i class="el-icon-arrow-up"></i>
      </a>
    </div>
    <footer>
      <p>Copyright © 2018-2019 ERSHU. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import Logo from "@/components/logo"

export default {
  name: 'App',
  components:{
    Logo
  }
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	vertical-align: baseline;
}
*{
  font-family: "等线";
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-ul{
  background-color: #282b2d;
  height: 70px;
}

.nav-ul li{
  color: white;
  display: inline-block;
  font-size: 18px;
  font-family: "等线";
  line-height: 70px;
  width: 100px;
  font-weight: bold;
}

.nav-ul li:hover{
  background-color: #34a853;
  border-bottom:6px rgb(20, 155, 218) solid;
  cursor: pointer;
}

footer{
  background-color: #282b2d;
  height: 30px;
  line-height: 30px;
  color: #fff;
  font-weight: bold;
  margin-top:30px;
}

.logo{
  position: relative;
  left: 50px;
  line-height: 70px;
  display: inline-block;
  float: left;
  padding-left: 3;
}

.nav-headimg img{
  border-radius: 50%;
  height: 40px;
  width: 40px;
  position: relative;
  top:15px;
}
.uptotop{
  font-size: 40px;
  position: fixed;
  bottom:50px;
  right:50px;
}
.router-link-active{
  background-color: #34a853;
}
</style>
