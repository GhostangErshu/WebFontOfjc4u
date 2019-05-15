<template>
  <div class="mine">
    <div class="baseinfo">
      <div class="headimg">
        <img src="https://img.mukewang.com/5b6ef4a40001667703000300-200-200.jpg" alt>
      </div>
      <div class="baseinfo-text">
        <p class="baseinfo-text-name">用户名：ErShuTang</p>
        <br>
        <p class="baseinfo-text-signature">签名：心中只有一件事，那就是学习</p>
        <br>
        <p class="baseinfo-text-location">上次登录IP：157.259.36.87</p>
        <br>
        <p class="baseinfo-text-location">上次登录地点：北京市中关村</p>
        <br>
      </div>
    </div>
    <div class="info-meun">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu background-color="#f5f5f5">
            <el-menu-item>
                <i class="el-icon-user-solid"></i>
                <span slot="title">个人信息</span>
            </el-menu-item>
            <el-menu-item>
                <i class="el-icon-s-help"></i>
                <span slot="title">密码修改</span>
            </el-menu-item>
            <el-menu-item>
                <i class="el-icon-location"></i>
                <span slot="title">登陆日志</span>
            </el-menu-item>
            <el-menu-item>
                <i class="el-icon-s-order"></i>
                <span slot="title">最近分数</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div class="info-content">
        <div class="info-content-title">
            <span class="info-content-title-left">个人信息</span>
            <span class="info-content-title-right">编辑<i class="el-icon-edit"></i></span>
        </div>
        <hr>
        <div class="info-content-info">
            <span class="info-title">用户名</span>
            <span class="info-content-content">ErShuTang</span>
            <br><br>
        </div>
        <div class="info-content-info">
            <span class="info-title">邮箱</span>
            <span class="info-content-content">a2576445561@qq.com</span>
            <br><br>
        </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.mine {
  margin: auto;
  margin-top: 40px;
  width: 60%;
  height: 850px;
}
.baseinfo {
  width: 30%;
  height: auto;
  background-color: #f5f5f5;
  border-radius: 3%;
}
.info-meun {
  border-radius: 3%;
  margin-top: 20px;
  width: 30%;
  height: auto;
  font-family: "等线";

}
.headimg img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px silver solid;
  margin-top: 10px;
}
.baseinfo-text {
  text-align: left;
  padding: 10px;
  font-family: "等线";
}
.baseinfo-text p {
  border-left: 5px seagreen solid;
  background-color: rgb(255, 255, 255);
  height: 24px;
  line-height: 24px;
  text-indent: 1em;
}
.info-content {
  width: 35%;
  position: absolute;
  left: 40%;
  top:12%;
  padding: 20px;
  height: auto;
  font-family: "等线";

}
.info-content-title{
  margin-bottom: 12px;
}
.info-content-title-left{
    float: left;
    font-size: 1.3em;
    font-weight: bold;
}
.info-content-title-right{
    position: relative;
    left:200px;
}
.info-content-info{
    text-align: left;
}
.info-title{
    text-align: center;
    display: inline-block;
    width: 120px;
    height: 60px;
    background-color: #f3f5f7;
    font-weight: bolder;
    line-height: 60px;
    font-size: 1.1em;
}
.info-content-content{
    display: inline-block;
    width:40%;
    padding: 3%;
    border-bottom:1px solid  #f6f6f3;
}
</style>